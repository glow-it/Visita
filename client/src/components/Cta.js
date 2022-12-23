import React from "react";
import { Link } from "react-router-dom";

function Cta() {
  return (
    <div
      id="cta"
      class=" z-40 bg-white lg:my-20 my-4 rounded-[2rem] shadow-xl border  cta-wrapper relative flex flex-col items-center justify-center overflow-hidden"
    >



<div
        className="w-full -mt-32
        lg:block hidden pr-12 absolute"
      >
        <img className="h-16 absolute right-[100px] top-[100px]" src="https://i.postimg.cc/LXSLCNT4/vecteezy-clean-and-hygiene-symbol-sparkle-shine-and-twinkle-icon-copy.jpg" alt="" />
        
        <img className="h-10 absolute right-[100px] -top-[70px]" src="https://i.postimg.cc/LXSLCNT4/vecteezy-clean-and-hygiene-symbol-sparkle-shine-and-twinkle-icon-copy.jpg" alt="" />

        <img className="h-32 absolute left-[20px] -top-[20px]" src="https://i.postimg.cc/LXSLCNT4/vecteezy-clean-and-hygiene-symbol-sparkle-shine-and-twinkle-icon-copy.jpg" alt="" />
      </div>


      <h1 className="lg:text-6xl gradient-text text-3xl font-visita-bold text-primary ">
      Ready to create
      </h1>
      <h1 className="lg:text-3xl text-md font-visita-bold text-black lg:mt-6 mt-2">
        {" "}
        Now just only<span className="lg:ml-3 gradient-text">₹599</span>
      </h1>

      <div className="w-full mt-12 py-2 flex lg:flex-row flex-col items-center justify-center">
        

          <Link
          to='/create'
            type="button"
            class="text-white bg-blue-600 bg-primary transition-all  hover:-translate-y-[2px] cursor-pointer  focus:ring-4 focus:ring-blue-400  rounded-full sm:text-2xl text-xl font-visita-medium px-10 py-2.5 mr-2 mb-2"
          >
            Create now
          </Link>



          <Link
              to="/pricing"
              type="button"
              class="text-blue-600 hover:-translate-y-[2px] hover:bg-blue-600 hover:text-white  transition-all border-2 border-blue-600 bg-white focus:ring-4 focus:ring-blue-300  rounded-full sm:text-2xl  text-xl font-visita-medium px-10 py-2 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800"
            >
              Pricing
            </Link>


        </div>


     

      
    </div>
  );
}

export default Cta;
