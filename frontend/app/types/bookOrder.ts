export interface Book {
  id: number;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
  createdAt: string; // Assuming createdAt is a date string
}

export interface Order {
  id: number;
  userId: number;
  bookId: number;
  orderDate: string;
  status: string;
  book: Book;
}

export interface BookItemProps {
  order: Order;
}
