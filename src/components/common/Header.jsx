import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

function Header({
    path='/',
    title,
    className=""
}) {

    const navigate = useNavigate();
  return (
      <div className={`w-full flex items-center px-3 mb-5 relative ${className}`}>
        <ArrowLeft 
        onClick={() => navigate(`${path}`)}
        className='text-[#374151]'
        />

        <h1 className='font-sans absolute left-1/2 -translate-x-1/2 text-xl font-bold text-[#374151] text-center'>
          {title}
        </h1>
      </div>
  )
}

export default Header