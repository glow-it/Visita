import { Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

function Loading() {

  let params = useParams()
  let type = params.type
  let [processName,setProcessName] = useState(type.replace('-',' '))

  useEffect(()=> {
    document.title = processName
    document.querySelectorAll('header').forEach((elem)=>{
      elem.style.display = 'none'
    })
    setTimeout(()=> {
      setProcessName('Working on it')
    },8000)
  
    setTimeout(()=> {
      setProcessName('Almost there!')
    },16000)
  },[])

  return (
      <div>
    <div className='h-[70vh] w-full flex flex-col items-center justify-center ' >
    <Spinner  thickness='4px'
  speed='0.5s' size='lg' color='blue.600' />
        <h1 className='capitalize text-xl font-visita-medium mt-8' >{processName}</h1>
    </div>
      </div>
  )
}

export default Loading