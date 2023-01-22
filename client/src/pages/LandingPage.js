import { Box, useToast } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Benefits from "../components/Benefits";
import Cta from "../components/Cta";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Template from "../template/Template";

function LandingPage() {
  let toast = useToast();
  let location = useLocation();


  // Get Sub Domain
  let full = window.location.host;
  //window.location.host is subdomain.domain.com
  let parts = full.split(".");
  let subdomain = parts[0];

  if(subdomain != "localhost:3000"){
    window.location.href = "https://visitasmart.com/" + subdomain
  }

  useEffect(() => {
    document.title = "Visita - Create your own business website easily";
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
    <div className="landing-page flex flex-col items-center">
          <Hero />
          <Features />
          <Benefits />
          <Cta />
          <Footer />
    </div>
  );
}

export default LandingPage;
