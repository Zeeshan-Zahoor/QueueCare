import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import BottomNav from "../../components/common/BottomNav";
import { getMyProfileApi } from "../../api/userApi.js";

export default function Profile() {

  const [user, setUser] = useState({
    name: "",
    email: "",
    gender: "",
    profilePic: "",
    createdAt: "",
  })

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await getMyProfileApi();

        if (res.success) {
          setUser(res.user);
        }
      } catch (error) {
        console.log("Failed to fetch profile", error.message);
        return;
      }
    };

    fetchProfile();
  }, [])

  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 h-dvh">

      {/* Header */}
      <Header title="My Profile" />

      {/* Profile Card */}
      <div className=" p-5 flex flex-col items-center space-y-4">

        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200">
          {user.profilePic ? (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            // Placeholder when no profile picture
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <span className="text-gray-400 text-2xl">
                {user.name ? user.name.charAt(0).toUpperCase() : "?"}
              </span>
            </div>
          )}
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


        {/* Divider */}
        <hr className="border-gray-200" />

        {/* joined on */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Joined on</span>
          <span className="text-gray-400 font-medium">
            {(user.createdAt).slice(0, 10)}
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