import { PrismaClient, Order } from "@prisma/client";

const prisma = new PrismaClient();

export class OrderRepository {
  async createOrder(userId: number, bookId: number): Promise<Order> {
    return await prisma.order.create({
      data: {
        userId,
        bookId,
        status: "pending",
      },
    });
  }

  async cancelOrder(orderId: number): Promise<Order> {
    return await prisma.order.update({
      where: { id: orderId },
      data: { status: "cancelled" },
    });
  }

  async getOrdersByUserId(
    reqUserId: number | undefined,
    offset: number,
    limit: number,
    searchQuery?: string
  ): Promise<Order[]> {
    const searchCriteria: any = { userId: reqUserId };

    if (searchQuery) {
      searchCriteria.OR = [
        { book: { title: { contains: searchQuery, mode: "insensitive" } } },
        { book: { writer: { contains: searchQuery, mode: "insensitive" } } },
        // Tambahkan kriteria pencarian lainnya sesuai kebutuhan
      ];
    }

    return await prisma.order.findMany({
      where: searchCriteria, // Gunakan kriteria pencarian
      include: {
        book: true, // Include data from the related Book model
      },
      skip: offset || 0,
      take: limit || 10,
      orderBy: { id: "desc" },
    });
  }
}
