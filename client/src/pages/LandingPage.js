import { Box, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import Benefits from '../components/Benefits'
import Cta from '../components/Cta'
import Features from '../components/Features'
import Footer from '../components/Footer'
import Hero from '../components/Hero'

function LandingPage() {

  let toast = useToast()
  let location = useLocation()

  useEffect(()=> {
    document.title = 'Visita - Create your own business website easily'
    document.querySelectorAll('header').forEach((elem)=> {
      elem.style.display = 'flex'
    })

  },[location])


  return (
    <div className='landing-page flex flex-col items-center' >
        <Hero />
        <Features />
        <Benefits />
        <Cta />
        <Footer />
    </div>
  )
}

export default LandingPage