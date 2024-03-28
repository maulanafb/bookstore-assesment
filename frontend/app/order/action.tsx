"use client";
import Cookies from "js-cookie";

export const fetchOrder = async (startIndex: number, query: string) => {
  const authToken = Cookies.get("CC_COOKIES");
  console.log(authToken);
  const res = await fetch(
    `http://localhost:8000/api/v1/orders?offset=${startIndex}&limit=5&query=${query}`,
    {
      headers: {
        Authorization: `bearer ${authToken}`,
      },
    }
  );

  const data = await res.json();
  console.log(data);
  //   return data;
  return data;
};
