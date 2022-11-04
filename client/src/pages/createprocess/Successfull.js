import axios from "axios";
import React, { useEffect, useState } from "react";
import { QRCode } from "react-qrcode-logo";
import { Navigate, useNavigate, useParams } from "react-router-dom";

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
  let [cardDatas,setCardDatas] = useState([])
  let navigate = useNavigate()
  let base_url = 'https://visitasmart.com'
  let manage_card_url = base_url + '/manage/card/' + comp_name
  


  useEffect(() => {
    document.title = "Successfull | " + capitalize(comp_name_clean);
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";  
    });

  axios.get('http://localhost:3005/card/' + comp_name).then((response)=> {
    setCardDatas(response.data)
    if(!response.data.activated){
      navigate('/create/preview/' + comp_name)
    }else{

    }
  }).catch((err)=> {
    console.log(err);
  })

  },[]);


  let share_whatsapp_url = `https://api.whatsapp.com/send?text=${base_url + '/card/' + comp_name}`;
  let share_sms_url = `sms:?body=${base_url + '/card/' + comp_name}`;
  let share_facebook_url = `https://www.facebook.com/sharer/sharer.php?u=${base_url + '/card/' + comp_name}`;
  let share_twitter_url = `https://twitter.com/intent/tweet?text=${base_url + '/card/' + comp_name}`;
  let share_linkedin_url = `https://www.linkedin.com/cws/share?url=${base_url + '/card/' + comp_name}`;


  return (
    <div  >

      {
        cardDatas && cardDatas.franchisee != "no franchisee" ?
        <h1 onClick={()=> navigate('/manage/franchisee')} className="cursor-pointer hover:scale-105 transition-transform py-3 px-6 bg-blue-600 font-visita-bold rounded-full text-white absolute right-12 top-6">
        Go To Franchisee
      </h1>
    :''  
    }

      <div className="h-screen w-full -ml-6 z-[100] bg-white  absolute card-preview-successfull-animation flex items-center justify-center">
        <div className="w-[200px] -mt-16">
        <lottie-player src="https://assets2.lottiefiles.com/packages/lf20_pqnfmone.json"  background="transparent"  speed="1" autoplay></lottie-player>
        </div>
        </div>

    



      <div className="overflow-y-scroll pb-32 h-screen z-50 w-full flex flex-col items-center lg:px-64 px-4 pt-16 ">
        <h1 className="text-4xl font-visita-bold mb-6 capitalize">
          Send Card
        </h1>
        <div className="px-10 z-50 h-12 bg-green-50 flex items-center justify-center border border-green-600 text-green-600 rounded-full">
          <h1 className="font-visita-medium lg:text-xl text-center">
          {base_url}/card/ {comp_name}
            <i
              data-tooltip-target="tooltip-light"
              data-tooltip-style="light"
              data-tooltip-placement="right"
              class="fa-solid fa-copy text-green-900 cursor-pointer ml-3"
              onClick={() => {
                document.getElementById("copy-tooltip").innerText = "Copied!";
                setTimeout(() => {
                  document.getElementById("copy-tooltip").innerText =
                    "Copy Link";
                }, 2000);
                navigator.clipboard.writeText(base_url + "/card/" + comp_name);
              }}
            ></i>
          </h1>
          <div
            id="tooltip-light"
            role="tooltip"
            class="inline-block absolute invisible z-10 py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
          >
            <span className="font-visita-medium" id="copy-tooltip">
              Copy Link
            </span>
          </div>
        </div>

          <div id="qr-code" className="lg:w-[50%] w-full py-10 bg-white border mt-8 rounded-3xl z-50 flex items-center justify-center">
          <QRCode
              value={`${base_url}/${comp_name}`}
              eyeRadius={20}
              logoImage={cardDatas && cardDatas.logo}
              logoWidth={60}
              logoHeight={60}
              size={280}
              qrStyle="dots"
              fgColor={cardDatas && cardDatas.theme_color}
            />
          </div>

          <div className="w-[50%] mt-4 h-16 flex items-center justify-center z-50">


              <button onClick={()=> window.open(base_url + '/card/' + comp_name)} className=" py-3 w-full bg-white text-blue-600  border transition-colors hover:bg-blue-600  hover:text-white cursor-pointer rounded-full font-visita-bold">Open Your Card</button>
          </div>

          <div className="w-50 z-50 h-16 mt-10 flex items-center justify-center">

         <a href={share_facebook_url}> <i class="fa-brands text-blue-600 hover:text-blue-900 text-4xl fa-facebook mr-6 cursor-pointer hover:scale-110 transition-transform"></i></a>

         <a href={share_twitter_url}> <i class="fa-brands text-blue-500 hover:text-blue-900 text-4xl fa-twitter mr-6 cursor-pointer hover:scale-110 transition-transform"></i></a>

         <a href={share_linkedin_url}> <i class="fa-brands text-sky-600 hover:text-sky-900 text-4xl fa-linkedin mr-6 cursor-pointer hover:scale-110 transition-transform"></i></a>
          
         <a href={share_whatsapp_url}> <i class="fa-brands text-green-600 hover:text-green-900 text-4xl fa-whatsapp mr-6 cursor-pointer hover:scale-110 transition-transform"></i></a>

         <a href={share_sms_url}> <i class="fa-solid text-stone-600 hover:text-stone-900 text-4xl fa-envelope cursor-pointer hover:scale-110 transition-transform"></i></a>
          </div>

          <div className="flex z-50 flex-col items-center mt-20 ">
          <h1 className="text-3xl font-visita-bold mb-6 mt-10 capitalize">
          Manage or Edit Your Card
        </h1>



        <div className="px-10 h-12 relative mt-20 bg-blue-50 flex items-center justify-center border  text-blue-600 rounded-b-xl">
          <div className="w-full absolute text-blue-600 font-visita-bold text-xl rounded-t-xl -top-10 h-10 flex items-center justify-center bg-blue-200">
            <h1>Card Manage And Edit Link</h1>
          </div>
          <h1 className="font-visita-medium lg:text-xl text-center">
          {manage_card_url}
            <i
              data-tooltip-target="tooltip-light"
              data-tooltip-style="light"
              data-tooltip-placement="right"
              class="fa-solid fa-copy text-blue-900 cursor-pointer ml-3"
              onClick={() => {
                document.getElementById("copy-tooltip").innerText = "Copied!";
                setTimeout(() => {
                  document.getElementById("copy-tooltip").innerText =
                    "Copy Link";
                }, 2000);
                navigator.clipboard.writeText(manage_card_url);
              }}
            ></i>
          </h1>
          <div
            id="tooltip-light"
            role="tooltip"
            class="inline-block absolute invisible py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
          >
            <span className="font-visita-medium" id="copy-tooltip">
              Copy Manage Link
            </span>
          </div>
        </div>

        <div className="px-10 h-12 relative mt-16 bg-blue-50 flex items-center justify-center border  text-blue-600 rounded-b-xl">
          <div className="w-full absolute  font-visita-bold text-blue-600 text-xl rounded-t-xl -top-10 h-10 flex items-center justify-center bg-blue-200">
            <h1>Card Password</h1>
          </div>
          <h1 className="font-visita-medium lg:text-xl text-center">
             Card Password Has Been Send To Your Email
          </h1>
          <div
            id="tooltip-light"
            role="tooltip"
            class="inline-block absolute invisible py-2 px-3 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 shadow-sm opacity-0 tooltip"
          >
            <span className="font-visita-medium" id="copy-tooltip">
              Copy Manage Link
            </span>
          </div>
        </div>

      <div className="flex flex-col rounded-3xl border px-12 py-12 mt-10 bg-white">
      <div className="flex flex-col items-start">
       <span className="text-xl font-visita-medium" >1. Go To <br /> <a href={manage_card_url} className="text-blue-600 " >{manage_card_url}</a></span>
        <span className="text-xl font-visita-medium mt-4" >2. You'll be asked to enter a password</span>
        <span className="text-xl font-visita-medium mt-4" >3. Then enter the card password you have send to your email</span>
       </div>

       <div className="flex z-50 flex-col items-center  ">
          <h1 className="text-xl text-blue-600 font-visita-bold mb-6 mt-10 capitalize">
         Or
        </h1>
        </div>

        <div className="flex flex-col items-start">
       <span className="text-xl font-visita-medium mt-6" >1. Go To <a href={base_url} className="text-blue-600 " >{base_url}</a></span>
        <span className="text-xl font-visita-medium mt-4" >2. And Click On Manage Card Button In The Header</span>
        <span className="text-xl font-visita-medium mt-4" >3. You'll be asked to enter a password</span>
        <span className="text-xl font-visita-medium mt-4" >4. Then enter the card password you have send to your email</span>
       </div>
      </div>

      <h1 className="text-lg font-visita-medium text-slate-400 mt-10" >Any Help? Contact Visita <a href="/support" className="text-blue-600 hover: ml-2 cursor-pointer" >Help Center </a></h1>

       
          </div>

      </div>
      
    </div>
  );
}

export default Successfull;
