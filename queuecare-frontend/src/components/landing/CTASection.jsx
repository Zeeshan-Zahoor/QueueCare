import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function CTASection() {
    const navigate = useNavigate();


    return (
        <section className="py-20 px-3 bg-linear-to-r from-slate-900 via-slate-800 to-slate-700 relative overflow-hidden">

            {/* Glow Background */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(62,167,137,0.15),transparent)]"></div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">

                {/* CTA */}
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-6">
                    Start managing queues smarter today
                </h2>

                <p className="text-lg text-slate-300 mb-8 max-w-2xl mx-auto">
                    Get Started and save your time. It is free, fast, and effortless.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">

                    {/* Get Started */}
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-[#3ea789]/30 blur-xl rounded-full opacity-70"></div>

                        <button
                            onClick={() => navigate('/register')}
                            className="relative bg-[#3ea789] text-white px-8 py-3.5 rounded-full font-semibold text-lg hover:bg-[#2f8f75] hover:shadow-xl transition-all hover:scale-105 active:scale-95 inline-flex items-center gap-2 group"
                        >
                            Get Started
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition" />
                        </button>
                    </div>

                    {/* Login */}
                    <button
                        onClick={() => navigate('/login')}
                        className="border border-slate-500 text-white px-8 py-3.5 rounded-full font-semibold hover:bg-slate-700 transition-all"
                    >
                        Login
                    </button>
                </div>

                {/* Clinic */}
                <p className="text-sm text-slate-400 mt-6">
                    Are you a clinic?{' '}
                    <span
                        onClick={() => navigate('/clinic')}
                        className="text-[#3ea789] font-medium cursor-pointer hover:underline"
                    >
                        Login here
                    </span>
                </p>

                <p className="text-xs text-slate-500 mt-2">
                    No payments required • Free forever
                </p>

                
                {/* Divider */}
                <div className="border-t border-slate-700 my-12"></div>

                {/* About + Contact */}
                <div className="grid sm:grid-cols-2 gap-8 text-left">
                    <div>
                        <h3 className="text-white font-semibold text-lg mb-3">About QueueCare</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">
                            QueueCare is built to simplify clinic visits by eliminating long waiting times.
                            Patients can join queues remotely, track live status, and plan visits efficiently.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-semibold text-lg mb-3">Contact</h3>
                        <p className="text-slate-400 text-sm">
                            Email: support.queuecare@gmail.com
                        </p>
                        <p className="text-slate-400 text-sm mt-1">
                            Location: Trivandrum, India
                        </p>
                    </div>
                </div>

                {/* Personal Branding */}
                <p className="text-slate-500 text-sm text-center mt-10">
                    Built by Zeeshan
                </p>

                {/* Links */}
                <div className="flex justify-center gap-6 mt-3 text-sm text-slate-400">
                    <a href="https://github.com/zeeshan-zahoor" target="_blank" className="hover:text-[#3ea789]">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/zeeshan-zahoor-2564b73aa" target="_blank" className="hover:text-[#3ea789]">
                        LinkedIn
                    </a>
                </div>

                {/* Copyright */}
                <div className="text-slate-500 text-sm text-center mt-6">
                    © 2026 QueueCare. All rights reserved.
                </div>


            </div>
        </section>
    );


}
