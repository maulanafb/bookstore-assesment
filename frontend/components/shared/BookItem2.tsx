import Image from "next/image";
import Link from "next/link";

const BookItem2 = () => {
  return (
    <Link
      href={`/course-detail/introduction-to-programming-2024-02-16`}
      className="flex justify-center items-center"
    >
      <div className="flex flex-col py-2 px-2 bg-[#fff] overflow-hidden w-[235px] shadow-md rounded-md">
        {/* image */}
        <div className="relative w-full h-[235px]">
          <Image
            src={"/cover2.jpg"}
            layout="fill"
            objectFit="contain"
            alt="course"
          />
        </div>
        {/* description  */}
        <div className="flex max-sm:px-1 px-3 max-sm:py-1 py-2 mt-2">
          <h1 className="text-[16px] font-medium tracking-tighter text-slate-500">
            <span>Mick Herron</span>
          </h1>
        </div>
        <div className="flex max-sm:px-1 px-3 max-sm:py-1 py-2 border-b">
          <h1 className="text-[18px] font-medium tracking-tighter max-sm:text-[14px] line-clamp-3">
            Slow Horses Deluxe Tenth Anniversary Edition
          </h1>
        </div>

        <div className="flex max-sm:px-1 px-3 max-sm:py-1 py-2 justify-between">
          <div className="flex items-center gap-2">
            <span className="text-[#fa5d29] font-bold tracking-tighter animate-blink">
              100 Points
            </span>
          </div>
        </div>
        {/* price  */}
        {/* enrol  */}
      </div>
    </Link>
  );
};

export default BookItem2;
