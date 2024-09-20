"use client";
import { usePathname } from "next/navigation";
import React from "react";
import { bgColor, BorderColor } from "../Colors";

const Breadcrumbs = ({
  text,
  className,
  textclassName,
}: {
  text: string;
  className: string;
  textclassName?: string;
}) => {
  const pathName = usePathname();
  return (
    <div
      className={`flex justify-between bg-[rgba(73,132,109,0.21)] backdrop-blur-xl w-full rounded-2xl text-xl py-5 px-10 font-semibold ${className}`}
    >
      <h2
        className={`text-[35px] font-bold text-[${BorderColor}] ${textclassName}`}
      >
        {text}
      </h2>
      <h2 className={`hidden md:block text-[${BorderColor}]`}>{pathName}</h2>
    </div>
  );
};

export default Breadcrumbs;
