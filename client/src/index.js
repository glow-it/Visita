import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter } from "react-router-dom";
import ReactPWAInstallProvider from "react-pwa-install";

const root = ReactDOM.createRoot(document.getElementById('root'));




root.render(
    <ChakraProvider>
        <BrowserRouter>

        <ReactPWAInstallProvider enableLogging>

        <App />

        </ReactPWAInstallProvider>

    


          </BrowserRouter> 
        
      

    
    </ChakraProvider>
);

reportWebVitals();


