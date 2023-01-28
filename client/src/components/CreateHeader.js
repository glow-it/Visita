import React from "react";
import { useNavigate } from "react-router-dom";

function CreateHeader({
  processIndex,
  loading,
  hideIndicators,
  live_preview_url,
}) {
  let navigate = useNavigate();
  return (
    <header
      id="create-header"
      className={` w-full lg:h-16  ${
        hideIndicators == true ? "h-16 lg:-ml-6" : "h-24"
      } lg:flex-row flex-col flex  items-center bg-white justify-center fixed z-[300] transition-shadow `}
    >
      <h1
        id="process_title"
        className="lg:block hidden text-center absolute left-24 lg:text-3xl text-xl text-indigo-600 font-bold"
      >
        Create
      </h1>

      <div
        className={` flex  items-center justify-center lg:visible invisible`}
      >
        <img
          src={require("../Images/logos/visitalogo.png")}
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>

      {hideIndicators ? (
        <h1
          onClick={() => {
            window.open(live_preview_url);
          }}
          className="text-sm hover:underline py-1 lg:absolute lg:right-24 lg:-mt-0 -mt-10 flex cursor-pointer font-bold text-indigo-600  text-center px-6  bg-indigo-50 rounded-full"
        >
          {" "}
          Live Preview{" "}
          <span className="-rotate-45 ml-1 flex items-center justify-center">
            <ion-icon name="arrow-forward-outline"></ion-icon>
          </span>
        </h1>
      ) : (
        ""
      )}

      <div
        className={`create-process-indicator-wrapper lg:absolute lg:right-24 flex ${
          hideIndicators == true ? "hidden" : "block"
        }`}
      >
        <div
          className={`h-4 ${
            processIndex == 1 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-indigo-600 rounded-full mr-2 process_indicator-1`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 2 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-indigo-600 rounded-full mr-2 process_indicator-2`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 3 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-indigo-600 rounded-full mr-2 process_indicator-3`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 4 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-indigo-600 rounded-full mr-2 process_indicator-4`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 5 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-indigo-600 rounded-full mr-2 process_indicator-5`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 6 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-indigo-600 rounded-full mr-2 process_indicator-6`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 7 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-indigo-600 rounded-full mr-2 process_indicator-6`}
        ></div>
      </div>
    </header>
  );
}

export default CreateHeader;
