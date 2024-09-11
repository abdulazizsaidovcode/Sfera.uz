"use clent";
import React from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";

const Profile = () => {
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
  <title>Sfera uz | Profil</title>
  <div className="relative p-2 md:p-10 w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]">
    {/* Radial gradient for the container to give a faded look */}
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

    <div className="relative z-10 flex flex-wrap justify-center gap-4">
      <HoverEffect items={CardsMap} />
    </div>
  </div>
</SidebarDemo>
  );
};

export default Profile;
