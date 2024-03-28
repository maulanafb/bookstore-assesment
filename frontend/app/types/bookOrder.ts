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
  orderDate: string; // Assuming orderDate is a date string
  status: "cancelled" | "pending" | "completed";
  book: Book; // Embed the Book type directly
}

export interface BookItemProps {
  order: Order;
}
