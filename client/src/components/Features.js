import React from 'react'

function Features() {


  
  return (
   <section id='features' class="bg-white :bg-gray-900 font-visita-bold relative mt-12">


    <svg className='absolute features-aura rotate-45'
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

    <svg className='absolute features-aura-2'
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

  <div class="py-8 px-4 mx-auto max-w-screen-xl sm:py-16 lg:px-6 ">
      <div class="max-w-screen-md mb-8 lg:mb-16">
          <h2   class="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 :text-white"><span className='text-primary mr-3' >Here!</span> Digital Visiting Card Features</h2>
          <p   class="text-gray-500 sm:text-xl :text-gray-400 font-visita-medium">Here is the more features have in visita - digital visiting card</p>
      </div>
      <div class="space-y-8 md:grid md:grid-cols-2 lg:grid-cols-3 md:gap-12 md:space-y-0">


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="business"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">Business Ads</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">You can add your Business ads. Very easily can check your offers</p>
          </div>


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="globe"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">Website Link</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">People can visit your website by just clicking on web icon.!</p>
          </div>


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="qr-code"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">QR Codes</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">You can add your QR Codes. That can help your clients find your qr codes and read it quickly</p>
          </div>


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="mail"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">Email on Click</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">Your clients can send you an email by just click on mail icon.!</p>
          </div>


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="chatbubble-ellipses"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">Social Media Links</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">You can add your Business ads. Very easily can check your offers</p>
          </div>


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="cash"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">Payment Detais</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">You can add your payment details,  payment qr codes, upi id and payment links.</p>
          </div>


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="navigate-circle"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">Navigate on click</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">People can navigate your premises by just clicking on map icon.!</p>
          </div>


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="logo-whatsapp"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">WhatsApp on click</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">Your clients can WhatsApp you without saving your number.!</p>
          </div>


          <div   >
              <div class="flex justify-center items-center mb-4 w-10 h-10 rounded-full bg-primary-100 lg:h-12 lg:w-12 :bg-primary-900">
              <span className='w-5 h-5 text-primary text-2xl lg:w-6 lg:h-6 :text-primary-300' ><ion-icon name="cart"></ion-icon></span>
              </div>
              <h3 class="mb-2 text-xl font-bold :text-white">Products</h3>
              <p class="text-gray-500 :text-gray-400 font-visita-medium">with product all details. That can help your clients order your products easily</p>
          </div>


      </div>
  </div>
</section>
  )
}

export default Features