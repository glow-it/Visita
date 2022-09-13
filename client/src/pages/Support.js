import React from 'react'
import { useEffect } from 'react'
import apiKeys from '../Api/apiKeys';
import emailjs from '@emailjs/browser';
import { useToast } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useState } from 'react';

function Support() {

    let toast = useToast()

    let [isLoading,setIsLoading] = useState(false)

    function sendMessage(){

        setIsLoading(true)
        let contact_form = document.querySelector('.contact_form');

        contact_form.reply_to.innerText = contact_form.from_mail.value

        emailjs.sendForm(apiKeys.emailjs_serviceId, apiKeys.emailjs_templateId, contact_form, apiKeys.emailjs_publicKey)
        .then((result) => {
            setIsLoading(false)
            toast({
                title: 'Message Sended',
                description: "We Will Read It And Response Shortly",
                status: 'success',
                duration: 6000,
              })
        }, (error) => {
            setIsLoading(false)
            toast({
                title: 'Message not send, Try Again!',
                description: "We Will Read It And Response Shortly",
                status: 'error',
                duration: 6000,
              })
        });
    };

    

  return (
    <div>




<section class="bg-white py-20 lg:py-[120px] overflow-hidden relative z-10 lg:px-20 px-8  support">



<svg className='absolute h-[500px] left-[400px] rotate-45 opacity-10'
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



   <div class="container">
      <div class="flex flex-wrap lg:justify-between -mx-4">
         <div class="w-full lg:w-1/2 xl:w-6/12 px-4">
            <div class="max-w-[570px] mb-12 lg:mb-0">
               <span data-aos="fade-up" class="block mb-4 text-base text-primary font-visita-bold">
               Help Center
               </span>
               <h2
               data-aos="fade-up" data-aos-delay="200"
                  class="
                  text-dark
                  mb-6
                  uppercase
                  font-visita-bold
                  text-[32px]
                  sm:text-[40px]
                  lg:text-[36px]
                  xl:text-[40px]
                  "
                  >
                  GET IN TOUCH WITH US
               </h2>
               <p data-aos="fade-up" data-aos-delay="300" class="text-base font-visita-medium text-body-color leading-relaxed mb-9">
                 This time to ask your needs or problems with us.You can ask bugs,issues,improvements,new features and more in just one click. we included our location,phone number,mail. you can mail or call with given details
               </p>
               <div class="flex mb-8 max-w-[370px] w-full">
                  <div
                  data-aos="fade-up" data-aos-delay="400"
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
                   <span className='text-white text-2xl' ><ion-icon name="location"></ion-icon></span>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="500" class="w-full">
                     <h4 class="font-visita-bold text-dark text-xl mb-1">Our Location</h4>
                     <p class="text-base text-body-color font-visita-medium">
                        (66) Manjeri Mullampara 676121, Kerala | India
                     </p>
                  </div>
               </div>
               <div class="flex mb-8 max-w-[370px] w-full">
                  <div
                  data-aos="fade-up" data-aos-delay="500"
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
                     <span className='text-white text-2xl' ><ion-icon name="call"></ion-icon></span>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="500" class="w-full">
                     <h4 class="font-visita-bold text-dark text-xl mb-1">Phone Number</h4>
                     <p class="flex text-base text-body-color font-visita-medium">(+91) 9946365417 <a href='tel:+919946365417' className='text-2xl flex ml-2 text-primary cursor-pointer' ><ion-icon name="arrow-redo-circle-outline"></ion-icon></a></p>
                  </div>
               </div>
               <div class="flex mb-8 max-w-[370px] w-full">
                  <div
                  data-aos="fade-up" data-aos-delay="600"
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
                   <span className='text-white text-2xl' ><ion-icon name="mail"></ion-icon></span>
                  </div>
                  <div data-aos="fade-up" data-aos-delay="600" class="w-full">
                     <h4 class="font-visita-bold text-dark text-xl mb-1">
                        Email Address
                     </h4>
                     <p class="flex text-base text-body-color font-visita-medium">sprt.visita@gmail.com <a href='mailto:sprt.visita@gmail.com' className='text-2xl flex ml-2 text-primary cursor-pointer' ><ion-icon name="arrow-redo-circle-outline"></ion-icon></a></p>
                  </div>
               </div>
            </div>
         </div>
         <div class="w-full lg:w-1/2 xl:w-5/12 px-4">
            <div data-aos="fade-up" data-aos-delay="700" class="bg-white relative rounded-3xl p-8 sm:p-12 shadow-lg">
               <form  className='contact_form'>
                  <div class="mb-6">
                     <input
                     autoComplete='off'
                     required
                     data-aos="fade-up" data-aos-delay="800"
                        type="text"
                        placeholder="Your Name"
                        name='from_name'
                        class="
                        transition-shadow
                        w-full
                        rounded-xl
                        py-3
                        px-[16px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        font-visita-medium
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        />
                  </div>
                  <div class="mb-6">
                     <input
                     autoComplete='off'
                     required
                     data-aos="fade-up" data-aos-delay="900"
                        type="email"
                        placeholder="Your Email"
                        name='from_mail'
                        class="
                        transition-shadow
                        w-full
                        rounded-xl
                        py-3
                        px-[16px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        font-visita-medium
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        />
                  </div>
                  <div class="mb-6">
                     <input
                     autoComplete='off'
                     required
                     data-aos="fade-up" data-aos-delay="1000"
                        type="text"
                        placeholder="Your Phone"
                        name='phone'
                        class="
                        transition-shadow
                        w-full
                        rounded-xl
                        py-3
                        px-[16px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        font-visita-medium
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        />
                  </div>
                  <div class="mb-6">
                     <input
                     autoComplete='off'
                     required
                     data-aos="fade-up" data-aos-delay="1000"
                        type="text"
                        placeholder="Reply To"
                        name='reply_to'
                        class="
                        transition-shadow
                        hidden
                        "
                        />
                  </div>
                  <div class="mb-6">
                     <textarea
                     required
                     data-aos="fade-up" data-aos-delay="1100"
                        rows="6"
                        placeholder="Your Message"
                        name='message'
                        class="
                        w-full
                        rounded-xl
                        py-3
                        px-[16px]
                        text-body-color text-base
                        border border-[f0f0f0]
                        font-visita-medium
                        resize-none
                        outline-none
                        focus-visible:shadow-none
                        focus:border-primary
                        "
                        ></textarea>
                  </div>
                  <div>
                     

                     <Button
                     data-aos="fade-up" data-aos-delay="1200"
                     onClick={sendMessage}
                     className='w-full
                     text-white
                     bg-primary
                     rounded-full
                     border border-primary
                     p-4
                     font-visita-bold
                     transition
                     hover:bg-opacity-90'
    isLoading={isLoading}
    loadingText='Sending Message'
    colorScheme='blue'
    variant='outline'
  >
    Send Message
  </Button>

                  </div>
               </form>
               <div>
                  <span class="absolute -top-10 -right-9 z-[-1]">
                     <svg
                        width="100"
                        height="100"
                        viewBox="0 0 100 100"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <path
                           fill-rule="evenodd"
                           clip-rule="evenodd"
                           d="M0 100C0 44.7715 0 0 0 0C55.2285 0 100 44.7715 100 100C100 100 100 100 0 100Z"
                           fill="#3056D3"
                           />
                     </svg>
                  </span>
                  <span class="absolute -right-10 top-[90px] z-[-1]">
                     <svg
                        width="34"
                        height="134"
                        viewBox="0 0 34 134"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle
                           cx="31.9993"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 31.9993 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 31.9993 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 31.9993 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 31.9993 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 31.9993 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 31.9993 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 31.9993 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 31.9993 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 31.9993 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 31.9993 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 17.3333 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 17.3333 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 17.3333 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 17.3333 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 17.3333 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 17.3333 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 17.3333 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 17.3333 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 17.3333 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 17.3333 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 2.66536 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 2.66536 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 2.66536 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 2.66536 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 2.66536 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 2.66536 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 2.66536 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 2.66536 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 2.66536 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 2.66536 1.66665)"
                           fill="#13C296"
                           />
                     </svg>
                  </span>
                  <span class="absolute -left-7 -bottom-7 z-[-1]">
                     <svg
                        width="107"
                        height="134"
                        viewBox="0 0 107 134"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        >
                        <circle
                           cx="104.999"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 104.999 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 104.999 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 104.999 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 104.999 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 104.999 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 104.999 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 104.999 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 104.999 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 104.999 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="104.999"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 104.999 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 90.3333 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 90.3333 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 90.3333 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 90.3333 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 90.3333 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 90.3333 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 90.3333 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 90.3333 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 90.3333 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="90.3333"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 90.3333 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 75.6654 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 31.9993 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 75.6654 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 31.9993 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 75.6654 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 31.9993 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 75.6654 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 31.9993 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 75.6654 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 31.9993 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 75.6654 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 31.9993 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 75.6654 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 31.9993 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 75.6654 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 31.9993 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 75.6654 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 31.9993 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="75.6654"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 75.6654 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="31.9993"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 31.9993 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 60.9993 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 17.3333 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 60.9993 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 17.3333 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 60.9993 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 17.3333 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 60.9993 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 17.3333 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 60.9993 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 17.3333 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 60.9993 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 17.3333 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 60.9993 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 17.3333 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 60.9993 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 17.3333 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 60.9993 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 17.3333 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="60.9993"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 60.9993 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="17.3333"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 17.3333 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 46.3333 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="132"
                           r="1.66667"
                           transform="rotate(180 2.66536 132)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 46.3333 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="117.333"
                           r="1.66667"
                           transform="rotate(180 2.66536 117.333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 46.3333 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="102.667"
                           r="1.66667"
                           transform="rotate(180 2.66536 102.667)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 46.3333 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="88"
                           r="1.66667"
                           transform="rotate(180 2.66536 88)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 46.3333 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="73.3333"
                           r="1.66667"
                           transform="rotate(180 2.66536 73.3333)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 46.3333 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="45"
                           r="1.66667"
                           transform="rotate(180 2.66536 45)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 46.3333 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="16"
                           r="1.66667"
                           transform="rotate(180 2.66536 16)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 46.3333 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="59"
                           r="1.66667"
                           transform="rotate(180 2.66536 59)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 46.3333 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="30.6666"
                           r="1.66667"
                           transform="rotate(180 2.66536 30.6666)"
                           fill="#13C296"
                           />
                        <circle
                           cx="46.3333"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 46.3333 1.66665)"
                           fill="#13C296"
                           />
                        <circle
                           cx="2.66536"
                           cy="1.66665"
                           r="1.66667"
                           transform="rotate(180 2.66536 1.66665)"
                           fill="#13C296"
                           />
                     </svg>
                  </span>
               </div>
            </div>
         </div>
      </div>
   </div>
</section>
    </div>
  )

  }


export default Support