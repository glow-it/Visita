import React from 'react'
import { useNavigate } from 'react-router-dom'

function PlanDetails() {

    let navigate = useNavigate()

  return (
    <div className=' w-full flex  lg:flex-row flex-col' >
        <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col-reverse">
            <div className=" w-full h-full bg-blue-50/50 flex flex-col py-12 lg:px-24 px-10">
                <h1 className='lg:text-5xl text-3xl font-semibold' >Basic plan</h1>
                <ul className='text-xl font-medium mt-6' >
                    <li className='my-3'>→ Basic design</li>
                    <li className='my-3'>→ Products page</li>
                    <li className='my-3'>→ All in one click</li>
                </ul>
                <div className="flex mt-6">
                <button onClick={()=> navigate("/blueberrybakes")} className="px-6 py-2 rounded-full bg-black text-xl text-white font-medium">See demo</button>
                </div>
            </div>
         
        </div>
        <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col">
          
            <div className="lg:border-l border-t w-full h-full bg-blue-50/50 flex flex-col p-6 py-12 lg:px-24 px-10">
            <h1 className='lg:text-5xl text-3xl font-semibold' >Premium plan</h1>
                <ul className='text-xl font-medium mt-6' >
                    <li className='my-3'>→ Premium design</li>
                    <li className='my-3'>→ Ecommerce page</li>
                    <li className='my-3'>→ Custom domain</li>
                </ul>
                <div className="flex mt-6">
                <button onClick={()=> navigate("/visita")} className="px-6 py-2 rounded-full bg-black text-xl text-white font-medium">See demo</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PlanDetails