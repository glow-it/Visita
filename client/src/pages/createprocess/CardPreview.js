import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CreateHeader from "../../components/CreateHeader";
import emailjs from "@emailjs/browser";
import apiKeys from "../../Api/apiKeys";
import { Toast } from "../../miniComponents/Toast";

function CardPreview() {
  let [franchiseeData, setFranchiseeData] = useState([]);
  let params = useParams();
  let name = params.name;
  let toast = useToast();
  let [cardDatas, setCardDatas] = useState([]);
  let navigate = useNavigate();
  let send_pass_form = document.getElementById("send_pass_form");
  let [isProcessingPayment, setIsProcessingPayment] = useState(false);

  useEffect(() => {
    document.title = "Complete Purchase";

    axios.get("http://localhost:3005/card/" + name).then((response) => {
      setCardDatas(response.data);



      if (response.data.franchisee != "no franchisee") {
        axios
          .get("http://localhost:3005/get-franchisee-datas" + response.data.franchisee)
          .then((res) => {
            if (res.status) {
              setFranchiseeData(res.data.franchisee_data);
            } else {
              Toast({
                status:'error',
                title: res.data.err,
                postition: 'top',
                toast
              })
            }
          });
      } else {
        setFranchiseeData(null);
      }
    });
  }, []);

  // Handle Complete Purchase Click
  const handleCompletePurchase = () => {

    axios({
      method: "post",
      url: "http://localhost:3005/complete-purchase",
      data: franchiseeData,
    })
      .then((response) => {
        // Check Card Creation Is First



        if (response.data.isFirst == true) {


          axios({
            method: "post",
            url: "http://localhost:3005/payment-successfull/" + name,
            data: {
              company_name: name,
              razorpay: null,
              franchisee: cardDatas.franchisee ? cardDatas.franchisee : false,
              access_password: `${name.substring(0,2)}${Math.floor(Math.random() * 99)}`,
              activated_at: new Date().getTime(),
              phone_no: cardDatas.phone_no,
              franchisee_email: cardDatas.franchisee,
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
                      status:'error',
                      title: 'Unable to send card password to your mail',
                      postition: 'top',
                      description: 'Contact Visita',
                      toast
                    })
                    navigate("/create/successfull/" + name);
                    console.log(error);
                  }
                );
            } else {
              Toast({
                status:'error',
                title: 'An error occured',
                postition: 'top',
                description: 'Try again!',
                toast
              })
            }
          });

          navigate("/loading/processing-card");


        } else {
          openPayment(response.data.sub_data);
        }
      })
      .catch((err) => {
        Toast({
          status:'error',
          title: err.message,
          postition: 'top',
          toast
        })
      });
  };

  // Open Payment Checkout When Create Subscription Is Successfull
  const openPayment = (res) => {
    var options = {
      key: apiKeys.razorpay_key,
      subscription_id: res.id,
      name: "Visita | Digital Visiting Card",
      description: "Payment For Purchase Digital Visiting Card",
      image: "https://i.postimg.cc/ZKnK7rC2/visitalogo.png",
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
          url: "http://localhost:3005/verify-payment",
          data: res_obj,
        }).then((response) => {
          if (response) {


            axios({
              method: "post",
              url: "http://localhost:3005/payment-successfull/" + name,
              data: {
                company_name: name,
                razorpay: res_obj,
                franchisee: cardDatas.franchisee ? cardDatas.franchisee : false,
                access_password: `${name.substring(0,2)}${Math.floor(Math.random() * 99)}`,
                activated_at: new Date().getTime(),
                phone_no: cardDatas.phone_no,
                franchisee_email: cardDatas.franchisee,
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
                        status:'error',
                        title: 'Unable to send card password to your mail',
                        postition: 'top',
                        description: 'Contact Visita',
                        toast
                      })
                      navigate("/create/successfull/" + name);
                    }
                  );
              } else {
                Toast({
                  status:'error',
                  title: 'An error occured',
                  postition: 'top',
                  description: 'Try again!',
                  toast
                })
              }
            });

            Toast({
              status:'success',
              title: 'Payment was successfull',
              postition: 'top',
              toast
            })
            navigate("/loading/processing-card");
          } else {
            Toast({
              status:'error',
              title: 'Payment was failed',
              postition: 'top',
              description: 'Try again!',
              toast
            })
          }
        });
      }
    };
    setIsProcessingPayment(false);
    const rzp1 = new window.Razorpay(options); //instead of new Razorpay(options)
    rzp1.open();
  };

  // When Cancel Purchase Button Click
  function cancelPurchase() {
    axios.post("http://localhost:3005/create/cancel-purchase/" + name).then((res) => {

      if (res.data.status) {
        Toast({
          status:'success',
          title: 'Card is cancelled',
          postition: 'top',
          toast
        })
        navigate("/create");
      } else {
        Toast({
          status:'error',
          title: 'Ohh snap!!',
          postition: 'top',
          description: 'We are struggling to cancel card',
          toast
        })
      }
    });
    navigate("/loading/cancelling");
  }




  console.log(cardDatas && cardDatas);
  console.log(franchiseeData && franchiseeData);

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
          value={`${name.substring(0,2)}${Math.floor(Math.random() * 99)}`}
        />
      </form>

      

      <CreateHeader
        hideIndicators={true}
        live_preview_url={`https://visitasmart.com/${name}`}
      />

      <div className=" h-full w-full flex lg:flex-row flex-col items-center justify-center z-50">

      <div className=" lg:hidden block -mt-12 absolute top-44">
      <span className="text-7xl text-indigo-600" ><ion-icon name="checkmark-circle"></ion-icon></span>
        </div>

        <div
          className={`${
            cardDatas && cardDatas.activated ? "h-[50%]" : "lg:h-[75%]"
          }  z-40 lg:mt-0 mt-24 lg:px-0 px-6 lg:w-[60%] w-full lg:py-0 py-32  flex flex-col  items-center justify-center lg:rounded-3xl  lg:border border-indigo-200`}
        >


