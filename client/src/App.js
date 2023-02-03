import "./App.css";
import Header from "./components/Header";
import LandingPage from "./pages/LandingPage";
import Support from "./pages/Support";
import { Routes, Route } from "react-router-dom";
import Pricing from "./pages/Pricing";
import Create from "./pages/createprocess/Create";
import Loading from "./components/Loading";
import CardPreview from "./pages/createprocess/CardPreview";
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
import ProductsPage from "./template/Pages/ProductsPage";
import CustomerDetails from "./pages/CustomerDetails";
import Template from "./template/Template";
import PremiumProductsPage from "./template/Pages/PremiumProductsPage";
import Cart from "./template/Pages/Cart";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import ReturnPolicy from "./pages/ReturnPolicy";

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
          path="/:comp_name/premiumproducts"
          element={<PremiumProductsPage />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route
          path="/activate-warning/:comp_name"
          element={<ActivateWarning />}
        />
        <Route
          path="/create/successfull/:comp_name"
          element={<Successfull />}
        />
        <Route path="manage/:comp_name" element={<ManageCard />} />
        <Route path="manage/:comp_name/edit" element={<EditCard />} />
        <Route
          path="/manage/:comp_name/customer-details"
          element={<CustomerDetails />}
        />
        <Route path="/franchisee/register" element={<FranchiseeRegister />} />
        <Route path="/franchisee/login" element={<FranchiseeLogin />} />
        <Route path="/franchisee" element={<ManageFranchisee />} />
        <Route path="/admin/:type" element={<AdminPage />} />
        <Route path="/card-closed" element={<CardClosedPage />} />
        <Route
          path="/franchisee/forgot-password/:franchisee_email"
          element={<ForgotPasswordFranchisee />}
        />
        <Route
          path="/franchisee/how-to-franchisee"
          element={<HowToFranchisee />}
        />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/return-policy" element={<ReturnPolicy />} />
      </Routes>
    </div>
  );
}

export default App;
