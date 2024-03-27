"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/lib/axiosInstance";
import BookItem from "@/components/shared/BookItem";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

interface Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
}

const Home = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const response = await axiosInstance.get<Book[]>("/api/v1/books");

        setBooks(response.data);
        console.log(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching books:", error);
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <Navbar />
      <section className="min-h-svh mx-auto">
        <div className="mx-auto items-center flex flex-col py-10">
          <div>
            <h1 className="text-title text-[80px] tracking-tighter max-sm:text-[25px] max-sm:font-bold">
              Open Book, Open Your Mind.
            </h1>
          </div>
          <div className="flex py-5">All Books</div>
          {/* SearchInput component */}
          <div className="flex justify-center w-[345px] md:w-[1200px] py-2">
            {/* Your SearchInput component */}
          </div>
          <div className="mx-auto px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-sm:gap-x-4 md:gap-x-8 gap-y-8 mt-[20px] justify-center">
            {/* Render BookItem component for each book */}
            {books.map((book) => (
              <BookItem key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
