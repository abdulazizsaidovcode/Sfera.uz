"use client";
import React, { useEffect } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { useGet } from "@/context/globalFunctions/useGetOption";
import { HoverEffect } from "@/components/ui/card-hover-effect2";
import { FaUserGraduate } from "react-icons/fa";
import { bgColor } from "@/components/Colors";
import { get_stats } from "@/context/api/api";
import { config } from "@/context/api/token";

const Dashboard = () => {
  const { data, getData, loading } = useGet(`${get_stats}`, config);

  useEffect(() => {
    getData();
  }, []);

  // Function to format numbers based on their length
  const formatNumber = (number: number) => {
    if (number === 0) return "0"; // If the number is undefined, return an empty string

    const numStr = number?.toString();
    const length = numStr?.length;

    if (length <= 3) {
      return numStr; // Less than or equal to 3 digits, return as is
    } else if (length > 3 && length <= 6) {
      return `${numStr.slice(0, -3)}k`; // More than 3 digits but less than or equal to 6, add 'k'
    } else if (length > 6) {
      return `${numStr.slice(0, -6)}mln`; // More than 6 digits, add 'mln'
    }
  };

  const CardsMap = [
    {
      icon: <FaUserGraduate className={`text-[${bgColor}]`} width={"50px"} height={"50px"} />,
      title: "O'quvchilar",
      description: formatNumber(data?.studentCount), // Apply formatting
    },
    {
      icon: <FaUserGraduate className={`text-[${bgColor}]`} width={"50px"} height={"50px"} />,
      title: "Kurslar",
      description: formatNumber(data?.categoryCount), // Apply formatting
    },
    {
      icon: <FaUserGraduate className={`text-[${bgColor}]`} width={"50px"} height={"50px"} />,
      title: "Modullar",
      description: formatNumber(data?.moduleCount), // Apply formatting
    },
    {
      icon: <FaUserGraduate className={`text-[${bgColor}]`} width={"50px"} height={"50px"} />,
      title: "Darslar",
      description: formatNumber(data?.lessonCount), // Apply formatting
    },
  ];

  return (
    <SidebarDemo>
      <title>Sfera uz | Bosh sahifa</title>
      <div className="relative p-2 md:p-10 w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

        <div className="relative z-10 flex flex-wrap justify-center gap-4">
          <HoverEffect className="" items={CardsMap ? CardsMap : []} />
        </div>
      </div>
    </SidebarDemo>
  );
};

export default Dashboard;
