import './App.css';
import Header from './components/Header';
import LandingPage from './pages/LandingPage';
import Support from './pages/Support';
import { Routes, Route, Link } from "react-router-dom";
import 'aos/dist/aos.css';
import Pricing from './pages/Pricing';
import TemplateModel from './pages/TemplateModel';
import Create from './pages/createprocess/Create';
import Loading from './components/Loading';
import CardPreview from './pages/createprocess/CardPreview';
import { useEffect } from 'react';
import Template from './template/Template';
import ActivateWarning from './pages/createprocess/ActivateWarning';
import Successfull from './pages/createprocess/Successfull';
import ManageCard from './pages/createprocess/ManageCard';
import EditCard from './pages/createprocess/EditCard';
import FranchiseeRegister from './pages/FranchiseeRegister';
import FranchiseeLogin from './pages/FranchiseeLogin';
import ManageFranchisee from './pages/ManageFranchisee';


function App() {

useEffect(()=> {

  // Favicon Set Dynamically

  var link = document.querySelector("link[rel~='icon']");
if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.getElementsByTagName('head')[0].appendChild(link);
}
link.href = 'https://i.postimg.cc/ZKnK7rC2/visitalogo.png';


},[])


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
        <Route path="/:comp_name" element={<Template />} />
        <Route path="/activate-warning/:comp_name" element={<ActivateWarning />} />
        <Route path="/create/successfull/:comp_name" element={<Successfull />} />
        <Route path="/manage/card/:comp_name" element={<ManageCard />} />
        <Route path="/manage/card/:comp_name/edit" element={<EditCard />} />
        <Route path="/franchisee/register" element={<FranchiseeRegister />} />
        <Route path="/franchisee/login" element={<FranchiseeLogin />} />
        <Route path="/manage/franchisee" element={<ManageFranchisee />} />

      </Routes>
    </div>
  );
}

export default App;
