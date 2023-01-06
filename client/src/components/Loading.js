import { Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Loading() {

  let params = useParams()
  let type = params.type
  let [processName,setProcessName] = useState(`${type.replace('-',' ')}...`)

  useEffect(()=> {
    document.title = processName
    document.querySelectorAll('header').forEach((elem)=>{
      elem.style.display = 'none'
    })
    setTimeout(()=> {
      setProcessName('Working on it')
    },12000)
  
    setTimeout(()=> {
      setProcessName('Almost there!')
    },24000)
  },[])

  return (
      <div>
        <div className="w-full h-screen flex items-center justify-center">
      <div className="loading-wrapper w-full h-screen flex items-center justify-center">
    <span className="one -mt-64 -ml-20"></span>
    <span className="two -mt-64 -ml-20"></span>
    <span className="three -mt-64 -ml-20"></span>
    <span className="four -mt-64 -ml-20"></span>
    <h1 className='capitalize text-xl font-visita-medium mt-8 absolute' >{processName}</h1>
  </div>
    </div>
      </div>
  )
}

export default Loading