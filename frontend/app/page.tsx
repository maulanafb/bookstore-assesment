import BookItem from "@/components/shared/BookItem";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { fetchBook } from "./action";
import LoadMore from "@/components/shared/LoadMore";

async function Home() {
  const data = await fetchBook(0);
  return (
    <>
      <Navbar />
      <section className="min-h-svh mx-auto">
        <div className="mx-auto px-5 grid grid-cols-2 mb-10 md:grid-cols-3 lg:grid-cols-5 max-sm:gap-x-4 md:gap-x-8 gap-y-8 mt-[20px] justify-center">
          {data}
        </div>
        <LoadMore />
      </section>

      <Footer />
    </>
  );
}

export default Home;
