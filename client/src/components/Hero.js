import { Link, useNavigate } from "react-router-dom";
import { Button, Tooltip, useDisclosure } from "@chakra-ui/react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'

function Hero() {
  let navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <div className="w-full hero lg:flex sm:p-10 bg-blend-multiply mt-12">



{/* How to Modal */}
<Modal  isOpen={isOpen}  onClose={onClose}>
        <ModalOverlay bg="whiteAlpha.1000" backdropFilter="auto" backdropBlur="50px" />
        <ModalContent rounded='3xl'>
          <ModalCloseButton rounded='full' />
          <ModalBody >
            <div className="flex py-12 px-8 flex-col items-center justify-center">
              <h1 className="text-3xl text-center font-visita-bold" >What do you want <br /> to know about?</h1>
              <Button onClick={()=> navigate('franchisee/how-to-franchisee')} className="font-visita-bold hover:scale-105 hover:shadow-md hover:shadow-blue-200" _hover  rounded='full' mt='8' fontSize='lg' px='12' py='6' bg='#0062FF' color='white' >
                Franchisee <span className="flex items-center justify-center ml-2">
                  <ion-icon name="arrow-forward"></ion-icon>
                </span>
              </Button>
              <Button onClick={()=> window.open('https://scribehow.com/shared/Visita_Create_Card_Process__xIfmyzszTXSukxUZiWzWTw')} className="font-visita-bold hover:scale-105 hover:shadow-md hover:shadow-blue-200" _hover  rounded='full' mt='3' fontSize='lg' px='12' py='6' bg='#0062FF' color='white' >
                Create Card <span className="flex items-center justify-center ml-2">
                  <ion-icon name="arrow-forward"></ion-icon>
                </span>
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
{/* How to Modal */}





      <svg
        className="absolute hero-aura"
        xmlns="http://www.w3.org/2000/svg"
        opacity="0.27"
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
              stdDeviation="36"
            ></feGaussianBlur>
          </filter>
        </defs>
        <g filter="url(#bbblurry-filter)">
          <ellipse
            cx="288.874"
            cy="374.719"
            fill="hsla(212, 91%, 78%, 1)"
            rx="27.5"
            ry="277.5"
          ></ellipse>
          <ellipse
            cx="258.132"
            cy="285.161"
            fill="hsla(272, 99%, 54%, 0.46)"
            rx="27.5"
            ry="277.5"
          ></ellipse>
          <ellipse
            cx="331.338"
            cy="463.21"
            fill="hsla(167, 83%, 81%, 1)"
            rx="27.5"
            ry="277.5"
          ></ellipse>
        </g>
      </svg>

      <div className="lg:w-1/2  w-full  flex flex-col sm:pl-14 pl-6">



     

       
       <div className="lg:mt-0 mt-8">
       <p
        onClick={onOpen}
          class="mt-8 cursor-pointer inline-flex  justify-between items-center py-1 px-1 pr-4 text-sm text-gray-700 bg-gray-100 rounded-full :bg-gray-800 :text-white hover:bg-gray-200"
          role="alert"
        >
          <span class="flex text-sm font-visita-bold bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
           How to ?
          </span>
          <span class=" mr-2 text-sm font-visita-bold">

          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
            class="w-5 h-5 show-svg"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </p>
       </div>



            


        <h1  className="capitalize font-visita-black lg:pt-8 pt-8 lg:text-6xl text-5xl">
          Grow Your <br /> Business <span className="text-primary">Online</span>
        </h1>

        <p className="font-visita-medium text-xl mt-6  text-slate-600 lg:pr-16">
          Visita is the smartest way to grow your business by creating Digital
          Visiting Card - Mini Website
        </p>

        <div className="w-full mt-12 py-2">
         
            <Link
              to="/create"
              type="button"
              class="text-blue-500 hover:shadow-md transition-shadow border-2 border-blue-500 bg-white focus:ring-4 focus:ring-blue-300  rounded-full sm:text-2xl  text-xl font-visita-medium px-10 py-2.5 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800"
            >
              Create now
            </Link>
        

          <a
            onClick={() => navigate("/visita")}
            type="button"
            class="text-white bg-blue-600 bg-primary shadow-md shadow-blue-600 hover:shadow-blue-500 cursor-pointer transition-shadow focus:ring-4 focus:ring-blue-400  rounded-full sm:text-2xl text-xl font-visita-medium px-10 py-2.5 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800"
          >
            See Demo
          </a>
        </div>

        <div className="w-full mt-12 py-2 flex">
          <h1 className="font-visita-bold text-2xl sm:text-4xl ">
            1000+ <br />{" "}
            <span className="sm:text-2xl text-xl">Site Visitors</span>{" "}
          </h1>
          <h1 className="lg:text-4xl text-7xl lg:mt-4 -mt-3 lg:text-slate-600 text-slate-300 lg:ml-6 lg:mr-6 ml-3 mr-3">
            {" "}
            |{" "}
          </h1>
          <h1 className="font-visita-bold text-2xl sm:text-4xl ">
            600+ <br />{" "}
            <span className="sm:text-2xl text-xl">Cards Created</span>{" "}
          </h1>
        </div>
      </div>
      <div
        className="h-[800px] -mt-32
        lg:block hidden pr-12"
      >
        <lottie-player
          src="https://assets3.lottiefiles.com/packages/lf20_zyqfid68.json"
          background="transparent"
          speed="1"
          autoplay
          loop
        ></lottie-player>
      </div>
    </div>
  );
}

export default Hero;
