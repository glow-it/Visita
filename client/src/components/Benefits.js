import React from 'react'

function Benefits() {
  return (
    <div id='benefits' className='benefits-wrapper w-full  mb-10 flex flex-col lg:flex-row bg-blue-50/50' >
        

        <div className="lg:w-[60%] lg:py-0 py-6 w-full lg:text-start text-center lg:h-full  benefits-1 flex justify-center lg:items-center lg:px-24 px-8">
            <video className='  rounded-3xl' src="https://cdn.dribbble.com/users/702789/screenshots/15083025/media/2562577f3594075c4227b14a87375cae.mp4" muted autoPlay={true} loop></video>
        </div>

        <div className="flex-1   h-full benefits-2 flex flex-col lg:justify-center lg:items-start items-center lg:pt-0 pt-8  pr-14 lg:pl-0 pl-8">
            <div   className="w-full h-12 flex items-center lg:-ml-0 -ml-12 mt-4 ">
               <span className='text-blue-500 lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-[15px]  -ml-4 text-black' >You can modify or update the card as many times as you want, There's no need <br /> to depend on developers.</h1>
            </div>
            <div   className="w-full h-12 mt-10 lg:mt-6 flex items-center lg:-ml-0 -ml-12">
               <span className='text-blue-500 lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-[15px]  -ml-4  text-black' >There is no need for printing or stock maintenance.</h1>
            </div>
            <div   className="w-full h-12 mt-6 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-blue-500 lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-[15px]  -ml-4  text-black' >You can cut your printing costs by using a Digital vCard.</h1>
            </div>
            <div   className="w-full h-12 mt-6 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-blue-500 lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-[15px]  -ml-4  text-black' >Customers can easily save your card to their mobile device.</h1>
            </div>
            <div   className="w-full h-12 mt-8 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-blue-500 lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-[15px]  -ml-4  text-black' >A great business card makes an impression and can convert sales.</h1>
            </div>
            <div   className="w-full h-12 mt-12 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-blue-500 lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-[15px]  -ml-4  text-black' >Having your contact information on your customer's mobile phone is a business opportunity.</h1>
            </div>
            <div   className="w-full h-12 mt-16 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-blue-500 lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-[15px]  -ml-4  text-black' >With a digital business cards, you can express yourself in ways you couldn't before.</h1>
            </div>
            <div   className="w-full h-12 mt-12 lg:mt-2 flex items-center lg:-ml-0 -ml-12">
               <span className='text-blue-500 lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8'><ion-icon name="checkmark-circle-outline"></ion-icon></span>
                <h1 className='font-visita-medium lg:text-lg text-[15px]  -ml-4  text-black' >It can do many features that cannot be done in normal vCard</h1>
            </div>
        </div>

    </div>
  )
}

export default Benefits