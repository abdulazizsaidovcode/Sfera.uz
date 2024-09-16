"use client";
import React, { useState } from "react";
import SidebarDemo from "@/components/Sidebar/Sidebar";
import { HoverEffect } from "@/components/ui/card-hover-effect"; // Assuming this is for button effects
import { useGet } from "@/context/globalFunctions/useGetOption"; // Fetch user data from context or API
import { BackgroundLines } from "@/components/ui/background-lines";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import { bgColorBody } from "@/components/Colors";
import { Input } from "@/components/ui/input";

const Profile = () => {
  // Sample data for the user, you can replace this with real data from the backend or context
  const [user, setUser] = useState({
    firstName: "John",
    lastName: "Doe",
    phone: "+998 90 123 45 67",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...user, password: "" });

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
    setFormData({ ...user, password: "" });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you can handle the form submission (send data to the backend)
    console.log("Updated Profile:", formData);
    setUser({ ...formData });
    setIsEditing(false);
  };

  return (
    <SidebarDemo>
      <title>Sfera uz | Profil</title>
      <BackgroundLines className="flex items-center justify-center w-full flex-col">
        <BackgroundGradient className="overflow-hidden w-[400px] rounded-2xl dark:bg-zinc-900">
          <div className="relative z-10 p-6 rounded-lg shadow-lg bg-[#6A9C89] max-w-full">
            <h1
              className={`text-2xl font-bold text-[${bgColorBody}] dark:text-white text-center`}
            >
              Profile
            </h1>
            <div className="flex items-center justify-center mt-4">
              <img
                src="https://png.pngtree.com/png-vector/20191101/ourmid/pngtree-cartoon-color-simple-male-avatar-png-image_1934459.jpg" // Placeholder for user image
                alt="User Profile"
                className="w-24 h-24 rounded-full border-4 border-[#16423C]"
              />
            </div>

            {!isEditing ? (
              <div className="mt-6 w-full flex justify-center items-center flex-col">
                <p
                  className={`text-xl font-semibold text-[${bgColorBody}] dark:text-white`}
                >
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {user.phone}
                </p>
                <button
                  onClick={handleEditToggle}
                  className="mt-4 w-full py-2 bg-[#16423C] text-white font-semibold rounded-lg hover:bg-[#5a8b7a] transition-all duration-200"
                >
                  Edit Profile
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div>
                  <label
                    className={`block text-sm font-medium text-[${bgColorBody}] dark:text-white`}
                  >
                    First Name
                  </label>
                  <Input
                    id="phone"
                    placeholder=" -- --- --"
                    type="text"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                  {/* <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-[${bgColorBody}] dark:text-white focus:ring-[#16423C] focus:border-[#16423C]`}
                  /> */}
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-[${bgColorBody}] dark:text-white`}
                  >
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-[${bgColorBody}] dark:text-white focus:ring-[#16423C] focus:border-[#16423C]`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-[${bgColorBody}] dark:text-white`}
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-[${bgColorBody}] dark:text-white focus:ring-[#16423C] focus:border-[#16423C]"`}
                  />
                </div>

                <div>
                  <label
                    className={`block text-sm font-medium text-[${bgColorBody}] dark:text-white`}
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`mt-1 p-2 w-full border border-gray-300 rounded-md dark:bg-[${bgColorBody}] dark:text-white focus:ring-[#16423C] focus:border-[#16423C]`}
                    placeholder="Enter new password"
                  />
                </div>

                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="mt-4 w-[48%] py-2 bg-[#16423C] text-white font-semibold rounded-lg hover:bg-[#5a8b7a] transition-all duration-200"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={handleEditToggle}
                    className="mt-4 w-[48%] py-2 bg-gray-400 text-white font-semibold rounded-lg hover:bg-gray-500 transition-all duration-200"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </BackgroundGradient>
      </BackgroundLines>
    </SidebarDemo>
  );
};

export default Profile;
