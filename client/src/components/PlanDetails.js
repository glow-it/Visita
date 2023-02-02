import React from "react";
import { useNavigate } from "react-router-dom";

function PlanDetails() {
  let navigate = useNavigate();

  return (
    <div className=" w-full flex  lg:flex-row flex-col">
      <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col-reverse">
        <div className=" w-full h-full bg-blue-50/50 flex flex-col py-12 lg:px-24 px-14">
          <h1 className="lg:text-5xl text-3xl font-semibold">Basic plan</h1>
          <ul className="text-xl font-medium mt-6">
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Share cards with anyone, Unlimited times
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Update card Unlimited times.
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Feedback option available.
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Ecommerce Order Manager
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Select design from available templates
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              10 Products or Services
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              10 Photos in Gallery
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Social Media Links
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              5 Videos in Youtube Video Gallery
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Payment Section
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Contact Form Included
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              No Visible Ads (Ads Free)
            </li>
            <li className="my-6 lg:text-xl text-md line-through text-blue-600 ">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Unlimited Products In Ecommerce Store
            </li>
            <li className="my-6 lg:text-xl text-md line-through text-blue-600 ">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Video Gallery
            </li>
            <li className="my-6 lg:text-xl text-md line-through text-blue-600 ">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Premium design
            </li>
            <li className="my-6 lg:text-xl text-md line-through text-blue-600 ">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Ecommerce page
            </li>
          
            <li className="my-6 lg:text-xl text-md line-through text-blue-600 ">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Custom domain
            </li>
          </ul>
          <div className="flex mt-6">
            <button
              onClick={() => navigate("/blueberrybakes")}
              className="px-6 py-2 rounded-full bg-black text-xl text-white font-medium"
            >
              See demo
            </button>
          </div>
        </div>
      </div>
      <div className="w-full lg:h-[50%] h-full flex lg:flex-row flex-col">
        <div className="lg:border-l border-t w-full h-full bg-blue-50/50 flex flex-col p-6 py-12 lg:px-24 px-14">
          <h1 className="lg:text-5xl text-3xl font-semibold">Premium plan</h1>
          <ul className="text-xl font-medium mt-6">
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Share cards with anyone, Unlimited times
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Update card Unlimited times.
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Feedback option available.
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Ecommerce Order Manager
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Select design from available templates
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              10 Products or Services
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              10 Photos in Gallery
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Social Media Links
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              5 Videos in Youtube Video Gallery
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Payment Section
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Contact Form Included
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              No Visible Ads (Ads Free)
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Unlimited Products In Ecommerce Store
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Video Gallery
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Premium design
            </li>
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Ecommerce page
            </li>
           
            <li className="my-6 lg:text-xl text-md">
              <span className="lg:static lg:-translate-x-0 absolute -translate-x-7">
                →
              </span>{" "}
              Custom domain
            </li>
          </ul>
          <div className="flex mt-6">
            <button
              onClick={() => navigate("/visita")}
              className="px-6 py-2 rounded-full bg-black text-xl text-white font-medium"
            >
              See demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PlanDetails;
