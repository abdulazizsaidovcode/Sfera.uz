"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { bgColor, TitleTextColor } from "../Colors";
import { useRouter } from "next/navigation";

export const HoverEffect = ({
  items,
  className,
  fallbackUrl,
}: {
  items: {
    title: string;
    description: string;
    link: string;
    imgSrc: string;
  }[];
  className?: string;
  fallbackUrl?: string;
}) => {
  let [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const router = useRouter();

  const handleNavigation = (link: string) => {
    const token = localStorage.getItem("token");
    if (token) {
      router.push(fallbackUrl || link);
    } else {
      router.push("/auth/login");
    }
  };

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3   2xl:grid-cols-4 w-full gap-5 py-10",
        className
      )}
    >
      {items &&
        items.map((item, idx) => (
          <div
            key={item?.link}
            className="relative group block p-2 h-full w-full cursor-pointer"
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            onClick={() => handleNavigation(item?.link)} // Call handleNavigation on click
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
            <Card className="flex flex-col gap-3" imgSrc={item.imgSrc}>
              <CardTitle>{item.title}</CardTitle>
              <CardDescription>{item.description}</CardDescription>
              <div className="flex">
                <button className="text-[20px] rounded text-white border px-6 pb-1 mt-4">
                  view
                </button>
              </div>
            </Card>
          </div>
        ))}
    </div>
  );
};

export const Card = ({
  className,
  children,
  imgSrc,
}: {
  className?: string;
  children: React.ReactNode;
  imgSrc: string;
}) => {
  return (
    <div
      className={cn(
        `rounded-2xl h-full w-full p-4 overflow-hidden bg-[${bgColor}] shadow-lg relative z-20`,
        className
      )}
    >
      <img
        src={imgSrc}
        alt="Card Image"
        className="w-full h-auto object-cover rounded-lg"
      />
      <div className="relative text-2xl z-50 mt-4">
        <div className="p-4">
          <span className={`text-[${TitleTextColor}]`}>{children}</span>
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
    <h4 className={cn("text-zinc-100 font-bold tracking-wide", className)}>
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
        "mt-2 text-zinc-400 tracking-wide leading-relaxed text-sm",
        className
      )}
    >
      <span className="text-[#E9EFEC]">{children}</span>
    </p>
  );
};
