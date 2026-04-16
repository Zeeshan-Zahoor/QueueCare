import { MapPin, Phone, Eye, Clock } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: MapPin,
      title: "Select a clinic",
      description: "Browse nearby clinics, check their current queue length, and choose the one that works for you.",
      highlight: "Find the fastest option"
    },
    {
      number: "02",
      icon: Phone,
      title: "Join the queue",
      description: "Get your digital token instantly. No registration required — just tap and you're instantly in line.",
      highlight: "Token generated in seconds"
    },
    {
      number: "03",
      icon: Eye,
      title: "Track your turn live",
      description: "Track your position live as it updates in real time. Know exactly when you need to head to the clinic.",
      highlight: "Real-time position updates"
    },
    {
      number: "04",
      icon: Clock,
      title: "Visit at the right time",
      description: "Arrive only when your turn is near. No more waiting rooms or wasted hours.",
      highlight: "Save 60% of your time"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-slate-100 px-4 py-1.5 rounded-full mb-4">
            <span className="w-1.5 h-1.5 bg-[#3ea789] rounded-full"></span>
            <span className="text-sm text-slate-700 font-medium">Simple Process</span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            How{' '}
            <span className="relative inline-block">
              QueueCare
              <span className="absolute bottom-2 left-0 w-full h-2 bg-[#3ea789]/20 -z-10"></span>
            </span>
            {' '}works
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Four simple steps to a stress-free clinic visit
          </p>
        </div>

        {/* Steps Grid */}
        <div className="relative">
          {/* Connecting Line - Desktop */}
          <div className="hidden lg:block absolute top-24 left-[15%] right-[15%] h-0.5 bg-linear-to-r from-[#3ea789]/30 via-slate-200 to-[#3ea789]/30 z-0"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((step, idx) => (
              <div key={idx} className="relative">
                {/* Step Card */}
                <div className="text-center group hover:-translate-y-1 transition duration-300">
                  {/* Number Circle */}
                  <div className="relative inline-block mb-4">
                    <div className="w-16 h-16 bg-[#3ea789]/10 border border-[#3ea789]/30 rounded-2xl flex items-center justify-center mx-auto group-hover:bg-[#3ea789] transition-all duration-300 group-hover:shadow-lg">
                      <step.icon 
                        size={28} 
                        className="text-[#3ea789] group-hover:text-white transition-colors duration-300" 
                      />
                    </div>
                    {/* Small number indicator */}
                    <div className="absolute -top-2 -right-2 z-10 w-6 h-6 bg-slate-800 rounded-full flex items-center justify-center text-xs font-bold text-white">
                      {step.number}
                    </div>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-3">
                    {step.description}
                  </p>
                  
                  {/* Highlight Tag */}
                  <div className="inline-block px-3 py-1 bg-[#3ea789]/10 rounded-full text-xs font-medium text-[#3ea789]">
                    {step.highlight}
                  </div>
                </div>
                
                {/* Arrow connector for mobile/tablet */}
                {idx < steps.length - 1 && (
                  <div className="hidden md:block lg:hidden absolute -right-4 top-8 text-slate-300">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

       
      </div>
    </section>
  );
}