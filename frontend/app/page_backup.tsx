"use client";
import { useEffect, useState, useRef } from "react";
import BookItem from "@/components/shared/BookItem";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { useInView } from "react-intersection-observer";
import { SearchInput } from "@/components/shared/SearchInput";

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
  const { ref, inView } = useInView();

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/v1/books?startIndex=${startIndex}&count=5`
      );
      const data = await response.json();
      console.log(data);
      if (data.length === 0) {
        setHasMore(false);
      } else {
        const uniqueNewBooks = data.filter(
          (newBook: Book) => !books.some((book) => book.id === newBook.id)
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

  useEffect(() => {
    if (inView && !fetching) {
      setFetching(true);
      fetchData();
    }
  }, [inView]);

  return (
    <>
      <Navbar />
      <section className="min-h-svh mx-auto">
        <div>
          <h1 className="text-title text-[100px]">Unlock Your Skill&rsquo;s</h1>
        </div>
        <div className="flex py-5 ">All Courses</div>
        <div className="flex justify-center w-[345px] md:w-[1200px] py-2">
          <SearchInput onSearch={() => {}} query="" />
        </div>
        <div className="mx-auto px-5 grid grid-cols-2 mb-10 md:grid-cols-3 lg:grid-cols-5 max-sm:gap-x-4 md:gap-x-8 gap-y-8 mt-[20px] justify-center">
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
      <div ref={ref}>
        <div ref={ref} />
        <Footer />
      </div>
    </>
  );
};

export default Home;
