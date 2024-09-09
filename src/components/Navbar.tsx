import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { bgColor, BorderColor, TitleTextColor } from './Colors';
import DefTitles from './Text/DefText';
import Button from './Button/Button';

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);

    const handleScroll = () => {
        if (window.scrollY > 100) {
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
        <div className={`fixed w-full z-50 px-6 md:px-24 py-3 transition-all duration-500 ${isScrolled ? 'bg-[#6A9C89] shadow-md text-white' : bgColor}`}>
            <div className="flex justify-between items-center">
                {/* Logo */}
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
