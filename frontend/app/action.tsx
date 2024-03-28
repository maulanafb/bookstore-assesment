"use server";

import { DummyBook } from "./_data";

interface Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
}

export const fetchBook = async (
  startIndex: number,
  query: string
): Promise<Book[]> => {
  // Simulate delay to mimic async behavior
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filter data based on the query
  const filteredData = DummyBook.filter((book) =>
    book.title.toLowerCase().includes(query.toLowerCase())
  );

  // Return data starting from the specified index
  return filteredData.slice(startIndex, startIndex + 5);
};