<div className=" lg:block hidden z-50 -mt-12 mb-6">
<span className="text-7xl text-indigo-600" ><ion-icon name="checkmark-circle"></ion-icon></span>
        </div>


          <h1 className="lg:text-3xl text-2xl font-visita-bold lg:text-start text-center lg:mt-0 -mt-16">
            
            {cardDatas && cardDatas.activated
              ? "Successfully your card is "
              : "Successfully your website was "}

            <span className="text-indigo-600">
              {cardDatas && cardDatas.activated ? "Activated!" : "Created!"}
            </span>
          </h1>

          <h1
            className={`lg:text-xl text-sm lg:block hidden font-visita-medium ${
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

          {cardDatas && cardDatas.activated ? (
            ""
          ) : (
            franchiseeData && franchiseeData.length == 0 ?
            <div className="lg:flex hidden  lg:flex-row flex-col-reverse">
              <h1 className="text-4xl font-visita-medium lg:mt-14 mt-2 bg-indigo-50 py-12 px-12 rounded-3xl lg:mr-6 text-indigo-600 text-center border border-indigo-600">
                599rs
              </h1>
              <h1 className="text-4xl font-visita-medium lg:mt-14 mt-2 bg-indigo-50 py-12 px-12 rounded-3xl lg:mr-6 text-indigo-600 text-center line-through">
                999rs
              </h1>
              
            </div>
            
          : cardDatas && cardDatas.franchisee == "no franchisee" ?

          <div className="lg:flex hidden  lg:flex-row flex-col-reverse">
          <h1 className="text-4xl font-visita-medium lg:mt-14 mt-2 bg-indigo-50 py-12 px-12 rounded-3xl lg:mr-6 text-indigo-600 text-center border border-indigo-600">
            599rs
          </h1>
          <h1 className="text-4xl font-visita-medium mt-14   py-12 px-12 rounded-3xl line-through text-indigo-600 bg-indigo-50 text-center">
            999rs
          </h1>
        </div>

            : 
            <div className="flex lg:flex-row flex-col-reverse">
            <h1 className="text-xl font-visita-medium mb-12 lg:mt-4 mt-2 bg-green-50 py-1 px-12 rounded-3xl lg:mr-6 text-green-600 text-center">
              This card is absolutely free
            </h1>
           
          </div>
          )}


<div className="w-full flex lg:justify-center mt-8 flex-col-reverse items-center lg:flex-row">


{cardDatas && cardDatas.activated ? (
            ""
          ) : (
            <button
              onClick={() => cancelPurchase()}
              className="text-lg font-visita-medium hover:shadow-sm transition-shadow px-12 py-3 border-black-600 border lg:mr-3 lg:mt-0 mt-3 text-black-600 rounded-full"
            >
              Cancel purchase
            </button>
          )}

{cardDatas && cardDatas.activated ? (



            <button
              onClick={() => navigate("/create/successfull/" + name)}
              id="complete-purchase-button"
              className=" text-lg font-visita-medium hover:shadow-sm transition-shadow px-12 py-3 bg-indigo-600 text-white rounded-full shadow-md shadow-indigo-600"
            >
              Open preview
            </button>
          ) : (
            <Button
              className="font-visita-medium"
              fontSize="md"
              isLoading={isProcessingPayment}
              rounded="full"
              py="6"
              px="12"
              color="#fff"
              _hover
              bgColor="#4F45E4"
              disabled={false}
              onClick={() => {
                setIsProcessingPayment(true);
                handleCompletePurchase();
              }}
            >
             
            Complete purchase
            </Button>
          )}

          
</div>


        </div>
      </div>
    </div>
  );
}

export default CardPreview;
