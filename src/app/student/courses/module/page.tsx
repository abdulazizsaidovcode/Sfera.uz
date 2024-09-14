"use client";
import React, { useEffect } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";
import ModuleStore from "@/context/state-management/moduleStore/moduleStore";
import { SparklesCore } from "@/components/ui/sparkles";
import { bgColorBody } from "@/components/Colors";
import ModuleSidebar, { ModuleSidebarProps } from "@/components/Sidebar/moduleSidebar";
import VideoPlayer from "@/components/vedioJs/vedioJsProps";
import { config } from "@/context/api/token";
import { get_lesson, get_module } from "@/context/api/api";

const Module = () => {
  const { CategoryId, VedioLink } = ModuleStore();

  const { data, getData, loading } = useGet(`${get_module}1`, config);
  const { data: lessonData, getData: getLesson, loading: lessonloading } = useGet(
    `${get_lesson}1`,
    config
  );

  useEffect(() => {
    getData();
    getLesson();
  }, []);

  const modules = data?.map((item: any) => ({
    moduleId: item.moduleId,
    name: item.name,
    lessonCount: item.lessonCount,
  }));

  const lessons = lessonData?.map((item: any) => ({
    moduleId: item.moduleId,
    name: item.name,
    lessonId: item.id,
    description: item.description,
    videoLink: item.videoLink,
    videoTime: item.videoTime,
  }));

  console.log("vedioLink", VedioLink);
  
  return (
    <SidebarDemo>
      <title>Sfera uz | Modul</title>
      <div
        className={`relative w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]`}
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {data ? (
          <div className="flex w-full justify-between">
            <div className="flex flex-col gap-5 p-2 md:px-10">
              {/* Add the Video Player with key prop */}
              <VideoPlayer videoId={VedioLink ? VedioLink : ""} />
            </div>
            <ModuleSidebar modules={modules} lessons={lessons} />
          </div>
        ) : (
          <div className="h-screen relative w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
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
            <h1 className="md:text-5xl text-3xl bg-transparent lg:text-6xl font-bold text-center text-[#000] relative z-20">
              Modul topilmadi
            </h1>
          </div>
        )}
      </div>
    </SidebarDemo>
  );
};

export default Module;
