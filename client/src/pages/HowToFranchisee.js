import { Button } from '@chakra-ui/react'
import React from 'react'
import { Link } from 'react-router-dom'

function HowToFranchisee() {
  return (
    <div className='pt-32 pb-44 w-full h-full  overflow-scroll' >


<div className="z-10 w-full h-full flex flex-col items-center justify-center">

<h1 className='lg:text-4xl text-2xl font-visita-bold text-center' >What Is Visita <span className="text-indigo-600">Franchisee</span>?</h1>
        <p className='lg:text-xl text-lg text-slate-400 font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        Being a franchisee in Visita is a way for you to earn an extra income. If you work properly you can earn more in one day. That means you can earn at least 3000 rupees a day
        </p>

        <h1 className='lg:text-3xl mt-16 text-2xl font-visita-bold text-center' >How Franchisee Works?</h1>

        <img className='lg:h-[300px] h-[170px] mt-8 rounded-3xl shadow-md' src="https://tidio-images-messenger.s3.amazonaws.com/riwuo87rwpvwckjoytid0j3o1kjw8mgq/images/3fc1ae1b-a690-46a9-9d02-a48793ddd9a4.png" alt="" />

        <p className='bg-slate-50 shadow-md shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-3xl font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        Being a franchisee in Visita is a way for you to earn an extra income. If you work properly you can earn more in one day. That means you can earn at least 3000 rupees a day
        </p>

        <p className='bg-slate-50 shadow-md shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-3xl font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        Then you will get <span className='text-indigo-600' >₹300</span> in your My Earnings section instantly!
        </p>

        <p className='bg-slate-50 shadow-md shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-3xl font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        All this earned money will be credited to your account every month 🥳👏
        </p>

        <h1 className='lg:text-3xl mt-16 text-2xl font-visita-bold text-center' >How Much <span className='text-indigo-600' >My Profit</span>?</h1>

        <p className='bg-slate-50 shadow-md shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-3xl font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        In this your profit when you make a Website to your customer you will get ₹300 without any cost
        </p>

        <p className='bg-slate-50 shadow-md shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-3xl font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        It only takes a little time to create a Website.
        </p>

        <p className='bg-indigo-50 shadow-md shadow-black/5 text-lg text-indigo-600 py-8 px-8 rounded-3xl font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        You can create at least 10 Websites per day. If so your daily income is ₹3000
        </p>

        <h1 className='lg:text-3xl mt-16 text-2xl font-visita-bold text-center' >What Is <span className='text-indigo-600' >Pricing</span> For Creating Franchisee?</h1>

        <p className='bg-slate-50 shadow-md shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-3xl font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        If you pay <span className="text-indigo-600">
        ₹999</span> you can register a franchisee
        </p>

        <p className='bg-slate-50 shadow-md shadow-black/5 text-lg text-slate-600 py-8 px-8 rounded-3xl font-visita-medium lg:w-[700px] w-[300px] mt-6 text-center' >
        This is a small amount 👋
        </p>

        <h1 className='lg:text-3xl mt-16 mb-8 text-2xl font-visita-bold text-center' ><span className='text-indigo-600' >Register</span> For A Franchisee?</h1>

        <Link to='/franchisee/register'  className="font-visita-medium hover:scale-105 hover:shadow-md hover:shadow-indigo-200" _hover  rounded='full' mt='3' fontSize='lg' px='12' py='6' bg='#0062FF' color='white' >
                Register now
              </Link>
</div>

    </div>
  )
}

export default HowToFranchisee