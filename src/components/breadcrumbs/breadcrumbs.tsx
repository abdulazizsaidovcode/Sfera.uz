"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { bgColor, BorderColor } from "../Colors";

const Breadcrumbs = ({text, className, textclassName}: {text: string, className: string, textclassName?: string}) => {
  const pathName = usePathname();
  return (
    <div className={`flex justify-between bg-[#ffffff57] w-full text-xl py-5 font-semibold ${className}`}>
      <h2 className={`text-[35px] font-bold text-[${BorderColor}]  ${textclassName}`}>{text}</h2>{" "}
      <h2 className={`hidden md:block text-[${bgColor}]`}>{pathName}</h2>
    </div>
  );
};

export default Breadcrumbs;
