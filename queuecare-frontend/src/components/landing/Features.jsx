import { Users, Smartphone, Timer, Hospital, Bell, TrendingUp, UserX2 } from 'lucide-react';

export default function Features() {
  const features = [
    {
      icon: Users,
      title: "Live Queue Tracking",
      description: "See your exact position in real-time and know exactly when it's your turn.",
      badge: "Real-time"
    },
    {
      icon: Smartphone,
      title: "Join Queue Anywhere",
      description: "Book your token remotely without stepping foot inside the clinic.",
      badge: "Remote"
    },
    {
      icon: Timer,
      title: "Accurate Wait Time",
      description: "Estimated waiting times that updates in real time.",
      badge: "Wait Time"
    },
    {
      icon: Hospital,
      title: "Multi-Clinic Support",
      description: "Support multiple clinics seamlessly in one unified system.",
      badge: "Unified"
    },
    {
      icon: Bell,
      title: "Smart Notifications",
      description: "Get alerts when your turn is near. Coming soon to all clinics.",
      badge: "Coming Soon"
    },
    {
      icon: TrendingUp,
      title: "Dashboard",
      description: "Manage patient queues efficiently through a powerful dashboard.",
      badge: "Insights"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-slate-200 mb-4">
            <span className="w-1.5 h-1.5 bg-slate-800 rounded-full"></span>
            <span className="text-sm text-slate-700 font-medium">Why Choose QueueCare</span>
          </div>
          
          {/* Title */}
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">
            Everything you need to{' '}
            <span className="relative inline-block">
              skip the wait
              <span className="absolute bottom-2 left-0 w-full h-2 bg-[#3ea789]/20 -z-10"></span>
            </span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-lg text-slate-500 max-w-2xl mx-auto">
            Powerful features designed to transform your clinic waiting experience
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 border border-slate-200 hover:border-slate-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl cursor-pointer"
            >
              {/* Icon Container */}
              <div className="w-12 h-12 bg-[#3ea789]/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#3ea789] transition-colors duration-300">
                <feature.icon 
                  size={24} 
                  className="text-[#3ea789] group-hover:text-white transition-colors duration-300" 
                />
              </div>
              
              {/* Badge */}
              <div className="inline-block px-2 py-0.5 bg-[#3ea789]/10 rounded-full text-xs font-medium text-[#3ea789] mb-3">
                {feature.badge}
              </div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-slate-500 leading-relaxed">
                {feature.description}
              </p>
              
              {/* Hover indicator line */}
              <div className="mt-4 w-8 h-0.5 bg-slate-200 group-hover:w-12 group-hover:bg-slate-800 transition-all duration-300"></div>
            </div>
          ))}
        </div>

        {/* Bottom Trust Indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <span>✓</span>
            <span>No hidden fees</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>✓</span>
            <span>Cancel anytime</span>
            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
            <span>✓</span>
            <span>Free to use</span>
          </div>
        </div>
      </div>
    </section>
  );
}