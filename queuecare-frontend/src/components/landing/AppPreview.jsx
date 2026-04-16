import { ChevronLeft, ChevronRight, Smartphone } from 'lucide-react';
import { useRef, useState } from 'react';
import queueStatusImage from "../../assets/queuestatus.png";
import homeImage from "../../assets/home.png";
import doctorsImage from "../../assets/doctors.png";
import doctorDetailsImage from "../../assets/doctordetails.png";
import myTokensImage from "../../assets/mytokens.png";
import profileImage from "../../assets/profile.png";
import settingsImage from "../../assets/settings.png";
import clinicDashboard from "../../assets/dashboard.jpeg"
import clinicSettings from "../../assets/clinicsettings.jpeg"

export default function AppPreview() {
  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const screenshots = [
    { id: 1, screenshot: homeImage, title: "Home" },
    { id: 2, screenshot: doctorsImage, title: "Doctors" },
    { id: 3, screenshot: doctorDetailsImage, title: "Doctor Details" },
    { id: 4, screenshot: myTokensImage, title: "My Tokens" },
    { id: 5, screenshot: queueStatusImage, title: "Queue Status" },
    { id: 6, screenshot: profileImage, title: "Profile" },
    { id: 7, screenshot: settingsImage, title: "Settings" },
  ];

  const scroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id='demo' className="py-20 bg-white overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 mb-4 shadow-sm">
            <Smartphone size={14} className="text-[#3ea789]" />
            <span className="text-sm text-slate-700 font-medium">See It In Action</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            App{' '}
            <span className="relative inline-block">
              Preview
              <span className="absolute bottom-2 left-0 w-full h-2 bg-[#3ea789]/20 -z-10"></span>
            </span>
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            A glimpse of the seamless QueueCare experience
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative group">
          {/* Left Scroll Button */}
          <button
            onClick={() => scroll('left')}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-slate-50"
            aria-label="Previous screenshot"
          >
            <ChevronLeft size={20} className="text-slate-700" />
          </button>

          {/* Scrollable Track */}
          <div
            ref={carouselRef}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 py-8  scrollbar-hide"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {screenshots.map((screen) => (
              <div
                key={screen.id}
                className="snap-center shrink-0 w-72 transition-all duration-300 hover:-rotate-2 hover:scale-105 hover:z-10"
              >
                {/* Phone Mockup Container */}
                <div className="relative">
                  {/* Phone Frame */}
                  <div className="bg-white rounded-[2.5rem] border-8 border-slate-800 overflow-hidden">
                    {/* Dynamic Island */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-5 bg-slate-800 rounded-b-2xl z-10"></div>

                    {/* Screenshot Image */}
                    <img
                      src={screen.screenshot}
                      alt={screen.title}
                      className="w-full h-auto object-cover pt-2"
                    />

                    {/* Bottom Home Indicator */}
                    <div className="py-3 flex justify-center">
                      <div className="w-12 h-1 bg-slate-300 rounded-full"></div>
                    </div>
                  </div>

                  {/* Floating Label */}
                  <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-xs px-3 py-1 rounded-full whitespace-nowrap shadow-md z-20">
                    {screen.title}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right Scroll Button */}
          <button
            onClick={() => scroll('right')}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/90 backdrop-blur rounded-full p-2 shadow-lg border border-slate-200 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-slate-50"
            aria-label="Next screenshot"
          >
            <ChevronRight size={20} className="text-slate-700" />
          </button>
        </div>

        {/* Scroll Hint Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {screenshots.map((_, idx) => (
            <button
              key={idx}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${idx === activeIndex
                ? 'bg-[#3ea789] w-4'
                : 'bg-slate-300 hover:bg-[#3ea789]/50'
                }`}
              onClick={() => {
                if (carouselRef.current) {
                  const scrollPosition = idx * 312;
                  carouselRef.current.scrollTo({ left: scrollPosition, behavior: 'smooth' });
                  setActiveIndex(idx);
                }
              }}
            />
          ))}
        </div>


        {/* Clinic Preview Section */}
        <div className="mt-20">

          {/* Header */}
          <div className="text-center mb-10">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 mb-3">
              For Clinics
            </h3>
            <p className="text-slate-500">
              Powerful dashboard to manage queues efficiently
            </p>
          </div>

          {/* Screens */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-10">

            {/* Dashboard */}
            <div className="group">
              <div className="bg-white">
                {/* Desktop Monitor Shape */}
                <div className="relative p-2 bg-gray-800 rounded-2xl border border-slate-200 shadow-md overflow-hidden hover:shadow-xl transition">
                  {/* Screen Bezel */}
                  <div className="relative bg-black rounded-lg overflow-hidden shadow-inner">
                    {/* Screen Glare (optional) */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none z-10"></div>

                    {/* Dashboard Image */}
                    <img
                      src={clinicDashboard}
                      alt="Clinic Dashboard"
                      className="w-full max-w-md object-cover mx-auto"
                    />
                  </div>
                </div>

                {/* Monitor Stand */}
                <div className="flex justify-center">
                  <div className="w-10 h-3 bg-gray-600"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-16 h-2 bg-gray-700 rounded-t-md"></div>
                </div>
              </div>
              <p className="text-center text-sm text-slate-600 mt-3">
                Dashboard
              </p>
            </div>

            {/* Settings */}
            <div className="group">
              <div className="bg-white">
                {/* Desktop Monitor Shape */}
                <div className="relative p-2 bg-gray-800 rounded-2xl border border-slate-200 shadow-md overflow-hidden hover:shadow-xl transition">
                  {/* Screen Bezel */}
                  <div className="relative bg-black rounded-lg overflow-hidden shadow-inner">
                    {/* Screen Glare (optional) */}
                    <div className="absolute inset-0 bg-linear-to-br from-white/5 to-transparent pointer-events-none z-10"></div>

                    {/* Dashboard Image */}
                    <img
                      src={clinicSettings}
                      alt="Clinic Dashboard"
                      className="w-full max-w-md object-cover mx-auto"
                    />
                  </div>
                </div>

                {/* Monitor Stand */}
                <div className="flex justify-center">
                  <div className="w-10 h-3 bg-gray-600"></div>
                </div>
                <div className="flex justify-center">
                  <div className="w-16 h-2 bg-gray-700 rounded-t-md"></div>
                </div>
              </div>
              <p className="text-center text-sm text-slate-600 mt-3">
                Settings
              </p>
            </div>
          </div>
          <p className="text-slate-800 font-medium text-center mt-10">
            Clinics are onboarded by Admin to ensure security and prevent fake registrations.
          </p>
          <div className='w-full px-5 text-center mt-3'>
            <span className="text-gray-500 font-medium mt-10">
              Want your clinic onboarded?
            </span>
            <a 
            href='https://wa.me/7006152972?text=Hey! I want my clinic onboarded.'
            className='text-[#3ea789] font-semibold hover:underline ml-1'> Contact Us</a>
          </div>

        </div>


      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
}