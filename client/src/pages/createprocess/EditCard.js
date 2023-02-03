import {
  Button,
  FormControl,
  FormLabel,
  Switch,
  Tooltip,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import CreateHeader from "../../components/CreateHeader";
import { useToast } from "@chakra-ui/react";
import $ from "jquery";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Toast } from "../../miniComponents/Toast";
import apiKeys from "../../Api/apiKeys";
import Spinner from "../../miniComponents/Spinner";
import Loading from "../../miniComponents/Loading";

function EditCard() {
  let navigate = useNavigate();

  useEffect(() => {
    if (cardDatas.activated) {
      var doc = prompt("Enter Website Password");

      if (doc != null) {
        if (doc != cardDatas.activated.access_password) {
          navigate("/");
        }
      } else {
        navigate("/");
      }
    }
  }, [cardDatas]);




  let params = useParams();
  let company_name = params.comp_name;

  const toast = useToast();
  const toastIdRef = React.useRef();

  let [previuos, setPrevious] = useState(false);
  let [skip, setSkip] = useState(false);
  let [processIndex, setProcessIndex] = useState(1);

  let [cardDatas, setCardDatas] = useState([]);
  let [loading, setLoading] = useState(false);
  let [isDatasLoading, setDatasLoading] = useState(true);

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
  let products = cardDatas && cardDatas.products;
  let image_gallery = cardDatas && cardDatas.image_gallery;
  let video_gallery = cardDatas && cardDatas.video_gallery;

  

  // Normal Use Effect
  useEffect(() => {
    const imgPreview = document.getElementById("create-logo-preview");
    if (imgPreview.querySelector("img").src == "") {
      imgPreview.querySelector("img").classList.replace("visible", "invisible");
    } else {
      imgPreview.querySelector("img").classList.replace("invisible", "visible");
    }
  }, [choosedThemeColor]);

  let maximumProcesses = 6;

  // Last Confirm Modal Disclosure
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    document.title = "Update - Visita";

    axios
      .get(`${apiKeys.server_url}/card/` + company_name)
      .then((response) => {
        setCardDatas(response.data);
        setDatasLoading(false);
        setChoosedThemeColor(response.data.theme_color);
      })
      .catch((err) => {
        toast({
          position: "top",
          duration: 1500,
          render: () => (
            <div className="py-2 px-3 mt-14 rounded-full bg-red-50 border border-red-300 text-red-600 flex items-center justify-center">
              <span className="mr-1 flex items-center justify-center">
                <ion-icon name="close-circle-outline"></ion-icon>
              </span>
              <span className="font-medium text-sm">{err.message}</span>
            </div>
          ),
        });
      });

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
    } else if (processIndex == 5) {
      document.getElementById("skip_button").removeAttribute("disabled", "");
    } else if (processIndex == 6) {
      document.getElementById("skip_button").removeAttribute("disabled", "");
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
      .classList.add("ring-4");
  }, [choosedThemeColor]);

  // Upload Files To Cloud
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
    axios.get(`${apiKeys.server_url}/card/all`).then((response) => {
      response.data.map((data) => {
        if (data.company_name == value) {
          company_name_input.classList.replace("bg-green-50", "bg-red-50");
          company_name_input.classList.replace(
            "border-green-500",
            "border-red-500"
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
        } else {
          company_name_input.classList.add(
            "bg-green-50",
            "border-green-500",
            "text-green-900",
            "placeholder-green-700"
          );

          company_name_input.classList.replace("bg-red-50", "bg-green-50");
          company_name_input.classList.replace(
            "border-red-500",
            "border-green-500"
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
        }
      });
    });
  }

  // Generate GPT Text Completion
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
    <form
      id="updateCardForm"
      className="h-screen w-full flex flex-col items-center"
    >
      <Loading isLoading={isDatasLoading} />

      <input
        type="text"
        name="isPremium"
        value={cardDatas.isPremium}
        className="hidden"
      />

      <CreateHeader
        processIndex={processIndex}
        loading={loading}
        hideIndicators={false}
        isUpdate={true}
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
              Are You Sure To Update?
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
              You can make sure that the information you provided is correct.
            </span>
          </ModalBody>
          <ModalFooter
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Button rounded="full" mr={3} variant="solid" onClick={onClose}>
              <span className="font-bold">Cancel</span>
            </Button>

            <Button
              rounded="full"
              color="#fff"
              _hover
              bgColor="#5046E4"
              onClick={() => {
                setLoading(true);
                onClose();
                let updateCardForm = document.getElementById("updateCardForm");
                const myFormData = new FormData(updateCardForm);

                const formDataObj = {};
                myFormData.forEach((value, key) => (formDataObj[key] = value));

                axios
                  .post(
                    `${apiKeys.server_url}/updatecard/${company_name}`,
                    formDataObj
                  )
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
              <span className="font-semibold">Update</span>
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
                Company Name
              </label>
              <input
                placeholder="Enter company name"
                autoComplete="off"
                required
                id="large-input"
                onChange={(e) => checkCompanyNameExists(e.target.value)}
                defaultValue={cardDatas && cardDatas.company_name}
                name="company_name"
                class="company_name_input company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <p class="error-message mt-2 text-sm text-green-600 font-medium"></p>

              <label
                for="large-input"
                class="block mb-6 text-lg font-medium text-gray-900 :text-gray-300 mt-8"
              >
                Upload Company Logo
              </label>

              <div className="create-logo-upload flex items-center">
                <div id="create-logo-preview">
                  <img
                    src={cardDatas && cardDatas.logo}
                    className={`ring-4  transition-all  ring-offset-8 rounded-full ring-${choosedThemeColor}-600`}
                  />
                </div>
                <input
                  type="file"
                  onChange={(e) => {
                    uploadImage(e.target.files, "logo");
                  }}
                  id="create-choose-logo"
                  accept="image/*"
                />
                <input
                  type="text"
                  defaultValue={cardDatas && cardDatas.logo}
                  name="logo"
                  id="logo"
                  className="hidden"
                />
                <label
                  for="create-choose-logo"
                  id="choose_logo_button"
                  className="-ml-5 hover:bg-slate-800 hover:text-white transition-colors  lg:text-md text:sm cursor-pointer border-slate-800 border px-4 py-2 rounded-full font-bold text-slate-800"
                >
                  Change Logo
                </label>
              </div>

              <div id="choose_theme_color" className="flex flex-col ">
                <label
                  for="large-input"
                  class="block mb-2 text-lg font-medium text-gray-900 :text-gray-300 mt-4"
                >
                  Choose Matching Theme Color{" "}
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
                class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
              >
                Company Category
              </label>
              <input
                placeholder="Enter your company category"
                autoComplete="off"
                required
                defaultValue={cardDatas && cardDatas.company_category}
                id="category_input"
                name="company_category"
                class="  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium text-gray-900 border-slate-800 :text-gray-300 mt-6"
              >
                Tagline
              </label>

              <div className="relative flex items-center ">
                <input
                  placeholder="Enter tagline for your company"
                  autoComplete="off"
                  id="tagline_input"
                  name="tagline"
                  defaultValue={cardDatas && cardDatas.tagline}
                  className="   focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
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
                First Name
              </label>
              <input
                placeholder="Enter your first name"
                autoComplete="off"
                required
                id="large-input"
                defaultValue={cardDatas && cardDatas.first_name}
                name="first_name"
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Last Name{" "}
              </label>
              <input
                placeholder="Enter your last name"
                autoComplete="off"
                id="large-input"
                name="last_name"
                defaultValue={cardDatas && cardDatas.last_name}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Position/Designation
              </label>
              <input
                placeholder="(Ex. Manager etc.)"
                autoComplete="off"
                id="large-input"
                required
                name="position"
                defaultValue={cardDatas && cardDatas.position}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Phone No
              </label>
              <input
                placeholder="+91 Enter Phone No"
                autoComplete="off"
                id="large-input"
                required
                name="phone_no"
                defaultValue={cardDatas && cardDatas.phone_no}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Alternative Phone No{" "}
              </label>
              <input
                placeholder="+91 Enter Alt Phone No"
                autoComplete="off"
                id="large-input"
                name="alt_phone_no"
                defaultValue={cardDatas && cardDatas.alt_phone_no}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Whatsapp No
              </label>
              <input
                placeholder="+91 Enter Whatsapp No"
                autoComplete="off"
                required
                id="large-input"
                name="whatsapp_no"
                defaultValue={cardDatas && cardDatas.whatsapp_no}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Address
              </label>
              <input
                placeholder="Full address"
                autoComplete="off"
                required
                id="large-input"
                name="address"
                defaultValue={cardDatas && cardDatas.address}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Email Id
              </label>
              <input
                placeholder="Email Address"
                autoComplete="off"
                required
                id="large-input"
                name="email_id"
                defaultValue={cardDatas && cardDatas.email_id}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Website{" "}
              </label>
              <input
                placeholder="Enter website url"
                autoComplete="off"
                id="large-input"
                name="website"
                defaultValue={cardDatas && cardDatas.website}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Location{" "}
              </label>
              <input
                placeholder="Your business location"
                autoComplete="off"
                id="large-input"
                name="location"
                defaultValue={cardDatas && cardDatas.location}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Google Map Location Url{" "}
              </label>
              <input
                placeholder="Your location url GOOGLE MAP"
                autoComplete="off"
                id="large-input"
                defaultValue={cardDatas && cardDatas.gmap_location}
                name="gmap_location"
                class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                City
              </label>
              <input
                placeholder="Enter your city"
                autoComplete="off"
                id="large-input"
                required
                name="city"
                defaultValue={cardDatas && cardDatas.city}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Company Est Date
              </label>
              <input
                placeholder="When Your Comp Was Started?"
                autoComplete="off"
                id="large-input"
                required
                name="since"
                defaultValue={cardDatas && cardDatas.since}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                About Company
              </label>
              <input
                placeholder="About Your Company"
                autoComplete="off"
                id="large-input"
                required
                name="about"
                defaultValue={cardDatas && cardDatas.about}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Specialities{" "}
                <span className="text-slate-400 text-sm ml-2 font-medium">
                  Seperate with comma ( , )
                </span>
              </label>
              <input
                placeholder="Seperate with comma ( , )"
                autoComplete="off"
                id="large-input"
                name="specials"
                defaultValue={cardDatas && cardDatas.specials}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
              />

              <label
                for="large-input"
                class="block mb-2 lg:text-lg text-md font-medium mt-6 text-gray-900 border-slate-800 :text-gray-300"
              >
                Features{" "}
                <span className="text-slate-400 text-sm ml-2 font-medium">
                  Seperate with comma ( , )
                </span>
              </label>
              <input
                placeholder="Seperate with comma ( , )"
                autoComplete="off"
                id="large-input"
                name="features"
                defaultValue={cardDatas && cardDatas.features}
                class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
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
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            <i class="fa-brands fa-facebook mr-1"></i> Facebook Link{" "}
          </label>
          <input
            placeholder="Enter facebook link"
            autoComplete="off"
            id="large-input"
            name="facebook_link"
            defaultValue={cardDatas && cardDatas.facebook_link}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-instagram mr-1"></i> Instagram Link{" "}
          </label>
          <input
            placeholder="Enter instagram link"
            autoComplete="off"
            id="large-input"
            name="instagram_link"
            defaultValue={cardDatas && cardDatas.instagram_link}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-twitter mr-1"></i> Twitter Link{" "}
          </label>
          <input
            placeholder="Enter twitter link"
            autoComplete="off"
            id="large-input"
            name="twitter_link"
            defaultValue={cardDatas && cardDatas.twitter_link}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-linkedin mr-1"></i> LinkedIn Link{" "}
          </label>
          <input
            placeholder="Enter linkedin link"
            autoComplete="off"
            id="large-input"
            name="linkedin_link"
            defaultValue={cardDatas && cardDatas.linkedin_link}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-youtube mr-1"></i> Youtube Link{" "}
          </label>
          <input
            placeholder="Enter youtube link"
            autoComplete="off"
            id="large-input"
            name="youtube_link"
            defaultValue={cardDatas && cardDatas.youtube_link}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            <i class="fa-brands fa-pinterest mr-1"></i> Pinterest Link{" "}
          </label>
          <input
            placeholder="Enter pinterest link"
            autoComplete="off"
            id="large-input"
            name="pinterest_link"
            defaultValue={cardDatas && cardDatas.pinterest_link}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <h1 className="text-xl mt-12 font-bold mb-12 flex justify-center">
            {" "}
            Youtube Video Links
          </h1>

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 1{" "}
          </label>
          <input
            placeholder="Youtube video link 1"
            autoComplete="off"
            id="large-input"
            name="ytvideo_1_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[0]}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 2{" "}
          </label>
          <input
            placeholder="Youtube video link 2"
            autoComplete="off"
            id="large-input"
            name="ytvideo_2_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[1]}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 3{" "}
          </label>
          <input
            placeholder="Youtube video link 3"
            autoComplete="off"
            id="large-input"
            name="ytvideo_3_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[2]}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 4{" "}
          </label>
          <input
            placeholder="Youtube video link 4"
            autoComplete="off"
            id="large-input"
            name="ytvideo_4_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[3]}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 mt-6 text-lg font-medium text-gray-900 :text-gray-300"
          >
            Youtube Video Link 5{" "}
          </label>
          <input
            placeholder="Youtube video link 5"
            autoComplete="off"
            id="large-input"
            name="ytvideo_5_link"
            defaultValue={cardDatas.yt_videos && cardDatas.yt_videos[4]}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          {/* File Video Links */}

          {cardDatas && cardDatas.isPremium == "true" ? (
            <div>
              <h1 className="text-xl mt-12 font-bold mb-12 flex justify-center">
                Videos from gallery
              </h1>

              {video_gallery &&
                video_gallery.map((data, index) => {
                  return (
                    <div>
                      <label
                        for="large-input"
                        class="block mb-2 mt-6 text-lg font-medium text-gray-900 border-slate-800 :text-gray-300"
                      >
                        Video {index + 1}
                      </label>
                      {data != "" ? (
                        <video
                          controls
                          src={data}
                          className="my-5 rounded-lg h-[300px]"
                        ></video>
                      ) : (
                        ""
                      )}

                      <input
                        placeholder={"Video " + index + 1}
                        onChange={(e) => {
                          uploadVideo(
                            e.target.files,
                            `edit_video_${index + 1}_input`
                          );
                        }}
                        accept="video/*"
                        type="file"
                        autoComplete="off"
                        class=" font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-indigo-500"
                      />
                      <input
                        className="hidden"
                        defaultValue={data}
                        type="text"
                        name={`video_${index + 1}`}
                        id={`edit_video_${index + 1}_input`}
                      />
                    </div>
                  );
                })}
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
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            Paytm Number{" "}
          </label>
          <input
            placeholder="Enter paytm number"
            autoComplete="off"
            id="large-input"
            name="paytm_number"
            defaultValue={cardDatas && cardDatas.paytm_number}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            Google Pay Number{" "}
          </label>
          <input
            placeholder="Enter google pay number"
            autoComplete="off"
            id="large-input"
            name="googlepay_number"
            defaultValue={cardDatas && cardDatas.googlepay_number}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            PhonePe Number{" "}
          </label>
          <input
            placeholder="Enter phonepe number"
            autoComplete="off"
            id="large-input"
            name="phonepe"
            defaultValue={cardDatas && cardDatas.phonepe}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <h1 className="text-xl mt-12 font-bold mb-12 flex justify-center">
            {" "}
            Payment QR Codes
          </h1>

          <label
            for="large-input"
            class="block mb-4 text-lg font-medium text-gray-900 :text-gray-300 mt-6"
          >
            Paytm QR Code{" "}
          </label>
          {cardDatas && cardDatas.paytm_qrcode ? (
            <img
              src={cardDatas && cardDatas.paytm_qrcode}
              className="h-32 mb-4"
            />
          ) : (
            ""
          )}
          <input
            className="company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm "
            id="large_size"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files, "paytm_qrcode");
            }}
          />
          <input
            defaultValue={cardDatas && cardDatas.paytm_qrcode}
            type="text"
            name="paytm_qrcode"
            id="paytm_qrcode"
            className="hidden"
          />

          <label
            for="large-input"
            class="block mb-4 text-lg font-medium text-gray-900 :text-gray-300 mt-6"
          >
            Google Pay QR Code{" "}
          </label>
          {cardDatas && cardDatas.googlepay_qrcode ? (
            <img
              src={cardDatas && cardDatas.googlepay_qrcode}
              className="h-32 mb-4"
            />
          ) : (
            ""
          )}
          <input
            className="company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm "
            id="large_size"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files, "googlepay_qrcode");
            }}
          />
          <input
            defaultValue={cardDatas && cardDatas.googlepay_qrcode}
            type="text"
            name="googlepay_qrcode"
            id="googlepay_qrcode"
            className="hidden"
          />

          <label
            for="large-input"
            class="block mb-4 text-lg font-medium text-gray-900 :text-gray-300 mt-6"
          >
            PhonePe QR Code{" "}
          </label>
          {cardDatas && cardDatas.phonepe_qrcode ? (
            <img
              src={cardDatas && cardDatas.phonepe_qrcode}
              className="h-32 mb-4"
            />
          ) : (
            ""
          )}
          <input
            className="company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm "
            id="large_size"
            type="file"
            onChange={(e) => {
              uploadImage(e.target.files, "phonepe_qrcode");
            }}
          />
          <input
            type="text"
            defaultValue={cardDatas && cardDatas.phonepe_qrcode}
            name="phonepe_qrcode"
            id="phonepe_qrcode"
            className="hidden"
          />

          <h1 className="text-xl mt-12 font-bold mb-12 flex justify-center">
            {" "}
            Bank Account Details
          </h1>

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            Bank Name
          </label>
          <input
            placeholder="Bank account.Ex.SBI,HDFC etc..."
            autoComplete="off"
            id="large-input"
            name="bank_name"
            defaultValue={cardDatas && cardDatas.bank_name}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            Account Holder Name
          </label>
          <input
            placeholder="Account holder name"
            autoComplete="off"
            id="large-input"
            name="account_holder_name"
            defaultValue={cardDatas && cardDatas.account_holder_name}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            Bank Account Number
          </label>
          <input
            placeholder="Bank account number"
            autoComplete="off"
            id="large-input"
            name="bank_account_number"
            defaultValue={cardDatas && cardDatas.bank_account_number}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            Bank IFSC Code
          </label>
          <input
            placeholder="IFSC Code"
            autoComplete="off"
            id="large-input"
            name="bank_ifsc_code"
            defaultValue={cardDatas && cardDatas.bank_ifsc_code}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />

          <label
            for="large-input"
            class="block mb-2 lg:text-lg text-md font-medium text-gray-900 :text-gray-300 mt-6"
          >
            GST
          </label>
          <input
            placeholder="Enter GST number"
            autoComplete="off"
            id="large-input"
            name="gst"
            defaultValue={cardDatas && cardDatas.gst}
            class=" company_name_input  focus:border-indigo-500 font-medium block py-4     pl-[20px] lg:min-w-[600px] min-w-[300px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm"
          />
        </div>

        {/* Products Or Services */}
        <div
          id="process5"
          class={`${
            processIndex != 5 ? "hidden" : ""
          }  my-3 process5_wrapper pb-40 overflow-scroll w-full`}
        >
          {products &&
            products.map((data, index) => {
              return (
                <div className="flex flex-col lg:items-start items-center">
                  <label
                    for="large-input"
                    class="block mb-2 lg:text-lg  text-md font-medium text-gray-900 border-slate-800 :text-gray-300 lg:mt-6 mt-10"
                  >
                    Product Or Service {index + 1}
                  </label>
                  <div className="lg:w-full  lg:pb-8 pb-24   lg:mt-0  rounded-3xl flex lg:flex-row flex-col items-center  py-8  ">
                    <div className=" flex-col flex border border-slate-800 py-[30px] lg:px-0 px-8 lg:mb-0 mb-6 justify-center  lg:w-[400px] w-[280px]   rounded-md  items-center">
                      {data.product_image != "" ? (
                        <img
                          src={data.product_image}
                          className="  mb-10 h-[200px] w-[200px] rounded-xl border"
                        />
                      ) : (
                        ""
                      )}

                      <div class="flex justify-center w-full  lg:pl-12 lg:py-0  items-center">
                        <input
                          className="  font-medium block py-3.5    text-gray-900 transition-all  sm:text-sm text-sm"
                          id="large_size"
                          type="file"
                          onChange={(e) => {
                            uploadImage(
                              e.target.files,
                              `product_image_${index + 1}`
                            );
                          }}
                        />
                        <input
                          defaultValue={data.product_image}
                          type="text"
                          name={`product_image_${index + 1}`}
                          id={`product_image_${index + 1}`}
                          className="hidden"
                        />
                      </div>
                    </div>

                    <div className="w-full flex flex-col justify-center px-2">
                      <input
                        placeholder="Enter Product Name"
                        autoComplete="off"
                        id="large-input"
                        name={`product_${index + 1}_name`}
                        defaultValue={data.product_name}
                        class="font-medium block py-4    lg: pl-[20px] lg:ml-6 pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500 my-2"
                      />

                      <input
                        placeholder="Enter Product Description (Optional)"
                        autoComplete="off"
                        id="large-input"
                        name={`product_${index + 1}_description`}
                        defaultValue={data.product_description}
                        class=" font-medium block py-4    lg: pl-[20px] lg:ml-6 pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500 my-2"
                      />

                      <input
                        placeholder="₹ Enter Product Original Price"
                        autoComplete="off"
                        id="large-input"
                        name={`product_${index + 1}_orgprice`}
                        defaultValue={data.product_orgprice}
                        class=" font-medium block py-4    lg: pl-[20px] lg:ml-6 pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500 my-2"
                      />

                      <input
                        placeholder="₹ Enter Product Offer Price"
                        autoComplete="off"
                        id="large-input"
                        name={`product_${index + 1}_offerprice`}
                        defaultValue={data.product_offerprice}
                        class=" font-medium block py-4    lg: pl-[20px] lg:ml-6 pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500 my-2"
                      />

                      <input
                        placeholder="Enter Product Link (Optional)"
                        autoComplete="off"
                        id="large-input"
                        name={`product_${index + 1}_link`}
                        defaultValue={data.product_link}
                        class=" font-medium block py-4    lg: pl-[20px] lg:ml-6 pr-[30px] text-gray-900 border-slate-800 transition-all rounded-md border    sm:text-sm text-sm  focus:border-indigo-500 my-2"
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
          {image_gallery &&
            image_gallery.map((data, index) => {
              return (
                <div>
                  <label
                    for="image"
                    class="block mb-2 lg:text-lg  text-md font-medium text-gray-900 :text-gray-300 lg:mt-6 mt-10 "
                  >
                    Image {index + 1}
                  </label>
                  <div className="lg:w-full lg:h-auto h-20 lg:pb-8 pb-24  lg:mt-0   flex lg:flex-row flex-col items-center  py-8   border-b border-b-slate-800">
                    <div class="flex justify-center lg:w-[400px] w-[250px] lg:py-0 pb-8 items-center">
                      <img src={data} className="lg:h-32 h-16 rounded-xl" />
                      <input
                        className=" ml-6 font-medium block py-3.5    px-12  text-gray-900 transition-all rounded-full border-2  sm:text-sm text-sm focus:shadow-blue-600/30 focus:ring-blue-500 focus:border-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 "
                        id="image"
                        type="file"
                        onChange={(e) => {
                          uploadImage(e.target.files, `image_${index + 1}`);
                        }}
                      />

                      <input
                        defaultValue={data}
                        type="text"
                        name={`image_${index + 1}`}
                        id={`image_${index + 1}`}
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>
              );
            })}
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
                ? "Update Website"
                : "Save & continue"}
            </Button>

            <Button
              id="skip_button"
              display="none"
              colorScheme="blue"
              rounded={"3xl"}
              backgroundColor="#0062FF"
              _hover
              className="w-[100px] font-bold  lg:mr-6 mr-2"
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
