import { useState } from "react";
import { Mail, User, Hospital, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { registerUserApi } from "../../api/userApi.js";
import GoogleAuthBtn from "../../components/patient/GoogleAuthBtn.jsx";

export default function UserRegistration() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleRegisterUser = async () => {
    if(!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    try {
      setLoading(true);
      const res = await registerUserApi(formData);

      if (!res.success) {
        console.log("Failed to register user", res.error);
        setError(res.message || "Registration failed");
        return;
      }

      navigate("/login");

    } catch (error) {
      console.log("Error registering user");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-3xl shadow-lg w-full h-screen sm:max-w-sm sm:h-auto sm:max-h-[90%] px-8 py-10 flex flex-col items-center">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <Hospital size={50} className="text-slate-800" />
          <span className="text-base font-semibold tracking-tight">
            <span className="text-gray-500">Queue</span>
            <span className="text-slate-800 font-bold">Care</span>
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-7">
          <h1 className="text-xl font-bold text-slate-800 mb-1">Create Account</h1>
          <p className="text-sm text-gray-400">We are here to help you!</p>
        </div>

        {/* Form */}
        <div className="w-full flex flex-col gap-3">

          {/* Name */}
          <div className="relative flex items-center">
            <span className="absolute left-3.5 pointer-events-none flex items-center">
              <User size={18} className="text-gray-400" />
            </span>
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                name: e.target.value
              }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-slate-800 bg-gray-50 outline-none focus:border-[#1a2744] transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Email */}
          <div className="relative flex items-center">
            <span className="absolute left-3.5 pointer-events-none flex items-center">
              <Mail size={18} className="text-gray-400" />
            </span>
            <input
              type="email"
              placeholder="Your email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                email: (e.target.value).toLowerCase(),
              }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-slate-800 bg-gray-50 outline-none focus:border-[#1a2744] transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Password */}
          <div className="relative flex items-center">
            <span className="absolute left-3.5 pointer-events-none flex items-center">
              <Lock size={18} className="text-gray-400" />
            </span>
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                password: e.target.value,
              }))}
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-slate-800 bg-gray-50 outline-none focus:border-[#1a2744] transition-colors placeholder:text-gray-400"
            />
          </div>

          {/* Create Account Button */}
          <button
            onClick={handleRegisterUser}
            disabled={loading}
            className="w-full py-3.5 mt-1 bg-slate-800 text-white rounded-4xl text-sm font-semibold hover:bg-slate-700 active:scale-[0.98] transition-all cursor-pointer">
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          {error && (
            <p className="text-red-500 text-sm text-center">{error}</p>
          )}

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Button */}
          <GoogleAuthBtn 
            text={"signup_with"}
          />

          {/* Sign In Link */}
          <p className="text-xs text-gray-500 text-center">
            Do you have an account?{" "}
            <button
              onClick={() => navigate("/login")}
              className="text-blue-600 font-semibold hover:underline cursor-pointer">
              Sign In
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}