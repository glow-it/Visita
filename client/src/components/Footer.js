import React from 'react'
import apiKeys from '../Api/apiKeys'

function Footer() {
  return (
    <div className='lg:h-[110vh] z-10 w-full bg-black flex justify-center items-center lg:-mt-[200px]' >


<footer class="pt-20 lg:pt-[120px] z-10 pb-10 lg:pb-20 px-8 relative  font-visita-bold">
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
                  src="../assets/images/glowitlogos/glowitlabs_text_white.png"
                  alt="logo"
                  class="comp-logo-footer rounded-full"
                  />
               </a>
               <p class="flex items-center text-sm text-white font-visita-medium">
                  <span class="text-primary mr-3 flex items-center justify-center">
                  <ion-icon name="call"></ion-icon>
                  </span>
                  <span>{apiKeys.call_phone_no}</span>
               </p>
               <p class="flex mt-6 items-center text-sm text-white font-visita-medium">
                  <span class="text-primary mr-3 flex items-center justify-center">
                  <ion-icon name="logo-whatsapp"></ion-icon>
                  </span>
                  <span>{apiKeys.visita_phone_no}</span>
               </p>
               <a href={`mailto:${apiKeys.visita_email}`} class="flex mt-6 items-center text-sm text-white font-visita-medium">
                  <span class="text-primary mr-3 flex items-center justify-center">
                  <ion-icon name="mail"></ion-icon>
                  </span>
                  <span>{apiKeys.visita_email}</span>
               </a>
            </div>
         </div>
         <div class="w-full sm:w-1/2 lg:w-2/12 px-4">
            <div class="w-full mb-10">
               <h4 class="text-slate-600 text-lg font-semibold mb-9">Resources</h4>
               <ul>
                  <li>
                     <a
                        href="javascript:void(0)"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        text-white
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
                        text-white
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
                        text-white
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
               <h4 class="text-slate-600 text-lg font-semibold mb-9">Company</h4>
               <ul>
                  <li>
                     <a
                        href="javascript:void(0)"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        text-white
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
                        text-white
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
                        text-white
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
               <h4 class="text-slate-600 text-lg font-semibold mb-9">Quick Links</h4>
               <ul>
                  <li>
                     <a
                        href="/pricing"
                        class="
                        inline-block
                        font-visita-medium
                        hover:text-blue-600
                        text-white
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
                        text-white
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
                        text-white
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
                        text-white
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
                        text-white
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
                        text-white
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
                        text-white
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
               <h4 class="text-slate-600 text-lg font-semibold mb-9">Follow Us On</h4>
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
                     border border-white
                     text-white
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
                     border border-white
                     text-white
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
                     border border-white
                     text-white
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
               <p class="text-base text-white">&copy; 2022 Visita</p>
               <p class="text-white mt-3 font-visita-medium">Powered By GlowiIt Labs</p>
            </div>
         </div>
      </div>
   </div>
 
</footer>
    </div>
  )
}

export default Footer