import { Button, useDisclosure, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import emailjs from "@emailjs/browser";
import apiKeys from "../../Api/apiKeys";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from "@chakra-ui/react";
import { Toast } from "../../miniComponents/Toast";
import Loading from "../../miniComponents/Loading";
import { abbrevateNumber } from "../../Tools/abbrevateNumber";

function ManageCard() {
  let params = useParams();

  

   // Get Sub Domain
   let full = window.location.host;
   //window.location.host is subdomain.domain.com
   let parts = full.split(".");
   let subdomain = parts[0];

  let company_name = params.comp_name || subdomain;
  let clean_company_name =
  company_name && company_name.replace(/[-]/g, " ");
  let navigate = useNavigate();
  let toast = useToast();
  let [cardDatas, setCardDatas] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  let [franchiseeDatas, setFranchiseeDatas] = useState([]);
  let [feedbacks, setFeedbacks] = useState([]);


  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = React.useRef();

  if(subdomain == "www"){
    if(cardDatas && cardDatas.isPremium == "true"){
      window.location.href = "https://" + company_name + ".visitasmart.com/manage"
    }
  }

  

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
    axios.get(`${apiKeys.server_url}/card/` + company_name).then((response) => {
      if (response.data != null) {
        setCardDatas(response.data);
        setIsLoading(false)
        setFeedbacks(response.data.feedbacks);
        if (response.data.franchisee != "no franchisee") {
          axios
            .get(
              `${apiKeys.server_url}/get-franchisee-datas/` +
                response.data.franchisee
            )
            .then((res) => {
              if (res.status) {
                setFranchiseeDatas(res.data.franchisee_data);
              }
            });
        }
      } else {
        Toast({
          status: "error",
          title: "Company not found",
          description: "Recheck!!!",
          postition: "top-right",
          toast,
        });
        navigate("/");
      }
    });
  }, []);

  function handleClickManage(password) {
    if (cardDatas.activated) {
      if (cardDatas.activated.access_password == password) {
        document.getElementById("manage_auth_wrapper").style.display = "none";
        localStorage.setItem("isAdmin", true);
      } else {
        Toast({
          status: "error",
          title: "Invalid password",
          description: "Please enter valid password",
          postition: "top",
          toast,
        });
      }
    } else {
      navigate("/create/preview/" + company_name);
    }
  }

  // Handle Close Card Click
  function HandleCloseCard() {
    axios({
      method: "post",
      url: `${apiKeys.server_url}/manage/close-card`,
      data: {
        sub_id:
          cardDatas.activated && cardDatas.activated.razorpay.subscription_id,
        company_name,
      },
    }).then((response) => {
      if (response.status) {
        Toast({
          status: "success",
          title: "Website was closed",
          postition: "top",
          toast,
        });
        navigate("/card-closed");
      } else {
        Toast({
          status: "error",
          title: "Website closing failed",
          description: "Try again!",
          postition: "top",
          toast,
        });
      }
    });
    navigate("/loading/closing-website");
  }

  let send_pass_form_2 = document.getElementById("send_pass_form_2");

  function HandleForgotPasswordClick(e) {
    e.target.innerText = "Processing...";

    emailjs
      .sendForm(
        apiKeys.emailjs_serviceId,
        apiKeys.emailjs_templateId2,
        send_pass_form_2,
        apiKeys.emailjs_publicKey
      )
      .then(
        (result) => {
          Toast({
            status: "success",
            title: `Website password has been send to ${
              cardDatas && cardDatas.email_id
            }`,
            postition: "top",
            toast,
          });
          e.target.innerText = "Forgot password?";
        },
        (error) => {
          console.log(error);
          Toast({
            status: "error",
            title: "Website password send failed",
            description: "Try again!",
            postition: "top",
            toast,
          });
          e.target.innerText = "Forgot password?";
        }
      );
  }

  return (
    <div className="flex justify-center">

    <Loading isLoading={isLoading} />
      
      <div className="flex flex-col  items-center w-[500px]">
        <AlertDialog
          isOpen={isOpen}
          leastDestructiveRef={cancelRef}
          onClose={onClose}
        >
          <AlertDialogOverlay
            bg="whiteAlpha.1000"
            backdropFilter="auto"
            backdropBlur="3px"
          >
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg" fontWeight="bold">
                <span className="font-bold">Close Website</span>
              </AlertDialogHeader>

              <AlertDialogBody>
                <span className="font-medium">
                  Are you sure? You can't undo this action afterwards.
                </span>
              </AlertDialogBody>

              <AlertDialogFooter>
                <Button rounded="full" ref={cancelRef} onClick={onClose}>
                  <span className="font-bold">Cancel</span>
                </Button>
                <Button
                  rounded="full"
                  colorScheme="red"
                  onClick={() => HandleCloseCard()}
                  ml={3}
                >
                  <span className="font-bold">Yes' Close Website</span>
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>

        {/* Send Card Password Form */}
        <form id="send_pass_form_2" className="hidden">
          <input
            type="text"
            name="to_mail"
            value={cardDatas && cardDatas.email_id}
          />
          <input
            type="text"
            name="company_name"
            value={cardDatas && cardDatas.company_name}
          />
          <input
            type="text"
            name="card_pass"
            value={cardDatas.activated && cardDatas.activated.access_password}
          />
        </form>

        {localStorage.getItem("isAdmin") != "true" ? (
          <div
            id="manage_auth_wrapper"
            className="h-screen  w-full absolute font-medium bg-slate-50 100] flex pt-36 justify-center"
          >
            <div class="block p-6 rounded-xl  bg-slate-50 h-[300px] w-[1000px] px-8 lg:shadow-lg  max-w-sm">
              <div>
                <div class="form-group mb-6">
                  <label
                    for="card_pass_input"
                    class="form-label text-3xl font-bold inline-block mb-6 text-gray-700"
                  >
                    Website password
                  </label>
                  <input
                    class="form-control block
            w-full
            px-3
            pl-6
            py-1.5
            text-xl
            font-normal
            text-gray-700
            bg-slate-50 bg-clip-padding
            border border-solid border-gray-300
            rounded-xl
            transition
            ease-in-out
            lowercase
            m-0
            focus:text-gray-700 focus:bg-slate-50 focus:border-blue-600 focus:outline-none"
                    id="card_pass_input"
                    autoComplete="off"
                  />
                </div>
                <div class="flex justify-between items-center mb-6">
                  <p
                    onClick={(e) => HandleForgotPasswordClick(e)}
                    class="text-blue-600 cursor-pointer hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out"
                  >
                    Forgot password?
                  </p>
                </div>
                <button
                  class="
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xl
          leading-tight
          rounded-xl
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
                  onClick={() =>
                    handleClickManage(
                      document.getElementById("card_pass_input").value
                    )
                  }
                >
                  Manage
                </button>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* <h1 className="text-md sticky top-0 z-50 flex items-center font-semibold w-full py-3 text-white  justify-center bg-black">
        Upgrade to premium <span className="flex items-center justify-center ml-1"><ion-icon name="arrow-forward-outline"></ion-icon></span>
      </h1> */}

        <h1 className="text-3xl font-bold sticky top-0 z-50   w-full py-6 flex text-slate-900 justify-center bg-slate-50 capitalize">
          {cardDatas && cardDatas.company_name}
        </h1>

        <div className=" w-full flex  flex-col items-center justify-center ">
          <button
            onClick={onOpen}
            className="w-full py-3      hover:text-white transition-colors  text-white  bg-red-500 font-bold"
          >
            Close website
          </button>

          <button
            onClick={() => navigate("/manage/" + company_name + "/edit")}
            className="w-full py-3  mt-1 bg-blue-600 border-2 border-blue-600 text-white    font-bold"
          >
            Edit website
          </button>

          {cardDatas && cardDatas.show_customer_details_popop == "true" ? (
            <button
              onClick={() =>
                navigate("/manage/" + company_name + "/customer-details")
              }
              className="w-full py-3  mt-1 bg-blue-600 border-2 border-blue-600 text-white   font-bold"
            >
              Customer details
            </button>
          ) : (
            ""
          )}

          <button
            onClick={() => window.open("/create/successfull/" + company_name)}
            className="w-full py-3  mt-1 bg-blue-600 border-2 border-blue-600 text-white    font-bold"
          >
            Other details
          </button>
        </div>

        <div className="w-full   flex flex-wrap items-center justify-center ">
          <div className="h-44 w-full bg-slate-50   border-b flex flex-col items-center justify-center">
            <h6 className="text-xl font-medium">Total views</h6>
            <h1 className="text-5xl font-bold mt-4 text-blue-600">
              {
                abbrevateNumber(parseInt(cardDatas && cardDatas.views))
              }
            </h1>
          </div>

          <div className="h-44 w-full bg-slate-50     flex flex-col items-center justify-center">
            <h6 className="text-xl font-medium">Total feedbaks</h6>
            <h1 className="text-5xl font-bold mt-4 text-blue-600">
              {cardDatas.feedbacks && cardDatas.feedbacks.length}
            </h1>
          </div>
        </div>

        {franchiseeDatas.length != 0 ? (
          <div className=" w-full   flex flex-col items-center justify-center ">
            <div className="h-20 w-full bg-slate-50   border-t  flex  items-center justify-center">
              <h6 className="text-lg font-medium">Created by</h6>
              <h1 className="text-lg font-bold ml-2  text-blue-600">
                {franchiseeDatas && franchiseeDatas.franchisee_name}
              </h1>
            </div>

            <div className="h-20 w-full bg-slate-50    border-t flex  items-center justify-center">
              <h6 className="text-lg font-medium">
                Contact creator
              </h6>
              <h1 className="text-lg font-bold ml-2  text-blue-600">
                +91 {franchiseeDatas && franchiseeDatas.phone_no}
              </h1>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* Testimornial */}
        <section class=" bg-gray-900 w-full">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm">
              <h2 class="mb-4 text-3xl tracking-tight font-extrabold  text-white">
                Feedbacks
              </h2>
              <p class="mb-8 font-light  lg:mb-16 sm:text-xl text-gray-400">
                Loves from clients
              </p>
            </div>
            <div class="grid mb-8 lg:mb-12 lg:grid-cols-2 ">
              {cardDatas &&
                feedbacks.map((data) => {
                  var date1, date2;
                  //define two date object variables with dates inside it
                  date1 = data.date;
                  date2 = new Date();

                  //calculate time difference
                  var time_difference = date2.getTime() - parseInt(date1);

                  //calculate days difference by dividing total milliseconds in a day
                  var days_difference = time_difference / (1000 * 60 * 60 * 24);
                  let days;

                  if (Math.trunc(days_difference) == 0) {
                    days = "today";
                  } else if (Math.trunc(days_difference) == 1) {
                    days = "1 day ago";
                  } else {
                    days = Math.trunc(days_difference) + " days ago";
                  }

                  return (
                    <figure class="flex flex-col justify-center items-center p-8 text-center  border-b  md:p-12 lg:border-r bg-gray-800 border-gray-700">
                      <blockquote class="mx-auto mb-8 max-w-2xl  text-gray-400">
                        <h3 class="text-lg font-semibold  text-white">
                          {data.feedback}
                        </h3>
                      </blockquote>
                      <figcaption class="flex justify-center items-center space-x-3">
                        <div class="space-y-0.5 font-medium flex flex-col items-center text-white text-left">
                          <div>{data.name}</div>
                          <div class="text-sm font-light  text-gray-400">
                            {days}
                          </div>
                        </div>
                      </figcaption>
                    </figure>
                  );
                })}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ManageCard;
