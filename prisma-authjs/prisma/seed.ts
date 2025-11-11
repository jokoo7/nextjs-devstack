import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';
import bcrypt from 'bcryptjs';

const hashPassword = bcrypt.hashSync('password123', 10);

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
    posts: {
      create: [
        {
          title: 'Getting Started with Next.js 15',
          content:
            'Next.js 15 membawa fitur-fitur baru yang amazing termasuk improved performance dan better developer experience. Di post ini, kita akan explore key changes dan cara migrate aplikasi yang sudah ada.',
        },
        {
          title: 'Understanding React Server Components',
          content:
            'React Server Components adalah cara baru untuk build aplikasi. Mereka memungkinkan kita render components di server, mengurangi jumlah JavaScript yang dikirim ke client dan meningkatkan performance secara signifikan.',
        },
      ],
    },
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
    posts: {
      create: [
        {
          title: 'Prisma ORM Best Practices',
          content:
            'Prisma adalah ORM yang powerful untuk Node.js dan TypeScript. Pelajari best practices termasuk schema design, query optimization, dan handling relationships secara efisien di database kamu.',
        },
        {
          title: 'Building Scalable APIs with tRPC',
          content:
            'tRPC memungkinkan kamu build end-to-end typesafe APIs dengan mudah. Discover cara integrate tRPC dengan Next.js application dan enjoy full type safety dari frontend ke backend.',
        },
        {
          title: 'TypeScript Tips and Tricks',
          content:
            'TypeScript sudah menjadi standard untuk modern web development. Berikut adalah beberapa advanced tips dan tricks untuk membantu kamu write better, more maintainable code dengan strong type safety.',
        },
      ],
    },
  },
  {
    name: 'Michael Johnson',
    email: 'michael@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
    posts: {
      create: [
        {
          title: 'Deploying Next.js to Vercel',
          content:
            'Vercel menyediakan platform terbaik untuk deploying Next.js applications. Pelajari tentang environment variables, preview deployments, dan optimizing app kamu untuk production.',
        },
      ],
    },
  },
  {
    name: 'Sarah Williams',
    email: 'sarah@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
    posts: {
      create: [
        {
          title: 'Tailwind CSS vs Styled Components',
          content:
            'Memilih styling solution yang tepat sangat crucial untuk project kamu. Artikel ini compare Tailwind CSS dan Styled Components, discussing pros and cons dari setiap approach.',
        },
        {
          title: 'Authentication with NextAuth.js',
          content:
            'NextAuth.js membuat authentication simple dan secure. Pelajari cara implement OAuth providers, credentials login, dan protect routes kamu dengan middleware.',
        },
      ],
    },
  },
  {
    name: 'David Brown',
    email: 'david@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
    posts: {
      create: [
        {
          title: 'PostgreSQL Performance Tuning',
          content:
            'Database performance sangat critical untuk setiap aplikasi. Explore indexing strategies, query optimization, dan connection pooling untuk membuat PostgreSQL database kamu lightning fast.',
        },
        {
          title: 'Docker for Developers',
          content:
            'Docker telah revolutionized development workflows. Pelajari cara containerize aplikasi kamu, gunakan docker-compose untuk local development, dan deploy ke production.',
        },
        {
          title: 'GraphQL vs REST: Which to Choose?',
          content:
            'Baik GraphQL maupun REST punya tempatnya di modern applications. Comprehensive guide ini membantu kamu decide approach mana yang terbaik untuk use case spesifik kamu.',
        },
      ],
    },
  },
  {
    name: 'Emily Davis',
    email: 'emily@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
  },
  {
    name: 'Robert Miller',
    email: 'robert@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
  },
  {
    name: 'Lisa Anderson',
    email: 'lisa@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
  },
  {
    name: 'James Wilson',
    email: 'james@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
  },
  {
    name: 'Maria Garcia',
    email: 'maria@example.com',
    password: hashPassword,
    provider: 'credentials',
    role: 'USER',
  },
];

async function main() {
  console.log('🌱 Mulai seeding...');

  // hapus data lama
  await prisma.user.deleteMany();
  await prisma.post.deleteMany();
  console.log('🗑️  Data lama dihapus');

  // create user
  for (const u of userData) {
    const user = await prisma.user.create({ data: u });
    console.log(`✅ Created user: ${user.name}`);
  }
  const totalUsers = await prisma.user.count();
  const totalPosts = await prisma.post.count();

  console.log('\n✨ Seeding selesai!');
  console.log(`📊 Total users: ${totalUsers}`);
  console.log(`📝 Total posts: ${totalPosts}`);
  console.log('🔑 Password semua user: password123');

  console.log('✨ Seeding selesai!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
