"use server";

interface Book {
  id: string;
  title: string;
  writer: string;
  coverImage: string;
  price: number;
  tags: string[];
}

export const fetchBook = async (startIndex: number, query: string) => {
  const res = await fetch(
    `http://localhost:8000/api/v1/books?startIndex=${startIndex}&count=5&query=${query}`
  );

  const data = await res.json();
  // console.log(data);
  //   return data;
  return data;
};
