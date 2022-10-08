import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function Pricing() {



  useEffect(()=> {
    document.title = 'Visita | Pricing'
  },[])

  return (
    <div className='w-full h-screen flex lg:pt-12 pt-24 lg:px-0 px-6' >

<svg className='absolute h-[600px] rotate-45'
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.18"
      viewBox="0 0 800 800"
    >
      <defs>
        <filter
          id="bbblurry-filter"
          width="400%"
          height="400%"
          x="-100%"
          y="-100%"
          colorInterpolationFilters="sRGB"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
        >
          <feGaussianBlur
            x="0%"
            y="0%"
            in="SourceGraphic"
            result="blur"
            stdDeviation="33"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)">
        <ellipse
          cx="545.335"
          cy="543.368"
          fill="hsla(290, 87%, 47%, 1)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
        <ellipse
          cx="142.474"
          cy="153.344"
          fill="hsla(167, 72%, 60%, 1)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
        <ellipse
          cx="348.797"
          cy="385.014"
          fill="hsla(272, 99%, 54%, 1)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
      </g>
    </svg>

    <svg className='absolute right-[50px] h-[500px] rotate-12'
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.18"
      viewBox="0 0 800 800"
    >
      <defs>
        <filter
          id="bbblurry-filter"
          width="400%"
          height="400%"
          x="-100%"
          y="-100%"
          colorInterpolationFilters="sRGB"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
        >
          <feGaussianBlur
            x="0%"
            y="0%"
            in="SourceGraphic"
            result="blur"
            stdDeviation="34"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)">
        <ellipse
          cx="470.989"
          cy="329.755"
          fill="hsla(212, 85%, 57%, 1)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
        <ellipse
          cx="244.044"
          cy="193.135"
          fill="hsla(167, 72%, 60%, 1)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
        <ellipse
          cx="365.551"
          cy="481.349"
          fill="hsla(272, 99%, 54%, 1)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
      </g>
    </svg>

       <div className="w-full h-full flex flex-col lg:pt-16 lg:pl-12 items-center">

       <span  className='font-visita-bold text-green-500 mb-6' >100% Secure</span>

            <h1  className='lg:leading-[60px] text-center font-visita-bold text-black lg:text-5xl text-3xl' >Pay <span className='text-primary text-blue-600' >
            ₹599/Year</span> And <br /> Use It Forever</h1>

<h1  className='text-center lg:text-xl text-xs font-visita-medium mt-6' >Now just only ₹599 per year. Pay once and we take payment <br /> automatically from your bank per year. payment secured by Razorpay</h1>

<div   className="flex flex-col items-start">
<h1 className=' font-visita-medium lg:text-xl text-lg mt-12 flex' > <span className='text-2xl flex items-center justify-center text-green-500 mr-2' ><ion-icon name="arrow-forward-circle"></ion-icon></span> Automatically Debit ₹599 From Your Bank Per Year</h1>

<h1   className='font-visita-medium text-xl mt-2 flex' > <span className='lg:text-2xl text-xl flex items-center justify-center text-green-500 mr-2' ><ion-icon name="arrow-forward-circle"></ion-icon></span>You Can Close It At Any Time</h1>

<h1   className='font-visita-medium text-xl mt-2 flex' > <span className='lg:text-2xl text-xl flex items-center justify-center text-green-500 mr-2' ><ion-icon name="arrow-forward-circle"></ion-icon></span>All Payment Methods Available</h1>
</div>


<div className="flex lg:flex-row flex-col items-center mt-12">
<Link to='/create'  type="button" class="text-white bg-blue-600 bg-primary ml-1  shadow-md shadow-blue-600 hover:shadow-blue-500 transition-shadow focus:ring-4 focus:ring-blue-400  rounded-full sm:text-2xl text-lg font-visita-medium px-10 py-2.5 mr-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800">Create Now</Link>

