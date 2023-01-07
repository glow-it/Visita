import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Tooltip } from "@chakra-ui/react";
import apiKeys from "../Api/apiKeys";
import { Toast } from "../miniComponents/Toast";

function FranchiseeRegister() {
  let navigate = useNavigate();
  let [loading, setLoading] = useState(false);
  let [loadingText, setLoadingText] = useState("Processing payment");
  let [is_register_button_disabled, set_is_register_button_disabled] =
    useState(true);

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, []);

  let toast = useToast();

  // When Click On Franchisee Register Button
  function franchiseeRegisterClick(button) {
    setLoading(true);
    axios
      .post(`${apiKeys.server_url}/create-franchisee-payment`)
      .then((response) => {
        if (response.data.status) {
          setLoading(false);

          var options = {
            key: apiKeys.razorpay_key, // Enter the Key ID generated from the Dashboard
            amount: 99900, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            name: "Visita | Digital Visiting Card",
            description: "Payment For Register Franchisee",
            image: "https://i.postimg.cc/ZKnK7rC2/visitalogo.png",
            order_id: response.data.payment_data.id,
            handler: function (response) {
              setLoadingText("Registering franchisee");
              setLoading(true);
              let res_obj = {
                payment_id: response.razorpay_payment_id,
                subscription_id: response.razorpay_subscription_id,
                signature: response.razorpay_signature,
              };
              axios({
                method: "post",
                url: `${apiKeys.server_url}/verify-payment`,
                data: res_obj,
              }).then((response) => {
                if (response) {
                  Toast({
                    status: "success", 
                    title: "Successfully registered",
                    description: "Lets start!", 
                    postition: "top",
                    toast,
                  });

                  navigate("/loading/registering-franchisee");

                  
                  const myFormData = new FormData(document.getElementById('franchisee_register_form'));

              const formDataObj = {};
              myFormData.forEach((value, key) => (formDataObj[key] = value));

              axios
                .post(`${apiKeys.server_url}/franchisee/register`, formDataObj)
                .then((response) => {
                  if (response.status == 200) {
                    localStorage.setItem("franchisee_email",formDataObj.email)
                    navigate(response.data.redirect_url);
                  } else {
                    Toast({
                      status: "error",
                      title: "We are troubling to create franchisee",
                      postition: "top",
                      description: "Contact visita team",
                      toast,
                    });
                  }
                });


                } else {
                  setLoading(false);
                  Toast({
                    status: "error",
                    title: "We have troubling to register franchisee!",
                    postition: "top",
                    toast,
                  });
                }
              });
            },
            prefill: {
              name: document.getElementById("franchisee_name").value,
              email: document.getElementById("franchisee_email").value,
              contact:
                "+91" + document.getElementById("franchisee_phone_no").value,
            },
          };

          var rzp1 = new window.Razorpay(options);

          rzp1.open();
        } else {
          Toast({
            status: "error",
            title: "We have troubling to register franchisee!",
            postition: "top",
            toast,
          });
        }
      });
  }

  // Password Strength Checker

  // timeout before a callback is called

  let timeout;

  // traversing the DOM and getting the input and span using their IDs

  let password = document.getElementById("franchisee_password");

  // The strong and weak password Regex pattern checker

  let strongPassword = new RegExp(
    "(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})"
  );
  let mediumPassword = new RegExp(
    "((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))"
  );

  function StrengthChecker(PasswordParameter) {
    let strengthBadge = document.querySelector("#pass_strength_display");
    let whatis_strong_pass = document.querySelector("#whatis_strong_pass");
    // We then change the badge's color and text based on the password strength

    if (strongPassword.test(PasswordParameter)) {
      strengthBadge.classList.remove("text-red-800");
      strengthBadge.classList.remove("bg-red-100");
      strengthBadge.classList.remove("text-blue-800");
      strengthBadge.classList.remove("bg-blue-100");
      strengthBadge.classList.add("text-green-800");
      strengthBadge.classList.add("bg-green-100");
      strengthBadge.innerText = "Password Is Strong";
      whatis_strong_pass.classList.replace("block", "hidden");
      set_is_register_button_disabled(false);
    } else if (mediumPassword.test(PasswordParameter)) {
      strengthBadge.classList.remove("text-red-800");
      strengthBadge.classList.remove("bg-red-100");
      strengthBadge.classList.add("text-blue-800");
      strengthBadge.classList.add("bg-blue-100");
      strengthBadge.classList.remove("text-green-800");
      strengthBadge.classList.remove("bg-green-100");
      strengthBadge.innerText = "Password Is Medium";
      whatis_strong_pass.classList.replace("block", "hidden");
      set_is_register_button_disabled(false);
    } else {
      strengthBadge.classList.add("text-red-800");
      strengthBadge.classList.add("bg-red-100");
      strengthBadge.classList.remove("text-blue-800");
      strengthBadge.classList.remove("bg-blue-100");
      strengthBadge.classList.remove("text-green-800");
      strengthBadge.classList.remove("bg-green-100");
      strengthBadge.innerText = "Password Is Weak";
      whatis_strong_pass.classList.replace("hidden", "block");
      set_is_register_button_disabled(true);
    }
  }

  // Adding an input event listener when a user types to the  password input

  function typingPassword(e) {
    if (e.target.value.length >= 5) {
      let strengthBadge = document.querySelector("#pass_strength_display");
      StrengthChecker(e.target.value);

      //The badge is hidden by default, so we show it

      strengthBadge.classList.replace("hidden", "flex");
      clearTimeout(timeout);

      //We then call the StrengChecker function as a callback then pass the typed password to it
    } else {
      let strengthBadge = document.querySelector("#pass_strength_display");
      let whatis_strong_pass = document.querySelector("#whatis_strong_pass");
      strengthBadge.classList.replace("flex", "hidden");
      whatis_strong_pass.classList.replace("block", "hidden");
      set_is_register_button_disabled(true);
    }
  }

  return (
    <div className=" min-h-screen absolute top-0 min-w-full">
      <div className="h-12 py-12 w-full absolute top-0 flex items-center justify-center">
        <img
          className="mx-auto h-10 w-auto"
          src="https://i.postimg.cc/xdZpZScW/visitalogo.png"
          alt="Your Company"
        />
      </div>

      <div className="flex min-h-full  items-center  justify-center lg:mt-12 mt-16 px-4 sm:px-6 lg:px-8">
        <div className="   rounded-3xl  px-8 py-16 w-full max-w-md space-y-8 z-50">
          <div>
            <h2 className="mt-6 text-center lg:text-4xl text-3xl font-visita-bold tracking-tight text-gray-900">
              Franchisee Register
            </h2>
          </div>
          <form
            id="franchisee_register_form"
            className="mt-8 space-y-6"
          >
            <div className="-space-y-px relative rounded-md shadow-sm">
              {/* Password Strength Display */}
              <div className=" w-full -mt-4 flex items-center justify-center">
                <span
                  id="pass_strength_display"
                  class="bg-red-100 hidden text-red-800 font-visita-medium text-sm rounded-full font-medium px-4 py-1  "
                >
                  Weak
                </span>

                <Tooltip
                  px="4"
                  bg="black"
                  py="4"
                  color="white"
                  rounded="xl"
                  label="strong password need at least one lowercase letter, one uppercase letter, one digit, one special character, and is at least 8 characters."
                  placement="right-start"
                >
                  <span
                    id="whatis_strong_pass"
                    className="hidden cursor-pointer ml-1 flex items-center justify-center"
                  >
                    {" "}
                    <ion-icon name="help-circle"></ion-icon>
                  </span>
                </Tooltip>
              </div>
              {/* Password Strength Display */}

              <div>
                <label className="sr-only">Franchisee Name</label>
                <input
                  name="franchisee_name"
                  autoComplete="off"
                  required
                  type={"text"}
                  id="franchisee_name"
                  className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                  placeholder="Enter franchisee name"
                />
              </div>
              <div>
                <label className="sr-only">Phone Number</label>
                <input
                  name="phone_no"
                  id="franchisee_phone_no"
                  autoComplete="off"
                  required
                  type={"tel"}
                  className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                  placeholder="Enter phone no"
                />
              </div>

              <div className="flex relative items-center">
                <label className="sr-only">UPI ID</label>
                <input
                  name="upi_id"
                  id="franchisee_upi_id"
                  autoComplete="off"
                  required
                  type={"text"}
                  className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                  placeholder="Enter Upi Id"
                />

                <Tooltip
                  px="4"
                  bg="black"
                  py="4"
                  color="white"
                  rounded="xl"
                  label="this used for pay your
salary"
                  placement="right"
                >
                  <span className="absolute right-4 mt-3 cursor-pointer flex items-center justify-center">
                    {" "}
                    <ion-icon title="s" name="help-circle"></ion-icon>
                  </span>
                </Tooltip>
              </div>

              <div>
                <label className="sr-only">Email</label>
                <input
                  name="email"
                  id="franchisee_email"
                  autoComplete="off"
                  required
                  type={"email"}
                  className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label className="sr-only">Password</label>
                <input
                  name="password"
                  onChange={(e) => typingPassword(e)}
                  autoComplete="off"
                  required
                  type={"password"}
                  id="franchisee_password"
                  className=" relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
                  placeholder="Enter password"
                />
              </div>

              <input
                name="isFranchiseeFirstCardCreated"
                autoComplete="off"
                value={false}
                className="hidden relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
              />
            </div>

            <div>
              <Button
                onClick={(e) => {
                  franchiseeRegisterClick(e);
                }}
                disabled={is_register_button_disabled}
                isLoading={loading}
                loadingText={loadingText}
                className="font-visita-medium"
                rounded="full"
                _hover={{ backgroundColor: "rgb(66 56 157 / 1)" }}
                backgroundColor="rgb(88 80 236 / 1)"
                style={{ padding: "25px 60px", width: "100%" }}
                colorScheme="blue"
              >
                Pay ₹999
              </Button>
            </div>
            <div className="w-full flex justify-center items-center">
              <p
                onClick={() => navigate("/franchisee/login")}
                className="font-visita-medium"
              >
                already have a franchisee?{" "}
                <span className="ml-1 text-indigo-500 cursor-pointer hover:underline">
                  Login now
                </span>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FranchiseeRegister;
