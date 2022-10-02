import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useDisclosure,
} from '@chakra-ui/react'
import { ChevronDownIcon } from "@chakra-ui/icons";

import {
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
} from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";


function Header() {

  const { isOpen, onOpen, onClose } = useDisclosure()
  const [placement, setPlacement] = React.useState('right')

window.onscroll = ()=> {
  let header = document.querySelector('header');
  if(window.scrollY >= 50){
    header.classList.add('header-active')
  }else{
    header.classList.remove('header-active')
  }
}

let navigate = useNavigate()



  return (
    
    <div>

      <header className="lg:-ml-0 -ml-4 w-full h-16 flex py-8 pl-8  bg-white fixed z-50 transition-shadow">
        <div className="w-3/4 h-full flex items-center">
          <img
            src="../assets/images/logos/visitalogo.png"
            className="h-10 mr-6 cursor-pointer"
            onClick={()=> navigate('/')}
          />
          <nav className="w-full h-full flex items-center lg:block hidden">
            <ul className="w-full h-full flex items-center">
              <a href="#" className="font-visita-medium mx-3  cursor-pointer text-third hover:text-blue-600 transition-colors flex items-center">
                See Demos
              </a>
              <Link to='/pricing' className="font-visita-medium mx-3  cursor-pointer text-third hover:text-blue-600 transition-colors flex items-center">
                Pricing
              </Link>
              <a href="#features" className="font-visita-medium mx-3  cursor-pointer text-third hover:text-blue-600 transition-colors flex items-center">
                Features
              </a>
              <a href="#benefits" className="font-visita-medium mx-3  cursor-pointer text-third hover:text-blue-600 transition-colors flex items-center">
                Benefits
              </a>
              <a onClick={()=> navigate('/templates')} className="font-visita-medium mx-3  cursor-pointer text-third hover:text-blue-600 transition-colors flex items-center">
                Templates
              </a>
              <Menu>
                <MenuButton rightIcon={<ChevronDownIcon />}>
                  <span className="font-visita-medium mx-3  cursor-pointer text-third hover:text-blue-600 transition-colors flex items-center" >Support <ion-icon name="chevron-down-outline"></ion-icon> </span>
                </MenuButton>
                <MenuList>
                  <MenuItem><Link to='/support' className="font-visita-medium mx-3  cursor-pointer text-third hover:text-blue-600 transition-colors flex items-center"><span className="mr-2 flex items-center"><ion-icon name="help-buoy-outline"></ion-icon></span>  Help Center</Link></MenuItem>
                  <MenuItem><a href="mailto:sprt.visita@gmail.com" className="font-visita-medium mx-3  cursor-pointer text-third hover:text-blue-600 transition-colors flex items-center"><span className="mr-2 flex items-center"><ion-icon name="mail" ></ion-icon></span> Mail</a></MenuItem>
                </MenuList>
              </Menu>
              <a href="#"  className="font-visita-medium mx-3  cursor-pointer text-blue-600 transition-colors flex items-center">
              <span className="flex items-center justify-center mr-2" ><ion-icon name="log-in" ></ion-icon></span> Franchisee Login
              </a>

            </ul>
          </nav>
          <div className="lg:hidden block bg-red-500 w-full flex justify-end -mr-32 items-center h-full" >
          <span onClick={onOpen} className="text-3xl sm:-mr-24 cursor-pointer" ><ion-icon name="menu"></ion-icon></span>
          </div>
        
        </div>
        <div className="h-full w-1/4 flex  items-center lg:visible invisible">
        <h1 className="font-visita-medium mx-4 cursor-pointer text-third  transition-colors flex items-center">
                <span className="underline hover:decoration-blue-500 ">How to</span> ?
              </h1>
        <Link to="/create" class="py-1.5 px-8 text-md font-medium text-blue-600 focus:outline-none bg-white rounded-full border-2 border-blue-600 transition-shadow  hover:shadow-md hover:shadow-blue-300 focus:z-10 focus:ring-4 focus:ring-blue-200 :focus:ring-gray-700 :bg-gray-800 :text-gray-400 :border-gray-600 :hover:text-white :hover:bg-gray-700 font-visita-medium">Create now</Link>
        </div>
      </header>

     <div>
       <Drawer placement={placement} onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay p="4" bg="whiteAlpha.1000" backdropFilter="auto" backdropBlur="2px" />
        <DrawerContent>
          <DrawerHeader borderBottomWidth='1px'>
           <div className=" w-full flex items-center relative py-3" >
           <span className="font-visita-bold cursor-pointer absolute left-0" >Visita</span>
          <span onClick={onClose} className="text-3xl mt-2 cursor-pointer absolute right-0" ><ion-icon name="menu"></ion-icon></span>
          </div>
          </DrawerHeader>
          <DrawerBody>
            <p className="font-visita-bold cursor-pointer mt-4" ><span className=" text-md flex items-center text-primary" ><ion-icon name="albums"></ion-icon> <span className="ml-2 text-slate-600" >See Demos</span></span> </p>

            <p onClick={()=> {navigate('/pricing');onClose()}} className="font-visita-bold cursor-pointer mt-3" ><span className=" text-md flex items-center text-primary" ><ion-icon name="card"></ion-icon> <span className="ml-2 text-slate-600" >Pricing</span></span> </p>

            <p onClick={()=> onClose()} href='#features' className="font-visita-bold cursor-pointer mt-3" ><span className=" text-md flex items-center text-primary" ><ion-icon name="logo-buffer"></ion-icon> <span className="ml-2 text-slate-600" >Features</span></span> </p>

            <p onClick={()=> onClose()} href='#benefits' className="font-visita-bold cursor-pointer mt-3" ><span className=" text-md flex items-center text-primary" ><ion-icon name="bulb"></ion-icon> <span className="ml-2 text-slate-600" >Benefits</span></span> </p>

            <p className="font-visita-bold cursor-pointer mt-3" ><span className=" text-md flex items-center text-primary" ><ion-icon name="scan-circle"></ion-icon> <span className="ml-2 text-slate-600" >Templates</span></span> </p>

            <DrawerHeader borderBottomWidth='0.5px'>
           <div className=" w-full flex items-center relative mt-6" >
           <span className="font-visita-bold cursor-pointer text-sm -ml-6" >Support</span>
          </div>
          </DrawerHeader>

          <p onClick={() => {navigate('/support');onClose()}} className=" font-visita-bold cursor-pointer mt-3" ><span className="text-md flex items-center text-primary" ><ion-icon name="help-buoy"></ion-icon> <span className="ml-2 text-slate-600" >Help Center</span></span> </p>

          <a href="mailto:sprt.visita@gmail.com" className=" font-visita-bold cursor-pointer mt-3" ><span className="text-md flex items-center text-primary" ><ion-icon name="mail"></ion-icon> <span className="ml-2 text-slate-600" >Mail</span></span> </a>

          <DrawerHeader borderBottomWidth='0.5px'>
           <div className=" w-full flex items-center relative mt-6" >
           <span className="font-visita-bold cursor-pointer text-sm -ml-6" >Login</span>
          </div>
          </DrawerHeader>


          <p className=" font-visita-bold cursor-pointer mt-3 pb-8" ><span className="text-md flex items-center text-primary" ><ion-icon name="log-in"></ion-icon> <span className="ml-2 text-slate-600" >Franchisee Login</span></span> </p>

          </DrawerBody>
        </DrawerContent>
      </Drawer>
      
     </div>
    </div>
  );
}

export default Header;
