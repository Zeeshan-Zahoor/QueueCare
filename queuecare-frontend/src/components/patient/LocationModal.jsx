import { useState } from "react";
import { MapPin } from "lucide-react";
 
const LOCATION_FIELDS = [
  { key: "amenity",  label: "Amenity"  },
  { key: "road",     label: "Road"     },
  { key: "suburb",   label: "Suburb"   },
  { key: "village",  label: "Village"  },
  { key: "county",   label: "County"   },
  { key: "district", label: "District" },
  { key: "state",    label: "State"    },
  { key: "postcode", label: "Postcode" },
  { key: "country",  label: "Country"  },
];

export default function LocationModal({ location, isOpen, onClose }) {
  const isUnavailable = location.status === "unavailable";

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/45 flex items-center justify-center z-50 p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white w-full max-w-md rounded-2xl max-h-[85vh] overflow-y-auto">
        {/* Handle bar (only visible on mobile, optional) */}
        <div className="w-9 h-1 bg-gray-300 rounded-full mx-auto mt-3 mb-2" />

        {isUnavailable ? (
          /* ── Unavailable state ── */
          <div className="px-5 py-8 text-center">
            <div className="w-14 h-14 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
              <MapPin className="text-red-500"/>
            </div>
            <p className="text-base font-medium text-gray-900 mb-1">Location unavailable</p>
            <p className="text-sm text-gray-500 mb-6">
              We couldn't determine your current location. Please enable location permissions and try again.
            </p>
            <button
              onClick={onClose}
              className="bg-gray-900 text-white text-sm font-medium px-7 py-2.5 rounded-xl"
            >
              Got it
            </button>
          </div>
        ) : (
          /* ── Available state ── */
          <>
            {/* Header */}
            <div className="flex items-center gap-3 px-5 pb-4 border-b border-gray-100">
              <div className="w-9 h-9 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                <MapPin className="text-slate-800"/>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Current Location</p>
                <p className="text-xs text-gray-500">
                  {[location.suburb, location.state, location.country].filter(Boolean).join(", ")}
                </p>
              </div>
            </div>

            {/* Location fields */}
            {LOCATION_FIELDS.map(({ key, label }) =>
              location[key] ? (
                <div key={key} className="flex items-start gap-3 px-5 py-2.5 border-b border-gray-100">
                  <span className="text-xs text-gray-400 w-20 shrink-0 pt-0.5">{label}</span>
                  <span className="text-sm font-medium text-gray-900">{location[key]}</span>
                </div>
              ) : null
            )}

            {/* Coordinates */}
            <div className="flex gap-2 px-5 py-3">
              {[
                { label: "Latitude",  value: location.latitude  },
                { label: "Longitude", value: location.longitude },
              ].map(({ label, value }) => (
                <div key={label} className="flex-1 bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-400 mb-0.5">{label}</p>
                  <p className="text-sm font-medium text-gray-900">
                    {value != null ? Number(value).toFixed(5) : "—"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}