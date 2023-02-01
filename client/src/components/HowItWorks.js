import React from "react";

function HowItWorks() {
  return (
    <section
      id="features"
      class="bg-black  pt-10 pb-20 text-white w-full font-semibold relative mt-24 lg:px-20 px-10  flex flex-col items-center "
    >
      <div data-aos="fade-up" className="w-full lg:py-10 flex lg:justify-center">
        <h1  className="lg:text-5xl text-3xl">How it works?</h1>
      </div>
      <div className="flex lg:flex-row flex-col items-center w-full h-full mt-8">
        <div data-aos="fade-up" data-aos-delay="100" className="w-full h-full  flex lg:mt-auto  flex-col lg:items-center items-start">
          <div className="flex w-full lg:justify-center ">
            <img
              src="https://cdn.dribbble.com/users/1339084/screenshots/6012375/media/a80788b99ec951a80ee3a0a6b1938eb7.png?compress=1&resize=1600x1200&vertical=top"
              className="h-[280px] w-[280px] rounded-3xl"
            />
          </div>
          <h1 className="mt-10 text-3xl" >Build</h1>
          <p className="font-medium mt-5 text-slate-400 lg:px-20 lg:text-center" >Choose from a range of templates and customize text, images, and layout to fit your brand.</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="200" className="w-full h-full  flex lg:mt-auto mt-16 flex-col lg:items-center items-start">
          <div className="flex w-full lg:justify-center ">
            <img
              src="https://cdn.dribbble.com/users/2669355/screenshots/16012679/media/f2a4be97467d650b4ffa1324cc0f0f42.png?compress=1&resize=1600x1200&vertical=top"
              className="h-[280px] w-[310px] rounded-3xl"
            />
          </div>
          <h1 className="mt-10 text-3xl" >Publish</h1>
          <p className="font-medium mt-5 text-slate-400 lg:px-20 lg:text-center" >With the click of a button, publish your website and Save to your device</p>
        </div>
        <div data-aos="fade-up" data-aos-delay="300" className="w-full h-full  flex lg:mt-auto mt-16 flex-col lg:items-center items-start">
          <div className="flex w-full lg:justify-center ">
            <img
              src="https://cdn.dribbble.com/users/870476/screenshots/15460067/media/2acc14d36d0f943111e3a2276d37a4d3.jpg?compress=1&resize=1600x1200&vertical=top"
              className="h-[280px] w-[310px] rounded-3xl"
            />
          </div>
          <h1 className="mt-10 text-3xl" >Succeed</h1>
          <p className="font-medium mt-5 text-slate-400 lg:px-20 lg:text-center" > Share your new website simply to all and watch your business succeed online.</p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
