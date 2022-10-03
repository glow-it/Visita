import './App.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Support from './pages/Support';
import { Routes, Route, Link } from "react-router-dom";
import 'aos/dist/aos.css';
import Pricing from './pages/Pricing';
import TemplateModel from './pages/TemplateModel';
import Create from './pages/createprocess/Create';
import { useEffect } from 'react';
import Loading from './components/Loading';
import CardPreview from './pages/createprocess/CardPreview';


function App() {




  return (
    <div className="App">
      <Header />
       <Routes>
        <Route path="/" element={ <LandingPage />} />
        <Route path="support" element={<Support />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="template" element={<TemplateModel />} />
        <Route path="create" element={<Create />} />
        <Route path="create/preview/:name" element={<CardPreview />} />
        <Route path="loading/:type" element={<Loading />} />
      </Routes>
    </div>
  );
}

export default App;
