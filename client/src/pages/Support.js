import React from 'react'
import { useEffect } from 'react'
import apiKeys from '../Api/apiKeys';
import emailjs from '@emailjs/browser';
import { useToast } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useState } from 'react';
import { Toast } from '../miniComponents/Toast';

function Support() {

   useEffect(()=> {
      document.title = 'Visita - Support'
    },[])

    let toast = useToast()

    let [isLoading,setIsLoading] = useState(false)


    

  return (
    <div>




<section class="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10 lg:px-20 px-8  support">


   <div class="container">
      <div class="flex flex-wrap lg:justify-between -mx-4">
         <div class="w-full lg:w-1/2 xl:w-6/12 px-4">
            <div class="max-w-[570px] mb-12 lg:mb-0">
               <span  class="block mb-4 text-base text-primary font-bold">
               Help Center
               </span>
               <h2
               
                  class="
                  text-dark
                  mb-6
                  font-bold
                  text-[32px]
                  sm:text-[40px]
                  lg:text-[36px]
                  xl:text-[40px]
                  "
                  >
                  Get In Touch With Us
               </h2>
               <p  class="text-base font-medium text-body-color leading-relaxed mb-9">
               At this time you can ask us your needs or problems. You can easily ask for bugs, issues, improvements, new features and more. We have included location, phone number and mail. So you can contact us with the given details.
               </p>
               <div class="flex mb-8 max-w-[370px] w-full">
                  <div
                  
                     class="
                     max-w-[50px]
                     sm:max-w-[50px]
                     w-full
                     h-[50px]
                     sm:h-[50px]
                     flex
                     items-center
                     justify-center
                     mr-6
                     overflow-hidden
                     bg-primary bg-opacity-5
                     text-primary
                     rounded-full
                     "
                     >
                   <span className='text-white text-2xl flex items-center justify-center' ><ion-icon name="location"></ion-icon></span>
                  </div>
                  <div  class="w-full">
                     <h4 class="font-bold text-dark text-xl mb-1">Our Location</h4>
                     <p class="text-base text-body-color font-medium">
                        Manjeri Kerala, India  676121
                     </p>
                  </div>
               </div>
               <div class="flex mb-8 max-w-[370px] w-full">
                  <div
                  
                     class="
                     max-w-[60px]
                     sm:max-w-[50px]
                     w-full
                     h-[60px]
                     sm:h-[50px]
                     flex
                     items-center
                     justify-center
                     mr-6
                     overflow-hidden
                     bg-primary bg-opacity-5
                     text-primary
                     rounded-full
                     "
                     >
                     <span className='text-white text-2xl flex items-center justify-center' ><ion-icon name="call"></ion-icon></span>
                  </div>
                  <div  class="w-full">
                     <h4 class="font-bold text-dark text-xl mb-1">Phone Number</h4>
                     <p class="flex text-base text-body-color font-medium">{apiKeys.call_phone_no} <a href={`tel:${apiKeys.call_phone_no}`} className='text-2xl flex ml-2 text-primary cursor-pointer' ><ion-icon name="arrow-redo-circle-outline"></ion-icon></a></p>
                  </div>
               </div>
               <div class="flex mb-8 max-w-[370px] w-full">
                  <div
                  
                     class="
                     max-w-[50px]
                     sm:max-w-[50px]
                     w-full
                     h-[50px]
                     sm:h-[50px]
                     flex
                     items-center
                     justify-center
                     mr-6
                     overflow-hidden
                     bg-primary bg-opacity-5
                     text-primary
                     rounded-full
                     "
                     >
                   <span className='text-white text-2xl flex items-center justify-center' ><ion-icon name="mail"></ion-icon></span>
                  </div>
                  <div  class="w-full">
                     <h4 class="font-bold text-dark text-xl mb-1">
                        Email Address
                     </h4>
                     <p class="flex text-base text-body-color font-medium">{apiKeys.visita_email}<a href={`mailto:${apiKeys.visita_email}`} className='text-2xl flex ml-2 text-primary cursor-pointer' ><ion-icon name="arrow-redo-circle-outline"></ion-icon></a></p>
                  </div>
               </div>
            </div>
         </div>
         <h1 className='lg:block hidden font-bold text-4xl absolute right-44 bottom-44' >Click On The Chat Button <br /> For Chat With Our Staff <span className='animate-pulse text-7xl absolute rotate-45 text-blue-600 top-20' ><ion-icon name="arrow-forward"></ion-icon></span></h1>
      </div>
   </div>
</section>
    </div>
  )

  }


export default Support