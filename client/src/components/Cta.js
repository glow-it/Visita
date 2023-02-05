import React from "react";
import { useNavigate } from "react-router-dom";

function Cta() {
  let navigate = useNavigate();

  return (
    <div className="w-full flex flex-col h-[1150px] bg-black relative">
      <div className="w-full z-20 lg:py-10 flex flex-col items-center">
        <h1 data-aos="fade-up" data-aos-delay="0" className=" lg:text-7xl  text-transparent bg-clip-text bg-gradient-to-r from-[#02C7FF] to-[#01A1FE] mt-12 font-extrabold text-5xl text-center">Get started now.</h1>
        <p data-aos="fade-up" data-aos-delay="50" className="mt-6 lg:text-[1.70rem] text-[1.10rem] text-center w-[700px] font-semibold text-white" >Design and publish your first <br /> site with Visita today.</p>
      </div>

      <div className="flex lg:flex-row flex-col lg:px-0 px-10 w-full  mt-6 justify-center">
          <input
            id="cta_input"
            data-aos="fade-up" data-aos-delay="150"
            placeholder="Enter your company name"
            className="font-medium rounded-lg pl-8 py-5 lg:w-[450px] w-full"
          />
          <button
          data-aos="fade-up" data-aos-delay="200"
            onClick={() =>
              navigate("/pricing", {
                state: {
                  franchisee: false,
                  franchisee_email: null,
                  company_name: document.getElementById("cta_input").value,
                },
              })
            }
            className="bg-gradient-to-r from-[#02C7FF] to-[#01A1FE] lg:mt-0 mt-3 text-white font-semibold px-8 py-5 lg:ml-3 rounded-lg"
          >
            Get Started
          </button>
        </div>

        <div data-aos="fade-up" data-aos-delay="250" className="w-full lg:py-0 py-6  lg:text-start text-center lg:h-full  benefits-1 flex justify-center lg:items-center lg:px-24 px-8 mt-16">
        <img
        
          className="   rounded-3xl h-[700px] min-w-[1000px]"
          src="https://cdn.dribbble.com/userupload/4287671/file/original-68ebcb1ce738770c6f5fee484f22c0e0.png?compress=1&resize=1504x1128"
          muted
          autoPlay={true}
          loop
        ></img>
        
      </div>

      <div className="h-[130px] blur-lg w-full bg-black absolute bottom-[180px] z-20"></div>


    </div>
  );
}

export default Cta;
