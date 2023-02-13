import React from "react";

function Benefits() {
  return (
    <div
      id="benefits"
      className="benefits-wrapper pb-16 w-full  flex justify-center flex-col  bg-white "
    >

<div data-aos="fade-down" className="w-full  flex justify-center items-center lg:justify-center">
        <h1 className="lg:text-8xl text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#F30172] to-[#7900ED]">The-benefits</h1>
      </div>
      
      <div className="flex lg:mt-24 mt-12 flex-col items-center">
      <div data-aos="fade-down" className="lg:w-[50%] flex lg:py-0  w-full lg:text-start text-center lg:h-full  benefits-1  justify-center lg:items-center lg:px-24 px-8">
        <img
          className="  lg:rounded-xl rounded-xl scale-125"
          src="https://blog.beaconstac.com/wp-content/uploads/2022/12/The-8-digital-business-card-benefits.png"
          muted
          autoPlay={true}
          loop
        ></img>
        
      </div>

      <div className="flex-1    h-full benefits-2 flex flex-col  items-center lg:pt-0 pt-8   lg:mt-16 mt-4 it">
        <div
          data-aos-delay="0"
          data-aos="fade-down"
          className="w-full   my-2 flex  justify-center bg-slate-50 hover:bg-slate-100 py-6 px-12  cursor-pointer"
        >
         
          <h1 className="font-medium lg:text-lg text-[15px] text-center    text-black">
            You can modify or update the card as many times as you want,
            There's no need to depend on developers.
          </h1>
        </div>
        <div
          data-aos-delay="50"
          data-aos="fade-down"
          className="w-full   my-2 flex  justify-center bg-slate-50 hover:bg-slate-100 py-6 px-12  cursor-pointer"
        >
         
          <h1 className="font-medium lg:text-lg text-[15px] text-center    text-black">
            Customers can easily save your card to their mobile device.
          </h1>
        </div>
        <div
          data-aos-delay="100"
          data-aos="fade-down"
          className="w-full   my-2 flex  justify-center bg-slate-50 hover:bg-slate-100 py-6 px-12  cursor-pointer"
        >
         
          <h1 className="font-medium lg:text-lg text-[15px] text-center    text-black">
            Ecommerce Order Manager
          </h1>
        </div>

        <div data-aos-delay="150" data-aos="fade-down" className="w-full  flex justify-center bg-slate-50 hover:bg-slate-100 py-6 px-12  cursor-pointer ">
         
          <h1 className="font-medium lg:text-lg text-[15px] text-center   text-black">
            Share cards with anyone, Unlimited times
          </h1>
        </div>
        <div
          data-aos-delay="200"
          data-aos="fade-down"
          className="w-full   my-2 flex  lg:-ml-0 justify-center bg-slate-50 hover:bg-slate-100 py-6 px-12 "
        >
         
          <h1 className="font-medium lg:text-lg text-[15px] text-center    text-black">
            A great business card makes an impression and can convert sales.
          </h1>
        </div>

        <div data-aos-delay="250" data-aos="fade-down" className="w-full   my-2 flex  lg:-ml-0 justify-center bg-slate-50 hover:bg-slate-100 py-6 px-12 ">
         
          <h1 className="font-medium lg:text-lg text-[15px] text-center    text-black">
            Contact Form Included
          </h1>
        </div>
        <div
          data-aos-delay="300"
          data-aos="fade-down"
          className="w-full   my-2 flex  lg:-ml-0 justify-center bg-slate-50 hover:bg-slate-100 py-6 px-12 "
        >
         
          <h1 className="font-medium lg:text-lg text-[15px] text-center    text-black">
            No Visible Ads (Ads Free)
          </h1>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Benefits;
