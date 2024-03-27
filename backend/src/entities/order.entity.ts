import { User } from "./user.entity";
import { Book } from "./book.entity";

export class Order {
  id: number;
  userId: number;
  bookId: number;
  orderDate: Date;
  status: string;
  user?: User; // Relasi ke entitas User
  book?: Book; // Relasi ke entitas Book

  constructor(
    id: number,
    userId: number,
    bookId: number,
    orderDate: Date,
    status: string,
    user?: User,
    book?: Book
  ) {
    this.id = id;
    this.userId = userId;
    this.bookId = bookId;
    this.orderDate = orderDate;
    this.status = status;
    this.user = user;
    this.book = book;
  }
}
