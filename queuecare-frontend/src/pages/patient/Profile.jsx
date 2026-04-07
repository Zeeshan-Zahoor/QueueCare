import React from "react";
import Header from "../../components/common/Header";
import BottomNav from "../../components/common/BottomNav";

export default function Profile() {
  // You will connect logic (user data, handlers)

  const user = {
    name: "John Doe",
    email: "john@example.com",
    gender: "male",
    profilePic: "https://avatar.iran.liara.run/public/boy"
  };

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 h-dvh">

      {/* Header */}
      <Header title="My Profile" />

      {/* Profile Card */}
      <div className=" p-5 flex flex-col items-center space-y-4">
        
        {/* Profile Image */}
        <div className="w-30 h-30 rounded-full overflow-hidden border-4 border-gray-200">
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Name */}
        <h2 className="text-xl font-bold text-slate-800">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-sm text-gray-500">
          {user.email}
        </p>
      </div>

      {/* Details Section */}
      <div className="bg-white rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.25)] p-5 space-y-4">

        {/* Gender */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Gender</span>
          <span className="text-slate-800 font-medium capitalize">
            {user.gender}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Email */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Email</span>
          <span className="text-slate-800 font-medium">
            {user.email}
          </span>
        </div>

      </div>

      {/* Actions */}
      <div className="space-y-3">

        {/* Edit Profile */}
        <button className="w-full bg-slate-800 text-white py-3 rounded-2xl font-medium">
          Edit Profile
        </button>

      </div>

      {/* Bottom Navigation */}
      <BottomNav />

    </div>
  );
}