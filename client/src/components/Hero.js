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
  <div>
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
                Create Website <span className="flex items-center justify-center ml-2">
                  <ion-icon name="arrow-forward"></ion-icon>
                </span>
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
{/* How to Modal */}






      <div className="  w-full  flex flex-col items-center justify-center ">



     

       
       {/* <div className="lg:mt-0 mt-8">
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
       </div> */}



            


        <h1  className="capitalize font-visita-black text-center lg:pt-14 pt-20 lg:text-[5rem] text-5xl">
        Easily create a website <br /> for your business
        </h1>

        <p className="font-visita-medium text-lg mt-6 text-center  text-slate-600 ">
          Visita is the smartest way to grow your business by creating your own website
        </p>

        <div className="w-full mt-12 py-2 flex lg:flex-row flex-col items-center justify-center">
         
            <Link
              to="/create"
              type="button"
              class="text-blue-600 hover:-translate-y-[2px] hover:bg-blue-600 hover:text-white  transition-all border-2 border-blue-600 bg-white focus:ring-4 focus:ring-blue-300  rounded-full sm:text-xl  text-xl font-visita-medium px-10 py-2.5 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800"
            >
              Create now
            </Link>
        

          <p
            onClick={() => navigate("/visita")}
            type="button"
            class="text-white bg-blue-600 bg-primary transition-all  hover:-translate-y-[2px] cursor-pointer  focus:ring-4 focus:ring-blue-400  rounded-full sm:text-xl text-xl font-visita-medium px-10 py-2.5 mr-2 mb-2"
          >
            See Demo
          </p>
        </div>

        <div
        className="h-[800px] -mt-32
        lg:block hidden pr-12"
      >
        <img className="h-16 absolute right-[200px] top-[400px]" src="https://i.postimg.cc/LXSLCNT4/vecteezy-clean-and-hygiene-symbol-sparkle-shine-and-twinkle-icon-copy.jpg" alt="" />

        <img className="h-20 absolute left-[50px] top-[220px]" src="https://i.postimg.cc/LXSLCNT4/vecteezy-clean-and-hygiene-symbol-sparkle-shine-and-twinkle-icon-copy.jpg" alt="" />
      </div>

      
      

      </div>

      
    </div>
      <div className="lg:h-[500px] h-[300px] flex  justify-center overflow-hidden -mt-[200px] rounded-[4rem]   w-full">
      <img src="https://cdn.dribbble.com/userupload/3252126/file/original-dd196dd158aef93921f059e04eddf6b9.png?compress=1&resize=2048x1536" className=" lg:h-[680px] h-[210px] lg:mt-0 mt-24 rounded-3xl" />
      </div>
  </div>
  );
}

export default Hero;
