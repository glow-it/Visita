import React from 'react'
import { useEffect } from 'react'
import apiKeys from '../Api/apiKeys';
import emailjs from '@emailjs/browser';
import { useToast } from '@chakra-ui/react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useState } from 'react';
import { Toast } from '../miniComponents/Toast';
import Footer from '../components/Footer';

function Support() {

   useEffect(()=> {
      document.title = 'Visita - Support'
    },[])

    let toast = useToast()

    let [isLoading,setIsLoading] = useState(false)


    

  return (
    <div className=' w-full bg-slate-50 flex flex-col items-center overflow-scroll pb-56' >

      <div className="w-full h-72  flex pt-36 flex-col items-center justify-center lg:px-0 px-8">
         <h1 data-aos="fade-up" data-aos-delay="0" className='font-extrabold lg:text-[4.25rem] text-4xl text-center' >Have questions? Reach out!</h1>
         <p data-aos="fade-up" data-aos-delay="100" className='font-medium text-xl lg:mt-10 mt-4 lg:text-start text-center' >At this time you can ask us your needs or problems.</p>
      </div>



      <div data-aos="fade-up" data-aos-delay="200" className="lg:w-[75%] w-[95%]  z-40 rounded-2xl h-[500px] bg-white shadow-lg flex lg:flex-row flex-col mt-16">
         <div className="lg:w-[35%] lg:pb-0 pb-12 w-full px-16 lg:rounded-l-2xl rounded-t-2xl bg-[#712FFE] flex flex-col items-center pt-16">
            <img src="https://assets.website-files.com/632b3351e816b66faf6d72ce/6373d0a36705627b7335c66a_Group%20488082.png" className='' />
            <h3 className='text-white mt-10 font-bold text-2xl text-center' >I Like Assistance the have Platform</h3>
            <button onClick={()=> {
                window.tidioChatApi.show();
                window.tidioChatApi.open();
            }} className='font-semibold mb-4 text-lg py-4 w-full rounded-lg mt-6 bg-white text-[#712FFE]' >Chat with us</button>

           <div className="flex flex-col">
           <p className="flex items-center font-semibold text-xl text-white mt-4">
               <span className="flex items-center justify-center mr-2"><ion-icon name="mail"></ion-icon></span>
               team@visitasmart.com
            </p>
            <p className="flex items-center font-semibold text-xl text-white mt-4">
               <span className="flex items-center justify-center mr-2"><ion-icon name="location"></ion-icon></span>
               Kerala,India
            </p>
            <p className="flex items-center font-semibold text-xl text-white mt-4">
               <span className="flex items-center justify-center mr-2"><ion-icon name="call"></ion-icon></span>
               +919946365417
            </p>
           </div>

         </div>


         <div className="lg:w-[65%] w-full lg:rounded-2xl bg-white flex flex-col  lg:px-12 px-4">
            <div className="w-full pt-5 flex items-center mt-6">
               <h1 className="text-2xl font-semibold">Get in touch</h1>
            </div>
            <div className="w-full   flex flex-wrap mt-2">

              <input autoComplete='off' className='font-medium focus:border focus:border-[#712FFE] border py-3.5 pl-4 lg:w-[48%] w-full mr-3 mt-3 rounded-md' id="contact_first_name" placeholder='Enter your first name' />

              <input autoComplete='off' className='font-medium focus:border focus:border-[#712FFE] border py-3.5 pl-4 lg:w-[48%] w-full mr-3 mt-3 rounded-md' id="contact_last_name" placeholder='Enter your last name' />

              <input autoComplete='off' className='font-medium focus:border focus:border-[#712FFE] border py-3.5 pl-4 lg:w-[48%] w-full mr-3 mt-3 rounded-md' id="contact_email" placeholder='Enter your email' />

              <input autoComplete='off' className='font-medium focus:border focus:border-[#712FFE] border py-3.5 pl-4 lg:w-[48%] w-full mr-3 mt-3 rounded-md' id="contact_subject" placeholder='Subject' />

              <textarea autoComplete='off' className='font-medium w-full border-slate-200 focus:border-1 focus:border-[#712FFE] border py-3.5 h-32 pl-4 mr-3 mt-3 rounded-md' id="contact_message" placeholder='Message' />

            </div>
            <div className="w-full h-full flex pt-8 justify-center ">
            <button onClick={()=> {

let phoneNumber = "+919544562748"; 

let message =
  `
   
  QUERY FROM ${document.getElementById('contact_first_name').value}

  First name : ${document.getElementById('contact_first_name').value} 

  Last name : ${document.getElementById('contact_last_name').value} 

  Email : ${document.getElementById('contact_email').value} 

  Subject : ${document.getElementById('contact_subject').value} 

  Message : ${document.getElementById('contact_message').value} 

  Thankyou!!
  We will check it and response soon

  `;



let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
  message
)}`;


window.open(url, "_blank");

            }} className='font-semibold mb-4 h-16 justify-center flex items-center text-lg py-4 w-full rounded-lg  bg-black text-white' >Send message</button>
            </div>
         </div>


      </div>





    </div>
  )

  }


export default Support