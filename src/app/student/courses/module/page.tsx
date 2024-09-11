"use clent"
import React from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { bgColorBody } from "@/components/Colors";
import { HoverEffect } from "@/components/ui/card-hover-effect";

const Module = () => {
  const CardsMap = [
    {
      imgSrc: "https://picsum.photos/500/400",
      title: "Front-end",
      description: "Front-end full course",
      link: '/student/courses/module',
    },
    {
      imgSrc: "https://picsum.photos/500/400",
      title: "Back-end ",
      description: "A technology company that builds economic infrastructure for the internet.",
      link: '/student/courses/module',
    },
    {
      imgSrc: "https://picsum.photos/500/400",
      title: "3DS max",
      description: "A technology company that builds economic infrastructure for the internet.",
      link: '/student/courses/module',
    },
    {
      imgSrc: "https://picsum.photos/500/400",
      title: "Graphic Design",
      description: "A technology company that builds economic infrastructure for the internet.",
      link: '/student/courses/module',
    },
  
  ];
  return (
    <SidebarDemo>
      <title>Sfera uz | Modul</title>
      <div className="flex ">
        <div className={`p-2 md:p-10 bg-[${bgColorBody}] dark:bg-neutral-900 overflow-y-auto flex flex-col gap-2 w-full`}>
  
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
      </div>
    </SidebarDemo>
  );
};

export default Module;
