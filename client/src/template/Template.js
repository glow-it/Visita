import React, { useEffect } from "react";
import { useToast } from '@chakra-ui/react'
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
} from '@chakra-ui/react'
    // core version + navigation, pagination modules:
   
    import { Swiper, SwiperSlide } from "swiper/react";
    // import Swiper and modules styles
    import 'swiper/css';
    import 'swiper/css/navigation';
    import 'swiper/css/pagination';

    import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import QRCode from "qrcode";
import { Autoplay, Navigation, Pagination } from "swiper";

function Template({preview}) {

  const toast = useToast()

  useEffect(()=> {

    var canvas = document.getElementById("qrcodecanvas");
    let qrCodeUrl = window.location.href

    QRCode.toCanvas(canvas, qrCodeUrl, function (error) {
      if (error) console.error(error);
      console.log("QR code successfully generated!");
    });
  },[])
  

  const { isOpen, onOpen, onClose } = useDisclosure()

  function copyCardUrl() {
    navigator.clipboard.writeText(window.location.href)
    toast({
      title: 'Card Copied!',
      status: 'success',
      duration: 2000,
      position: "top"
    })
  }


  let theme_color = 'purple'





  // URLS
  let message_whatsapp_url = 'https://api.whatsapp.com/send/?phone=+919946365417&text=%F0%9F%91%8BHey,Visita'
  let mail_url = "mailto:sprt.visita@gmail.com"
  let call_url = "tel:+919946365417"
  let website_url = "https://visitatest.netlify.app"
  let share_whatsapp_url = `https://api.whatsapp.com/send?text=${window.location.href}`
  let share_sms_url = `sms:?body=${window.location.href}}`
  let share_facebook_url = `https://www.facebook.com/sharer/sharer.php?u=${window.location.href}}`
  let share_twitter_url = `https://twitter.com/intent/tweet?text=${window.location.href}}`
  let share_linkedin_url = `https://www.linkedin.com/cws/share?url=${window.location.href}}`




  return (
  <div className="flex justify-center items-center ">




     <div className={`${preview ? 'w-full' : 'lg:w-4/12'}  w-full `} >
     
     <div id="home"
      style={{
        backgroundImage: `url("https://i.postimg.cc/t4MJdrZK/image.png")`,
      }}
      className="template-1 flex justify-center bg-no-repeat bg-cover "
    >



      <div className="card ">

      <span className="absolute top-4 right-4 text-white text-xs font-visita-medium border border-white py-1 px-2 rounded-full" >Views: 127</span>
       
        <div className="container  w-full">
          <div className="w-full mt-8 flex">
            <img
              id="logo"
              src="https://i.postimg.cc/FsCCJyhr/Blue-Berry-Bakes-Logo-page-0001.jpg"
              alt="Dp-Template-1"
              className={`logo ml-8 rounded-full ring-4 ring-offset-4 ring-${theme_color}-500`}
            />

            <div className="w-full h-full flex flex-col">
              <h1 className="text-white text-3xl font-visita-bold ml-4 mt-6">
                Blue Berry Bakers
              </h1> 
              <h1 className="text-white text-xl font-visita-medium ml-4 mt-1">
                Coolbar & Hotel
              </h1>
            </div>
          </div>

          <div className="w-full h-24 mt-8 flex justify-evenly items-center">
            <a href={call_url} className={`h-10 cursor-pointer w-10 ring-4 ring-offset-4 bg-black ring-${theme_color}-600  rounded-full flex justify-center items-center`}>
              <span className="text-2xl flex items-center justify-center text-white">
                <ion-icon name="call"></ion-icon>
              </span>
            </a>
            <a href={message_whatsapp_url} className={`h-10 cursor-pointer w-10 ring-4 ring-offset-4 bg-black ring-${theme_color}-600  rounded-full flex justify-center items-center`}>
              <span className="text-2xl flex items-center justify-center text-white">
                <ion-icon name="logo-whatsapp"></ion-icon>
              </span>
            </a>
            <a href={mail_url} className={`h-10 cursor-pointer w-10 ring-4 ring-offset-4 bg-black ring-${theme_color}-600  rounded-full flex justify-center items-center`}>
              <span className="text-2xl flex items-center justify-center text-white">
                <ion-icon name="mail"></ion-icon>
              </span>
            </a>
            <a href={website_url} className={`h-10 cursor-pointer w-10 ring-4 ring-offset-4 bg-black ring-${theme_color}-600  rounded-full flex justify-center items-center`}>
              <span className="text-2xl flex items-center justify-center text-white">
                <ion-icon name="globe"></ion-icon>
              </span>
            </a>
          </div>

          <div className="px-6">
            <div className={`w-full h-12 border-2 text-white bg-black/70 border-${theme_color}-500 mt-4 flex items-center rounded-full`}>
                <span className="ml-6 text-lg flex items-center font-visita-medium" ><ion-icon name="call"></ion-icon> <span className="ml-3">+91 9946365417</span> </span>
            </div>
            <div className={`w-full h-12 border-2 text-white bg-black/70 border-${theme_color}-500 mt-4 flex items-center rounded-full`}>
                <span className="ml-6 text-lg flex items-center font-visita-medium" ><ion-icon name="call"></ion-icon> <span className="ml-3">+91 9544562748</span> </span>
            </div>
            <div className={`w-full h-12 border-2 text-white bg-black/70 border-${theme_color}-500 mt-4 flex items-center rounded-full`}>
                <span className="ml-6 text-lg flex items-center font-visita-medium" ><ion-icon name="mail"></ion-icon> <span className="ml-3">arshadpyaseen@gmail.com</span> </span>
            </div>
            <div className={`w-full  py-3 border-2 text-white bg-black/70 border-${theme_color}-500 mt-4 flex items-center rounded-full`}>
                <span className="ml-6 text-sm flex items-center font-visita-medium" ><ion-icon name="location"></ion-icon> <span className="ml-3">PSRA Road Kaloor Cochin - Kochi </span> </span>
            </div>
           <div className="flex relative mt-12" >
           <input id="send_whatsapp_number" className={`w-full h-10 border-2 pl-4 font-visita-medium text-black bg-white border-${theme_color}-500  flex items-center rounded-full`} placeholder="+91">
            
            </input>
            <div onClick={()=> {
              let send_whatsapp_number = document.getElementById('send_whatsapp_number').value
              window.open(`https://api.whatsapp.com/send/?phone=+91${send_whatsapp_number}&text=${window.location.href}`)
            }} className={`cursor-pointer  h-10 rounded-full bg-gradient-to-r  from-${theme_color}-700 to-${theme_color}-500 w-44 bg-red-500 absolute right-0 flex items-center justify-center`}>
              <span className="text-sm flex items-center font-visita-medium text-white" ><ion-icon name="logo-whatsapp"></ion-icon> <span className="ml-1" >share to whatsapp</span> </span>
            </div>
           </div>


            <div className="w-full flex items-center justify-center mt-8">


              <button className={`flex justify-center items-center py-3 px-6 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-500  font-visita-bold text-lg mr-3`}>Save <span className="ml-1 text-white text-xl" ></span><ion-icon name="arrow-down-circle"></ion-icon></button>


              <button onClick={onOpen} className={`flex justify-center items-center py-3 px-6 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-500  font-visita-bold text-lg`}>Share<span className="ml-1 text-white text-xl" ></span><ion-icon name="share-social"></ion-icon></button>
            </div>
<div className="flex justify-center bg-white px-4 h-12 my-16 items-center rounded-full">


<i className=" cursor-pointer fa-brands fa-facebook text-4xl my-12 rounded-full mr-4 text-blue-500 "></i>
            <a className="cursor-pointer fa-brands fa-twitter text-3xl my-12 rounded-full mr-4 text-cyan-500 "></a>
            <a className="cursor-pointer fa-brands fa-instagram text-3xl my-12 rounded-full mr-4 text-purple-500 "></a>
            <a className="cursor-pointer fa-brands fa-linkedin text-3xl my-12 rounded-full mr-4 text-blue-500 "></a>
            <a className="cursor-pointer fa-brands fa-youtube text-3xl my-12 rounded-full mr-4 text-red-500 "></a>
            <a className="cursor-pointer fa-brands fa-pinterest text-3xl my-12 rounded-full mr-4 text-red-500 "></a>
</div>


          <Modal
        
        isCentered
        onClose={onClose}
        isOpen={isOpen}
        motionPreset='slideInBottom'
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
           <div className="w-full h-full flex flex-wrap justify-center">

           <a href={share_whatsapp_url} className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}>
            <span className={`text-${theme_color}-600 text-3xl`} ><ion-icon name="logo-whatsapp"></ion-icon></span>
           </a>

           <a href={share_sms_url} className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}>
            <span className={`text-${theme_color}-600 text-3xl`} ><ion-icon name="chatbubbles"></ion-icon></span>
           </a>

           <a href={share_facebook_url} className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}>
            <span className={`text-${theme_color}-600 text-3xl`} ><ion-icon name="logo-facebook"></ion-icon></span>
           </a>

           <a href={share_twitter_url} className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}>
            <span className={`text-${theme_color}-600 text-3xl`} ><ion-icon name="logo-twitter"></ion-icon></span>
           </a>


           <a href={share_linkedin_url} className={`h-16 w-16  rounded-full mx-2 my-2 ring-2 ring-offst-2 flex items-center justify-center ring-${theme_color}-600 cursor-pointer`}>
            <span className={`text-${theme_color}-600 text-3xl`} ><ion-icon name="logo-linkedin"></ion-icon></span>
           </a>

           </div>
          </ModalBody>
          <ModalFooter> 
            <div className={` w-full h-16 flex items-center rounded-full border-2 border-${theme_color}-600 pl-4`}>
            <span onClick={copyCardUrl} className={`flex text-${theme_color}-600 font-visita-medium text-md w-96`} ><span className={`mr-2 cursor-pointer text-${theme_color}-900 text-xl flex items-center`} ><ion-icon name="copy"></ion-icon></span>{window.location.href}</span>
            </div>


          </ModalFooter>
        </ModalContent>
      </Modal>


          </div>
        </div>
      </div>
    </div>

    {/* Scan qr Code */}
    <div className="w-full h-72 flex flex-col items-center justify-center relative">
      <h1 className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 absolute top-0 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500`}>Scan QR Code to go to Visiting Card</h1>
      <canvas className="h-96 mt-12" id="qrcodecanvas" ></canvas>
    </div>

    {/* About Us */}
    <div id="about" className="w-full py-24 flex flex-col items-center justify-center relative px-6">
      <h1 className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 absolute top-0 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500`}>About Us</h1>
      <h1 className="text-xl font-visita-medium" >
        <span className=" text-lg font-visita-bold" >Est 1994</span> <br />
         Google LLC is an American multinational technology company that focuses on search engine technology,</h1>


            {/* Specialities */}
     <div className="flex flex-col items-start">
     <span className=" text-md font-visita-bold text-lg mt-8 mb-6 flex" >Our Specialities</span>
         <h1 className="text-xl font-visita-medium list-item mb-4" >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, nobis?</h1>
     </div>

     <div className="flex flex-col items-start">
     <span className=" text-md font-visita-bold text-lg mt-8 mb-6 flex" >Our Features</span>
         <h1 className="text-xl font-visita-medium list-item mb-4" >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Totam, nobis?</h1>
     </div>


    </div>

