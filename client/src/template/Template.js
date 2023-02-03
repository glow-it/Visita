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

function Template() {
  let params = useParams();
  let company_name = params.comp_name;
  let [isCardLoading, setIsCardLoading] = useState(true);
  let [cardDatas, setCardDatas] = useState();
  let toast = useToast();
  let navigate = useNavigate();

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
    .get(`${apiKeys.server_url}/card/` + company_name)
    .then((response) => {
      setIsCardLoading(false);
      setCardDatas(response.data);

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
            {cardDatas && capitalize(cardDatas.company_name) + " Website"}
          </title>
          <meta name="description" content={cardDatas && cardDatas.tagline} />
        </Helmet>

        {cardDatas.isPremium == "true" ? (
          <PremiumTemplate cardDatas={cardDatas} />
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
