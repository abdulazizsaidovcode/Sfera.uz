"use client";

import React, { useEffect } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";
import { get_category } from "@/context/api/api";
import { Config } from "@/context/api/token";
import { bgColorBody } from "@/components/Colors";
import { SparklesCore } from "@/components/ui/sparkles";

const Courses = () => {
  const { data, getData, loading } = useGet(get_category, Config().headers);

  useEffect(() => {
    getData();
  }, []);

  const CardsMap = data?.map((item: any) => ({
    id: item.id,
    imgSrc: item?.fileId || item?.fileId !== 0 ? `http://142.93.106.195:8080/file/files/${item?.fileId}` : "https://img.freepik.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg",
    title: item.name,
    description: item.description,
    link: "/student/courses/module",
    module: item?.module ? item?.module : 0
  }));

  return (
    <SidebarDemo>
      <title>Sfera uz | Kurslar</title>
      <div className={`relative ${CardsMap ? "p-2 md:p-10" : ""} w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]`}>
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        {CardsMap ? (
          <div className="relative z-10 flex flex-wrap justify-center gap-4">
            <HoverEffect items={CardsMap ? CardsMap : null} />
          </div>
        ) : (
          <div className={`h-screen relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md`}>
            <div className="w-full absolute inset-0 h-screen">
              <SparklesCore
                id="tsparticlesfullpage"
                background="transparent"
                minSize={0.6}
                maxSize={1.4}
                particleDensity={100}
                className="w-full h-full"
                particleColor="#000"
              />
            </div>
            <h1 className={`md:text-7xl text-3xl bg-transparent lg:text-6xl font-bold text-center text-[#000] relative z-20`}>
              Kurslar topilmadi☹
            </h1>
          </div>
        )}
      </div>
    </SidebarDemo>
  );
};

export default Courses;
