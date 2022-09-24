import {Link} from 'react-router-dom'


function Hero() {


  return (
    <div className='w-full hero lg:flex sm:p-6 border-b bg-blend-multiply mt-16' >

<svg className='absolute hero-aura'
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
            stdDeviation="36"
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
       
        <div className="lg:w-1/2 w-full flex flex-col sm:pl-16 pl-4" >
            <h1 className='font-visita-black pt-16 lg:text-6xl text-5xl' >Take A Boost For Your <span className="text-primary">Business</span></h1>

            <p  className='font-visita-medium text-xl mt-6 sm:ml-3 text-slate-600 lg:pr-16' >Visita is the smartest way to grow your business by creating Digital Visiting Card</p>


            <div className="w-full mt-12 py-2">

            <Link to='/create' type="button" class="text-blue-500 hover:shadow-md hover:shadow-blue-300 transition-shadow border-2 border-blue-500 bg-white ml-1 focus:ring-4 focus:ring-blue-300  rounded-full sm:text-2xl  text-lg font-visita-medium px-10 py-2.5 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800">Create now</Link>

            <button type="button" class="text-white bg-blue-600 bg-primary ml-1 shadow-md shadow-blue-600 hover:shadow-blue-500 transition-shadow focus:ring-4 focus:ring-blue-400  rounded-full sm:text-2xl text-lg font-visita-medium px-10 py-2.5 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800">See Demos</button>


            </div>

            <div className="w-full mt-12 py-2 flex">

           <h1 className='font-visita-bold text-3xl sm:text-4xl ' >1000+ <br /> <span className='sm:text-2xl text-xl' >Site Visitors</span> </h1>
           <h1 className='text-4xl mt-4 text-slate-600 ml-6 mr-6' > | </h1>
           <h1 className='font-visita-bold text-3xl sm:text-4xl ' >600+ <br /> <span className='sm:text-2xl text-xl' >Cards Created</span> </h1>
           

            </div>

        </div>
        <div className="lg:w-1/2 w-full -mt-6
        lg:pr-24 pr-0 lg:block hidden">
        <lottie-player src="https://assets10.lottiefiles.com/packages/lf20_vo1qtepr.json"  background="transparent"  speed="1"  autoplay></lottie-player>
        </div>
       
    </div>
  )
}

export default Hero