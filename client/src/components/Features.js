import React from "react";

function Features() {
  return (
    <section
      id="features"
      class="bg-white :bg-gray-900 w-full px-10 lg:pt-16  pb-10 font-semibold relative  "
    >
      <div data-aos="fade-up"
            data-aos-delay="0" className="w-full lg:pt-14 flex items-center lg:justify-center">
        <h1 className="lg:text-8xl text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#FE9E0E] to-[#FE10D7]">Top-notch features</h1>
      </div>

      <div class="py-8  mx-auto w-full  sm:py-16 lg:px-20 ">
        <div class="space-y-8 md:grid md:grid-cols-1 lg:grid-cols-5 md:gap-12 md:space-y-0">
          <div data-aos-delay="0" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="call-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              One click call
            </h3>
          </div>

          <div data-aos-delay="50" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="arrow-down-circle-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              One click save
            </h3>
          </div>

          <div data-aos-delay="100" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="play"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Video gallery
            </h3>
          </div>

          <div data-aos-delay="150" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              One click whatsapp
            </h3>
          </div>

          <div data-aos-delay="200" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="mail-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              One click email
            </h3>
          </div>

          <div data-aos-delay="0" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="star-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Get customers feedback
            </h3>
          </div>

          <div data-aos-delay="50" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="navigate-circle-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              One click navigate
            </h3>
          </div>

          <div data-aos-delay="100" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="link-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Website & social links
            </h3>
          </div>

          <div data-aos-delay="150" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="arrow-redo-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Share unlimited
            </h3>
          </div>
          <div data-aos-delay="200" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="cart-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Online store
            </h3>
          </div>
          <div data-aos-delay="0" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="create-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Easy to update
            </h3>
          </div>
          <div data-aos-delay="50" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="images-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Image gallery
            </h3>
          </div>
          <div data-aos-delay="100" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="videocam-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Youtube video gallery
            </h3>
          </div>
          <div data-aos-delay="150" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="wallet-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Payment section
            </h3>
          </div>
          <div data-aos-delay="200" data-aos="fade-up"
             className="px-6 py-6 bg-slate-50 border hover:border-[#FE11D4] rounded-2xl cursor-pointer hover:bg-slate-100 transition-colors">
            <div class="flex items-center mb-4 w-10 h-10 rounded-full bg-[#5241FE]-100 lg:h-12 lg:w-12 ">
              <span className="w-5 h-5 text-black text-3xl lg:w-6 lg:h-6 ">
                <ion-icon name="chatbubble-outline"></ion-icon>
              </span>
            </div>
            <h3 class="mb-2 lg:text-lg text-md font-semibold :text-white">
              Enquiry form
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Features;