<button   type="button"  class="text-blue-500 hover:shadow-md hover:shadow-blue-300 transition-shadow border-2 border-blue-500 bg-white lg:ml-1 lg:mt-0 mt-3 focus:ring-4 focus:ring-blue-300  rounded-full sm:text-2xl  text-lg font-visita-medium px-10 py-2.5 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800">See Demos</button>

</div>

<div   className="flex lg:flex-row flex-col justify-center lg:items-start items-center">
<h1 className='lg:text-md text-sm font-visita-medium lg:ml-24 text-slate-400 lg:mt-16 mt-12' >Payment Secured By</h1>

<a onClick={()=> window.open('https://www.razorpay.com')} className='cursor-pointer'>

<svg className='lg:mt-[65px] lg:-ml-14 mt-2'
      xmlns="http://www.w3.org/2000/svg"
      width="216"
      height="17"
      fill="#072654"
      viewBox="0 0 1896 401"
    >
      <path
        fill="#3395FF"
        d="M122.63 105.7l-15.75 57.97 90.15-58.3-58.96 219.98 59.88.05L285.05.48"
      ></path>
      <path d="M25.6 232.92L.8 325.4h122.73l50.22-188.13L25.6 232.92m426.32-81.42c-3 11.15-8.78 19.34-17.4 24.57-8.6 5.22-20.67 7.84-36.25 7.84h-49.5l17.38-64.8h49.5c15.56 0 26.25 2.6 32.05 7.9 5.8 5.3 7.2 13.4 4.22 24.6m51.25-1.4c6.3-23.4 3.7-41.4-7.82-54-11.5-12.5-31.68-18.8-60.48-18.8H324.4l-66.5 248.1h53.67l26.8-100h35.2c7.9 0 14.12 1.3 18.66 3.8 4.55 2.6 7.22 7.1 8.04 13.6l9.58 82.6h57.5l-9.32-77c-1.9-17.2-9.77-27.3-23.6-30.3 17.63-5.1 32.4-13.6 44.3-25.4a92.6 92.6 0 0024.44-42.5m130.46 86.4c-4.5 16.8-11.4 29.5-20.73 38.4-9.34 8.9-20.5 13.3-33.52 13.3-13.26 0-22.25-4.3-27-13-4.76-8.7-4.92-21.3-.5-37.8 4.42-16.5 11.47-29.4 21.17-38.7 9.7-9.3 21.04-13.95 34.06-13.95 13 0 21.9 4.5 26.4 13.43 4.6 8.97 4.7 21.8.2 38.5zm23.52-87.8l-6.72 25.1c-2.9-9-8.53-16.2-16.85-21.6-8.34-5.3-18.66-8-30.97-8-15.1 0-29.6 3.9-43.5 11.7-13.9 7.8-26.1 18.8-36.5 33-10.4 14.2-18 30.3-22.9 48.4-4.8 18.2-5.8 34.1-2.9 47.9 3 13.9 9.3 24.5 19 31.9 9.8 7.5 22.3 11.2 37.6 11.2a82.4 82.4 0 0035.2-7.7 82.11 82.11 0 0028.4-21.2l-7 26.16h51.9L709.3 149h-52zm238.65 0H744.87l-10.55 39.4h87.82l-116.1 100.3-9.92 37h155.8l10.55-39.4h-94.1l117.88-101.8m142.4 52c-4.67 17.4-11.6 30.48-20.75 39-9.15 8.6-20.23 12.9-33.24 12.9-27.2 0-36.14-17.3-26.86-51.9 4.6-17.2 11.56-30.13 20.86-38.84 9.3-8.74 20.57-13.1 33.82-13.1 13 0 21.78 4.33 26.3 13.05 4.52 8.7 4.48 21.67-.13 38.87m30.38-80.83c-11.95-7.44-27.2-11.16-45.8-11.16-18.83 0-36.26 3.7-52.3 11.1a113.09 113.09 0 00-41 32.06c-11.3 13.9-19.43 30.2-24.42 48.8-4.9 18.53-5.5 34.8-1.7 48.73 3.8 13.9 11.8 24.6 23.8 32 12.1 7.46 27.5 11.17 46.4 11.17 18.6 0 35.9-3.74 51.8-11.18 15.9-7.48 29.5-18.1 40.8-32.1 11.3-13.94 19.4-30.2 24.4-48.8 5-18.6 5.6-34.84 1.8-48.8-3.8-13.9-11.7-24.6-23.6-32.05m185.1 40.8l13.3-48.1c-4.5-2.3-10.4-3.5-17.8-3.5-11.9 0-23.3 2.94-34.3 8.9-9.46 5.06-17.5 12.2-24.3 21.14l6.9-25.9-15.07.06h-37l-47.7 176.7h52.63l24.75-92.37c3.6-13.43 10.08-24 19.43-31.5 9.3-7.53 20.9-11.3 34.9-11.3 8.6 0 16.6 1.97 24.2 5.9m146.5 41.1c-4.5 16.5-11.3 29.1-20.6 37.8-9.3 8.74-20.5 13.1-33.5 13.1s-21.9-4.4-26.6-13.2c-4.8-8.85-4.9-21.6-.4-38.36 4.5-16.75 11.4-29.6 20.9-38.5 9.5-8.97 20.7-13.45 33.7-13.45 12.8 0 21.4 4.6 26 13.9 4.6 9.3 4.7 22.2.28 38.7m36.8-81.4c-9.75-7.8-22.2-11.7-37.3-11.7-13.23 0-25.84 3-37.8 9.06-11.95 6.05-21.65 14.3-29.1 24.74l.18-1.2 8.83-28.1h-51.4l-13.1 48.9-.4 1.7-54 201.44h52.7l27.2-101.4c2.7 9.02 8.2 16.1 16.6 21.22 8.4 5.1 18.77 7.63 31.1 7.63 15.3 0 29.9-3.7 43.75-11.1 13.9-7.42 25.9-18.1 36.1-31.9 10.2-13.8 17.77-29.8 22.6-47.9 4.9-18.13 5.9-34.3 3.1-48.45-2.85-14.17-9.16-25.14-18.9-32.9m174.65 80.65c-4.5 16.7-11.4 29.5-20.7 38.3-9.3 8.86-20.5 13.27-33.5 13.27-13.3 0-22.3-4.3-27-13-4.8-8.7-4.9-21.3-.5-37.8 4.4-16.5 11.42-29.4 21.12-38.7 9.7-9.3 21.05-13.94 34.07-13.94 13 0 21.8 4.5 26.4 13.4 4.6 8.93 4.63 21.76.15 38.5zm23.5-87.85l-6.73 25.1c-2.9-9.05-8.5-16.25-16.8-21.6-8.4-5.34-18.7-8-31-8-15.1 0-29.68 3.9-43.6 11.7-13.9 7.8-26.1 18.74-36.5 32.9-10.4 14.16-18 30.3-22.9 48.4-4.85 18.17-5.8 34.1-2.9 47.96 2.93 13.8 9.24 24.46 19 31.9 9.74 7.4 22.3 11.14 37.6 11.14 12.3 0 24.05-2.56 35.2-7.7a82.3 82.3 0 0028.33-21.23l-7 26.18h51.9l47.38-176.7h-51.9zm269.87.06l.03-.05h-31.9c-1.02 0-1.92.05-2.85.07h-16.55l-8.5 11.8-2.1 2.8-.9 1.4-67.25 93.68-13.9-109.7h-55.08l27.9 166.7-61.6 85.3h54.9l14.9-21.13c.42-.62.8-1.14 1.3-1.8l17.4-24.7.5-.7 77.93-110.5 65.7-93 .1-.06h-.03z"></path>
    </svg>
</a>

</div>


       </div>
    </div>
  )
}

export default Pricing