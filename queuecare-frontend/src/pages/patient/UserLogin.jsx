import { useState, useEffect } from "react";
import { Hospital, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { loginUserApi } from "../../api/userApi.js";
import GoogleAuthBtn from "../../components/patient/GoogleAuthBtn.jsx";

export default function UserLogin() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })

  const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };
  
  const handleLoginUser = async () => {
    if (!formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }
    if(!isValidEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }
    try {
      setError("");
      setLoading(true);
      const res = await loginUserApi(formData);

      if (!res.success) {
        setError(res.message || "Login failed");
        return;
      }

      localStorage.setItem("user_jwt_token", res.user_jwt_token);
      navigate('/home', { replace: true });

    } catch (error) {
      console.log("Error loggin in user");
      setError("Something went wrong");
      return;
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
          <h1 className="text-xl font-bold text-slate-800 mb-1">Hi, Welcome Back!</h1>
          <p className="text-sm text-gray-400">Hope you're doing fine.</p>
        </div>

        {/* Form */}
        <div className="w-full flex flex-col gap-3">

          {/* Email */}
          <div className="relative flex items-center">
            <span className="absolute left-3.5 pointer-events-none flex items-center">
              <Mail size={18} className="text-gray-400" />
            </span>
            <input
              type="email"
              placeholder="Email"
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

          {/* Sign In Button */}
          <button
            onClick={handleLoginUser}
            disabled={loading}
            className="w-full py-3.5 mt-1 bg-slate-800 text-white rounded-4xl text-sm font-semibold hover:bg-slate-700 active:scale-[0.98] transition-all cursor-pointer">
            {loading ? "Signing In..." : "Sign In"}
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
            text="signin_with"
          />

          {/* Forgot Password */}
          <button
            onClick={() => navigate("/forgot-password")}
            className="text-sm font-medium text-blue-600 hover:text-orange-600 text-center transition-colors cursor-pointer">
            Forgot password?
          </button>

          {/* Sign Up Link */}
          <p className="text-xs text-gray-500 text-center">
            Don't have an account yet?{" "}
            <button
              onClick={() => navigate("/register")}
              className="text-blue-600 font-semibold hover:underline cursor-pointer">
              Sign up
            </button>
          </p>

          <p 
          onClick={() => navigate("/clinic")}
          className="text-xs font-medium text-blue-600 hover:text-green-600 text-center transition-colors cursor-pointer hover:underline">Sign in as Clinic</p>

        </div>
      </div>
    </div>
  );
}