{/* Products And Services */}
    <div id="products" className="w-full  flex flex-col items-center justify-center relative px-6">
      <h1 className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 absolute top-0 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500`}>Products & Services</h1>



     {/* Products */}
     <div className={`w-full pb-12 mb-8 shadow-xl border-2 border-${theme_color}-500  rounded-3xl flex flex-col items-center relative mt-20`}>
     <img src="https://i.pinimg.com/736x/bb/c4/5f/bbc45ff75eff8ac2bc602936f4d9e76b--juice.jpg" className="h-full  w-full rounded-3xl offer-image" />
     <h1 className="pt-6 text-xl font-visita-bold" >Tasty Juices</h1>
     <h1 className="pt-3 font-visita-medium text-green-500 text-xl" ><span className="mr-2 text-slate-600 line-through" >₹99</span>₹29</h1>
     <a href="https://api.whatsapp.com/send/?phone=9946365417&text=👋Hey,Enquiry%20For%20-%20Smart%20Digital%20Visiting%20Card" className={`flex justify-center items-center py-3 px-12 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-500  font-visita-bold text-lg mt-6`}>Enquiry Now<span className="ml-1 text-white text-xl" ></span><ion-icon name="open"></ion-icon></a>

     <a href="" className={`flex justify-center  items-center py-3 px-12 border-2 border-${theme_color}-500 text-${theme_color}-500 rounded-full   font-visita-bold text-lg mt-2 `}>View Product<span className="ml-1 text-white text-xl" ></span><ion-icon name="link"></ion-icon></a>
     </div>

    
    
    </div>


      {/* Image Gallery */}

      <h1 id="imagegallery" className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}>Image Gallery</h1>

     
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
        className="mySwiper"
      >
        <SwiperSlide><img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/pride-whopper-tease-lc-220603-bae464.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/pride-whopper-tease-lc-220603-bae464.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/pride-whopper-tease-lc-220603-bae464.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/pride-whopper-tease-lc-220603-bae464.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/pride-whopper-tease-lc-220603-bae464.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/pride-whopper-tease-lc-220603-bae464.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/pride-whopper-tease-lc-220603-bae464.jpg" alt="" /></SwiperSlide>
        <SwiperSlide><img src="https://media-cldnry.s-nbcnews.com/image/upload/rockcms/2022-06/pride-whopper-tease-lc-220603-bae464.jpg" alt="" /></SwiperSlide>
      

      </Swiper>


{/* Youtube Videos */}
      <div id="ytvideos" className="flex flex-col items-center mt-6">
      <h1 className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}>Youtube Videos</h1>

<iframe className="rounded-xl my-4" src="https://www.youtube.com/embed/yZIy61LjFFU" title="Introducing Dynamic Island on iPhone 14 Pro | Apple" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe className="rounded-xl my-4" src="https://www.youtube.com/embed/cGHhqJhxrrk" title="Introducing Dynamic Island on iPhone 14 Pro | Apple" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
<iframe className="rounded-xl my-4" src="https://www.youtube.com/embed/PTZ-kZ1Zo-A" title="Introducing Dynamic Island on iPhone 14 Pro | Apple" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      </div>


{/* Payment Info */}
      <div id="paymentinfo" className="flex flex-col mt-6">
      <h1 className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}>Payment Info</h1>

        <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >Paytm Number</span> <br /> 9946365417</span>
        <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >GooglePay Number</span> <br /> 9946365417</span>
        <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >Phonepe Number</span> <br /> 9946365417</span>

        <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >GooglePay QrCode</span> <br /> 
        <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" className="h-44" /></span>

        <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >Paytm QrCode</span> <br /> 
        <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" className="h-44" /></span>

        <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >PhonePe QrCode</span> <br /> 
        <img src="https://www.qr-code-generator.com/wp-content/themes/qr/new_structure/markets/core_market_full/generator/dist/generator/assets/images/websiteQRCode_noFrame.png" className="h-44" /></span>


{/* Bank Details */}
      </div>

      <div id="bankdetails" className="flex flex-col mt-6">
      <h1 className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}>Bank Details</h1>

      <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >Bank Name</span> <br /> Union Bank Of India</span>

      <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >Accound Holder Name</span> <br /> Subair P</span>

      <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >Bank Accound Number</span> <br />364410007400</span>

      <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >Bank IFSC Code</span> <br />UNIBIC4433</span>

      <span className="font-visita-bold ml-6 mb-5" ><span className="text-slate-600 text-md font-visita-medium" >Bank GST</span> <br />2332455</span>

      </div>


        {/* Feedbacks */}
      <div id="feedbacks" className="flex flex-col mt-6">
      <h1 className={`text-lg text-white flex rounded-b-full justify-center items-center font-visita-bold bg-${theme_color}-500 w-full py-3 bg-gradient-to-r from-${theme_color}-700 to-${theme_color}-500 mb-6`}>Feedbacks</h1>
      </div>


     {/* Testimornial */}
     <section  className="relative  bg-white overflow-hidden">
  <img
    className="absolute top-0 left-0"
    src="flaro-assets/images/testimonials/gradient.svg"
    alt=""
  />
  <img
    className="absolute bottom-0 right-0"
    src="flaro-assets/images/testimonials/gradient2.svg"
    alt=""
  />
  <div className="relative z-10 container px-4 mx-auto">



        {/* Testimornial Wrapper */}

    <div className="flex flex-wrap -m-3">
      <div className="w-full  p-3">
        <div className="p-6 h-full bg-white bg-opacity-60 border rounded-3xl">
          <div className="flex flex-col justify-between h-full">
            <div className="mb-5 block">
              <div className="flex flex-wrap mb-4 -m-2">
                <div className="w-auto p-2">
                  <h3 className="font-semibold leading-normal mb-3">Jacob Jones</h3>
                  <p className="text-gray-500 uppercase">
                  <span className={`text-${theme_color}-500`} ><ion-icon name="star"></ion-icon></span>
                  <span className={`text-${theme_color}-500`} ><ion-icon name="star"></ion-icon></span>
                  <span className={`text-${theme_color}-500`} ><ion-icon name="star"></ion-icon></span>
                  <span className={`text-${theme_color}-500`} ><ion-icon name="star-outline"></ion-icon></span>
                  </p>
                </div>
              </div>
              <p className="text-lg font-medium">
                Your product is amazing and awesome. Should Buy 🤙🏻
              </p>
            </div>
            <div className="block">
              <p className="text-sm text-gray-500 font-medium">3 days ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>




  </div>
</section>



<div class="w-full px-4 flex flex-col items-center mt-6">
  <form class="bg-white shadow-sm rounded-3xl w-full px-6  pt-6 pb-8 mb-4">
    <div class="mb-4">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
        Name
      </label>
      <input class="shadow-sm appearance-none border rounded-md w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"  placeholder="Name" />
    </div>
    <div class="mb-6">
      <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
        Feedback
      </label>
      <input class="shadow-sm appearance-none border rounded-md w-full pt-4 pb-16  px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  placeholder="Enter your feedback" />
    </div>
    <div class="flex items-center justify-start">
      <button class=" font-visita-bold py-2 px-6 rounded-md text-white bg-blue-600" >
        Send Feedback
      </button>
    </div>
  </form>
  <p class="text-center text-gray-500 text-xs pb-6">
    &copy;2022 Visita. All rights reserved.
  </p>
</div>



   </div>

        <div className={` ${preview ? 'lg:w-[24%] bottom-14 rounded-3xl rounded-t' : 'lg:w-4/12'} w-full h-14 flex bg-${theme_color}-500 fixed bottom-0 overflow-scroll z-50`}>
            <a href="#home" className="nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2">
                <span className="text-white text-2xl" ><ion-icon name="home"></ion-icon></span>
                <span className="font-visita-bold -mt-2 text-xs text-white" >Home</span>
            </a>
            <a href="#about" className="nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2">
                <span className="text-white text-2xl" ><ion-icon name="person-circle"></ion-icon></span>
                <span className="font-visita-bold -mt-2 text-xs text-white" >About us</span>
            </a>
            <a href="#products" className="nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2">
                <span className="text-white text-2xl" ><ion-icon name="cart"></ion-icon></span>
                <span className="font-visita-bold -mt-2 text-xs text-white" >Products</span>
            </a>
            <a href="#imagegallery" className="nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2">
                <span className="text-white text-2xl" ><ion-icon name="images"></ion-icon></span>
                <span className="font-visita-bold -mt-2 text-xs text-white" >Image Gallery</span>
            </a>
            <a href="#ytvideos" className="nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2">
                <span className="text-white text-2xl" ><ion-icon name="logo-youtube"></ion-icon></span>
                <span className="font-visita-bold -mt-2 text-xs text-white" >Yt Videos</span>
            </a>
            <a href="#paymentinfo" className="nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2">
                <span className="text-white text-2xl" ><ion-icon name="wallet"></ion-icon></span>
                <span className="font-visita-bold -mt-2 text-xs text-white" >Payment Info</span>
            </a>
            <a href="#bankdetails" className="nav-bottom h-full border-r cursor-pointer flex flex-col items-center pt-2">
                <span className="text-white text-xl" ><i class="fa-solid fa-building-columns"></i></span>
                <span className="font-visita-bold -mt- text-xs text-white" >Bank Details</span>
            </a>
            <a href="#feedbacks" className="nav-bottom h-full flex flex-col items-center pt-2">
                <span className="text-white text-xl" ><i class="fa-solid fa-comment"></i></span>
                <span className="font-visita-bold -mt- text-xs text-white" >Feedbacks</span>
            </a>
        </div>

  </div>
  );
}

export default Template;




