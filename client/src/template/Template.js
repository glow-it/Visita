import React, { useEffect, useState } from "react";
import { Spinner, Tooltip, useToast } from "@chakra-ui/react";
import { QRCode } from "react-qrcode-logo";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
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
import { Toast } from "../miniComponents/Toast";

function Template({preview}) {
  const toast = useToast();
  let params = useParams();
  let [cardDatas, setCardDatas] = useState([]);
  let [products, setProducts] = useState([]);
  let [galleryImages, setGalleryImages] = useState([]);
  let [ytVideos, setYtVideos] = useState([]);
  let [feedbacks, setFeedbacks] = useState([]);
  let navigate = useNavigate()
  let location = useLocation()
  let [bgImage, setBgImage] = useState();  
  let [isCardLoaded, setIsCardLoaded] = useState(false);  
  let [specialities, setSpecialities] = useState([]);  
  let [features, setFeatures] = useState([]);  


  axios.get('/bg-images').then((response)=>{
    console.log(response.data);
    response.data.map((data)=> {
      if(data.name == cardDatas.theme_color){
        setBgImage(data.image_url)
      }
    })
  })

  // Get Card Datas
  useEffect(() => {


     // Function To Capitalize Strings
 function capitalize(string) {
  return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
    letter.toUpperCase()
  );





}


    axios
      .get("/card/" + params.comp_name)
      .then((response) => {

         // Set Manifest Dynamically
         var myDynamicManifest = {
          "name": capitalize(response.data.company_name),
          "short_name": capitalize(response.data.company_name),
          "description": capitalize(response.data.about),
          "start_url": `/#/${params.comp_name}`,
          "background_color": "#fff",
          "theme_color": "#fff",
          "display": "standalone",
          "scope": `/#/${params.comp_name}`,
          "icons": [{
            "src": response.data.logo.replace(/^http:\/\//i, 'https://'),
            "sizes": "256x256",
            "type": "image/png"
          }]
        }
        const stringManifest = JSON.stringify(myDynamicManifest);
        const blob = new Blob([stringManifest], {type: 'application/json'});
        const manifestURL = URL.createObjectURL(blob);
        document.querySelector('#my-manifest-placeholder').setAttribute('href', manifestURL);

        setCardDatas(response.data);
        setProducts(response.data.products);
        setGalleryImages(response.data.image_gallery);
        setYtVideos(response.data.yt_videos);
        setFeedbacks(response.data.feedbacks);
        setSpecialities(response.data.specials.split(','))
        setFeatures(response.data.features.split(','))

        setIsCardLoaded(true)

        

        if(response.data.isActivated) {
          document.title = capitalize(response.data.company_name) + ' | Mini Website';

        // Set Favicon
        var link = document.querySelector("link[rel~='icon']");
        if (!link) {
          link = document.createElement("link");
          link.rel = "icon";
          document.getElementsByTagName("head")[0].appendChild(link);
        }
        link.href = response.data.logo.replace(/^http:\/\//i, 'https://');
        }


        // Update View Count
        axios.post(`/update/view/${response.data.company_name}`)

        // Calculate How Much Days Ago Created This Card
        var date1, date2;
        //define two date object variables with dates inside it
        date1 = response.data.created_at;
        date2 = new Date();

        //calculate time difference
        var time_difference = date2.getTime() - parseInt(date1);

        //calculate days difference by dividing total milliseconds in a day
        var days_difference = time_difference / (1000 * 60 * 60 * 24);

        let days = Math.trunc(days_difference)

        if(days > 0) {
          if(!response.data.isActivated){
            navigate(`/activate-warning/${response.data.company_name}`)
          }
        }

        if(days < 1) {
          document.title = capitalize(response.data.company_name) + ' || Mini Website';

          // Set Favicon
          var link = document.querySelector("link[rel~='icon']");
          if (!link) {
            link = document.createElement("link");
            link.rel = "icon";
            document.getElementsByTagName("head")[0].appendChild(link);
          }
          link.href = response.data.logo.replace(/^http:\/\//i, 'https://');
        }
      



      })
      .catch((err) => {

        Toast({
          status:'error',
          title: "This website is not in our server",
          postition: 'top',
          toast
        })
        navigate('/')
      });


          // Set Manifest Icon and Name Dynamically
    let iconUrl = cardDatas.logo && cardDatas.logo.replace(/^http:\/\//i, 'https://'); 
    let manifest = { 
      name: cardDatas && cardDatas.company_name, 
      icons: [{ src: iconUrl, sizes: "512x512", type:"image/png" }] 
    }; 
    let content = encodeURIComponent(JSON.stringify(manifest)); 
    let url = "data:application/manifest+json,"+content; 
    let element = document.createElement('link'); 
    element.setAttribute('rel', 'manifest'); 
    element.setAttribute('href', url); 
    document.querySelector('head').appendChild(element);
    
    
    
    


  }, []);

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  function copyCardUrl() {
    navigator.clipboard.writeText(window.location.href);
    Toast({
      status:'success',
      title: 'Card copied!',
      postition: 'top',
      toast
    })
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




 


  return (
   <div>


<div className={`w-full bg-white absolute z-[100] ${isCardLoaded? 'hidden' : 'flex'}  justify-center`} >
    <div className='h-screen w-full top-0 flex flex-col items-center mt-44 ' >
    <Spinner  thickness='4px'
  speed='0.5s' size='lg' color='#0062FF' />
        <h1 className='capitalize text-xl font-visita-medium mt-8' >{params.comp_name.replace(/[-]/g," ")}</h1>
    </div>
      </div>




     <div className=" flex justify-center items-center pb-24">  





<div className={`${preview ? "w-full" : "lg:w-4/12"}  w-full `}>

{
  localStorage.getItem('isAdmin') == "true" ?
  <div onClick={()=> navigate('/manage/card/' + cardDatas.company_name)} className="w-full h-14 bg-blue-600  text-white flex z-50 items-center justify-center cursor-pointer">
  <h1 className="font-visita-bold ">Manage website</h1>
  <span className="ml-1 flex items-center justify-center" ><ion-icon name="arrow-forward"></ion-icon></span>
</div>
: ''
}

{
   cardDatas && cardDatas.tagline ?
  <div  className={`w-full py-3 bg-white text-center border-b-2 px-4 border-b-${theme_color}-600 text-${theme_color}-600  text-white flex z-50 items-center justify-center cursor-pointer text-sm`}>
  <h1 className="font-visita-bold ">{cardDatas && cardDatas.tagline}</h1>
</div>
: ''
}



  <div
    id="home"
    style={{
      backgroundImage: `url(${bgImage && bgImage.replace(/^http:\/\//i, 'https://')})`,
    }}
    className=" template-1 flex justify-center bg-no-repeat bg-cover "
  >



    <div className="card">
      <span className={`z-50 absolute top-32  right-4 text-white text-xs font-visita-medium py-1 px-2 border border-white  rounded-full`}>
        Views: {cardDatas && cardDatas.views}
      </span>

      <Link to={`/${cardDatas && cardDatas.company_name}/products`} className={`z-50 absolute top-32  left-4 text-${theme_color}-600 text-2xl font-visita-medium  py-2 px-2 flex items-center justify-center rounded-full bg-white `}>
      <ion-icon name="cart"></ion-icon>
      </Link>

      <div className=" container  w-full">
        <div className=" w-full mt-12 px-8 flex flex-col items-center justify-center">
          <img
            id="logo"
            src={cardDatas.logo && cardDatas.logo.replace(/^http:\/\//i, 'https://')}
            alt="Dp-Template-1"
            className={`logo  rounded-full ring-4 ring-offset-4 ring-${theme_color}-500`}
          />

          <div className=" w-full h-full flex flex-col items-center">
            <h1 className="capitalize text-white text-3xl font-visita-bold ml-4 mt-6">
              {cardDatas && cardDatas.company_name}
            </h1>
            <h1 className="capitalize text-white text-xl font-visita-medium ml-4 mt-1">
              {cardDatas && cardDatas.company_category}
            </h1>
            
            
          </div>
        </div>

        <div className=" w-full h-24 mt-8 flex justify-evenly items-center">
          {cardDatas && cardDatas.phone_no != "" ? (
            <a
              href={call_url}
              className={`h-10 cursor-pointer w-10 ring-4 ring-offset-4 bg-black ring-${theme_color}-600  rounded-full flex justify-center items-center`}
            >
              <span className=" text-2xl flex items-center justify-center text-white">
                <ion-icon name="call"></ion-icon>
              </span>
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.whatsapp_no != "" ? (
            <a
              href={message_whatsapp_url}
              className={`h-10 cursor-pointer w-10 ring-4 ring-offset-4 bg-black ring-${theme_color}-600  rounded-full flex justify-center items-center`}
            >
              <span className=" text-2xl flex items-center justify-center text-white">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </span>
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.email_id != "" ? (
            <a
              href={mail_url}
              className={`h-10 cursor-pointer w-10 ring-4 ring-offset-4 bg-black ring-${theme_color}-600  rounded-full flex justify-center items-center`}
            >
              <span className=" text-2xl flex items-center justify-center text-white">
                <ion-icon name="mail"></ion-icon>
              </span>
            </a>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.website != "" ? (
            <a
              href={website_url}
              className={`h-10 cursor-pointer w-10 ring-4 ring-offset-4 bg-black ring-${theme_color}-600  rounded-full flex justify-center items-center`}
            >
              <span className=" text-2xl flex items-center justify-center text-white">
                <ion-icon name="globe"></ion-icon>
              </span>
            </a>
          ) : (
            ""
          )}
        </div>

        <div className=" px-6">
          <div
            className={`w-full h-12 border-2 text-white bg-black/70 border-${theme_color}-500 mt-4 flex items-center rounded-full`}
          >
            <span className=" ml-6 text-lg flex items-center font-visita-medium">
              <ion-icon name="call"></ion-icon>{" "}
              <span className=" ml-3">
                +91 {cardDatas && cardDatas.phone_no}
              </span>{" "}
            </span>
          </div>
          {cardDatas && cardDatas.alt_phone_no != "" ? (
            <div
              className={`w-full h-12 border-2 text-white bg-black/70 border-${theme_color}-500 mt-4 flex items-center rounded-full`}
            >
              <span className=" ml-6 text-lg flex items-center font-visita-medium">
                <ion-icon name="call"></ion-icon>{" "}
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
              className={`w-full h-12 border-2 text-white bg-black/70 border-${theme_color}-500 mt-4 flex items-center rounded-full`}
            >
              <span className=" ml-6 text-sm flex items-center font-visita-medium">
                <ion-icon name="mail"></ion-icon>{" "}
                <span className=" ml-3">{cardDatas.email_id}</span>{" "}
              </span>
            </div>
          ) : (
            ""
          )}

          {cardDatas && cardDatas.location != "" ? (
            <div
              className={`w-full  py-3 border-2 text-white bg-black/70 border-${theme_color}-500 mt-4 flex items-center rounded-full`}
            >
              <span className=" ml-6 text-sm flex items-center font-visita-medium">
                <ion-icon name="location"></ion-icon>{" "}
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
              className={`w-full h-10 border-2 pl-4 font-visita-medium text-black bg-white border-${theme_color}-500  flex items-center rounded-full`}
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
              className={`cursor-pointer  h-10 rounded-full bg-gradient-to-r  from-${theme_color}-700 to-${theme_color}-500 w-44 bg-red-500 absolute right-0 flex items-center justify-center`}
            >
              <span className=" text-sm flex items-center font-visita-medium text-white">
                <ion-icon name="logo-whatsapp"></ion-icon>{" "}
                <span className=" ml-1">Share To Whatsapp</span>{" "}
              </span>
            </div>
          </div>

          <div className=" w-full flex flex-wrap items-center justify-center mt-8">
{/* 
          <button
          id="appDownloadButton"
            className={`flex w-full justify-center mb-4 items-center py-3 px-6 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-500  font-visita-bold text-lg`}
          >
            Save Card <span className=" ml-1 text-white text-xl"></span>
            <ion-icon name="arrow-down-circle"></ion-icon>
          </button>
           */}
           
           {
            cardDatas && cardDatas.gmap_location ?
            <button
            onClick={()=> window.open(cardDatas.gmap_location)}
            className={`flex justify-center items-center py-3 px-6 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-500  font-visita-bold text-lg mr-3`}
          >
            Location <span className=" ml-1 text-white text-xl"></span>
            <ion-icon name="location"></ion-icon>
          </button>
          : ''
           }

            <button
              onClick={onOpen}
              className={`flex justify-center items-center py-3 px-6 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-500  font-visita-bold text-lg`}
            >
              Share
              <span className=" ml-1 text-white text-xl"></span>
              <ion-icon name="share-social"></ion-icon>
            </button>
          </div>
          <div className={`${cardDatas && cardDatas.facebook_link == "" && cardDatas && cardDatas.twitter_link == "" && cardDatas && cardDatas.instagram_link == "" && cardDatas && cardDatas.linkedin_link == "" && cardDatas && cardDatas.youtube_link == "" && cardDatas && cardDatas.pinterest_link == "" ? 'invisible' : 'visible'} flex bg-white justify-center  px-4 h-12 my-16 items-center rounded-full`}>
            {cardDatas && cardDatas.facebook_link != "" ? (
              <i
                onClick={() =>
                  window.open(cardDatas && cardDatas.facebook_link)
                }
                className="  cursor-pointer fa-brands fa-facebook text-4xl my-12 rounded-full mr-4 text-blue-500 "
              ></i>
            ) : (
              ""
            )}

            {cardDatas && cardDatas.twitter_link != "" ? (
              <i
                onClick={() =>
                  window.open(cardDatas && cardDatas.twitter_link)
                }
                className=" cursor-pointer fa-brands fa-twitter text-3xl my-12 rounded-full mr-4 text-cyan-500 "
              ></i>
            ) : (
              ""
            )}

            {cardDatas && cardDatas.instagram_link != "" ? (
              <i
                onClick={() =>
                  window.open(cardDatas && cardDatas.instagram_link)
                }
                className=" cursor-pointer fa-brands fa-instagram text-3xl my-12 rounded-full mr-4 text-purple-500 "
              ></i>
            ) : (
              ""
            )}

            {cardDatas && cardDatas.linkedin_link != "" ? (
              <i
                onClick={() =>
                  window.open(cardDatas && cardDatas.linkedin_link)
                }
                className=" cursor-pointer fa-brands fa-linkedin text-3xl my-12 rounded-full mr-4 text-blue-500 "
              ></i>
            ) : (
              ""
            )}

            {cardDatas && cardDatas.youtube_link != "" ? (
              <i
                onClick={() =>
                  window.open(cardDatas && cardDatas.youtube_link)
                }
                className=" cursor-pointer fa-brands fa-youtube text-3xl my-12 rounded-full mr-4 text-red-500 "
              ></i>
            ) : (
              ""
            )}

            {cardDatas && cardDatas.pinterest_link != "" ? (
              <i
                onClick={() =>
                  window.open(cardDatas && cardDatas.pinterest_link)
                }
                className=" cursor-pointer fa-brands fa-pinterest text-3xl my-12 rounded-full mr-4 text-red-500 "
              ></i>
            ) : (
              ""
            )}
          </div>

          <Modal
            isCentered
            onClose={onClose}
            isOpen={isOpen}
            motionPreset="slideInBottom"
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader></ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <div className=" w-full h-full flex flex-wrap justify-center">
                  <a
                    href={share_whatsapp_url}
                    className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}
                  >
                    <span className={`text-${theme_color}-600 text-3xl`}>
                      <ion-icon name="logo-whatsapp"></ion-icon>
                    </span>
                  </a>

                  <a
                    href={share_sms_url}
                    className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}
                  >
                    <span className={`text-${theme_color}-600 text-3xl`}>
                      <ion-icon name="chatbubbles"></ion-icon>
                    </span>
                  </a>

                  <a
                    href={share_facebook_url}
                    className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}
                  >
                    <span className={`text-${theme_color}-600 text-3xl`}>
                      <ion-icon name="logo-facebook"></ion-icon>
                    </span>
                  </a>

                  <a
                    href={share_twitter_url}
                    className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}
                  >
                    <span className={`text-${theme_color}-600 text-3xl`}>
                      <ion-icon name="logo-twitter"></ion-icon>
                    </span>
                  </a>

                  <a
                    href={share_linkedin_url}
                    className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}
                  >
                    <span className={`text-${theme_color}-600 text-3xl`}>
                      <ion-icon name="logo-linkedin"></ion-icon>
                    </span>
                  </a>
                </div>
              </ModalBody>
              <ModalFooter>
                <div
                  className={` w-full h-16 flex items-center rounded-full border-2 border-${theme_color}-600 pl-4`}
                >




<span
                    onClick={copyCardUrl}
                    className={`flex text-${theme_color}-600 font-visita-medium text-md w-96`}
                  >
                   

                    <span
                      className={`mr-2 cursor-pointer text-${theme_color}-900 text-xl flex items-center`}
                    >
                       <Tooltip hasArrow isOpen={true}   px='4' bg='black' py='4' color='white' rounded='xl' label='click to copy!' placement='top'>
                      <ion-icon name="copy"></ion-icon>
                      </Tooltip>
                    </span>
                    
                    {window.location.href}
                  </span>




                  


                </div>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </div>
      </div>
    </div>
  </div>

  {/* Enter Customer Details Form */}

{
  cardDatas && cardDatas.show_customer_details_popop == 'true' ?
  <div className=" w-full h-[450px] flex flex-col items-center justify-center relative">
  <h1
    className={`text-lg  text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 absolute top-0 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500`}
  >Add Your Details</h1>



<div class="w-full px-4 flex flex-col items-center mt-10">
  <form
    action={`/submit/customer-details/${cardDatas && cardDatas.company_name}`}
    method="POST"
    class="bg-white shadow-md rounded-3xl w-full px-6  pt-8 pb-8 mb-4"
    id="customer-details-form"
  >
    <div class="mb-4">
      <label
        class="block text-gray-700 text-sm font-visita-bold mb-2"
        for="username"
      >
        Name
      </label>
      <input
        class="shadow-sm appearance-none border rounded-full font-visita-medium w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Name"
        name="name"
      />
    </div>
    <div class="mb-6">
      <label
        class="block text-gray-700 text-sm font-visita-bold mb-2"
        for="password"
      >
        Phone Number
      </label>
      <input
        class="rounded-full shadow-sm font-visita-medium appearance-none border w-full py-3  px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
        placeholder="Enter your phoneno"
        name="phone_no"
      />
    </div>
    <div class="flex items-center justify-start">
      <button
        onClick={() =>
          {
            document.getElementById("customer-details-form").submit();
            setTimeout(()=> {
              Toast({
                status:'success',
                title: 'Added your details',
                postition: 'top',
                toast
              })
            },1000)
          }
        }
        class={`font-visita-bold py-2 px-6 rounded-full text-white bg-${cardDatas && cardDatas.theme_color}-600`}
      >
        Submit Details
      </button>
    </div>
  </form>
</div>



  </div>
  : ''
}

  {/* Scan qr Code */}
  <div className=" w-full h-72 flex flex-col items-center justify-center relative">
    <h1
      className={`text-lg  text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 absolute top-0 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500`}
    >
      Scan QR Code to go to Website
    </h1>
    <div className="mt-10">
      <QRCode
        value={window.location.href}
        eyeRadius={10}
        logoImage={cardDatas.logo && cardDatas.logo.replace(/^http:\/\//i, 'https://')}
        logoWidth={30}
        logoHeight={30}
        qrStyle="dots"
        fgColor={cardDatas && cardDatas.theme_color}
      />
    </div>
  </div>

  



  {/* About Us */}
  <div
    id="about"
    className=" w-full py-24 flex flex-col items-center justify-center relative px-6"
  >
    <h1
      className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 absolute top-0 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500`}
    >
      About Us
    </h1>
    <h1 className=" text-xl font-visita-medium w-[300px]">
      {cardDatas && cardDatas.since != "" ? (
        <span className="  text-lg font-visita-bold">
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
      <div className=" flex flex-col items-start">
        <span className={`  text-xl text-${theme_color}-600 font-visita-bold text-lg mt-8 mb-6 flex`}>
          Our Specialities <span className="ml-1 flex items-center justify-center" ><ion-icon name="arrow-down-circle"></ion-icon></span>
        </span>
        {
          specialities.map((data)=> {
            return(
<h1 className=" text-lg font-visita-medium list-item mb-4">
          {data}
          </h1>
            )
          })
        }
        
      </div>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.features != "" ? (
      <div className=" flex flex-col items-start">
        <span className={`  text-xl text-${theme_color}-600 font-visita-bold text-lg mt-8 mb-6 flex`}>
          Our Features <span className="ml-1 flex items-center justify-center" ><ion-icon name="arrow-down-circle"></ion-icon></span>
        </span>
        {
          features.map((data)=> {
            return(
<h1 className=" text-lg font-visita-medium list-item mb-4">
          {data}
          </h1>
            )
          })
        }
        
      </div>
    ) : (
      ""
    )}
  </div>

  {/* Products And Services */}
  <div
    id="products"
    className=" w-full  flex flex-col items-center justify-center relative px-6"
  >
    <h1
      className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 absolute top-0 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500`}
    >
      Products & Services
    </h1>

    {/* Products */}

    {products &&
      products
        .filter((data, index) => {
          return data.product_name != "" && index < 3;
        })
        .map((data,index) => {
          return (
            <div
              z
              div
              className={`w-full pb-12 mb-8 px-8 shadow-xl border-2 border-${theme_color}-500  rounded-3xl flex flex-col items-center relative ${index == 0 ? 'mt-20' : 'mt-2'}`}
            >
              <img
                src={data.product_image.replace(/^http:\/\//i, 'https://')}
                className="  w-full rounded-3xl py-6  offer-image"
              />
              <h1 className=" pt-6 capitalize text-center text-xl font-visita-bold">
                {data.product_name}
              </h1>

              <h1 className=" mt-4 capitalize text-center  text-md font-visita-medium text-slate-400">
                {data.product_description}
              </h1>

              <h1 className=" pt-4 capitalize font-visita-medium text-green-500 text-xl">
                <span className=" mr-2 text-slate-600 line-through">
                  {`${data.product_orgprice != "" ? "₹" + data.product_orgprice : '' }`}
                </span>
                {`${data.product_offerprice != "" ? "₹" + data.product_orgprice : '' }`}
              </h1>
              <a
                href={`https://api.whatsapp.com/send/?phone=+91${cardDatas && cardDatas.phone_no}&text=👋Hey,Enquiry For ${data.product_name}`}
                className={`flex justify-center items-center py-3 px-12 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-500  font-visita-bold text-lg mt-6`}
              >
                Enquiry Now
                <span className=" ml-1 text-white text-xl"></span>
                <ion-icon name="open"></ion-icon>
              </a>

              {data.product_link != "" ? (
                <a
                  href={data.product_link}
                  className={`flex justify-center  items-center py-3 px-12 border-2 border-${theme_color}-500 text-${theme_color}-500 rounded-full   font-visita-bold text-lg mt-2 `}
                >
                  View Product
                </a>
              ) : (
                ""
              )}
            </div>
          );
        })
        
        }

        {
          products && products.length != 0 ?
          <div className="w-full h-32  flex items-center justify-center">
          <button
                  onClick={()=> {navigate('/'+cardDatas.company_name+'/products')}}
                  className={`flex justify-center items-center py-3 px-12 border text-${theme_color}-600 rounded-full border-${theme_color}-600  font-visita-bold text-sm -mt-6`}
                >
                  View more products
                  <span className=" ml-1 text-white text-xl"></span>
                  <ion-icon name="arrow-forward"></ion-icon>
                </button>
          </div>
          : ''
        }


      


  </div>

  {/* Image Gallery */}

  <h1
    id="imagegallery"
    className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}
  >
    Image Gallery
  </h1>

  <Swiper
    spaceBetween={30}
    centeredSlides={true}
    autoplay={{
      delay: 2500,
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
              <img src={data.replace(/^http:\/\//i, 'https://')} />
            </SwiperSlide>
          );
        })}
  </Swiper>

  {/* Youtube Videos */}
  <div id="ytvideos" className=" flex flex-col items-center mt-6">
    <h1
      className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}
    >
      Youtube Videos
    </h1>

    {ytVideos &&
      ytVideos
        .filter((data) => {
          return data != "";
        })
        .map((data) => {

          var video_id = data.split("v=")[1];
          var ampersandPosition = video_id.indexOf("&");
          if (ampersandPosition != -1) {
            video_id = video_id.substring(0, ampersandPosition);
          }

          return (
            <iframe
              className=" rounded-xl my-4"
              src={`https://www.youtube.com/embed/${video_id}`}
              title="Introducing Dynamic Island on iPhone 14 Pro | Apple"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          );
        })}
  </div>

  {/* Payment Info */}
  <div id="paymentinfo" className=" flex flex-col mt-6">
    <h1
      className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}
    >
      Payment Info
    </h1>

    {cardDatas && cardDatas.paytm_number != "" ? (
      <span className=" font-visita-bold ml-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          Paytm Number
        </span>{" "}
        <br /> {cardDatas && cardDatas.paytm_number}
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.googlepay_number != "" ? (
      <span className=" font-visita-bold ml-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          Google Pay Number
        </span>{" "}
        <br /> {cardDatas && cardDatas.googlepay_number}
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.phonepe != "" ? (
      <span className=" font-visita-bold ml-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          PhonePe Number
        </span>{" "}
        <br /> {cardDatas && cardDatas.phonepe}
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.googlepay_qrcode != "" ? (
      <span className=" font-visita-bold ml-6 mt-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          GooglePay QrCode
        </span>{" "}
        <br />
        <img
          src={cardDatas.googlepay_qrcode && cardDatas.googlepay_qrcode.replace(/^http:\/\//i, 'https://')}
          className=" h-44"
        />
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.paytm_qrcode != "" ? (
      <span className=" font-visita-bold ml-6 mt-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          Paytm QrCode
        </span>{" "}
        <br />
        <img
          src={cardDatas.paytm_qrcode && cardDatas.paytm_qrcode.replace(/^http:\/\//i, 'https://')}
          className=" h-44"
        />
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.phonepe_qrcode != "" ? (
      <span className=" font-visita-bold ml-6 mt-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          PhonePe QrCode
        </span>{" "}
        <br />
        <img
          src={cardDatas.phonepe_qrcode && cardDatas.phonepe_qrcode.replace(/^http:\/\//i, 'https://')}
          className=" h-44"
        />
      </span>
    ) : (
      ""
    )}

    {/* Bank Details */}
  </div>

  <div id="bankdetails" className=" flex flex-col mt-6">
    <h1
      className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}
    >
      Bank Details
    </h1>

    {cardDatas && cardDatas.bank_name != "" ? (
      <span className=" font-visita-bold ml-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          Bank Name
        </span>{" "}
        <br /> {cardDatas && cardDatas.bank_name}
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.account_holder_name != "" ? (
      <span className=" font-visita-bold ml-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          Accound Holder Name
        </span>{" "}
        <br /> {cardDatas && cardDatas.account_holder_name}
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.bank_account_number != "" ? (
      <span className=" font-visita-bold ml-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          Bank Accound Number
        </span>{" "}
        <br />
        {cardDatas && cardDatas.bank_account_number}
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.bank_ifsc_code != "" ? (
      <span className=" font-visita-bold ml-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          Bank IFSC Code
        </span>{" "}
        <br />
        {cardDatas && cardDatas.bank_ifsc_code}
      </span>
    ) : (
      ""
    )}

    {cardDatas && cardDatas.gst != "" ? (
      <span className=" font-visita-bold ml-6 mb-5">
        <span className=" text-slate-600 text-md font-visita-medium">
          GST
        </span>{" "}
        <br />
        {cardDatas && cardDatas.gst}
      </span>
    ) : (
      ""
    )}
  </div>

  {/* Feedbacks */}
  <div id="feedbacks" className=" flex flex-col mt-6">
    <h1
      className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}
    >
      Feedbacks
    </h1>
  </div>

  {/* Testimornial */}
  <section className=" relative  bg-white overflow-hidden">
    <img
      className=" absolute top-0 left-0"
      src="flaro-assets/images/testimonials/gradient.svg"
      alt=""
    />
    <img
      className=" absolute bottom-0 right-0"
      src="flaro-assets/images/testimonials/gradient2.svg"
      alt=""
    />
    <div className=" relative z-10 container px-4 mx-auto">
      {/* Testimornial Wrapper */}

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
          } else if(Math.trunc(days_difference) == 1) {
            days = '1 day ago'
          }else {
            days = Math.trunc(days_difference) + " days ago";
          }

          return (
            <div className=" flex flex-wrap -m-3">
              <div className=" w-full  p-3">
                <div className=" p-6 h-full bg-white bg-opacity-60 border rounded-3xl">
                  <div className=" flex flex-col justify-between h-full">
                    <div className=" mb-5 block">
                      <div className=" flex flex-wrap mb-4 -m-2">
                        <div className=" w-auto p-2">
                          <h3 className=" font-visita-bold leading-normal">
                            {data.name}
                          </h3>
                        </div>
                      </div>
                      <p className=" text-lg font-visita-medium">
                        {data.feedback}
                      </p>
                    </div>
                    <div className=" block">
                      <p className=" text-sm text-gray-500 font-visita-medium">
                        {`${days}`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  </section>

  <div class="w-full px-4 flex flex-col items-center mt-6">
    <form
      action={`/update/feedback/${cardDatas && cardDatas.company_name}`}
      method="POST"
      class="bg-white shadow-md rounded-3xl w-full px-6  pt-6 pb-8 mb-4"
      id="feedback-form"
    >
      <div class="mb-4">
        <label
          class="block text-gray-700 text-sm font-visita-bold mb-2"
          for="username"
        >
          Name
        </label>
        <input
          class="shadow-sm appearance-none border rounded-md font-visita-medium w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Name"
          name="name"
        />
      </div>
      <div class="mb-6">
        <label
          class="block text-gray-700 text-sm font-visita-bold mb-2"
          for="password"
        >
          Feedback
        </label>
        <input
          class="shadow-sm font-visita-medium appearance-none border rounded-md w-full pt-4 pb-16  px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter your feedback"
          name="feedback"
        />
      </div>
      <div class="flex items-center justify-start">
        <button
          onClick={() =>
            document.getElementById("feedback-form").submit()
          }
          class={`font-visita-bold py-2 px-6 rounded-full text-white bg-${cardDatas && cardDatas.theme_color}-600`}
        >
          Send Feedback
        </button>
      </div>
    </form>
    <p class="text-center mt-8 text-gray-500 text-xs font-visita-medium pb-6">
      &copy;2022 Visita. All rights reserved. <br />
     
    </p>
    <span className="font-visita-bold -mt-4 text-center text-gray-500 text-xs pb-6">
      visitasmart.com
      </span>
  </div>
</div>

<div
  className={` ${
    preview
      ? "lg:w-[24%] bottom-14 rounded-3xl rounded-t"
      : "lg:w-[32.2%]"
  } w-full h-14 flex bg-${theme_color}-500 fixed bottom-0 overflow-scroll z-50`}
>
  <a
    
    className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
  >
    <span className=" text-white text-2xl">
      <ion-icon name="home"></ion-icon>
    </span>
    <span className=" font-visita-bold -mt-2 text-xs text-white">
      Home
    </span>
  </a>
  <a
    
    className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
  >
    <span className=" text-white text-2xl">
      <ion-icon name="person-circle"></ion-icon>
    </span>
    <span className=" font-visita-bold -mt-2 text-xs text-white">
      About us
    </span>
  </a>
  <a
    
    className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
  >
    <span className=" text-white text-2xl">
      <ion-icon name="cart"></ion-icon>
    </span>
    <span className=" font-visita-bold -mt-2 text-xs text-white">
      Products
    </span>
  </a>
  <a
    
    className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
  >
    <span className=" text-white text-2xl">
      <ion-icon name="images"></ion-icon>
    </span>
    <span className=" font-visita-bold -mt-2 text-xs text-white">
      Image Gallery
    </span>
  </a>
  <a
    
    className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
  >
    <span className=" text-white text-2xl">
      <ion-icon name="logo-youtube"></ion-icon>
    </span>
    <span className=" font-visita-bold -mt-2 text-xs text-white">
      Yt Videos
    </span>
  </a>
  <a
    
    className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
  >
    <span className=" text-white text-2xl">
      <ion-icon name="wallet"></ion-icon>
    </span>
    <span className=" font-visita-bold -mt-2 text-xs text-white">
      Payment Info
    </span>
  </a>
  <a
    
    className=" nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2"
  >
    <span className=" text-white text-xl">
      <i class="fa-solid fa-building-columns"></i>
    </span>
    <span className=" font-visita-bold -mt- text-xs text-white">
      Bank Details
    </span>
  </a>
  <a
    
    className=" nav-bottom h-full flex flex-col items-center pt-2"
  >
    <span className=" text-white text-xl">
      <i class="fa-solid fa-comment"></i>
    </span>
    <span className=" font-visita-bold -mt- text-xs text-white">
      Feedbacks
    </span>
  </a>
</div>
</div>
   </div>
  );
}

export default Template;
