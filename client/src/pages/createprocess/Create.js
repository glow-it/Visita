import {
  Button,
  FormControl,
  FormLabel,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
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
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Toast } from "../../miniComponents/Toast";
import { Switch } from "@chakra-ui/react";
import apiKeys from "../../Api/apiKeys";
import Loading from "../../miniComponents/Loading";
import { Helmet } from "react-helmet";
import Spinner from "../../miniComponents/Spinner";

function Create() {
  let navigate = useNavigate();
  let location = useLocation();

  let isPremium = location.state ? location.state.isPremium : false;
  let franchisee_email = location.state
    ? location.state.franchisee_email
    : "no franchisee";
  let location_state = location.state ? true : false;
  let state_company_name = location.state
    ? location.state.state_company_name
    : "";

  const toast = useToast();
  const toastIdRef = React.useRef();

  let [previuos, setPrevious] = useState(false);
  let [skip, setSkip] = useState(false);
  let [processIndex, setProcessIndex] = useState(1);
  let [feature1, setFeature1] = useState(false);
  let [imageGalleryQuantity, setImageGalleryQuantity] = useState([]);
  let [productsQuantity, setProductsQuantity] = useState([]);

  let [loading, setLoading] = useState(false);
  let [choosedThemeColor, setChoosedThemeColor] = useState("purple");
  let [themeColors, setThemeColors] = useState([
    "purple",
    "slate",
    "zinc",
    "stone",
    "red",
    "orange",
    "amber",
    "yellow",
    "lime",
    "green",
    "emerald",
    "teal",
    "cyan",
    "sky",
    "blue",
    "indigo",
    "violet",
    "fuchsia",
    "pink",
    "rose",
  ]);

  useEffect(() => {
    let premiumProductsQuantity = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20",
      "21",
      "22",
      "23",
      "24",
      "25",
      "26",
      "27",
      "28",
      "29",
      "30",
      "31",
      "32",
      "33",
      "34",
      "35",
      "36",
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
      "49",
      "50",
      "51",
      "52",
      "53",
      "54",
      "55",
      "56",
      "57",
      "58",
      "59",
      "60",
      "61",
      "62",
      "63",
      "64",
      "65",
      "66",
      "67",
      "68",
      "69",
      "70",
      "71",
      "72",
      "73",
      "74",
      "75",
      "76",
      "77",
      "78",
      "79",
      "80",
      "81",
      "82",
      "83",
      "84",
      "85",
      "86",
      "87",
      "88",
      "89",
      "90",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
      "100",
    ];
    let basicProductsQuantity = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20"
    ];
    let basicImageGalleryQuantity = [
      "1",
      "2",
      "3",
      "4",
      "5"
    ];

    let premiumImageGalleryQuantity = [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20"
    ];

    
    if(isPremium == true){
      setProductsQuantity(premiumProductsQuantity);
      setImageGalleryQuantity(premiumImageGalleryQuantity)
    }else{
      setProductsQuantity(basicProductsQuantity)
      setImageGalleryQuantity(basicImageGalleryQuantity)
    }

  }, []);

  // Normal Use Effect
  useEffect(() => {
    const imgPreview = document.getElementById("create-logo-preview");
    if (imgPreview.querySelector("img").src == "") {
      imgPreview.querySelector("img").classList.replace("visible", "invisible");
    } else {
      imgPreview.querySelector("img").classList.replace("invisible", "visible");
    }
  }, [choosedThemeColor]);

  let maximumProcesses = 7;

  // Last Confirm Modal Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!location_state) {
      navigate("/pricing");
    }

    document.querySelector("header").style.display = "none";

    document.title = "Create - Visita";

    // Logo Preview Show
    const chooseFile = document.getElementById("create-choose-logo");
    const imgPreview = document.getElementById("create-logo-preview");
    const chooseLogoButton = document.getElementById("choose_logo_button");
    const choose_theme_color = document.getElementById("choose_theme_color");

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
          imgPreview.querySelector("img").setAttribute("src", this.result);
          imgPreview
            .querySelector("img")
            .classList.replace("invisible", "visible");
          imgPreview
            .querySelector("img")
            .classList.add("min-w-[100px]", "min-h-[100px]");
          document.getElementById("logo-upload-svg").style.display = "none";
          chooseLogoButton.innerText = "Change Logo";
          chooseLogoButton.style.marginLeft = "-20px";
          choose_theme_color.classList.add("active-choose-theme");
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
    } else if (processIndex == 3) {
      document.getElementById("skip_button").removeAttribute("disabled", "");
    } else if (processIndex == 5) {
      document.getElementById("skip_button").removeAttribute("disabled", "");
    } else if (processIndex == 6) {
      document.getElementById("skip_button").removeAttribute("disabled", "");
    } else if (processIndex == 7) {
      document.getElementById("skip_button").style.display = "none";
    } else {
      document.getElementById("skip_button").setAttribute("disabled", "");
    }

    // Submit Form Datas
  }, [processIndex]);

  // Handle Form Next Process Click
  function handleNextClick() {
    // Check Company Name Is Exists
    if (
      document.querySelector(".error-message").classList[3] != "text-red-600"
    ) {
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
          currentForm
            .querySelectorAll(`[name=${i.name}]`)
            .forEach(function (r) {
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
          status: "error",
          title: "Fill all required fields",
          postition: "top-right",
          description: "Check again!",
          toast,
        });
      } else {
        // Submit Datas
        if (processIndex == maximumProcesses) {
          let process_title = document.getElementById("process_title");

          process_title.style.display = "none";

          setTimeout(() => {
            process_title.style.display = "block";
          }, 1500);
          onOpen();
        }
        setProcessIndex(
          processIndex == maximumProcesses ? maximumProcesses : processIndex + 1
        );
      }
    }
  }

  // Iterate When Choose Theme Use Effect
  useEffect(() => {
    document.querySelectorAll(".theme_color").forEach((elem) => {
      elem.classList.remove("ring-4");
    });
    document
      .getElementById(`choose-theme-${choosedThemeColor}`)
      .classList.add("ring-4", `ring-${choosedThemeColor}-600`);
  }, [choosedThemeColor]);

  // Upload Image Files To Cloud
  async function uploadImage(files, id) {
    toastIdRef.current = Toast({
      status: "loading",
      title: "Uploading image...",
      postition: "top-right",
      toast,
    });

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "xav0wsx1");

    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/dmi3cfl2v/image/upload",
      formData
    );
    document.getElementById(id).value = response.data.url;

    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  // Upload Video Files To Cloud
  async function uploadVideo(files, id) {
    toastIdRef.current = Toast({
      status: "loading",
      title: "Uploading video...",
      postition: "top-right",
      toast,
    });

    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "ztotzgfw");

    let response = await axios.post(
      "https://api.cloudinary.com/v1_1/dmi3cfl2v/video/upload",
      formData
    );
    document.getElementById(id).value = response.data.url;

    if (toastIdRef.current) {
      toast.close(toastIdRef.current);
    }
  }

  function checkCompanyNameExists(value) {
    // Check The Company Name Already Exists
    let company_name_input = document.querySelector(".company_name_input");
    let company_name = value;
    axios.get(`${apiKeys.server_url}/card/all`).then((response) => {
      response.data
        .filter((data) => {
          company_name_input.classList.add(
            "bg-green-50",
            "border-green-500",
            "text-green-900",
            "placeholder-green-700"
          );

          company_name_input.classList.replace("bg-red-50", "bg-green-50");
          company_name_input.classList.replace(
            "focus:border-indigo-500",
            "focus:border-green-500"
          );
          company_name_input.classList.replace(
            "focus:ring-blue-500",
            "focus:ring-green-500"
          );
          company_name_input.classList.replace(
            "focus:border-red-500",
            "focus:border-green-500"
          );
          company_name_input.classList.replace(
            "focus:ring-red-500",
            "focus:ring-green-500"
          );
          company_name_input.classList.replace(
            "text-red-900",
            "text-green-900"
          );
          company_name_input.classList.replace(
            "placeholder-red-700",
            "placeholder-green-700"
          );

          document
            .querySelector(".error-message")
            .classList.replace("text-red-600", "text-green-600");
          document.querySelector(".error-message").innerText =
            "Well Done! Company name is available";

          return data.company_name.toLowerCase() == company_name.toLowerCase();
        })
        .map((data) => {
          if (data) {
            company_name_input.classList.replace("bg-green-50", "bg-red-50");
            company_name_input.classList.replace(
              "focus:border-green-500",
              "focus:border-red-500"
            );
            company_name_input.classList.replace(
              "focus:ring-green-500",
              "focus:ring-red-500"
            );
            company_name_input.classList.replace(
              "text-green-900",
              "text-red-900"
            );
            company_name_input.classList.replace(
              "placeholder-green-700",
              "placeholder-red-700"
            );

            document
              .querySelector(".error-message")
              .classList.replace("text-green-600", "text-red-600");
            document.querySelector(".error-message").innerText =
              "Oh, snapp! Company name already exists";
          }
        });
    });
  }

  function generateCompletion(elem, prompt, temperature, event) {
    event.target.innerText = "Generating...";

    axios({
      method: "POST",
      url: `${apiKeys.server_url}/generate-completion`,
      data: {
        prompt,
        temperature,
      },
    }).then((res) => {
      if (res.data.status) {
        const dirtyString = res.data.response;
        let cleanString = dirtyString.trim();
        let fullyCleanString = cleanString.replace(/[\n"]/g, " ");

        elem.value = fullyCleanString;
        event.target.innerText = "Regenerate";
      } else {
        Toast({
          status: "error",
          title: "AI not working properly",
          postition: "top-right",
          description: "try again!!!",
          toast,
        });
        event.target.innerText = "Generate";
      }
    });
  }

  return (
    <form id="cardForm" className="h-screen w-full flex flex-col items-center">
      <Helmet>
        <meta
          name="description"
          content="
          
          Create a professional business website in minutes with our user-friendly website builder. Choose from customizable templates, add your own content and go live in no time. Start building your online presence now!


          "
        />
      </Helmet>

      <input
        type="text"
        name="franchisee"
        value={franchisee_email ? franchisee_email : "no franchisee"}
        className="hidden"
      />

      <input
        type="text"
        name="isPremium"
        value={isPremium ? isPremium : isPremium}
        className="hidden"
      />

      <CreateHeader
        processIndex={processIndex}
        loading={loading}
        hideIndicators={false}
        isEdit={true}
      />

      {/* Last Confirm Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          py="8"
          px="8"
          rounded="3xl"
        >
          <ModalHeader
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <span className="font-extrabold text-3xl text-center">
              Are You Sure To Create?
            </span>
          </ModalHeader>
          <ModalBody
            pb="4"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
          >
            <span className="font-semibold text-center">
              You can make sure that the information you provided is correct.{" "}
            </span>
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button rounded="full" mr={3} variant="solid" onClick={onClose}>
              <span className="font-semibold">Cancel</span>
            </Button>

            <Button
              rounded="full"
              color="#fff"
              _hover
              bgColor="#5046E4"
              onClick={() => {
                setLoading(true);
                onClose();
                let cardForm = document.getElementById("cardForm");
                const myFormData = new FormData(cardForm);

                const formDataObj = {};
                myFormData.forEach((value, key) => (formDataObj[key] = value));

                axios
                  .post(`${apiKeys.server_url}/createcard`, formDataObj)
                  .then((response) => {
                    if (response.status == 200) {
                      navigate(response.data.redirect_url);
                    } else {
                      Toast({
                        status: "error",
                        title: "We are troubling to create website",
                        postition: "top",
                        description: "Contact visita team",
                        toast,
                      });
                    }
                  });
              }}
            >
              <span className="font-semibold">Create</span>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <div
        className={`create-inputs-wrapper ${
          processIndex == 5
            ? "lg:w-[75%] w-full"
            : processIndex > 2
            ? "lg:w-[55%] w-full"
            : "lg:w-[45%] w-[70%]"
        }    lg:rounded-t-3xl lg:h-[90%] h-[87%] absolute lg:px-8 px-7   flex  flex-row justify-center min-w-100vh bg-white  `}
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
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Company Name <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Enter company name"
                autoComplete="off"
                required
                defaultValue={
                  state_company_name != "" ? state_company_name : ""
                }
                onChange={(e) => checkCompanyNameExists(e.target.value)}
                id="large-input"
                name="company_name"
                class="company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <p class="error-message mt-2 text-sm text-green-600 font-medium"></p>

              <label
                for="large-input"
                class="block mb-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300 mt-8"
              >
                Upload Company Logo{" "}
                <span className="text-sm text-slate-400">(Optional)</span>
              </label>

              <div className="create-logo-upload flex items-center">
                <div id="create-logo-preview">
                  <img
                    className={`ring-4 invisible transition-all  ring-offset-8 rounded-full ring-${choosedThemeColor}-600`}
                  />
                  <svg
                    id="logo-upload-svg"
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
                        fill="#1e293b"
                        d="M472.322 235.219c-1.655 0-3.312.031-4.969.089-8.127-81.861-77.388-146.003-161.352-146.003-83.963 0-153.226 64.143-161.352 146.004-1.659-.06-3.317-.089-4.972-.089C62.659 235.219 0 297.88 0 374.897c0 77.02 62.659 139.678 139.678 139.678 8.967 0 16.234-7.268 16.234-16.234 0-8.965-7.268-16.234-16.234-16.234-59.113 0-107.209-48.093-107.209-107.209s48.096-107.209 107.209-107.209c5.916 0 11.893.495 17.77 1.472a16.235 16.235 0 0018.895-16.244l-.009-.586c-.005-.292-.011-.584-.011-.878 0-71.504 58.173-129.679 129.68-129.679 71.506 0 129.679 58.175 129.679 129.679 0 .276-.005.551-.009.825l-.009.675a16.235 16.235 0 0018.901 16.204 108.483 108.483 0 0117.759-1.471c59.116 0 107.209 48.094 107.209 107.209S531.44 482.104 472.324 482.104c-8.965 0-16.234 7.269-16.234 16.234 0 8.967 7.269 16.234 16.234 16.234 77.02 0 139.678-62.658 139.678-139.678-.002-77.014-62.66-139.675-139.68-139.675z"
                        className="color000 svgShape"
                      ></path>
                      <path
                        fill="#1e293b"
                        d="M228.476 245.689c0-38.489 31.312-69.802 69.802-69.802 8.967 0 16.234-7.268 16.234-16.234 0-8.965-7.268-16.234-16.234-16.234-56.393 0-102.271 45.878-102.271 102.271 0 8.967 7.268 16.234 16.234 16.234 8.966 0 16.235-7.268 16.235-16.235zM445.537 426.62l-129.941-95.209a16.232 16.232 0 00-19.19 0l-130.535 95.644a16.235 16.235 0 009.596 29.33h46.962v50.075c0 8.967 7.269 16.234 16.234 16.234h134.676c8.967 0 16.234-7.268 16.234-16.234v-50.075H436.565c8.965 0 16.234-7.268 16.234-16.234a16.221 16.221 0 00-7.262-13.531zm-72.199-2.704c-8.965 0-16.234 7.269-16.234 16.234v50.075H254.896V440.15c0-8.965-7.268-16.234-16.234-16.234H225.09l80.912-59.283 80.911 59.283h-13.575z"
                        className="color000 svgShape"
                      ></path>
                    </svg>
                  </svg>
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    uploadImage(e.target.files, "logo");
                  }}
                  id="create-choose-logo"
                  accept="image/*"
                />
                <input type="text" name="logo" id="logo" className="hidden" />
                <label
                  for="create-choose-logo"
                  id="choose_logo_button"
                  className="lg:-ml-12 hover:bg-slate-800 hover:text-white transition-colors -ml-36 lg:text-md text:sm cursor-pointer border-slate-800 border px-4 py-2 rounded-full font-bold text-slate-800"
                >
                  Choose Logo
                </label>
              </div>

              <div id="choose_theme_color" className="flex flex-col  ">
                <label
                  for="large-input"
                  class="block mb-2 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300 mt-4"
                >
                  Choose Matching Theme Color{" "}
                  <span className="text-blue-600">*</span>
                </label>

                <div className="flex w-full flex-wrap lg:pr-6  py-2">
                  <input
                    name="theme_color"
                    type="text"
                    className="hidden"
                    value={choosedThemeColor}
                  />

                  {themeColors.map((color) => {
                    return (
                      <div>
                        <Tooltip
                          className="font-medium"
                          label={color}
                          placement="top"
                          bg="#000"
                          px="3"
                          py="1"
                          rounded="full"
                          color="white"
                        >
                          <div
                            id={`choose-theme-${color}`}
                            onClick={() => setChoosedThemeColor(color)}
                            className={`w-8 h-8 mr-4 lg:my-2 my-2 bg-${color}-600 theme_color hover:scale-105 transition-all rounded-full ring-offset-4 ring-blue-400 cursor-pointer`}
                          ></div>
                        </Tooltip>
                      </div>
                    );
                  })}
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
                class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
              >
                Company Category <span className="text-blue-600">*</span>
              </label>

              <input
                placeholder="Enter your company category"
                autoComplete="off"
                required
                id="category_input"
                name="company_category"
                className=" font-medium block py-4      pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
              >
                Tagline
                <span
                  className={`${
                    isPremium != true
                      ? "text-slate-400 text-sm"
                      : "text-blue-600"
                  }`}
                >
                  {isPremium != true ? " (Optional)" : " *"}
                </span>
              </label>

              <div className="relative flex items-center ">
                <input
                  placeholder="Enter tagline"
                  autoComplete="off"
                  required={isPremium != true ? false : true}
                  id="tagline_input"
                  name="tagline"
                  className=" font-medium block py-4      pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
                />

                <p
                  onClick={(e) => {
                    generateCompletion(
                      document.getElementById("tagline_input"),
                      `write a tagline for a ${
                        document.getElementById("category_input").value
                      }`,
                      1,
                      e
                    );
                  }}
                  className="text-white absolute  cursor-pointer  bg-indigo-600 hover:bg-indigo-700 focus:outline-none  font-medium h-full right-0 flex items-center justify-center rounded-r-lg transition-colors  text-xs px-5 py-1.5  "
                >
                  Generate tagline
                </p>
              </div>

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                First Name <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Enter your first name"
                autoComplete="off"
                required
                id="large-input"
                name="first_name"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Last Name{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="Enter your last name"
                autoComplete="off"
                id="large-input"
                name="last_name"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Position/Designation <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="(Ex. Manager etc.)"
                autoComplete="off"
                id="large-input"
                required
                name="position"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Phone No <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="+91 Enter Phone No"
                autoComplete="off"
                id="large-input"
                required
                name="phone_no"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Alternative Phone No{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="+91 Enter Alt Phone No"
                autoComplete="off"
                id="large-input"
                name="alt_phone_no"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Whatsapp No <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="+91 Enter Whatsapp No"
                autoComplete="off"
                required
                id="large-input"
                name="whatsapp_no"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Address <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Full address"
                autoComplete="off"
                required
                id="large-input"
                name="address"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Email Id <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Email Address"
                autoComplete="off"
                required
                id="large-input"
                name="email_id"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Website{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="Enter website url"
                autoComplete="off"
                id="large-input"
                name="website"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Location{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="Your business location"
                autoComplete="off"
                id="large-input"
                name="location"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Google Map Location Url{" "}
                <span className="text-slate-400 text-sm ml-1">(Optional)</span>
              </label>
              <input
                placeholder="Your location url GOOGLE MAP"
                autoComplete="off"
                id="large-input"
                name="gmap_location"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm   focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                City <span className="text-blue-600">*</span>
              </label>
              <input
                placeholder="Enter your city"
                autoComplete="off"
                id="large-input"
                required
                name="city"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Company Est Date{" "}
                <span className="text-slate-400 text-sm"> (Optional)</span>
              </label>
              <input
                placeholder="When Your Comp Was Started?"
                autoComplete="off"
                id="large-input"
                name="since"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                About Company <span className="text-blue-600">*</span>
              </label>

              <div className="relative flex items-center ">
                <input
                  placeholder="About your company"
                  autoComplete="off"
                  id="about_input"
                  required
                  name="about"
                  class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
                />

                <p
                  onClick={(e) => {
                    generateCompletion(
                      document.getElementById("about_input"),
                      `write a bio for a ${
                        document.getElementById("category_input").value
                      } shop or business`,
                      1,
                      e
                    );
                  }}
                  className="text-white absolute cursor-pointer  bg-indigo-600 hover:bg-indigo-700 focus:outline-none  font-medium h-full right-0 flex items-center justify-center rounded-r-lg transition-colors  text-xs px-5 py-1.5  "
                >
                  Generate bio
                </p>
              </div>

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Specialities <span className="text-slate-400">(Optional)</span>
              </label>

              <div className="relative flex items-center ">
                <input
                  placeholder="Seperate with comma ( , )"
                  autoComplete="off"
                  id="specials_input"
                  name="specials"
                  class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
                />

                <p
                  onClick={(e) => {
                    generateCompletion(
                      document.getElementById("specials_input"),
                      `write specialities for ${
                        document.getElementById("category_input").value
                      } shop or business. separate with commas without numbers`,
                      1,
                      e
                    );
                  }}
                  className="text-white absolute  cursor-pointer  bg-indigo-600 hover:bg-indigo-700 focus:outline-none  font-medium h-full right-0 flex items-center justify-center rounded-r-lg transition-colors  text-xs px-5 py-1.5  "
                >
                  Generate
                </p>
              </div>

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Features <span className="text-slate-400">(Optional)</span>
              </label>

              <div className="relative flex items-center ">
                <input
                  placeholder="Seperate with comma ( , )"
                  autoComplete="off"
                  id="features_input"
                  name="features"
                  class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
                />

                <p
                  onClick={(e) => {
                    generateCompletion(
                      document.getElementById("features_input"),
                      `write features for a ${
                        document.getElementById("category_input").value
                      } shop or business. separate with commas without numbers`,
                      1,
                      e
                    );
                  }}
                  className="text-white absolute  cursor-pointer  bg-indigo-600 hover:bg-indigo-700 focus:outline-none  font-medium h-full right-0 flex items-center justify-center rounded-r-lg transition-colors  text-xs px-5 py-1.5  "
                >
                  Generate
                </p>
              </div>
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
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            <i class="fa-brands fa-facebook mr-1"></i> Facebook Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter facebook link"
            autoComplete="off"
            id="large-input"
            name="facebook_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            <i class="fa-brands fa-instagram mr-1"></i> Instagram Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter instagram link"
            autoComplete="off"
            id="large-input"
            name="instagram_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            <i class="fa-brands fa-twitter mr-1"></i> Twitter Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter twitter link"
            autoComplete="off"
            id="large-input"
            name="twitter_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            <i class="fa-brands fa-linkedin mr-1"></i> LinkedIn Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter linkedin link"
            autoComplete="off"
            id="large-input"
            name="linkedin_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            <i class="fa-brands fa-youtube mr-1"></i> Youtube Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter youtube link"
            autoComplete="off"
            id="large-input"
            name="youtube_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            <i class="fa-brands fa-pinterest mr-1"></i> Pinterest Link{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter pinterest link"
            autoComplete="off"
            id="large-input"
            name="pinterest_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />
          <h1 className="text-xl mt-12 font-bold mb-12 flex justify-center">
            Youtube Video Links
          </h1>

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 1{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 1"
            autoComplete="off"
            id="large-input"
            name="ytvideo_1_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 2{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 2"
            autoComplete="off"
            id="large-input"
            name="ytvideo_2_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 3{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 3"
            autoComplete="off"
            id="large-input"
            name="ytvideo_3_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 4{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 4"
            autoComplete="off"
            id="large-input"
            name="ytvideo_4_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 5{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 5"
            autoComplete="off"
            id="large-input"
            name="ytvideo_5_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          {
            isPremium == true ?
            <div>
              <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 6{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 6"
            autoComplete="off"
            id="large-input"
            name="ytvideo_6_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 7{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 7"
            autoComplete="off"
            id="large-input"
            name="ytvideo_7_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 8{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 8"
            autoComplete="off"
            id="large-input"
            name="ytvideo_8_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 9{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 9"
            autoComplete="off"
            id="large-input"
            name="ytvideo_9_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
          >
            Youtube Video Link 10{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Youtube video link 10"
            autoComplete="off"
            id="large-input"
            name="ytvideo_10_link"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />
            </div>
          :""
          }

          {/* File Video Links */}

          {isPremium == true ? (
            <div>
              <h1 className="text-xl mt-12 font-bold mb-12 flex justify-center">
                Videos from gallery
              </h1>

              <label
                for="large-input"
                class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
              >
                Video 1
                <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
              </label>
              <input
                placeholder="Video 1"
                onChange={(e) => {
                  uploadVideo(e.target.files, "video_1_input");
                }}
                accept="video/*"
                type="file"
                autoComplete="off"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md     sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
              >
                Video 2{" "}
                <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
              </label>
              <input
                placeholder="Video 2"
                onChange={(e) => {
                  uploadVideo(e.target.files, "video_2_input");
                }}
                accept="video/*"
                type="file"
                autoComplete="off"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md     sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
              >
                Video 3{" "}
                <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
              </label>
              <input
                placeholder="Video 3"
                onChange={(e) => {
                  uploadVideo(e.target.files, "video_3_input");
                }}
                accept="video/*"
                type="file"
                autoComplete="off"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md     sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
              >
                Video 4{" "}
                <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
              </label>
              <input
                placeholder="Video 4"
                onChange={(e) => {
                  uploadVideo(e.target.files, "video_4_input");
                }}
                accept="video/*"
                type="file"
                autoComplete="off"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md     sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
              >
                Video 5{" "}
                <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
              </label>
              <input
                placeholder="Video 5"
                onChange={(e) => {
                  uploadVideo(e.target.files, "video_5_input");
                }}
                accept="video/*"
                type="file"
                autoComplete="off"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md     sm:text-sm text-sm  focus:border-indigo-500"
              />

              <input
                className="hidden"
                type="text"
                name="video_1"
                id="video_1_input"
              />
              <input
                className="hidden"
                type="text"
                name="video_2"
                id="video_2_input"
              />
              <input
                className="hidden"
                type="text"
                name="video_3"
                id="video_3_input"
              />
              <input
                className="hidden"
                type="text"
                name="video_4"
                id="video_4_input"
              />
              <input
                className="hidden"
                type="text"
                name="video_5"
                id="video_5_input"
              />
            </div>
          ) : (
            ""
          )}
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
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            Paytm Number{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter paytm number"
            autoComplete="off"
            id="large-input"
            name="paytm_number"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            Google Pay Number{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter google pay number"
            autoComplete="off"
            id="large-input"
            name="googlepay_number"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            PhonePe Number{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter phonepe number"
            autoComplete="off"
            id="large-input"
            name="phonepe"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <h1 className="text-xl mt-12 font-bold mb-12 flex justify-center">
            Payment QR Codes
          </h1>

          <label
            for="large-input"
            class="block mb-4 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            Paytm QR Code{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            className="font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-fullgrder fo-2cus:shadow-blue-600/30   sm:text-sm text-sm  focus:border-indigo-500 "
            id="large_size"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files, "paytm_qrcode");
            }}
          />
          <input
            type="text"
            name="paytm_qrcode"
            id="paytm_qrcode"
            className="hidden"
          />

          <label
            for="large-input"
            class="block mb-4 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            Google Pay QR Code{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            className="font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-fullgrder fo-2cus:shadow-blue-600/30   sm:text-sm text-sm  focus:border-indigo-500 "
            id="large_size"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files, "googlepay_qrcode");
            }}
          />
          <input
            type="text"
            name="googlepay_qrcode"
            id="googlepay_qrcode"
            className="hidden"
          />

          <label
            for="large-input"
            class="block mb-4 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            PhonePe QR Code{" "}
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            className="font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-fullgrder fo-2cus:shadow-blue-600/30   sm:text-sm text-sm  focus:border-indigo-500 "
            id="large_size"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files, "phonepe_qrcode");
            }}
          />
          <input
            type="text"
            name="phonepe_qrcode"
            id="phonepe_qrcode"
            className="hidden"
          />

          <h1 className="text-xl mt-12 font-bold mb-12 flex justify-center">
            Bank Account Details
          </h1>

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            Bank Name
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Bank account.Ex.SBI,HDFC etc..."
            autoComplete="off"
            id="large-input"
            name="bank_name"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            Account Holder Name
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Account holder name"
            autoComplete="off"
            id="large-input"
            name="account_holder_name"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            Bank Account Number
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Bank account number"
            autoComplete="off"
            id="large-input"
            name="bank_account_number"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            Bank IFSC Code
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="IFSC Code"
            autoComplete="off"
            id="large-input"
            name="bank_ifsc_code"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
          >
            GST
            <span className="text-slate-400 ml-1 text-sm">(Optional)</span>
          </label>
          <input
            placeholder="Enter GST number"
            autoComplete="off"
            id="large-input"
            name="gst"
            class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
          />
        </div>

        {/* Products Or Services */}
        <div
          id="process5"
          class={`${
            processIndex != 5 ? "hidden" : ""
          }  my-3 process5_wrapper pb-40 overflow-scroll w-full`}
        >
          {productsQuantity.map((data) => {
            return (
              <div className="flex flex-col lg:items-start items-center">
                <label
                  for="large-input"
                  class="block mb-2 lg:text-lg  text-md font-medium text-gray-900 border-slate-800 :text-gray-300 lg:mt-6 mt-10 "
                >
                  Product Or Service {data}
                  <span className="text-slate-400 ml-1 text-sm">
                    (Optional)
                  </span>
                </label>
                <div className="lg:w-full  lg:pb-8 pb-24   lg:mt-0  rounded-3xl flex lg:flex-row flex-col items-center  py-8  ">
                  <div class="flex border border-slate-800 py-[130px] lg:px-0 px-8 lg:mb-0 mb-6 justify-center  lg:w-[400px] w-[280px]   rounded-md  items-center">
                    <input
                      className=" ml-6 font-medium block py-4     pr-[50px] pl-[20px] text-gray-900 transition-all   focus:shadowlge-600/3-20  sm:text-sm text-sm  focus:border-indigo-500 "
                      id="large_size"
                      type="file"
                      onChange={(e) => {
                        uploadImage(e.target.files, `product_image_${data}`);
                      }}
                    />
                    <input
                      type="text"
                      name={`product_image_${data}`}
                      id={`product_image_${data}`}
                      className="hidden"
                    />
                  </div>

                  <div className="w-full flex flex-col justify-center px-2">
                    <input
                      placeholder="Enter Product Name"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${data}_name`}
                      class=" font-medium block py-4    lg: pl-[20px] lg:ml-6  pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
                    />

                    <input
                      placeholder="Enter Product Description (Optional)"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${data}_description`}
                      class=" font-medium block py-4 mt-4    lg: pl-[20px] lg:ml-6  pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
                    />

                    <input
                      placeholder="₹ Enter Product Original Price"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${data}_orgprice`}
                      class=" font-medium  mt-4 block py-4  pl-[20px] lg:ml-6  pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
                    />

                    <input
                      placeholder="₹ Enter Product Offer Price"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${data}_offerprice`}
                      class=" font-medium  mt-4 block py-4  pl-[20px] lg:ml-6  pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
                    />

                    <input
                      placeholder="Enter Product Link (Optional)"
                      autoComplete="off"
                      id="large-input"
                      name={`product_${data}_link`}
                      class=" font-medium  mt-4 block py-4  pl-[20px] lg:ml-6  pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
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
          }  my-3 process6_wrapper  pb-40 overflow-scroll w-full`}
        >
          {imageGalleryQuantity.map((data) => {
            return (
              <div>
                <label
                  for="large-input"
                  class="block mb-2 lg:text-lg   text-md font-medium text-gray-900 border-slate-800 :text-gray-300 lg:mt-6 mt-10 "
                >
                  Image {data}
                  <span className="text-slate-400 ml-1 text-sm">
                    (Optional)
                  </span>
                </label>
                <div className="lg:w-full lg:h-auto h-20 lg:pb-8 pb-24  lg:mt-0   flex lg:flex-row flex-col items-center  py-8   border-b border-b-slate-800">
                  <div class="flex justify-center lg:w-[400px] w-[250px] lg:py-0 pb-8 items-center">
                    <input
                      className="  font-medium block py-4    pr-[150px] pl-[20px] text-gray-900 transition-all   focus:shlg-blue-6-200/30   sm:text-sm text-sm  focus:border-indigo-500 "
                      id="large_size"
                      type="file"
                      onChange={(e) => {
                        uploadImage(e.target.files, `image_${data}`);
                      }}
                    />

                    <input
                      type="text"
                      name={`image_${data}`}
                      id={`image_${data}`}
                      className="hidden"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div
          id="process7"
          class={`${
            processIndex != 7 ? "hidden" : ""
          }  my-3 process7_wrapper  pb-40 overflow-scroll`}
        >
          <div className=" add_features_wrapper  lg:pb-8 pb-24   lg:mt-0  rounded-lg flex lg:flex-row flex-col items-center border  py-8 px-4 ">
            <div class="flex flex-col w-full justify-center  py-2 lg:px-8 px-2 items-center">
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="email-alerts" mb="0">
                  <h1 className="flex flex-col">
                    <div className="flex lg:flex-row flex-col-reverse">
                      <span className="font-bold text-lg mr-4">
                        Get your customers details
                      </span>
                      <Switch
                        colorScheme="purple"
                        value={false}
                        onChange={(e) => {
                          if (feature1 == true) {
                            setFeature1(false);
                          } else {
                            setFeature1(true);
                          }
                        }}
                        size="md"
                        id="show_popup_feature_1_toggle"
                        mt="1"
                        mb="1"
                      />
                    </div>

                    <input
                      type="text"
                      value={feature1}
                      name="show_customer_details_popop"
                      className="hidden"
                    />

                    <span className="font-medium mt-4 lg:w-[600px]  w-[300px] text-slate-400">
                      This will help you to get all your customer details like
                      name,phone number etc.when your customer enters to your
                      website it will be show a popup for enter name and phone
                      number.if the customer enter his details and submit you
                      will get the details on your website manage page
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
            }  create-next-buttons-wrapper  flex items-center justify-center  py-8 lg:px-0 px-6`}
          >
            <Button
              id="previous_button"
              rounded={"full"}
              _hover
              backgroundColor="#5046E4"
              onClick={() =>
                setProcessIndex(
                  processIndex != 1 ? processIndex - 1 : processIndex
                )
              }
              className="w-[150px] lg:mr-6 mr-2 font-semibold"
              size="md"
              color="white"
            >
              Previous
            </Button>

            <Button
              _hover
              rounded={"full"}
              isLoading={loading}
              spinner={<Spinner />}
              _loading={{ opacity: "1" }}
              onClick={() => handleNextClick()}
              backgroundColor="#5046E4"
              className="w-[200px] font-semibold lg:mr-6"
              size="md"
              color="white"
            >
              {processIndex == maximumProcesses
                ? "Create Website"
                : "Save & continue"}
            </Button>

            <Button
              id="skip_button"
              display="none"
              rounded={"full"}
              backgroundColor="#5046E4"
              _hover
              className="w-[100px]  font-semibold  lg:mr-6 mr-2"
              size="md"
              color="white"
              onClick={() => setProcessIndex(processIndex + 1)}
            >
              Skip
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default Create;
