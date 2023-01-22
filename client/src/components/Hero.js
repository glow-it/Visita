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
  <div className="w-full" >
      <div className="lg:h-[88vh]   sm:p-10 mt-12">





{/* How to Modal */}
<Modal  isOpen={isOpen}  onClose={onClose}>
        <ModalOverlay bg="whiteAlpha.1000" backdropFilter="auto" backdropBlur="50px" />
        <ModalContent rounded='3xl'>
          <ModalCloseButton rounded='full' />
          <ModalBody >
            <div className="flex py-12 px-8 flex-col items-center justify-center">
              <h1 className="text-3xl text-center font-bold" >What do you want <br /> to know about?</h1>
              <Button onClick={()=> navigate('franchisee/how-to-franchisee')} className="font-bold hover:scale-105 hover:shadow-md hover:shadow-blue-200" _hover  rounded='full' mt='8' fontSize='lg' px='12' py='6' bg='#0062FF' color='white' >
                Franchisee <span className="flex items-center justify-center ml-2">
                  <ion-icon name="arrow-forward"></ion-icon>
                </span>
              </Button>
              <Button onClick={()=> window.open('https://scribehow.com/shared/Visita_Create_Card_Process__xIfmyzszTXSukxUZiWzWTw')} className="font-bold hover:scale-105 hover:shadow-md hover:shadow-blue-200" _hover  rounded='full' mt='3' fontSize='lg' px='12' py='6' bg='#0062FF' color='white' >
                Create  Website <span className="flex items-center justify-center ml-2">
                  <ion-icon name="arrow-forward"></ion-icon>
                </span>
              </Button>
            </div>
          </ModalBody>
        </ModalContent>
      </Modal>
{/* How to Modal */}






      <div className="  w-full   flex flex-col  items-center justify-center ">



     

            


        <h1  data-aos="fade-down" data-aos-delay="0"   className="z-50 lg:leading-[5.7rem] leading-[3.4rem] font-extrabold tracking-tighter  lg:text-center lg:ml-0 ml-8 pr-6 lg:pt-14 pt-20 lg:text-[5rem] text-5xl">
       Easily Create A Website  <br />  For Your Business
        </h1>

        <p data-aos="fade-up" data-aos-delay="200" className="font-medium z-50 text-lg mt-6 lg:text-center text-start lg:ml-0 ml-8 lg:pr-0 pr-6  text-slate-600 ">
          Visita is the smartest way to grow your business by creating your own website
        </p>

        <div className="lg:mt-12 z-50 w-[100%] mt-6  py-2 flex lg:flex-row flex-col lg:ml-0  items-start lg:items-center justify-center">
         
            <button
            data-aos="fade-up" data-aos-delay="300"
               onClick={()=> navigate('/pricing',{state:{franchisee:false,franchisee_email:null}})} 
              type="button"
              class="text-blue-600 lg:ml-0 ml-8 hover:-translate-y-[2px] hover:bg-blue-600 hover:text-white  transition-all border-2 border-blue-600 bg-white focus:ring-4 focus:ring-blue-300  rounded-full sm:text-xl  text-xl font-medium px-10 py-2.5 mr-2 mb-2 :bg-blue-600 :hover:bg-blue-700 focus:outline-none :focus:ring-blue-800"
            >
              Create now
            </button>
        

          <p
          data-aos="fade-up" data-aos-delay="400"
            onClick={() => navigate("/visita")}
            type="button"
            class="text-white bg-blue-600 lg:ml-0 ml-8 bg-primary transition-all  hover:-translate-y-[2px] cursor-pointer  focus:ring-4 focus:ring-blue-400  rounded-full sm:text-xl text-xl font-medium px-10 py-2.5 mr-2 mb-2"
          >
            See demo
          </p>
        </div>

        
      
      



</div>

<img  className="absolute right-0  z-10 top-0 lg:h-[500px] h-[300px]" src="https://oodesign.github.io/mesh-gradients/web/img/medium-herobg-E3005284-68A2-4730-90FE-F4B5820A5B8C.png"  />
      
    </div>
      <div className="lg:block hidden z-50">
      <div className="lg:h-[500px] z-50  h-[150px] flex  lg:justify-center overflow-hidden lg:-mt-[200px] -mt-[150px]   w-full">
      <img data-aos="fade-up" data-aos-delay="500" src="https://cdn.dribbble.com/userupload/4254311/file/original-3e55e344e93279b74a363e2b87e74b72.png?compress=1&resize=2048x1536" muted autoPlay loop className=" lg:h-[680px] h-[210px] z-50 lg:ml-0 ml-8 rounded-[2rem]" />
      </div>
      </div>
  </div>
  );
}

export default Hero;
