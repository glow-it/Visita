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
      <div className="lg:h-[88vh]   sm:p-10 mt-12">
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
                  Create Website{" "}
                  <span className="flex items-center justify-center ml-2">
                    <ion-icon name="arrow-forward"></ion-icon>
                  </span>
                </Button>
              </div>
            </ModalBody>
          </ModalContent>
        </Modal>
        {/* How to Modal */}

        <div className="  w-full   flex flex-col  items-center justify-center ">
          <h1
            data-aos="fade-down"
            className="z-50 lg:leading-[5.7rem] leading-[3.4rem] font-extrabold tracking-tighter  lg:text-center lg:ml-0 ml-8 pr-6 lg:pt-14 pt-20 lg:text-[5rem] text-5xl"
          >
            Easily Create A Website <br /> For Your Business
          </h1>

          <p className="font-medium z-50  text-lg mt-6 lg:text-center text-start lg:ml-0 ml-8 lg:pr-0 pr-6  text-slate-600 ">
            Build your business website in minutes with visita - No coding
            required.
          </p>

          <div className="lg:mt-12 z-50 w-[100%] mt-6  py-2 flex lg:flex-row flex-col lg:ml-0  items-start lg:items-center justify-center">
            <button
              onClick={() =>
                navigate("/pricing", {
                  state: { franchisee: false, franchisee_email: null },
                })
              }
              class="text-[#5241FE] lg:ml-0 ml-8 hover:-translate-y-[2px] hover:bg-[#5241FE] hover:text-white  transition-all border-2 border-[#5241FE] bg-white focus:ring-4 focus:ring-[#5241FE]  rounded-full sm:text-xl  text-xl font-medium px-10 py-2.5 mr-2 mb-2 :bg-[#5241FE] :hover:bg-[#5241FE] focus:outline-none :focus:ring-[#5241FE]"
            >
              Create now
            </button>

            <a
            href="https://applox.visitasmart.com"
              class="text-white bg-[#5241FE] lg:ml-0 ml-8  transition-all  hover:-translate-y-[2px] cursor-pointer  focus:ring-4 focus:ring-[#5241FE]  rounded-full sm:text-xl text-xl font-medium px-10 py-2.5 mr-2 mb-2"
            >
              See demo
            </a>
          </div>
        </div>

        <img
          className="absolute lg:block hidden right-0  z-10 top-0 lg:h-[500px] h-[300px]"
          src={require("../Images/herobg.png")}
        />
      </div>
      <div className="lg:block hidden z-50">
        <div className="lg:h-[500px] z-50  h-[150px] flex  lg:justify-center overflow-hidden lg:-mt-[200px] -mt-[150px]   w-full">
          <img
            src="https://cdn.dribbble.com/userupload/3352088/file/original-6eaf281a6ac1875db80b9abebb3bc173.png?compress=1&resize=1504x1128"
            muted
            autoPlay
            loop
            className=" lg:h-[680px] h-[210px] z-50 lg:ml-0 ml-8 rounded-[2rem]"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
