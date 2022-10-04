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
    <div className='landing-page flex flex-col items-center pr-4 pl-3' >
        <Hero />
        <Features />
        <Benefits />
        <Cta />
        <Footer />
    </div>
  )
}

export default LandingPage