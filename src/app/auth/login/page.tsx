"use client";
import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons from react-icons/fa
import { usePost } from "@/context/globalFunctions/usePostOption";
import { BASE_URL } from "@/context/api/api";
import { bgColor, bgColorBody } from "@/components/Colors";
import HeaderTitles from "@/components/Text/HeadText";
import Image from "next/image";
import Images from "@/assets/ImgSend";
import { Cover } from "@/components/ui/cover";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Link from "next/link";

export default function SignupFormDemo() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    isPasswordVisible: false,
    phoneError: "",
    passwordError: "",
  });
  const { error, loading, postData, response } = usePost(
    `${BASE_URL}auth/login`,
    {
      phoneNumber: `+998${formData.phoneNumber}`,
      password: formData.password,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    // Handle phone number validation
    if (id === "phone") {
      const numericValue = value.replace(/\D/g, ""); // Remove non-numeric characters
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

  const handleSubmit = () => {
    // Final validation before submission
    if (formData.phoneNumber.length === 9 && formData.password.length >= 4) {
      postData();
    }
  };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <BackgroundGradient className="overflow-hidden rounded-2xl dark:bg-zinc-900">

      <div
        className={`max-w-md w-full rounded-2xl mx-auto p-4 md:p-8 shadow-input bg-[${bgColor}] dark:bg-black z-10`}
      >
        <div className="w-full flex items-center justify-center mb-6">
          <Image alt="." src={Images.Logo} width={150} />
        </div>
        <p className="text-white text-center text-sm max-w-sm mt-2 dark:text-neutral-300">
          Tizimga kirish uchun malumotlaringizni to'gri kiriting!
        </p>

        <div className="my-8">
          <LabelInputContainer className="mb-4">
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
                maxLength={12} // Allow space for +998 and dashes
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
          <LabelInputContainer className="mb-4">
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
            className={`bg-[${bgColorBody}] flex justify-center items-center pb-2 relative group/btn dark:from-zinc-900 dark:to-zinc-900 dark:bg-zinc-800 w-full rounded-md shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]`}
            onClick={() => {
              handleSubmit()
            }}
          >
            <HeaderTitles text="Log in" size="text-lg" />
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-5 h-[1px] w-full" />

          <div className="flex flex-col md:flex-row justify-center items-center w-full gap-3">
            <p className="text-white text-lg font-semibold text-center max-w-sm dark:text-neutral-300">
              I have not account.
            </p>
            <Link href={"/auth/signup"} className="text-sm">
              <Cover>SIGN UP</Cover>
            </Link>
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
