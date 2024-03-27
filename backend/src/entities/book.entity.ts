// src/entities/book.entity.ts

export class Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];

  constructor(
    id: string,
    title: string,
    writer: string,
    coverImage: string,
    price: number,
    tags: string[]
  ) {
    this.id = id;
    this.title = title;
    this.writer = writer;
    this.coverImage = coverImage;
    this.price = price;
    this.tags = tags;
  }
}
