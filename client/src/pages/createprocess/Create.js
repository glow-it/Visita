import { Button } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateHeader from "../../components/CreateHeader";

function Create() {
  let [previuos, setPrevious] = useState(false);
  let [skip, setSkip] = useState(false);
  let [processIndex,setProcessIndex] = useState(1)
  let [templates,setTemplates] = useState(['','','','','','','','','','','','','','','','','','','',',','','','','','','','','','','','','','','','',''])

  let maximumProcesses = 5



  // Values or Card Datas
  let [companyName,setCompanyName] = useState()
  let [companyLogo,setCompanyLogo] = useState()



  useEffect(() => {
    document.title = "Visita | Create";

    // Logo Preview Show
    const chooseFile = document.getElementById("create-choose-logo");
    const imgPreview = document.getElementById("create-logo-preview");
    const chooseLogoButton = document.getElementById("choose_logo_button");

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
          imgPreview.innerHTML = '<img src="' + this.result + '" />';
          chooseLogoButton.innerText = "Change Logo";
          chooseFile.style.marginRight = "28px";
          chooseLogoButton.style.marginLeft = "0";
        });
      }
    }

    if (!previuos) {
      document.getElementById("previous_button").setAttribute("disabled", "");
    }
    if (!skip) {
      document.getElementById("skip_button").setAttribute("disabled", "");
    }

    let template_index_wrapper_all = document.querySelectorAll('.template-redirect-button-wrapper')

    template_index_wrapper_all.forEach((elem)=> {
      elem.classList.add('invisible')
    })


  }, []);



  // Process Index Iterate
  useEffect(()=> {
    // Remove Previous Disabled With Process Index
    if(processIndex > 1){
      document.getElementById("previous_button").removeAttribute("disabled","");
    }else{
      document.getElementById("previous_button").setAttribute("disabled","");
    }
  },[processIndex])


  // Handle Template Choose
  function handleTemplateChoose(e) {
    let template = e.target.parentElement
    let template_wrappers = document.querySelectorAll('.template-wrapper');
    let template_index_wrapper = template.childNodes[0]
    let template_index_elem = template_index_wrapper.children[0]
    let template_index_wrapper_all = document.querySelectorAll('.template-redirect-button-wrapper')
   

    template_wrappers.forEach((elem)=> {
      elem.classList.remove('border-green-500','hover:border-green-500')
    })
    

      template.classList.add('border-green-500','hover:border-green-500')

    template_index_wrapper_all.forEach((elem)=> {
      elem.classList.add('invisible')
    })


      template_index_wrapper.classList.replace('invisible','visible')
      template_index_wrapper.style.transform = 'translateY(0)'

    }

  return (
    <form className="h-screen w-full flex flex-col items-center">
      <div className="">
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
      </div>

      <CreateHeader processIndex={processIndex} />

      <div className="visita-text-animation w-full flex flex-col items-center justify-center pt-28 z-50">
        <h1 className="text-center text-5xl text-black font-visita-black">
          <span>{processIndex == 1 ? 'Business Or Company Name' : processIndex == 2 ? 'Choose A Template' : processIndex == 3 ? '' : processIndex == 4 ? '': processIndex == 5 ? '' : ''}</span>
        </h1>
      </div>

      <div className={`create-inputs-wrapper ${processIndex == 2 ? 'w-[90%] pt-0' : 'w-[70%] pt-16'} shadow-lg shadow-[#6733E4]/10 border rounded-t-3xl h-[75%] absolute  flex  flex-row justify-center min-w-100vh bg-white z-50 `}>
        <div className=" flex  h-full ">
          <div className=" flex flex-col items-center ">

            {/* Company Or Business Name */}

            <div class={`${processIndex == 2? 'hidden' : ''} mb-6 my-3 process1_wrapper`}>
              <label
                for="large-input"
                class="block mb-2 text-lg font-visita-bold text-gray-900 :text-gray-300"
              >
                Company Name <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Enter company name"
                autoComplete="off"
                onChange={(e)=> setCompanyName(e.target.value)}
                required
                id="large-input"
                name="company_name"
                class="font-visita-medium block py-3 pr-[600px] pl-[30px] w-full text-gray-900 transition-all rounded-full border-2 border-gray-200 sm:text-md text-md focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
              />

              <label
                for="large-input"
                class="block mb-6 text-lg font-visita-bold text-gray-900 :text-gray-300 mt-8"
              >
                Upload Company Logo <span className="text-blue-600">*</span>
              </label>

              <div className="create-logo-upload flex items-center">
                <div id="create-logo-preview">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsSvgjs="http://svgjs.com/svgjs"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="88"
                    height="88"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="88"
                      height="88"
                      viewBox="0 0 612 612"
                    >
                      <path
                        fill="#0062ff"
                        d="M472.322 235.219c-1.655 0-3.312.031-4.969.089-8.127-81.861-77.388-146.003-161.352-146.003-83.963 0-153.226 64.143-161.352 146.004-1.659-.06-3.317-.089-4.972-.089C62.659 235.219 0 297.88 0 374.897c0 77.02 62.659 139.678 139.678 139.678 8.967 0 16.234-7.268 16.234-16.234 0-8.965-7.268-16.234-16.234-16.234-59.113 0-107.209-48.093-107.209-107.209s48.096-107.209 107.209-107.209c5.916 0 11.893.495 17.77 1.472a16.235 16.235 0 0018.895-16.244l-.009-.586c-.005-.292-.011-.584-.011-.878 0-71.504 58.173-129.679 129.68-129.679 71.506 0 129.679 58.175 129.679 129.679 0 .276-.005.551-.009.825l-.009.675a16.235 16.235 0 0018.901 16.204 108.483 108.483 0 0117.759-1.471c59.116 0 107.209 48.094 107.209 107.209S531.44 482.104 472.324 482.104c-8.965 0-16.234 7.269-16.234 16.234 0 8.967 7.269 16.234 16.234 16.234 77.02 0 139.678-62.658 139.678-139.678-.002-77.014-62.66-139.675-139.68-139.675z"
                        className="color000 svgShape"
                      ></path>
                      <path
                        fill="#0062ff"
                        d="M228.476 245.689c0-38.489 31.312-69.802 69.802-69.802 8.967 0 16.234-7.268 16.234-16.234 0-8.965-7.268-16.234-16.234-16.234-56.393 0-102.271 45.878-102.271 102.271 0 8.967 7.268 16.234 16.234 16.234 8.966 0 16.235-7.268 16.235-16.235zM445.537 426.62l-129.941-95.209a16.232 16.232 0 00-19.19 0l-130.535 95.644a16.235 16.235 0 009.596 29.33h46.962v50.075c0 8.967 7.269 16.234 16.234 16.234h134.676c8.967 0 16.234-7.268 16.234-16.234v-50.075H436.565c8.965 0 16.234-7.268 16.234-16.234a16.221 16.221 0 00-7.262-13.531zm-72.199-2.704c-8.965 0-16.234 7.269-16.234 16.234v50.075H254.896V440.15c0-8.965-7.268-16.234-16.234-16.234H225.09l80.912-59.283 80.911 59.283h-13.575z"
                        className="color000 svgShape"
                      ></path>
                    </svg>
                  </svg>
                </div>
                <input
                  required
                  type="file"
                  id="create-choose-logo"
                  onChange={(e)=> setCompanyLogo(e.target.files)}
                  name="logo"
                  accept="image/*"
                />
                <label
                  for="create-choose-logo"
                  id="choose_logo_button"
                  className="-ml-12"
                >
                  Choose Logo
                </label>
              </div>
            </div>


            {/* Choose A Template */}

            <div className={`min-w-[100%] overflow-scroll  h-full pt-4 pb-44   flex flex-row flex-wrap justify-center ${processIndex != 2 ? 'hidden' : ''} process2_wrapper `}>

          {
            templates && templates.map((data,index)=> {
              return (
                <div onClick={(e)=> handleTemplateChoose(e) } className="template-wrapper h-[300px] w-[400px] bg-white transition-colors  hover:border-blue-500 cursor-pointer mx-2 my-2 rounded-2xl border-2 shadow-md flex justify-center overflow-hidden relative ">

                <div className="template-redirect-button-wrapper h-10 w-10 absolute right-6 top-4 bg-white rounded-full shadow-md flex justify-center items-center transition-transform">
                  <span className='template_index text-green-500 transition-colors flex justify-center items-center text-xl font-visita-bold' ><ion-icon name="checkmark-outline"></ion-icon></span>
                </div>
      
                {/* Template Image */}
                <img className='mt-8 h-[350px] rounded-[30px]' src="https://i.postimg.cc/MGgQFZpK/Screenshot-2022-09-21-10-48-13-54-40deb401b9ffe8e1df2f1cc5ba480b12.jpg"  />
      
                {/* Mobile Screen Image  */}
                <img className='absolute  mt-6' src="https://i.postimg.cc/g2H1N1M5/mobilescreen.png" alt="no image found (Mobile Screen)" />
      
              </div>
      
              )
            })
          }
        
      


        </div>




          </div>
        </div>

        <div className="flex items-center justify-center fixed bg-white  w-full bottom-0  ">
          <div className={`h-full ${processIndex == 2 ? 'w-[90%]' : 'w-[70%]'}  create-next-buttons-wrapper  flex items-center justify-center border py-8`}>
            <Button
              id="previous_button"
              colorScheme="blue"
              rounded={"3xl"}
              _hover
              backgroundColor="#0062FF"
              onClick={()=> setProcessIndex(processIndex!=1 ? processIndex - 1 : processIndex)}
              className="w-[150px] mr-6 font-visita-bold"
              size="md"
            >
              <span className="flex items-center justify-center text-white text-xl mr-2">
                <ion-icon name="arrow-back-outline"></ion-icon>
              </span>{" "}
              Previous
            </Button>

            <Button
              colorScheme="blue"
              _hover
              rounded={"3xl"}
              onClick={()=> setProcessIndex(processIndex!=maximumProcesses ? processIndex + 1 : processIndex)}
              backgroundColor="rgb(37 99 235 / 1)"
              className="w-[200px] font-visita-bold mr-6"
              size="md"
            >
              Submit & Next
            </Button>

            <Button
              id="skip_button"
              colorScheme="blue"
              rounded={"3xl"}
              backgroundColor="#0062FF"
              _hover
              className="w-[100px] font-visita-bold  mr-6"
              size="md"
              onClick={()=> setProcessIndex(processIndex!=5 ? processIndex + 1 : processIndex)}
            >
              Skip{" "}
              <span className="flex items-center justify-center text-white text-xl ml-2">
                <ion-icon name="arrow-forward-outline"></ion-icon>
              </span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Create;
