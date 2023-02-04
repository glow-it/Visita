import { Box, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import apiKeys from "../Api/apiKeys";
import Benefits from "../components/Benefits";
import Cta from "../components/Cta";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import PlanDetails from "../components/PlanDetails";
import Template from "../template/Template";
import ManageFranchisee from "./ManageFranchisee";
import Support from "./Support";
import Pricing from "./Pricing";

function LandingPage() {
  let toast = useToast();
  let location = useLocation();

  // Get Sub Domain
  let full = window.location.host;
  //window.location.host is subdomain.domain.com
  let parts = full.split(".");
  let subdomain = parts[0];

  useEffect(() => {
    document.title =
      "Visita - Build Business Website In Minutes - No Coding Required.";
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "flex";
    });

    var link =
      document.querySelector("link[rel*='icon']") ||
      document.createElement("link");
    link.type = "image/x-icon";
    link.rel = "shortcut icon";
    link.href = "https://i.postimg.cc/ZKnK7rC2/visitalogo.png";
    document.getElementsByTagName("head")[0].appendChild(link);
  }, [location]);

  return (
    <div>
      {subdomain != apiKeys.normal_subdomain ? (
        <div>
          {document.querySelectorAll("header").forEach((elem) => {
            elem.style.display = "none";
          })}
          {subdomain == "dashboard" ? (
            <ManageFranchisee />
          ) : subdomain == "support" ? (
            <Support />
          ) : subdomain == "pricing" ? (
            <Pricing />
          ) : (
            <Template subdomain={subdomain} />
          )}
        </div>
      ) : (
        <div className="landing-page flex flex-col items-center">
          <Hero />
          <HowItWorks />
          <Features />
          <Benefits />
          <PlanDetails />
          <Cta />
          <Footer />
        </div>
      )}
    </div>
  );
}

export default LandingPage;
