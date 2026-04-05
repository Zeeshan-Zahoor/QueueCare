import { useState } from "react";
import { Mail, User, Hospital, Lock } from "lucide-react";

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.64 9.2045c0-.6381-.0573-1.2518-.1636-1.8409H9v3.4814h4.8436c-.2086 1.125-.8427 2.0782-1.7959 2.7164v2.2581h2.9087c1.7018-1.5668 2.6836-3.874 2.6836-6.615z" fill="#4285F4"/>
    <path d="M9 18c2.43 0 4.4673-.806 5.9564-2.1805l-2.9087-2.2581c-.8059.54-1.8368.859-3.0477.859-2.3441 0-4.3282-1.5832-5.036-3.7105H.9574v2.3318C2.4382 15.9832 5.4818 18 9 18z" fill="#34A853"/>
    <path d="M3.964 10.71c-.18-.54-.2822-1.1168-.2822-1.71s.1023-1.17.2822-1.71V4.9582H.9574C.3477 6.1732 0 7.5482 0 9s.3477 2.8268.9574 4.0418L3.964 10.71z" fill="#FBBC05"/>
    <path d="M9 3.5795c1.3214 0 2.5077.4541 3.4405 1.346l2.5813-2.5814C13.4632.8918 11.4259 0 9 0 5.4818 0 2.4382 2.0168.9574 4.9582L3.964 7.29C4.6718 5.1627 6.6559 3.5795 9 3.5795z" fill="#EA4335"/>
  </svg>
);

export default function UserRegistration() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  })

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-6 py-10">
      <div className="bg-white rounded-3xl shadow-lg w-full max-w-sm px-8 py-10 flex flex-col items-center">

        {/* Logo */}
        <div className="flex flex-col items-center gap-2 mb-6">
          <Hospital />
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
              <User />
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
              <Mail />
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
              <Lock />
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
          <button className="w-full py-3.5 mt-1 bg-slate-800 text-white rounded-xl text-sm font-semibold hover:bg-slate-700 active:scale-[0.98] transition-all cursor-pointer">
            Create Account
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-1">
            <span className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400">or</span>
            <span className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Google Button */}
          <button className="w-full py-3 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 bg-white flex items-center justify-center gap-2.5 hover:bg-gray-50 active:scale-[0.98] transition-all cursor-pointer">
            <GoogleIcon />
            Sign Up with Google
          </button>

          {/* Sign In Link */}
          <p className="text-xs text-gray-500 text-center">
            Do you have an account?{" "}
            <button className="text-slate-800 font-semibold hover:underline cursor-pointer">
              Sign In
            </button>
          </p>

        </div>
      </div>
    </div>
  );
}