import React, { useEffect } from 'react'
import Benefits from '../components/Benefits'
import Cta from '../components/Cta'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Hero from '../components/Hero'
import WhatIsDigitalCard from '../components/WhatIsDigitalCard'

function LandingPage() {

  useEffect(()=> {
    document.title = 'Visita | Create Digital Visiting Card - Mini Website'
    document.querySelectorAll('header').forEach((elem)=> {
      elem.style.display = 'flex'
    })
  },[])


  return (
    <div className='landing-page flex flex-col items-center' >
        <Hero />
        <WhatIsDigitalCard />
        <Features />
        <Benefits />
        <Cta />
        <Footer />
    </div>
  )
}

export default LandingPage