import { Button, useDisclosure, useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import emailjs from '@emailjs/browser';
import apiKeys from '../../Api/apiKeys'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react'
import { Toast } from '../../miniComponents/Toast';

function ManageCard() {

    let params = useParams()
    let company_name = params.comp_name
    let clean_company_name = params.comp_name && params.comp_name.replace(/[-]/g,' ')
    let navigate = useNavigate()
    let toast = useToast()
    let [cardDatas,setCardDatas] = useState([])
    let [franchiseeDatas,setFranchiseeDatas] = useState([])

    const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()



    useEffect(()=> {

      


        document.querySelectorAll('header').forEach((elem)=> {
            elem.style.display = 'none'
        })
        axios.get(`${apiKeys.server_url}/card/` + company_name).then((response)=> {

          if(response.data != null){
            setCardDatas( response.data )
            if(response.data.franchisee != "no franchisee"){
              axios.get(`${apiKeys.server_url}/get-franchisee-datas/` + response.data.franchisee).then((res)=> {
                if(res.status){
                  setFranchiseeDatas(res.data.franchisee_data);
                }
              })
            }
          }else{
            Toast({
              status:'error',
              title: 'Company not found',
              description: 'Recheck!!!',
              postition: 'top-right',
              toast
            })
            navigate('/')
            
          }
          
        })
    },[])

    function handleClickManage(password){

        if(cardDatas.activated) {
            if(cardDatas.activated.access_password == password){
                document.getElementById('manage_auth_wrapper').style.display = 'none'
                localStorage.setItem('isAdmin',true)
            }else{
              Toast({
                status:'error',
                title: 'Invalid password',
                description: 'Please enter valid password',
                postition: 'top',
                toast
              })
            }
        }else{
            navigate('/create/preview/' + company_name)
        }
    }


    // Handle Close Card Click
    function HandleCloseCard(){
      axios({
        method: 'post',
        url: `${apiKeys.server_url}/manage/card/close-card`,
        data: {
          sub_id: cardDatas.activated && cardDatas.activated.razorpay.subscription_id,
          company_name
        }
      }).then((response)=> {
        if(response.status){
          Toast({
            status:'success',
            title: 'Website was closed',
            postition: 'top',
            toast
          })
          navigate('/card-closed')
        }else{
          

          Toast({
            status:'error',
            title: 'Website closing failed',
            description: 'Try again!',
            postition: 'top',
            toast
          })

        }
      })
      navigate('/loading/closing-website')
    }

    let send_pass_form_2 = document.getElementById('send_pass_form_2');
    
function HandleForgotPasswordClick(e){

  e.target.innerText = 'Processing...'

  emailjs.sendForm(apiKeys.emailjs_serviceId, apiKeys.emailjs_templateId2, send_pass_form_2, apiKeys.emailjs_publicKey).then((result) => {
    Toast({
      status:'success',
      title: `Website password has been send to ${cardDatas && cardDatas.email_id}`,
      postition: 'top',
      toast
    })
    e.target.innerText = 'Forgot password?'
}, (error) => {
  console.log(error);
  Toast({
    status:'error',
    title: 'Website password send failed',
    description: 'Try again!',
    postition: 'top',
    toast
  })
    e.target.innerText = 'Forgot password?'
})
}




  return (
   <div className='flex flex-col items-center pb-28' >

<AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay bg="whiteAlpha.1000" backdropFilter="auto" backdropBlur="3px" >
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              <span className='font-visita-bold' >Close Website</span>
            </AlertDialogHeader>

            <AlertDialogBody>
              <span className='font-visita-medium' >Are you sure? You can't undo this action afterwards.</span>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button rounded='full' ref={cancelRef} onClick={onClose}>
                <span className='font-visita-bold' >Cancel</span>
              </Button>
              <Button rounded='full' colorScheme='red' onClick={()=> HandleCloseCard()} ml={3}>
                <span className='font-visita-bold' >Yes' Close Website</span>
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

    {/* Send Card Password Form */}
    <form id="send_pass_form_2" className="hidden" >
        <input type="text" name="to_mail" value={cardDatas && cardDatas.email_id} />
        <input type="text" name="company_name" value={cardDatas && cardDatas.company_name} />
        <input type="text" name="card_pass" value={cardDatas.activated && cardDatas.activated.access_password} />
      </form>

      {
        localStorage.getItem('isAdmin') != "true" ?

        <div id='manage_auth_wrapper' className="h-screen  w-full absolute font-visita-medium bg-white z-[100] flex pt-36 justify-center">
        <div class="block p-6 rounded-3xl  bg-white h-[300px] w-[1000px] px-8 lg:shadow-md  max-w-sm">
      <div>
        
        <div class="form-group mb-6">
          <label for="card_pass_input" class="form-label text-3xl font-visita-bold inline-block mb-6 text-gray-700">Website Password</label>
          <input  class="form-control block
            w-full
            px-3
            pl-6
            py-1.5
            text-xl
            font-normal
            text-gray-700
            bg-white bg-clip-padding
            border border-solid border-gray-300
            rounded-full
            transition
            ease-in-out
            lowercase
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="card_pass_input"
    
            autoComplete='off'
            />
        </div>
        <div class="flex justify-between items-center mb-6">
          <p onClick={(e)=> HandleForgotPasswordClick(e)}
            class="text-blue-600 cursor-pointer hover:text-blue-700 focus:text-blue-700 transition duration-200 ease-in-out">Forgot
            password?</p>
        </div>
        <button  class="
          w-full
          px-6
          py-2.5
          bg-blue-600
          text-white
          font-medium
          text-xl
          leading-tight
          rounded-full
          shadow-md
          hover:bg-blue-700 hover:shadow-lg
          focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
          active:bg-blue-800 active:shadow-lg
          transition
          duration-150
          ease-in-out"
    
          onClick={()=> handleClickManage(document.getElementById('card_pass_input').value)}
          
          >Manage</button>
      
      </div>
    </div>
        </div>
        : ''

      }

   


<h1 className='text-4xl font-visita-bold mb-10 mt-16 capitalize' >{company_name.replace(/[-]/g," ")}</h1>

     <div className="py-6 w-full flex lg:flex-row flex-col items-center justify-center  z-50">

         <button onClick={onOpen} className="px-6 py-2 mr-3 lg:mt-0   hover:bg-red-500 hover:text-white transition-colors bg-white border-2 border-red-500 text-red-500 rounded-3xl  font-visita-bold"><i class="fa-solid mr-1 fa-circle-xmark"></i> Close website</button>

        <button onClick={()=> navigate('/manage/card/'+company_name + '/edit')} className="px-6 py-2 lg:mt-0 mt-4 bg-blue-600 border-2 border-blue-600 text-white rounded-3xl mr-3  font-visita-bold"><i class="fa-regular fa-pen-to-square mr-1"></i> Edit website</button>

        {
          cardDatas && cardDatas.show_customer_details_popop == "true" ?
          <button onClick={()=> navigate('/manage/card/'+company_name + '/customer-details')} className="px-6 py-2 lg:mt-0 mt-4 bg-blue-600 border-2 border-blue-600 text-white rounded-3xl  font-visita-bold"><ion-icon name="newspaper-outline"></ion-icon> Customer details</button>
          : ''
        }

        

    </div>

    <div className="w-full  mt-10 flex flex-wrap items-center justify-center z-50">

        <div className="h-44 w-72 bg-white rounded-3xl lg:mr-6 border flex flex-col items-center justify-center">
            <h6 className='text-xl font-visita-medium' >Total views</h6>
            <h1 className='text-5xl font-visita-bold mt-4 text-blue-600' >{cardDatas && cardDatas.views}</h1>
        </div>

        <div className="h-44 w-72 bg-white rounded-3xl lg:mr-6 lg:mt-0 mt-4 border flex flex-col items-center justify-center">
            <h6 className='text-xl font-visita-medium' >Total feedbaks</h6>
            <h1 className='text-5xl font-visita-bold mt-4 text-blue-600' >{cardDatas.feedbacks && cardDatas.feedbacks.length}</h1>
        </div>

    </div>

    {

franchiseeDatas.length != 0 ?
      
      <div className=" w-[576px]  mt-5 flex flex-col items-center justify-center z-50">

    <div className="h-16 w-full bg-white rounded-3xl mt-4 border flex  items-center justify-center">
        <h6 className='text-xl font-visita-medium' >Created via</h6>
        <h1 className='text-xl font-visita-bold ml-2  text-blue-600' >{franchiseeDatas && franchiseeDatas.franchisee_name}</h1>
    </div>

    <div className="h-16 w-full bg-white rounded-3xl mt-4 border flex  items-center justify-center">
        <h6 className='text-xl font-visita-medium' >Contact {franchiseeDatas && franchiseeDatas.franchisee_name}</h6>
        <h1 className='text-xl font-visita-bold ml-2  text-blue-600' >+91 {franchiseeDatas && franchiseeDatas.phone_no}</h1>
    </div>

    </div>
  :''  
  }

 <div className="z-50 flex flex-col items-center">
 <h1 className='font-visita-medium mt-8' >Do you want to see QRCODE and more?</h1>
  <button onClick={()=> window.open('/create/successfull/' + company_name)} className="px-6 mt-4 cursor-pointer py-2 bg-blue-600 border-2 border-blue-600 text-white rounded-3xl  font-visita-bold">Go To Details Page</button>
 </div>
    
   </div>
  )
}

export default ManageCard