# BookNest rubric mapping

| Hạng mục | Trạng thái | Vị trí |
| --- | --- | --- |
| Next.js App Router + REST Route Handler | Có | `src/app`, `src/app/api` |
| Global/local state và persist | Có | `src/store/cart-store.ts` |
| Prisma relational database | Có | `prisma/schema.prisma` |
| JWT HttpOnly + bcrypt | Có | `src/lib/auth.ts`, `src/app/api/auth` |
| Middleware route protection | Có | `middleware.ts` |
| Search/filter/pagination API | Có | `src/app/api/books/route.ts` |
| Upload production Cloudinary | Cần hoàn thiện | `.env.example` đã chuẩn bị biến môi trường |
| Deploy online | Cần thực hiện | Vercel + PostgreSQL + Cloudinary |

## Tài khoản seed

- Email: `admin@booknest.vn`
- Mật khẩu: `BookNest@123`
- Email khách hàng: `customer@booknest.vn`
- Mật khẩu khách hàng: `User@12345`

Tài khoản `USER` chỉ dùng được các trang mua/thuê sách và `/account`. Route `/admin/*` yêu cầu JWT có role `ADMIN`; middleware tự chuyển tài khoản khách hàng về `/account`.

Đổi mật khẩu demo trước khi deploy production.
