import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiKeys from "../Api/apiKeys";
import Loading from "../miniComponents/Loading";
import { Toast } from "../miniComponents/Toast";
import BasicTemplate from "./Templates/BasicTemplate";
import PremiumTemplate from "./Templates/Premium/PremiumTemplate";
import { Helmet } from "react-helmet";

function Template({ subdomain }) {
  let params = useParams();
  let company_name = params.comp_name;
  let [isCardLoading, setIsCardLoading] = useState(true);
  let [cardDatas, setCardDatas] = useState();
  let toast = useToast();
  let navigate = useNavigate();

  // Set Manifest Icon and Name Dynamically
  let iconUrl =
  cardDatas && cardDatas.logo.replace(/^http:\/\//i, "https://").replace("upload/", "upload/w_256,h_256,c_scale/");
let manifest = {
  name: cardDatas && cardDatas.company_name,
  icons: [{ src: iconUrl, sizes: "512x512", type: "image/png" }],
};
let content = encodeURIComponent(JSON.stringify(manifest));
let url = "data:application/manifest+json," + content;
let element = document.createElement("link");
element.setAttribute("rel", "manifest");
element.setAttribute("href", url);
document.querySelector("head").appendChild(element);

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, []);

  function capitalize(string) {
    return string.replace(/(^\w{1})|(\s+\w{1})/g, (letter) =>
      letter.toUpperCase()
    );
  }

  axios
    .get(
      `${apiKeys.server_url}/card/${
        subdomain != false ? subdomain : company_name
      }`
    )
    .then((response) => {
      setIsCardLoading(false);
      setCardDatas(response.data);
      // Set Favicon
      var link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.getElementsByTagName("head")[0].appendChild(link);
      }
      link.href = response.data.logo.replace(/^http:\/\//i, "https://");
      if (response.data.isPremium == "true") {
        if (subdomain == false) {
          window.location.href = `https://${company_name}.visitasmart.com/`;
        }
      } else {
        if (subdomain != false) {
          window.location.href = `https://visitasmart.com/`;
        }
      }

      const head = document.head;

      const metaTitle = document.createElement("meta");
      metaTitle.setAttribute("property", "og:title");
      metaTitle.setAttribute("content", response.data.company_name);
      head.appendChild(metaTitle);

      const metaDescription = document.createElement("meta");
      metaDescription.setAttribute("property", "og:description");
      metaDescription.setAttribute(
        "content",
        response.data.tagline != "" ? response.data.tagline : "Website"
      );
      head.appendChild(metaDescription);

      const metaImage = document.createElement("meta");
      metaImage.setAttribute("property", "og:image");
      metaImage.setAttribute("content", response.data.logo);
      head.appendChild(metaImage);

      const metaUrl = document.createElement("meta");
      metaUrl.setAttribute("property", "og:url");
      metaUrl.setAttribute(
        "content",
        response.data.isPremium == "true"
          ? response.data.clean_name + ".visitasmart.com"
          : "visitasmart.com/" + response.data.clean_name
      );
      head.appendChild(metaUrl);
    })
    .catch((err) => {
      Toast({
        status: "error",
        title: "This website is not in our server",
        postition: "top",
        toast,
      });
      navigate("/");
    });

  if (cardDatas) {
    return (
      <div>
        {/* Add Meta Title And Descreption */}
        <Helmet>
          <title className="capitalize">
            {capitalize(cardDatas.company_name) +
              " - " +
              capitalize(cardDatas.tagline)}
          </title>
          <meta name="description" content={cardDatas && cardDatas.tagline} />
        </Helmet>

        {cardDatas.isPremium == "true" ? (
          <PremiumTemplate subdomain={subdomain} cardDatas={cardDatas} />
        ) : (
          <BasicTemplate cardDatas={cardDatas} />
        )}
      </div>
    );
  } else {
    return (
      <div>
        <Loading isLoading={true} />
      </div>
    );
  }
}

export default Template;
