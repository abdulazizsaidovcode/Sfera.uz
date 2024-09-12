"use client";
import React, { useEffect } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";
import { get_module } from "@/context/api/api";
import ModuleStore from "@/context/state-management/moduleStore/moduleStore";
import { SparklesCore } from "@/components/ui/sparkles";
import { bgColorBody } from "@/components/Colors";
import { config } from "../../../../context/api/token";
import { Meteors } from "@/components/ui/meteors";

const Module = () => {
  const { CategoryId } = ModuleStore();
  const { data, getData, loading } = useGet(
    `http://142.93.106.195:8080/module/byCategory/1`,
    config
  );

  console.log("Category id: ", CategoryId);

  useEffect(() => {
    getData();
  }, []);

  return (
    <SidebarDemo>
      <title>Sfera uz | Modul</title>
      <div
        className={`relative ${
          data ? "p-2 md:p-10" : ""
        } w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]`}
      >
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {data ? (
          <div className="flex flex-col gap-5">
            {data?.map(() => (
              <div className=" w-full relative max-w-full">
                <div className="absolute inset-0 h-full w-full bg-gradient-to-r from-blue-500 to-teal-500 transform scale-[0.80] bg-red-500 rounded-full blur-3xl" />
                <div className="relative shadow-xl bg-gray-900 border border-gray-800  px-4 py-8 h-full overflow-hidden rounded-2xl flex justify-between items-start">
                  <h1 className="font-bold text-xl text-white mb-4 relative z-50">
                    Meteors because they&apos;re cool
                  </h1>

                  <button className="border px-4 py-1 rounded-lg  border-gray-500 text-gray-300">
                    Explore
                  </button>
                  <div className="h-5 w-5 rounded-full border flex items-center justify-center mb-4 border-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="h-2 w-2 text-gray-300"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.5 4.5l15 15m0 0V8.25m0 11.25H8.25"
                      />
                    </svg>
                  </div>

                  {/* Meaty part - Meteor effect */}
                  <Meteors number={50} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className={`h-screen relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md`}
          >
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
            <h1
              className={`md:text-5xl text-3xl bg-transparent lg:text-6xl font-bold text-center text-[#000] relative z-20`}
            >
              Modul topilmadi☹
            </h1>
          </div>
        )}
      </div>
    </SidebarDemo>
  );
};

export default Module;
