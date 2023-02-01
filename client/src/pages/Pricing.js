import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

function Pricing() {
  let navigate = useNavigate();
  let location = useLocation();

  useEffect(() => {
    document.title = "Pricing - Visita";
  }, []);

  return (
    <div class="relative w-full bg-white h-full pt-14">
      <Helmet>
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
          <div  data-aos-delay="200">
            <div class="p-8 bg-gray-900 rounded-xl">
              <div class="mb-4 text-center">
                <p class="text-xl font-medium tracking-wide text-white">
                  Basic plan
                </p>
                <div class="flex items-center justify-center">
                  <p class="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                    
                    ₹699
                  </p>
                  <p class="text-lg text-gray-500">/ year</p>
                </div>
              </div>
              <ul class="mb-8 space-y-2">
                <li class="flex items-center">
                  <div class="mr-3">
                    <svg
                      class="w-4 h-4 text-teal-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p class="font-medium text-gray-300">Basic design</p>
                </li>

                <li class="flex items-center">
                  <div class="mr-3">
                    <svg
                      class="w-4 h-4 text-teal-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p class="font-medium text-gray-300">Products page</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3">
                    <svg
                      class="w-4 h-4 text-teal-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p class="font-medium text-gray-300">All with one click</p>
                </li>
              </ul>
              <button
                onClick={() =>
                  navigate("/create", {
                    state: {
                      franchisee: location.state.franchisee,
                      franchisee_email: location.state.franchisee_email,
                      isPremium: false,
                    },
                  })
                }
                class="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded-full shadow-md bg-purple-400 hover:bg-purple-700 focus:shadow-outline focus:outline-none"
              >
                Choose this
              </button>
              <button
                onClick={() => navigate("/blueberrybakes")}
                class="inline-flex items-center mt-3 justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded-full shadow-md bg-slate-800 hover:bg-slate-600 focus:shadow-outline focus:outline-none"
              >
                See demo
              </button>
            </div>
            <div class="w-11/12 h-2 mx-auto bg-gray-900 rounded-b-xl opacity-75" />
            <div class="w-10/12 h-2 mx-auto bg-gray-900 rounded-b-xl opacity-50" />
            <div class="w-9/12 h-2 mx-auto bg-gray-900 rounded-b-xl opacity-25" />
          </div>
          <div  data-aos-delay="200">
            <div class="p-8 bg-gray-900 rounded-xl">
              <div class="mb-4 text-center">
                <p class="text-xl font-medium tracking-wide text-white">
                  Premium plan
                </p>
                <div class="flex items-center justify-center">
                  <p class="mr-2 text-5xl font-semibold text-white lg:text-6xl">
                  ₹999
                  </p>
                  <p class="text-lg text-gray-500">/ year</p>
                </div>
              </div>
              <ul class="mb-8 space-y-2">
                <li class="flex items-center">
                  <div class="mr-3">
                    <svg
                      class="w-4 h-4 text-teal-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p class="font-medium text-gray-300">Premium design</p>
                </li>

                <li class="flex items-center">
                  <div class="mr-3">
                    <svg
                      class="w-4 h-4 text-teal-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p class="font-medium text-gray-300">Ecommerce</p>
                </li>
                <li class="flex items-center">
                  <div class="mr-3">
                    <svg
                      class="w-4 h-4 text-teal-400"
                      viewBox="0 0 24 24"
                      strokeLinecap="round"
                      strokeWidth="2"
                    >
                      <polyline
                        fill="none"
                        stroke="currentColor"
                        points="6,12 10,16 18,8"
                      />
                      <circle
                        cx="12"
                        cy="12"
                        fill="none"
                        r="11"
                        stroke="currentColor"
                      />
                    </svg>
                  </div>
                  <p class="font-medium text-gray-300">Custom domain name</p>
                </li>
              </ul>
              <button
                onClick={() =>
                  navigate("/create", {
                    state: {
                      franchisee: location.state.franchisee,
                      franchisee_email: location.state.franchisee_email,
                      isPremium: true,
                    },
                  })
                }
                class="inline-flex items-center justify-center w-full h-12 px-6 font-semibold tracking-wide text-teal-900 transition duration-200 rounded-full shadow-md bg-teal-400 hover:bg-teal-700 hover:text-white focus:shadow-outline focus:outline-none"
              >
                Choose this
              </button>
              <button
                onClick={() => navigate("/visita")}
                class="inline-flex items-center mt-3 justify-center w-full h-12 px-6 font-semibold tracking-wide text-white transition duration-200 rounded-full shadow-md bg-slate-800 hover:bg-slate-600 focus:shadow-outline focus:outline-none"
              >
                See demo
              </button>
            </div>
            <div class="w-11/12 h-2 mx-auto bg-gray-900 rounded-b-xl opacity-75" />
            <div class="w-10/12 h-2 mx-auto bg-gray-900 rounded-b-xl opacity-50" />
            <div class="w-9/12 h-2 mx-auto bg-gray-900 rounded-b-xl opacity-25" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
