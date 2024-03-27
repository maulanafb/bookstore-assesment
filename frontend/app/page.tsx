"use client";
import { useEffect, useState, useRef } from "react";
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
  const [loading, setLoading] = useState<boolean>(false);
  const [startIndex, setStartIndex] = useState<number>(0);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [fetching, setFetching] = useState<boolean>(false);
  const footerRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<Book[]>("/api/v1/books", {
        params: {
          startIndex: startIndex, // Gunakan nilai terbaru dari startIndex
          count: 5,
        },
      });

      if (response.data.length === 0) {
        setHasMore(false);
      } else {
        const uniqueNewBooks = response.data.filter(
          (newBook) => !books.some((book) => book.id === newBook.id)
        );

        setBooks((prevBooks) => [...prevBooks, ...uniqueNewBooks]);
        setStartIndex(startIndex + 5); // Perbarui startIndex
      }
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setFetching(false);
    }
  };

  const handleScroll = () => {
    if (
      footerRef.current &&
      footerRef.current.getBoundingClientRect().top <= window.innerHeight &&
      !fetching &&
      hasMore
    ) {
      setFetching(true);
    }
  };

  useEffect(() => {
    if (fetching) {
      fetchData(); // Fetch data saat fetching berubah
    }
  }, [fetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []); // Tambahkan event listener untuk event scroll

  return (
    <>
      <Navbar />
      <section className="min-h-svh mx-auto">
        <div className="mx-auto px-5 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 max-sm:gap-x-4 md:gap-x-8 gap-y-8 mt-[20px] justify-center">
          {books.map((book) => (
            <BookItem key={book.id} book={book} />
          ))}
          {loading && (
            <div className="col-span-full text-center">Loading...</div>
          )}
          {!loading && !hasMore && (
            <p className="col-span-full text-center">No more books to load</p>
          )}
        </div>
      </section>
      <div ref={footerRef}>
        <Footer />
      </div>
    </>
  );
};

export default Home;
