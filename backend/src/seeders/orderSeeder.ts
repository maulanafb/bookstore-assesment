import { PrismaClient } from "@prisma/client";

export async function seedDummyOrders() {
  const prisma = new PrismaClient();

  try {
    const userId = 100; // User ID
    const bookCount = await prisma.book.count(); // Get total number of books
    const orders = [];

    // Create 20 dummy order data
    for (let i = 0; i < 20; i++) {
      const randomBookId = Math.floor(Math.random() * bookCount) + 1;

      orders.push({
        userId: userId,
        bookId: randomBookId,
        status: "pending",
        orderDate: new Date(), // Current order date
      });
    }

    // Insert order data into the database using Prisma
    await prisma.order.createMany({
      data: orders,
    });

    console.log("Dummy orders created successfully.");
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect(); // Close database connection
  }
}

// Call the function to seed dummy orders
seedDummyOrders();
