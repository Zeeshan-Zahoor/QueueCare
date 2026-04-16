import React from 'react'
import Navbar from '../../components/landing/Navbar'
import Hero from '../../components/landing/Hero'
import Features from '../../components/landing/Features';
import HowItWorks from '../../components/landing/HowItWorks';
import AppPreview from '../../components/landing/AppPreview';

function LandingPage() {
  return (
    <>
        <Navbar />
        <Hero />
        <Features />
        <HowItWorks />
        <AppPreview />
    </>
  )
}

export default LandingPage