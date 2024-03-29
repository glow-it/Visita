import { useNavigate } from "react-router-dom";
import { Button, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

function Hero() {
  let navigate = useNavigate();
  const { isOpen, onClose } = useDisclosure();

  return (
    <div className="w-full">
      <div className="lg:h-[100vh] relative  bg-blue-50 ">

        {/* <div className="w-full h-44  flex  text-6xl animate-pulse  justify-center absolute bottom-0">
        ↓
        </div> */}
    
        {/* How to Modal */}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay
            bg="whiteAlpha.1000"
            backdropFilter="auto"
            backdropBlur="50px"
          />
          <ModalContent rounded="3xl">
            <ModalCloseButton rounded="full" />
            <ModalBody>
              <div className="flex py-12 px-8 flex-col items-center justify-center">
                <h1 className="text-3xl text-center font-bold">
                  What do you want <br /> to know about?
                </h1>
                <Button
                  onClick={() => navigate("franchisee/how-to-franchisee")}
                  className="font-bold hover:scale-105 hover:shadow-md hover:shadow-[#5241FE]"
                  _hover
                  rounded="full"
                  mt="8"
                  fontSize="lg"
                  px="12"
                  py="6"
                  bg="#0062FF"
                  color="white"
                >
                  Franchisee{" "}
                  <span className="flex items-center justify-center ml-2">
                    <ion-icon name="arrow-forward"></ion-icon>
                  </span>
                </Button>
                <Button
                  onClick={() =>
                    window.open(
                      "https://scribehow.com/shared/Visita_Create_Card_Process__xIfmyzszTXSukxUZiWzWTw"
                    )
                  }
                  className="font-bold hover:scale-105 hover:shadow-md hover:shadow-[#5241FE]"
                  _hover
                  rounded="full"
                  mt="3"
                  fontSize="lg"
                  px="12"
                  py="6"
                  bg="#0062FF"
                  color="white"
                >
                  Create card{" "}
                  <span className="flex items-center justify-center ml-2">
                    <ion-icon name="arrow-forward"></ion-icon>
                  </span>
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* How to Modal */}

        <div className="  w-full   flex flex-col lg:pb-0 pb-10  items-center justify-center lg:px-0 px-10">



          <h1
            data-aos="fade-up"
            data-aos-delay="0"
            className="z-50 lg:leading-[5.7rem] leading-[3.4rem] font-extrabold tracking-tighter  lg:text-center  pr-6 lg:pt-14 pt-20 lg:mt-28 mt-12 lg:text-[5rem] text-5xl text-black"
          >
            Create Digital Visiting <br /> Card <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#02C7FF] to-[#01A1FE]" > in Minutes.</span>
          </h1>

          <p data-aos="fade-up"
            data-aos-delay="100" className="font-medium z-50  lg:text-2xl text-lg mt-6 lg:text-center text-start  lg:pr-0 pr-6  text-black ">
            Unleash the power of professional digital visiting cards with <br /> Visita in under 10 minutes, without any technical skills required.
          </p>

          <div className="lg:mt-12 z-50 w-[100%] mt-6  py-2 flex lg:flex-row flex-col lg:ml-0  items-start lg:items-center justify-center">
           

            <button data-aos="fade-up"
            data-aos-delay="200"
            onClick={() =>
              navigate("/pricing", {
                state: { franchisee: false, franchisee_email: null },
              })
            }
              class="text-white bg-gradient-to-r hover:bg-gradient-to-l  from-[#02C7FF] to-[#01A1FE] bg-[]   transition-all  hover:-translate-y-[2px] cursor-pointer  focus:ring-4  rounded-xl sm:text-2xl text-xl font-bold px-10 py-2.5 mr-4 mb-2"
            >
              Create now
            </button>

            <a data-aos="fade-up"
            data-aos-delay="300"
            href="https://applox.visitasmart.com"
              class="text-white  flex bg-black  transition-all  hover:-translate-y-[2px] cursor-pointer  focus:ring-4  rounded-xl sm:text-2xl text-xl font-bold px-10 py-2.5 mr-2 mb-2"
            >
              See demo
            </a>
          </div>
        </div>

        {/* <img
          className="absolute lg:block hidden right-0  z-10 top-0 lg:h-[300px] h-[300px]"
          src={require("../Images/herobg.png")}
        /> */}
      </div>
      
    </div>
  );
}

export default Hero;
