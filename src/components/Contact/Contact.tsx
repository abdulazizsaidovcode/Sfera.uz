import Images from '@/assets/ImgSend';
import React, { useState } from 'react';
import HeaderTitles from '../Text/HeadText';
import Image from 'next/image';
import { Input } from '../ui/input';
import { usePost } from '@/context/globalFunctions/usePostOption';
import { contactUs } from '@/context/api/api';

interface ContactUsProps {
    onSubmit: (formData: { name: string; phoneNumber: string; message: string }) => void;
}

const ContactUs: React.FC<ContactUsProps> = ({ onSubmit }) => {
    const [form, setForm] = useState({
        name: '',
        phoneNumber: '',
        message: '',
    });
    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({
            ...form,
            [e.target.id]: e.target.value,
        });
    };

    const { postData, loading, error: postError } = usePost(contactUs, { ...form });

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        // Validate form fields
        if (!form.name || !form.phoneNumber || !form.message) {
            setError('All fields are required.');
            return;
        }

        setError(null);

        // Submit data using the usePost hook
        try {
            const response = postData();

            if (response) {
                onSubmit({ name: form.name, phoneNumber: form.phoneNumber, message: form.message });
                setForm({ name: '', phoneNumber: '', message: '' });
            } else {
                setError('Failed to send message. Please try again.');
            }
        } catch (err) {
            setError('An unexpected error occurred.');
        }
    };

    return (
        <div className="flex lg:flex-row items-center text-white lg:justify-between gap-3 flex-col p-6 bg-[#6A9C89] rounded-xl my-2">
            <div className="w-full mx-auto">
                <form onSubmit={handleSubmit} className="space-y-4 w-full">
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    {postError && <div className="text-red-500 mb-4">{postError}</div>}

                    <div className="flex flex-col">
                        <label htmlFor="name" className="mb-2 font-medium">Name</label>
                        <Input
                            type="text"
                            id="name"
                            value={form.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="phoneNumber" className="mb-2 font-medium">Phone Number</label>
                        <Input
                            type="tel"
                            id="phoneNumber"
                            value={form.phoneNumber}
                            onChange={handleChange}
                            placeholder="Enter your phone number"
                            required
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="message" className="mb-2 font-medium">Message</label>
                        <textarea
                            id="message"
                            value={form.message}
                            onChange={handleChange}
                            required
                            placeholder="Enter your message"
                            className="p-2 border text-[#6A9C89] border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="text-[20px] flex items-center justify-center rounded bg-[#C4DAD2] text-white border px-6 pb-2 mt-4"
                        disabled={loading}
                    >
                        {loading ? 'Sending...' : <HeaderTitles size="text-sm" text="Send Message" />}
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
