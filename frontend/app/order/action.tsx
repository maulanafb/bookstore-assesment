"use client";
import Cookies from "js-cookie";

export const fetchOrder = async (startIndex: number) => {
  const authToken = Cookies.get("CC_COOKIES");
  console.log(authToken);
  const res = await fetch(
    `http://localhost:8000/api/v1/orders?offset=${startIndex}&limit=5`,
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
