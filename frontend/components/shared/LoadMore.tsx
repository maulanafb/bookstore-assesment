"use client";
import { fetchBook } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BookItem from "./BookItem";

let page = 5;
interface Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
}
export type BookItem = JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Book[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  useEffect(() => {
    if (inView && hasMoreData) {
      fetchBook(page).then((res) => {
        if (res.length > 0) {
          setData([...data, ...res]);
          page += 5;
        } else {
          setHasMoreData(false);
        }
      });
    }
  }, [inView, data, hasMoreData]);

  return (
    <>
      {data.map((item: Book) => (
        <BookItem book={item} key={item.id} />
      ))}
      {hasMoreData ? (
        <section className="flex justify-center items-center w-full">
          <div ref={ref}>
            <Image
              src="./spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        </section>
      ) : (
        <p className="text-center text-gray-500 mt-4 mb-10 col-span-full">
          No more data
        </p>
      )}
    </>
  );
}

export default LoadMore;
