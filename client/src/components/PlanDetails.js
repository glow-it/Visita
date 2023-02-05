import React from "react";
import { useNavigate } from "react-router-dom";

function PlanDetails() {
  let navigate = useNavigate();

  return (

    <div className="w-full">
      <div data-aos="fade-up" className="min-w-full py-16  flex items-center justify-center border-t">
        <h1 className="lg:text-7xl text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#02C7FF] to-[#01A1FE]">Plan details</h1>
      </div>

    <div className=" w-full flex  lg:flex-row flex-col">



      <div className="w-full lg:h-[50%] h-full flex border-t lg:flex-row flex-col-reverse">
        <div className=" w-full h-full  flex flex-col py-12 lg:px-24 px-14">
          <h1 data-aos="fade-up" data-aos-delay="0" className="lg:text-5xl text-3xl font-semibold">Basic plan</h1>
          <ul className="text-xl font-medium mt-6">
            <li data-aos="fade-up" data-aos-delay="50" className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Video gallery
            </li>
            <li data-aos="fade-up" data-aos-delay="100" className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Premium design
            </li>
            <li data-aos="fade-up" data-aos-delay="150" className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Ecommerce page
            </li>

            <li data-aos="fade-up" data-aos-delay="200" className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Custom domain
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col">
        <div className="lg:border-l border-t w-full h-full  flex flex-col p-6 py-12 lg:px-24 px-14">
          <h1 data-aos="fade-up" data-aos-delay="100" className="lg:text-5xl text-3xl font-semibold">Premium plan</h1>
          <ul className="text-xl font-medium mt-6">
            <li data-aos="fade-up" data-aos-delay="150" className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Video gallery
            </li>
            <li data-aos="fade-up" data-aos-delay="200" className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Premium design
            </li>
            <li data-aos="fade-up" data-aos-delay="250" className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Ecommerce page
            </li>

            <li data-aos="fade-up" data-aos-delay="300" className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Custom domain
            </li>
          </ul>
        </div>
      </div>
    </div>
    </div>
  );
}

export default PlanDetails;
