import { theme, useToast } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import apiKeys from "../../Api/apiKeys";
import Loading from "../../miniComponents/Loading";
import { Toast } from "../../miniComponents/Toast";
import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { addCommas } from "../../Tools/addCommas";

function PremiumProductsPage() {


  useEffect(()=> {
    window.scrollTo(0,0)
  },[])


  let cart_products;
  let cart_count;

  if (localStorage.getItem("cart_products") != null) {
    cart_products = JSON.parse(localStorage.getItem("cart_products"));
    cart_count = parseInt(
      JSON.parse(localStorage.getItem("cart_products")).length
    );
  } else {
    cart_products = [];
    cart_count = 0;
  }

  let total_price = 0;

  cart_products.map((data) => {
    total_price += parseInt(data.price * parseInt(data.quantity));
  });

  let productsList = cart_products.map((product, index) => {
    return `

    ${index + 1} ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯

    ${product.name}

    ${product.description}

    ₹${addCommas(product.price)}

    Quanity: ${product.quantity}

    ⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯
    
    `;
  });

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });
  }, []);

  let navigate = useNavigate();

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

  //   Cart Modal Open
  const [open, setOpen] = useState(false);

  if(cardDatas.length != 0){

    return (
      <div className="flex flex-col items-center">
        
  
        {/* Cart Modal */}
  
        <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="relative z-50" onClose={setOpen}>
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>
  
            <div className="fixed inset-0 overflow-hidden">
              <div className="absolute inset-0 overflow-hidden">
                <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                  <Transition.Child
                    as={Fragment}
                    enter="transform transition ease-in-out duration-500 sm:duration-700"
                    enterFrom="translate-x-full"
                    enterTo="translate-x-0"
                    leave="transform transition ease-in-out duration-500 sm:duration-700"
                    leaveFrom="translate-x-0"
                    leaveTo="translate-x-full"
                  >
                    <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                      <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                        <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                          <div  className="flex items-start justify-between">
                            <Dialog.Title className="text-lg font-medium text-gray-900">
                              Shopping cart
                            </Dialog.Title>
                            <div className="ml-3 flex h-7 items-center">
                              <button
                                type="button"
                                className="-m-2 p-2 text-gray-400 text-2xl hover:text-gray-500"
                                onClick={() => setOpen(false)}
                              >
                                <span className="sr-only ">Close panel</span>
                                <ion-icon name="close-outline"></ion-icon>
                              </button>
                            </div>
                          </div>
  
                          <div className="mt-8">
                            <div className="flow-root">
                              <ul
                                role="list"
                                className="-my-6 divide-y divide-gray-200"
                              >
                                {cart_products.map((product, index) => (
                                  <li className="flex py-6">
                                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                      <img
                                        src={product.image}
                                        className="h-full w-full object-cover object-center"
                                      />
                                    </div>
  
                                    <div className="ml-4 flex flex-1 flex-col">
                                      <div>
                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                          <h3>
                                            <a>{product.name}</a>
                                          </h3>
                                          <p className="ml-4">₹{addCommas(product.price * parseInt(product.quantity))}</p>
                                        </div>
                                        <p className="mt-1 text-sm text-gray-500">
                                          {product.description}
                                        </p>
                                      </div>
                                      <div className="flex flex-1 items-end justify-between text-sm">
                                        <p className="text-gray-500">Qty {product.quantity}</p>
  
                                        <div className="flex">
                                          <button
                                            onClick={() => {
                                              let afterRemoveArr =
                                                cart_products.filter(
                                                  (_, i) => i !== index
                                                );
                                              localStorage.setItem(
                                                "cart_products",
                                                JSON.stringify(afterRemoveArr)
                                              );
                                            }}
                                            type="button"
                                            className={`font-medium text-${theme_color}-600 hover:text-indigo-500`}
                                          >
                                            Remove
                                          </button>
                                        </div>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
  
                        <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <p>Total</p>
                            <p>₹{addCommas(total_price)}</p>
                          </div>
  
                          <div className="mt-6">
                            <p
                              onClick={() => {
                                localStorage.removeItem("cart_products")
                                let phoneNumber = "+91" + cardDatas.phone_no;
  
                                let message = `
                                  New Order
                                  
                                  ${productsList}
  
                                  TOTAL : ₹${addCommas(total_price)}
  
                                  `;
  

  
                                let url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(
                                  message
                                )}`;
  
                                window.open(url, "_blank");
                              }}
                              className={`flex items-center justify-center rounded-md border border-transparent bg-${theme_color}-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-${theme_color}-700`}
                            >
                              Checkout
                            </p>
                          </div>
                          <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                            <p>
                              or
                              <button
                                type="button"
                                className={`font-medium ml-2 text-${theme_color}-600 hover:text-${theme_color}-500`}
                                onClick={() => setOpen(false)}
                              >
                                Continue Shopping
                                <span aria-hidden="true"> &rarr;</span>
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </div>
          </Dialog>
        </Transition.Root>
  
        <div className="sticky top-0 z-50 w-full bg-white lg:px-32 px-8">
          <div className="h-16 w-full  bg-white z-50 flex items-center justify-center">
            <span
            data-aos="fade-up"
            data-aos-delay="0"
              onClick={() => navigate("/")}
              className="text-2xl absolute left-8 cursor-pointer"
            >
              <ion-icon name="chevron-back-outline"></ion-icon>
            </span>
            <img
            data-aos="fade-up"
            data-aos-delay="100"
              className="h-12 w-12 rounded-full mr-1"
              src={cardDatas && cardDatas.logo}
            />
  
            <span
            data-aos="fade-up"
            data-aos-delay="200"
              onClick={() => setOpen(true)}
              className="text-2xl absolute right-8 cursor-pointer flex"
            >
              <ion-icon name="cart-outline"></ion-icon>{" "}
              <span className="text-sm flex items-center font-medium">
                Cart (<span className="cart-count">{cart_count}</span>)
              </span>
            </span>
          </div>
  
          <form className="pb-4 mt-8">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only :text-white"
            >
              Search
            </label>
            <div  data-aos="fade-up"
              data-aos-delay="300" class="relative">
              <div class="absolute z-20 text-slate-400 text-xl inset-y-0 left-3 flex justify-center items-center pl-3 pointer-events-none">
                <span className="z-20 flex items-center justify-center">
                <ion-icon name="search-outline"></ion-icon>
                </span>
              
              </div>
              <input
             
                autoComplete="off"
                onChange={(e) => setSeachValue(e.target.value)}
                id="default-search"
                class="block pl-14 pr-16 z-10 border font-medium  w-full p-4  text-sm text-gray-900  rounded-full"
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
                return data.product_name != "" && data.product_name != null
              })
              .map((data, index) => {
                let prodname = data.product_name != null ? data.product_name.toLowerCase() : '';
                if(prodname != "" && prodname.includes(searchValue.toLowerCase())){
                  return (
                    <div
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
                              ? "₹" + addCommas(data.product_orgprice)
                              : ""
                          }`}
                        </span>
                        {`${
                          data.product_offerprice != ""
                            ? "₹" + addCommas(data.product_offerprice)
                            : ""
                        }`}
                      </h1>
                      <div class="flex flex-row h-10 w-[100px] rounded-lg relative bg-transparent mt-6">
                          <button
                            onClick={() =>
                              {
                                if(document.getElementById(
                                  `quanity_input_2_${index}`
                                ).innerText != "1"){

                                  (document.getElementById(
                                    `quanity_input_2_${index}`
                                  ).innerText =
                                    parseInt(
                                      document.getElementById(`quanity_input_2_${index}`)
                                        .innerText
                                    ) - 1)

                                }
                                
                              }
                            }
                            class=" bg-gray-200 text-gray-600 px-2 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-l cursor-pointer outline-none"
                          >
                            <span class="m-auto text-2xl font-thin">-</span>
                          </button>
                          <div
                            id={`quanity_input_2_${index}`}
                            type="number"
                            class=" focus:outline-none border-none text-center w-full bg-gray-200 font-semibold text-md hover:text-black focus:text-black  md:text-basecursor-default flex items-center text-gray-700 justify-center  outline-none"
                            min={1}
                            max={99}
                          >1</div>
                          <button
                            onClick={() =>
                              (document.getElementById(
                                `quanity_input_2_${index}`
                              ).innerText =
                                parseInt(
                                  document.getElementById(`quanity_input_2_${index}`)
                                    .innerText
                                ) + 1)
                            }
                            class="bg-gray-200 text-gray-600 px-2 hover:text-gray-700 hover:bg-gray-300 h-full w-20 rounded-r cursor-pointer"
                          >
                            <span class="m-auto text-2xl font-thin">+</span>
                          </button>
                        </div>
                      <p
                        onClick={(e) => {
                          document
                            .querySelectorAll(".cart-count")
                            .forEach((elem) => {
                              elem.innerText = parseInt(elem.innerText) + 1;
                            });
    
                          e.target.innerText = "Added to cart";
    
                          let product_arr = [
                            {
                              image: data.product_image,
                              name: data.product_name,
                              description: data.product_description,
                              price: data.product_offerprice,
                              quantity: document.getElementById(`quanity_input_2_${index}`)
                              .innerText
                            },
                          ];
    
                          if (localStorage.getItem("cart_products")) {
                            let existing_arr = JSON.parse(
                              localStorage.getItem("cart_products")
                            );
    
                            existing_arr.push(...product_arr);
    
                            localStorage.setItem(
                              "cart_products",
                              JSON.stringify(existing_arr)
                            );
                          } else {
                            localStorage.setItem(
                              "cart_products",
                              JSON.stringify(product_arr)
                            );
                          }
                        }}
                        className={`flex cursor-pointer justify-center items-center py-3 px-12 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-600  font-bold text-lg mt-6`}
                      >
                        Add to cart
                      </p>
    
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
                }
                
              })}
        </div>
      </div>
    );

  }else{
    return(
      <Loading isLoading={isLoading} />
    )
  }

  
}

export default PremiumProductsPage;
