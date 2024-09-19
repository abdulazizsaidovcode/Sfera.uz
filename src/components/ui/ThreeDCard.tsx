"use client";

import React from "react";
import { CardBody, CardContainer, CardItem } from "../ui/3d-card";
import { AuroraBackground } from "./aurora-background";

export function ThreeDCardDemo({
  title,
  desc,
  imgSrc,
}: {
  title: string;
  desc: string;
  imgSrc: string;
}) {
  return (
    <CardContainer className="inter-var">
      <AuroraBackground>
        <CardBody className="relative group/card  dark:hover:shadow-2xl border-black/[0.1] w-auto  h-auto rounded-xl p-6 border  ">
          <CardItem
            translateZ="50"
            className="text-xl font-bold text-neutral-600 dark:text-white"
          >
            {title}
          </CardItem>
          <CardItem
            as="p"
            translateZ="60"
            className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
          >
            {desc}
          </CardItem>
          <CardItem translateZ="100" className="w-full mt-4">
            <img
              src={imgSrc}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt="thumbnail"
            />
          </CardItem>
        </CardBody>
      </AuroraBackground>
    </CardContainer>
  );
}
