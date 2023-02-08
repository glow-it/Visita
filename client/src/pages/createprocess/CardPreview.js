import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import CreateHeader from "../../components/CreateHeader";
import emailjs from "@emailjs/browser";
import apiKeys from "../../Api/apiKeys";
import { Toast } from "../../miniComponents/Toast";
import { Alert, AlertIcon } from "@chakra-ui/react";
import Spinner from "../../miniComponents/Spinner";

function CardPreview() {
  let [franchiseeData, setFranchiseeData] = useState([]);
  let params = useParams();
  let name = params.name;
  let toast = useToast();
  let [cardDatas, setCardDatas] = useState([]);
  let navigate = useNavigate();
  let send_pass_form = document.getElementById("send_pass_form");
  let [isProcessingPayment, setIsProcessingPayment] = useState(false);
  let [noPayment,setnoPayment] = useState(true)



  useEffect(() => {
    document.title = "Preview - Visita";

    axios.get(`${apiKeys.server_url}/card/` + name).then((response) => {
      setCardDatas(response.data);

      if (response.data.franchisee != "no franchisee") {
        axios
          .get(
            `${apiKeys.server_url}/get-franchisee-datas` +
              response.data.franchisee
          )
          .then((res) => {
            if (res.status) {
              setFranchiseeData(res.data.franchisee_data);
            } else {
              Toast({
                status: "error",
                title: res.data.err,
                postition: "top",
                toast,
              });
            }
          });
      } else {
        setFranchiseeData(null);
      }
    });
  }, []);

  // Handle Complete Purchase Click
  const handleCompletePurchase = async () => {
    if (noPayment == true) {
      axios({
        method: "post",
        url: `${apiKeys.server_url}/payment-successfull/` + name,
        data: {
          company_name: name,
          razorpay: null,
          franchisee: cardDatas.franchisee ? cardDatas.franchisee : false,
          access_password: `${name.substring(0, 2)}${Math.floor(
            Math.random() * 99
          )}`,
          activated_at: new Date().getTime(),
          phone_no: cardDatas.phone_no,
          franchisee_email: cardDatas.franchisee,
        },
      }).then((response) => {
        if (response.data.status) {
          let card_pass = send_pass_form.childNodes[2];
          card_pass.value = response.data.req_datas.access_password;
          navigate("/create/successfull/" + name);

          // emailjs
          //   .sendForm(
          //     apiKeys.emailjs_serviceId,
          //     apiKeys.emailjs_templateId2,
          //     send_pass_form,
          //     apiKeys.emailjs_publicKey
          //   )
          //   .then(
          //     (result) => {
          //       navigate("/create/successfull/" + name);
          //     },
          //     (error) => {
          //       Toast({
          //         status: "error",
          //         title: "Unable to send website password to your mail",
          //         postition: "top",
          //         description: "Contact Visita",
          //         toast,
          //       });
          //       navigate("/create/successfull/" + name);
          //       console.log(error);
          //     }
          //   );
        } else {
          navigate("/create/successfull/" + name);
        }
      });


      navigate('/loading/processing-website')


    } else {
      axios({
        method: "post",
        url: `${apiKeys.server_url}/complete-purchase`,
        data: { isPremium: cardDatas.isPremium },
      })
        .then((response) => {
          openPayment(response.data.sub_data);
        })
        .catch((err) => {
          Toast({
            status: "error",
            title: err.message,
            postition: "top",
            toast,
          });
        });
    }
  };

  // Open Payment Checkout When Create Subscription Is Successfull
  const openPayment = (res) => {
    var options = {
      key: apiKeys.razorpay_key,
      subscription_id: res.id,
      name: "Visita - Website Builder",
      description: "Payment For Create Business Website",
      image:
        "https://res.cloudinary.com/dmi3cfl2v/image/upload/v1668306156/Visiting%20Card%20Images/cpy6rm8xssyluwpsbufd.jpg",
      prefill: {
        name: cardDatas.first_name,
        email: cardDatas.email_id,
        contact: "+91" + cardDatas.phone_no,
      },
      handler: function (response) {
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
            axios({
              method: "post",
              url: `${apiKeys.server_url}/payment-successfull/` + name,
              data: {
                company_name: name,
                razorpay: res_obj,
                franchisee: cardDatas.franchisee ? cardDatas.franchisee : false,
                access_password: `${name.substring(0, 2)}${Math.floor(
                  Math.random() * 99
                )}`,
                activated_at: new Date().getTime(),
                phone_no: cardDatas.phone_no,
                franchisee_email: cardDatas.franchisee,
                isPremium: cardDatas.isPremium,
              },
            }).then((response) => {
              if (response.data.status) {
                let card_pass = send_pass_form.childNodes[2];
                card_pass.value = response.data.req_datas.access_password;

                emailjs
                  .sendForm(
                    apiKeys.emailjs_serviceId,
                    apiKeys.emailjs_templateId2,
                    send_pass_form,
                    apiKeys.emailjs_publicKey
                  )
                  .then(
                    (result) => {
                      navigate("/create/successfull/" + name);
                    },
                    (error) => {
                      Toast({
                        status: "error",
                        title: "Unable to send website password to your mail",
                        postition: "top",
                        description: "Contact Visita",
                        toast,
                      });
                      navigate("/create/successfull/" + name);
                    }
                  );
              } else {
                Toast({
                  status: "error",
                  title: "An error occured",
                  postition: "top",
                  description: "Try again!",
                  toast,
                });
              }
            });

            Toast({
              status: "success",
              title: "Payment was successfull",
              postition: "top",
              toast,
            });
            navigate("/loading/processing-website");
          } else {
            Toast({
              status: "error",
              title: "Payment was failed",
              postition: "top",
              description: "Try again!",
              toast,
            });
          }
        });
      },
    };
    setIsProcessingPayment(false);
    const rzp1 = new window.Razorpay(options); //instead of new Razorpay(options)
    rzp1.open();
  };

  // When Cancel Purchase Button Click
  function cancelPurchase() {
    axios
      .post(`${apiKeys.server_url}/create/cancel-purchase/` + name)
      .then((res) => {
        if (res.data.status) {
          Toast({
            status: "success",
            title: "Website is cancelled",
            postition: "top",
            toast,
          });
          navigate("/");
        } else {
          Toast({
            status: "error",
            title: "Ohh snap!!",
            postition: "top",
            description: "We are struggling to cancel website",
            toast,
          });
        }
      });
    navigate("/loading/cancelling");
  }

  return (
    <div className="h-screen w-full ">
      {/* Send Card Password Form */}
      <form id="send_pass_form" className="hidden">
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
          value={`${name.substring(0, 2)}${Math.floor(Math.random() * 99)}`}
        />
      </form>

      <CreateHeader
        hideIndicators={true}
        live_preview_url={`https://visitasmart.com/${name}`}
      />

      <div className=" h-full w-full  flex lg:flex-row flex-col lg:items-start lg:pt-40 pt-28  items-center justify-center z-50">
        <div
          className={`  z-40 lg:mt-0 lg:border   px-16 lg:w-[60%] w-full lg:pb-24 pb-32 flex flex-col  items-center justify-center lg:rounded-3xl `}
        >
          <img
            className="h-[200px] lg:flex hidden lg:w-auto w-[300px] -mt-24 lg:min-w-0"
            src={require("../../Images/tickanimation.gif")}
          />

          <h1 className="lg:text-3xl text-2xl font-bold lg:text-start  text-center mb-3">
            {cardDatas && cardDatas.activated
              ? "Successfully your website is "
              : "Successfully your website was "}

            <span>
              {cardDatas && cardDatas.activated ? "activated!" : "created"}
            </span>
          </h1>

          <h1
            className={`lg:text-xl text-sm lg:block hidden font-medium ${
              cardDatas && cardDatas.activated
                ? "text-green-600"
                : "text-indigo-600"
            } lg:mt-4 mt-8 text-center px-6 py-1 ${
              cardDatas && cardDatas.activated ? "bg-green-50" : "bg-indigo-50"
            } rounded-full`}
          >
            {cardDatas && cardDatas.activated
              ? "Payment was successfull"
              : "Complete purchase to activate your website"}
          </h1>

          {cardDatas && cardDatas.activated ? "" : ""}

          <div className="w-full flex lg:justify-center mt-8 flex-col-reverse items-center lg:flex-row">
            {cardDatas && cardDatas.activated ? (
              ""
            ) : (
              <button
                onClick={() => cancelPurchase()}
                className="text-lg font-semibold hover:shadow-sm transition-shadow px-12 py-3 border-black-600 border lg:mr-3 lg:mt-0 mt-3 text-black-600 rounded-full"
              >
                Cancel
              </button>
            )}

            {cardDatas && cardDatas.activated ? (
              <button
                onClick={() => navigate("/create/successfull/" + name)}
                id="complete-purchase-button"
                className=" text-lg font-medium hover:shadow-sm transition-shadow px-12 py-3 bg-indigo-600 text-white rounded-full shadow-md shadow-indigo-600"
              >
                Open preview
              </button>
            ) : (
              <Button
                className="font-semibold"
                fontSize="md"
                isLoading={isProcessingPayment}
                rounded="full"
                py="6"
                px="12"
                color="#fff"
                _hover
                bgColor="#4F45E4"
                disabled={false}
                spinner={<Spinner />}
                _loading={{ opacity: "1" }}
                onClick={() => {
                  setIsProcessingPayment(true);
                  handleCompletePurchase();
                }}
              >
                Complete purchase
              </Button>
            )}
          </div>

          {franchiseeData != null ? (
            <p className="font-medium text-center mt-10">
              Please provide payment details of customer. Dont <br /> provide
              your payment details
            </p>
          ) : (
            ""
          )}
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
      </div>
    </div>
  );
}

export default CardPreview;
