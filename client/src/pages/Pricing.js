import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Pricing() {
  let navigate = useNavigate();
  let location = useLocation();

  let franchisee = location.state ? location.state.franchisee : false;
  let franchisee_email = location.state
    ? location.state.franchisee_email
    : "no franchisee";
  let state_company_name = location.state
    ? location.state.company_name
      ? location.state.company_name
      : ""
    : null;

    console.log(franchisee,franchisee_email);

  useEffect(() => {
    window.scrollTo(0,0)
    document.title = "Pricing - Visita";
  }, []);

  return (
    <div class="relative w-full bg-white h-full pt-14">
      <Helmet>
        <title>Pricing - Visita</title>
        <meta
          name="description"
          content="
          
          Our website builder offers flexible pricing options to fit the needs of any business. Our basic plan includes essential features such as customizable template and hosting for a low annually fee. Upgrade to our premium plan for added features such as e-commerce integration and premium design.


          "
        />
      </Helmet>

      <div class="absolute hidden w-full  lg:block h-96 " />
      <div class="relative px-4 py-16 mx-auto sm:max-w-xl md:max-w-full  lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
        <div class="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-xl md:mb-12">
          <h2
            data-aos="fade-down"
            data-aos-delay="0"
            class="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto"
          >
            <span class="relative inline-block">
              <svg
                viewBox="0 0 52 24"
                fill="currentColor"
                class="absolute top-0 left-0 z-0 hidden w-32 -mt-8 -ml-20 text-gray-400 lg:w-32 lg:-ml-28 lg:-mt-10 sm:block"
              >
                <defs>
                  <pattern
                    id="2c67e949-4a23-49f7-bf27-ca140852cf21"
                    x="0"
                    y="0"
                    width=".135"
                    height=".30"
                  >
                    <circle cx="1" cy="1" r=".7" />
                  </pattern>
                </defs>
                <rect
                  fill="url(#2c67e949-4a23-49f7-bf27-ca140852cf21)"
                  width="52"
                  height="24"
                />
              </svg>
              <span className="relative font-extrabold leading-[2.6rem]">
                Our pricing plan. Affordable
              </span>
            </span>{" "}
          </h2>
          <p
            data-aos-delay="100"
            class="text-base text-gray-700 md:text-lg font-medium"
          >
            Pay once and we'll automatically take payment from your bank
            annually. Payment secured by Razorpay
          </p>
        </div>
        <div class="grid max-w-screen-md gap-10 md:grid-cols-2 sm:mx-auto">
          <div data-aos-delay="200">
            <div class="p-8 bg-white text-black border rounded-xl">
              <div class="mb-4 text-center">
                <p class="text-xl font-medium tracking-wide text-black">
                  Basic plan
                </p>
                <div class="flex items-center justify-center">
                  <p class="mr-2 text-5xl font-semibold text-black lg:text-6xl">
                    ₹699
                  </p>
                  <p class="text-lg text-gray-500">/ year</p>
                </div>
              </div>
              <ul class="mb-8 space-y-2">
              

                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="close-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Video gallery</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="close-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Premium design</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="close-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Ecommerce page</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="close-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Custom domain</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">20 products or services</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">2 templates</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">No visible ads (Ads free)</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">One click save as app</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Update website unlimited times</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Feedback option available</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Manage feedbacks</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">5 photos in gallery</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">5 videos in youtube video gallery</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Payment section</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Contact form</p>
                </li>
              </ul>
              <button
                onClick={() =>
                  navigate("/create", {
                    state: {
                      franchisee,
                      franchisee_email,
                      isPremium: false,
                      state_company_name,
                    },
                  })
                }
                class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-black  focus:shadow-outline focus:outline-none"
              >
                Choose this
              </button>
              <button
                onClick={() => navigate("/blueberrybakes")}
                class="inline-flex items-center mt-3 justify-center w-full h-12 px-6 font-semibold tracking-wide text-black transition duration-200 rounded-lg  bg-slate-100 hover:bg-slate-200 focus:shadow-outline focus:outline-none"
              >
                See demo
              </button>
            </div>
            <div class="w-11/12 h-2 mx-auto bg-white text-black border rounded-b-xl opacity-75" />
            <div class="w-10/12 h-2 mx-auto bg-white text-black border rounded-b-xl opacity-50" />
            <div class="w-9/12 h-2 mx-auto bg-white text-black border rounded-b-xl opacity-25" />
          </div>
          <div data-aos-delay="200">
            <div class="p-8 bg-white text-black border border-indigo-600  rounded-xl">
              <div class="mb-4 text-center">
                <p class="text-xl font-medium tracking-wide text-black">
                  Premium plan
                </p>
                <div class="flex items-center justify-center">
                  <p class="mr-2 text-5xl font-semibold text-black lg:text-6xl">
                    ₹999
                  </p>
                  <p class="text-lg text-gray-500">/ year</p>
                </div>
              </div>
              <ul class="mb-8 space-y-2">
               

                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Video gallery</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Premium design</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Ecommerce page</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Custom domain</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">100 products in ecommerce store</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">10+ templates</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">No visible ads (Ads free)</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">One click save as app</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Update website unlimited times</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Feedback option available</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Manage feedbacks</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">20 photos in gallery</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">20 videos in youtube video gallery</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Payment section</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3 text-teal-500 text-xl">
                   <ion-icon name="checkmark-outline" ></ion-icon>
                  </div>
                  <p class="font-medium text-gray-600">Contact form</p>
                </li>

              </ul>
              <button
                onClick={() =>
                  navigate("/create", {
                    state: {
                      franchisee,
                      franchisee_email,
                      isPremium: true,
                      state_company_name,
                    },
                  })
                }
                class="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded-lg shadow-md bg-indigo-600 hover:bg-indigo-700  focus:shadow-outline focus:outline-none"
              >
                Choose this
              </button>
              <button
                onClick={() => window.location.href="https://visita.visitasmart.com"}
                class="inline-flex items-center mt-3 justify-center w-full h-12 px-6 font-semibold tracking-wide text-black transition duration-200 rounded-lg  bg-slate-100 hover:bg-slate-200 focus:shadow-outline focus:outline-none"
              >
                See demo
              </button>
            </div>
            <div class="w-11/12 h-2 mx-auto bg-white text-black border border-indigo-600  rounded-b-xl opacity-75" />
            <div class="w-10/12 h-2 mx-auto bg-white text-black border border-indigo-600  rounded-b-xl opacity-50" />
            <div class="w-9/12 h-2 mx-auto bg-white text-black border border-indigo-600  rounded-b-xl opacity-25" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
