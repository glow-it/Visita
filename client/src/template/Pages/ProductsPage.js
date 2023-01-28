import { useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import apiKeys from "../../Api/apiKeys";
import Loading from "../../miniComponents/Loading";
import { Toast } from "../../miniComponents/Toast";

function ProductsPage() {
  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, []);

  let [cardDatas, setCardDatas] = useState([]);
  let [products, setProducts] = useState([]);
  let [searchValue, setSeachValue] = useState("");
  let [isLoading, setIsLoading] = useState(true);

  let toast = useToast();
  let params = useParams();

  axios
    .get(`${apiKeys.server_url}/card/` + params.comp_name)
    .then((response) => {
      setIsLoading(false);

      setCardDatas(response.data);
      setProducts(response.data.products);
    })
    .catch((err) => {
      Toast({
        status: "error",
        title: err.message,
        postition: "top",
        toast,
      });
    });

  let theme_color = cardDatas && cardDatas.theme_color;

  return (
    <div className="flex flex-col items-center">
      <Loading isLoading={isLoading} />

      <div className="sticky top-0 z-50 w-full bg-white lg:px-32 px-8">
        <div className="h-16 w-full  bg-white z-50 flex items-center justify-center">
          <img
            className="h-12 w-12 rounded-full mr-1"
            src={cardDatas && cardDatas.logo}
          />
        </div>

        <form className="pb-4">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only :text-white"
          >
            Search
          </label>
          <div class="relative">
            <div class="absolute inset-y-0 left-3 flex items-center pl-3 pointer-events-none">
              <svg
                aria-hidden="true"
                class="show-svg w-5 h-5 text-gray-500 :text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
            </div>
            <input
              autoComplete="off"
              onChange={(e) => setSeachValue(e.target.value)}
              id="default-search"
              class="block pl-14 pr-16 border font-medium  w-full p-4  text-sm text-gray-900  rounded-full"
              placeholder="Search products..."
              required
            />
          </div>
        </form>
      </div>

      <div class="z-10 bg-white w-full lg:w-[35%] h-screen flex flex-col items-center overflow-scroll px-8">
        {products &&
          products
            .filter((data, index) => {
              let prodname = data.product_name.toLowerCase();
              return (
                prodname != "" && prodname.includes(searchValue.toLowerCase())
              );
            })
            .map((data, index) => {
              return (
                <div
                  z
                  div
                  className={`w-full pb-12 mb-8 px-8 bg-slate-100    rounded-2xl flex flex-col items-center relative ${
                    index == 0 ? "mt-10" : "mt-2"
                  }`}
                >
                  <img
                    src={data.product_image.replace(/^http:\/\//i, "https://")}
                    className="  w-full rounded-3xl py-6  offer-image"
                  />
                  <h1 className=" pt-6 capitalize text-center text-xl font-bold">
                    {data.product_name}
                  </h1>

                  <h1 className=" mt-4 capitalize text-center  text-md font-medium text-slate-400">
                    {data.product_description}
                  </h1>

                  <h1 className=" pt-4 capitalize font-medium text-green-600 text-xl">
                    <span className=" mr-2 text-slate-600 line-through">
                      {`${
                        data.product_orgprice != ""
                          ? "₹" + data.product_orgprice
                          : ""
                      }`}
                    </span>
                    {`${
                      data.product_offerprice != ""
                        ? "₹" + data.product_offerprice
                        : ""
                    }`}
                  </h1>
                  <a
                    href={`https://api.whatsapp.com/send/?phone=+91${
                      cardDatas && cardDatas.phone_no
                    }&text=👋Hey,Enquiry For ${data.product_name} - ( ${
                      data.product_description
                    } )`}
                    className={`flex justify-center items-center py-3 px-12 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-600  font-bold text-lg mt-6`}
                  >
                    Enquiry Now
                    <span className=" ml-1 text-white text-xl"></span>
                    <ion-icon name="open"></ion-icon>
                  </a>

                  {data.product_link != "" ? (
                    <a
                      href={data.product_link}
                      className={`flex justify-center  items-center py-3 px-12 border-2 border-${theme_color}-600 text-${theme_color}-600 rounded-full   font-bold text-lg mt-2 `}
                    >
                      View Product
                    </a>
                  ) : (
                    ""
                  )}
                </div>
              );
            })}
      </div>
    </div>
  );
}

export default ProductsPage;
