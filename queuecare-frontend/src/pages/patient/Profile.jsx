import React from 'react'
import BottomNav from '../../components/common/BottomNav.jsx'

function Profile() {
  return (
    <div className='  pb-[calc(70px+env(safe-area-inset-bottom))]'>
        <div>Hey, welcome to my Profile</div>

        <BottomNav />
    </div>
  )
}

export default Profile