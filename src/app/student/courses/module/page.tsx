"use client";
import React, { useEffect, useState } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect";
import { useGet } from "@/context/globalFunctions/useGetOption";
import ModuleStore from "@/context/state-management/moduleStore/moduleStore";
import { SparklesCore } from "@/components/ui/sparkles";
import { bgColor, bgColorBody } from "@/components/Colors";
import ModuleSidebar from "@/components/Sidebar/moduleSidebar";
import VideoPlayer from "@/components/vedioJs/vedioJsProps";
import { config } from "@/context/api/token";
import { get_lesson, get_module, post_question } from "@/context/api/api";
import { useLessonStore } from "@/context/state-management/lessonStore/lossonStore";
import { RadioGroup } from "@headlessui/react";
import {
  RiCheckboxBlankCircleLine,
  RiCheckboxCircleFill,
} from "react-icons/ri";
import { usePost } from "@/context/globalFunctions/usePostOption";
import Breadcrumbs from "@/components/breadcrumbs/breadcrumbs";

const Module = () => {
  const { CategoryId, VedioLink } = ModuleStore();
  const {
    questionData,
    setNextLessonId,
    nextLessonId,
    setCurrentLessonId,
    currentLessonId,
    result,
    setResult,
  } = useLessonStore();

  const { data, getData, loading: getLoading } = useGet(
    `${get_module}${CategoryId}`,
    config
  );
  const { error, loading: postLoading, postData, response } = usePost(
    `${post_question}${currentLessonId}?nextLessonId=${nextLessonId}`,
    result,
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

  console.log(error);
  console.log(response);
  console.log(result);

  useEffect(() => {
    if (response) {
      getLesson();
    }
  }, [response]);

  // Testni yakunlash
  const handleFinishTest = async () => {
    try {
      // Step 1: Get the current lessonId from the questionData
      const currentLessonIdToSet =
        questionData?.length > 0 ? questionData[0].lessonId : null;
      setCurrentLessonId(currentLessonIdToSet);

      // Step 2: Find the current lesson index from the lessons array
      const currentLessonIndex = lessons?.findIndex(
        (lesson: any) => lesson.lessonId === currentLessonIdToSet
      );

      // Step 3: Get the next lessonId if it exists
      const nextLessonIdToSet =
        currentLessonIndex !== -1 && currentLessonIndex + 1 < lessons.length
          ? lessons[currentLessonIndex + 1].lessonId
          : null;
      setNextLessonId(nextLessonIdToSet);

      // Step 4: Collect selected answers for the result
      const finalResultData = Object.keys(selectedAnswers).map(
        (questionId) => ({
          questionId: Number(questionId),
          optionId: selectedAnswers[Number(questionId)],
        })
      );
      setResult(finalResultData);

      // Final result object including lessonId and nextLessonId
      const finalResult = {
        lessonId: currentLessonIdToSet,
        nextLessonId: nextLessonIdToSet,
        answers: finalResultData,
      };

      // console.log("Test yakunlandi, final result:", finalResult);

      // Step 5: Wait for setCurrentLessonId, setNextLessonId, and setResult to finish
      // Then call postData()
      await postData();

      // Step 6: Reset selected answers after finishing the test
      setSelectedAnswers({}); // This will clear the selected answers
    } catch (error) {
      // console.error("Error finishing the test:", error);
    }
  };

  return (
    <SidebarDemo>
      <title>Sfera uz | Modul</title>
      <div
        className={`relative w-full min-h-screen overflow-y-auto dark:bg-black bg-[${bgColorBody}] dark:bg-dot-white/[0.2] bg-dot-black/[0.3]`}
      >
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-[${bgColorBody}] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <Breadcrumbs text="Lesson" className="ps-10 lg:pe-[317px]"/>
        {data ? (
          <div className="flex w-full justify-between">
            <div className="flex flex-col w-full lg:mr-[277px] p-2 md:px-10">
              {/* Video Player */}
              <VideoPlayer videoId={!VedioLink ? "VedioLink" : "https://www.youtube.com/watch?v=eMQGZHOcw2U"} />
              <div className={`mt-4 p-4 bg-[${bgColor}] rounded-md`}>
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
                      {postLoading ? "Loading.." : "Testni yakunlash"}
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
