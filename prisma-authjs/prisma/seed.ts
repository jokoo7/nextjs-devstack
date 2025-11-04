import { Prisma } from '@/lib/generated/prisma/client';
import prisma from '@/lib/prisma';

const userData: Prisma.UserCreateInput[] = [
  {
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    posts: {
      create: [
        {
          title: 'Getting Started with Prisma',
          content:
            'Prisma adalah ORM modern untuk Node.js dan TypeScript. Dengan Prisma, kita bisa bekerja dengan database menggunakan type-safe queries yang membuat development lebih cepat dan aman.',
        },
        {
          title: 'Why TypeScript is Awesome',
          content:
            'TypeScript memberikan type safety yang membuat code kita lebih maintainable dan mengurangi bugs di production. Dengan TypeScript, kita bisa catch error sebelum runtime.',
        },
      ],
    },
  },
  {
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    posts: {
      create: [
        {
          title: 'Introduction to Next.js',
          content:
            'Next.js adalah React framework yang powerful untuk building production-ready applications dengan fitur seperti SSR, SSG, dan API routes yang sangat memudahkan development.',
        },
      ],
    },
  },
  {
    name: 'Bob Johnson',
    email: 'bob@example.com',
    password: 'password123',
    posts: {
      create: [
        {
          title: 'CSS Tips and Tricks',
          content:
            'CSS modern sekarang sudah sangat powerful dengan fitur seperti Grid, Flexbox, dan Custom Properties yang membuat styling jadi lebih mudah dan maintainable.',
        },
        {
          title: 'Responsive Design Best Practices',
          content:
            'Mobile-first approach adalah kunci untuk membuat website yang responsive dan user-friendly di semua device. Gunakan media queries dengan bijak untuk hasil yang optimal.',
        },
        {
          title: 'Tailwind CSS Guide',
          content:
            'Tailwind CSS adalah utility-first CSS framework yang memudahkan kita untuk styling tanpa harus keluar dari HTML. Produktivitas meningkat drastis dengan Tailwind.',
        },
      ],
    },
  },
  {
    name: 'Alice Williams',
    email: 'alice@example.com',
    password: 'password123',
    posts: {
      create: [
        {
          title: 'React Hooks Explained',
          content:
            'React Hooks seperti useState dan useEffect memungkinkan kita menggunakan state dan lifecycle methods di functional components. Hooks membuat code lebih clean dan reusable.',
        },
      ],
    },
  },
  {
    name: 'Charlie Brown',
    email: 'charlie@example.com',
    password: 'password123',
    posts: {
      create: [
        {
          title: 'JavaScript ES6+ Features',
          content:
            'ES6+ membawa banyak fitur modern seperti arrow functions, destructuring, spread operator, dan async/await yang sangat berguna untuk development modern.',
        },
        {
          title: 'Async Programming in JavaScript',
          content:
            'Memahami Promises dan async/await adalah essential untuk modern JavaScript development, terutama untuk handling API calls dan operasi asynchronous lainnya.',
        },
      ],
    },
  },
  {
    name: 'David Miller',
    email: 'david@example.com',
    password: 'password123',
  },
  {
    name: 'Emma Davis',
    email: 'emma@example.com',
    password: 'password123',
  },
  {
    name: 'Frank Wilson',
    email: 'frank@example.com',
    password: 'password123',
  },
  {
    name: 'Grace Moore',
    email: 'grace@example.com',
    password: 'password123',
  },
  {
    name: 'Henry Taylor',
    email: 'henry@example.com',
    password: 'password123',
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
