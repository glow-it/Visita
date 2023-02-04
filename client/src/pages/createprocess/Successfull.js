import axios from "axios";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { Tooltip, useToast } from "@chakra-ui/react";
import { Toast } from "../../miniComponents/Toast";
import * as htmlToImage from "html-to-image";
import apiKeys from "../../Api/apiKeys";
import ConfettiGenerator from "confetti-js";
import Loading from "../../miniComponents/Loading";

function Successfull() {
  // Function To Capitalize Strings
  function capitalize(string) {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
  }

  let params = useParams();
  let comp_name = params.comp_name;
  let comp_name_clean = comp_name.replace(/[-]/g, " ");
  let [cardDatas, setCardDatas] = useState([]);
  let [tooltipIsOpen, setTooltipIsOpen] = useState(false);
  let [isLoading, setIsLoading] = useState(true);
  let navigate = useNavigate();
  let base_url = "visitasmart.com/";
  let manage_card_url = base_url + "manage/" + cardDatas.clean_name;
  let toast = useToast();
  let clean_compname = params.comp_name.replace(/[-]/g, " ");

  useEffect(() => {
    setTimeout(() => {
      setTooltipIsOpen(true);
    }, 2500);

    setTimeout(() => {
      setTooltipIsOpen(false);
    }, 6000);

    document.title = "Website - " + capitalize(comp_name_clean);
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });

    axios
      .get(`${apiKeys.server_url}/card/` + comp_name)
      .then((response) => {
        setCardDatas(response.data);

        if (!response.data.activated) {
          navigate("/create/preview/" + comp_name);
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  let share_whatsapp_url = `https://api.whatsapp.com/send?text=${
    cardDatas && cardDatas.isPremium == "true"
      ? cardDatas.clean_name + ".visitasmart.com"
      : "visitasmart.com/" + cardDatas.clean_name
  }`;
  let share_sms_url = `sms:?body=${cardDatas.clean_name + ".visitasmart.com"}`;
  let share_facebook_url = `https://www.facebook.com/sharer/sharer.php?u=${
    cardDatas && cardDatas.isPremium == "true"
      ? cardDatas.clean_name + ".visitasmart.com"
      : "visitasmart.com/" + cardDatas.clean_name
  }`;
  let share_twitter_url = `https://twitter.com/intent/tweet?text=${
    cardDatas && cardDatas.isPremium == "true"
      ? cardDatas.clean_name + ".visitasmart.com"
      : "visitasmart.com/" + cardDatas.clean_name
  }`;
  let share_linkedin_url = `https://www.linkedin.com/cws/share?url=${
    cardDatas && cardDatas.isPremium == "true"
      ? cardDatas.clean_name + ".visitasmart.com"
      : "visitasmart.com/" + cardDatas.clean_name
  }`;

  // Download QR Code
  function downloadQrCode() {
    let company_name =
      cardDatas && cardDatas.company_name.replace(/[ ]/g, "-").toLowerCase();
    let download_name = company_name + "-qrcode.jpg";

    let downloadLink = document.createElement("a");
    downloadLink.setAttribute("download", download_name);
    var canvas = document.getElementById("qr-code");
    var dataURL = canvas.toDataURL("image/jpg");
    downloadLink.setAttribute("href", dataURL);
    downloadLink.click();
  }

  function downloadQrCodeDesign() {
    htmlToImage
      .toJpeg(document.getElementById("qr-code-design"), { quality: 1.0 })
      .then(function (dataUrl) {
        var link = document.createElement("a");
        link.download = `${params.comp_name}-qrcode-design.jpeg`;
        link.href = dataUrl;
        link.click();
      });
  }

  useEffect(() => {
    const confettiSettings = {
      target: "confetti-canvas",
      props: ["square"],
      clock: 100,
      max: 300,
      size: 2,
      colors: [
        [0, 255, 17],
        [255, 0, 21],
        [0, 157, 255],
        [255, 255, 0],
      ],
      respawn: false,
      height: 1300,
    };
    const confetti = new ConfettiGenerator(confettiSettings);
    confetti.render();

    setTimeout(() => {
      confetti.clear();
      document.getElementById("confetti-canvas").style.display = "none";
    }, 5000);
  }, []);

  return (
    <div className=" w-screen">
      <Loading isLoading={isLoading} />

      <canvas
        id="confetti-canvas"
        className="fixed -top-96 z-50 flex justify-center"
      ></canvas>
      <div className="z-10 bg-blue-50/50 w-full flex flex-col items-center">
        <div classNam e="w-full h-12 flex items-center lg:px-96 px-4 ">
          {cardDatas && cardDatas.franchisee != "no franchisee" ? (
            <a
              href="https://dashboard.visitasmart.com"
              className="font-medium flex items-center justify-center hover:text-indigo-600 cursor-pointer"
            >
              <span className="flex mr-1 items-center justify-center">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </span>
              Dashboard
            </a>
          ) : (
            ""
          )}

          <p
            onClick={() => {
              if (navigator.share) {
                navigator
                  .share({
                    title:
                      params.comp_name.split("-", " ") +
                      " Business Website Details",
                    url: window.location.href,
                  })
                  .then(() => {
                    console.log("Thanks for sharing!");
                  })
                  .catch(console.error);
              } else {
                // fallback
              }
            }}
            className="font-medium flex items-center hover:text-indigo-600 absolute lg:right-96 right-4 justify-center cursor-pointer"
          >
            {" "}
            <span className="flex ml-1 mt-8 z-50 items-center justify-center">
              <ion-icon name="arrow-redo"></ion-icon>
            </span>
          </p>
        </div>

        <a
          href="https://dashboard.visitasmart.com"
          className={`${
            cardDatas && cardDatas.franchisee === "no franchisee"
              ? "hidden"
              : "block"
          } hidden cursor-pointer hover:scale-105 transition-transform py-3 px-6 bg-indigo-600 font-bold rounded-full text-white absolute right-12 top-6`}
        >
          Go to franchisee
        </a>

        <div
          id="qrcode_div"
          className="overflow-y-scroll lg:w-[500px] bg-white pb-32 h-screen z-10 w-full flex flex-col items-center  px-4 pt-16 "
        >
          <h1 className="text-7xl font-bold mb-2 text-green-500">
            <ion-icon name="checkmark-circle-outline"></ion-icon>
          </h1>
          <h1 className="text-3xl font-bold mb-6 ">Share website</h1>
          <div
            className={` lg:py-4 py-4 w-full mb-8 z-10 h-12 bg-${cardDatas && cardDatas.theme_color}-50 flex items-center justify-center  text-${cardDatas && cardDatas.theme_color}-600 `}
          >
            <h1
              id="website_url_text_successfull"
              className="font-medium lg:text-xl text-center flex lowercase"
            >
              {cardDatas && cardDatas.isPremium == "true"
                ? cardDatas.clean_name + ".visitasmart.com"
                : "visitasmart.com/" + cardDatas.clean_name}

              <Tooltip
                className="font-medium"
                isOpen={tooltipIsOpen}
                hasArrow
                px="4"
                bg="black"
                py="2"
                color="white"
                rounded="lg"
                label="click to copy"
                placement="right"
              >
                <span
                  onClick={() => {
                    navigator.clipboard.writeText(
                      document.getElementById("website_url_text_successfull")
                        .innerText
                    );

                    Toast({
                      status: "success",
                      title: "Copied",
                      postition: "top",
                      toast,
                    });
                  }}
                  className="flex items-center justify-center ml-2 cursor-pointer"
                >
                  <ion-icon name="copy-outline"></ion-icon>
                </span>
              </Tooltip>
            </h1>
            <div
              id="tooltip-light"
              role="tooltip"
              class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
            >
              <span className="font-medium" id="copy-tooltip">
                Copy link
              </span>
            </div>
          </div>

          <div
            id="qr-code-design"
            className={` lg:px-0 px-6 transition-all flex-col  relative w-full py-10 lg:pt-24 pb-16 pt-24 bg-${cardDatas && cardDatas.theme_color}-50   z-10 flex items-center  justify-center`}
          >
            <div
              className={`w-full h-28 absolute top-0  bg-${
                cardDatas && cardDatas.theme_color
              }-600 text-white  flex items-center justify-center`}
            >
              <h1 className="font-bold text-4xl capitalize">
                {cardDatas && cardDatas.company_name}
              </h1>
            </div>

            <div
              id="qr_code_wrapper"
              className="py-3 px-3 z-50 transition-all rounded-2xl bg-white"
            >
              <QRCode
                id="qr-code"
                enableCORS={true}
                value={`https://www.visitasmart.com/${comp_name}`}
                eyeRadius={15}
                logoImage={cardDatas && cardDatas.logo}
                logoWidth={60}
                logoHeight={60}
                size={220}
                qrStyle="dots"
                fgColor={cardDatas && cardDatas.theme_color}
                bgColor="white"
              />
            </div>

            <div className="py-3 px-6 rounded-full mt-6 bg-white lowercase">
              <h1 className={`font-medium text-${cardDatas && cardDatas.theme_color}-600`}>
                {cardDatas && cardDatas.isPremium == "true"
                  ? cardDatas.clean_name + ".visitasmart.com"
                  : "visitasmart.com/" + cardDatas.clean_name}
              </h1>
            </div>
          </div>

          <div className="lg:w-[70%] w-full mt-16 h-32 flex flex-col items-center justify-center z-10">
            <button
              onClick={() =>
                window.open(
                  "https://" + cardDatas.clean_name + ".visitasmart.com"
                )
              }
              className=" py-3 w-full bg-white text-indigo-600  border transition-colors hover:bg-indigo-600 my-1  hover:text-white cursor-pointer rounded-full font-bold"
            >
              Open your website
            </button>

            <button
              onClick={() => downloadQrCode()}
              className="relative flex items-center justify-center py-3 w-full bg-white text-indigo-600 my-1  border transition-colors hover:bg-indigo-600  hover:text-white cursor-pointer rounded-full font-bold"
            >
              <span className=" absolute left-6 flex items-center justify-center">
                <ion-icon name="arrow-down-outline"></ion-icon>
              </span>{" "}
              Download Qrcode
            </button>

            <button
              onClick={() => downloadQrCodeDesign()}
              className="relative py-3 flex items-center justify-center w-full bg-white text-indigo-600 my-1  border transition-colors hover:bg-indigo-600  hover:text-white cursor-pointer rounded-full font-bold"
            >
              <span className=" absolute left-6  flex items-center justify-center">
                <ion-icon name="arrow-down-outline"></ion-icon>
              </span>
              Download Qrcode Design
            </button>
          </div>

          <div className="w-50 z-10 h-16 mt-16 flex items-center justify-center">
            <a
              className="bg-indigo-600 hover:bg-indigo-900 flex transition-colors justify-center mr-3 text-lg p-3 text-white rounded-full"
              href={share_facebook_url}
            >
              {" "}
              <i class="fa-brands fa-facebook  cursor-pointer  "></i>
            </a>

            <a
              className="bg-blue-600 hover:bg-blue-900 flex transition-colors justify-center mr-3 text-lg p-3 text-white rounded-full"
              href={share_twitter_url}
            >
              {" "}
              <i class="fa-brands  fa-twitter  cursor-pointer "></i>
            </a>

            <a
              className="bg-sky-600 hover:bg-sky-900 flex transition-colors justify-center mr-3 text-lg p-3 text-white rounded-full"
              href={share_linkedin_url}
            >
              {" "}
              <i class="fa-brands  fa-linkedin  cursor-pointer "></i>
            </a>

            <a
              className="bg-green-600 hover:bg-green-900 flex transition-colors justify-center mr-3 text-lg p-3 text-white rounded-full"
              href={share_whatsapp_url}
            >
              {" "}
              <i class="fa-brands  fa-whatsapp  cursor-pointer "></i>
            </a>

            <a
              className="bg-slate-900 hover:bg-slate-700 flex transition-colors justify-center mr-3 text-lg p-3 text-white rounded-full"
              href={share_sms_url}
            >
              {" "}
              <i class="fa-solid fa-envelope cursor-pointer "></i>
            </a>
          </div>

          <div className="flex z-10 flex-col items-center mt-20 pb-20 bg-slate-100 text-white">
            <h1 className="lg:text-xl text-xl font-bold mb-6 mt-10 text-slate-900 ">
              Manage or edit your website
            </h1>

            <div className="lg:px-10 lg:h-12 h-24 relative w-[80%]  mt-20 bg-slate-100 shadow-lg text-slate-900 border rounded-lg flex items-center justify-center   text-white ">
              <div className="lg:w-full w-[70%] absolute text-indigo-600 lg:text-xl text-md rounded-t-xl -top-10 h-10 flex items-center justify-center font-semibold bg-indigo-200">
                <h1>Website manage link</h1>
              </div>
              <h1 className="font-medium lg:w-auto w-[70%]  lg:text-xl text-center lowercase">
                {manage_card_url}
              </h1>
              <div
                id="tooltip-light"
                role="tooltip"
                class="inline-block absolute invisible py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
              >
                <span className="font-medium" id="copy-tooltip">
                  Copy manage link
                </span>
              </div>
            </div>

            <div className="px-10 lg:h-12 h-24 w-[80%]   relative mt-16 bg-slate-100 shadow-lg text-slate-900 border rounded-lg flex items-center justify-center   text-white ">
              <div className="lg:w-full w-[70%] absolute  font-semibold text-indigo-600 lg:text-xl text-md rounded-t-xl -top-10 h-10 flex items-center justify-center bg-indigo-200">
                <h1>Website password</h1>
              </div>
              <h1 className="font-medium lg:text-xl text-2xl text-center">
                {/* Website password has been send to your email */}
                {cardDatas.activated && cardDatas.activated.access_password}
              </h1>
              <div
                id="tooltip-light"
                role="tooltip"
                class="inline-block absolute invisible py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
              >
                <span className="font-medium" id="copy-tooltip">
                  Copy manage link
                </span>
              </div>
            </div>

            <div className="flex flex-col rounded-3xl  px-12 py-12 mt-10 bg-slate-900">
              <div className="flex flex-col items-start">
                <span className="lg:text-xl text-sm font-medium">
                  1. Go To <br />{" "}
                  <a
                    href={"https://" + manage_card_url}
                    target="_blank"
                    className="text-indigo-600 "
                  >
                    {manage_card_url}
                  </a>
                </span>
                <span className="lg:text-xl text-sm font-medium mt-4">
                  2. You'll be asked to enter a password
                </span>
                <span className="lg:text-xl text-sm font-medium mt-4">
                  3. Then enter the Website password you have send to your email
                </span>
              </div>

              <div className="flex z-10 flex-col items-center  ">
                <h1 className="lg:text-xl text-sm text-indigo-600 font-bold mb-6 mt-10 capitalize">
                  Or
                </h1>
              </div>

              <div className="flex flex-col items-start">
                <span className="lg:text-xl text-sm font-medium mt-6">
                  1. Go To{" "}
                  <a href={base_url} className="text-indigo-600 ">
                    {base_url}
                  </a>
                </span>
                <span className="lg:text-xl text-sm font-medium mt-4">
                  2. And Click On Manage Website Button In The Header
                </span>
                <span className="lg:text-xl text-sm font-medium mt-4">
                  3. You'll be asked to enter a password
                </span>
                <span className="lg:text-xl text-sm font-medium mt-4">
                  4. Then enter the Website password you have send to your email
                </span>
              </div>
            </div>

            <h1 className="lg:text-lg text-sm font-medium text-slate-400 mt-10 ">
              Any Help? Contact Visita{" "}
              <a
                href="/support"
                className="text-indigo-600 hover: ml-2 cursor-pointer"
              >
                Help Center{" "}
              </a>
            </h1>

            <h1 className="lg:text-lg text-sm font-medium text-slate-400 mt-4">
              © Visita - all rights reserved
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Successfull;
