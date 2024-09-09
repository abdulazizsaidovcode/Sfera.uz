'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import Image from 'next/image';
import HeaderTitles from '../Text/HeadText';

type Slide = {
    title: string;
    description: string;
    description2?: string; 
    image: string;
};
type HeroProps = {
    slides: Slide[] | any;
};

const Hero: React.FC<HeroProps> = ({ slides }) => {
    return (
        <div className="relative h-screen select-none w-full mt-10 md:mt-0">
            <Swiper
                modules={[Navigation, Autoplay]}
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                loop={true}
                pagination={{ clickable: true }}
                navigation={true}
                spaceBetween={50}
                slidesPerView={1}
                className="h-full"
            >
                {slides.map((slide: any, index: number) => (
                    <SwiperSlide key={index} className="h-auto flex items-center justify-center">
                        <div className="flex flex-col-reverse lg:flex-row justify-center items-center h-full p-4 lg:p-8">
                            <div className="w-full lg:w-1/2 text-white lg:text-left text-center lg:mb-0 mb-4">
                                <HeaderTitles size='text-4xl' text={slide.title} />
                                <p className="text-[#6A9C89] hidden lg:flex lg:text-lg text-base mt-4">
                                    {slide.description}
                                </p>
                                {slide.description2 && (
                                    <p className="text-[#6A9C89] hidden lg:flex lg:text-lg text-base mt-4">
                                        {slide.description2}
                                    </p>
                                )}
                            </div>
                            <div className="w-full lg:w-1/2 flex justify-center mt-4 lg:mt-0">
                                <Image className="rounded-lg" src={slide.image} alt="Hero image" width={400} height={400} />
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Customizing Navigation Buttons and Pagination Bullets */}
            <style jsx>{`
                :global(.swiper-button-next),
                :global(.swiper-button-prev) {
                    color: #16423C;
                    width: 30px;
                    height: 30px;
                    margin-top: -20px;
                }

                :global(.swiper-button-next:after),
                :global(.swiper-button-prev:after) {
                    font-size: 20px;
                }

                :global(.swiper-pagination-bullet) {
                    background-color: white;
                    opacity: 1;
                }

                :global(.swiper-pagination-bullet-active) {
                    opacity: 1;
                }
            `}</style>
        </div>
    );
};

export default Hero;
