import React from "react";
import { useNavigate } from "react-router-dom";

function Cta() {
  let navigate = useNavigate();

  return (
    <div className="w-full flex lg:flex-row flex-col h-[500px] bg-[#5241FE]">
      <div className="lg:w-[25%] w-full lg:ml-52 pt-20 lg:px-0 px-6 h-full flex flex-col lg:items-start items-center ">
        <h1 className="font-bold text-white lg:text-[2.50rem] text-[2rem] mb-3">
          Get started today!
        </h1>
        <p className="font-medium text-white lg:text-start text-center">
          Create a Stunning Website in 10 Minutes. <br /> No Coding Needed.
        </p>
      </div>

      <div className="lg:w-[60%] w-full lg:pl-24 lg:pt-28 h-full flex flex-col  lg:px-0 px-6">
        <div className="flex lg:flex-row flex-col">
          <input
            id="cta_input"
            placeholder="Enter your company name"
            className="font-medium rounded-lg pl-8 py-5 lg:w-[450px] w-full"
          />
          <button
            onClick={() =>
              navigate("/pricing", {
                state: {
                  franchisee: false,
                  franchisee_email: null,
                  company_name: document.getElementById("cta_input").value,
                },
              })
            }
            className="bg-black lg:mt-0 mt-3 text-white font-semibold px-8 py-5 lg:ml-3 rounded-lg"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cta;
