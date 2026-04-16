import queueStatusImage from "../../assets/queuestatus.png";
import { ArrowRight, Play } from 'lucide-react';

export default function Hero() {
  return (
    <section className="bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* Left Content */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-[#3ea789]/10 text-[#3ea789] px-4 py-1.5 rounded-full mb-6">
              <span className="w-2 h-2 bg-slate-800 rounded-full animate-pulse"></span>
              <span className="text-sm text-slate-700 font-medium">No more waiting frustration</span>
            </div>
            
            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
              <span className="text-slate-800">Skip the waiting.</span>
              <br />
              <span className="text-[#3ea789]">Join queues smarter.</span>
            </h1>
            
            {/* Subtext */}
            <p className="text-lg sm:text-xl text-slate-500 mb-8 max-w-lg mx-auto lg:mx-0">
              Book tokens, track your turn, and save time — all from your phone.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button className="bg-[#3ea789] text-white px-8 py-3.5 rounded-full font-semibold hover:bg-[#2f8f75] transition-all hover:scale-105 shadow-md flex items-center justify-center gap-2 group">
                Get Started 
                <ArrowRight size={18} className="group-hover:translate-x-1 transition" />
              </button>
              <button className="border-2 border-slate-300 text-slate-700 px-8 py-3.5 rounded-full font-semibold hover:border-slate-800 hover:text-slate-800 transition-all flex items-center justify-center gap-2">
                <Play size={16} fill="currentColor" />
                View Demo
              </button>
            </div>
            
            {/* Trust indicator */}
            <div className="flex items-center justify-center lg:justify-start gap-6 mt-8 pt-4 border-t border-slate-200">
              <div className="flex -space-x-2">
                {[1,2,3].map((i) => (
                  <div key={i} className="w-8 h-8 bg-slate-300 rounded-full border-2 border-white"></div>
                ))}
              </div>
              {/* fake for now */}
              <p className="text-sm text-slate-600">
                Trusted by <span className="font-semibold text-slate-800">50+ clinics</span> across the city
              </p>
            </div>
          </div>
          
          {/* Right Content - Phone Mockup */}
          <div className="flex-1 flex justify-center relative">
            <div className="absolute inset-0 bg-linear-to-tr from-[#3ea789]/20 to-transparent blur-2xl rounded-full"></div>
            
            {/* Phone Mockup */}
            <div className="relative group">
              {/* Phone frame */}
              <div className="w-70 h-130 bg-white rounded-[3rem] shadow-2xl border-8 border-slate-800 relative overflow-hidden ">
                <img src={queueStatusImage} alt=""
                className='w-full h-full object-contain'  
                />

                {/* Dynamic Island */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-2xl z-10"></div>
                
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}