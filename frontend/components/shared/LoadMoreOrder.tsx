"use client";
import { fetchOrder } from "@/app/order/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BookOrderItem from "./BookOrderItem";
import { Order } from "@/app/types/bookOrder";

let page = 5;

export type BookItem = JSX.Element;

function LoadMoreOrder({ query }: { query: string }) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Order[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const res = await fetchOrder(page, query);
        if (res.length > 0) {
          setData([...data, ...res]);
          page += 5;
        } else {
          setHasMoreData(false);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (inView && hasMoreData) {
      fetchDataAsync();
    }
    console.log(data);
  }, [inView, query]);

  // Fungsi untuk merender komponen BookOrderItem

  return (
    <>
      {data.map((item: Order) => (
        <BookOrderItem
          bookId={item.bookId}
          orderDate={item.orderDate}
          status={item.status}
          userId={item.userId}
          id={item.id}
          book={item.book}
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
        // Tampilkan pesan jika tidak ada lagi data yang tersedia
        <p className="text-center text-gray-500 mt-4 mb-10 block col-span-full">
          No more data
        </p>
      )}
    </>
  );
}

export default LoadMoreOrder;
