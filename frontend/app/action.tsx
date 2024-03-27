"use server";

import BookItem from "@/components/shared/BookItem";
import BookItem2 from "@/components/shared/BookItem2";

interface Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
}

export const fetchBook = async (startIndex: number) => {
  const res = await fetch(
    `http://localhost:8000/api/v1/books?startIndex=${startIndex}&count=5`
  );

  const data = await res.json();
  console.log(startIndex);
  //   return data;
  return data.map((item: Book) => <BookItem book={item} key={item.id} />);
};
