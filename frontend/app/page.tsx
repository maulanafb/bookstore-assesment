// import CourseItem from "@/components/shared/CourseItem";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { SearchInput } from "@/components/shared/SearchInput";
import React from "react";

const Home = () => {
  return (
    <>
      <Navbar />
      <section className="min-h-svh  mx-auto">
        <div className="mx-auto items-center flex flex-col py-10">
          <div>
            <h1 className="text-title text-[100px]">
              Unlock Your Skill&rsquo;s
            </h1>
          </div>
          <div className="flex py-5 ">All Books</div>
          <div className="flex justify-center w-[345px] md:w-[1200px] py-2">
            <SearchInput />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-8 mt-[20px] justify-center"></div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Home;
