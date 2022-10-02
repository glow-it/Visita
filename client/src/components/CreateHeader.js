import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

function CreateHeader({processIndex,loading}) {

    let navigate = useNavigate()

  return (
    <header id='create-header' className="lg:-ml-6 w-full h-16 flex py-8 items-center bg-white justify-center fixed z-50 transition-shadow border-b shadow-lg shadow-black/5">

       <div className="absolute lg:left-8 flex items-center justify-center lg:visible invisible">
       <img
            src="../assets/images/logos/visitalogo.png"
            className="h-10 cursor-pointer"
            onClick={()=> navigate('/')}
          />
        <Link to='/' className='text-3xl text-[#6733E4] font-visita-bold ml-1' >Create</Link>
       </div>

       <div className="create-process-indicator-wrapper flex">
       <div className={`h-4 ${processIndex == 1 ? 'w-10' : loading ? 'opacity-0 ' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-1`}></div>
        <div className={`h-4 ${processIndex == 2 ? 'w-10' : loading ? 'opacity-0 ' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-2`}></div>
        <div className={`h-4 ${processIndex == 3 ? 'w-10' : loading ? 'opacity-0 ' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-3`}></div>
        <div className={`h-4 ${processIndex == 4 ? 'w-10' : loading ? 'opacity-0 ' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-4`}></div>
        <div className={`h-4 ${processIndex == 5 ? 'w-10' : loading ? 'opacity-0 ' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-5`}></div>
        <div className={`h-4 ${processIndex == 6 ? 'w-10' : loading ? 'opacity-0 ' : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-6`}></div>
        <div className={`h-4 ${loading ? 'opacity-0 ' : processIndex == 7 ? 'w-10'  : 'w-4'} bg-blue-600 rounded-full mr-2 process_indicator-7`}></div>



        <div className={`flex ${ loading ? 'block' : 'hidden'}`}>
        <div className={`h-4 w-4  ${ loading ? 'loading-indicator-active-1 opacity-1' : 'opacity-0'} bg-blue-600 rounded-full mr-2 `}></div>
        <div className={`h-4 w-4  ${ loading ? 'loading-indicator-active-2 opacity-1' : 'opacity-0'} bg-blue-600 rounded-full mr-2 `}></div>
        <div className={`h-4 w-4  ${ loading ? 'loading-indicator-active-3 opacity-1' : 'opacity-0'} bg-blue-600 rounded-full`}></div>
        </div>


       </div>
    </header>
  )
}

export default CreateHeader