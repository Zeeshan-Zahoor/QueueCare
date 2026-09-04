import { useNavigate } from "react-router-dom";
import heroImage from "../../assets/heroImage.png";

export default function HeroCarousel() {
  const navigate = useNavigate();
  return (
    <button onClick={() => navigate("/doctors")} className="relative h-[132px] w-full overflow-hidden rounded-xl bg-[#286563] text-left">
      <img src={heroImage} alt="Doctor ready to help" className="absolute inset-0 h-full w-full object-cover object-right opacity-90" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#286563] via-[#286563]/85 to-transparent" />
      <div className="relative z-10 max-w-[205px] px-3 pt-6 text-white">
        <h2 className="text-[16px] font-bold leading-6">Get today&apos;s token without standing in line</h2>
        <p className="mt-1 text-[10px] leading-4">Schedule an appointment with top doctors</p>
      </div>
      <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 gap-1">
        <span className="h-1.5 w-6 rounded-full bg-white" /><span className="h-1.5 w-1.5 rounded-full bg-white/60" /><span className="h-1.5 w-1.5 rounded-full bg-white/60" />
      </div>
    </button>
  );
}

