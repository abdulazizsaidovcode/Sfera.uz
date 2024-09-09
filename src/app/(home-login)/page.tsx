'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import Hero from '@/components/Hero/Hero-slide';
import Images from '@/assets/ImgSend';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';
import Navbar from '@/components/Navbar';
import HeaderTitles from '@/components/Text/HeadText';
import { Card } from '@/components/Cards/Card';
import { bgColorBody } from '@/components/Colors';

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


const CardsMap = [
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Front-end",
    description: "Front-end full course",
    link: "/login",
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Back-end ",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "/login",
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "3DS max",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "/login",
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Graphic Design",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: "/login",
  },

];
export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (

    <div style={{ backgroundColor: bgColorBody }} className='font-semibold'>
      <Navbar />
      <div className='container my-0' >
        <QueryClientProvider client={queryClient}>

          <Hero slides={slideData} />
        </QueryClientProvider>
        <div className="">
          <HeaderTitles text='Kursla' size='text-5xl' />
          <Card projects={CardsMap} />
        </div>
      </div>

    </div>
  );
}
