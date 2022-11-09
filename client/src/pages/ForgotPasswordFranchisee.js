import { Button, Link, Spinner, useToast } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiKeys from "../Api/apiKeys";
import Timer from "../miniComponents/Timer";
import { Toast } from "../miniComponents/Toast";
import emailjs from "@emailjs/browser";

function ForgotPasswordFranchisee() {

    let [otp,setOtp] = useState()
    let [otpSend,setOtpSend] = useState(false)
    let [otpSendError,setOtpSendError] = useState(false)
    let toast = useToast()

    useEffect(()=> {
        let otp = Math.floor(100000 + Math.random() * 900000)
        setOtp(otp)
    },[])

    useEffect(()=> {
        let send_otp_form = document.getElementById('otp_email_send_form')

        emailjs
                  .sendForm(
                    apiKeys.emailjs_serviceId,
                    apiKeys.emailjs_templateId,
                    send_otp_form,
                    apiKeys.emailjs_publicKey
                  )
                  .then(
                    (result) => {
            setOtpSend(true)
                        Toast({
                            postition : 'top',
                            status: 'success',
                            title: 'OTP Send Successfull',
                            toast
                          })
                    },
                    (error) => {
                     
                      setOtpSendError(true)
                    }
        );


    },[otp])

    let params = useParams()
    let franchisee_email = params.franchisee_email


    document.addEventListener("DOMContentLoaded", function (event) {
        function OTPInput() {
          const inputs = document.querySelectorAll("#otp > *[id]");
          for (let i = 0; i < inputs.length; i++) {
            inputs[i].addEventListener("keydown", function (event) {
              if (event.key === "Backspace") {
                inputs[i].value = "";
                if (i !== 0) inputs[i - 1].focus();
              } else {
                if (i === inputs.length - 1 && inputs[i].value !== "") {
                  return true;
                } else if (event.keyCode > 47 && event.keyCode < 58) {
                  inputs[i].value = event.key;
                  if (i !== inputs.length - 1) inputs[i + 1].focus();
                  event.preventDefault();
                } else if (event.keyCode > 64 && event.keyCode < 91) {
                  inputs[i].value = String.fromCharCode(event.keyCode);
                  if (i !== inputs.length - 1) inputs[i + 1].focus();
                  event.preventDefault();
                }
              }
            });
          }
        }
        OTPInput();
      });




  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, []);

 

  return (
    <div class="h-screen py-20 px-3">


{/* Email Form */}
<form id="otp_email_send_form" className="hidden">
    <input type="text" name="to_email" value={franchisee_email} />
    <input type="text" name="otp" value={otp} />
</form>



      <div class="container mx-auto">
        <div class="max-w-sm mx-auto md:max-w-lg "> 
          <div class="w-full ">
            <div class="bg-white relative shadow-md h-[450px] flex flex-col justify-center py-3 rounded-3xl text-center">


                <div className={`h-[75%] rounded-3xl absolute w-full bg-white ${otpSend ? 'hidden' : 'flex'}  pt-16 justify-center bottom-0`}>
                    { !otpSendError ? 
                        <div className="flex">
                    <Spinner color='purple.600' thickness='3px'
  speed='0.5s' />
                    <span className="font-visita-medium ml-3">
                    Sending OTP
                    </span>
                    </div>
                : 
                <div className="flex flex-col" >

                <span className="flex flex-col text-red-600 font-visita-medium ml-3">
                <span className="text-4xl flex items-center justify-center" ><ion-icon name="alert-circle"></ion-icon></span> <span className="mt-3"  >We're Troubling to Send OTP</span>
                </span>

                <button onClick={()=> window.location.reload()} className="border border-purple-600 transition-transform  font-visita-bold rounded-full px-6 py-2 text-purple-600 hover:scale-105 mt-24 text-md">
                    Try again
                </button>
                
                </div>
                }
                </div>
                


              <h1 class="text-4xl font-visita-bold">OTP Verification</h1>

              
              <div class="flex flex-col mt-4 font-visita-medium">
                <span>Enter the verification code you received at</span>
                <span class="font-visita-bold">{franchisee_email}</span>
              </div>

              <div
                id="otp"
                class="flex flex-row justify-center text-center px-2 mt-10"
              >
                <input
                  class="m-2 border-2 font-visita-bold focus-within:border-purple-600 h-14 w-14 text-center form-control rounded-2xl"
                  id="first"
                  maxlength="1"
                /> 
                <input
                  class="m-2 border-2 font-visita-bold focus-within:border-purple-600 h-14 w-14 text-center form-control rounded-2xl"
                  id="second"
                  maxlength="1"
                />
                <input
                  class="m-2 border-2 font-visita-bold focus-within:border-purple-600 h-14 w-14 text-center form-control rounded-2xl"
                  id="third"
                  maxlength="1"
                />
                <input
                  class="m-2 border-2 font-visita-bold focus-within:border-purple-600 h-14 w-14 text-center form-control rounded-2xl"
                  id="fourth"
                  maxlength="1"
                />
                <input
                  class="m-2 border-2 font-visita-bold focus-within:border-purple-600 h-14 w-14 text-center form-control rounded-2xl"
                  id="fifth"
                  maxlength="1"
                />
                <input
                  class="m-2 border-2 font-visita-bold focus-within:border-purple-600 h-14 w-14 text-center form-control rounded-2xl"
                  id="sixth"
                  maxlength="1"
                />
              </div>

              <div class="flex flex-col items-center text-center mt-5">
              <button className="bg-purple-600 transition-colors mb-4 mt-8 font-visita-bold rounded-full px-6 py-2 text-white hover:bg-purple-800 text-xl">
                    Verify Otp
                </button>

               {
                otpSend ?
                <div> <Timer initialSeconds={30} />

                <a id="forgot_franchisee_password_resend_otp_button" class="hidden font-visita-bold items-center text-purple-600 hover:text-purple-900 cursor-pointer">
                    <Button bg='white' _hover >Resend OTP</Button>
                
                 
                </a></div>
                : ''
               }
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordFranchisee;
