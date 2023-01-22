import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams,useNavigate } from 'react-router-dom'
import apiKeys from '../Api/apiKeys'
import Loading from '../miniComponents/Loading'
import { Toast } from '../miniComponents/Toast'
import BasicTemplate from './Templates/BasicTemplate'
import PremiumTemplate from './Templates/Premium/PremiumTemplate'

function Template() {

  let params = useParams()
  let company_name = params.comp_name
  let [isCardLoading,setIsCardLoading] = useState(true)
  let [cardDatas,setCardDatas] = useState()
  let toast = useToast()
  let navigate = useNavigate()

  useEffect(()=> {
    document.querySelectorAll('header').forEach((elem)=> {
      elem.style.display = 'none'
    })
  },[])



  axios
      .get(`${apiKeys.server_url}/card/` + company_name)
      .then((response) => {
        setIsCardLoading(false);

        setCardDatas(response.data);

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



      if(cardDatas){
        return (
          <div>
            {
              cardDatas.isPremium == "true" ?
              <PremiumTemplate cardDatas={cardDatas}  />
              :
              <BasicTemplate cardDatas={cardDatas}  />
            }
             
          </div>
        )
      }else{
        return (
          <div>
            <Loading isLoading={true} />
          </div>
        )
      }

  
}

export default Template