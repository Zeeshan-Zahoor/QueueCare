import { useEffect, useState } from "react";
import { getAllClinicsApi } from "../../api/clinicApi";
import Header from "../../components/common/Header";
import BottomNav from "../../components/common/BottomNav";
import ClinicCard from "../../components/patient/ClinicCard";

export default function Clinics() {
  const [clinics, setClinics] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAllClinicsApi().then((res) => { if (res.success) setClinics(res.clinics); }).finally(() => setLoading(false));
  }, []);
  return <div className="mx-auto min-h-dvh max-w-md px-5 py-5 pb-24">
    <Header title="Medical Centers" />
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {loading ? Array.from({ length: 4 }).map((_, i) => <div key={i} className="h-44 animate-pulse rounded-xl bg-slate-100" />) : clinics.map((clinic) => <ClinicCard key={clinic._id} clinic={clinic} fullWidth />)}
    </div>
    {!loading && clinics.length === 0 && <p className="py-16 text-center text-sm text-slate-500">No medical centers are available yet.</p>}
    <BottomNav />
  </div>;
}
