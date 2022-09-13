import React from 'react'
import { Link } from 'react-router-dom'

function Cta() {
  return (
    <div id='cta' class="border lg:my-20 my-4 rounded-2xl  cta-wrapper relative flex flex-col items-center overflow-hidden">
        <h1   className='lg:text-6xl text-2xl font-visita-bold text-primary lg:mt-16 mt-8' >Ready To Create ?</h1>
        <h1   className='lg:text-4xl text-xl font-visita-bold text-black lg:mt-6 mt-4' > Now Just Only <span className='text-primary lg:ml-3' >₹499 / Year</span></h1>

      <div className="flex lg:flex-row flex-col mt-16">
      <button  type="button" class="text-white bg-blue-600 bg-primary lg:-mt-0 -mt-6 font-visita-bold lg:text-2xl text-md  focus:ring-4 focus:ring-blue-300  rounded-full shadow-md shadow-blue-600 hover:shadow-blue-500 px-12 py-2.5 mr-2 lg:mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800 transition-shadow">Create Now</button>

      <Link to='/pricing'  type="button" class="text-primary bg-white border-2 lg:mt-0 mt-3 border-blue-600 font-visita-bold flex justify-center lg:text-2xl text-md shadow-md shadow-blue-300 hover:shadow-blue-100 transition-shadow focus:ring-4 focus:ring-blue-300  rounded-full px-12 py-2.5 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800 ">Pricing</Link>

      </div>

      <svg className='absolute lg:visible invisible cta-aura rotate-45'
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.27"
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
            stdDeviation="23"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)">
        <ellipse
          cx="288.874"
          cy="374.719"
          fill="hsla(212, 91%, 78%, 1)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
        <ellipse
          cx="258.132"
          cy="285.161"
          fill="hsla(272, 99%, 54%, 0.46)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
        <ellipse
          cx="331.338"
          cy="463.21"
          fill="hsla(167, 83%, 81%, 1)"
          rx="27.5"
          ry="277.5"
        ></ellipse>
      </g>
    </svg>

    <svg className='absolute lg:visible invisible cta-aura-2'
      xmlns="http://www.w3.org/2000/svg"
      opacity="0.58"
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
            stdDeviation="40"
          ></feGaussianBlur>
        </filter>
      </defs>
      <g filter="url(#bbblurry-filter)">
        <ellipse
          cx="320.288"
          cy="456.394"
          fill="hsla(212, 91%, 78%, 1)"
          rx="62.5"
          ry="277.5"
        ></ellipse>
        <ellipse
          cx="237.19"
          cy="290.396"
          fill="hsla(272, 99%, 54%, 1)"
          rx="62.5"
          ry="277.5"
        ></ellipse>
      </g>
    </svg>


    

</div>
  )
}

export default Cta