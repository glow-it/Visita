import React from "react";
import { useNavigate } from "react-router-dom";

function PlanDetails() {
  let navigate = useNavigate();

  return (
    <div className=" w-full flex  lg:flex-row flex-col">
      <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col-reverse">
        <div className=" w-full h-full  flex flex-col py-12 lg:px-24 px-14">
          <h1 className="lg:text-5xl text-3xl font-semibold">Basic plan</h1>
          <ul className="text-xl font-medium mt-6">
            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Unlimited Products In Ecommerce Store
            </li>
            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Video Gallery
            </li>
            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Premium design
            </li>
            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Ecommerce page
            </li>

            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="close"></ion-icon>
              </span>{" "}
              Custom domain
            </li>
            <li className="my-6 lg:text-xl text-md flex">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              No Visible Ads (Ads Free)
            </li>
          </ul>
        </div>
      </div>
      <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col">
        <div className="lg:border-l border-t w-full h-full  flex flex-col p-6 py-12 lg:px-24 px-14">
          <h1 className="lg:text-5xl text-3xl font-semibold">Premium plan</h1>
          <ul className="text-xl font-medium mt-6">
            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Unlimited Products In Ecommerce Store
            </li>
            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Video Gallery
            </li>
            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Premium design
            </li>
            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Ecommerce page
            </li>

            <li className="my-6 lg:text-xl text-md flex  text-black ">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              Custom domain
            </li>
            <li className="my-6 lg:text-xl text-md flex">
              <span className="lg:static flex items-center mr-1 lg:-translate-x-0 absolute -translate-x-7">
                <ion-icon name="checkmark"></ion-icon>
              </span>{" "}
              No Visible Ads (Ads Free)
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
