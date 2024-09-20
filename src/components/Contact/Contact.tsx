import Images from '@/assets/ImgSend';
import React, { useState } from 'react';
import HeaderTitles from '../Text/HeadText';
import Image from 'next/image';
import { Input } from '../ui/input';

interface ContactUsProps {
    onSubmit: (formData: { name: string; email: string; message: string }) => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onSubmit }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState<string | null>(null);
    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!name || !email || !message) {
            setError('All fields are required.');
            return;
        }
        setError(null);
        onSubmit({ name, email, message });
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="flex lg:flex-row items-center text-white lg:justify-between gap-3 flex-col p-6 bg-[#6A9C89] rounded-xl my-2">
            <div className="w-full  mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-medium">Name</label>
                        <Input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            // required
                            placeholder='Enter your name '
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="email" className="mb-2 font-medium">Email</label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Enter your email'
                            required
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="message" className="mb-2 font-medium">Message</label>
                        <textarea
                            id="message"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            required
                            placeholder='Enter Messege'
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="text-[20px] flex  items-center justify-center rounded bg-[#C4DAD2] text-white border px-6 pb-2 mt-4"
                    >
                        <HeaderTitles size='text-sm ' text='Send Messege' />
                    </button>
                </form>
            </div>
            <div className="w-full mx-auto lg:p-10">
                <Image className="rounded-lg" src={Images.Test} alt="Hero image" width={400} height={400} />
            </div>
        </div>
    );
};

export default ContactUs;
