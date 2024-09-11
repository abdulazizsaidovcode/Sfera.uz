"use clent";
import React from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { bgColorBody } from "@/components/Colors";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";

const Dashboard = () => {
  // const {} = useGet()
  const CardsMap = [
    {
      imgSrc: "https://picsum.photos/500/400",
      title: "Front-end",
      description: "Front-end full course",
      link: "/student/courses/module",
    },
    {
      imgSrc: "https://picsum.photos/500/400",
      title: "Back-end ",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "/student/courses/module",
    },
    {
      imgSrc: "https://picsum.photos/500/400",
      title: "3DS max",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "/student/courses/module",
    },
    {
      imgSrc: "https://picsum.photos/500/400",
      title: "Graphic Design",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "/student/courses/module",
    },
  ];
  return (
    <SidebarDemo>
      <title>Sfera uz | Kurslar</title>
      <div className={` p-2 md:p-10 w-full dark:bg-black bg-white dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative flex items-center justify-center`}>
        {/* Radial gradient for the container to give a faded look */}
        <div className={`absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]`}></div>

        <HoverEffect items={CardsMap} />
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </SidebarDemo>
  );
};

export default Dashboard;
