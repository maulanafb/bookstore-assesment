import { OrderRepository } from "../repositories/order.repository";
import { Order } from "@prisma/client";

const orderRepository = new OrderRepository();

export class OrderService {
  async createOrder(userId: number, bookId: number): Promise<Order> {
    return await orderRepository.createOrder(userId, bookId);
  }

  async cancelOrder(orderId: number): Promise<Order> {
    return await orderRepository.cancelOrder(orderId);
  }

  async getOrdersByUserId(
    userId: number | undefined,
    offset: number,
    limit: number,
    searchQuery: string
  ): Promise<Order[]> {
    // Panggil fungsi dari repository untuk mendapatkan pesanan berdasarkan userId
    return await orderRepository.getOrdersByUserId(
      userId,
      offset,
      limit,
      searchQuery
    );
  }
}
