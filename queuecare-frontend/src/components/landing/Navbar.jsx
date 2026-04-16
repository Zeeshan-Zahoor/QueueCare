import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { getLenis } from '../SmoothScroll';
import { useNavigate } from 'react-router-dom';
import Logo from "../../assets/logo.png";

export default function Navbar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navigate = useNavigate();
    return (
        <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-300 shadow-sm">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">

                    {/* Logo */}
                    <div
                        onClick={() => {
                            const el = document.getElementById("hero");
                            let lenis = getLenis();

                            if (el && lenis) {
                                lenis.scrollTo(el);
                            }
                        }}
                        className="flex items-center gap-2">
                        <div className="w-8 h-8 p-0 bg-transparent text-white rounded-lg flex items-center justify-center font-bold">
                            <img 
                            src={Logo} alt="" />
                        </div>
                        <span className='text-gray-600 font-medium text-xl -ml-2'>ueue</span>
                        <span className="text-xl font-bold text-slate-800 -ml-1.5">Care</span>
                    </div>

                    {/* Desktop Nav */}
                    <div className="hidden md:flex items-center space-x-8">
                        <span
                            onClick={() => {
                                const el = document.getElementById("features");
                                let lenis = getLenis();

                                if (el && lenis) {
                                    lenis.scrollTo(el);
                                }
                            }}
                            className="relative group cursor-pointer">
                            Features
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-slate-800 transition-all group-hover:w-full"></span>
                        </span>
                        <span
                            onClick={() => {
                                const el = document.getElementById("how-it-works");
                                let lenis = getLenis();

                                if (el && lenis) {
                                    lenis.scrollTo(el);
                                }
                            }}
                            className="relative group cursor-pointer">
                            How it works
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-slate-800 transition-all group-hover:w-full"></span>
                        </span>

                        <span
                            onClick={() => navigate("/login")}
                            className="relative group cursor-pointer">
                            Login
                            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-slate-800 transition-all group-hover:w-full"></span>
                        </span>
                        <button
                            onClick={() => navigate("/register")}
                            className="bg-[#3ea789] text-white px-5 py-2 rounded-full font-medium hover:bg-[#2f8f75] transition shadow-sm">
                            Get Started
                        </button>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        className="md:hidden text-slate-800"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    >
                        {mobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 border-t border-slate-300 animate-fadeIn">
                        <div className="flex flex-col space-y-3">
                            <button
                                onClick={() => {
                                    const el = document.getElementById("features");
                                    let lenis = getLenis();

                                    if (el && lenis) {
                                        lenis.scrollTo(el);
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                }}
                                className="text-slate-700 hover:text-slate-900 transition py-2 text-left">
                                Features
                            </button>
                            <button
                                onClick={() => {
                                    const el = document.getElementById("how-it-works");
                                    let lenis = getLenis();

                                    if (el && lenis) {
                                        lenis.scrollTo(el);
                                        setMobileMenuOpen(!mobileMenuOpen)
                                    }
                                }}
                                className="text-slate-700 hover:text-slate-900 transition py-2 text-left">
                                How it works
                            </button>
                            <button
                                onClick={() => navigate("/login")}
                                className="text-slate-700 hover:text-slate-900 transition py-2 text-left">
                                Login
                            </button>
                            <button
                                onClick={() => navigate("/register")}
                                className="bg-slate-800 text-white px-5 py-2 rounded-full font-medium text-center">
                                Get Started
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}