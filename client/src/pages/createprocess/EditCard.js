import { Button, FormControl, FormLabel, Switch, useDisclosure } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateHeader from "../../components/CreateHeader";
import { useToast } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Toast } from "../../miniComponents/Toast";

function EditCard() {

  let navigate = useNavigate()
  let params = useParams()
  let company_name = params.comp_name

  


  const toast = useToast();
  const toastIdRef = React.useRef()

  let [previuos, setPrevious] = useState(false);
  let [skip, setSkip] = useState(false);
  let [processIndex, setProcessIndex] = useState(1);


  let [cardDatas,setCardDatas] = useState([])
  let [loading,setLoading] = useState(false)
  let [choosedThemeColor,setChoosedThemeColor] = useState('purple')
  let [themeColors,setThemeColors] = useState(["purple","slate","zinc","stone","red","orange","amber","yellow","lime","green","emerald","teal","cyan","sky","blue","indigo","violet","fuchsia","pink","rose"])
  let products = cardDatas && cardDatas.products
  let image_gallery = cardDatas && cardDatas.image_gallery



  useEffect(()=> {


    // If Check Is Show Customer Details Popup Enabled
    let show_popup_feature_1_toggle = document.getElementById('show_popup_feature_1_toggle');

    if(cardDatas && cardDatas.show_customer_details_popop == 'true'){
      show_popup_feature_1_toggle.checked = true
    }



    if(cardDatas.activated){
      var doc = prompt("Enter Card Password");
           
            if (doc != null) {
                if(doc != cardDatas.activated.access_password){
                  navigate('/')
                }
            }else{
              navigate('/')
            }
    }
  },[cardDatas])


    // Normal Use Effect
    useEffect(()=> {
      const imgPreview = document.getElementById("create-logo-preview");
     if( imgPreview.querySelector('img').src == ""){
      imgPreview.querySelector('img').classList.replace('visible','invisible')
     }else{
      imgPreview.querySelector('img').classList.replace('invisible','visible')
     }
    },[choosedThemeColor])

  let maximumProcesses = 7;

  // Last Confirm Modal Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure()

  useEffect(() => {


    document.title = "Visita | Update Website";

    axios.get('/card/' + company_name).then((response)=> {
        setCardDatas(response.data);
        setChoosedThemeColor(response.data.theme_color)
    }).catch((err)=> {
      toast({
        position: 'top',
        duration: 1500,
        render: () => (
          <div className='py-2 px-3 mt-14 rounded-full bg-red-50 border border-red-300 text-red-600 flex items-center justify-center' >
            <span className='mr-1 flex items-center justify-center' ><ion-icon name="close-circle-outline"></ion-icon></span>
            <span className="font-visita-medium text-sm">{err.message}</span>
          </div>
        ),
      })
    })

    // Logo Preview Show
    const chooseFile = document.getElementById("create-choose-logo");
    const imgPreview = document.getElementById("create-logo-preview");
    const chooseLogoButton = document.getElementById("choose_logo_button");
    const choose_theme_color = document.getElementById('choose_theme_color');

    chooseFile.addEventListener("change", function () {
      getImgData();
    });

    function getImgData() {
      const files = chooseFile.files[0];
      if (files) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(files);
        fileReader.addEventListener("load", function () {
          imgPreview.style.display = "block";
          imgPreview.querySelector('img').setAttribute('src',this.result)
          imgPreview.querySelector('img').classList.replace('invisible','visible')
          imgPreview.querySelector('img').classList.add('min-w-[100px]', 'min-h-[100px]')
          chooseLogoButton.innerText = "Change Logo";
          chooseLogoButton.style.marginLeft = "-20px";
          choose_theme_color.classList.add("active-choose-theme")
        });
      }
    }

    if (!previuos) {
      document.getElementById("previous_button").setAttribute("disabled", "");
    }
    if (!skip) {
      document.getElementById("skip_button").setAttribute("disabled", "");
    }

    let template_index_wrapper_all = document.querySelectorAll(
      ".template-redirect-button-wrapper"
    );

    template_index_wrapper_all.forEach((elem) => {
      elem.classList.add("invisible");
    });
  }, []);

  // Process Index Iterate
  useEffect(() => {
    // Remove Previous Disabled With Process Index
    if (processIndex > 1) {
      document
        .getElementById("previous_button")
        .removeAttribute("disabled", "");
    } else {
      document.getElementById("previous_button").setAttribute("disabled", "");
    }
    if (processIndex == 4) {
      document.getElementById("skip_button").removeAttribute("disabled", "");
    } else if (processIndex == 5) {
      document.getElementById("skip_button").removeAttribute("disabled", "");
    } else if (processIndex == 6) {
      document.getElementById("skip_button").removeAttribute("disabled", "");
    }else if (processIndex == 7) {
      document.getElementById("skip_button").style.display = 'none'
    } else {
      document.getElementById("skip_button").setAttribute("disabled", "");
    }

    // Submit Form Datas

    
  }, [processIndex]);









  // Handle Form Next Process Click
  function handleNextClick() {

    // Check Company Name Is Exists
    if( document.querySelector('.error-message').classList[3] != "text-red-600"){
 // Check If All Required Feilds Filled

 let currentForm;
 if (processIndex == 1) {
   currentForm = document.getElementById("process1");
 } else if (processIndex == 2) {
   currentForm = document.getElementById("process2");
 } else if (processIndex == 3) {
   currentForm = document.getElementById("process3");
 } else if (processIndex == 4) {
   currentForm = document.getElementById("process4");
 } else if (processIndex == 5) {
   currentForm = document.getElementById("process5");
 } else if (processIndex == 6) {
   currentForm = document.getElementById("process6");
 } else if (processIndex == 7) {
   currentForm = document.getElementById("process7");
 }
 
 let allAreFilled = true;
 currentForm.querySelectorAll("[required]").forEach(function (i) {
   if (!allAreFilled) return;
   if (i.type === "radio") {
     let radioValueCheck = false;
     currentForm.querySelectorAll(`[name=${i.name}]`).forEach(function (r) {
       if (r.checked) radioValueCheck = true;
     });
     allAreFilled = radioValueCheck;
     return;
   }
   if (!i.value) {
     allAreFilled = false;
     return;
   }
 });
 if (!allAreFilled) {
  Toast({
    status:'error',
    title: 'Fill all required fields',
    postition: 'top-right',
    description: 'Check again!',
    toast
  })
 } else {
   // Submit Datas
   if(processIndex == maximumProcesses) {
     onOpen()
   }
   setProcessIndex(processIndex == maximumProcesses ? maximumProcesses : processIndex + 1);
 }
    }

   

    
  }

   // Iterate When Choose Theme Use Effect
   useEffect(()=> {
    document.querySelectorAll('.theme_color').forEach((elem)=> {
      elem.classList.remove("ring-4")
    });
    document.getElementById(`choose-theme-${choosedThemeColor}`).classList.add("ring-4")
  },[choosedThemeColor])

  // Upload Files To Cloud
  async function uploadImage(files,id){
    toastIdRef.current = Toast({
      status:'loading',
      title: 'Uploading image...',
      postition: 'top-right',
      toast
    })

    const formData = new FormData();
    formData.append("file",files[0]);
    formData.append("upload_preset","xav0wsx1")

    let response = await axios.post("https://api.cloudinary.com/v1_1/dmi3cfl2v/image/upload",formData)
    document.getElementById(id).value = response.data.url

    if (toastIdRef.current) {
      toast.close(toastIdRef.current)
    }

  }


  function checkCompanyNameExists(value){
    // Check The Company Name Already Exists
      let company_name_input = document.querySelector('.company_name_input')
      axios.get('/card/all').then((response)=> {
        response.data.map((data)=> {

        if(data.company_name == value){

            company_name_input.classList.replace('bg-green-50','bg-red-50')
            company_name_input.classList.replace('border-green-500','border-red-500')
            company_name_input.classList.replace('text-green-900','text-red-900')
            company_name_input.classList.replace('placeholder-green-700','placeholder-red-700')

            document.querySelector('.error-message').classList.replace('text-green-600','text-red-600')
            document.querySelector('.error-message').innerText = 'Oh, snapp! Company name already exists'
          }else{

            company_name_input.classList.add('bg-green-50','border-green-500','text-green-900','placeholder-green-700')

            company_name_input.classList.replace('bg-red-50','bg-green-50')
            company_name_input.classList.replace('border-red-500','border-green-500')
            company_name_input.classList.replace('text-red-900','text-green-900')
            company_name_input.classList.replace('placeholder-red-700','placeholder-green-700')

            document.querySelector('.error-message').classList.replace('text-red-600','text-green-600')
            document.querySelector('.error-message').innerText = 'Well Done! Company name is available'


          }
        })
      })
  }




  return (
    <form
      action={`/updatecard/${company_name}`}
      method="POST"
      id="cardForm"
      className="h-screen w-full flex flex-col items-center"
    >


      


<CreateHeader processIndex={processIndex} loading={loading} hideIndicators={false} />



    {/* Last Confirm Modal */}
   

      <Modal  isOpen={isOpen} onClose={onClose}>
        <ModalOverlay bg="whiteAlpha.1000" backdropFilter="auto" backdropBlur="20px"  />
        <ModalContent display='flex' flexDirection='column' justifyContent='center' alignItems='center'  py='8' px='8' rounded='3xl'>
          <ModalHeader display='flex' flexDirection='column' justifyContent='center' alignItems='center' ><span className="font-visita-bold text-3xl text-center" >Are You Sure To Update?</span></ModalHeader>
          <ModalBody pb='4' display='flex' flexDirection='column' justifyContent='center' alignItems='center'>
            <span className="font-visita-medium text-center" >You can make sure that the information you provided is correct. <span className="text-blue-600 ml-1" >However, you can edit it later</span></span>
          </ModalBody>
          <ModalFooter display='flex'  justifyContent='center' alignItems='center'>
            <Button rounded='full' mr={3} variant='solid'  onClick={onClose}><span className="font-visita-bold" >Cancel</span></Button>


            <Button rounded='full' color='#fff' _hover bgColor='#0062FF'  onClick={()=> {
             setLoading(true)
             onClose()
             let cardForm = document.getElementById("cardForm");
                 cardForm.submit()
                 navigate('/loading/updating-website')
            }}>
              <span className="font-visita-bold" >Yes' Update Website</span>
            </Button>


          </ModalFooter>
        </ModalContent>
      </Modal>


      <div className="overlays">
        <svg
          className="absolute h-[600px] rotate-45 -top-[200px]"
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.18"
          viewBox="0 0 800 800"
        >
          <defs>
            <filter
              id="bbblurry-filter"
              width="400%"
              height="400%"
              x="-100%"
              y="-100%"
              colorInterpolationFilters="sRGB"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
            >
              <feGaussianBlur
                x="0%"
                y="0%"
                in="SourceGraphic"
                result="blur"
                stdDeviation="33"
              ></feGaussianBlur>
            </filter>
          </defs>
          <g filter="url(#bbblurry-filter)">
            <ellipse
              cx="545.335"
              cy="543.368"
              fill="hsla(290, 87%, 47%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
            <ellipse
              cx="142.474"
              cy="153.344"
              fill="hsla(167, 72%, 60%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
            <ellipse
              cx="348.797"
              cy="385.014"
              fill="hsla(272, 99%, 54%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
          </g>
        </svg>

        <svg
          className="absolute left-[50px] h-[500px] rotate-45"
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.18"
          viewBox="0 0 800 800"
        >
          <defs>
            <filter
              id="bbblurry-filter"
              width="400%"
              height="400%"
              x="-100%"
              y="-100%"
              colorInterpolationFilters="sRGB"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
            >
              <feGaussianBlur
                x="0%"
                y="0%"
                in="SourceGraphic"
                result="blur"
                stdDeviation="34"
              ></feGaussianBlur>
            </filter>
          </defs>
          <g filter="url(#bbblurry-filter)">
            <ellipse
              cx="470.989"
              cy="329.755"
              fill="hsla(212, 85%, 57%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
            <ellipse
              cx="244.044"
              cy="193.135"
              fill="hsla(167, 72%, 60%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
            <ellipse
              cx="365.551"
              cy="481.349"
              fill="hsla(272, 99%, 54%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
          </g>
        </svg>

        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1000"
      height="700"
      opacity="0.07"
      viewBox="0 0 800 800"
      className="absolute -left-56"
    >
      <g fill="none" stroke="hsla(212, 72%, 59%, 1)">
        <path d="M0 0H44.444V44.444H0z"></path>
        <path d="M44.444 0H88.888V44.444H44.444z"></path>
        <path d="M88.889 0H133.333V44.444H88.889z"></path>
        <path d="M133.333 0H177.777V44.444H133.333z"></path>
        <path d="M177.778 0H222.22199999999998V44.444H177.778z"></path>
        <path d="M222.222 0H266.666V44.444H222.222z"></path>
        <path d="M266.667 0H311.111V44.444H266.667z"></path>
        <path d="M311.111 0H355.555V44.444H311.111z"></path>
        <path d="M355.556 0H400V44.444H355.556z"></path>
        <path d="M400 0H444.444V44.444H400z"></path>
        <path d="M444.444 0H488.88800000000003V44.444H444.444z"></path>
        <path d="M488.889 0H533.333V44.444H488.889z"></path>
        <path d="M533.333 0H577.7769999999999V44.444H533.333z"></path>
        <path d="M577.778 0H622.222V44.444H577.778z"></path>
        <path d="M622.222 0H666.6659999999999V44.444H622.222z"></path>
        <path d="M666.667 0H711.111V44.444H666.667z"></path>
        <path d="M711.111 0H755.555V44.444H711.111z"></path>
        <path d="M755.556 0H800V44.444H755.556z"></path>
        <path d="M800 0H844.444V44.444H800z"></path>
        <path d="M0 44.444H44.444V88.888H0z"></path>
        <path d="M44.444 44.444H88.888V88.888H44.444z"></path>
        <path d="M88.889 44.444H133.333V88.888H88.889z"></path>
        <path d="M133.333 44.444H177.777V88.888H133.333z"></path>
        <path d="M177.778 44.444H222.22199999999998V88.888H177.778z"></path>
        <path d="M222.222 44.444H266.666V88.888H222.222z"></path>
        <path d="M266.667 44.444H311.111V88.888H266.667z"></path>
        <path d="M311.111 44.444H355.555V88.888H311.111z"></path>
        <path d="M355.556 44.444H400V88.888H355.556z"></path>
        <path d="M400 44.444H444.444V88.888H400z"></path>
        <path d="M444.444 44.444H488.88800000000003V88.888H444.444z"></path>
        <path d="M488.889 44.444H533.333V88.888H488.889z"></path>
        <path d="M533.333 44.444H577.7769999999999V88.888H533.333z"></path>
        <path d="M577.778 44.444H622.222V88.888H577.778z"></path>
        <path d="M622.222 44.444H666.6659999999999V88.888H622.222z"></path>
        <path d="M666.667 44.444H711.111V88.888H666.667z"></path>
        <path d="M711.111 44.444H755.555V88.888H711.111z"></path>
        <path d="M755.556 44.444H800V88.888H755.556z"></path>
        <path d="M800 44.444H844.444V88.888H800z"></path>
        <path d="M0 88.889H44.444V133.333H0z"></path>
        <path d="M44.444 88.889H88.888V133.333H44.444z"></path>
        <path d="M88.889 88.889H133.333V133.333H88.889z"></path>
        <path d="M133.333 88.889H177.777V133.333H133.333z"></path>
        <path d="M177.778 88.889H222.22199999999998V133.333H177.778z"></path>
        <path d="M222.222 88.889H266.666V133.333H222.222z"></path>
        <path d="M266.667 88.889H311.111V133.333H266.667z"></path>
        <path d="M311.111 88.889H355.555V133.333H311.111z"></path>
        <path d="M355.556 88.889H400V133.333H355.556z"></path>
        <path d="M400 88.889H444.444V133.333H400z"></path>
        <path d="M444.444 88.889H488.88800000000003V133.333H444.444z"></path>
        <path d="M488.889 88.889H533.333V133.333H488.889z"></path>
        <path d="M533.333 88.889H577.7769999999999V133.333H533.333z"></path>
        <path d="M577.778 88.889H622.222V133.333H577.778z"></path>
        <path d="M622.222 88.889H666.6659999999999V133.333H622.222z"></path>
        <path d="M666.667 88.889H711.111V133.333H666.667z"></path>
        <path d="M711.111 88.889H755.555V133.333H711.111z"></path>
        <path d="M755.556 88.889H800V133.333H755.556z"></path>
        <path d="M800 88.889H844.444V133.333H800z"></path>
        <path d="M0 133.333H44.444V177.777H0z"></path>
        <path d="M44.444 133.333H88.888V177.777H44.444z"></path>
        <path d="M88.889 133.333H133.333V177.777H88.889z"></path>
        <path d="M133.333 133.333H177.777V177.777H133.333z"></path>
        <path d="M177.778 133.333H222.22199999999998V177.777H177.778z"></path>
        <path d="M222.222 133.333H266.666V177.777H222.222z"></path>
        <path d="M266.667 133.333H311.111V177.777H266.667z"></path>
        <path d="M311.111 133.333H355.555V177.777H311.111z"></path>
        <path d="M355.556 133.333H400V177.777H355.556z"></path>
        <path d="M400 133.333H444.444V177.777H400z"></path>
        <path d="M444.444 133.333H488.88800000000003V177.777H444.444z"></path>
        <path d="M488.889 133.333H533.333V177.777H488.889z"></path>
        <path d="M533.333 133.333H577.7769999999999V177.777H533.333z"></path>
        <path d="M577.778 133.333H622.222V177.777H577.778z"></path>
        <path d="M622.222 133.333H666.6659999999999V177.777H622.222z"></path>
        <path d="M666.667 133.333H711.111V177.777H666.667z"></path>
        <path d="M711.111 133.333H755.555V177.777H711.111z"></path>
        <path d="M755.556 133.333H800V177.777H755.556z"></path>
        <path d="M800 133.333H844.444V177.777H800z"></path>
        <path d="M0 177.778H44.444V222.22199999999998H0z"></path>
        <path d="M44.444 177.778H88.888V222.22199999999998H44.444z"></path>
        <path d="M88.889 177.778H133.333V222.22199999999998H88.889z"></path>
        <path d="M133.333 177.778H177.777V222.22199999999998H133.333z"></path>
        <path d="M177.778 177.778H222.22199999999998V222.22199999999998H177.778z"></path>
        <path d="M222.222 177.778H266.666V222.22199999999998H222.222z"></path>
        <path d="M266.667 177.778H311.111V222.22199999999998H266.667z"></path>
        <path d="M311.111 177.778H355.555V222.22199999999998H311.111z"></path>
        <path d="M355.556 177.778H400V222.22199999999998H355.556z"></path>
        <path d="M400 177.778H444.444V222.22199999999998H400z"></path>
        <path d="M444.444 177.778H488.88800000000003V222.22199999999998H444.444z"></path>
        <path d="M488.889 177.778H533.333V222.22199999999998H488.889z"></path>
        <path d="M533.333 177.778H577.7769999999999V222.22199999999998H533.333z"></path>
        <path d="M577.778 177.778H622.222V222.22199999999998H577.778z"></path>
        <path d="M622.222 177.778H666.6659999999999V222.22199999999998H622.222z"></path>
        <path d="M666.667 177.778H711.111V222.22199999999998H666.667z"></path>
        <path d="M711.111 177.778H755.555V222.22199999999998H711.111z"></path>
        <path d="M755.556 177.778H800V222.22199999999998H755.556z"></path>
        <path d="M800 177.778H844.444V222.22199999999998H800z"></path>
        <path d="M0 222.222H44.444V266.666H0z"></path>
        <path d="M44.444 222.222H88.888V266.666H44.444z"></path>
        <path d="M88.889 222.222H133.333V266.666H88.889z"></path>
        <path d="M133.333 222.222H177.777V266.666H133.333z"></path>
        <path d="M177.778 222.222H222.22199999999998V266.666H177.778z"></path>
        <path d="M222.222 222.222H266.666V266.666H222.222z"></path>
        <path d="M266.667 222.222H311.111V266.666H266.667z"></path>
        <path d="M311.111 222.222H355.555V266.666H311.111z"></path>
        <path d="M355.556 222.222H400V266.666H355.556z"></path>
        <path d="M400 222.222H444.444V266.666H400z"></path>
        <path d="M444.444 222.222H488.88800000000003V266.666H444.444z"></path>
        <path d="M488.889 222.222H533.333V266.666H488.889z"></path>
        <path d="M533.333 222.222H577.7769999999999V266.666H533.333z"></path>
        <path d="M577.778 222.222H622.222V266.666H577.778z"></path>
        <path d="M622.222 222.222H666.6659999999999V266.666H622.222z"></path>
        <path d="M666.667 222.222H711.111V266.666H666.667z"></path>
        <path d="M711.111 222.222H755.555V266.666H711.111z"></path>
        <path d="M755.556 222.222H800V266.666H755.556z"></path>
        <path d="M800 222.222H844.444V266.666H800z"></path>
        <path d="M0 266.667H44.444V311.111H0z"></path>
        <path d="M44.444 266.667H88.888V311.111H44.444z"></path>
        <path d="M88.889 266.667H133.333V311.111H88.889z"></path>
        <path d="M133.333 266.667H177.777V311.111H133.333z"></path>
        <path d="M177.778 266.667H222.22199999999998V311.111H177.778z"></path>
        <path d="M222.222 266.667H266.666V311.111H222.222z"></path>
        <path d="M266.667 266.667H311.111V311.111H266.667z"></path>
        <path d="M311.111 266.667H355.555V311.111H311.111z"></path>
        <path d="M355.556 266.667H400V311.111H355.556z"></path>
        <path d="M400 266.667H444.444V311.111H400z"></path>
        <path d="M444.444 266.667H488.88800000000003V311.111H444.444z"></path>
        <path d="M488.889 266.667H533.333V311.111H488.889z"></path>
        <path d="M533.333 266.667H577.7769999999999V311.111H533.333z"></path>
        <path d="M577.778 266.667H622.222V311.111H577.778z"></path>
        <path d="M622.222 266.667H666.6659999999999V311.111H622.222z"></path>
        <path d="M666.667 266.667H711.111V311.111H666.667z"></path>
        <path d="M711.111 266.667H755.555V311.111H711.111z"></path>
        <path d="M755.556 266.667H800V311.111H755.556z"></path>
        <path d="M800 266.667H844.444V311.111H800z"></path>
        <path d="M0 311.111H44.444V355.555H0z"></path>
        <path d="M44.444 311.111H88.888V355.555H44.444z"></path>
        <path d="M88.889 311.111H133.333V355.555H88.889z"></path>
        <path d="M133.333 311.111H177.777V355.555H133.333z"></path>
        <path d="M177.778 311.111H222.22199999999998V355.555H177.778z"></path>
        <path d="M222.222 311.111H266.666V355.555H222.222z"></path>
        <path d="M266.667 311.111H311.111V355.555H266.667z"></path>
        <path d="M311.111 311.111H355.555V355.555H311.111z"></path>
        <path d="M355.556 311.111H400V355.555H355.556z"></path>
        <path d="M400 311.111H444.444V355.555H400z"></path>
        <path d="M444.444 311.111H488.88800000000003V355.555H444.444z"></path>
        <path d="M488.889 311.111H533.333V355.555H488.889z"></path>
        <path d="M533.333 311.111H577.7769999999999V355.555H533.333z"></path>
        <path d="M577.778 311.111H622.222V355.555H577.778z"></path>
        <path d="M622.222 311.111H666.6659999999999V355.555H622.222z"></path>
        <path d="M666.667 311.111H711.111V355.555H666.667z"></path>
        <path d="M711.111 311.111H755.555V355.555H711.111z"></path>
        <path d="M755.556 311.111H800V355.555H755.556z"></path>
        <path d="M800 311.111H844.444V355.555H800z"></path>
        <path d="M0 355.556H44.444V400H0z"></path>
        <path d="M44.444 355.556H88.888V400H44.444z"></path>
        <path d="M88.889 355.556H133.333V400H88.889z"></path>
        <path d="M133.333 355.556H177.777V400H133.333z"></path>
        <path d="M177.778 355.556H222.22199999999998V400H177.778z"></path>
        <path d="M222.222 355.556H266.666V400H222.222z"></path>
        <path d="M266.667 355.556H311.111V400H266.667z"></path>
        <path d="M311.111 355.556H355.555V400H311.111z"></path>
        <path d="M355.556 355.556H400V400H355.556z"></path>
        <path d="M400 355.556H444.444V400H400z"></path>
        <path d="M444.444 355.556H488.88800000000003V400H444.444z"></path>
        <path d="M488.889 355.556H533.333V400H488.889z"></path>
        <path d="M533.333 355.556H577.7769999999999V400H533.333z"></path>
        <path d="M577.778 355.556H622.222V400H577.778z"></path>
        <path d="M622.222 355.556H666.6659999999999V400H622.222z"></path>
        <path d="M666.667 355.556H711.111V400H666.667z"></path>
        <path d="M711.111 355.556H755.555V400H711.111z"></path>
        <path d="M755.556 355.556H800V400H755.556z"></path>
        <path d="M800 355.556H844.444V400H800z"></path>
        <path d="M0 400H44.444V444.444H0z"></path>
        <path d="M44.444 400H88.888V444.444H44.444z"></path>
        <path d="M88.889 400H133.333V444.444H88.889z"></path>
        <path d="M133.333 400H177.777V444.444H133.333z"></path>
        <path d="M177.778 400H222.22199999999998V444.444H177.778z"></path>
        <path d="M222.222 400H266.666V444.444H222.222z"></path>
        <path d="M266.667 400H311.111V444.444H266.667z"></path>
        <path d="M311.111 400H355.555V444.444H311.111z"></path>
        <path d="M355.556 400H400V444.444H355.556z"></path>
        <path d="M400 400H444.444V444.444H400z"></path>
        <path d="M444.444 400H488.88800000000003V444.444H444.444z"></path>
        <path d="M488.889 400H533.333V444.444H488.889z"></path>
        <path d="M533.333 400H577.7769999999999V444.444H533.333z"></path>
        <path d="M577.778 400H622.222V444.444H577.778z"></path>
        <path d="M622.222 400H666.6659999999999V444.444H622.222z"></path>
        <path d="M666.667 400H711.111V444.444H666.667z"></path>
        <path d="M711.111 400H755.555V444.444H711.111z"></path>
        <path d="M755.556 400H800V444.444H755.556z"></path>
        <path d="M800 400H844.444V444.444H800z"></path>
        <path d="M0 444.444H44.444V488.88800000000003H0z"></path>
        <path d="M44.444 444.444H88.888V488.88800000000003H44.444z"></path>
        <path d="M88.889 444.444H133.333V488.88800000000003H88.889z"></path>
        <path d="M133.333 444.444H177.777V488.88800000000003H133.333z"></path>
        <path d="M177.778 444.444H222.22199999999998V488.88800000000003H177.778z"></path>
        <path d="M222.222 444.444H266.666V488.88800000000003H222.222z"></path>
        <path d="M266.667 444.444H311.111V488.88800000000003H266.667z"></path>
        <path d="M311.111 444.444H355.555V488.88800000000003H311.111z"></path>
        <path d="M355.556 444.444H400V488.88800000000003H355.556z"></path>
        <path d="M400 444.444H444.444V488.88800000000003H400z"></path>
        <path d="M444.444 444.444H488.88800000000003V488.88800000000003H444.444z"></path>
        <path d="M488.889 444.444H533.333V488.88800000000003H488.889z"></path>
        <path d="M533.333 444.444H577.7769999999999V488.88800000000003H533.333z"></path>
        <path d="M577.778 444.444H622.222V488.88800000000003H577.778z"></path>
        <path d="M622.222 444.444H666.6659999999999V488.88800000000003H622.222z"></path>
        <path d="M666.667 444.444H711.111V488.88800000000003H666.667z"></path>
        <path d="M711.111 444.444H755.555V488.88800000000003H711.111z"></path>
        <path d="M755.556 444.444H800V488.88800000000003H755.556z"></path>
        <path d="M800 444.444H844.444V488.88800000000003H800z"></path>
        <path d="M0 488.889H44.444V533.333H0z"></path>
        <path d="M44.444 488.889H88.888V533.333H44.444z"></path>
        <path d="M88.889 488.889H133.333V533.333H88.889z"></path>
        <path d="M133.333 488.889H177.777V533.333H133.333z"></path>
        <path d="M177.778 488.889H222.22199999999998V533.333H177.778z"></path>
        <path d="M222.222 488.889H266.666V533.333H222.222z"></path>
        <path d="M266.667 488.889H311.111V533.333H266.667z"></path>
        <path d="M311.111 488.889H355.555V533.333H311.111z"></path>
        <path d="M355.556 488.889H400V533.333H355.556z"></path>
        <path d="M400 488.889H444.444V533.333H400z"></path>
        <path d="M444.444 488.889H488.88800000000003V533.333H444.444z"></path>
        <path d="M488.889 488.889H533.333V533.333H488.889z"></path>
        <path d="M533.333 488.889H577.7769999999999V533.333H533.333z"></path>
        <path d="M577.778 488.889H622.222V533.333H577.778z"></path>
        <path d="M622.222 488.889H666.6659999999999V533.333H622.222z"></path>
        <path d="M666.667 488.889H711.111V533.333H666.667z"></path>
        <path d="M711.111 488.889H755.555V533.333H711.111z"></path>
        <path d="M755.556 488.889H800V533.333H755.556z"></path>
        <path d="M800 488.889H844.444V533.333H800z"></path>
        <path d="M0 533.333H44.444V577.7769999999999H0z"></path>
        <path d="M44.444 533.333H88.888V577.7769999999999H44.444z"></path>
        <path d="M88.889 533.333H133.333V577.7769999999999H88.889z"></path>
        <path d="M133.333 533.333H177.777V577.7769999999999H133.333z"></path>
        <path d="M177.778 533.333H222.22199999999998V577.7769999999999H177.778z"></path>
        <path d="M222.222 533.333H266.666V577.7769999999999H222.222z"></path>
        <path d="M266.667 533.333H311.111V577.7769999999999H266.667z"></path>
        <path d="M311.111 533.333H355.555V577.7769999999999H311.111z"></path>
        <path d="M355.556 533.333H400V577.7769999999999H355.556z"></path>
        <path d="M400 533.333H444.444V577.7769999999999H400z"></path>
        <path d="M444.444 533.333H488.88800000000003V577.7769999999999H444.444z"></path>
        <path d="M488.889 533.333H533.333V577.7769999999999H488.889z"></path>
        <path d="M533.333 533.333H577.7769999999999V577.7769999999999H533.333z"></path>
        <path d="M577.778 533.333H622.222V577.7769999999999H577.778z"></path>
        <path d="M622.222 533.333H666.6659999999999V577.7769999999999H622.222z"></path>
        <path d="M666.667 533.333H711.111V577.7769999999999H666.667z"></path>
        <path d="M711.111 533.333H755.555V577.7769999999999H711.111z"></path>
        <path d="M755.556 533.333H800V577.7769999999999H755.556z"></path>
        <path d="M800 533.333H844.444V577.7769999999999H800z"></path>
        <path d="M0 577.778H44.444V622.222H0z"></path>
        <path d="M44.444 577.778H88.888V622.222H44.444z"></path>
        <path d="M88.889 577.778H133.333V622.222H88.889z"></path>
        <path d="M133.333 577.778H177.777V622.222H133.333z"></path>
        <path d="M177.778 577.778H222.22199999999998V622.222H177.778z"></path>
        <path d="M222.222 577.778H266.666V622.222H222.222z"></path>
        <path d="M266.667 577.778H311.111V622.222H266.667z"></path>
        <path d="M311.111 577.778H355.555V622.222H311.111z"></path>
        <path d="M355.556 577.778H400V622.222H355.556z"></path>
        <path d="M400 577.778H444.444V622.222H400z"></path>
        <path d="M444.444 577.778H488.88800000000003V622.222H444.444z"></path>
        <path d="M488.889 577.778H533.333V622.222H488.889z"></path>
        <path d="M533.333 577.778H577.7769999999999V622.222H533.333z"></path>
        <path d="M577.778 577.778H622.222V622.222H577.778z"></path>
        <path d="M622.222 577.778H666.6659999999999V622.222H622.222z"></path>
        <path d="M666.667 577.778H711.111V622.222H666.667z"></path>
        <path d="M711.111 577.778H755.555V622.222H711.111z"></path>
        <path d="M755.556 577.778H800V622.222H755.556z"></path>
        <path d="M800 577.778H844.444V622.222H800z"></path>
        <path d="M0 622.222H44.444V666.6659999999999H0z"></path>
        <path d="M44.444 622.222H88.888V666.6659999999999H44.444z"></path>
        <path d="M88.889 622.222H133.333V666.6659999999999H88.889z"></path>
        <path d="M133.333 622.222H177.777V666.6659999999999H133.333z"></path>
        <path d="M177.778 622.222H222.22199999999998V666.6659999999999H177.778z"></path>
        <path d="M222.222 622.222H266.666V666.6659999999999H222.222z"></path>
        <path d="M266.667 622.222H311.111V666.6659999999999H266.667z"></path>
        <path d="M311.111 622.222H355.555V666.6659999999999H311.111z"></path>
        <path d="M355.556 622.222H400V666.6659999999999H355.556z"></path>
        <path d="M400 622.222H444.444V666.6659999999999H400z"></path>
        <path d="M444.444 622.222H488.88800000000003V666.6659999999999H444.444z"></path>
        <path d="M488.889 622.222H533.333V666.6659999999999H488.889z"></path>
        <path d="M533.333 622.222H577.7769999999999V666.6659999999999H533.333z"></path>
        <path d="M577.778 622.222H622.222V666.6659999999999H577.778z"></path>
        <path d="M622.222 622.222H666.6659999999999V666.6659999999999H622.222z"></path>
        <path d="M666.667 622.222H711.111V666.6659999999999H666.667z"></path>
        <path d="M711.111 622.222H755.555V666.6659999999999H711.111z"></path>
        <path d="M755.556 622.222H800V666.6659999999999H755.556z"></path>
        <path d="M800 622.222H844.444V666.6659999999999H800z"></path>
        <path d="M0 666.667H44.444V711.111H0z"></path>
        <path d="M44.444 666.667H88.888V711.111H44.444z"></path>
        <path d="M88.889 666.667H133.333V711.111H88.889z"></path>
        <path d="M133.333 666.667H177.777V711.111H133.333z"></path>
        <path d="M177.778 666.667H222.22199999999998V711.111H177.778z"></path>
        <path d="M222.222 666.667H266.666V711.111H222.222z"></path>
        <path d="M266.667 666.667H311.111V711.111H266.667z"></path>
        <path d="M311.111 666.667H355.555V711.111H311.111z"></path>
        <path d="M355.556 666.667H400V711.111H355.556z"></path>
        <path d="M400 666.667H444.444V711.111H400z"></path>
        <path d="M444.444 666.667H488.88800000000003V711.111H444.444z"></path>
        <path d="M488.889 666.667H533.333V711.111H488.889z"></path>
        <path d="M533.333 666.667H577.7769999999999V711.111H533.333z"></path>
        <path d="M577.778 666.667H622.222V711.111H577.778z"></path>
        <path d="M622.222 666.667H666.6659999999999V711.111H622.222z"></path>
        <path d="M666.667 666.667H711.111V711.111H666.667z"></path>
        <path d="M711.111 666.667H755.555V711.111H711.111z"></path>
        <path d="M755.556 666.667H800V711.111H755.556z"></path>
        <path d="M800 666.667H844.444V711.111H800z"></path>
        <path d="M0 711.111H44.444V755.555H0z"></path>
        <path d="M44.444 711.111H88.888V755.555H44.444z"></path>
        <path d="M88.889 711.111H133.333V755.555H88.889z"></path>
        <path d="M133.333 711.111H177.777V755.555H133.333z"></path>
        <path d="M177.778 711.111H222.22199999999998V755.555H177.778z"></path>
        <path d="M222.222 711.111H266.666V755.555H222.222z"></path>
        <path d="M266.667 711.111H311.111V755.555H266.667z"></path>
        <path d="M311.111 711.111H355.555V755.555H311.111z"></path>
        <path d="M355.556 711.111H400V755.555H355.556z"></path>
        <path d="M400 711.111H444.444V755.555H400z"></path>
        <path d="M444.444 711.111H488.88800000000003V755.555H444.444z"></path>
        <path d="M488.889 711.111H533.333V755.555H488.889z"></path>
        <path d="M533.333 711.111H577.7769999999999V755.555H533.333z"></path>
        <path d="M577.778 711.111H622.222V755.555H577.778z"></path>
        <path d="M622.222 711.111H666.6659999999999V755.555H622.222z"></path>
        <path d="M666.667 711.111H711.111V755.555H666.667z"></path>
        <path d="M711.111 711.111H755.555V755.555H711.111z"></path>
        <path d="M755.556 711.111H800V755.555H755.556z"></path>
        <path d="M800 711.111H844.444V755.555H800z"></path>
        <path d="M0 755.556H44.444V800H0z"></path>
        <path d="M44.444 755.556H88.888V800H44.444z"></path>
        <path d="M88.889 755.556H133.333V800H88.889z"></path>
        <path d="M133.333 755.556H177.777V800H133.333z"></path>
        <path d="M177.778 755.556H222.22199999999998V800H177.778z"></path>
        <path d="M222.222 755.556H266.666V800H222.222z"></path>
        <path d="M266.667 755.556H311.111V800H266.667z"></path>
        <path d="M311.111 755.556H355.555V800H311.111z"></path>
        <path d="M355.556 755.556H400V800H355.556z"></path>
        <path d="M400 755.556H444.444V800H400z"></path>
        <path d="M444.444 755.556H488.88800000000003V800H444.444z"></path>
        <path d="M488.889 755.556H533.333V800H488.889z"></path>
        <path d="M533.333 755.556H577.7769999999999V800H533.333z"></path>
        <path d="M577.778 755.556H622.222V800H577.778z"></path>
        <path d="M622.222 755.556H666.6659999999999V800H622.222z"></path>
        <path d="M666.667 755.556H711.111V800H666.667z"></path>
        <path d="M711.111 755.556H755.555V800H711.111z"></path>
        <path d="M755.556 755.556H800V800H755.556z"></path>
        <path d="M800 755.556H844.444V800H800z"></path>
        <path d="M0 800H44.444V844.444H0z"></path>
        <path d="M44.444 800H88.888V844.444H44.444z"></path>
        <path d="M88.889 800H133.333V844.444H88.889z"></path>
        <path d="M133.333 800H177.777V844.444H133.333z"></path>
        <path d="M177.778 800H222.22199999999998V844.444H177.778z"></path>
        <path d="M222.222 800H266.666V844.444H222.222z"></path>
        <path d="M266.667 800H311.111V844.444H266.667z"></path>
        <path d="M311.111 800H355.555V844.444H311.111z"></path>
        <path d="M355.556 800H400V844.444H355.556z"></path>
        <path d="M400 800H444.444V844.444H400z"></path>
        <path d="M444.444 800H488.88800000000003V844.444H444.444z"></path>
        <path d="M488.889 800H533.333V844.444H488.889z"></path>
        <path d="M533.333 800H577.7769999999999V844.444H533.333z"></path>
        <path d="M577.778 800H622.222V844.444H577.778z"></path>
        <path d="M622.222 800H666.6659999999999V844.444H622.222z"></path>
        <path d="M666.667 800H711.111V844.444H666.667z"></path>
        <path d="M711.111 800H755.555V844.444H711.111z"></path>
        <path d="M755.556 800H800V844.444H755.556z"></path>
        <path d="M800 800H844.444V844.444H800z"></path>
      </g>
    </svg>

        <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1000"
      height="700"
      opacity="0.05"
      viewBox="0 0 800 800"
      className="absolute -right-20"
    >
      <g fill="none" stroke="hsla(212, 72%, 59%, 1)">
        <path d="M0 0H44.444V44.444H0z"></path>
        <path d="M44.444 0H88.888V44.444H44.444z"></path>
        <path d="M88.889 0H133.333V44.444H88.889z"></path>
        <path d="M133.333 0H177.777V44.444H133.333z"></path>
        <path d="M177.778 0H222.22199999999998V44.444H177.778z"></path>
        <path d="M222.222 0H266.666V44.444H222.222z"></path>
        <path d="M266.667 0H311.111V44.444H266.667z"></path>
        <path d="M311.111 0H355.555V44.444H311.111z"></path>
        <path d="M355.556 0H400V44.444H355.556z"></path>
        <path d="M400 0H444.444V44.444H400z"></path>
        <path d="M444.444 0H488.88800000000003V44.444H444.444z"></path>
        <path d="M488.889 0H533.333V44.444H488.889z"></path>
        <path d="M533.333 0H577.7769999999999V44.444H533.333z"></path>
        <path d="M577.778 0H622.222V44.444H577.778z"></path>
        <path d="M622.222 0H666.6659999999999V44.444H622.222z"></path>
        <path d="M666.667 0H711.111V44.444H666.667z"></path>
        <path d="M711.111 0H755.555V44.444H711.111z"></path>
        <path d="M755.556 0H800V44.444H755.556z"></path>
        <path d="M800 0H844.444V44.444H800z"></path>
        <path d="M0 44.444H44.444V88.888H0z"></path>
        <path d="M44.444 44.444H88.888V88.888H44.444z"></path>
        <path d="M88.889 44.444H133.333V88.888H88.889z"></path>
        <path d="M133.333 44.444H177.777V88.888H133.333z"></path>
        <path d="M177.778 44.444H222.22199999999998V88.888H177.778z"></path>
        <path d="M222.222 44.444H266.666V88.888H222.222z"></path>
        <path d="M266.667 44.444H311.111V88.888H266.667z"></path>
        <path d="M311.111 44.444H355.555V88.888H311.111z"></path>
        <path d="M355.556 44.444H400V88.888H355.556z"></path>
        <path d="M400 44.444H444.444V88.888H400z"></path>
        <path d="M444.444 44.444H488.88800000000003V88.888H444.444z"></path>
        <path d="M488.889 44.444H533.333V88.888H488.889z"></path>
        <path d="M533.333 44.444H577.7769999999999V88.888H533.333z"></path>
        <path d="M577.778 44.444H622.222V88.888H577.778z"></path>
        <path d="M622.222 44.444H666.6659999999999V88.888H622.222z"></path>
        <path d="M666.667 44.444H711.111V88.888H666.667z"></path>
        <path d="M711.111 44.444H755.555V88.888H711.111z"></path>
        <path d="M755.556 44.444H800V88.888H755.556z"></path>
        <path d="M800 44.444H844.444V88.888H800z"></path>
        <path d="M0 88.889H44.444V133.333H0z"></path>
        <path d="M44.444 88.889H88.888V133.333H44.444z"></path>
        <path d="M88.889 88.889H133.333V133.333H88.889z"></path>
        <path d="M133.333 88.889H177.777V133.333H133.333z"></path>
        <path d="M177.778 88.889H222.22199999999998V133.333H177.778z"></path>
        <path d="M222.222 88.889H266.666V133.333H222.222z"></path>
        <path d="M266.667 88.889H311.111V133.333H266.667z"></path>
        <path d="M311.111 88.889H355.555V133.333H311.111z"></path>
        <path d="M355.556 88.889H400V133.333H355.556z"></path>
        <path d="M400 88.889H444.444V133.333H400z"></path>
        <path d="M444.444 88.889H488.88800000000003V133.333H444.444z"></path>
        <path d="M488.889 88.889H533.333V133.333H488.889z"></path>
        <path d="M533.333 88.889H577.7769999999999V133.333H533.333z"></path>
        <path d="M577.778 88.889H622.222V133.333H577.778z"></path>
        <path d="M622.222 88.889H666.6659999999999V133.333H622.222z"></path>
        <path d="M666.667 88.889H711.111V133.333H666.667z"></path>
        <path d="M711.111 88.889H755.555V133.333H711.111z"></path>
        <path d="M755.556 88.889H800V133.333H755.556z"></path>
        <path d="M800 88.889H844.444V133.333H800z"></path>
        <path d="M0 133.333H44.444V177.777H0z"></path>
        <path d="M44.444 133.333H88.888V177.777H44.444z"></path>
        <path d="M88.889 133.333H133.333V177.777H88.889z"></path>
        <path d="M133.333 133.333H177.777V177.777H133.333z"></path>
        <path d="M177.778 133.333H222.22199999999998V177.777H177.778z"></path>
        <path d="M222.222 133.333H266.666V177.777H222.222z"></path>
        <path d="M266.667 133.333H311.111V177.777H266.667z"></path>
        <path d="M311.111 133.333H355.555V177.777H311.111z"></path>
        <path d="M355.556 133.333H400V177.777H355.556z"></path>
        <path d="M400 133.333H444.444V177.777H400z"></path>
        <path d="M444.444 133.333H488.88800000000003V177.777H444.444z"></path>
        <path d="M488.889 133.333H533.333V177.777H488.889z"></path>
        <path d="M533.333 133.333H577.7769999999999V177.777H533.333z"></path>
        <path d="M577.778 133.333H622.222V177.777H577.778z"></path>
        <path d="M622.222 133.333H666.6659999999999V177.777H622.222z"></path>
        <path d="M666.667 133.333H711.111V177.777H666.667z"></path>
        <path d="M711.111 133.333H755.555V177.777H711.111z"></path>
        <path d="M755.556 133.333H800V177.777H755.556z"></path>
        <path d="M800 133.333H844.444V177.777H800z"></path>
        <path d="M0 177.778H44.444V222.22199999999998H0z"></path>
        <path d="M44.444 177.778H88.888V222.22199999999998H44.444z"></path>
        <path d="M88.889 177.778H133.333V222.22199999999998H88.889z"></path>
        <path d="M133.333 177.778H177.777V222.22199999999998H133.333z"></path>
        <path d="M177.778 177.778H222.22199999999998V222.22199999999998H177.778z"></path>
        <path d="M222.222 177.778H266.666V222.22199999999998H222.222z"></path>
        <path d="M266.667 177.778H311.111V222.22199999999998H266.667z"></path>
        <path d="M311.111 177.778H355.555V222.22199999999998H311.111z"></path>
        <path d="M355.556 177.778H400V222.22199999999998H355.556z"></path>
        <path d="M400 177.778H444.444V222.22199999999998H400z"></path>
        <path d="M444.444 177.778H488.88800000000003V222.22199999999998H444.444z"></path>
        <path d="M488.889 177.778H533.333V222.22199999999998H488.889z"></path>
        <path d="M533.333 177.778H577.7769999999999V222.22199999999998H533.333z"></path>
        <path d="M577.778 177.778H622.222V222.22199999999998H577.778z"></path>
        <path d="M622.222 177.778H666.6659999999999V222.22199999999998H622.222z"></path>
        <path d="M666.667 177.778H711.111V222.22199999999998H666.667z"></path>
        <path d="M711.111 177.778H755.555V222.22199999999998H711.111z"></path>
        <path d="M755.556 177.778H800V222.22199999999998H755.556z"></path>
        <path d="M800 177.778H844.444V222.22199999999998H800z"></path>
        <path d="M0 222.222H44.444V266.666H0z"></path>
        <path d="M44.444 222.222H88.888V266.666H44.444z"></path>
        <path d="M88.889 222.222H133.333V266.666H88.889z"></path>
        <path d="M133.333 222.222H177.777V266.666H133.333z"></path>
        <path d="M177.778 222.222H222.22199999999998V266.666H177.778z"></path>
        <path d="M222.222 222.222H266.666V266.666H222.222z"></path>
        <path d="M266.667 222.222H311.111V266.666H266.667z"></path>
        <path d="M311.111 222.222H355.555V266.666H311.111z"></path>
        <path d="M355.556 222.222H400V266.666H355.556z"></path>
        <path d="M400 222.222H444.444V266.666H400z"></path>
        <path d="M444.444 222.222H488.88800000000003V266.666H444.444z"></path>
        <path d="M488.889 222.222H533.333V266.666H488.889z"></path>
        <path d="M533.333 222.222H577.7769999999999V266.666H533.333z"></path>
        <path d="M577.778 222.222H622.222V266.666H577.778z"></path>
        <path d="M622.222 222.222H666.6659999999999V266.666H622.222z"></path>
        <path d="M666.667 222.222H711.111V266.666H666.667z"></path>
        <path d="M711.111 222.222H755.555V266.666H711.111z"></path>
        <path d="M755.556 222.222H800V266.666H755.556z"></path>
        <path d="M800 222.222H844.444V266.666H800z"></path>
        <path d="M0 266.667H44.444V311.111H0z"></path>
        <path d="M44.444 266.667H88.888V311.111H44.444z"></path>
        <path d="M88.889 266.667H133.333V311.111H88.889z"></path>
        <path d="M133.333 266.667H177.777V311.111H133.333z"></path>
        <path d="M177.778 266.667H222.22199999999998V311.111H177.778z"></path>
        <path d="M222.222 266.667H266.666V311.111H222.222z"></path>
        <path d="M266.667 266.667H311.111V311.111H266.667z"></path>
        <path d="M311.111 266.667H355.555V311.111H311.111z"></path>
        <path d="M355.556 266.667H400V311.111H355.556z"></path>
        <path d="M400 266.667H444.444V311.111H400z"></path>
        <path d="M444.444 266.667H488.88800000000003V311.111H444.444z"></path>
        <path d="M488.889 266.667H533.333V311.111H488.889z"></path>
        <path d="M533.333 266.667H577.7769999999999V311.111H533.333z"></path>
        <path d="M577.778 266.667H622.222V311.111H577.778z"></path>
        <path d="M622.222 266.667H666.6659999999999V311.111H622.222z"></path>
        <path d="M666.667 266.667H711.111V311.111H666.667z"></path>
        <path d="M711.111 266.667H755.555V311.111H711.111z"></path>
        <path d="M755.556 266.667H800V311.111H755.556z"></path>
        <path d="M800 266.667H844.444V311.111H800z"></path>
        <path d="M0 311.111H44.444V355.555H0z"></path>
        <path d="M44.444 311.111H88.888V355.555H44.444z"></path>
        <path d="M88.889 311.111H133.333V355.555H88.889z"></path>
        <path d="M133.333 311.111H177.777V355.555H133.333z"></path>
        <path d="M177.778 311.111H222.22199999999998V355.555H177.778z"></path>
        <path d="M222.222 311.111H266.666V355.555H222.222z"></path>
        <path d="M266.667 311.111H311.111V355.555H266.667z"></path>
        <path d="M311.111 311.111H355.555V355.555H311.111z"></path>
        <path d="M355.556 311.111H400V355.555H355.556z"></path>
        <path d="M400 311.111H444.444V355.555H400z"></path>
        <path d="M444.444 311.111H488.88800000000003V355.555H444.444z"></path>
        <path d="M488.889 311.111H533.333V355.555H488.889z"></path>
        <path d="M533.333 311.111H577.7769999999999V355.555H533.333z"></path>
        <path d="M577.778 311.111H622.222V355.555H577.778z"></path>
        <path d="M622.222 311.111H666.6659999999999V355.555H622.222z"></path>
        <path d="M666.667 311.111H711.111V355.555H666.667z"></path>
        <path d="M711.111 311.111H755.555V355.555H711.111z"></path>
        <path d="M755.556 311.111H800V355.555H755.556z"></path>
        <path d="M800 311.111H844.444V355.555H800z"></path>
        <path d="M0 355.556H44.444V400H0z"></path>
        <path d="M44.444 355.556H88.888V400H44.444z"></path>
        <path d="M88.889 355.556H133.333V400H88.889z"></path>
        <path d="M133.333 355.556H177.777V400H133.333z"></path>
        <path d="M177.778 355.556H222.22199999999998V400H177.778z"></path>
        <path d="M222.222 355.556H266.666V400H222.222z"></path>
        <path d="M266.667 355.556H311.111V400H266.667z"></path>
        <path d="M311.111 355.556H355.555V400H311.111z"></path>
        <path d="M355.556 355.556H400V400H355.556z"></path>
        <path d="M400 355.556H444.444V400H400z"></path>
        <path d="M444.444 355.556H488.88800000000003V400H444.444z"></path>
        <path d="M488.889 355.556H533.333V400H488.889z"></path>
        <path d="M533.333 355.556H577.7769999999999V400H533.333z"></path>
        <path d="M577.778 355.556H622.222V400H577.778z"></path>
        <path d="M622.222 355.556H666.6659999999999V400H622.222z"></path>
        <path d="M666.667 355.556H711.111V400H666.667z"></path>
        <path d="M711.111 355.556H755.555V400H711.111z"></path>
        <path d="M755.556 355.556H800V400H755.556z"></path>
        <path d="M800 355.556H844.444V400H800z"></path>
        <path d="M0 400H44.444V444.444H0z"></path>
        <path d="M44.444 400H88.888V444.444H44.444z"></path>
        <path d="M88.889 400H133.333V444.444H88.889z"></path>
        <path d="M133.333 400H177.777V444.444H133.333z"></path>
        <path d="M177.778 400H222.22199999999998V444.444H177.778z"></path>
        <path d="M222.222 400H266.666V444.444H222.222z"></path>
        <path d="M266.667 400H311.111V444.444H266.667z"></path>
        <path d="M311.111 400H355.555V444.444H311.111z"></path>
        <path d="M355.556 400H400V444.444H355.556z"></path>
        <path d="M400 400H444.444V444.444H400z"></path>
        <path d="M444.444 400H488.88800000000003V444.444H444.444z"></path>
        <path d="M488.889 400H533.333V444.444H488.889z"></path>
        <path d="M533.333 400H577.7769999999999V444.444H533.333z"></path>
        <path d="M577.778 400H622.222V444.444H577.778z"></path>
        <path d="M622.222 400H666.6659999999999V444.444H622.222z"></path>
        <path d="M666.667 400H711.111V444.444H666.667z"></path>
        <path d="M711.111 400H755.555V444.444H711.111z"></path>
        <path d="M755.556 400H800V444.444H755.556z"></path>
        <path d="M800 400H844.444V444.444H800z"></path>
        <path d="M0 444.444H44.444V488.88800000000003H0z"></path>
        <path d="M44.444 444.444H88.888V488.88800000000003H44.444z"></path>
        <path d="M88.889 444.444H133.333V488.88800000000003H88.889z"></path>
        <path d="M133.333 444.444H177.777V488.88800000000003H133.333z"></path>
        <path d="M177.778 444.444H222.22199999999998V488.88800000000003H177.778z"></path>
        <path d="M222.222 444.444H266.666V488.88800000000003H222.222z"></path>
        <path d="M266.667 444.444H311.111V488.88800000000003H266.667z"></path>
        <path d="M311.111 444.444H355.555V488.88800000000003H311.111z"></path>
        <path d="M355.556 444.444H400V488.88800000000003H355.556z"></path>
        <path d="M400 444.444H444.444V488.88800000000003H400z"></path>
        <path d="M444.444 444.444H488.88800000000003V488.88800000000003H444.444z"></path>
        <path d="M488.889 444.444H533.333V488.88800000000003H488.889z"></path>
        <path d="M533.333 444.444H577.7769999999999V488.88800000000003H533.333z"></path>
        <path d="M577.778 444.444H622.222V488.88800000000003H577.778z"></path>
        <path d="M622.222 444.444H666.6659999999999V488.88800000000003H622.222z"></path>
        <path d="M666.667 444.444H711.111V488.88800000000003H666.667z"></path>
        <path d="M711.111 444.444H755.555V488.88800000000003H711.111z"></path>
        <path d="M755.556 444.444H800V488.88800000000003H755.556z"></path>
        <path d="M800 444.444H844.444V488.88800000000003H800z"></path>
        <path d="M0 488.889H44.444V533.333H0z"></path>
        <path d="M44.444 488.889H88.888V533.333H44.444z"></path>
        <path d="M88.889 488.889H133.333V533.333H88.889z"></path>
        <path d="M133.333 488.889H177.777V533.333H133.333z"></path>
        <path d="M177.778 488.889H222.22199999999998V533.333H177.778z"></path>
        <path d="M222.222 488.889H266.666V533.333H222.222z"></path>
        <path d="M266.667 488.889H311.111V533.333H266.667z"></path>
        <path d="M311.111 488.889H355.555V533.333H311.111z"></path>
        <path d="M355.556 488.889H400V533.333H355.556z"></path>
        <path d="M400 488.889H444.444V533.333H400z"></path>
        <path d="M444.444 488.889H488.88800000000003V533.333H444.444z"></path>
        <path d="M488.889 488.889H533.333V533.333H488.889z"></path>
        <path d="M533.333 488.889H577.7769999999999V533.333H533.333z"></path>
        <path d="M577.778 488.889H622.222V533.333H577.778z"></path>
        <path d="M622.222 488.889H666.6659999999999V533.333H622.222z"></path>
        <path d="M666.667 488.889H711.111V533.333H666.667z"></path>
        <path d="M711.111 488.889H755.555V533.333H711.111z"></path>
        <path d="M755.556 488.889H800V533.333H755.556z"></path>
        <path d="M800 488.889H844.444V533.333H800z"></path>
        <path d="M0 533.333H44.444V577.7769999999999H0z"></path>
        <path d="M44.444 533.333H88.888V577.7769999999999H44.444z"></path>
        <path d="M88.889 533.333H133.333V577.7769999999999H88.889z"></path>
        <path d="M133.333 533.333H177.777V577.7769999999999H133.333z"></path>
        <path d="M177.778 533.333H222.22199999999998V577.7769999999999H177.778z"></path>
        <path d="M222.222 533.333H266.666V577.7769999999999H222.222z"></path>
        <path d="M266.667 533.333H311.111V577.7769999999999H266.667z"></path>
        <path d="M311.111 533.333H355.555V577.7769999999999H311.111z"></path>
        <path d="M355.556 533.333H400V577.7769999999999H355.556z"></path>
        <path d="M400 533.333H444.444V577.7769999999999H400z"></path>
        <path d="M444.444 533.333H488.88800000000003V577.7769999999999H444.444z"></path>
        <path d="M488.889 533.333H533.333V577.7769999999999H488.889z"></path>
        <path d="M533.333 533.333H577.7769999999999V577.7769999999999H533.333z"></path>
        <path d="M577.778 533.333H622.222V577.7769999999999H577.778z"></path>
        <path d="M622.222 533.333H666.6659999999999V577.7769999999999H622.222z"></path>
        <path d="M666.667 533.333H711.111V577.7769999999999H666.667z"></path>
        <path d="M711.111 533.333H755.555V577.7769999999999H711.111z"></path>
        <path d="M755.556 533.333H800V577.7769999999999H755.556z"></path>
        <path d="M800 533.333H844.444V577.7769999999999H800z"></path>
        <path d="M0 577.778H44.444V622.222H0z"></path>
        <path d="M44.444 577.778H88.888V622.222H44.444z"></path>
        <path d="M88.889 577.778H133.333V622.222H88.889z"></path>
        <path d="M133.333 577.778H177.777V622.222H133.333z"></path>
        <path d="M177.778 577.778H222.22199999999998V622.222H177.778z"></path>
        <path d="M222.222 577.778H266.666V622.222H222.222z"></path>
        <path d="M266.667 577.778H311.111V622.222H266.667z"></path>
        <path d="M311.111 577.778H355.555V622.222H311.111z"></path>
        <path d="M355.556 577.778H400V622.222H355.556z"></path>
        <path d="M400 577.778H444.444V622.222H400z"></path>
        <path d="M444.444 577.778H488.88800000000003V622.222H444.444z"></path>
        <path d="M488.889 577.778H533.333V622.222H488.889z"></path>
        <path d="M533.333 577.778H577.7769999999999V622.222H533.333z"></path>
        <path d="M577.778 577.778H622.222V622.222H577.778z"></path>
        <path d="M622.222 577.778H666.6659999999999V622.222H622.222z"></path>
        <path d="M666.667 577.778H711.111V622.222H666.667z"></path>
        <path d="M711.111 577.778H755.555V622.222H711.111z"></path>
        <path d="M755.556 577.778H800V622.222H755.556z"></path>
        <path d="M800 577.778H844.444V622.222H800z"></path>
        <path d="M0 622.222H44.444V666.6659999999999H0z"></path>
        <path d="M44.444 622.222H88.888V666.6659999999999H44.444z"></path>
        <path d="M88.889 622.222H133.333V666.6659999999999H88.889z"></path>
        <path d="M133.333 622.222H177.777V666.6659999999999H133.333z"></path>
        <path d="M177.778 622.222H222.22199999999998V666.6659999999999H177.778z"></path>
        <path d="M222.222 622.222H266.666V666.6659999999999H222.222z"></path>
        <path d="M266.667 622.222H311.111V666.6659999999999H266.667z"></path>
        <path d="M311.111 622.222H355.555V666.6659999999999H311.111z"></path>
        <path d="M355.556 622.222H400V666.6659999999999H355.556z"></path>
        <path d="M400 622.222H444.444V666.6659999999999H400z"></path>
        <path d="M444.444 622.222H488.88800000000003V666.6659999999999H444.444z"></path>
        <path d="M488.889 622.222H533.333V666.6659999999999H488.889z"></path>
        <path d="M533.333 622.222H577.7769999999999V666.6659999999999H533.333z"></path>
        <path d="M577.778 622.222H622.222V666.6659999999999H577.778z"></path>
        <path d="M622.222 622.222H666.6659999999999V666.6659999999999H622.222z"></path>
        <path d="M666.667 622.222H711.111V666.6659999999999H666.667z"></path>
        <path d="M711.111 622.222H755.555V666.6659999999999H711.111z"></path>
        <path d="M755.556 622.222H800V666.6659999999999H755.556z"></path>
        <path d="M800 622.222H844.444V666.6659999999999H800z"></path>
        <path d="M0 666.667H44.444V711.111H0z"></path>
        <path d="M44.444 666.667H88.888V711.111H44.444z"></path>
        <path d="M88.889 666.667H133.333V711.111H88.889z"></path>
        <path d="M133.333 666.667H177.777V711.111H133.333z"></path>
        <path d="M177.778 666.667H222.22199999999998V711.111H177.778z"></path>
        <path d="M222.222 666.667H266.666V711.111H222.222z"></path>
        <path d="M266.667 666.667H311.111V711.111H266.667z"></path>
        <path d="M311.111 666.667H355.555V711.111H311.111z"></path>
        <path d="M355.556 666.667H400V711.111H355.556z"></path>
        <path d="M400 666.667H444.444V711.111H400z"></path>
        <path d="M444.444 666.667H488.88800000000003V711.111H444.444z"></path>
        <path d="M488.889 666.667H533.333V711.111H488.889z"></path>
        <path d="M533.333 666.667H577.7769999999999V711.111H533.333z"></path>
        <path d="M577.778 666.667H622.222V711.111H577.778z"></path>
        <path d="M622.222 666.667H666.6659999999999V711.111H622.222z"></path>
        <path d="M666.667 666.667H711.111V711.111H666.667z"></path>
        <path d="M711.111 666.667H755.555V711.111H711.111z"></path>
        <path d="M755.556 666.667H800V711.111H755.556z"></path>
        <path d="M800 666.667H844.444V711.111H800z"></path>
        <path d="M0 711.111H44.444V755.555H0z"></path>
        <path d="M44.444 711.111H88.888V755.555H44.444z"></path>
        <path d="M88.889 711.111H133.333V755.555H88.889z"></path>
        <path d="M133.333 711.111H177.777V755.555H133.333z"></path>
        <path d="M177.778 711.111H222.22199999999998V755.555H177.778z"></path>
        <path d="M222.222 711.111H266.666V755.555H222.222z"></path>
        <path d="M266.667 711.111H311.111V755.555H266.667z"></path>
        <path d="M311.111 711.111H355.555V755.555H311.111z"></path>
        <path d="M355.556 711.111H400V755.555H355.556z"></path>
        <path d="M400 711.111H444.444V755.555H400z"></path>
        <path d="M444.444 711.111H488.88800000000003V755.555H444.444z"></path>
        <path d="M488.889 711.111H533.333V755.555H488.889z"></path>
        <path d="M533.333 711.111H577.7769999999999V755.555H533.333z"></path>
        <path d="M577.778 711.111H622.222V755.555H577.778z"></path>
        <path d="M622.222 711.111H666.6659999999999V755.555H622.222z"></path>
        <path d="M666.667 711.111H711.111V755.555H666.667z"></path>
        <path d="M711.111 711.111H755.555V755.555H711.111z"></path>
        <path d="M755.556 711.111H800V755.555H755.556z"></path>
        <path d="M800 711.111H844.444V755.555H800z"></path>
        <path d="M0 755.556H44.444V800H0z"></path>
        <path d="M44.444 755.556H88.888V800H44.444z"></path>
        <path d="M88.889 755.556H133.333V800H88.889z"></path>
        <path d="M133.333 755.556H177.777V800H133.333z"></path>
        <path d="M177.778 755.556H222.22199999999998V800H177.778z"></path>
        <path d="M222.222 755.556H266.666V800H222.222z"></path>
        <path d="M266.667 755.556H311.111V800H266.667z"></path>
        <path d="M311.111 755.556H355.555V800H311.111z"></path>
        <path d="M355.556 755.556H400V800H355.556z"></path>
        <path d="M400 755.556H444.444V800H400z"></path>
        <path d="M444.444 755.556H488.88800000000003V800H444.444z"></path>
        <path d="M488.889 755.556H533.333V800H488.889z"></path>
        <path d="M533.333 755.556H577.7769999999999V800H533.333z"></path>
        <path d="M577.778 755.556H622.222V800H577.778z"></path>
        <path d="M622.222 755.556H666.6659999999999V800H622.222z"></path>
        <path d="M666.667 755.556H711.111V800H666.667z"></path>
        <path d="M711.111 755.556H755.555V800H711.111z"></path>
        <path d="M755.556 755.556H800V800H755.556z"></path>
        <path d="M800 755.556H844.444V800H800z"></path>
        <path d="M0 800H44.444V844.444H0z"></path>
        <path d="M44.444 800H88.888V844.444H44.444z"></path>
        <path d="M88.889 800H133.333V844.444H88.889z"></path>
        <path d="M133.333 800H177.777V844.444H133.333z"></path>
        <path d="M177.778 800H222.22199999999998V844.444H177.778z"></path>
        <path d="M222.222 800H266.666V844.444H222.222z"></path>
        <path d="M266.667 800H311.111V844.444H266.667z"></path>
        <path d="M311.111 800H355.555V844.444H311.111z"></path>
        <path d="M355.556 800H400V844.444H355.556z"></path>
        <path d="M400 800H444.444V844.444H400z"></path>
        <path d="M444.444 800H488.88800000000003V844.444H444.444z"></path>
        <path d="M488.889 800H533.333V844.444H488.889z"></path>
        <path d="M533.333 800H577.7769999999999V844.444H533.333z"></path>
        <path d="M577.778 800H622.222V844.444H577.778z"></path>
        <path d="M622.222 800H666.6659999999999V844.444H622.222z"></path>
        <path d="M666.667 800H711.111V844.444H666.667z"></path>
        <path d="M711.111 800H755.555V844.444H711.111z"></path>
        <path d="M755.556 800H800V844.444H755.556z"></path>
        <path d="M800 800H844.444V844.444H800z"></path>
      </g>
    </svg>
      </div>


      <div className="visita-text-animation lg:block hidden w-full flex flex-col items-center justify-center lg:pt-16 pt-24  ">
        <h1 className="text-center lg:text-5xl text-xl text-black font-visita-black mt-14">
          <span>
            {processIndex == 1
              ? "Business Or Company Name"
              : processIndex == 2
              ? "Company Details"
              : processIndex == 3
              ? "Social Media Links"
              : processIndex == 4
              ? "Payment Options"
              : processIndex == 5
              ? "Products Or Services"
              : "Image Gallery"}
          </span>
        </h1>
      </div>

      <div
        className={`create-inputs-wrapper ${
         processIndex == 1 ? "lg:w-[80%] w-full lg:pt-8" : "lg:w-[70%] w-full"
        }  lg:border  lg:rounded-t-3xl lg:h-[75%]  h-[80%] absolute px-8   flex  flex-row justify-center min-w-100vh bg-white  `}
      >
        <div className=" flex  h-full  ">
          <div className=" flex flex-col items-center  ">
            {/* Company Or Business Name */}

            <div
              id="process1"
              class={`${
                processIndex != 1 ? "hidden" : ""
              } mb-6 my-3 process1_wrapper pb-32`}
            >
              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Company Name <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Enter company name"
                autoComplete="off"
                required
                id="large-input"
                onChange={(e)=> checkCompanyNameExists(e.target.value)}
                defaultValue={cardDatas && cardDatas.company_name}
                name="company_name"
                class="company_name_input focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

<p class="error-message mt-2 text-sm text-green-600 font-visita-medium"></p>

              <label
                for="large-input"
                class="block mb-6 text-lg font-visita-medium text-gray-900 :text-gray-300 mt-8"
              >
                Upload Company Logo <span className="text-blue-600">*</span>
              </label>

              <div className="create-logo-upload flex items-center">
                <div id="create-logo-preview">
                <img src={cardDatas && cardDatas.logo} className={`ring-4 min-w-[100px] min-h-[100px]  transition-all ring-offset-8 rounded-full ring-${choosedThemeColor}-600`} />
                  
                </div>
                <input
                  type="file"
                  onChange={(e)=> {uploadImage(e.target.files,"logo")}}
                  id="create-choose-logo"
                  accept="image/*"
                />
                <input type="text" defaultValue={cardDatas && cardDatas.logo} name="logo" id="logo" className="hidden" />
                <label
                  for="create-choose-logo"
                  id="choose_logo_button"
                  className="lg:-ml-5 -ml-4 lg:text-md text:sm cursor-pointer border-blue-600 border-2 px-4 py-2 rounded-full font-visita-bold text-blue-600 hover:bg-blue-600 hover:text-white transition-all"
                >
                  Change Logo
                </label>
              </div>


              <div id="choose_theme_color" className="flex active-choose-theme flex-col opacity-0 transition-all">
              <label
                for="large-input"
                class="block mb-2 text-lg font-visita-medium text-gray-900 :text-gray-300 mt-4"
              >
                Choose Matching Theme Color <span className="text-blue-600">*</span>
              </label>
                

                <div className="flex w-full flex-wrap lg:pr-6  py-2">
                  <input name="theme_color" type="text" className="hidden" value={choosedThemeColor} />

                  {
                    themeColors.map((color)=> {
                     return (
                      <div>
                        <div  id={`choose-theme-${color}`} onClick={()=> setChoosedThemeColor(color)} className={`w-8 h-8 mr-4 lg:my-1 my-2 bg-${color}-600 theme_color hover:scale-105 transition-all rounded-full ring-offset-4 ring-blue-400 cursor-pointer`}></div>
                      
                     
                      </div>


                     )
                    })
                  }



                </div>

              </div>


            </div>

            

        

            {/* Company Details */}
            <div
              id="process2"
              class={`${
                processIndex != 2 ? "hidden" : ""
              }  my-3 process3_wrapper pb-40 overflow-scroll`}
            >
              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
              >
                Company Category <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Keywords (use , to seperate)"
                autoComplete="off"
                required
                defaultValue={cardDatas && cardDatas.company_category}
                id="large-input"
                name="company_category"
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                First Name <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Enter your first name"
                autoComplete="off"
                required
                id="large-input"
                defaultValue={cardDatas && cardDatas.first_name}
                name="first_name"
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Last Name{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="Enter your last name"
                autoComplete="off"
                id="large-input"
                name="last_name"
                defaultValue={cardDatas && cardDatas.last_name}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Position/Designation <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="(Ex. Manager etc.)"
                autoComplete="off"
                id="large-input"
                required
                name="position"
                defaultValue={cardDatas && cardDatas.position}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Phone No <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="+91 Enter Phone No"
                autoComplete="off"
                id="large-input"
                required
                name="phone_no"
                defaultValue={cardDatas && cardDatas.phone_no}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Alternative Phone No{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="+91 Enter Alt Phone No"
                autoComplete="off"
                id="large-input"
                name="alt_phone_no"
                defaultValue={cardDatas && cardDatas.alt_phone_no}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Whatsapp No <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="+91 Enter Whatsapp No"
                autoComplete="off"
                required
                id="large-input"
                name="whatsapp_no"
                defaultValue={cardDatas && cardDatas.whatsapp_no}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Address <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Full address"
                autoComplete="off"
                required
                id="large-input"
                name="address"
                defaultValue={cardDatas && cardDatas.address}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Email Id <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Email Address"
                autoComplete="off"
                required
                id="large-input"
                name="email_id"
                defaultValue={cardDatas && cardDatas.email_id}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Website{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="Enter website url"
                autoComplete="off"
                id="large-input"
                name="website"
                defaultValue={cardDatas && cardDatas.website}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Location{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="Your business location"
                autoComplete="off"
                id="large-input"
                name="location"
                defaultValue={cardDatas && cardDatas.location}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

<label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Google Map Location Url{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="Your location url GOOGLE MAP"
                autoComplete="off"
                id="large-input"
                defaultValue={cardDatas && cardDatas.gmap_location}
                name="gmap_location"
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border focus:shadow-blue-600/30 shadow-sm hover: sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                City <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Enter your city"
                autoComplete="off"
                id="large-input"
                required
                name="city"
                defaultValue={cardDatas && cardDatas.city}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Company Est Date <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="When Your Comp Was Started?"
                autoComplete="off"
                id="large-input"
                required
                name="since"
                defaultValue={cardDatas && cardDatas.since}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                About Us <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="About Your Comp"
                autoComplete="off"
                id="large-input"
                required
                name="about"
                defaultValue={cardDatas && cardDatas.about}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Specialities <span className="text-slate-400">(Optional)</span>
              </label>
              <input
                placeholder="Specialities Of Your Company"
                autoComplete="off"
                id="large-input"
                name="specials"
                defaultValue={cardDatas && cardDatas.specials}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-visita-medium mt-6 text-gray-900 :text-gray-300"
              >
                Features <span className="text-slate-400">(Optional)</span>
              </label>
              <input
                placeholder="Features Of Your Company"
                autoComplete="off"
                id="large-input"
                name="features"
                defaultValue={cardDatas && cardDatas.features}
                class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />




            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div
          id="process3"
          class={`${
            processIndex != 3 ? "hidden" : ""
          }  my-3 process3_wrapper pb-40 overflow-scroll`}
        >
          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            <i class="fa-brands fa-facebook mr-1"></i> Facebook Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter facebook link"
            autoComplete="off"
            id="large-input"
            name="facebook_link"
            defaultValue={cardDatas && cardDatas.facebook_link}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-instagram mr-1"></i> Instagram Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter instagram link"
            autoComplete="off"
            id="large-input"
            name="instagram_link"
            defaultValue={cardDatas && cardDatas.instagram_link}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-twitter mr-1"></i> Twitter Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter twitter link"
            autoComplete="off"
            id="large-input"
            name="twitter_link"
            defaultValue={cardDatas && cardDatas.twitter_link}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-linkedin mr-1"></i> LinkedIn Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter linkedin link"
            autoComplete="off"
            id="large-input"
            name="linkedin_link"
            defaultValue={cardDatas && cardDatas.linkedin_link}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-youtube mr-1"></i> Youtube Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter youtube link"
            autoComplete="off"
            id="large-input"
            name="youtube_link"
            defaultValue={cardDatas && cardDatas.youtube_link}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-pinterest mr-1"></i> Pinterest Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter pinterest link"
            autoComplete="off"
            id="large-input"
            name="pinterest_link"
            defaultValue={cardDatas && cardDatas.pinterest_link}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <h1 className="text-xl mt-12 font-visita-bold mb-12 flex justify-center">
            <span className="flex mr-2 items-center justify-center">
              <ion-icon name="arrow-down-outline"></ion-icon>
            </span>{" "}
            Youtube Video Links
          </h1>

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 1{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 1"
            autoComplete="off"
            id="large-input"
            name="ytvideo_1_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[0]}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 2{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 2"
            autoComplete="off"
            id="large-input"
            name="ytvideo_2_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[1]} 
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 3{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 3"
            autoComplete="off"
            id="large-input"
            name="ytvideo_3_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[2]}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 4{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 4"
            autoComplete="off"
            id="large-input"
            name="ytvideo_4_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[3]}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-visita-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 5{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 5"
            autoComplete="off"
            id="large-input"
            name="ytvideo_5_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[4]}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />
        </div>

        {/* Payment Options */}
        <div
          id="process4"
          class={`${
            processIndex != 4 ? "hidden" : ""
          }  my-3 process4_wrapper pb-40 overflow-scroll lg:px-0 `}
        >
          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            Paytm Number{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter paytm number"
            autoComplete="off"
            id="large-input"
            name="paytm_number"
            defaultValue={cardDatas && cardDatas.paytm_number}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            Google Pay Number{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter google pay number"
            autoComplete="off"
            id="large-input"
            name="googlepay_number"
            defaultValue={cardDatas && cardDatas.googlepay_number}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            PhonePe Number{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter phonepe number"
            autoComplete="off"
            id="large-input"
            name="phonepe"
            defaultValue={cardDatas && cardDatas.phonepe}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <h1 className="text-xl mt-12 font-visita-bold mb-12 flex justify-center">
            <span className="flex mr-2 items-center justify-center">
              <ion-icon name="arrow-down-outline"></ion-icon>
            </span>{" "}
            Payment QR Codes
          </h1>

          <label
            for="large-input"
            class="block mb-4 text-lg font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            Paytm QR Code{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          {cardDatas && cardDatas.paytm_qrcode ?
            <img src={cardDatas && cardDatas.paytm_qrcode} className='h-32 mb-4'  />
          :''
          }
          <input
            className="font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 "
            id="large_size"
            type="file"
            onChange={(e)=> {uploadImage(e.target.files,"paytm_qrcode")}}
          />
          <input defaultValue={cardDatas && cardDatas.paytm_qrcode} type="text" name="paytm_qrcode" id="paytm_qrcode" className="hidden" />

          <label
            for="large-input"
            class="block mb-4 text-lg font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            Google Pay QR Code{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          {cardDatas && cardDatas.googlepay_qrcode ?
            <img src={cardDatas && cardDatas.googlepay_qrcode} className='h-32 mb-4'  />
          :''
          }
          <input
            className="font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 "
            id="large_size"
            type="file"
            onChange={(e)=> {uploadImage(e.target.files,"googlepay_qrcode")}}
          />
          <input defaultValue={cardDatas && cardDatas.googlepay_qrcode} type="text" name="googlepay_qrcode" id="googlepay_qrcode" className="hidden" />

          <label
            for="large-input"
            class="block mb-4 text-lg font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            PhonePe QR Code{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          {cardDatas && cardDatas.phonepe_qrcode ?
            <img src={cardDatas && cardDatas.phonepe_qrcode} className='h-32 mb-4'  />
          :''
          }
          <input
            className="font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 "
            id="large_size"
            type="file"
            onChange={(e)=> {uploadImage(e.target.files,"phonepe_qrcode")}}
          />
          <input type="text" defaultValue={cardDatas && cardDatas.phonepe_qrcode} name="phonepe_qrcode" id="phonepe_qrcode" className="hidden" />

          <h1 className="text-xl mt-12 font-visita-bold mb-12 flex justify-center">
            <span className="flex mr-2 items-center justify-center">
              <ion-icon name="arrow-down-outline"></ion-icon>
            </span>{" "}
            Bank Account Details
          </h1>

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            Bank Name
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Bank account.Ex.SBI,HDFC etc..."
            autoComplete="off"
            id="large-input"
            name="bank_name"
            defaultValue={cardDatas && cardDatas.bank_name}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            Account Holder Name
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Account holder name"
            autoComplete="off"
            id="large-input"
            name="account_holder_name"
            defaultValue={cardDatas && cardDatas.account_holder_name}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            Bank Account Number
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Bank account number"
            autoComplete="off"
            id="large-input"
            name="bank_account_number"
            defaultValue={cardDatas && cardDatas.bank_account_number}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            Bank IFSC Code
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="IFSC Code"
            autoComplete="off"
            id="large-input"
            name="bank_ifsc_code"
            defaultValue={cardDatas && cardDatas.bank_ifsc_code}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-visita-medium text-gray-900 :text-gray-300 mt-6"
          >
            GST
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter GST number"
            autoComplete="off"
            id="large-input"
            name="gst"
            defaultValue={cardDatas && cardDatas.gst}
            class=" font-visita-medium block py-3.5    lg:pr-[650px] pr-[100px] pl-[20px] w-full text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          />
        </div>

        {/* Products Or Services */}
        <div
          id="process5"
          class={`${
            processIndex != 5 ? "hidden" : ""
          }  my-3 process5_wrapper pb-40 overflow-scroll w-full`}
        >
          {products && products.map((data,index) => {
            return (
              <div className="flex flex-col lg:items-start items-center">
                <label
                  for="large-input"
                  class="block mb-2 lg:text-lg  text-md font-visita-medium text-gray-900 :text-gray-300 lg:mt-6 mt-10 "
                >
                  Product Or Service {index + 1}
                  <span className="text-slate-400 ml-1 text-sm">
                    (Optional)
                  </span>
                </label>
                <div className="lg:w-full  lg:pb-8 pb-24  lg:mt-0  rounded-3xl flex lg:flex-row flex-col items-center  py-8   border">
                   <div className="flex flex-col">
                   <img src={data.product_image} className="h-32 w-[250px] rounded-xl" />
                  <div class="flex justify-center lg:w-[400px] w-[250px] lg:py-0 pb-8 items-center">
                  <input
            className="  font-visita-medium block py-3.5    text-gray-900 transition-all  sm:text-sm text-sm"
            id="large_size"
            type="file"
            onChange={(e)=> {uploadImage(e.target.files,`product_image_${index + 1}`)}}
          />
          <input defaultValue={data.product_image} type="text" name={`product_image_${index + 1}`} id={`product_image_${index + 1}`} className="hidden" />
          
                  </div>
                   </div>

                  <div className="w-full flex flex-col justify-center px-2">
                    <input
                      placeholder="Enter Product Name"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${index + 1}_name`}
                      defaultValue={data.product_name}
                      class=" font-visita-medium block py-3.5    lg: pl-[20px] lg:ml-6 lg:pr-[200px]  pr-[100px] text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    />

<input
                      placeholder="Enter Product Description (Optional)"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${index + 1}_description`}
                      defaultValue={data.product_description}
                      class=" font-visita-medium block py-3.5 mt-4    lg: pl-[20px] lg:ml-6 lg:pr-[200px] pr-[100px] text-gray-900 transition-all rounded-full border focus:shadow-blue-600/30 shadow-sm hover:border-blue-200 sm:text-sm text-sm focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    />

                    <input
                      placeholder="₹ Enter Product Original Price"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${index + 1}_orgprice`}
                      defaultValue={data.product_orgprice}
                      class=" font-visita-medium  mt-4 block py-3  pl-[20px] lg:ml-6 lg:pr-[200px] pr-[100px] text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    />

                    <input
                      placeholder="₹ Enter Product Offer Price"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${index + 1}_offerprice`}
                      defaultValue={data.product_offerprice}
                      class=" font-visita-medium  mt-4 block py-3  pl-[20px] lg:ml-6 lg:pr-[200px] pr-[100px] text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    />

                    <input
                      placeholder="Enter Product Link (Optional)"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${index + 1}_link`}
                      defaultValue={data.product_link}
                      class=" font-visita-medium  mt-4 block py-3  pl-[20px] lg:ml-6 lg:pr-[200px] pr-[100px] text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
                    />

                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Image Gallery */}

        <div
          id="process6"
          class={`${
            processIndex != 6 ? "hidden" : ""
          }  my-3 process6_wrapper pb-40 overflow-scroll w-full`}
        >
        
        {
          image_gallery && image_gallery.map((data,index)=> {
            return(
             <div >
               <label
              for="large-input"
              class="block mb-2 lg:text-lg  text-md font-visita-medium text-gray-900 :text-gray-300 lg:mt-6 mt-10 "
            >
              Image {index + 1}
              <span className="text-slate-400 ml-1 text-sm">
                (Optional)
              </span>
            </label>
              <div className="lg:w-full  lg:pb-8 pb-24  lg:mt-0  rounded-3xl flex lg:flex-row flex-col items-center lg:border py-8 px-4  border-b">
                  <div class="flex justify-center lg:w-[400px] w-[250px] lg:py-0 pb-8 items-center">
                    <img src={data} className='h-32 rounded-xl' />
                  <input
            className=" ml-6 font-visita-medium block py-3.5    pr-[50px] pl-[20px]  text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 "
            id="large_size"
            type="file"
            onChange={(e)=> {uploadImage(e.target.files,`image_${index + 1}`)}}
          />

<input defaultValue={data} type="text" name={`image_${index + 1}`} id={`image_${index + 1}`} className="hidden" />

                  </div>
                  </div>
             </div>
            )
          })
        }



        </div>

        <div
          id="process7"
          class={`${
            processIndex != 7 ? "hidden" : ""
          }  my-3 process7_wrapper  pb-40 overflow-scroll`}
        >
          <div className=" add_features_wrapper  lg:pb-8 pb-24  lg:mt-0  rounded-3xl flex lg:flex-row flex-col items-center border py-8 px-4 ">

                  <div class="flex flex-col w-full justify-center  py-2 lg:px-8 px-2 items-center">
                  
                  <FormControl display='flex' alignItems='center'>
  <FormLabel htmlFor='email-alerts' mb='0'>
    
    <h1 className="flex flex-col" >
   
<div className="flex lg:flex-row flex-col-reverse"> 
<span className="font-visita-bold text-lg mr-4" >Get your customers details</span>
    <Switch value={cardDatas && cardDatas.show_customer_details_popop} onChange={(e)=> {e.target.value = e.target.checked}} size='md' id='show_popup_feature_1_toggle' name="show_customer_details_popop" mt='1' mb='1' />
    </div>

    <span className="font-visita-medium mt-4 lg:w-[600px] w-[300px] text-slate-400" >
    This will help you to get all your customer details like name,phone number etc.when your customer enters to your website it will be show a popup for enter name and phone number.if the customer enter his details and submit you will get the details on your card manage page
    </span>
    </h1>

  </FormLabel>
  
</FormControl>

                  </div>

                  </div>
        </div>

        {/* Form Buttons */}
        <div className="flex items-center justify-center fixed bg-white  w-full bottom-0  ">
          <div
            className={`h-full ${
              processIndex == 1 ? "lg:w-[80%] w-full" : "lg:w-[70%] w-full"
            }  create-next-buttons-wrapper  flex items-center justify-center border py-8 lg:px-0 px-6`}
          >
            <Button
              id="previous_button"
              colorScheme="blue"
              rounded={"3xl"}
              _hover
              backgroundColor="#0062FF"
              onClick={() =>
                setProcessIndex(
                  processIndex != 1 ? processIndex - 1 : processIndex
                )
              }
              className="w-[150px] lg:mr-6 mr-2 font-visita-bold"
              size="md"
            >
              
              Previous
            </Button>

            <Button
              colorScheme="blue"
              _hover
              rounded={"3xl"}
              isLoading={loading}
              loadingText="Creating website"
              onClick={() => handleNextClick()}
              backgroundColor="rgb(37 99 235 / 1)"
              className="w-[200px] font-visita-bold lg:mr-6 mr-2"
              size="md"
            >
             {processIndex == maximumProcesses ? 'Update Website' : 'Next'}
            </Button>

            <Button
              id="skip_button"
              colorScheme="blue"
              rounded={"3xl"}
              backgroundColor="#0062FF"
              _hover
              className="w-[100px] font-visita-bold  lg:mr-6 mr-2"
              size="md"
              onClick={() => setProcessIndex(processIndex + 1)}
            >
              Skip{" "}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default EditCard;
