import React from 'react'
import { useNavigate } from 'react-router-dom'

function PlanDetails() {

    let navigate = useNavigate()

  return (
    <div className='lg:h-[100vh] w-full flex flex-col' >
        <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col-reverse">
            <div className="lg:w-[50%] w-full h-full bg-blue-50/50 flex flex-col py-12 lg:px-24 px-10">
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
            <div className="lg:w-[50%] w-full h-full bg-white flex flex-col overflow-hidden">
                <img src="https://cdn.dribbble.com/users/1615584/screenshots/16053492/media/c73c836a4dc0dc17d57cbdf0da8ab775.jpg?compress=1&resize=1600x1200&vertical=top"  />
            </div>
        </div>
        <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col">
            <div className="lg:w-[50%] w-full h-full bg-white flex flex-col overflow-hidden">
                <img src="https://cdn.dribbble.com/users/1615584/screenshots/14011931/media/ff5b21c1710672cfbc06a2bd59f6dab3.jpg?compress=1&resize=1600x1200&vertical=top" />
                
            </div>
            <div className="lg:w-[50%] w-full h-full bg-blue-50/50 flex flex-col p-6 py-12 lg:px-24 px-10">
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