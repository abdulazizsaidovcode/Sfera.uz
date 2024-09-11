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
import ContactUs from '@/components/Contact/Contact';
import Footer from '@/components/Footer/Footer';

const slideData = [
  {
    title: 'SFETA IT PLATFORM',
    description: `Siz bu platforma orqali bepul kop malumotlar urganishingiz mumkin
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione quod magnam nostrum deleniti? Porro reiciendis, vitae dolorem corrupti perferendis reprehenderit consequuntur odio dolor assumenda repellendus vel molestias officia obcaecati.
    `,
    image: Images.Test
  },
  {
    title: 'SFETA IT PLATFORM',
    description: `Siz bu platforma orqali bepul kop malumotlar urganishingiz mumkin
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione quod magnam nostrum deleniti? Porro reiciendis, vitae dolorem corrupti perferendis reprehenderit consequuntur odio dolor assumenda repellendus vel molestias officia obcaecati.
    `,
    image: Images.Test
  },
  {
    title: 'SFETA IT PLATFORM',
    description: `Siz bu platforma orqali bepul kop malumotlar urganishingiz mumkin
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione quod magnam nostrum deleniti? Porro reiciendis, vitae dolorem corrupti perferendis reprehenderit consequuntur odio dolor assumenda repellendus vel molestias officia obcaecati.
    `,
    image: Images.Test
  },
  {
    title: 'SFETA IT PLATFORM',
    description: `Siz bu platforma orqali bepul kop malumotlar urganishingiz mumkin
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione quod magnam nostrum deleniti? Porro reiciendis, vitae dolorem corrupti perferendis reprehenderit consequuntur odio dolor assumenda repellendus vel molestias officia obcaecati.
    `,
    image: Images.Test
  },
  {
    title: 'SFETA IT PLATFORM',
    description: `Siz bu platforma orqali bepul kop malumotlar urganishingiz mumkin
    Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur ratione quod magnam nostrum deleniti? Porro reiciendis, vitae dolorem corrupti perferendis reprehenderit consequuntur odio dolor assumenda repellendus vel molestias officia obcaecati.
    `,
    image: Images.Test
  },
];

const CardsMap = [
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Front-end",
    description: "Front-end full course",
    link: '/auth/login',
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Back-end ",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: '/auth/login',
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "3DS max",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: '/auth/login',
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Graphic Design",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: '/auth/login',
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Foundation",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: '/auth/login',
  },
  {
    imgSrc: "https://picsum.photos/500/400",
    title: "Robotatexnika",
    description: "A technology company that builds economic infrastructure for the internet.",
    link: '/auth/login',
  },

];
export default function Home() {
  const [queryClient] = useState(() => new QueryClient());

  return (

    <div style={{ backgroundColor: bgColorBody }} className='font-semibold'>
      <title>Sfera uz | Dasturlash kurslari</title>
      <Navbar />
      <div className='container my-0' >
        <QueryClientProvider client={queryClient}>

          <Hero slides={slideData} />
        </QueryClientProvider>
        <div className="">
          <HeaderTitles text='Kursla' size='text-5xl' />
          <Card projects={CardsMap} />
          <HeaderTitles text='Contact us' />
          <ContactUs onSubmit={() => { }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
