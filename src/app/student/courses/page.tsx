"use client";

import React, { useEffect } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";
import { get_category } from "@/context/api/api";
import { Config } from "@/context/api/token";

const Courses = () => {
  const { data, getData, loading } = useGet(get_category, Config().headers);

  useEffect(() => {
    getData();
  }, []);

  const CardsMap = data?.map((item: any) => ({
    imgSrc: "https://picsum.photos/500/400",
    title: item.name,
    description: item.description,
    link: "/student/courses/module",
  }));


  return (
    <SidebarDemo>
      <title>Sfera uz | Kurslar</title>
      <div className="relative p-2 md:p-10 w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          <HoverEffect items={CardsMap ? CardsMap : null} />
        </div>
      </div>
    </SidebarDemo>
  );
};

export default Courses;
