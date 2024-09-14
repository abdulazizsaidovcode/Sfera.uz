"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowDropDownLine, RiDashboardHorizontalFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useLessonStore } from "@/context/state-management/lessonStore/lossonStore";
import { Meteors } from "../ui/meteors";
import ModuleStore from "@/context/state-management/moduleStore/moduleStore";

export interface ModuleSidebarProps {
  modules: { moduleId: number; name: string; categoryId: number }[];
  lessons: {
    moduleId: number | null;
    name: string | null;
    lessonId: number;
    description: string | null;
    videoLink: string | null;
    videoTime: number | null;
  }[];
}

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({ modules, lessons }) => {
  const [activeModule, setActiveModule] = useState<number | null>(null);
  const { setSelectedLessonId, selectedLessonId } = useLessonStore();
  const { setVedioLink } = ModuleStore();

  useEffect(() => {
    // Bitta modul va dars bo'lgandagina bu effect ishga tushadi
    if (modules.length > 0 && lessons.length > 0 && activeModule === null) {
      const firstModule = modules[0];
      const firstModuleLessons = lessons.filter((lesson) => lesson.moduleId === firstModule.moduleId);

      if (firstModuleLessons.length > 0) {
        setActiveModule(firstModule.moduleId);
        setSelectedLessonId(firstModuleLessons[0].lessonId);
        setVedioLink(firstModuleLessons[0].videoLink);
      }
    }
  }, [lessons, modules, activeModule, setSelectedLessonId, setVedioLink]);

  // Modulni ochish yoki yopish
  const toggleAccordion = (moduleId: number) => {
    setActiveModule((prevModule) => (prevModule === moduleId ? null : moduleId));
  };

  // Dars bosilganda videoni set qilish
  const handleLessonClick = (lessonId: number, videoLink: string | null) => {
    setSelectedLessonId(lessonId);
    setVedioLink(videoLink);
  };

  return (
    <motion.div
      className={cn(
        "h-screen fixed top-0 right-0 px-4 py-4 hidden md:flex md:flex-col bg-[#16423C] w-[300px] text-[#E9EFEC] shadow-lg"
      )}
      animate={{ width: "280px" }}
    >
      <div className="flex relative flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Meteors number={50} />

        <div className="flex items-center mb-6">
          <RiDashboardHorizontalFill className="text-[#6A9C89] text-2xl" />
          <h1 className="text-xl ml-2 font-semibold">Modules</h1>
        </div>

        <div className="space-y-4">
          {modules?.map((module) => (
            <div key={module.moduleId}>
              <div
                className="flex justify-between items-center cursor-pointer px-4 py-2 rounded-md bg-[#6A9C89] hover:bg-[#54907F] transition"
                onClick={() => toggleAccordion(module.moduleId)}
              >
                <span className="font-medium text-lg">{module.name}</span>
                <RiArrowDropDownLine
                  className={`text-2xl transition-transform ${
                    activeModule === module.moduleId ? "rotate-180" : ""
                  }`}
                />
              </div>

              <AnimatePresence>
                {activeModule === module.moduleId && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden bg-[#E9EFEC] text-[#16423C] rounded-md mt-2"
                  >
                    <ul className="p-4 space-y-2">
                      {lessons
                        ?.filter((lesson) => lesson.moduleId === module.moduleId)
                        .map((lesson) => (
                          <li
                            key={lesson.lessonId}
                            className={`text-base cursor-pointer transition ${
                              selectedLessonId === lesson.lessonId
                                ? "text-[#16423C] font-bold"
                                : "hover:text-[#6A9C89]"
                            }`}
                            onClick={() =>
                              handleLessonClick(lesson.lessonId, lesson.videoLink)
                            }
                          >
                            {lesson.name || "No name"}
                          </li>
                        ))}
                      {lessons.every((lesson) => lesson.moduleId !== module.moduleId) && (
                        <li className="text-base cursor-pointer transition text-[#6A9C89] font-bold">
                          Darslik topilmadi
                        </li>
                      )}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ModuleSidebar;
