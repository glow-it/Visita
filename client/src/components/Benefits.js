import React from 'react'

function Benefits() {
  return (
    <div id='benefits' className='benefits-wrapper w-full  mb-10 flex flex-col lg:flex-row border lg:rounded-3xl rounded-xl' >
         <svg className='absolute benefits-aura -rotate-45'
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

        <div className="lg:w-2/5 w-full lg:text-start text-center lg:h-full  benefits-1 flex justify-center lg:items-center lg:px-24 px-8">
            <h1  className='text-black font-visita-bold lg:text-7xl text-2xl mt-8  lg:mt-0' ><span className='text-primary' >Benefits</span> Of Digital Visiting Card</h1>
        </div>

        <div className="flex-1  h-full benefits-2 flex flex-col lg:justify-center lg:items-start items-center lg:pt-0 pt-8 lg:px-12 px-4">
            <div   className="w-full h-12 flex items-center lg:-ml-0 -ml-12">
               <span className='text-green-500 lg:text-3xl text-xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-xs -ml-4 text-black' >You can modify or update the card as many times as you want, There's no need to depend on developers.</h1>
            </div>
            <div   className="w-full h-12 mt-4 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-green-500 lg:text-3xl text-xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-xs -ml-4  text-black' >There is no need for printing or stock maintenance.</h1>
            </div>
            <div   className="w-full h-12 mt-4 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-green-500 lg:text-3xl text-xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-xs -ml-4  text-black' >You can cut your printing costs by using a Digital vCard.</h1>
            </div>
            <div   className="w-full h-12 mt-4 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-green-500 lg:text-3xl text-xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-xs -ml-4  text-black' >Customers can easily save your card to their mobile device.</h1>
            </div>
            <div   className="w-full h-12 mt-4 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-green-500 lg:text-3xl text-xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-xs -ml-4  text-black' >A great business card makes an impression and can convert sales.</h1>
            </div>
            <div   className="w-full h-12 mt-4 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-green-500 lg:text-3xl text-xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-xs -ml-4  text-black' >Having your contact information on your customer's mobile phone is a business opportunity.</h1>
            </div>
            <div   className="w-full h-12 mt-4 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-green-500 lg:text-3xl text-xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-xs -ml-4  text-black' >With a digital business cards, you can express yourself in ways you couldn't before.</h1>
            </div>
            <div   className="w-full h-12 mt-4 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-green-500 lg:text-3xl text-xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-xs -ml-4  text-black' >It can do many features that cannot be done in normal vCard</h1>
            </div>
        </div>

    </div>
  )
}

export default Benefits