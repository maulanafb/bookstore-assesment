"use client";
import DashboardSidebar from "@/components/shared/DashboardSidebar";
import Navbar from "@/components/shared/Navbar";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { fetchOrder } from "./action";
import Link from "next/link";
import BookOrderItem from "@/components/shared/BookOrderItem";
import { Book, BookItemProps, Order } from "../types/bookOrder";
import LoadMoreOrder from "@/components/shared/LoadMoreOrder";

const MyOrder = () => {
  const [booksData, setbooksData] = useState<Order[] | null>(null);
  console.log(booksData);
  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        const data = await fetchOrder(0);
        setbooksData(data);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchDataAsync();
  }, []);

  return (
    <>
      <Navbar />
      <section className="flex mx-auto p-5 gap-10 max-lg:justify-center">
        {/* sidebar */}
        <DashboardSidebar className="hidden lg:block" />
        <div className="flex flex-col gap-10 max-md:">
          <div className="flex flex-col gap-5">
            <h1 className="max-lg:justify-center text-[36px] text-gray-700 font-bold tracking-tighter text-center lg:text-start leading-[40px] relative">
              My Order
            </h1>
            <p className="max-w-md text-gray-500">
              A bookstore is a place where you can find a world of stories
              waiting to be discovered.
            </p>
          </div>
          <div
            className={`grid ${
              booksData && booksData.length > 0 ? "grid-cols-4" : "grid-cols-1"
            }  gap-5`}
          >
            {/* map over booksData and render each course */}
            {booksData && booksData.length > 0 ? (
              booksData.map((order: Order) => (
                <BookOrderItem
                  userId={order.userId}
                  book={order.book}
                  bookId={order.bookId}
                  id={order.id}
                  orderDate={order.orderDate}
                  status={order.status}
                  key={order.id}
                />
              ))
            ) : (
              <div className="flex flex-col justify-center mx-auto mb-10 w-full gap-5">
                <span className="text-[26px] text-center font-semibold text-gray-600 ">
                  You have no order yet 😢
                </span>
                <Link
                  href={"/"}
                  className="px-3 py-1 bg-primary rounded-2xl text-center font-semibold text-white"
                >
                  All books Page
                </Link>
              </div>
            )}
            <LoadMoreOrder />
          </div>
        </div>
      </section>
    </>
  );
};

export default MyOrder;
