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
import apiKeys from "../Api/apiKeys";
import Loading from "../miniComponents/Loading";

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
  let [isCardLoading, setIsCardLoading] = useState(true);  
  let [specialities, setSpecialities] = useState([]);  
  let [features, setFeatures] = useState([]);  


  axios.get(`${apiKeys.server_url}/bg-images`).then((response)=>{
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
      .get(`${apiKeys.server_url}/card/` + params.comp_name)
      .then((response) => {

         // Set Manifest Dynamically
         var myDynamicManifest = {
          "name": capitalize(response.data.company_name),
          "short_name": capitalize(response.data.company_name),
          "description": capitalize(response.data.about),
          "start_url": `/${params.comp_name}`,
          "background_color": "#fff",
          "theme_color": "#fff",
          "display": "standalone",
          "scope": `/${params.comp_name}`,
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

        setIsCardLoading(false)

        

        if(response.data.isActivated) {
          document.title = capitalize(response.data.company_name) + ' - ' + response.data.tagline;

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
        axios.post(`${apiKeys.server_url}/update/view/${response.data.company_name}`)

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
          document.title = capitalize(response.data.company_name) + ' - '+  response.data.tagline;

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




  function addFeedbackCard({name,feedback}) {
    let feedback_card_wrapper = document.getElementById('feedback_card_wrapper');
    
    const div = document.createElement('div');
div.className = 'flex flex-wrap -m-3';

const innerDiv = document.createElement('div');
innerDiv.className = 'w-full p-3';

const innerInnerDiv = document.createElement('div');
innerInnerDiv.className = 'p-6 h-full bg-white bg-opacity-60 border rounded-3xl';

const innerInnerInnerDiv = document.createElement('div');
innerInnerInnerDiv.className = 'flex flex-col justify-between h-full';

const nameDiv = document.createElement('div');
nameDiv.className = 'mb-5 block';

const nameInnerDiv = document.createElement('div');
nameInnerDiv.className = 'flex flex-wrap mb-4 -m-2';

const nameInnerInnerDiv = document.createElement('div');
nameInnerInnerDiv.className = 'w-auto p-2';

const h3 = document.createElement('h3');
h3.className = 'font-bold leading-normal';
h3.textContent = name;

const p = document.createElement('p');
p.className = 'text-lg font-visita-medium';
p.textContent = feedback;

const todayDiv = document.createElement('div');
todayDiv.className = 'block';

const todayP = document.createElement('p');
todayP.className = 'text-sm text-gray-500 font-visita-medium';
todayP.textContent = 'today';

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
   <div>

<Loading isLoading={isCardLoading} />





   
   </div>
  );
}

export default Template;
