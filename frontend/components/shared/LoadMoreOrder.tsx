"use client";
import { fetchOrder } from "@/app/order/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BookOrderItem from "./BookOrderItem";

let page = 5;

export type BookItem = JSX.Element;

function LoadMoreOrder() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<BookItem[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  useEffect(() => {
    if (inView && hasMoreData) {
      fetchOrder(page).then((res) => {
        if (res.length > 0) {
          setData([...data, ...res]);
          page += 5;
        } else {
          setHasMoreData(false);
        }
      });
    }
  }, [inView, data, hasMoreData]);
  console.log(data);
  return (
    <>
      {data.map((item: any) => (
        <BookOrderItem
          book={item.book}
          bookId={item.bookId}
          userId={item.userId}
          id={item.id}
          orderDate={item.orderDate}
          status={item.Status}
          key={item.id}
        />
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
        <p className="text-center text-gray-500 mt-4 mb-10 block col-span-full">
          No more data
        </p>
      )}
    </>
  );
}

export default LoadMoreOrder;
