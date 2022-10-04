import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import CreateHeader from './CreateHeader'

function Loading() {

  let params = useParams()
  let type = params.type
  let processName = type.replace('-',' ')

  useEffect(()=> {
    document.title = 'Loading...'
    document.querySelectorAll('header').forEach((elem)=>{
      elem.style.display = 'none'
    })
  },[])

  return (
      <div>
    <div className='h-[70vh] w-full flex items-center justify-center ' >
        <div className="w-56">
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_usmfx6bp.json"  background="transparent"  speed="2.5"   loop  autoplay></lottie-player>
        <h1 className='capitalize text-xl font-visita-medium ml-10' >{processName} . . .</h1>
        </div>
    </div>
      </div>
  )
}

export default Loading