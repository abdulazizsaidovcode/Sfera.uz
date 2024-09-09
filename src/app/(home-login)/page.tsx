'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Hero from '@/components/Hero/Hero-slide';
import Images from '@/assets/ImgSend';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import Navbar from '@/components/Navbar';
import HeaderTitles from '@/components/Text/HeadText';
import { Card } from '@/components/Cards/Card';

const slideData = [
  {
    title: 'Hello',
    description: 'HEllo',
    image: Images.Test
  },
  {
    title: 'Hello',
    description: 'HEllo',
    image: Images.Test
  },
  {
    title: 'Hello',
    description: 'HEllo',
    image: Images.Test
  },
  {
    title: 'Title',
    description: 'HEllo',
    image: Images.Test
  },
];
const navItems = [
  { name: 'Home', link: '/' },
  { name: 'Courses', link: '/courses' },
  { name: 'Profile', link: '/profile' },
];

export const bgColor = '#E9EFEC';
const CardsMap = [
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Front-end",
    description: "Front-end full course",
    link: "#",
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Stripe",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "#",
  },
  // Add more cards if needed...
];
export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (

    <div style={{ backgroundColor: bgColor }} className='font-semibold'>
      <Navbar />
      <BackgroundBeamsWithCollision>
        <div className='container my-0' >
          <QueryClientProvider client={queryClient}>

            <Hero slides={slideData} />
          </QueryClientProvider>
          <div className="">
            <HeaderTitles text='Kursla' size='text-5xl' />
            <Card projects={CardsMap} />
          </div>
        </div>

      </BackgroundBeamsWithCollision>
    </div>
  );
}
