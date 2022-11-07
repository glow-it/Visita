import React from 'react'
import {
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    PopoverAnchor,
    Button,
  } from '@chakra-ui/react'

function WhatIsDigitalCard() {
  return (
    <div className='lg:w-full lg:border-t-transparent border-t flex lg:h-[400px] h-[850px] flex-col relative lg:pl-24 pl-4' >

        <h1 className=' text-4xl font-visita-bold text-blue-600 mt-16' >What Is Digital Visiting Card?</h1>

        <p className=' font-visita-medium text-gray-500 text-lg lg:w-[900px] w-[300px] mt-8' >A digital visiting card is the virtual version of a paper visiting card. Depending on your region, digital visiting cards are also known as digital business cards, smart business cards, mobile business cards, and electronic name cards. Digital cards often take the form of a mobile app.</p>

        <div className="lg:w-full  absolute bottom-0 flex flex-wrap">

        <Popover autoFocus={false} placement='top'>
  <PopoverTrigger>
  <div className="min-w-1/4 lg:px-8 px-3 h-16 cursor-pointer border mr-4 mt-4 border-blue-100 bg-blue-50 transition-colors flex items-center justify-center lg:text-start text-center rounded-2xl hover:border-blue-600">
                <p className='text-blue-500 font-visita-medium' >Why Are Digital Disiting Card Important?</p>
            </div>
  </PopoverTrigger>
  <PopoverContent rounded='3xl' p='7' >
  <PopoverCloseButton p='6'  rounded='full'/>
   <p className='font-visita-medium my-2 leading-relaxed text-blue-600' >1. Digital visiting cards can be sent and received by anyone, anywhere. </p> <br />
   <p className='font-visita-medium my-2 leading-relaxed text-blue-600' >2. Digital cards contain more information. </p>
 <br />
 <p className='font-visita-medium my-2 leading-relaxed text-blue-600' >3. Digital business cards are cost-effective and eco-friendly.</p>

  </PopoverContent>
</Popover>


<Popover autoFocus={false} placement='top'>
  <PopoverTrigger>
  <div className="min-w-1/4 lg:px-8 px-3 h-16 cursor-pointer border mr-4 mt-4 border-blue-100 bg-blue-50 transition-colors flex items-center justify-center lg:text-start text-center rounded-2xl hover:border-blue-600">
                <p className='text-blue-500 font-visita-medium' >Where Can I Get A Digital Card?</p>
            </div>
  </PopoverTrigger>
  <PopoverContent rounded='3xl' p='7' >
  <PopoverCloseButton p='6'  rounded='full'/>
   <p className='font-visita-medium my-2 leading-relaxed text-blue-600' >There are several digital visiting card apps but we recommend Visita. Visita was one of the best visiting card platforms to hit the market and is used and trusted by people from all walks of life, from individuals to large corporations.</p>
  </PopoverContent>
</Popover>
           

<Popover autoFocus={false} placement='top'>
  <PopoverTrigger>
  <div className="min-w-1/4 lg:px-8 px-3 h-16 cursor-pointer border mr-4 mt-4 border-blue-100 bg-blue-50 transition-colors flex items-center justify-center lg:text-start text-center rounded-2xl hover:border-blue-600">
                <p className='text-blue-500 font-visita-medium' >How Do I Make A Digital Visiting Card?</p>
            </div>
  </PopoverTrigger>
  <PopoverContent rounded='3xl' p='7' >
  <PopoverCloseButton p='6'  rounded='full'/>
   <p className='font-visita-medium my-2 leading-relaxed text-blue-600' >Click on the "Create Card" button on the home page and fill in the fields to create a digital visiting card. These steps are very easy. And complete the purchase by paying 599 rs. Then you will receive your card very soon</p>
  </PopoverContent>
</Popover>

<Popover autoFocus={false} placement='top'>
  <PopoverTrigger>
  <div className="min-w-1/4 lg:px-8 px-3 h-16 cursor-pointer border mr-4 mt-4 border-blue-100 bg-blue-50 transition-colors flex items-center justify-center lg:text-start text-center rounded-2xl hover:border-blue-600">
                <p className='text-blue-500 font-visita-medium' >How Do I Send A Digital Visiting Card?</p>
            </div>
  </PopoverTrigger>
  <PopoverContent rounded='3xl' p='7' >
  <PopoverCloseButton p='6'  rounded='full'/>
   <p className='font-visita-medium my-2 leading-relaxed text-blue-600' >
<nav className='list' >
<li>QR code </li>
<li>Email </li>
<li>Text or SMS </li>
<li>Whatsapp </li>
<li>Copy link </li>
<li>NFC </li>
<li>Social media </li>
<li>Apple Watch</li>
</nav>
   </p>
  </PopoverContent>
</Popover>


<Popover autoFocus={false} placement='top'>
    
  <PopoverTrigger>
  <div className="min-w-1/4 lg:px-8 px-3 h-16 cursor-pointer border mr-4 mt-4 border-blue-100 bg-blue-50 transition-colors flex items-center justify-center lg:text-start text-center rounded-2xl hover:border-blue-600">
                <p className='text-blue-500 font-visita-medium' >Are Visiting Cards Still Relevant?</p>
            </div>
  </PopoverTrigger>
  <PopoverContent rounded='3xl' p='7' >
  <PopoverCloseButton p='6'  rounded='full'/>

  <p className='font-visita-medium my-2 leading-relaxed text-blue-600' >Yes, business cards are extremely relevant! Heading into 2022, digital visiting cards are predicted to be the leading networking tool because they're innovative, easily accessible, and have a positive environmental impact.</p>

  <p className='font-visita-medium my-2 leading-relaxed text-blue-600' >As long as relationships exist, business cards will exist—don't expect the visiting card to go away anytime soon.</p>
 

   

  </PopoverContent>
</Popover>

          

            

           

        </div>

    </div>
  )
}

export default WhatIsDigitalCard