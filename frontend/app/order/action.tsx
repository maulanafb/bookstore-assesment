import Cookies from "js-cookie";
import { DummyOrder } from "./_data";

export const fetchOrder = async (startIndex: number, query: string) => {
  // Simulate delay to mimic async behavior
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Filter data based on the query
  const filteredData = DummyOrder.filter((order) =>
    order.book.title.toLowerCase().includes(query.toLowerCase())
  );

  // Return data starting from the specified index
  return filteredData.slice(startIndex, startIndex + 5);
};
