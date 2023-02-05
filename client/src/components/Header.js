import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";

function Header() {
  let navigate = useNavigate();
  let location = useLocation()

  useEffect(() => {
    let header = document.querySelector("header");
    if (location.pathname === "/") {
      header.classList.add("bg-black");
      header.classList.add("text-white");
      window.onscroll = () => {
        if (window.scrollY >= 500 && window.scrollY <= 4950) {
          header.classList.replace("bg-black", "bg-white");
          header.classList.replace("text-white", "text-black");
        } else {
          header.classList.replace("bg-white", "bg-black");
          header.classList.replace("text-black", "text-white");
        }
      };
    } else {
      header.classList.add("bg-white");
      header.classList.add("text-black");
      window.onscroll = null;
    }
  }, [location]);
  
  
  
  

  

  //   Header Drawer Open
  let [open, setOpen] = useState(false);

  return (
    <div>
      <header
        className={` w-[100vw] h-20   flex flex-col   fixed  z-[200] `}
      >
        <div className="w-full h-full  flex items-center justify-center">
          <img
            src={require("../Images/logos/visitalogo.png")}
            className="h-12  z-20 mr-4 cursor-pointer absolute lg:left-10 left-8"
            id="header_logo"
            onClick={() => (window.location.href = "/")}
            onMouseEnter={() =>
              document
                .getElementById("header_logo_bg")
                .classList.add("header-logo-bg-active")
            }
            onMouseLeave={() =>
              document
                .getElementById("header_logo_bg")
                .classList.remove("header-logo-bg-active")
            }
          />

          <nav className="w-full h-full   flex items-center justify-center  lg:block hidden">
            <ul className="w-full h-full flex items-center justify-center">
              <a
                href="https://applox.visitasmart.com"
                className="font-medium  cursor-pointer text-md  hover:text-[#00BEFF]  px-3 rounded-3xl  flex items-center"
              >
                See demo
              </a>
              <p
                onClick={() =>
                  navigate("/pricing", {
                    state: { franchisee: false, franchisee_email: null },
                  })
                }
                className=" font-medium  cursor-pointer text-md  hover:text-[#00BEFF]  px-3 rounded-3xl  flex items-center"
              >
                Pricing
              </p>
              <a
                href="#features"
                className="font-medium  cursor-pointer text-md  hover:text-[#00BEFF]  px-3 rounded-3xl  flex items-center"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="font-medium  cursor-pointer text-md  hover:text-[#00BEFF]  px-3 rounded-3xl  flex items-center"
              >
                Benefits
              </a>

              <p>
                <Popover autoFocus={false} placement="bottom">
                  <PopoverTrigger>
                    <h1 className="font-medium  cursor-pointer text-md  hover:text-[#00BEFF]   flex items-center">
                      <span className=" px-3  rounded-full  hover:text-[#00BEFF]">
                        Manage website
                      </span>
                    </h1>
                  </PopoverTrigger>
                  <PopoverContent
                    border="1px"
                    rounded="3xl"
                    py="6"
                    px="6"
                    shadow="lg"
                  >
                    <PopoverBody>
                      <div className="flex flex-col">
                        <input
                          autoComplete="off"
                          id="manage_card_comp_name"
                          placeholder="Enter company name"
                          className="border focus:border text-black focus:border-[#5241FE] py-2 w-full pl-4 rounded-full font-medium"
                        />
                        <div className="w-full h-12 my-4 flex items-center">
                          <button
                            onClick={() =>
                              navigate(
                                "/manage/" +
                                  document
                                    .getElementById("manage_card_comp_name")
                                    .value.replace(/[ ]/g, "")
                              )
                            }
                            className="px-6 py-1 bg-[#5241FE] text-white rounded-full text-xl font-bold "
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </p>

              {!localStorage.getItem("franchisee_email") ? (
                <Link
                  to="/franchisee/register"
                  className="font-medium  hover:text-[#00BEFF] cursor-pointer  flex px-3 items-center"
                >
                  Register franchisee
                </Link>
              ) : (
                <a
                  href="https://dashboard.visitasmart.com"
                  className="font-medium  hover:text-[#00BEFF] cursor-pointer   flex px-3 items-center"
                >
                  Go to franchisee
                </a>
              )}

              <Menu>
                <MenuButton
                  className=" hover:text-[#00BEFF]"
                  rightIcon={<ChevronDownIcon />}
                >
                  <span className="font-medium  cursor-pointer text-md  hover:text-[#00BEFF]  px-3 rounded-3xl  flex items-center">
                    Support <ion-icon name="chevron-down-outline"></ion-icon>{" "}
                  </span>
                </MenuButton>
                <MenuList>
                  <MenuItem className="" onClick={() => navigate("/support")}>
                    <a className="font-medium text-black cursor-pointer text-md   px-3 rounded-3xl  flex items-center">
                      <span className="mr-2 flex items-center">
                        <ion-icon name="help-buoy-outline"></ion-icon>
                      </span>{" "}
                      Help center
                    </a>
                  </MenuItem>
                  <MenuItem
                    onClick={() => {
                      window.tidioChatApi.show();
                      window.tidioChatApi.open();
                    }}
                    className=""
                  >
                    <p className="font-medium text-black  cursor-pointer text-md     px-3 rounded-3xl  flex items-center">
                      <span className="mr-2 flex items-center">
                        <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                      </span>
                      Chat with us
                    </p>
                  </MenuItem>
                </MenuList>
              </Menu>
            </ul>
          </nav>

          {/* Client Currency On Header  */}

          {/*                   
<select onChange={(e)=> {localStorage.setItem("user_currency",e.target.value);window.location.reload()}} id="user_currency" className=" absolute lg:right-52 right-20 text-[#5241FE] font-medium border-2 w-[100px] cursor-pointer border-[#5241FE]  text-sm rounded-full block  pl-4 py-2 ">
  <option selected value={localStorage.getItem("user_currency") || "₹INR" }>{localStorage.getItem("user_currency") || "₹INR" }</option>
  {
  localStorage.getItem("user_currency") == "₹INR"?
  <option value="$USD">$USD</option>
  :
  <option value="₹INR">₹INR</option>
  }

</select> */}

          <a
            id="header_create_button"
            href="https://applox.visitasmart.com"
            class=" absolute right-10 py-2  px-8 text-md   lg:block hidden focus:outline-none rounded-xl  cursor-pointer   hover:shadow-md text-white  focus:z-10 focus:ring-4 bg-gradient-to-r hover:bg-gradient-to-l  from-[#02C7FF] to-[#01A1FE] :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover: :hover:bg-gray-700 font-bold"
          >
            See demo
          </a>
        </div>

        <div className="lg:hidden block mr-8">
          <div className="  w-full flex justify-end  items-center h-full">
            <span className="text-3xl sm:-mr-24 cursor-pointer">
              <ion-icon onClick={() => setOpen(true)} name="menu"></ion-icon>
            </span>
          </div>
        </div>
      </header>

      <div>
        {/* Header Drawer Open */}
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-[300]" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-hidden ">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                          <div className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              <img
                                src="https://i.postimg.cc/ZKnK7rC2/visitalogo.png"
                                className="h-7"
                              />
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="-m-2 p-2 text-gray-400 text-2xl hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only ">Close panel</span>
                                <ion-icon name="close-outline"></ion-icon>
                              </button>
                            </div>
                          </div>

                          <div className="mt-8">
                            <div className="flow-root">
                              <p
                                onClick={() => {
                                  navigate("/pricing", {
                                    state: {
                                      franchisee: false,
                                      franchisee_email: null,
                                    },
                                  });
                                  setOpen(false);
                                }}
                                className="font-bold cursor-pointer mt-2 border py-2 rounded-full"
                              >
                                <span className=" text-md flex items-center text-primary ml-4">
                                  <ion-icon name="card-outline"></ion-icon>{" "}
                                  <span className="ml-2 text-slate-600">
                                    Pricing
                                  </span>
                                </span>{" "}
                              </p>

                              <p
                                onClick={() => setOpen(false)}
                                href="#features"
                                className="font-bold cursor-pointer mt-2 border py-2 rounded-full"
                              >
                                <span className=" text-md flex items-center text-primary ml-4">
                                  <ion-icon name="scan-circle-outline"></ion-icon>{" "}
                                  <span className="ml-2 text-slate-600">
                                    Features
                                  </span>
                                </span>{" "}
                              </p>

                              <p
                                onClick={() => setOpen(false)}
                                href="#benefits"
                                className="font-bold cursor-pointer mt-2 border py-2 rounded-full"
                              >
                                <span className=" text-md flex items-center text-primary ml-4">
                                  <ion-icon name="bulb-outline"></ion-icon>{" "}
                                  <span className="ml-2 text-slate-600">
                                    Benefits
                                  </span>
                                </span>{" "}
                              </p>

                              <p
                                onClick={() => {
                                  var doc = prompt("Enter Company Name");

                                  if (doc != null) {
                                    navigate(
                                      "/manage/" + doc.replace(/[ ]/g, "")
                                    );
                                  }
                                  setOpen(false);
                                }}
                                className="font-bold cursor-pointer mt-2 border py-2 rounded-full"
                              >
                                <span className=" text-md flex items-center text-primary ml-4">
                                  {" "}
                                  <ion-icon name="create-outline"></ion-icon>{" "}
                                  <span className="ml-2 text-slate-600">
                                    Manage Website
                                  </span>
                                </span>{" "}
                              </p>

                              <p
                                onClick={() => {
                                  window.tidioChatApi.show();
                                  window.tidioChatApi.open();
                                }}
                                className=" font-bold cursor-pointer mt-2 border py-2 rounded-full"
                              >
                                <span className="text-md flex items-center text-primary ml-4">
                                  <ion-icon name="chatbubble-ellipses-outline"></ion-icon>
                                  <span className="ml-2 text-slate-600">
                                    Chat with us
                                  </span>
                                </span>{" "}
                              </p>

                              <p
                                onClick={() => {
                                  navigate("/support");
                                  setOpen(false);
                                }}
                                className=" font-bold cursor-pointer mt-2 border py-2 rounded-full"
                              >
                                <span className="text-md flex items-center text-primary ml-4">
                                  <ion-icon name="help-buoy-outline"></ion-icon>{" "}
                                  <span className="ml-2 text-slate-600">
                                    Help Center
                                  </span>
                                </span>{" "}
                              </p>

                              {/* <Link to='/franchisee/login' className=" font-bold cursor-pointer mt-2 border py-2 rounded-full pb-8" ><span className="text-md flex items-center text-primary ml-4" ><ion-icon name="log-in"></ion-icon> <span className="ml-2 text-slate-600" >Franchisee Login</span></span> </Link> */}

                              {!localStorage.getItem("franchisee_email") ? (
                                <p
                                  onClick={() => {
                                    navigate("/franchisee/register");
                                    setOpen(false);
                                  }}
                                  className="font-medium mt-2 pl-4 bg-[#5241FE] text-white rounded-full  py-2  cursor-pointer   flex items-center"
                                >
                                  <span className="flex items-center justify-center mr-1">
                                    <ion-icon name="log-in-outline"></ion-icon>
                                  </span>{" "}
                                  Register franchisee
                                </p>
                              ) : (
                                <a
                                  href="https://dashboard.visitasmart.com"
                                  className="font-medium mt-2 pl-4 bg-[#5241FE] text-white rounded-full  py-2  cursor-pointer   flex items-center"
                                >
                                  Go to franchisee
                                  <span className="flex items-center justify-center ml-1">
                                    <ion-icon name="arrow-forward"></ion-icon>
                                  </span>
                                </a>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
      </div>
    </div>
  );
}

export default Header;
