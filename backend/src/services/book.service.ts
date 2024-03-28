// src/services/book.service.ts
import { BookRepository } from "../repositories/book.repository";
import { Book } from "../entities/book.entity";

export class BookService {
  private bookRepository: BookRepository;

  constructor() {
    this.bookRepository = new BookRepository();
  }

  async getAllBooks(
    query: string,
    startIndex: number = 0,
    count: number = 5
  ): Promise<Book[]> {
    return await this.bookRepository.getAll(query, startIndex, count);
  }

  async getBookById(id: string): Promise<Book | null> {
    return await this.bookRepository.getById(+id);
  }

  async addBook(
    title: string,
    writer: string,
    coverImage: string,
    price: number,
    tags: string[]
  ): Promise<Book> {
    const newBook = new Book("", title, writer, coverImage, price, tags);
    return await this.bookRepository.create(newBook);
  }

  async updateBook(
    id: string,
    updatedBook: Partial<Book>
  ): Promise<Book | null> {
    const existingBook = await this.bookRepository.getById(+id);
    if (!existingBook) {
      return null;
    }
    const mergedBook = { ...existingBook, ...updatedBook };
    return await this.bookRepository.update(mergedBook);
  }

  async deleteBook(id: string): Promise<void> {
    await this.bookRepository.delete(+id);
  }
}
