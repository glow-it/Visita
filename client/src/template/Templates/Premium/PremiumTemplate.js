import React, { useEffect, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { Helmet } from "react-helmet";
import reactManifest from "react-manifest";

// core version + navigation, pagination modules:

import { Swiper, SwiperSlide } from "swiper/react";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper";
import axios from "axios";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { Toast } from "../../../miniComponents/Toast";
import apiKeys from "../../../Api/apiKeys";
import Loading from "../../../miniComponents/Loading";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import InstallPwa from "../../../Tools/InstallPwaApp";

function PremiumTemplate1({ preview }) {
  const toast = useToast();
  let params = useParams();
  let [cardDatas, setCardDatas] = useState([]);
  let [products, setProducts] = useState([]);
  let [galleryImages, setGalleryImages] = useState([]);
  let [ytVideos, setYtVideos] = useState([]);
  let [feedbacks, setFeedbacks] = useState([]);
  let navigate = useNavigate();
  let location = useLocation();
  let [bgImage, setBgImage] = useState();
  let [isCardLoading, setIsCardLoading] = useState(true);
  let [specialities, setSpecialities] = useState([]);
  let [features, setFeatures] = useState([]);

  let main_company_name = params.comp_name;

  axios.get(`${apiKeys.server_url}/bg-images`).then((response) => {
    response.data.map((data) => {
      if (data.name == cardDatas.theme_color) {
        setBgImage(data.image_url);
      }
    });
  });

  let cart_products;
  let cart_count;

  if (localStorage.getItem("cart_products") != null) {
    cart_products = JSON.parse(localStorage.getItem("cart_products"));
    cart_count = parseInt(
      JSON.parse(localStorage.getItem("cart_products")).length
    );
  } else {
    cart_products = [];
    cart_count = 0;
  }

  let total_price = 0;

  cart_products.map((data) => {
    total_price += parseInt(data.price);
  });

  let productsList = cart_products.map((product, index) => {
    return `

    ${index + 1} ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

    ${product.name}

    ${product.description}

    ₹${product.price}

    ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
    
    `;
  });

  //   Cart Modal Open
  const [open, setOpen] = useState(false);

  // Get Card Datas
  useEffect(() => {
    // Function To Capitalize Strings
    function capitalize(string) {
      return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
        letter.toUpperCase()
      );
    }

    axios
      .get(`${apiKeys.server_url}/card/` + main_company_name)
      .then((response) => {
        setIsCardLoading(false);

        reactManifest.update(
          {
            name: capitalize(response.data.company_name),
            short_name: capitalize(response.data.company_name),
            description: capitalize(response.data.about),
            start_url:
              "https://www.visitasmart.com/" + response.data.clean_name,
            scope: "https://www.visitasmart.com/" + response.data.clean_name,
            background_color: "#fff",
            theme_color: "#fff",
            display: "standalone",
            icons: [
              {
                src: response.data.logo.replace(/^http:\/\//i, "https://"),
                sizes: "256x256",
                type: "image/png",
              },
            ],
          },
          "#my-manifest-placeholder"
        );

        setCardDatas(response.data);
        setProducts(response.data.products);
        setGalleryImages(response.data.image_gallery);
        setYtVideos(response.data.yt_videos);
        setFeedbacks(response.data.feedbacks);
        setSpecialities(response.data.specials.split(","));
        setFeatures(response.data.features.split(","));

        if (response.data.isActivated) {
          document.title =
            capitalize(response.data.company_name) +
            " - " +
            response.data.tagline;

          // Set Favicon
          var link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
          }
          link.href = response.data.logo.replace(/^http:\/\//i, "https://");
        }

        // Update View Count
        axios.post(
          `${apiKeys.server_url}/update/view/${response.data.company_name}`
        );

        // Calculate How Much Days Ago Created This Card
        var date1, date2;
        //define two date object variables with dates inside it
        date1 = response.data.created_at;
        date2 = new Date();

        //calculate time difference
        var time_difference = date2.getTime() - parseInt(date1);

        //calculate days difference by dividing total milliseconds in a day
        var days_difference = time_difference / (1000 * 60 * 60 * 24);

        let days = Math.trunc(days_difference);

        if (days > 0) {
          if (!response.data.isActivated) {
            navigate(`/activate-warning/${response.data.company_name}`);
          }
        }

        if (days < 1) {
          document.title =
            capitalize(response.data.company_name) +
            " - " +
            response.data.tagline;

          // Set Favicon
          var link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
          }
          link.href = response.data.logo.replace(/^http:\/\//i, "https://");
        }
      })
      .catch((err) => {
        Toast({
          status: "error",
          title: "This website is not in our server",
          postition: "top",
          toast,
        });
        navigate("/");
      });

    // Set Manifest Icon and Name Dynamically
    let iconUrl =
      cardDatas.logo && cardDatas.logo.replace(/^http:\/\//i, "https://");
    let manifest = {
      name: cardDatas && cardDatas.company_name,
      icons: [{ src: iconUrl, sizes: "512x512", type: "image/png" }],
    };
    let content = encodeURIComponent(JSON.stringify(manifest));
    let url = "data:application/manifest+json," + content;
    let element = document.createElement("link");
    element.setAttribute("rel", "manifest");
    element.setAttribute("href", url);
    document.querySelector("head").appendChild(element);
  }, []);

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, [location]);

  function copyCardUrl() {
    navigator.clipboard.writeText(window.location.href);
    Toast({
      status: "success",
      title: "Card copied!",
      postition: "top",
      toast,
    });
  }

  let theme_color = cardDatas && cardDatas.theme_color;

  // URLS
  let message_whatsapp_url = `https://api.whatsapp.com/send/?phone=+91${
    cardDatas && cardDatas.phone_no
  }&text=%F0%9F%91%8BHey,${cardDatas && cardDatas.company_name}`;
  let mail_url = `mailto:${cardDatas && cardDatas.email_id}`;
  let call_url = `tel:+91${cardDatas && cardDatas.phone_no}`;
  let website_url = cardDatas && cardDatas.website;
  let share_whatsapp_url = `https://api.whatsapp.com/send?text=${window.location.href}`;
  let share_sms_url = `sms:?body=${window.location.href}`;
  let share_facebook_url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`;
  let share_twitter_url = `https://twitter.com/intent/tweet?text=${window.location.href}`;
  let share_linkedin_url = `https://www.linkedin.com/cws/share?url=${window.location.href}`;

  function addFeedbackCard({ name, feedback }) {
    let feedback_card_wrapper = document.getElementById(
      "feedback_card_wrapper"
    );

    const div = document.createElement("div");
    div.className = "flex flex-wrap -m-3";

    const innerDiv = document.createElement("div");
    innerDiv.className = "w-full p-3";

    const innerInnerDiv = document.createElement("div");
    innerInnerDiv.className =
      "p-6 h-full bg-white bg-opacity-60 border rounded-3xl";

    const innerInnerInnerDiv = document.createElement("div");
    innerInnerInnerDiv.className = "flex flex-col justify-between h-full";

    const nameDiv = document.createElement("div");
    nameDiv.className = "mb-5 block";

    const nameInnerDiv = document.createElement("div");
    nameInnerDiv.className = "flex flex-wrap mb-4 -m-2";

    const nameInnerInnerDiv = document.createElement("div");
    nameInnerInnerDiv.className = "w-auto p-2";

    const h3 = document.createElement("h3");
    h3.className = "font-bold leading-normal";
    h3.textContent = name;

    const p = document.createElement("p");
    p.className = "text-lg font-medium";
    p.textContent = feedback;

    const todayDiv = document.createElement("div");
    todayDiv.className = "block";

    const todayP = document.createElement("p");
    todayP.className = "text-md text-gray-600 font-medium";
    todayP.textContent = "today";

    nameInnerInnerDiv.appendChild(h3);
    nameInnerDiv.appendChild(nameInnerInnerDiv);
    nameDiv.appendChild(nameInnerDiv);
    innerInnerInnerDiv.appendChild(nameDiv);
    innerInnerInnerDiv.appendChild(p);
    innerInnerInnerDiv.appendChild(todayDiv);
    innerInnerDiv.appendChild(innerInnerInnerDiv);
    innerDiv.appendChild(innerInnerDiv);
    div.appendChild(innerDiv);

    feedback_card_wrapper.appendChild(div);
  }

  return (
    <div className=" flex justify-center items-center pb-24">
      {/* Add Meta Title And Descreption */}
      <Helmet>
        <title className="capitalize">
          {cardDatas && cardDatas.company_name + " website"}
        </title>
        <meta name="description" content={cardDatas && cardDatas.tagline} />
      </Helmet>

      {/* Cart Modal Open */}
      <Transition.Root show={open} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setOpen}>
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

          <div className="fixed inset-0 overflow-hidden">
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
                            Shopping cart
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
                            <ul
                              role="list"
                              className="-my-6 divide-y divide-gray-200"
                            >
                              {cart_products.map((product, index) => (
                                <li className="flex py-6">
                                  <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                    <img
                                      src={product.image}
                                      className="h-full w-full object-cover object-center"
                                    />
                                  </div>

                                  <div className="ml-4 flex flex-1 flex-col">
                                    <div>
                                      <div className="flex justify-between text-base font-medium text-gray-900">
                                        <h3>
                                          <a>{product.name}</a>
                                        </h3>
                                        <p className="ml-4">₹{product.price}</p>
                                      </div>
                                      <p className="mt-1 text-sm text-gray-500">
                                        {product.description}
                                      </p>
                                    </div>
                                    <div className="flex flex-1 items-end justify-between text-sm">
                                      <p className="text-gray-500">Qty 1</p>

                                      <div className="flex">
                                        <button
                                          onClick={() => {
                                            let afterRemoveArr =
                                              cart_products.filter(
                                                (_, i) => i !== index
                                              );
                                            localStorage.setItem(
                                              "cart_products",
                                              JSON.stringify(afterRemoveArr)
                                            );
                                          }}
                                          type="button"
                                          className={`font-medium text-${theme_color}-600 hover:text-indigo-500`}
                                        >
                                          Remove
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                      <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <p>Total</p>
                          <p>₹{total_price}</p>
                        </div>

                        <div className="mt-6">
                          <p
                            onClick={() => {
                              let phoneNumber = "+91" + cardDatas.phone_no;

                              let message = `
                                New Order
                                
                                ${productsList}

                                TOTAL : ₹${total_price}

                                `;

                              console.log(message);

                              let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                                message
                              )}`;

                              window.open(url, "_blank");
                            }}
                            className={`flex items-center justify-center rounded-md border border-transparent bg-${theme_color}-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-${theme_color}-700`}
                          >
                            Checkout
                          </p>
                        </div>
                        <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                          <p>
                            or
                            <button
                              type="button"
                              className={`font-medium ml-2 text-${theme_color}-600 hover:text-${theme_color}-500`}
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          </p>
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

      <div className={`${preview ? "w-full" : "lg:w-4/12"}  w-full `}>
        {localStorage.getItem("isAdmin") == "true" ? (
          <div
            onClick={() => navigate("/manage/" + cardDatas.clean_name)}
            className="w-full h-14 bg-blue-600  text-white flex z-50 items-center justify-center cursor-pointer"
          >
            <h1 className="font-bold ">Manage website</h1>
            <span className="ml-1 flex items-center justify-center">
              <ion-icon name="arrow-forward"></ion-icon>
            </span>
          </div>
        ) : (
          ""
        )}

        {cardDatas && cardDatas.tagline ? (
          <div
            className={`w-full py-3   bg-${theme_color}-600 text-center px-4   text-white flex z-50 items-center justify-center  cursor-pointer  text-sm`}
          >
            <h1 className=" font-bold min-w-max">
              {cardDatas && cardDatas.tagline}
            </h1>
          </div>
        ) : (
          ""
        )}

        <div
          id="home"
          className=" template-1 flex justify-center bg-no-repeat bg-cover "
        >
          <Loading isLoading={isCardLoading} />

          <div className="card relative">
            <div className="w-full h-20 flex items-center bg-slate-100  z-50">
              <span
                className={`z-50 absolute   right-4 text-black text-xs font-medium py-1 px-2 border border-black  rounded-full`}
              >
                Views: {cardDatas && cardDatas.views}
              </span>
              <span
                className={`z-50 absolute  flex cursor-pointer items-center justify-center text-black text-lg right-28  font-medium   bg-slate-200 rounded-full  p-2`}
              >
                <InstallPwa>
                  <span className="flex items-center justify-center">
                    <ion-icon name="download-outline"></ion-icon>
                  </span>
                </InstallPwa>
              </span>
              <p
                onClick={() => setOpen(true)}
                className={`z-50 absolute cursor-pointer  left-4 text-black text-xl font-medium  py-2 px-2 flex items-center justify-center rounded-full  `}
              >
                <ion-icon name="cart-outline"></ion-icon>{" "}
                <span className="text-sm ml-1">
                  Cart{" "}
                  <span>
                    (<span className="cart-count">{cart_count}</span>)
                  </span>
                </span>
              </p>
            </div>

            <div className=" container  w-full">
              <div className=" w-full mt-6 px-8 flex  items-center justify-center">
                <img
                  id="logo"
                  src={
                    cardDatas.logo &&
                    cardDatas.logo.replace(/^http:\/\//i, "https://")
                  }
                  alt="Dp-Template-1"
                  className={`logo  rounded-full ring-2 ring-offset-4 ring-${theme_color}-600`}
                />

                <div className=" w-full h-full flex flex-col pl-2">
                  <h1 className="capitalize text-black text-3xl font-bold ml-4 mt-6">
                    {cardDatas && cardDatas.company_name}
                  </h1>
                  <h1 className="capitalize text-black text-lg font-medium ml-4 mt-1">
                    {cardDatas && cardDatas.company_category}
                  </h1>
                </div>
              </div>

              <div className=" w-full h-24 mt-8 flex justify-evenly items-center">
                {cardDatas && cardDatas.phone_no != "" ? (
                  <a
                    href={call_url}
                    className={`h-14 cursor-pointer w-14 bg-slate-100  rounded-full flex justify-center items-center`}
                  >
                    <span className=" text-2xl flex items-center justify-center text-slate-600">
                      <ion-icon name="call-outline"></ion-icon>
                    </span>
                  </a>
                ) : (
                  ""
                )}

                {cardDatas && cardDatas.whatsapp_no != "" ? (
                  <a
                    href={message_whatsapp_url}
                    className={`h-14 cursor-pointer w-14 bg-slate-100  rounded-full flex justify-center items-center`}
                  >
                    <span className=" text-2xl flex items-center justify-center text-slate-600">
                      <ion-icon name="logo-whatsapp"></ion-icon>
                    </span>
                  </a>
                ) : (
                  ""
                )}

                {cardDatas && cardDatas.email_id != "" ? (
                  <a
                    href={mail_url}
                    className={`h-14 cursor-pointer w-14 bg-slate-100  rounded-full flex justify-center items-center`}
                  >
                    <span className=" text-2xl flex items-center justify-center text-slate-600">
                      <ion-icon name="mail-outline"></ion-icon>
                    </span>
                  </a>
                ) : (
                  ""
                )}

                {cardDatas && cardDatas.website != "" ? (
                  <a
                    href={website_url}
                    className={`h-14 cursor-pointer w-14 bg-slate-100  rounded-full flex justify-center items-center`}
                  >
                    <span className=" text-2xl flex items-center justify-center text-slate-600">
                      <ion-icon name="globe-outline"></ion-icon>
                    </span>
                  </a>
                ) : (
                  ""
                )}
              </div>

              <div className=" px-6">
                <div
                  className={`w-full h-12 bg-slate-100 text-slate-600 mt-4 flex items-center rounded-full`}
                >
                  <span className=" ml-6 text-md flex items-center font-medium">
                    <ion-icon name="call-outline"></ion-icon>{" "}
                    <span className=" ml-3">
                      +91 {cardDatas && cardDatas.phone_no}
                    </span>{" "}
                  </span>
                </div>
                {cardDatas && cardDatas.alt_phone_no != "" ? (
                  <div
                    className={`w-full h-12 bg-slate-100 text-slate-600 mt-4 flex items-center rounded-full`}
                  >
                    <span className=" ml-6 text-md flex items-center font-medium">
                      <ion-icon name="call-outline"></ion-icon>{" "}
                      <span className=" ml-3">
                        +91 {cardDatas && cardDatas.alt_phone_no}
                      </span>{" "}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                {cardDatas && cardDatas.email_id != "" ? (
                  <div
                    className={`w-full h-12 bg-slate-100 text-slate-600 mt-4 flex items-center rounded-full`}
                  >
                    <span className=" ml-6 text-md flex items-center font-medium">
                      <ion-icon name="mail-outline"></ion-icon>{" "}
                      <span className=" ml-3">{cardDatas.email_id}</span>{" "}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                {cardDatas && cardDatas.location != "" ? (
                  <div
                    className={`w-full  py-3 bg-slate-100 text-slate-600 mt-4 flex items-center rounded-full`}
                  >
                    <span className=" ml-6 text-md flex items-center font-medium">
                      <ion-icon name="location-outline"></ion-icon>{" "}
                      <span className=" ml-3">
                        {`${cardDatas && cardDatas.location} - ${
                          cardDatas && cardDatas.city
                        }`}
                      </span>{" "}
                    </span>
                  </div>
                ) : (
                  ""
                )}

                <div className=" flex relative mt-12">
                  <input
                    id="send_whatsapp_number"
                    className={`w-full h-10 border-2 pl-4 font-medium text-black bg-white border-${theme_color}-600  flex items-center rounded-full`}
                    placeholder="+91"
                  ></input>
                  <div
                    onClick={() => {
                      let send_whatsapp_number = document.getElementById(
                        "send_whatsapp_number"
                      ).value;
                      window.open(
                        `https://api.whatsapp.com/send/?phone=+91${send_whatsapp_number}&text=${window.location.href}`
                      );
                    }}
                    className={`cursor-pointer  h-10 rounded-full bg-gradient-to-r  from-${theme_color}-700 to-${theme_color}-600 w-44 bg-red-600 absolute right-0 flex items-center justify-center`}
                  >
                    <span className=" text-sm flex items-center font-medium text-white">
                      <ion-icon name="logo-whatsapp-outline"></ion-icon>{" "}
                      <span className=" ml-1">Share To Whatsapp</span>{" "}
                    </span>
                  </div>
                </div>

                <div className=" w-full flex flex-wrap items-center justify-center mt-8">
                  {cardDatas && cardDatas.gmap_location ? (
                    <button
                      onClick={() => window.open(cardDatas.gmap_location)}
                      className={`flex justify-center items-center py-3 px-6 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-600  font-bold text-lg mr-3`}
                    >
                      Location{" "}
                      <span className=" ml-1 text-white text-xl"></span>
                      <ion-icon name="location-outline"></ion-icon>
                    </button>
                  ) : (
                    ""
                  )}

                  <button
                    onClick={() => {
                      if (navigator.share) {
                        navigator
                          .share({
                            title: cardDatas.company_name + " Website",
                            url:
                              "https://" +
                              cardDatas.clean_name +
                              ".visitasmart.com",
                          })
                          .then(() => {
                            console.log("Thanks for sharing!");
                          })
                          .catch(console.error);
                      } else {
                        // fallback
                      }
                    }}
                    className={`flex justify-center items-center py-3 px-6 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-600  font-bold text-lg`}
                  >
                    Share
                    <span className=" ml-1 text-white text-xl"></span>
                    <ion-icon name="arrow-redo-outline"></ion-icon>
                  </button>

                  <button
                    onClick={() =>
                      navigate("/" + main_company_name + "/premiumproducts")
                    }
                    className={`flex justify-center items-center py-3 px-6 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-600  font-bold text-lg mt-3 mr-3`}
                  >
                    Our Products
                    <span className=" ml-1 text-white text-xl"></span>
                    <ion-icon name="bag-outline"></ion-icon>
                  </button>
                </div>
                <div
                  className={`${
                    cardDatas &&
                    cardDatas.facebook_link == "" &&
                    cardDatas &&
                    cardDatas.twitter_link == "" &&
                    cardDatas &&
                    cardDatas.instagram_link == "" &&
                    cardDatas &&
                    cardDatas.linkedin_link == "" &&
                    cardDatas &&
                    cardDatas.youtube_link == "" &&
                    cardDatas &&
                    cardDatas.pinterest_link == ""
                      ? "invisible"
                      : "visible"
                  } flex bg-white justify-center  px-4 h-12 my-16 items-center rounded-full`}
                >
                  {cardDatas && cardDatas.facebook_link != "" ? (
                    <i
                      onClick={() =>
                        window.open(cardDatas && cardDatas.facebook_link)
                      }
                      className="  cursor-pointer fa-brands fa-facebook text-4xl my-12 rounded-full mr-4 text-blue-600 "
                    ></i>
                  ) : (
                    ""
                  )}

                  {cardDatas && cardDatas.twitter_link != "" ? (
                    <i
                      onClick={() =>
                        window.open(cardDatas && cardDatas.twitter_link)
                      }
                      className=" cursor-pointer fa-brands fa-twitter text-3xl my-12 rounded-full mr-4 text-cyan-600 "
                    ></i>
                  ) : (
                    ""
                  )}

                  {cardDatas && cardDatas.instagram_link != "" ? (
                    <i
                      onClick={() =>
                        window.open(cardDatas && cardDatas.instagram_link)
                      }
                      className=" cursor-pointer fa-brands fa-instagram text-3xl my-12 rounded-full mr-4 text-purple-600 "
                    ></i>
                  ) : (
                    ""
                  )}

                  {cardDatas && cardDatas.linkedin_link != "" ? (
                    <i
                      onClick={() =>
                        window.open(cardDatas && cardDatas.linkedin_link)
                      }
                      className=" cursor-pointer fa-brands fa-linkedin text-3xl my-12 rounded-full mr-4 text-blue-600 "
                    ></i>
                  ) : (
                    ""
                  )}

                  {cardDatas && cardDatas.youtube_link != "" ? (
                    <i
                      onClick={() =>
                        window.open(cardDatas && cardDatas.youtube_link)
                      }
                      className=" cursor-pointer fa-brands fa-youtube text-3xl my-12 rounded-full mr-4 text-red-600 "
                    ></i>
                  ) : (
                    ""
                  )}

                  {cardDatas && cardDatas.pinterest_link != "" ? (
                    <i
                      onClick={() =>
                        window.open(cardDatas && cardDatas.pinterest_link)
                      }
                      className=" cursor-pointer fa-brands fa-pinterest text-3xl my-12 rounded-full mr-4 text-red-600 "
                    ></i>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enter Customer Details Form */}

        {cardDatas && cardDatas.show_customer_details_popop == "true" ? (
          <div className=" w-full h-[450px] flex flex-col items-center justify-center relative">
            <h1
              className={`text-lg  text-white sticky top-0 flex  justify-center items-center font-bold bg-${theme_color}-600 w-full py-3 absolute  bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-600`}
            >
              Add Your Details
            </h1>

            <div class="w-full px-4 flex flex-col items-center mt-10">
              <form
                onSubmit={(event) => {
                  event.preventDefault();

                  const myFormData = new FormData(event.target);

                  const formDataObj = {};
                  myFormData.forEach(
                    (value, key) => (formDataObj[key] = value)
                  );

                  axios
                    .post(
                      `${apiKeys.server_url}/submit/customer-details/${
                        cardDatas && cardDatas.clean_name
                      }`,
                      formDataObj
                    )
                    .then((response) => {
                      if (response.status == 200) {
                        Toast({
                          status: "success",
                          title: "Your data submitted",
                          postition: "top",
                          description: "Thanks!!!",
                          toast,
                        });
                      } else {
                        Toast({
                          status: "error",
                          title: "We are troubling to submit your data",
                          postition: "top",
                          description: "Contact visita team",
                          toast,
                        });
                      }
                    });
                }}
                class=" rounded-2xl w-full px-6  pt-8 pb-8 mb-4"
                id="customer-details-form"
              >
                <div class="mb-4">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="username"
                  >
                    Name
                  </label>
                  <input
                    class=" appearance-none border rounded-full font-medium w-full py-3 px-3  text-gray-700  leading-tight focus:outline-none focus:shadow-outline"
                    name="name"
                  />
                </div>
                <div class="mb-6">
                  <label
                    class="block text-gray-700 text-sm font-bold mb-2"
                    for="password"
                  >
                    Phone Number
                  </label>
                  <input
                    class="rounded-full font-medium appearance-none border w-full py-3  px-3  text-gray-700  mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    name="phone_no"
                  />
                </div>
                <div class="flex items-center justify-start">
                  <button
                    onClick={() => {
                      document.getElementById("customer-details-form").submit();
                      setTimeout(() => {
                        Toast({
                          status: "success",
                          title: "Added your details",
                          postition: "top",
                          toast,
                        });
                      }, 1000);
                    }}
                    class={`font-bold py-2 px-6 rounded-full text-white bg-${
                      cardDatas && cardDatas.theme_color
                    }-600`}
                  >
                    Submit Details
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          ""
        )}

        {/* About Us */}
        <div
          id="about"
          className=" w-full pb-24 text-white flex flex-col bg-slate-900  justify-center relative "
        >
          <h1
            className={`text-lg text-white  flex sticky top-0 mb-12  justify-center items-center font-bold bg-${theme_color}-600 w-full py-3 absolute bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-600`}
          >
            About Us
          </h1>
          <h1 className=" text-xl font-medium ml-6 pr-12">
            {cardDatas && cardDatas.since != "" ? (
              <span className="  text-lg font-bold">
                Est {cardDatas && cardDatas.since}
              </span>
            ) : (
              ""
            )}

            <br />
            {cardDatas && cardDatas.about}
          </h1>

          {/* Specialities */}

          {cardDatas && cardDatas.specials != "" ? (
            <div className=" flex flex-col items-start ml-6 pr-12">
              <span
                className={`  text-xl text-${theme_color}-600 font-bold text-lg mt-8 mb-6 flex`}
              >
                Our Specialities
              </span>
              {specialities.map((data) => {
                return (
                  <h1 className=" text-lg font-medium list-item  mb-4">
                    {data}
                  </h1>
                );
              })}
            </div>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.features != "" ? (
            <div className=" flex flex-col items-start ml-6 pr-12">
              <span
                className={`  text-xl text-${theme_color}-600 font-bold text-lg mt-8 mb-6 flex`}
              >
                Our Features
              </span>
              {features.map((data) => {
                return (
                  <h1 className=" text-lg font-medium list-item mb-4 ">
                    {data}
                  </h1>
                );
              })}
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Products And Services */}
        <div
          id="products"
          className=" w-full  flex flex-col items-center justify-center relative"
        >
          <h1
            className={`text-lg sticky top-0 text-white  flex  justify-center items-center font-bold bg-${theme_color}-600 w-full py-3 absolute z-50 top-0 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-600`}
          >
            Products & Services
          </h1>

          {/* Products */}

          <div className="px-6">
            {products &&
              products
                .filter((data, index) => {
                  return data.product_name != "" && index < 3;
                })
                .map((data, index) => {
                  return (
                    <div
                      z
                      div
                      className={`w-full pb-12 mb-8 px-8 bg-slate-100  rounded-2xl flex flex-col items-center relative ${
                        index == 0 ? "mt-20" : "mt-2"
                      }`}
                    >
                      <img
                        src={data.product_image.replace(
                          /^http:\/\//i,
                          "https://"
                        )}
                        className="  w-full rounded-2xl py-6  offer-image"
                      />
                      <h1 className=" pt-6 capitalize text-center text-xl font-bold">
                        {data.product_name}
                      </h1>

                      <h1 className=" mt-4 capitalize text-center  text-md font-medium text-slate-400">
                        {data.product_description}
                      </h1>

                      <h1 className=" pt-4 capitalize font-medium text-green-600 text-xl">
                        <span className=" mr-2 text-slate-600 line-through">
                          {`${
                            data.product_orgprice != ""
                              ? "₹" + data.product_orgprice
                              : ""
                          }`}
                        </span>
                        {`${
                          data.product_offerprice != ""
                            ? "₹" + data.product_offerprice
                            : ""
                        }`}
                      </h1>
                      <p
                        onClick={(e) => {
                          document
                            .querySelectorAll(".cart-count")
                            .forEach((elem) => {
                              elem.innerText = parseInt(elem.innerText) + 1;
                            });

                          e.target.innerText = "Added to cart";

                          let product_arr = [
                            {
                              image: data.product_image,
                              name: data.product_name,
                              description: data.product_description,
                              price: data.product_offerprice,
                            },
                          ];

                          if (localStorage.getItem("cart_products")) {
                            let existing_arr = JSON.parse(
                              localStorage.getItem("cart_products")
                            );

                            existing_arr.push(...product_arr);

                            localStorage.setItem(
                              "cart_products",
                              JSON.stringify(existing_arr)
                            );
                          } else {
                            localStorage.setItem(
                              "cart_products",
                              JSON.stringify(product_arr)
                            );
                          }
                        }}
                        className={`flex justify-center cursor-pointer items-center py-3 px-12 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-600  font-bold text-lg mt-6`}
                      >
                        Add to cart
                      </p>

                      {data.product_link != "" ? (
                        <a
                          href={data.product_link}
                          className={`flex justify-center  items-center py-3 px-12 border-2 border-${theme_color}-600 text-${theme_color}-600 rounded-full   font-bold text-lg mt-2 `}
                        >
                          View Product
                        </a>
                      ) : (
                        ""
                      )}
                    </div>
                  );
                })}
          </div>

          {products && products.length != 0 ? (
            <div className="w-full h-32  flex items-center justify-center">
              <button
                onClick={() => {
                  navigate("/" + cardDatas.clean_name + "/premiumproducts");
                }}
                className={`flex justify-center items-center py-3 px-12 border text-${theme_color}-600 rounded-full border-${theme_color}-600  font-bold text-sm -mt-6`}
              >
                View more products
                <span className=" ml-1 text-white text-xl"></span>
                <ion-icon name="arrow-forward"></ion-icon>
              </button>
            </div>
          ) : (
            ""
          )}
        </div>

        {/* Image Gallery */}

        <h1
          id="imagegallery"
          className={`text-lg text-white z-10 sticky top-0  flex  justify-center items-center font-bold bg-${theme_color}-600 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-600 mb-6`}
        >
          Image Gallery
        </h1>

        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2600,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
          className=" mySwiper"
        >
          {galleryImages &&
            galleryImages
              .filter((data) => {
                return data != "";
              })
              .map((data) => {
                return (
                  <SwiperSlide>
                    <img src={data.replace(/^http:\/\//i, "https://")} />
                  </SwiperSlide>
                );
              })}
        </Swiper>

        {/* Youtube Videos */}
        <div
          id="ytvideos"
          className=" flex flex-col items-center mt-6 pb-16 bg-slate-900"
        >
          <h1
            className={`text-lg text-white  sticky top-0 z-20  flex  justify-center items-center font-bold bg-${theme_color}-600 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-600 mb-12`}
          >
            Youtube Videos
          </h1>

          {ytVideos &&
            ytVideos
              .filter((data) => {
                return data != "";
              })
              .map((data) => {
                const videoUrl = data;
                const videoId = videoUrl.split("be/")[1];
                const embedUrl = "https://www.youtube.com/embed/" + videoId;

                return (
                  <iframe
                    className=" rounded-xl my-4"
                    src={embedUrl}
                    title="Introducing Dynamic Island on iPhone 14 Pro | Apple"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                  ></iframe>
                );
              })}
        </div>

        {/* Payment Info */}
        <div id="paymentinfo" className=" flex flex-col  ">
          <h1
            className={`text-lg text-white  flex sticky top-0 z-30  justify-center items-center font-bold bg-${theme_color}-600 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-600 mb-6`}
          >
            Payment Info
          </h1>

          {cardDatas && cardDatas.paytm_number != "" ? (
            <a href="#" className=" font-bold ml-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                Paytm Number
              </span>{" "}
              <br /> {cardDatas && cardDatas.paytm_number}
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.googlepay_number != "" ? (
            <a href="#" className=" font-bold ml-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                Google Pay Number
              </span>{" "}
              <br /> {cardDatas && cardDatas.googlepay_number}
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.phonepe != "" ? (
            <a href="#" className=" font-bold ml-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                PhonePe Number
              </span>{" "}
              <br /> {cardDatas && cardDatas.phonepe}
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.googlepay_qrcode != "" ? (
            <a href="#" className=" font-bold ml-6 mt-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                GooglePay QrCode
              </span>{" "}
              <br />
              <img
                src={
                  cardDatas.googlepay_qrcode &&
                  cardDatas.googlepay_qrcode.replace(/^http:\/\//i, "https://")
                }
                className=" h-44"
              />
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.paytm_qrcode != "" ? (
            <a href="#" className=" font-bold ml-6 mt-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                Paytm QrCode
              </span>{" "}
              <br />
              <img
                src={
                  cardDatas.paytm_qrcode &&
                  cardDatas.paytm_qrcode.replace(/^http:\/\//i, "https://")
                }
                className=" h-44"
              />
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.phonepe_qrcode != "" ? (
            <a href="#" className=" font-bold ml-6 mt-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                PhonePe QrCode
              </span>{" "}
              <br />
              <img
                src={
                  cardDatas.phonepe_qrcode &&
                  cardDatas.phonepe_qrcode.replace(/^http:\/\//i, "https://")
                }
                className=" h-44"
              />
            </a>
          ) : (
            ""
          )}

          {/* Bank Details */}
        </div>

        <div id="bankdetails" className=" flex flex-col mt-6 ">
          <h1
            className={`text-lg text-white sticky top-0 z-40  flex  justify-center items-center font-bold bg-${theme_color}-600 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-600 mb-6`}
          >
            Bank Details
          </h1>

          {cardDatas && cardDatas.bank_name != "" ? (
            <a href="#" className=" font-bold ml-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                Bank Name
              </span>{" "}
              <br /> {cardDatas && cardDatas.bank_name}
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.account_holder_name != "" ? (
            <a href="#" className=" font-bold ml-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                Accound Holder Name
              </span>{" "}
              <br /> {cardDatas && cardDatas.account_holder_name}
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.bank_account_number != "" ? (
            <a href="#" className=" font-bold ml-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                Bank Accound Number
              </span>{" "}
              <br />
              {cardDatas && cardDatas.bank_account_number}
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.bank_ifsc_code != "" ? (
            <a href="#" className=" font-bold ml-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">
                Bank IFSC Code
              </span>{" "}
              <br />
              {cardDatas && cardDatas.bank_ifsc_code}
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.gst != "" ? (
            <a href="#" className=" font-bold ml-6 mb-5">
              <span className=" text-slate-600 text-md font-medium">GST</span>{" "}
              <br />
              {cardDatas && cardDatas.gst}
            </a>
          ) : (
            ""
          )}
        </div>

        {/* Testimornial */}
        <section class=" bg-gray-900">
          <div class="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
            <div class="mx-auto max-w-screen-sm">
              <h2 class="mb-4 text-4xl tracking-tight font-extrabold  text-white">
                Feedbacks
              </h2>
              <p class="mb-8 font-light  lg:mb-16 sm:text-xl text-gray-400">
                Loves from clients
              </p>
            </div>
            <div class="grid mb-8 lg:mb-12 lg:grid-cols-2">
              {feedbacks &&
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

        <div class="w-full px-4 flex flex-col items-center mt-6">
          <form
            class="bg-white  rounded-3xl w-full px-6  pt-6 pb-8 mb-4"
            id="feedback-form"
          >
            <div class="mb-4">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="username"
              >
                Name
              </label>
              <input
                class="shadow-sm appearance-none border rounded-3xl font-medium w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                name="name"
              />
            </div>
            <div class="mb-6">
              <label
                class="block text-gray-700 text-sm font-bold mb-2"
                for="password"
              >
                Feedback
              </label>
              <input
                class="shadow-sm font-medium appearance-none border rounded-3xl w-full pt-4 pb-16  px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                name="feedback"
              />
            </div>
            <div class="flex items-center justify-center">
              <button
                onClick={(event) => {
                  event.preventDefault();
                  // Submit Feedback Form
                  let form = document.getElementById("feedback-form");

                  let obj = {
                    name: form.name.value,
                    feedback: form.feedback.value,
                    date: new Date().getTime(),
                  };
                  addFeedbackCard({ name: obj.name, feedback: obj.feedback });

                  form.name.value = "";
                  form.feedback.value = "";

                  axios.post(
                    `${apiKeys.server_url}/update/feedback/${
                      cardDatas && cardDatas.clean_name
                    }`,
                    obj
                  );
                }}
                class={`font-bold py-2 px-6 rounded-full text-white bg-${
                  cardDatas && cardDatas.theme_color
                }-600`}
              >
                Send Feedback
              </button>
            </div>
          </form>
          <p class="text-center mt-8 text-gray-600 text-xs font-medium pb-6">
            &copy;2023 Visita. All rights reserved <br />
          </p>
          <a
            href="https://www.visitasmart.com"
            className="font-bold -mt-4 text-center text-gray-600 text-xs pb-6"
          >
            visitasmart.com
          </a>
        </div>
      </div>

      <div
        className={` ${
          preview
            ? "lg:w-[24%] bottom-14 rounded-3xl rounded-t"
            : "lg:w-[32.2%]"
        } w-full h-14 flex bg-${theme_color}-600 fixed bottom-0 overflow-scroll z-50`}
      >
        <a
          href="#home"
          className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
        >
          <span className=" text-white text-2xl">
            <ion-icon name="home"></ion-icon>
          </span>
          <span className=" font-bold -mt-2 text-xs text-white">Home</span>
        </a>
        <a
          href="#about"
          className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
        >
          <span className=" text-white text-2xl">
            <ion-icon name="person-circle"></ion-icon>
          </span>
          <span className=" font-bold -mt-2 text-xs text-white">About us</span>
        </a>
        <a
          href="#products"
          className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
        >
          <span className=" text-white text-2xl">
            <ion-icon name="cart-outline"></ion-icon>
          </span>
          <span className=" font-bold -mt-2 text-xs text-white">Products</span>
        </a>
        <a
          href="#imagegallery"
          className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
        >
          <span className=" text-white text-2xl">
            <ion-icon name="images"></ion-icon>
          </span>
          <span className=" font-bold -mt-2 text-xs text-white">
            Image Gallery
          </span>
        </a>
        <a
          href="#ytvideos"
          className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
        >
          <span className=" text-white text-2xl">
            <ion-icon name="logo-youtube"></ion-icon>
          </span>
          <span className=" font-bold -mt-2 text-xs text-white">Yt Videos</span>
        </a>
        <a
          href="#paymentinfo"
          className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
        >
          <span className=" text-white text-2xl">
            <ion-icon name="wallet"></ion-icon>
          </span>
          <span className=" font-bold -mt-2 text-xs text-white">
            Payment Info
          </span>
        </a>
        <a
          href="#bankdetails"
          className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
        >
          <span className=" text-white text-xl">
            <i class="fa-solid fa-building-columns"></i>
          </span>
          <span className=" font-bold -mt- text-xs text-white">
            Bank Details
          </span>
        </a>
        <a
          href="#feedbacks"
          className=" nav-bottom h-full flex flex-col items-center pt-2"
        >
          <span className=" text-white text-xl">
            <i class="fa-solid fa-comment"></i>
          </span>
          <span className=" font-bold -mt- text-xs text-white">Feedbacks</span>
        </a>
      </div>
    </div>
  );
}

export default PremiumTemplate1;
