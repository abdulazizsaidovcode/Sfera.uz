import React from 'react';
import DefTitles from '../Text/DefText';
import { bgColor, BorderColor, TitleTextColor } from '../Colors';

export default function Button({ size, text, isScrolled }) {
    return (
        <div>
            <button
                className={`px-6 md:px-10 py-1 border-2 border-${BorderColor} rounded-lg text-${TitleTextColor} hover:bg-${BorderColor} hover:text-white transition-all duration-300 ${isScrolled ? 'bg-[#C4DAD2]' : bgColor}` }

            >
                <span>
                    <DefTitles text={text} size={size} />
                </span>
            </button>
        </div>
    );
}
