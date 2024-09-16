"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { bgColor, bgColorBody, TitleTextColor } from "../Colors";

export const HoverEffect = ({
  items,
  className,
}: {
  items: {
    title: string;
    description: string | undefined;
    icon: any;
  }[];
  className?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-4  py-10",
        className
      )}
    >
      {items.map((item, idx) => (
        <div
          className="relative group  block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-[#93b3ae] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>
          <Card desc={item?.description ? item.description : "0"} title={item.title} icon={item.icon} />
        </div>
      ))}
    </div>
  );
};

export const Card = ({
  className,
  title,
  desc,
  icon,
}: {
  className?: string;
  title: any;
  desc: any;
  icon: any;
}) => {
  return (
    <div
      className={cn(
        `rounded-2xl h-full w-full p-4 overflow-hidden bg-[#fff] shadow-lg relative z-20`,
        className
      )}
    >
      <div className="relative text-2xl z-50 mt-4">
        <span
          className={`text-[${TitleTextColor}] flex justify-between items-center gap-8`}
        >
          {icon} <CardDescription>{desc}</CardDescription>
        </span>
        <div className="p-3">
          <CardTitle>{title}</CardTitle>
        </div>
      </div>
    </div>
  );
};
export const CardTitle = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <h4
      className={cn(
        `text-[${bgColor}] font-bold tracking-wide mt-4 me-5`,
        className
      )}
    >
      {children}
    </h4>
  );
};
export const CardDescription = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <p
      className={cn(
        ` text-[${bgColor}] text-[50px] font-semibold tracking-wide leading-relaxed`,
        className
      )}
    >
      {children}+
    </p>
  );
};
