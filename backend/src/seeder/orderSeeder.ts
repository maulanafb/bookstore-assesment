import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  try {
    const userId = 5; // User ID
    const bookCount = await prisma.book.count(); // Mendapatkan jumlah total buku
    const orders = [];

    // Membuat 20 data dummy order
    for (let i = 0; i < 20; i++) {
      // Memilih buku secara acak
      const randomBookId = Math.floor(Math.random() * bookCount) + 1;

      // Menambahkan order ke dalam array orders
      orders.push({
        userId: userId,
        bookId: randomBookId,
        status: "pending", // Status order
        orderDate: new Date(), // Tanggal order saat ini
      });
    }

    // Memasukkan data order ke dalam database menggunakan Prisma
    await prisma.order.createMany({
      data: orders,
    });

    console.log("Dummy order created successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect(); // Menutup koneksi dengan database
  }
}

main();
