import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function createDummyBooks() {
  const dummyBooks = [];
  for (let i = 1; i <= 20; i++) {
    dummyBooks.push({
      title: `Book Title ${i}`,
      writer: `Writer ${i}`,
      coverImage: "cover1.jpg", // Nama file cover sama untuk semua buku
      price: Math.floor(Math.random() * 100) + 1, // Harga acak antara 1 dan 100
      tags: ["fiction", "novel", "science"], // Tags dummy
    });
  }
  await prisma.book.createMany({ data: dummyBooks });
}

createDummyBooks()
  .then(() => console.log("Dummy books created successfully"))
  .catch((error) => console.error("Error creating dummy books:", error))
  .finally(async () => {
    await prisma.$disconnect();
  });
