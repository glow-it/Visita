import React, { useEffect, useState } from "react";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
} from "@chakra-ui/react";

function Header() {
  window.onscroll = () => {
    let header = document.querySelector("header");
    if (window.scrollY >= 1) {
      header.classList.remove("header-inactive");
      header.classList.add("header-active");
    } else {
      header.classList.remove("header-active");
      header.classList.add("header-inactive");
    }
  };

  let navigate = useNavigate();

  //   Header Drawer Open
  let [open, setOpen] = useState(false);

  return (
    <div>
      <header className={` w-full h-20 flex bg-white  fixed z-[200] `}>
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
              <p
                onClick={() => navigate("/visita")}
                className="font-medium  cursor-pointer text-md text-slate-500 hover:text-black  px-3 rounded-3xl transition-colors flex items-center"
              >
                See demo
              </p>
              <p
                onClick={() =>
                  navigate("/pricing", {
                    state: { franchisee: false, franchisee_email: null },
                  })
                }
                className=" font-medium  cursor-pointer text-md text-slate-500 hover:text-black  px-3 rounded-3xl transition-colors flex items-center"
              >
                Pricing
              </p>
              <a
                href="#features"
                className="font-medium  cursor-pointer text-md text-slate-500 hover:text-black  px-3 rounded-3xl transition-colors flex items-center"
              >
                Features
              </a>
              <a
                href="#benefits"
                className="font-medium  cursor-pointer text-md text-slate-500 hover:text-black  px-3 rounded-3xl transition-colors flex items-center"
              >
                Benefits
              </a>

              <p>
                <Popover autoFocus={false} placement="bottom">
                  <PopoverTrigger>
                    <h1 className="font-medium  cursor-pointer text-md text-slate-500 hover:text-black  transition-colors flex items-center">
                      <span className="text-slate-500 px-3  rounded-full transition-all hover:text-black">
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
                          className="border focus:border focus:border-[#5241FE] py-2 w-full pl-4 rounded-full font-medium"
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
                            className="px-6 py-1 bg-[#5241FE] rounded-full text-xl font-bold text-white"
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
                  className="font-medium text-slate-500 hover:text-black cursor-pointer transition-colors flex px-3 items-center"
                >
                  Register franchisee
                </Link>
              ) : (
                <Link
                  to="/franchisee"
                  className="font-medium text-slate-500 hover:text-black cursor-pointer  transition-colors flex px-3 items-center"
                >
                  Go to franchisee
                </Link>
              )}

              <Menu>
                <MenuButton
                  className="text-slate-500 hover:text-black"
                  rightIcon={<ChevronDownIcon />}
                >
                  <span className="font-medium  cursor-pointer text-md text-slate-500 hover:text-black  px-3 rounded-3xl transition-colors flex items-center">
                    Support <ion-icon name="chevron-down-outline"></ion-icon>{" "}
                  </span>
                </MenuButton>
                <MenuList>
                  <MenuItem className="" onClick={() => navigate("/support")}>
                    <a className="font-medium  cursor-pointer text-md text-slate-500  px-3 rounded-3xl transition-colors flex items-center">
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
                    <p className="font-medium  cursor-pointer text-md text-slate-500    px-3 rounded-3xl transition-colors flex items-center">
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

          <p
            id="header_create_button"
            onClick={() =>
              navigate("/pricing", {
                state: { franchisee: false, franchisee_email: null },
              })
            }
            class=" absolute right-10 py-1.5 px-8 text-md  text-[#5241FE] lg:block hidden focus:outline-none bg-white rounded-full border-2 border-[#5241FE] cursor-pointer   hover:shadow-md  focus:z-10 focus:ring-4 focus:ring-[#5241FE] :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:text-white :hover:bg-gray-700 font-medium"
          >
            Create now
          </p>
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
                                onClick={() => navigate("/visita")}
                                className="font-bold cursor-pointer mt-4 border py-2 rounded-full"
                              >
                                <span className=" text-md flex items-center text-primary ml-4">
                                  <ion-icon name="albums-outline"></ion-icon>{" "}
                                  <span className="ml-2 text-slate-600">
                                    See Demo
                                  </span>
                                </span>{" "}
                              </p>

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
                                  className="font-medium mt-2 pl-4 bg-[#5241FE] rounded-full  py-2  cursor-pointer text-white transition-colors flex items-center"
                                >
                                  <span className="flex items-center justify-center mr-1">
                                    <ion-icon name="log-in-outline"></ion-icon>
                                  </span>{" "}
                                  Register franchisee
                                </p>
                              ) : (
                                <p
                                  onClick={() => {
                                    navigate("/franchisee");
                                    setOpen(false);
                                  }}
                                  className="font-medium mt-2 pl-4 bg-[#5241FE] rounded-full  py-2  cursor-pointer text-white transition-colors flex items-center"
                                >
                                  Go to franchisee
                                  <span className="flex items-center justify-center ml-1">
                                    <ion-icon name="arrow-forward"></ion-icon>
                                  </span>
                                </p>
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
