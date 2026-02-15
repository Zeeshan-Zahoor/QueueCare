import React from 'react'
import { Outlet } from 'react-router-dom'

export default function PatientLayout() {
  return (
    <div className='min-h-screen bg-slate-100'>
        <Outlet />
    </div>
  )
}