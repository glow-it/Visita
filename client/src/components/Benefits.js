import React from "react";

function Benefits() {
  return (
    <div
      id="benefits"
      className="benefits-wrapper py-16 w-full  flex flex-col lg:flex-row bg-black "
    >
      <div className="lg:w-[50%] lg:py-0 py-6 w-full lg:text-start text-center lg:h-full  benefits-1 flex justify-center lg:items-center lg:px-24 px-8">
        <img
          className="  lg:rounded-3xl rounded-xl"
          src={require("../Images/heroimage.webp")}
          muted
          autoPlay={true}
          loop
        ></img>
      </div>

      <div className="flex-1   h-full benefits-2 flex flex-col lg:justify-center lg:items-start items-center lg:pt-0 pt-8  lg:pr-14 lg:pl-0 pl-4">
        <div
          data-aos-delay="0"
          className="w-full  m my-2 flex  lg:-ml-0 -ml-12"
        >
          <span className="text-[#5241FE] lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </span>
          <h1 className="font-medium lg:text-lg text-[15px]  -ml-4  text-white">
            You can modify or update the website as many times as you want,
            There's no need to depend on developers.
          </h1>
        </div>
        <div
          data-aos-delay="50"
          className="w-full  m my-2 flex  lg:-ml-0 -ml-12"
        >
          <span className="text-[#5241FE] lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </span>
          <h1 className="font-medium lg:text-lg text-[15px]  -ml-4  text-white">
            Customers can easily save your website to their mobile device.
          </h1>
        </div>
        <div
          data-aos-delay="100"
          className="w-full  m my-2 flex  lg:-ml-0 -ml-12"
        >
          <span className="text-[#5241FE] lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </span>
          <h1 className="font-medium lg:text-lg text-[15px]  -ml-4  text-white">
            Ecommerce Order Manager
          </h1>
        </div>

        <div data-aos-delay="150" className="w-full  flex  lg:-ml-0 -ml-12 ">
          <span className="text-[#5241FE] lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </span>
          <h1 className="font-medium lg:text-lg text-[15px]  -ml-4 text-white">
            Share websites with anyone, Unlimited times
          </h1>
        </div>
        <div
          data-aos-delay="200"
          className="w-full   my-2 flex  lg:-ml-0 -ml-12"
        >
          <span className="text-[#5241FE] lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </span>
          <h1 className="font-medium lg:text-lg text-[15px]  -ml-4  text-white">
            A great business website makes an impression and can convert sales.
          </h1>
        </div>
        <div data-aos-delay="0" className="w-full   my-2 flex  lg:-ml-0 -ml-12">
          <span className="text-[#5241FE] lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </span>
          <h1 className="font-medium lg:text-lg text-[15px]  -ml-4  text-white">
            Contact Form Included
          </h1>
        </div>
        <div
          data-aos-delay="50"
          className="w-full   my-2 flex  lg:-ml-0 -ml-12"
        >
          <span className="text-[#5241FE] lg:text-3xl text-2xl lg:mr-8 mr-6  ml-8 lg:-ml-8">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </span>
          <h1 className="font-medium lg:text-lg text-[15px]  -ml-4  text-white">
            No Visible Ads (Ads Free)
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Benefits;
