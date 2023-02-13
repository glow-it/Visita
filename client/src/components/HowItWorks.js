import React from "react";
import { useNavigate } from "react-router-dom";

function HowItWorks() {
  let navigate = useNavigate()
  return (
    <section
      class="bg-white h-[150vh] overflow-hidden  pt-10  text-black w-full font-semibold relative  lg:px-20 px-10  flex flex-col items-center lg:pb-32"
    >

 

      <div className="w-full z-20 lg:py-4 flex flex-col lg:items-center">
        <h1 data-aos="fade-up" data-aos-delay="300" className=" lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-[#02C7FF] to-[#01A1FE] font-extrabold text-5xl">Build, publish, done.</h1>
        <p data-aos="fade-up"
            data-aos-delay="0" className="lg:mt-14 mt-8 lg:text-[2.25rem] text-[1.125rem] lg:text-center lg:w-[900px]" >Visita is a digital vCard builder <br className="lg:hidden block"  /> that lets businesses easily create <br className="lg:hidden block"  /> a professional vCard in under <br className="lg:hidden block"  /> 10 minutes <br className="lg:hidden block"  /> without needing technical skills.</p>
      </div> 
      <div className="pb-16 mt-8 z-20 w-full flex lg:justify-center">
      <p data-aos="fade-up"
            data-aos-delay="0"
            onClick={()=> navigate('/pricing')}
              class="text-white bg-gradient-to-r hover:bg-gradient-to-l  from-blue-500 to-cyan-500    transition-all  hover:-translate-y-[2px] cursor-pointer  focus:ring-4  rounded-xl sm:text-3xl text-xl font-extrabold px-10 py-2.5 "
            >
              View our pricing
            </p>
      </div>

      <div className="w-full z-20 lg:py-12   flex lg:flex-row flex-col   lg:items-start ">
        <div className="w-full h-8 flex">
          <div data-aos="fade-up"
            data-aos-delay="200" className="w-[50%] h-full  flex justify-end">
            <p className="-mt-[5%] mr-12" >Fill form...</p>
          </div>
          <div data-aos="fade-up"
            data-aos-delay="300" className="w-[50%] h-full flex justify-start">
          <p className="-mt-[5%] ml-12" >...Publish🚀</p>
          </div>
        </div>
        <img data-aos="fade-right"
            data-aos-delay="0" className="lg:h-[600px] rounded-xl lg:rounded-r-3xl lg:absolute -left-[8%]" src="https://cdn.dribbble.com/users/837190/screenshots/17822072/media/0183628e007c60fb20ed9a2a360bceac.png?compress=1&resize=1600x1200&vertical=top" alt="" />
        <img data-aos="fade-left"
            data-aos-delay="100" className="lg:h-[600px] rounded-xl lg:mt-0 mt-6 lg:rounded-l-3xl lg:absolute -right-[8%]" src="https://cdn.dribbble.com/userupload/4481293/file/original-0950d50b6e1b57d33b13808e56ee3df9.png?compress=1&resize=2048x1536" alt="" />
      </div>
     
    </section>
  );
}

export default HowItWorks;
