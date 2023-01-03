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
                Create  Website <span className="flex items-center justify-center ml-2">
                  <ion-icon name="arrow-forward"></ion-icon>
                </span>
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
{/* How to Modal */}






      <div className="  w-full  flex flex-col items-center justify-center ">



     

            


        <h1  className="  font-visita-black  lg:text-center lg:ml-0 ml-8 pr-6 lg:pt-14 pt-20 lg:text-[5rem] text-5xl">
        <span className="gradient-text" >Easily Create A Website </span> <br />  For Your Business
        </h1>

        <p className="font-visita-medium text-lg mt-6 lg:text-center text-start lg:ml-0 ml-8 lg:pr-0 pr-6  text-slate-600 ">
          Visita is the smartest way to grow your business by creating your own website
        </p>

        <div className="lg:mt-12 w-[100%] mt-6  py-2 flex lg:flex-row flex-col lg:ml-0  items-start lg:items-center justify-center">
         
            <Link
              to="/create"
              type="button"
              class="text-blue-600 lg:ml-0 ml-8 hover:-translate-y-[2px] hover:bg-blue-600 hover:text-white  transition-all border-2 border-blue-600 bg-white focus:ring-4 focus:ring-blue-300  rounded-full sm:text-xl  text-xl font-visita-medium px-10 py-2.5 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800"
            >
              Create now
            </Link>
        

          <p
            onClick={() => navigate("/visita")}
            type="button"
            class="text-white bg-blue-600 lg:ml-0 ml-8 bg-primary transition-all  hover:-translate-y-[2px] cursor-pointer  focus:ring-4 focus:ring-blue-400  rounded-full sm:text-xl text-xl font-visita-medium px-10 py-2.5 mr-2 mb-2"
          >
            See demo
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
      <div className="lg:block hidden">
      <div className="lg:h-[500px]  h-[150px] flex  lg:justify-center overflow-hidden lg:-mt-[200px] -mt-[150px]   w-full">
      <img src="https://cdn.dribbble.com/users/124059/screenshots/17638262/media/eb62e79b4990accb22fb421c22af1802.png?compress=1&resize=1600x1200&vertical=top" muted autoPlay loop className=" lg:h-[680px] h-[210px] lg:ml-0 ml-8 rounded-[2rem]" />
      </div>
      </div>
  </div>
  );
}

export default Hero;
