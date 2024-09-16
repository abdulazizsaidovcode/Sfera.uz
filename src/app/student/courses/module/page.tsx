"use client";
import React, { useEffect, useState } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";
import ModuleStore from "@/context/state-management/moduleStore/moduleStore";
import { SparklesCore } from "@/components/ui/sparkles";
import { bgColorBody } from "@/components/Colors";
import ModuleSidebar from "@/components/Sidebar/moduleSidebar";
import VideoPlayer from "@/components/vedioJs/vedioJsProps";
import { config } from "@/context/api/token";
import { get_lesson, get_module } from "@/context/api/api";
import { useLessonStore } from "@/context/state-management/lessonStore/lossonStore";
import { RadioGroup } from "@headlessui/react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";

const Module = () => {
  const { CategoryId, VedioLink } = ModuleStore();
  const { questionData } = useLessonStore();

  const { data, getData, loading } = useGet(
    `${get_module}${CategoryId}`,
    config
  );
  const {
    data: lessonData,
    getData: getLesson,
    loading: lessonloading,
  } = useGet(`${get_lesson}${CategoryId}`, config);

  const [selectedAnswers, setSelectedAnswers] = useState<{
    [key: number]: number;
  }>({});

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
    lessonActive: item.userActive,
  }));

  // Handle answer selection
  const handleSelectAnswer = (questionId: number, optionId: number) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionId }));
  };

  // Testni yakunlash
  const handleFinishTest = () => {
    const result = Object.keys(selectedAnswers).map((questionId) => ({
      questionId: Number(questionId),
      selectedOption: selectedAnswers[Number(questionId)],
    }));

    console.log("Test yakunlandi, tanlangan javoblar:", result);
  };

  return (
    <SidebarDemo>
      <title>Sfera uz | Modul</title>
      <div
        className={`relative w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]`}
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        {data ? (
          <div className="flex w-full justify-between">
            <div className="flex flex-col bg-slate-800 w-full lg:mr-[300px] p-2 md:px-10">
              {/* Video Player */}
              <VideoPlayer videoId={VedioLink ? VedioLink : ""} />
            <div className="mt-4 p-4 bg-[#E9EFEC] rounded-md">
              {questionData?.length > 0 ? (
                <div>
                  {questionData.map((question: any) => (
                    <div key={question.id} className="mb-6">
                      <h3 className="text-xl font-semibold text-[#16423C] mb-3">
                        {question.name}
                      </h3>
                      <RadioGroup
                        value={selectedAnswers[question.id]}
                        onChange={(value: any) =>
                          handleSelectAnswer(question.id, value)
                        }
                        className="space-y-2"
                      >
                        {question.optionDto.map((option: any) => (
                          <RadioGroup.Option
                            key={option.id}
                            value={option.id}
                            className={({
                              active,
                              checked,
                            }: {
                              active: any;
                              checked: boolean;
                            }) =>
                              `flex items-center p-2 rounded-lg cursor-pointer bg-white shadow-md ${
                                checked
                                  ? "border-2 border-[#6A9C89]"
                                  : "border border-gray-300"
                              }`
                            }
                          >
                            {({ checked }: { checked: boolean }) => (
                              <>
                                {checked ? (
                                  <RiCheckboxCircleFill className="text-[#6A9C89] text-2xl mr-2" />
                                ) : (
                                  <RiCheckboxBlankCircleLine className="text-[#6A9C89] text-2xl mr-2" />
                                )}
                                <span className="text-lg text-[#16423C]">
                                  {option.answer}
                                </span>
                              </>
                            )}
                          </RadioGroup.Option>
                        ))}
                      </RadioGroup>
                    </div>
                  ))}

                  {/* Testni yakunlash tugmasi */}
                  <button
                    onClick={handleFinishTest}
                    className="w-full py-2 mt-4 bg-[#6A9C89] text-[#16423C] font-semibold text-lg rounded-md hover:bg-[#54907F]"
                  >
                    Testni yakunlash
                  </button>
                </div>
              ) : (
                <p className="text-[#16423C]">No questions available.</p>
              )}
            </div>
            </div>
              {/* Test Section */}
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
