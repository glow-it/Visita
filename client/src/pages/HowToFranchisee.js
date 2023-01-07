import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'

function HowToFranchisee() {

  let navigate = useNavigate()

  return (
    <div className='pt-32 pb-44 w-full h-full  overflow-scroll' >


<div className="z-10 w-full h-full flex flex-col items-center justify-center">

<h1 className='lg:text-4xl text-2xl font-bold text-center' >What is visita <span className="">franchisee</span></h1>
        <p className='lg:text-xl text-lg text-slate-400 font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        Being a franchisee in Visita is a way for you to earn an extra income. If you work properly you can earn more in one day. That means you can earn at least 3000 rupees a day
        </p>

        <h1 className='lg:text-3xl mt-16 text-2xl font-bold text-center' >How franchisee works</h1>

      

        <p className=' border border-slate-200 shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-lg font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        Register for a franchisee.Create website for clients through your franchisee
        </p>

        <p className=' border border-slate-200 shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-lg font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        Then you will get <span className='' >₹300</span> in your My Earnings section instantly!
        </p>

        <p className=' border border-slate-200 shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-lg font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        All this earned money will be credited to your account every month
        </p>

        <h1 className='lg:text-3xl mt-16 text-2xl font-bold text-center' >How much <span className='' >my profit</span></h1>

        <p className=' border border-slate-200 shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-lg font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
      When you make a Website to your customer you will get ₹300 without any cost
        </p>

        <p className=' border border-slate-200 shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-lg font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        It only takes a little time to create a Website.
        </p>

        <p className=' border border-slate-200 shadow-black/5 text-lg  py-8 px-8 rounded-lg font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        You can create at least 10 Websites per day. If so your daily income is ₹3000
        </p>

        <h1 className='lg:text-3xl mt-16 text-2xl font-bold text-center' >What is <span className='' >pricing</span> for creating franchisee</h1>

        <p className=' border border-slate-200 shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-lg font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        If you pay <span className="">
        ₹999</span> you can register a franchisee
        </p>

        <p className=' border border-slate-200 shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-lg font-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        This is a small amount 
        </p>

        <h1 className='lg:text-3xl mt-16 mb-8 text-2xl font-bold text-center' ><span className='' >Register</span> for a franchisee</h1>

        <Button onClick={(e)=> navigate('/franchisee/register')}  className="font-medium hover:border-slate-800 border border-slate-200" _hover  rounded='full' mt='3' fontSize='lg' px='12' py='6' bg='white' color='#0062FF' >
                Register now
              </Button>
</div>

    </div>
  )
}

export default HowToFranchisee