import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function ActivateWarning() {
  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, []);

  let navigate = useNavigate();
  let params = useParams();

  let complete_purchase_url = `/create/preview/${params.comp_name.replace(
    /[ ]/g,
    "-"
  )}`;

  return (
    <div className="w-full h-screen flex flex-col items-center pt-24 px-8">
      <h1 className="font-bold text-indigo-600 lg:text-xl text-xl text-center  rounded-full px-8 py-3">
        Complete purchase to activate your card
      </h1>

      <div className="my-6 ">
        <lottie-player
          src="https://assets10.lottiefiles.com/packages/lf20_0akluyjw.json"
          background="transparent"
          speed="1"
          loop
          autoplay
        ></lottie-player>
      </div>

      <button
        onClick={() => navigate(complete_purchase_url)}
        className="font-medium mt-8 bg-indigo-600 hover:bg-white hover:text-indigo-600 transition-colors lg:text-lg text-lg text-center text-white border-indigo-100 border rounded-full px-8 py-3"
      >
        {" "}
        Complete purchase{" "}
      </button>
    </div>
  );
}

export default ActivateWarning;
