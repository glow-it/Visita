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
    <div className='pt-24'>
        <div className="h-16 w-full border-b bg-white fixed top-0 z-50 flex items-center justify-center">
            <img className='h-12 w-12 rounded-full mr-1' src={cardDatas && cardDatas.logo}  />
            <h1 className={`text-2xl text-${theme_color}-600 font-visita-bold`} >Products</h1>
        </div>
        <div class="z-10 bg-white w-full h-screen flex flex-col overflow-scroll px-8">

            {
                products &&
                products
                  .filter((data, index) => {
                    return data.product_name != "";
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