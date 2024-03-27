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
    limit: number
  ): Promise<Order[]> {
    return await prisma.order.findMany({
      where: { userId: reqUserId },
      skip: offset || 0,
      take: limit || 10,
      orderBy: { id: "desc" },
    });
  }
}
