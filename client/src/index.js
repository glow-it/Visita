import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import Alpine from 'alpinejs'
import { useEffect } from 'react';
import AOS from 'aos';

const root = ReactDOM.createRoot(document.getElementById('root'));



  AOS.init({
  once: true,
  });

window.Alpine = Alpine
 
Alpine.start()

root.render(
    <ChakraProvider>
         <BrowserRouter>
      <App />
    </BrowserRouter>
    </ChakraProvider>
);

reportWebVitals();
