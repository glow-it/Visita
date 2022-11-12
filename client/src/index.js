import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter, HashRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));


root.render(
    <ChakraProvider>
        <HashRouter>


        <App />


          </HashRouter> 
        
      

    
    </ChakraProvider>
);

reportWebVitals();


