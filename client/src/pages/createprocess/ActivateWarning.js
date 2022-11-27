import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

function ActivateWarning() {

    useEffect(()=> {
        document.querySelectorAll('header').forEach((elem)=> {
            elem.style.display = 'none'
        })
    },[])

    let navigate = useNavigate()
    let params = useParams()

    let complete_purchase_url = `/create/preview/${params.comp_name.replace(/[ ]/g,"-")}`

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center px-8">

        <div className='my-6 -mt-32' >
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_0akluyjw.json"  background="transparent"  speed="1"   loop  autoplay></lottie-player>
        </div>

        <h1 className="font-visita-bold text-blue-600 lg:text-3xl text-xl text-center bg-blue-50 border-blue-100 border rounded-full px-8 py-3">
        Complete Purchase To Activate Your Website
        </h1>
        <button onClick={()=> navigate(complete_purchase_url)} className='font-visita-bold mt-8 bg-blue-600 hover:bg-white hover:text-blue-600 transition-colors lg:text-xl text-lg text-center text-white border-blue-100 border rounded-full px-8 py-3' > Complete Purchase </button>
    </div>
  )
}

export default ActivateWarning