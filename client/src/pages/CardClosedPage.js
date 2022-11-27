import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function CardClosedPage() {

    let navigate = useNavigate()

    useEffect(()=> {
        document.querySelectorAll('header').forEach((elem)=> {
            elem.style.display = 'none'
        })
    },[])

  return (
    <div className='flex flex-col h-screen w-full items-center pt-56' >
        <h1 className='text-green-600 font-visita-bold text-4xl' >Successfully Your Website Was Closed!</h1>
        <h1 className=' font-visita-bold text-xl mt-4' >And Your <span  className='text-red-600' > Subscription Is Cancelled</span></h1>

        <h1 className=' font-visita-medium text-xl mt-4' >any help?</h1>

        <button onClick={()=> navigate('/support')} className='bg-blue-600 py-1 px-8 rounded-full text-white text-xl font-visita-medium mt-6 hover:bg-blue-500' >Contact Visita</button>



    </div>
  )
}

export default CardClosedPage