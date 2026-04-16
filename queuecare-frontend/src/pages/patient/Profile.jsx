import React, { useEffect, useState } from "react";
import Header from "../../components/common/Header";
import BottomNav from "../../components/common/BottomNav";
import { getMyProfileApi, updateProfileApi, uploadProfileApi } from "../../api/userApi.js";
import InnerSpinner from "../../components/loaders/InnerSpinner.jsx";

export default function Profile() {

  const [showEditModal, setShowEditModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [imageUploadLoading, setImageUploadLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    gender: "",
  })

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
        console.log("Failed to fetch profile", error);
        return;
      }
    };

    fetchProfile();
  }, [])

  useEffect(() => {
    if (showEditModal && user) {
      setFormData({
        name: user.name || "",
        gender: user.gender || ""
      });
    }
  }, [showEditModal, user])


  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const res = await updateProfileApi(formData);

      if (!res.success) {
        return;
      }

      setUser(res.user);

      setShowEditModal(false);
    } catch (error) {
      console.log("Failed to update profile")
    } finally {
      setLoading(false);
    }
  }

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      setImageUploadLoading(true);
      const res = await uploadProfileApi(file);

      if (!res.success) return;

      // update UI instantly
      setUser(res.user);
    } catch (error) {
      console.log("Upload failed");
    } finally {
      setImageUploadLoading(false);
    }
  }


  return (
    <div className="max-w-md mx-auto px-4 py-6 space-y-6 pb-[calc(70px+env(safe-area-inset-bottom))]">

      {/* Header */}
      <Header title="My Profile" />

      {/* Profile Card */}
      <div className=" p-5 flex flex-col items-center space-y-3 relative">
        {/* Profile Image */}
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 relative cursor-pointer">
          {user.profilePic ? (
            imageUploadLoading ? (
              <div className="w-full h-full flex justify-center items-center">
                <InnerSpinner/>
              </div>
            ) : (
              <img
                src={`${user.profilePic}`}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <div className="w-full h-full bg-gray-200 flex items-center justify-center">
              <div
                className={`w-38 h-38 rounded-full bg-gray-300
                  overflow-hidden relative flex items-end justify-center`}
              >
                {/* Head */}
                <div
                  className={`w-15 h-15 top-6 absolute left-1/2 -translate-x-1/2
                    rounded-full bg-slate-500`}
                />
                {/* Body / shoulders */}
                <div
                  className={`w-27 h-15 rounded-t-full bg-slate-500`}
                />
              </div>
            </div>
          )}

          <input
            type="file"
            accept="image/*"
            className="absolute inset-0 opacity-0 cursor-pointer"
            onChange={handleImageChange}
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
      <div className="bg-white rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.25)] p-4 space-y-3">

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
        <button
          onClick={() => setShowEditModal(true)}
          className="w-full bg-slate-800 text-white py-3 rounded-4xl font-medium">
          Edit Profile
        </button>

      </div>

      {showEditModal && (
        <div className="fixed h-screen inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-80 rounded-4xl p-8 space-y-4 shadow-2xl">

            {/* Title */}
            <h2 className="text-xl font-semibold text-center text-slate-800">
              Edit Profile
            </h2>

            {/* Name Input */}
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full border rounded-lg p-2 outline-none"
            />

            {/* Gender Select */}
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full border rounded-lg p-2 outline-none">
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-2 pt-2">

              {/* Cancel */}
              <button
                onClick={() => setShowEditModal(false)}
                className="w-full bg-gray-200 text-slate-800 py-2 rounded-4xl"
              >
                Cancel
              </button>

              {/* Save */}
              <button
                onClick={handleUpdateProfile}
                className="w-full bg-slate-800 text-white py-2 rounded-4xl"
              >
                {loading ? "Saving..." : "Save"}
              </button>

            </div>

          </div>
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNav />

    </div>
  );
}