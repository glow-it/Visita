import "./App.css";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Support from "./pages/Support";
import { Routes, Route, Link } from "react-router-dom";
import "aos/dist/aos.css";
import Pricing from "./pages/Pricing";
import Create from "./pages/createprocess/Create";
import Loading from "./components/Loading";
import CardPreview from "./pages/createprocess/CardPreview";
import { useEffect, useState } from "react";
import Template from "./template/Template";
import ActivateWarning from "./pages/createprocess/ActivateWarning";
import Successfull from "./pages/createprocess/Successfull";
import ManageCard from "./pages/createprocess/ManageCard";
import EditCard from "./pages/createprocess/EditCard";
import FranchiseeRegister from "./pages/FranchiseeRegister";
import FranchiseeLogin from "./pages/FranchiseeLogin";
import ManageFranchisee from "./pages/ManageFranchisee";
import AdminPage from "./pages/Admin/AdminPage";
import CardClosedPage from "./pages/CardClosedPage";
import ForgotPasswordFranchisee from "./pages/ForgotPasswordFranchisee";
import PageNotFound from "./pages/PageNotFound";
import HowToFranchisee from "./pages/HowToFranchisee";
import Aos from "aos";
import ProductsPage from "./template/ProductsPage";
import CustomerDetails from "./pages/CustomerDetails";

function App() {

    
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="support" element={<Support />} />
        <Route path="pricing" element={<Pricing />} />
        <Route path="create" element={<Create />} />
        <Route path="create/preview/:name" element={<CardPreview />} />
        <Route path="loading/:type" element={<Loading />} />
        <Route exact path="/:comp_name" element={<Template />} />
        <Route path="/:comp_name/products" element={<ProductsPage />} />
        <Route
          path="/activate-warning/:comp_name"
          element={<ActivateWarning />}
        />
        <Route
          path="/create/successfull/:comp_name"
          element={<Successfull />}
        />
        <Route path="manage/card/:comp_name" element={<ManageCard />} />
        <Route path="manage/card/:comp_name/edit" element={<EditCard />} />
        <Route path="/manage/card/:comp_name/customer-details" element={<CustomerDetails />} />
        <Route path="/franchisee/register" element={<FranchiseeRegister />} />
        <Route path="/franchisee/login" element={<FranchiseeLogin />} />
        <Route path="/franchisee" element={<ManageFranchisee />} />
        <Route path="/admin/:type" element={<AdminPage />} />
        <Route path="/card-closed" element={<CardClosedPage />} />
        <Route path="/franchisee/forgot-password/:franchisee_email" element={<ForgotPasswordFranchisee />} />
        <Route path="/franchisee/how-to-franchisee" element={<HowToFranchisee />} />
        <Route path="*"  element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
