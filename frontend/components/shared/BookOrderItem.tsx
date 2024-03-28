import Image from "next/image";
import Link from "next/link";

interface Book {
  id: number;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
  createdAt: string; // Assuming createdAt is a date string
}

interface Order {
  id: number;
  userId: number;
  bookId: number;
  orderDate: string; // Assuming orderDate is a date string
  status: "cancelled" | "pending" | "completed"; // Assuming status can only be cancelled or pending
  book: Book;
}

interface BookItemProps {
  order: Order;
}

const BookOrderItem: React.FC<Order> = (order) => {
  return (
    <Link
      href={`/book-detail/${order.id}`}
      className="flex justify-center items-center"
    >
      <div className="flex flex-col px-2 py-2 bg-[#fff] overflow-hidden w-[235px] shadow-md rounded-md">
        {/* image wrapper */}
        <div className="relative w-full h-[235px]">
          <Image
            src={"/cover1.jpg"}
            layout="fill"
            objectFit="cover"
            alt={order.book.title}
          />
        </div>
        {/* description  */}
        <div className="flex max-sm:px-1 max-sm:py-1 px-3 py-2 mt-2">
          <h1 className="text-[16px] font-medium tracking-tighter text-slate-500">
            <span>{order.book.writer}</span>
          </h1>
        </div>
        <div className="flex max-sm:px-1 max-sm:py-1 px-3 py-2 border-b">
          <h1 className="text-[18px] font-medium tracking-tighter max-sm:text-[14px] line-clamp-3">
            {order.book.title}
          </h1>
        </div>

        <div className="flex max-sm:px-1 max-sm:py-1 px-3 py-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#fa5d29] font-bold tracking-tighter animate-blink">
              {order.book.price} Points
            </span>
          </div>
        </div>

        {/* price  */}
        {/* buy  */}
      </div>
    </Link>
  );
};

export default BookOrderItem;
