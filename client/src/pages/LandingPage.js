import React, { useEffect } from 'react'
import Benefits from '../components/Benefits'
import Cta from '../components/Cta'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

function LandingPage() {

  useEffect(()=> {
    document.title = 'Visita | Create Digital Visiting Card - Mini Website'
  },[])


  return (
    <div className='flex flex-col items-center' >
        <Hero />
        <Features />
        <Benefits />
        <Cta />
        <Footer />
    </div>
  )
}

export default LandingPage