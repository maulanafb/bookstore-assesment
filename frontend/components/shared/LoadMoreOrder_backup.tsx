"use client";
import { fetchOrder } from "@/app/order/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import BookOrderItem from "./BookOrderItem";
import { Order } from "@/app/types/bookOrder";

let page = 5; // Ubah page menjadi 1, karena biasanya dimulai dari halaman pertama
export type BookItem = JSX.Element;
function LoadMoreOrderCopy({
  query,
  onQueryChange,
}: {
  query: string;
  onQueryChange: (newQuery: string) => void;
}) {
  const { ref, inView } = useInView();
  const [data, setData] = useState<Order[]>([]);
  const [hasMoreData, setHasMoreData] = useState<boolean>(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const res = await fetchOrder(page, query);
        if (res.length > 0) {
          setData([...data, ...res]);
          page += 5; // Tambah 1 ke halaman setelah memuat data
        } else {
          setHasMoreData(false);
        }
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    if (inView && hasMoreData) {
      fetchDataAsync();
      console.log("queryberubah");
    }
  }, [inView, query]);

  useEffect(() => {
    setData([]); // Reset data when query changes
    page = 1; // Reset page number
    setHasMoreData(true); // Reset hasMoreData
  }, [query]); // Triggered when query changes

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
        <section className="flex justify-center items-center w-full" ref={ref}>
          <div>
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

export default LoadMoreOrderCopy;
