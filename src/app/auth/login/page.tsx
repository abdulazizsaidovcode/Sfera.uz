"use client";
import React, { useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { BackgroundLines } from "@/components/ui/background-lines";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Importing icons from react-icons/fa
import { usePost } from "@/context/globalFunctions/usePostOption";
import { BASE_URL } from "@/context/api/api";

export default function SignupFormDemo() {
  const [formData, setFormData] = useState({
    phoneNumber: "",
    password: "",
    isPasswordVisible: false,
    phoneError: "",
    passwordError: "",
  });
  const { error, loading, postData, response} = usePost(`${BASE_URL}`, {
    phone: `998${formData.phoneNumber}`,
    password: formData.password,
  })

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
          value.length < 4
            ? "Password must be at least 4 characters long."
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Final validation before submission
    if (formData.phoneNumber.length === 9 && formData.password.length >= 4) {
      console.log("Form submitted with:", {
        phone: `998${formData.phoneNumber}`,
        password: formData.password,
      });

    }
  };

  return (
    <BackgroundLines className="flex items-center justify-center w-full flex-col px-4">
      <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black z-10">
        <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
          Welcome to Aceternity
        </h2>
        <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
          Login to aceternity if you can because we don&apos;t have a login flow
          yet
        </p>

        <form className="my-8" onSubmit={handleSubmit}>
          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Phone number</Label>
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
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="••••••••"
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
            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
            type="submit"
          >
            Sign up &rarr;
            <BottomGradient />
          </button>

          <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />
        </form>
      </div>
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
