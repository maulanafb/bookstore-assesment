"use client";
import BookItem from "@/components/shared/BookItem";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { fetchBook } from "./action";
import LoadMore from "@/components/shared/LoadMore";
import { useEffect, useState } from "react";
import { SearchInput } from "@/components/shared/SearchInput";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { SearchIcon } from "lucide-react";
interface Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
}

function Home() {
  const [booksData, setBooksData] = useState<Book[] | null>(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    fetchDataAsync();
  }, [query]);

  const fetchDataAsync = async () => {
    try {
      const data = await fetchBook(0, query);
      setBooksData(data);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  };

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
  };

  const handleQueryChange = (newQuery: string) => {
    setQuery(newQuery);
  };

  return (
    <>
      <Navbar />
      <section className="min-h-svh mx-auto">
        <div className="mx-auto items-center flex flex-col py-10">
          <div>
            <h1 className="text-title text-[100px]">
              Unlock Your Skill&rsquo;s
            </h1>
          </div>
          <div className="flex py-5 ">All Courses</div>
          <div className="flex justify-center w-[345px] md:w-[1200px] py-2">
            <SearchInput query={query} onSearch={handleSearch} />{" "}
          </div>
        </div>

        <div className="mx-auto px-5 grid grid-cols-2 mb-10 md:grid-cols-3 lg:grid-cols-5 max-sm:gap-x-4 md:gap-x-8 gap-y-8 mt-[20px] justify-center">
          {booksData?.map((item: Book) => (
            <BookItem book={item} key={item.id} />
          ))}
          <LoadMore query={query} onQueryChange={handleQueryChange} />{" "}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
