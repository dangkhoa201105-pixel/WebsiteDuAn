import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const secret = new TextEncoder().encode(process.env.JWT_SECRET || "development-secret-change-me");
export const createToken = (payload: { userId: string; role: "USER" | "ADMIN" }) => new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(secret);
export const verifyToken = async (token: string) => (await jwtVerify(token, secret)).payload as { userId: string; role: "USER" | "ADMIN" };

export async function getSession() {
	const token = (await cookies()).get("booknest_token")?.value;
	if (!token) return null;
	try { return await verifyToken(token); } catch { return null; }
}

export async function requireAdmin() {
	const session = await getSession();
	return session?.role === "ADMIN" ? session : null;
}
