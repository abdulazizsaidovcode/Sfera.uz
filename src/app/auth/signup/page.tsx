"use client";
import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { usePost } from "@/context/globalFunctions/usePostOption";
import { BASE_URL, Regester } from "@/context/api/api";
import { bgColor, bgColorBody } from "@/components/Colors";
import HeaderTitles from "@/components/Text/HeadText";
import Image from "next/image";
import Images from "@/assets/ImgSend";
import { Cover } from "@/components/ui/cover";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function SignupFormDemo() {
    const [formData, setFormData] = useState({
        phoneNumber: "",
        lastname: "",
        firstname: "",
        password: "",
        isPasswordVisible: false,
        firstnameError: "",
        lastnameError: "",
        phoneError: "",
        passwordError: "",
    });
    const { error, loading, postData, response } = usePost(
        `${Regester}`,
        {
            lastname: formData.lastname,
            firstname: formData.firstname,
            phoneNumber: `998${formData.phoneNumber}`,
            password: formData.password,
        }
    );

    const router = useRouter();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        if (id === "phone") {
            const numericValue = value.replace(/\D/g, "");
            if (numericValue.length <= 9) {
                setFormData((prev) => ({
                    ...prev,
                    phoneNumber: numericValue,
                    phoneError:
                        numericValue.length !== 9
                            ? "Phone number must be exactly 9 digits."
                            : "",
                }));
            }
        }
        if (id === "firstname") {
            setFormData((prev) => ({
                ...prev,
                firstname: value,
                firstnameError:
                    value.trim() === "" ? "First name is required." : "",
            }));
        }

        if (id === "lastname") {
            setFormData((prev) => ({
                ...prev,
                lastname: value,
                lastnameError:
                    value.trim() === "" ? "Last name is required." : "",
            }));
        }
        // Handle password validation
        if (id === "password") {
            setFormData((prev) => ({
                ...prev,
                password: value,
                passwordError:
                    value.length < 5
                        ? "Password must be at least 5 characters long."
                        : "",
            }));
        }
    };

    const handlePasswordToggle = () => {
        setFormData((prev) => ({
            ...prev,
            isPasswordVisible: !prev.isPasswordVisible,
        }));
    };

    const handleSubmit = async () => {
        if (formData.phoneNumber.length === 9 && formData.password.length >= 4) {
            try {
                await postData();
                response  && toast.success( 'Kirildi')
                router.push('/auth/login');
            } catch (err) {
                // console.error("Signup failed:", err);
                // toast.error('')
            }
        }
    };

    return (
        <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
            <BackgroundGradient className=" overflow-hidden rounded-none md:rounded-2xl dark:bg-zinc-900">
                <div className={`lg:min-w-[500px] w-[300px] mx-auto p-4 md:p-8 shadow-input bg-[${bgColor}] dark:bg-black z-10`}>
                    <div className="w-full flex items-center justify-center mb-6">
                        <Image alt="." src={Images.Logo} width={150} />
                    </div>
                    <h1 className="text-xl font-semibold text-white">Create your account</h1>
                    <div className="my-8">
                        <LabelInputContainer className="md:mb-4 mb-2">
                            <Label className="text-white font-semibold" htmlFor="firstname">
                                First Name
                            </Label>
                            <Input
                                id="firstname"
                                placeholder="First Name"
                                type="text"
                                value={formData.firstname}
                                onChange={handleChange}
                            />
                            {formData.firstnameError && (
                                <p className="text-red-500 text-sm mt-1">{formData.firstnameError}</p>
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer className="md:mb-4 mb-2">
                            <Label className="text-white font-semibold" htmlFor="lastname">
                                Last Name
                            </Label>
                            <Input
                                id="lastname"
                                placeholder="Last Name"
                                type="text"
                                value={formData.lastname}
                                onChange={handleChange}
                            />
                            {formData.lastnameError && (
                                <p className="text-red-500 text-sm mt-1">{formData.lastnameError}</p>
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer className="md:mb-4 mb-2">
                            <Label className="text-white font-semibold" htmlFor="phone">
                                Phone number
                            </Label>
                            <div className="relative">
                                <Input
                                    id="phone"
                                    placeholder=" -- --- --"
                                    type="text"
                                    value={formData.phoneNumber}
                                    onChange={handleChange}
                                    maxLength={12}
                                    className="pl-[3rem]"
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 left-0 flex items-center pl-3"
                                    onClick={handlePasswordToggle}
                                >
                                    +998
                                </button>
                            </div>
                            {formData.phoneError && (
                                <p className="text-red-500 text-sm mt-1">{formData.phoneError}</p>
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer className="md:mb-4 mb-2">
                            <Label className="text-white font-semibold" htmlFor="password">
                                Password
                            </Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    placeholder="•••••"
                                    type={formData.isPasswordVisible ? "text" : "password"}
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute inset-y-0 right-0 flex items-center pr-3"
                                    onClick={handlePasswordToggle}
                                >
                                    {formData.isPasswordVisible ? <FaEye /> : <FaEyeSlash />}
                                </button>
                            </div>
                            {formData.passwordError && (
                                <p className="text-red-500 text-sm mt-1">
                                    {formData.passwordError}
                                </p>
                            )}
                        </LabelInputContainer>

                        <button
                            disabled={loading}
                            className={`${loading? 'bg-[#3d857b]    ':"bg-[#E9EFEC] "} flex justify-center items-center pb-2 relative group/btn dark:from-zinc-900 dark:to-zinc-900 dark:bg-zinc-800 w-full rounded-md shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
                            onClick={handleSubmit}
                        >
                            <HeaderTitles color={loading ? "text-white" : "text-transparent"} text={loading ?'loading....' :"Sign-up"} size="text-lg" />
                            <BottomGradient />
                        </button>

                        <div className="bg-gradient-to-r from-transparent  my-5 h-[1px] w-full" />

                        <div className="flex justify-center items-center w-full gap-3">
                            <p className="text-white text-lg font-semibold text-center max-w-sm dark:text-neutral-300">
                                I have an account: <Link className="text-blue-800 underline" href={'/auth/login'}>Log-in</Link>
                            </p>
                        </div>
                    </div>
                </div>
            </BackgroundGradient>
        </BackgroundLines>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
