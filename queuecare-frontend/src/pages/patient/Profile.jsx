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
    } catch {
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
    } catch {
      console.log("Upload failed");
    } finally {
      setImageUploadLoading(false);
    }
  }


  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6 pb-[calc(70px+env(safe-area-inset-bottom))]">
      {/* Header */}
      <Header title="My Profile" />

      {/* Profile Card  */}
      <div className="max-w-2xl mx-auto w-full p-5 flex flex-col items-center space-y-3 relative bg-white rounded-2xl shadow-md">
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
        <h2 className="text-xl sm:text-2xl font-bold text-slate-800">
          {user.name}
        </h2>

        {/* Email */}
        <p className="text-sm text-gray-500">
          {user.email}
        </p>
      </div>

      {/* Details Section */}
      <div className="max-w-2xl mx-auto w-full bg-white rounded-2xl shadow-[0_5px_15px_rgba(0,0,0,0.25)] p-4 sm:p-6 space-y-3">
        {/* Gender */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Gender</span>
          <span className="text-slate-800 font-medium capitalize">
            {user.gender || "Not specified"}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Email */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Email</span>
          <span className="text-slate-800 font-medium break-all text-right sm:text-left">
            {user.email}
          </span>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* joined on */}
        <div className="flex justify-between items-center">
          <span className="text-gray-500 text-sm">Joined on</span>
          <span className="text-gray-400 font-medium">
            {user.createdAt ? user.createdAt.slice(0, 10) : "—"}
          </span>
        </div>
      </div>

      {/* Actions  */}
      <div className="max-w-2xl mx-auto w-full space-y-3">
        {/* Edit Profile */}
        <button
          onClick={() => setShowEditModal(true)}
          className="w-full bg-slate-800 text-white py-3 rounded-4xl font-medium hover:bg-slate-700 transition-colors">
          Edit Profile
        </button>
      </div>

      {/* Edit Modal  */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md rounded-4xl p-6 sm:p-8 space-y-4 shadow-2xl">
            {/* Title */}
            <h2 className="text-xl sm:text-2xl font-semibold text-center text-slate-800">
              Edit Profile
            </h2>

            {/* Name Input */}
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              placeholder="Full Name"
              className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-slate-400"
            />

            {/* Gender Select */}
            <select
              value={formData.gender}
              onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
              className="w-full border rounded-lg p-2 outline-none focus:ring-2 focus:ring-slate-400">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2">
              {/* Cancel */}
              <button
                onClick={() => setShowEditModal(false)}
                className="flex-1 bg-gray-200 text-slate-800 py-2 rounded-4xl hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>

              {/* Save */}
              <button
                onClick={handleUpdateProfile}
                className="flex-1 bg-slate-800 text-white py-2 rounded-4xl hover:bg-slate-700 transition-colors"
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