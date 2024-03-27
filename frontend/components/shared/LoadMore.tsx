"use client";
import { fetchBook } from "@/app/action";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

let page = 5;

export type BookItem = JSX.Element;

function LoadMore() {
  const { ref, inView } = useInView();
  const [data, setData] = useState<BookItem[]>([]);
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
      <section className="mx-auto px-5 grid grid-cols-2 mb-10 md:grid-cols-3 lg:grid-cols-5 max-sm:gap-x-4 md:gap-x-8 gap-y-8 mt-[20px] justify-center">
        {data}
      </section>
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
        <p className="text-center text-gray-500 mt-4 mb-10">No more data</p>
      )}
    </>
  );
}

export default LoadMore;
