import React from 'react'
import apiKeys from '../Api/apiKeys'

function Footer() {
  return (
    <div>

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

<footer class="bg-white pt-20 lg:pt-[120px] pb-10 lg:pb-20 px-8 relative z-10 font-visita-bold">
   <div class="container">
      <div class="flex flex-wrap -mx-4">
         <div class="w-full sm:w-2/3 lg:w-3/12 px-4">
            <div class="w-full mb-10">
               <a
                  href="javascript:void(0)"
                  class="inline-block
                  font-visita-medium max-w-[160px] mb-6 lg:-ml-0 -ml-6"
                  >
               <img
                  src="../assets/images/glowitlogos/glowitlabs_text.png"
                  alt="logo"
                  class="comp-logo-footer rounded-full"
                  />
               </a>
               <p class="flex items-center text-sm text-dark font-visita-medium">
                  <span class="text-primary mr-3 flex items-center justify-center">
                  <ion-icon name="call"></ion-icon>
                  </span>
                  <span>{apiKeys.call_phone_no}</span>
               </p>
               <p class="flex mt-6 items-center text-sm text-dark font-visita-medium">
                  <span class="text-primary mr-3 flex items-center justify-center">
                  <ion-icon name="logo-whatsapp"></ion-icon>
                  </span>
                  <span>{apiKeys.visita_phone_no}</span>
               </p>
               <a href={`mailto:${apiKeys.visita_email}`} class="flex mt-6 items-center text-sm text-dark font-visita-medium">
                  <span class="text-primary mr-3 flex items-center justify-center">
                  <ion-icon name="mail"></ion-icon>
                  </span>
                  <span>{apiKeys.visita_email}</span>
               </a>
            </div>
         </div>
         <div class="w-full sm:w-1/2 lg:w-2/12 px-4">
            <div class="w-full mb-10">
               <h4 class="text-dark text-lg font-semibold mb-9">Resources</h4>
               <ul>
                  <li>
                     <a
                        href="javascript:void(0)"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                     Template Model
                     </a>
                  </li>
                  <li>
                     <a
                        href="javascript:void(0)"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                     New Features
                     </a>
                  </li>
                  <li>
                     <a
                        href="javascript:void(0)"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                     Update
                     </a>
                  </li>
               </ul>
            </div>
         </div>
         <div class="w-full sm:w-1/2 lg:w-2/12 px-4">
            <div class="w-full mb-10">
               <h4 class="text-dark text-lg font-semibold mb-9">Company</h4>
               <ul>
                  <li>
                     <a
                        href="javascript:void(0)"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                     About Visita
                     </a>
                  </li>
                  <li>
                     <a
                        href="/support"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                     Contact & Support
                     </a>
                  </li>
                  <li>
                     <a
                        href="javascript:void(0)"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                     Privacy & Policy
                     </a>
                  </li>
               </ul>
            </div>
         </div>
         <div class="w-full sm:w-1/2 lg:w-2/12 px-4">
            <div class="w-full mb-10">
               <h4 class="text-dark text-lg font-semibold mb-9">Quick Links</h4>
               <ul>
                  <li>
                     <a
                        href="/pricing"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                     Pricing
                     </a>
                  </li>
                  <li>
                     <a
                        href="javascript:void(0)"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                     See Demos
                     </a>
                  </li>
                  <li>
                     <a
                        href="#features"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                    Features
                     </a>
                  </li>
                  <li>
                     <a
                        href="#benefits"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                    Benefits
                     </a>
                  </li>
                  <li>
                     <a
                        href="/template"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                    Template Model
                     </a>
                  </li>
                  <li>
                     <a
                        href="/support"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                    Support
                     </a>
                  </li>
                  <li>
                     <a
                        href="/franchisee/login"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        hover:underline
                        text-base text-body-color
                        hover:text-primary
                        leading-loose
                        mb-2
                        "
                        >
                    Franchisee Login
                     </a>
                  </li>
               </ul>
            </div>
         </div>
         <div class="w-full sm:w-1/2 lg:w-3/12 px-4">
            <div class="w-full mb-10">
               <h4 class="text-dark text-lg font-semibold mb-9">Follow Us On</h4>
               <div class="flex items-center mb-6">
                  <a
                     href="https://www.instagram.com/visita.smart/"
                     target='_blank'
                     class="
                     w-8
                     h-8
                     flex
                     items-center
                     justify-center
                     rounded-full
                     border border-[#E5E5E5]
                     text-dark
                     hover:text-blue-500 hover:bg-primary hover:border-primary
                     mr-2
                     sm:mr-4
                     lg:mr-3
                     xl:mr-4
                     "
                     >
                     <ion-icon name="logo-instagram"></ion-icon>
                 
                  </a>


                  <a
                     href="https://www.twitter.com/TeamVisita"
                     target='_blank'
                     class="
                     w-8
                     h-8
                     flex
                     items-center
                     justify-center
                     rounded-full
                     border border-[#E5E5E5]
                     text-dark
                     hover:text-blue-500 hover:bg-primary hover:border-primary
                     mr-2
                     sm:mr-4
                     lg:mr-3
                     xl:mr-4
                     "
                     >
                     <ion-icon name="logo-twitter"></ion-icon>
                 
                  </a>


                  <a
                     href="https://www.facebook.com/profile.php?id=100087219987593"
                     target='_blank'
                     class="
                     w-8
                     h-8
                     flex
                     items-center
                     justify-center
                     rounded-full
                     border border-[#E5E5E5]
                     text-dark
                     hover:text-blue-500 hover:bg-primary hover:border-primary
                     mr-2
                     sm:mr-4
                     lg:mr-3
                     xl:mr-4
                     "
                     >
                     <ion-icon name="logo-facebook"></ion-icon>
                 
                  </a>



               </div>
               <p class="text-base text-body-color">&copy; 2022 Visita</p>
               <p class="text-black mt-3 font-visita-medium">Powered By GlowiIt Labs</p>
            </div>
         </div>
      </div>
   </div>
 
</footer>
    </div>
  )
}

export default Footer