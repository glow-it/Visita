import './App.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Support from './pages/Support';
import { Routes, Route, Link } from "react-router-dom";
import 'aos/dist/aos.css';
import Pricing from './pages/Pricing';
import TemplatesPreview from './pages/TemplatesPreview';
import Create from './pages/createprocess/Create';
import { useEffect } from 'react';


function App() {

  return (
    <div className="App">
      <Header />
       <Routes>
        <Route path="/" element={ <LandingPage />} />
        <Route path="support" element={<Support />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="templates" element={<TemplatesPreview />} />
        <Route path="create" element={<Create />} />
      </Routes>
    </div>
  );
}

export default App;
