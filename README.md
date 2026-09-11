# BookNest

BookNest là website thuê sách hiện đại xây dựng với Next.js App Router, React 19, Ant Design 5, Zustand persist, React Hook Form/Zod, Prisma/PostgreSQL, JWT HttpOnly Cookie và bcrypt.

## Chạy local

```bash
npm install
copy .env.example .env
npx prisma generate
npx prisma migrate dev --name init
npm run dev
```

Mở `http://localhost:3000`. Cấu hình `DATABASE_URL` trong `.env` trước khi chạy migration.

## Scripts

- `npm run dev`: development server
- `npm run build`: production build
- `npm run lint`: ESLint
- `npx prisma studio`: quản trị dữ liệu
- `npm run db:seed`: tạo tài khoản admin và category mẫu

## Kiến trúc

Sách được fetch từ server/API, không đưa toàn bộ catalog vào Zustand. Zustand chỉ quản lý giỏ thuê và persist vào localStorage; điều này giữ state client nhỏ khi dữ liệu tăng. Token đăng nhập chỉ ở HttpOnly cookie, middleware bảo vệ route giao diện và API tiếp tục kiểm tra dữ liệu/role.

Chi tiết đối chiếu rubric nằm trong [docs/RUBRIC_MAPPING.md](docs/RUBRIC_MAPPING.md).
