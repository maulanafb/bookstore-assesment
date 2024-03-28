"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useAuth } from "./authContext";

const DashboardSidebar = ({ className }: { className?: string }) => {
  const { userData } = useAuth();
  return (
    <div
      className={`flex flex-col px-5 py-10 bg-white rounded-2xl max-h-[600px] gap-5 overflow-y-scroll shadow-lg  scrollbar-hided w-[400px] ${className}`}
    >
      <div className="flex flex-col ">
        <Image src={"/account.svg"} alt="avatar" width={60} height={60} />
        <div className="flex flex-col pt-5 gap-2">
          <div className="font-semibold tracking-tighter text-[16px]">
            {userData?.name}
          </div>
          <div className="font-normal text-[#fa5d29] tracking-tighter text-[16px] ">
            {userData?.points} Points
          </div>
        </div>
      </div>
      <hr />
      <div className="flex flex-col gap-2 mt-8">
        <Link href="/order">Order History</Link>
        <a href="/settings">Logout</a>
      </div>
    </div>
  );
};

export default DashboardSidebar;
