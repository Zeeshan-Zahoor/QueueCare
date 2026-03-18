import React from 'react'
import { Outlet } from 'react-router-dom'

export default function ClinicLayout() {
  return (
    <div className='min-h-screen white'>
        <Outlet />
    </div>
  )
}