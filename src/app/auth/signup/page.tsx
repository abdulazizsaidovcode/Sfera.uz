"use client"
import Images from '@/assets/ImgSend';
import Button from '@/components/Button/Button';
import { bgColorBody } from '@/components/Colors';
import HeaderTitles from '@/components/Text/HeadText';
import { BackgroundLines } from '@/components/ui/background-lines';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import React, { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        password: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Handle form submission (e.g., send data to API)
        console.log(formData);
    };
    bgColorBody
    return (
        <BackgroundLines>
            <div className="min-h-screen flex font-semibold items-center justify-center bg-[#E9EFEC]">
                <div className="bg-[#6A9C89] opacity p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl w-full flex items-center justify-center font-bold text-center text-gray-800 mb-6">
                        <Image src={Images.Logo} width={150} />
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="name">
                                Name
                            </label>
                            <Input
                                type="text"
                                name="name"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Enter your name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="email">
                                <HeaderTitles text=' Phone Number' size='text-[]' />
                            </label>
                            <Input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Enter your PhoneNumber"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block text-gray-700 mb-2" htmlFor="password">
                                Password
                            </label>
                            <Input
                                type="password"
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            text='Sing up'
                            className="w-full pb-2 pr-2 bg-[#E9EFEC] text-md  rounded-md  transition duration-300"
                        >
                            <HeaderTitles text='Sing in' size='text-md' />
                        </button>
                    </form>
                    <p className="text-center text-gray-500 mt-4">
                        Already have an account? <a href="/login" className="text-indigo-600">Log In</a>
                    </p>
                </div>
            </div>
        </BackgroundLines>
    );
}
