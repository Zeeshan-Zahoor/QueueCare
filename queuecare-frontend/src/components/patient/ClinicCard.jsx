import { useNavigate } from 'react-router-dom'
import { Heart, MapPin, Star } from 'lucide-react';


export default function ClinicCard({ clinic, fullWidth = false }) {
    const navigate = useNavigate();
    
    return (
        <div
            onClick={() => navigate(`/clinic/${clinic._id}`)}
            className={`${fullWidth ? "w-full min-w-0" : "w-[188px] shrink-0"} cursor-pointer rounded-xl bg-white p-2 shadow-[0_2px_10px_rgba(15,23,42,0.10)] transition hover:shadow-md`}
        >
            <div className="relative mb-2 h-[98px] w-full overflow-hidden rounded-lg">
                <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                    onError={(event) => { event.currentTarget.src = "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=500&q=80"; }}
                />
                <Heart className="absolute right-2 top-2 rounded-full bg-white/90 p-1 text-slate-500" size={24} />
            </div>

            <h3 className="truncate text-xs font-bold text-slate-700">
                {clinic.name}
            </h3>

            <div className="mt-1 flex items-center justify-between text-[10px] text-gray-500">
                <span className="flex min-w-0 items-center gap-1 truncate"><MapPin size={12} />{clinic.distanceKm != null ? `${clinic.distanceKm} km away` : (clinic.address || "Nearby")}</span>
                <span className="ml-1 flex shrink-0 items-center gap-0.5"><Star size={11} className="fill-amber-400 text-amber-400" />{clinic.rating || "New"}</span>
            </div>

        </div>
    )
}

