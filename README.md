# ⚡ Next.js DevStack

> 🧠 Koleksi eksperimen dan boilerplate modern untuk membangun fullstack apps dengan **Next.js** menggunakan berbagai kombinasi stack backend & autentikasi.

---

## 🧩 Struktur Project

Setiap folder berisi **mini-project** dengan kombinasi stack berbeda untuk dieksplorasi. Penamaan folder mengikuti format:

```
[database/orm]-[auth-system]
```

Contoh:

- `prisma-authjs` - Kombinasi Prisma ORM dengan Auth.js
- `drizzle-betterauth` - Kombinasi Drizzle ORM dengan Better-Auth
- `mongoose-clerk` - Kombinasi Mongoose dengan Clerk Auth
- `supabase-auth` - Kombinasi Supabase Database dengan Supabase Auth

---

## 🎯 Tujuan

Project ini dirancang sebagai **playground pengembangan fullstack** untuk:

- ⚙️ Mempelajari berbagai kombinasi **ORM + Auth + Framework**
- 🧩 Mengeksplor arsitektur modular dengan **Next.js App Router**
- 🔐 Bereksperimen dengan sistem autentikasi modern (Better Auth, Auth.js, dsb.)
- 🚀 Membangun boilerplate yang siap digunakan untuk project production

---

## ⚙️ Stack yang Tersedia

| Project                            | ORM / Database | Auth System   | Framework  | Status     |
| ---------------------------------- | -------------- | ------------- | ---------- | ---------- |
| [`prisma-authjs`](./prisma-authjs) | Prisma         | Auth.js       | Next.js 14 | ✅ Ready   |
| `drizzle-betterauth`               | Drizzle        | Better-Auth   | Next.js 14 | 🚧 Planned |
| `supabase-auth`                    | Supabase       | Supabase Auth | Next.js 14 | 🚧 Planned |
| `mongoose-clerk`                   | Mongoose       | Clerk         | Next.js 14 | 🚧 Planned |

### Legend

- ✅ Ready - Stack sudah siap digunakan
- 🚧 Planned - Stack dalam perencanaan/pengembangan
- 🔄 WIP - Stack sedang dalam pengerjaan

---

## 🚀 Cara Menjalankan Project

```bash
# 1. Clone repository
git clone https://github.com/jokoo7/nextjs-devstack.git

# 2. Masuk ke stack yang ingin kamu jalankan
cd prisma-authjs

# 3. Install dependencies
npm install

# 4. Setup environment variables
cp .env.example .env
# Sesuaikan konfigurasi di file .env

# 5. Setup database dan generate Prisma Client
npx prisma generate
npx prisma db push

# 6. Jalankan development server
npm run dev
```

## 📝 Environment Variables

Setiap stack memiliki konfigurasi environment variables yang berbeda. Berikut panduan untuk setiap jenis konfigurasi:

### 🗄️ Database Configuration

```env
# PostgreSQL (Prisma/Drizzle)
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"

# MongoDB (Mongoose)
MONGODB_URI="mongodb+srv://user:password@cluster.mongodb.net/dbname"

# Supabase
SUPABASE_URL="your-supabase-project-url"
SUPABASE_ANON_KEY="your-supabase-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-supabase-service-role-key"
```

### 🔐 Auth Configuration

```env
# Auth.js / NextAuth.js
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"

# Better Auth
BETTER_AUTH_SECRET="your-better-auth-secret"
BETTER_AUTH_URL="http://localhost:3000"

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-publishable-key"
CLERK_SECRET_KEY="your-clerk-secret-key"

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL="your-supabase-url"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-supabase-anon-key"
```

### 🔑 OAuth Providers

```env
# GitHub
GITHUB_ID="your-github-oauth-id"
GITHUB_SECRET="your-github-oauth-secret"

# Google
GOOGLE_CLIENT_ID="your-google-oauth-id"
GOOGLE_CLIENT_SECRET="your-google-oauth-secret"

# Discord
DISCORD_CLIENT_ID="your-discord-client-id"
DISCORD_CLIENT_SECRET="your-discord-client-secret"

# Microsoft
AZURE_AD_CLIENT_ID="your-azure-client-id"
AZURE_AD_CLIENT_SECRET="your-azure-client-secret"
AZURE_AD_TENANT_ID="your-azure-tenant-id"
```

### 📧 Email Services

```env
# SMTP Configuration
SMTP_HOST="smtp.example.com"
SMTP_PORT="587"
SMTP_USER="your-smtp-username"
SMTP_PASSWORD="your-smtp-password"

# SendGrid
SENDGRID_API_KEY="your-sendgrid-api-key"

# Resend
RESEND_API_KEY="your-resend-api-key"
```

> **Catatan**: Setiap stack hanya memerlukan subset dari variabel di atas. Lihat README.md di masing-masing folder stack untuk konfigurasi spesifik yang diperlukan.

## 📚 Dokumentasi Stack

### prisma-authjs

Stack ini menggunakan:

- **Next.js 14+** dengan App Router
- **Prisma** sebagai ORM
- **Auth.js** (NextAuth) untuk autentikasi
- **TypeScript** untuk type safety
- **TailwindCSS** untuk styling
- **ESLint** & **Prettier** untuk code formatting

Fitur yang tersedia:

- 🔐 Autentikasi Email/Password
- 🔑 OAuth (GitHub, Google)
- 👤 Manajemen profil pengguna
- 🎨 UI yang responsif dengan TailwindCSS
- 📝 Form handling dengan react-hook-form
- ✨ Validasi dengan Zod
