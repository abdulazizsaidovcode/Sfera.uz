"use client";
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RiArrowDropDownLine, RiDashboardHorizontalFill } from "react-icons/ri";
import { cn } from "@/lib/utils";
import { useLessonStore } from "@/context/state-management/lessonStore/lossonStore";
import { Meteors } from "../ui/meteors";

interface ModuleSidebarProps {
  modules: { moduleId: number; name: string; categoryId: number }[];
  lessons: { moduleId: number; lessonId: number; name: string }[];
}

const ModuleSidebar: React.FC<ModuleSidebarProps> = ({ modules, lessons }) => {
  const [activeModule, setActiveModule] = useState<number | null>(modules[0].moduleId); // First module is open by default
  const { setSelectedLessonId, selectedLessonId } = useLessonStore(); // Zustand store

  // Set first lesson of the first module as default
  useEffect(() => {
    const firstModuleLessons = lessons.filter(
      (lesson) => lesson.moduleId === modules[0].moduleId
    );
    if (firstModuleLessons.length > 0) {
      setSelectedLessonId(firstModuleLessons[0].lessonId);
    }
  }, [lessons, modules, setSelectedLessonId]);

  // Function to toggle the active accordion
  const toggleAccordion = (moduleId: number) => {
    setActiveModule((prevModule) => (prevModule === moduleId ? null : moduleId));
  };

  // Handle lesson click
  const handleLessonClick = (lessonId: number) => {
    setSelectedLessonId(lessonId);
  };

  return (
    <motion.div
      className={cn(
        `h-screen fixed top-0 right-0 px-4 py-4 hidden md:flex md:flex-col bg-[#16423C] w-[300px] text-[#E9EFEC] shadow-lg`
      )}
      animate={{
        width: "280px",
      }}
    >
      <div className="flex relative flex-col flex-1 overflow-y-auto overflow-x-hidden">
      <Meteors number={50} />

        {/* Sidebar Header */}
        <div className="flex items-center mb-6">
          <RiDashboardHorizontalFill className="text-[#6A9C89] text-2xl" />
          <h1 className="text-xl ml-2 font-semibold">Modules</h1>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {modules.map((module) => (
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

              {/* Accordion Content - Lessons */}
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
                        .filter((lesson) => lesson.moduleId === module.moduleId)
                        .map((lesson) => (
                          <li
                            key={lesson.lessonId}
                            className={`text-base cursor-pointer transition ${
                              selectedLessonId === lesson.lessonId
                                ? "text-[#6A9C89] font-bold"
                                : "hover:text-[#6A9C89]"
                            }`}
                            onClick={() => handleLessonClick(lesson.lessonId)}
                          >
                            {lesson.name}
                          </li>
                        ))}
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
