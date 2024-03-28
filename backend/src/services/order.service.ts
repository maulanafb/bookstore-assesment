import { OrderRepository } from "../repositories/order.repository";
import { UserRepository } from "../repositories/user.repository";
import { BookRepository } from "../repositories/book.repository";
import { Order } from "@prisma/client";

const orderRepository = new OrderRepository();
const userRepository = new UserRepository(); // Tambahkan UserRepository
const bookRepository = new BookRepository(); // Tambahkan BookRepository

export class OrderService {
  async createOrder(userId: number, bookId: number): Promise<Order> {
    try {
      const book = await bookRepository.getById(bookId);
      const user = await userRepository.findById(userId);

      if (!book || !user) {
        throw new Error("Book or user not found");
      }

      const updatedPoints = user.points - book.price;

      if (updatedPoints < 0) {
        throw new Error("Insufficient points to make the purchase");
      }
      await userRepository.updatePoints(userId, updatedPoints);
      return await orderRepository.createOrder(userId, bookId);
    } catch (error) {
      throw new Error(`Failed to create order`);
    }
  }

  async cancelOrder(orderId: number): Promise<Order> {
    try {
      // Mendapatkan informasi pesanan berdasarkan ID
      const order = await orderRepository.getById(orderId);
      if (!order) {
        throw new Error("Order not found");
      }

      // Mendapatkan informasi buku berdasarkan ID
      const book = await bookRepository.getById(order.bookId);
      if (!book) {
        throw new Error("Book not found");
      }

      // Mengembalikan poin pengguna sesuai harga buku
      const user = await userRepository.findById(order.userId);
      if (!user) {
        throw new Error("User not found");
      }
      const updatedPoints = user.points + book.price;

      // Mengubah status pesanan menjadi "canceled"
      order.status = "canceled";

      // Memperbarui poin pengguna dan status pesanan di basis data
      await userRepository.updatePoints(order.userId, updatedPoints);
      await orderRepository.cancelOrder(order.id);

      return order;
    } catch (error) {
      throw new Error(`Failed to cancel order`);
    }
  }

  async getOrdersByUserId(
    userId: number | undefined,
    offset: number,
    limit: number,
    searchQuery: string
  ): Promise<Order[]> {
    return await orderRepository.getOrdersByUserId(
      userId,
      offset,
      limit,
      searchQuery
    );
  }
}
