import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CreateHeader({processIndex}) {

    let navigate = useNavigate()

  return (
    <header className="-ml-6 w-full h-16 flex py-8 items-center bg-white justify-center fixed z-50 transition-shadow border-b shadow-lg shadow-black/5">

       <div className="absolute left-8 flex items-center justify-center">
       <img
            src="../assets/images/logos/visitalogo.png"
            className="h-10 cursor-pointer"
            onClick={()=> navigate('/')}
          />
        <Link to='/' className='text-3xl text-[#6733E4] font-visita-bold ml-1' >Create</Link>
       </div>

       <div className="create-process-indicator-wrapper flex">
       <div className={`h-4 ${processIndex == 1 ? 'w-10' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-1`}></div>
        <div className={`h-4 ${processIndex == 2 ? 'w-10' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-2`}></div>
        <div className={`h-4 ${processIndex == 3 ? 'w-10' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-3`}></div>
        <div className={`h-4 ${processIndex == 4 ? 'w-10' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-4`}></div>
        <div className={`h-4 ${processIndex == 5 ? 'w-10' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-5`}></div>
       </div>
    </header>
  )
}

export default CreateHeader