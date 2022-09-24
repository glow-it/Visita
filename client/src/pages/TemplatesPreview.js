import React, { useEffect } from 'react'

function TemplatesPreview() {

    useEffect(()=> {
        document.title = 'Visita | Templates'
      },[])

  return (
    <div className='h-screen w-full' >

<div className="z-10">
<svg className='absolute h-[800px] rotate-45'
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

    <svg className='absolute right-[50px] h-[700px] rotate-12'
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

</div>

        <div className="visita-text-animation w-full flex flex-col items-center justify-center pt-44 z-50">
        
<h1 className='text-center text-7xl text-black font-visita-black' >
<span className='text-blue-600' ><p id="change_text_templates"></p></span>
<span>vCard</span>
<span>Templates,</span>
<br />
<span>Customize</span>
<span>As</span>
<span>You</span>
<span>Like</span>
</h1>

<h1 className='text-center text-lg text-black font-visita-medium mt-8  min-w-[800px]' >We Provide Premium Templates To You. You Can Customize This Template As You Like. We Creating And Updating Templates Every Time. You Can Change Your Templates At Any Time</h1>

</div>

     


      <div className="w-full mt-4 py-8  flex flex-wrap justify-center ">


        <div className="template-wrapper h-[300px] w-[400px] bg-white transition-colors  hover:border-blue-500 cursor-pointer mx-6 my-6 rounded-2xl border shadow-md flex justify-center overflow-hidden relative ">

          <div className="transition-transform template-redirect-button-wrapper h-10 w-10 absolute right-6 top-4 bg-white rounded-full shadow-md flex justify-center items-center">
            <span className='text-blue-600 transition-colors -rotate-45 flex justify-center items-center text-2xl' ><ion-icon name="arrow-forward-outline"></ion-icon></span>
          </div>

          {/* Template Image */}
          <img className='mt-8 h-[350px] rounded-[30px]' src="https://i.postimg.cc/xTHRPHsF/Screenshot-2022-09-21-10-33-35-20-40deb401b9ffe8e1df2f1cc5ba480b12.jpg"  />

          {/* Mobile Screen Image  */}
          <img className='absolute  mt-6' src="https://i.postimg.cc/g2H1N1M5/mobilescreen.png" alt="no image found (Mobile Screen)" />

        </div>

        
        <div className="template-wrapper h-[300px] w-[400px] bg-white transition-colors  hover:border-blue-500 cursor-pointer mx-6 my-6 rounded-2xl border shadow-md flex justify-center overflow-hidden relative ">

          <div className="template-redirect-button-wrapper h-10 w-10 absolute right-6 top-4 bg-white rounded-full shadow-md flex justify-center items-center transition-transform">
            <span className='text-blue-600 transition-colors -rotate-45 flex justify-center items-center text-2xl' ><ion-icon name="arrow-forward-outline"></ion-icon></span>
          </div>

          {/* Template Image */}
          <img className='mt-8 h-[350px] rounded-[30px]' src="https://i.postimg.cc/MGgQFZpK/Screenshot-2022-09-21-10-48-13-54-40deb401b9ffe8e1df2f1cc5ba480b12.jpg"  />

          {/* Mobile Screen Image  */}
          <img className='absolute  mt-6' src="https://i.postimg.cc/g2H1N1M5/mobilescreen.png" alt="no image found (Mobile Screen)" />

        </div>


      </div>
      
    


    </div>
  )
}

export default TemplatesPreview