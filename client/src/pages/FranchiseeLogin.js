import axios from "axios";
import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { Button, ButtonGroup } from "@chakra-ui/react";
import apiKeys from "../Api/apiKeys";
import { Toast } from "../miniComponents/Toast";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import Spinner from "../miniComponents/Spinner";

function FranchiseeLogin() {
  let toast = useToast();
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, []);

  function onFranchiseeeLoginClick() {
    setLoading(true);
    axios({
      url: `${apiKeys.server_url}/franchisee/login`,
      method: "post",
      data: $("#franchisee_login_form").serialize(),
    }).then((response) => {
      if (response.data.status == true) {
        Toast({
          status: "success",
          title: "Login successfull",
          postition: "top",
          toast,
        });
        localStorage.setItem(
          "franchisee_email",
          document.getElementById("franchisee_login_form").email.value
        );
        window.location.href = "https://dashboard.visitasmart.com"
      } else {
        setLoading(false);
        Toast({
          status: "error",
          title: response.data.err,
          postition: "top",
          toast,
        });
      }
    });
  }

  return (
    <div className=" min-h-screen absolute top-0 min-w-full flex justify-center lg:bg-blue-50/50">
      <div className="flex min-h-full flex-col lg:bg-white lg:w-[500px]  items-center  justify-center lg:mt-16  px-4 sm:px-6 lg:px-8">
        <div className="h-12 py-12 w-full absolute lg:top-32 top-16 flex items-center justify-center">
          <img
            className="mx-auto h-10 w-auto"
            src="https://i.postimg.cc/xdZpZScW/visitalogo.png"
            alt="Your Company"
          />
        </div>

        <div className="w-full  max-w-md  rounded-3xl  px-8 py-24  z-50">
          <div>
            <h2 className="mt-6 text-center lg:text-4xl text-3xl font-bold tracking-tight text-gray-900">
              Franchisee Login
            </h2>
          </div>
          <form id="franchisee_login_form" className="mt-8 space-y-6">
            <div className="-space-y-px rounded-md ">
              <div>
                <label className="sr-only">Email</label>
                <input
                  name="email"
                  id="franchisee_email"
                  autoComplete="off"
                  required
                  type={"email"}
                  className="relative block transition-all franch-register-inputs font-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="sr-only">Password</label>
                <input
                  name="password"
                  autoComplete="off"
                  required
                  type={"password"}
                  id="franchisee_password"
                  className="relative mb-4 block transition-all franch-register-inputs font-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500  focus:outline-none focus:ring-indigo-500 sm:text-lg"
                  placeholder="Enter password"
                />
              </div>

              <div class="flex justify-between items-center">
                <Popover autoFocus={false} placement="auto" closeOnBlur={false}>
                  <PopoverTrigger>
                    <p class="cursor-pointer font-medium text-indigo-600 hover:text-indigo-700 focus:text-indigo-700 transition duration-200 ease-in-out">
                      Forgot password?
                    </p>
                  </PopoverTrigger>

                  <PopoverContent p={5}>
                    <PopoverCloseButton mt="3" mr="2" rounded="full" />

                    <h1 className="font-bold text-lg">
                      Enter Franchisee Email
                    </h1>

                    <input
                      id="franchisee_email_input"
                      className="py-2 border-b border-purple-600 font-medium mb-4 mt-2"
                      placeholder="Enter franchisee email"
                    />

                    <PopoverFooter>
                      <button
                        onClick={() =>
                          navigate(
                            "/franchisee/forgot-password/" +
                              document.getElementById("franchisee_email_input")
                                .value
                          )
                        }
                        type="button"
                        className="franchisee_password_forgot_button mt-4 bg-purple-600 text-white rounded-full py-1.5 px-6 font-bold"
                      >
                        Continue
                      </button>
                    </PopoverFooter>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            <div>
              <Button
                isLoading={loading}
                spinner={<Spinner />}
                _loading={{ opacity: "1" }}
                onClick={() => onFranchiseeeLoginClick()}
                className="font-bold"
                rounded="full"
                _hover={{ backgroundColor: "rgb(66 56 157 / 1)" }}
                backgroundColor="rgb(88 80 236 / 1)"
                style={{ padding: "25px 60px", width: "100%" }}
                colorScheme="indigo"
              >
                Login
              </Button>
            </div>
            <div className="w-full flex flex-col justify-center items-center">
              <p
                onClick={() => navigate("/register")}
                className="font-medium"
              >
                not yet a franchisee?{" "}
                <span className="ml-1 text-indigo-500 cursor-pointer hover:underline">
                  Register now
                </span>
              </p>
              <div className="flex mt-6 text-sm text-indigo-500">
                <Link
                  to="/terms"
                  className="underline cursor-pointer ml-1 mr-1 font-medium "
                >
                  {" "}
                  Terms of service
                </Link>{" "}
                -
                <Link
                  to="/privacy"
                  className="underline cursor-pointer ml-1 font-medium "
                >
                  {" "}
                  Privacy policy
                </Link>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FranchiseeLogin;
