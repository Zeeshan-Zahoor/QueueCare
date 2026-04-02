import React from 'react';

const Spinner = () => {
 return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white space-y-4">
      <div className="w-10 h-10 border-4 border-slate-200 border-t-slate-800 rounded-full animate-spin"></div>
      <p className="text-slate-600 font-medium animate-pulse">Loading...</p>
    </div>
  );
};

export default Spinner;