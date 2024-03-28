import Image from "next/image";
import Link from "next/link";

interface Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
}

interface BookItemProps {
  book: Book;
}

const BookItem: React.FC<BookItemProps> = ({ book }) => {
  return (
    <Link href={``} className="flex justify-center items-center">
      <div className="flex flex-col px-2 py-2 bg-[#fff] overflow-hidden w-[235px] shadow-md rounded-md">
        {/* image wrapper */}
        <div className="relative w-full h-[235px]">
          <Image
            src={"/cover1.jpg"}
            layout="fill"
            objectFit="cover"
            alt={book.title}
          />
        </div>
        {/* description  */}
        <div className="flex max-sm:px-1 max-sm:py-1 px-3 py-2 mt-2">
          <h1 className="text-[16px] font-medium tracking-tighter text-slate-500">
            <span>{book.writer}</span>
          </h1>
        </div>
        <div className="flex max-sm:px-1 max-sm:py-1 px-3 py-2 border-b">
          <h1 className="text-[18px] font-medium tracking-tighter max-sm:text-[14px] line-clamp-3">
            {book.title}
          </h1>
        </div>

        <div className="flex max-sm:px-1 max-sm:py-1 px-3 py-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#fa5d29] font-bold tracking-tighter animate-blink">
              {book.price} Points
            </span>
          </div>
        </div>
        <div className="flex max-sm:px-1 max-sm:py-1 px-3 py-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium tracking-tighter">
              {book.tags.map((tag) => `#${tag}, `)}
            </span>
          </div>
        </div>

        {/* price  */}
        {/* buy  */}
      </div>
    </Link>
  );
};

export default BookItem;
