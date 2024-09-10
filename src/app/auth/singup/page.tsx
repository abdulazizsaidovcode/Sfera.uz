"use client";
import Images from '@/assets/ImgSend';
import Button from '@/components/Button/Button';
import HeaderTitles from '@/components/Text/HeadText';
import { BackgroundLines } from '@/components/ui/background-lines';
import { Input } from '@/components/ui/input';
import { Regester } from '@/context/api/api';
import { usePost } from '@/context/globalFunctions/usePostOption';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';

export default function Signup() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        password: '',
        isPasswordVisible: false,
    });
    const { postData } = usePost(Regester, formData);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({
            ...prev,
        }));
    };

    const handlePasswordToggle = () => {
        setFormData((prev) => ({
            ...prev,
            isPasswordVisible: !prev.isPasswordVisible,
        }));
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        postData();
    };

    return (
        <BackgroundLines>
            <div className="min-h-screen flex font-semibold items-center text-white justify-center bg-[#E9EFEC]">
                <title>
                    Register | Create your account
                </title>
                <div className="bg-[#6A9C89] z-50 p-8 rounded-lg shadow-lg w-full max-w-md">
                    <h2 className="text-2xl w-full flex items-center justify-center font-bold text-center mb-6">
                        <Image src={Images.Logo} alt='.' width={150} />
                    </h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="firstName">
                                First Name
                            </label>
                            <Input
                                type="text"
                                name="firstName"
                                id="firstName"
                                value={formData.firstName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Enter your first name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="lastName">
                                Last Name
                            </label>
                            <Input
                                type="text"
                                name="lastName"
                                id="lastName"
                                value={formData.lastName}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Enter your last name"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="phone">
                                Phone Number
                            </label>
                            <Input
                                type="text"
                                name="phone"
                                id="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Enter your phone number"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2" htmlFor="password">
                                Password
                            </label>
                            <Input
                                type={formData.isPasswordVisible ? "text" : "password"}
                                name="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                onClick={handlePasswordToggle}
                                className="mt-2 text-indigo-600"
                            >
                                {formData.isPasswordVisible ? "Hide" : "Show"} Password
                            </button>
                        </div>

                        <button
                            type="submit"
                            className={`w-full pb-2 pr-2 bg-[#E9EFEC] text-md rounded-md transition duration-300 `}
                        >
                            <HeaderTitles text='Sign up' size='text-md' />
                        </button>
                    </form>
                    <p className="text-center mt-4">
                        Already have an account? <Link href="/login" className="text-indigo-600 underline">Log In</Link>
                    </p>
                </div>
            </div>
        </BackgroundLines>
    );
}
