import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { bgColor, BorderColor, TitleTextColor } from './Colors';
import DefTitles from './Text/DefText';
import Button from './Button/Button';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 150) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className={`fixed w-full z-50 px-6 md:px-24 py-4 transition-all border-b-2 border-[#6A9C89] duration-500 ${isScrolled ? 'bg-[#6A9C89]  border-[#7ca495] shadow-md text-white' : bgColor}`}>
            <div className="flex justify-between items-center">
                <div className={`text-${TitleTextColor} text-2xl md:text-3xl font-bold`}>
                    Sfera
                </div>
                <div>
                    <Link href="/singin" passHref>
                        <Button
                            size="text-lg"
                            text="Log-in"
                            isScrolled={isScrolled}
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
}
