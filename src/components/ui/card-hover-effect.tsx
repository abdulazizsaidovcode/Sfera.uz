"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { bgColor, TitleTextColor } from "../Colors";
import { useRouter } from "next/navigation";
import { FiLoader } from "react-icons/fi"; // Import the loading icon from React-icons

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
    let [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
    let [modalVisible, setModalVisible] = useState<boolean>(false); // Modal visibility state
    let [currentItem, setCurrentItem] = useState<any>(null); // Current item state
    const router = useRouter();

    const handleOpenModal = (item: any) => {
        setIsLoading(true); // Set loading state to true when clicked
        setModalVisible(true); // Show the modal
        setCurrentItem(item);

        const token = localStorage.getItem("token");

        setTimeout(() => {
            if (token) {
                router.push("/student/dashboard");
            } else {
                router.push(fallbackUrl || item.link);
            }
            setIsLoading(false); // Reset loading state after navigation
        }, 1000); // Simulate a slight delay for loading
    };

    return (
        <div
            className={cn(
                "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-3 w-full gap-5 py-10",
                className
            )}
        >
            {items.map((item, idx) => (
                <div
                    key={item?.link}
                    className="relative group block p-2 h-full w-full cursor-pointer"
                    onMouseEnter={() => setHoveredIndex(idx)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    onClick={() => handleOpenModal(item)} // Open modal on click
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
                        <button className="text-[20px] rounded text-white border px-6 pb-1 mt-4">
                            Open
                        </button>
                    </Card>
                </div>
            ))}

            {/* Full-Screen Modal */}
            {modalVisible && (
                <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center">
                    <div className=" p-8 rounded-lg relative w-full h-full max-w-4xl">
                        {isLoading ? (
                            <div className="flex items-center justify-center h-full">
                                <FiLoader className="animate-spin text-4xl text-gray-700" />
                            </div>
                        ) : (
                            <div>
                                <h2 className="text-2xl font-bold mb-4">{currentItem?.title}</h2>
                                <img
                                    src={currentItem?.imgSrc}
                                    alt="Modal Image"
                                    className="w-full h-auto mb-4 rounded-lg"
                                />
                                <p className="mb-4">{currentItem?.description}</p>
                                <button
                                    className="bg-blue-500 text-white px-6 py-2 rounded"
                                    onClick={() => {
                                        const token = localStorage.getItem("token");
                                        if (token) {
                                            router.push("/student/dashboard");
                                        } else {
                                            router.push(fallbackUrl || currentItem.link);
                                        }
                                    }}
                                >
                                    Proceed
                                </button>
                                <button
                                    className="absolute top-4 right-4 text-gray-600"
                                    onClick={() => setModalVisible(false)}
                                >
                                    &times; Close
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
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
                    <span className={`text-[${TitleTextColor}]`}>
                        {children}
                    </span>
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
