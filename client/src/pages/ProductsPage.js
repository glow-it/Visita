import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Toast } from '../miniComponents/Toast'

function ProductsPage() {


    useEffect(()=> {
        document.querySelectorAll('header').forEach((elem)=> {
            elem.style.display = 'none'
        })
    },[])

    let [cardDatas,setCardDatas] = useState([])
    let [products,setProducts] = useState([])
    let [searchValue,setSeachValue] = useState([])

    let toast = useToast()
    let params = useParams()


    axios
      .get("/card/" + params.comp_name)
      .then((response) => {


        setCardDatas(response.data);
        setProducts(response.data.products);



      })
      .catch((err) => {
        Toast({
          status:'error',
          title: err.message,
          postition: 'top',
          toast
        })
      });

      let theme_color = cardDatas && cardDatas.theme_color



  return (
    <div >




        <div className="h-16 w-full  bg-white z-50 flex items-center justify-center">
            <img className='h-12 w-12 rounded-full mr-1' src={cardDatas && cardDatas.logo}  />
            <h1 className={`text-2xl text-${theme_color}-600 font-visita-bold capitalize`} >{params.comp_name} Shop</h1>
        </div>


        <form className='pb-4' >   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only :text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="show-svg w-5 h-5 text-gray-500 :text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
        </div>
        <input onChange={(e)=> setSeachValue(e.target.value)} type="search" id="default-search" class="block w-full p-4 pl-10 text-sm text-gray-900 border-t border-b border-gray-300   focus:border-t-blue-500 focus:border-b-blue-500 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Search products..." required />
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Search</button>
    </div>
</form>



        <div class="z-10 bg-white w-full h-screen flex flex-col overflow-scroll px-8">

            {
                products &&
                products
                  .filter((data, index) => {
                    let prodname = data.product_name
                    return data.prodname != "" && prodname.includes(searchValue);
                  })
                  .map((data,index)=> {
                    return(
<div className={`w-full lg:w-[400px] min-h-[600px] ring-2 ring-offset-2 ring-${theme_color}-600 bg-slate-50 rounded-3xl flex overflow-hidden flex-col my-3`}>
            <div className="h-[45%] w-full ">
                <img className='h-full w-full rounded-b-xl' src={data.product_image} alt="" />
            </div>
            <div className="h-[55%] w-full flex flex-col items-center  px-6">

                <h1 className={`text-${theme_color}-600 text-center text-xl font-visita-bold mb-4 mt-8 `}>{data.product_name}</h1>

                <h1 className="text-md text-center font-visita-medium mb-4 text-slate-400">{data.product_description}</h1>

                <h1 className="mb-6 font-visita-medium text-green-500 text-xl">
                <span className=" mr-2 text-slate-600 line-through">
                  ₹{data.product_orgprice}
                </span>
                ₹{data.product_offerprice}
              </h1>


              <a
                href={`https://api.whatsapp.com/send/?phone=+91${cardDatas && cardDatas.phone_no}&text=👋Hey,Enquiry For ${data.product_name}`}
                className={`flex justify-center items-center py-3 px-12 bg-gradient-to-r text-white rounded-full from-${theme_color}-700 to-${theme_color}-500  font-visita-bold text-md `}
              >
                Enquiry Now
                <span className=" ml-1 text-white text-xl"></span>
                <ion-icon name="open"></ion-icon>
              </a>

              {data.product_link != "" ? (
                <a
                  href={data.product_link}
                  className={`flex justify-center mt-4  items-center py-3 px-12 border-2 border-${theme_color}-500 text-${theme_color}-500 rounded-full   font-visita-bold text-md  `}
                >
                  View Product
                </a>
              ) : (
                ""
              )}
              

            </div>
        </div>
                    )
                  })
            }

        
</div>
    </div>
  )
}

export default ProductsPage