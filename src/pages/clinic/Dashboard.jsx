import React from "react";
import { Building2 } from "lucide-react";

export default function Dashboard() {
  const patients = [
    { token: 18, name: "Ali K.", source: "Walk-in", status: "In Consultation", current: true },
    { token: 19, name: "Rehana A.", source: "Online", status: "Waiting" },
    { token: 20, name: "Arif Malik.", source: "Walk-in", status: "Waiting" },
    { token: 21, name: "Sameer H.", source: "Online", status: "Waiting" },
    { token: 22, name: "Gh. Mohd Shah.", source: "Walk-in", status: "Waiting" },
    { token: 23, name: "Zoona Begum.", source: "Online", status: "Waiting" },
  ];


  const isFull = false;
  return (
    <div className="flex flex-col max-w-380 m-auto h-screen">
      {/* Top Bar - unchanged */}
      <div className="bg-white border-b border-gray-400 px-8 py-4 flex items-center justify-end gap-8">
        <div className="flex items-center space-x-3 flex-1 bg-white">
          <Building2 />
          <span className="text-slate-800 font-semibold text-lg">Al-Shifa Clinic</span>
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          24th April 2024
        </div>

        <div className="flex items-center gap-2 text-gray-700">
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
          Clinic Active
        </div>

        <button className="bg-gray-800 text-white px-4 py-2 rounded">
          End Day
        </button>
      </div>

      {/* body */}
      <div className="flex w-full flex-1 min-h-0"> {/* Added min-h-0 here */}

        {/* Sidebar - unchanged */}
        <div className="w-60 bg-white border-r border-gray-300">
          <div className="p-4 space-y-2">
            <button className="w-full flex items-center gap-3 bg-gray-900 text-white px-4 py-2 rounded">
              Dashboard
            </button>

            <button className="w-full flex items-center gap-3 text-gray-600 px-4 py-2 rounded hover:bg-gray-100">
              Settings
            </button>
          </div>
        </div>

        {/* Doctor bar - unchanged */}
        <div className="w-80 bg-white border-r border-gray-300 h-full">
          <div className="p-3 space-y-2">
            <h2 className="text-lg text-slate-800 font-bold">Doctors</h2>

            <div className='bg-white m-auto rounded transition-all border border-gray-400 duration-300 p-2 flex gap-3 items-start mb-2'>
              <div className="w-20 h-20 rounded-sm shadow-xl border border-gray-300 overflow-hidden shrink-0">
                <img
                  src={"https://tse1.explicit.bing.net/th/id/OIP.iFrQzYQ-Pc8LtwbwzjiVswAAAA?pid=ImgDet&w=204&h=306&c=7&o=7&rm=3"}
                  alt={""}
                  className='w-full h-full object-cover'
                />
              </div>

              <div className='flex-1'>
                <div className='flex justify-between items-start'>
                  <h2 className='text-sm mb-1 font-bold text-slate-800'>
                    Asadullah Khan
                  </h2>
                </div>

                <div>
                  {isFull ? (
                    <span className='inline-flex items-center gap-2 bg-red-100 text-red-600 text-xs font-medium px-3 py-1.5 rounded-full'>
                      <span className='w-3 h-3 bg-red-500 rounded-full'></span>
                      Full
                    </span>
                  ) : (
                    <span className='inline-flex items-center gap-2 bg-green-100 text-green-700 text-xs font-medium px-2 py-1 rounded-full'>
                      <span className='w-3 h-3 bg-green-600 rounded-full'></span>
                      5 tokens
                    </span>
                  )}
                </div>

                <p className='mt-1 text-sm font-medium text-slate-700'>
                  Urologist
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main - FIXED SECTION */}
        <div className="flex flex-col flex-1 min-h-0"> {/* Added min-h-0 */}

          {/* Content */}
          <div className="p-5 flex flex-col h-full gap-6 min-h-0"> {/* Added min-h-0 */}

            {/* Cards - fixed height, won't grow */}
            <div className="grid grid-cols-3 gap-6 shrink-0"> {/* Added shrink-0 */}
              <div className="bg-white p-6 rounded shadow-sm">
                <p className="text-gray-500">Current Token</p>
                <div className="text-4xl font-bold mt-2">#18</div>
                <p className="text-gray-600 mt-1">Now Serving</p>
              </div>

              <div className="bg-white p-6 rounded shadow-sm">
                <p className="text-gray-500">Next in Queue</p>
                <div className="text-4xl font-bold text-green-600 mt-2">#19</div>
              </div>

              <div className="bg-white p-6 rounded shadow-sm">
                <p className="text-gray-500">Waiting Patients</p>
                <div className="text-3xl font-bold text-orange-500 mt-2">7 Patients</div>
              </div>
            </div>

            {/* Table Container - FIXED: This will scroll */}
            <div className="bg-gray-200 rounded shadow-sm flex flex-col flex-1 min-h-0"> {/* Added min-h-0 */}
              <div className="p-6 font-semibold text-lg border-b shrink-0"> {/* Added shrink-0 */}
                Today’s Queue
              </div>

              {/* Scrollable table area */}
              <div className="flex-1 overflow-auto min-h-0"> {/* Added min-h-0 */}
                <table className="w-full text-left">
                  <thead className="bg-gray-100 text-gray-600 sticky top-0 z-10"> {/* Made header sticky */}
                    <tr>
                      <th className="p-4">Token</th>
                      <th className="p-4">Patient Name</th>
                      <th className="p-4">Source</th>
                      <th className="p-4">Status</th>
                      <th className="p-4">Actions</th>
                    </tr>
                  </thead>

                  <tbody>
                    {patients.map((p) => (
                      <tr
                        key={p.token}
                        className={`border-t ${p.current ? "bg-green-50" : "bg-white"}`}
                      >
                        <td className="p-4 font-medium">{p.token}</td>
                        <td className="p-4">{p.name}</td>
                        <td className="p-4">{p.source}</td>
                        <td className="p-4 text-gray-600">{p.status}</td>

                        <td className="p-4">
                          {p.current ? (
                            <button className="bg-green-600 text-white px-4 py-2 rounded">
                              Complete
                            </button>
                          ) : (
                            <button className="bg-gray-800 text-white px-4 py-2 rounded">
                              Call
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Bottom Buttons - fixed position, won't move */}
            <div className="flex gap-4 shrink-0"> {/* Added shrink-0 */}
              <button className="bg-gray-800 text-white px-5 py-3 rounded">
                + Add Walk-in
              </button>

              <button className="bg-orange-500 text-white px-5 py-3 rounded">
                Delay Queue
              </button>

              <button className="bg-green-600 text-white px-5 py-3 rounded">
                Call Next Patient →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}