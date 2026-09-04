import { useNavigate } from "react-router-dom";
import { medicalCategories } from "../../data/medicalCategories";

export default function CategoryGrid() {
  const navigate = useNavigate();

  return (
    <section aria-labelledby="categories-heading">
      <div className="flex items-center justify-between mb-3">
        <h2 id="categories-heading" className="text-[15px] font-bold text-slate-800">Categories</h2>
        <button onClick={() => navigate("/doctors")} className="text-xs font-medium text-slate-500">See All</button>
      </div>
      <div className="grid grid-cols-4 gap-x-3 gap-y-4">
        {medicalCategories.map(({ key, label, icon: Icon, color }) => (
          <button key={key} onClick={() => navigate(`/doctors?category=${key}`)} className="flex min-w-0 flex-col items-center gap-1.5">
            <span className="flex h-[50px] w-[50px] items-center justify-center rounded-lg text-white" style={{ backgroundColor: color }}>
              <Icon size={27} strokeWidth={1.7} />
            </span>
            <span className="w-full truncate text-center text-[10px] font-semibold text-slate-600">{label}</span>
          </button>
        ))}
      </div>
    </section>
  );
}

