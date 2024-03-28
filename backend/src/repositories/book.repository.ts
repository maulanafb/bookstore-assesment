// src/repositories/book.repository.ts
import { PrismaClient } from "@prisma/client";
import { Book } from "../entities/book.entity";

const prisma = new PrismaClient();

export class BookRepository {
  async getAll(
    query: string,
    startIndex: number,
    count: number
  ): Promise<Book[]> {
    const booksFromPrisma = await prisma.book.findMany({
      where: {
        OR: [
          { title: { contains: query } },
          { writer: { contains: query } },
          { tags: { hasSome: [query] } },
        ],
      },
      skip: startIndex || 0,
      take: count || 10,
    });

    return booksFromPrisma.map((book) => ({
      id: String(book.id),
      title: book.title,
      writer: book.writer,
      coverImage: book.coverImage,
      price: book.price,
      tags: book.tags,
    }));
  }

  async getById(id: number): Promise<Book | null> {
    const bookFromPrisma = await prisma.book.findUnique({ where: { id } });
    if (!bookFromPrisma) return null;
    return {
      id: String(bookFromPrisma.id),
      title: bookFromPrisma.title,
      writer: bookFromPrisma.writer,
      coverImage: bookFromPrisma.coverImage,
      price: bookFromPrisma.price,
      tags: bookFromPrisma.tags,
    };
  }

  async create(book: Book): Promise<Book> {
    const createdBook = await prisma.book.create({
      data: {
        title: book.title,
        writer: book.writer,
        coverImage: book.coverImage,
        price: book.price,
        tags: { set: book.tags },
      },
    });
    return {
      id: String(createdBook.id),
      title: createdBook.title,
      writer: createdBook.writer,
      coverImage: createdBook.coverImage,
      price: createdBook.price,
      tags: createdBook.tags,
    };
  }

  async update(book: Book): Promise<Book | null> {
    const { id, ...bookData } = book;
    const updatedBook = await prisma.book.update({
      where: { id: parseInt(id) },
      data: bookData,
    });
    if (!updatedBook) return null;
    return {
      id: String(updatedBook.id),
      title: updatedBook.title,
      writer: updatedBook.writer,
      coverImage: updatedBook.coverImage,
      price: updatedBook.price,
      tags: updatedBook.tags,
    };
  }

  async delete(id: number): Promise<void> {
    await prisma.book.delete({ where: { id } });
  }
}
