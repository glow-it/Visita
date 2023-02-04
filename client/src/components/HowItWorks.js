import React from "react";

function HowItWorks() {
  return (
    <section
      class="bg-black  pt-10 pb-20 text-white w-full font-semibold relative mt-24 lg:px-20 px-10  flex flex-col items-center "
    >
      <div className="w-full lg:py-10 flex lg:justify-center">
        <h1 className="lg:text-5xl text-3xl">How it works?</h1>
      </div>
      <div className="flex lg:flex-row flex-col items-center w-full h-full mt-8">
        <div
          data-aos-delay="100"
          className="w-full h-full  flex lg:mt-auto  flex-col lg:items-center items-start"
        >
          <div className="flex w-full lg:justify-center ">
            <img
              src="https://i.postimg.cc/9QYcW5h8/Screenshot-2023-02-04-at-12-42-49-PM.png"
              className="h-[280px] w-[280px] rounded-xl"
            />
          </div>
          <h1 className="mt-10 text-3xl">Build</h1>
          <p className="font-medium mt-5 text-slate-400 lg:px-20 lg:text-center">
            Choose from a range of templates and customize text, images, and
            layout to fit your brand.
          </p>
        </div>
        <div
          data-aos-delay="200"
          className="w-full h-full  flex lg:mt-auto mt-16 flex-col lg:items-center items-start"
        >
          <div className="flex w-full lg:justify-center ">
            <img
              src="https://i.postimg.cc/YSgdBb73/Screenshot-2023-02-04-at-12-25-10-PM.png"
              className="h-[280px] w-[310px] rounded-xl"
            />
          </div>
          <h1 className="mt-10 text-3xl">Publish</h1>
          <p className="font-medium mt-5 text-slate-400 lg:px-20 lg:text-center">
            With the click of a button, publish your website and Share your website
          </p>
        </div>
        <div
          data-aos-delay="300"
          className="w-full h-full  flex lg:mt-auto mt-16 flex-col lg:items-center items-start"
        >
          <div className="flex w-full lg:justify-center ">
            <img
              src="https://i.postimg.cc/C52zsy1H/Screenshot-2023-02-04-at-12-46-06-PM.png"
              className="h-[280px] w-[310px] rounded-xl"
            />
          </div>
          <h1 className="mt-10 text-3xl">Succeed</h1>
          <p className="font-medium mt-5 text-slate-400 lg:px-20 lg:text-center">
            {" "}
            Share your new website simply to all and watch your business succeed
            online.
          </p>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
