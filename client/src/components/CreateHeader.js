import React from "react";
import { Link, useNavigate } from "react-router-dom";

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
        hideIndicators == true ? "h-16 -ml-6" : "h-32"
      } lg:flex-row flex-col flex py-8 items-center bg-white justify-center fixed z-50 transition-shadow border-b shadow-md shadow-black/5`}
    >
      <div
        className={`absolute lg:left-8 flex  items-center justify-center lg:visible invisible`}
      >
        <img
          src="https://i.postimg.cc/ZKnK7rC2/visitalogo.png"
          className="h-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
        <Link to="/" className="text-3xl text-[#6733E4] font-visita-bold ml-1">
          Create
        </Link>
      </div>

      {hideIndicators ? (
        <h1
          onClick={() => {
            window.open(live_preview_url);
            this.props.router.push({
              pathname: live_preview_url,
              state: {
                id: 7,
                color: "green",
              },
            });
          }}
          className="text-sm hover:underline flex cursor-pointer font-visita-bold text-blue-600  text-center px-6 py-1 bg-blue-50 rounded-full"
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
        className={`create-process-indicator-wrapper flex ${
          hideIndicators == true ? "hidden" : "block"
        }`}
      >
        <div
          className={`h-4 ${
            processIndex == 1 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-blue-600 rounded-full mr-2 process_indicator-1`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 2 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-blue-600 rounded-full mr-2 process_indicator-2`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 3 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-blue-600 rounded-full mr-2 process_indicator-3`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 4 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-blue-600 rounded-full mr-2 process_indicator-4`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 5 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-blue-600 rounded-full mr-2 process_indicator-5`}
        ></div>
        <div
          className={`h-4 ${
            processIndex == 6 ? "w-10" : loading ? "hidden " : "w-4"
          } bg-blue-600 rounded-full mr-2 process_indicator-6`}
        ></div>
      </div>

      <div
        className={`visita-text-animation ${
          hideIndicators == true ? "hidden" : "block"
        } `}
      >
        <h1 className="text-center lg:text-5xl lg:hidden block mt-6 text-xl text-black font-visita-black ">
          <span>
            {processIndex == 1
              ? "Business Or Company Name"
              : processIndex == 2
              ? "Company Details"
              : processIndex == 3
              ? "Social Media Links"
              : processIndex == 4
              ? "Payment Options"
              : processIndex == 5
              ? "Products Or Services"
              : "Image Gallery"}
          </span>
        </h1>
      </div>
    </header>
  );
}

export default CreateHeader;
