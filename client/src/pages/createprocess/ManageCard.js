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
        axios.get('http://localhost:3005/card/' + company_name).then((response)=> {
          setCardDatas( response.data )
          if(response.data.franchisee != "no franchisee"){
            axios.get('/get-franchisee-datas/' + response.data.franchisee).then((res)=> {
              if(res.status){
                setFranchiseeDatas(res.data.franchisee_data);
              }
            })
          }
        })
    },[])

    function handleClickManage(password){
        if(cardDatas.activated) {
            if(cardDatas.activated.access_password == password){
                document.getElementById('manage_auth_wrapper').style.display = 'none'
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
        url: '/manage/card/close-card',
        data: {
          sub_id: cardDatas.activated.razorpay.subscription_id,
          company_name
        }
      }).then((response)=> {
        if(response.status){
          Toast({
            status:'success',
            title: 'Card was closed',
            postition: 'top',
            toast
          })
          navigate('/card-closed')
        }else{
         

          Toast({
            status:'error',
            title: 'Card closing failed',
            description: 'Try again!',
            postition: 'top',
            toast
          })

        }
      })
      navigate('/loading/closing-card')
    }

    let send_pass_form_2 = document.getElementById('send_pass_form_2');
    
function HandleForgotPasswordClick(e){

  e.target.innerText = 'Please Wait...'

  emailjs.sendForm(apiKeys.emailjs_serviceId, apiKeys.emailjs_templateId2, send_pass_form_2, apiKeys.emailjs_publicKey).then((result) => {
    Toast({
      status:'success',
      title: 'Card password has been send to your email',
      postition: 'top',
      toast
    })
    e.target.innerText = 'Forgot password?'
}, (error) => {
  console.log(error);
  Toast({
    status:'error',
    title: 'Card password send failed',
    description: 'Try again!',
    postition: 'top',
    toast
  })
    e.target.innerText = 'Forgot password?'
})
}



  return (
   <div className='flex flex-col items-center' >

<AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay bg="whiteAlpha.1000" backdropFilter="auto" backdropBlur="3px" >
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              <span className='font-visita-bold' >Close Card</span>
            </AlertDialogHeader>

            <AlertDialogBody>
              <span className='font-visita-medium' >Are you sure? You can't undo this action afterwards.</span>
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                <span className='font-visita-bold' >Cancel</span>
              </Button>
              <Button colorScheme='red' onClick={()=> HandleCloseCard()} ml={3}>
                <span className='font-visita-bold' >Yes' Close Card</span>
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
        <input type="text" name="message" value="Card Password Of" />
      </form>

    <div id='manage_auth_wrapper' className="h-screen scale-125 w-full absolute font-visita-medium bg-white z-[100] flex items-center justify-center">
    <div class="block p-6 rounded-3xl ow-lg bg-white border max-w-sm">
  <div>
    
    <div class="form-group mb-6">
      <label for="card_pass_input" class="form-label inline-block mb-2 text-gray-700">Card Password</label>
      <input  class="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded-full
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="card_pass_input"
        placeholder="Password"
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
      text-xs
      leading-tight
      uppercase
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

<div className="overlays z-10">
        <svg
          className="absolute h-[600px] rotate-45 -left-[300px] -top-[200px]"
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.08"
          viewBox="0 0 800 800"
        >
          <defs>
            <filter
              id="bbblurry-filter"
              width="400%"
              height="400%"
              x="-100%"
              y="-100%"
              colorInterpolationFilters="sRGB"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
            >
              <feGaussianBlur
                x="0%"
                y="0%"
                in="SourceGraphic"
                result="blur"
                stdDeviation="33"
              ></feGaussianBlur>
            </filter>
          </defs>
          <g filter="url(#bbblurry-filter)">
            <ellipse
              cx="545.335"
              cy="543.368"
              fill="hsla(290, 87%, 47%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
            <ellipse
              cx="142.474"
              cy="153.344"
              fill="hsla(167, 72%, 60%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
            <ellipse
              cx="348.797"
              cy="385.014"
              fill="hsla(272, 99%, 54%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
          </g>
        </svg>

        <svg
          className="absolute  h-[500px] rotate-45"
          xmlns="http://www.w3.org/2000/svg"
          opacity="0.08"
          viewBox="0 0 800 800"
        >
          <defs>
            <filter
              id="bbblurry-filter"
              width="400%"
              height="400%"
              x="-100%"
              y="-100%"
              colorInterpolationFilters="sRGB"
              filterUnits="objectBoundingBox"
              primitiveUnits="userSpaceOnUse"
            >
              <feGaussianBlur
                x="0%"
                y="0%"
                in="SourceGraphic"
                result="blur"
                stdDeviation="34"
              ></feGaussianBlur>
            </filter>
          </defs>
          <g filter="url(#bbblurry-filter)">
            <ellipse
              cx="470.989"
              cy="329.755"
              fill="hsla(212, 85%, 57%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
            <ellipse
              cx="244.044"
              cy="193.135"
              fill="hsla(167, 72%, 60%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
            <ellipse
              cx="365.551"
              cy="481.349"
              fill="hsla(272, 99%, 54%, 1)"
              rx="27.5"
              ry="277.5"
            ></ellipse>
          </g>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1000"
          height="700"
          opacity="0.05"
          viewBox="0 0 800 800"
          className="absolute -left-56"
        >
          <g fill="none" stroke="hsla(212, 72%, 59%, 1)">
            <path d="M0 0H44.444V44.444H0z"></path>
            <path d="M44.444 0H88.888V44.444H44.444z"></path>
            <path d="M88.889 0H133.333V44.444H88.889z"></path>
            <path d="M133.333 0H177.777V44.444H133.333z"></path>
            <path d="M177.778 0H222.22199999999998V44.444H177.778z"></path>
            <path d="M222.222 0H266.666V44.444H222.222z"></path>
            <path d="M266.667 0H311.111V44.444H266.667z"></path>
            <path d="M311.111 0H355.555V44.444H311.111z"></path>
            <path d="M355.556 0H400V44.444H355.556z"></path>
            <path d="M400 0H444.444V44.444H400z"></path>
            <path d="M444.444 0H488.88800000000003V44.444H444.444z"></path>
            <path d="M488.889 0H533.333V44.444H488.889z"></path>
            <path d="M533.333 0H577.7769999999999V44.444H533.333z"></path>
            <path d="M577.778 0H622.222V44.444H577.778z"></path>
            <path d="M622.222 0H666.6659999999999V44.444H622.222z"></path>
            <path d="M666.667 0H711.111V44.444H666.667z"></path>
            <path d="M711.111 0H755.555V44.444H711.111z"></path>
            <path d="M755.556 0H800V44.444H755.556z"></path>
            <path d="M800 0H844.444V44.444H800z"></path>
            <path d="M0 44.444H44.444V88.888H0z"></path>
            <path d="M44.444 44.444H88.888V88.888H44.444z"></path>
            <path d="M88.889 44.444H133.333V88.888H88.889z"></path>
            <path d="M133.333 44.444H177.777V88.888H133.333z"></path>
            <path d="M177.778 44.444H222.22199999999998V88.888H177.778z"></path>
            <path d="M222.222 44.444H266.666V88.888H222.222z"></path>
            <path d="M266.667 44.444H311.111V88.888H266.667z"></path>
            <path d="M311.111 44.444H355.555V88.888H311.111z"></path>
            <path d="M355.556 44.444H400V88.888H355.556z"></path>
            <path d="M400 44.444H444.444V88.888H400z"></path>
            <path d="M444.444 44.444H488.88800000000003V88.888H444.444z"></path>
            <path d="M488.889 44.444H533.333V88.888H488.889z"></path>
            <path d="M533.333 44.444H577.7769999999999V88.888H533.333z"></path>
            <path d="M577.778 44.444H622.222V88.888H577.778z"></path>
            <path d="M622.222 44.444H666.6659999999999V88.888H622.222z"></path>
            <path d="M666.667 44.444H711.111V88.888H666.667z"></path>
            <path d="M711.111 44.444H755.555V88.888H711.111z"></path>
            <path d="M755.556 44.444H800V88.888H755.556z"></path>
            <path d="M800 44.444H844.444V88.888H800z"></path>
            <path d="M0 88.889H44.444V133.333H0z"></path>
            <path d="M44.444 88.889H88.888V133.333H44.444z"></path>
            <path d="M88.889 88.889H133.333V133.333H88.889z"></path>
            <path d="M133.333 88.889H177.777V133.333H133.333z"></path>
            <path d="M177.778 88.889H222.22199999999998V133.333H177.778z"></path>
            <path d="M222.222 88.889H266.666V133.333H222.222z"></path>
            <path d="M266.667 88.889H311.111V133.333H266.667z"></path>
            <path d="M311.111 88.889H355.555V133.333H311.111z"></path>
            <path d="M355.556 88.889H400V133.333H355.556z"></path>
            <path d="M400 88.889H444.444V133.333H400z"></path>
            <path d="M444.444 88.889H488.88800000000003V133.333H444.444z"></path>
            <path d="M488.889 88.889H533.333V133.333H488.889z"></path>
            <path d="M533.333 88.889H577.7769999999999V133.333H533.333z"></path>
            <path d="M577.778 88.889H622.222V133.333H577.778z"></path>
            <path d="M622.222 88.889H666.6659999999999V133.333H622.222z"></path>
            <path d="M666.667 88.889H711.111V133.333H666.667z"></path>
            <path d="M711.111 88.889H755.555V133.333H711.111z"></path>
            <path d="M755.556 88.889H800V133.333H755.556z"></path>
            <path d="M800 88.889H844.444V133.333H800z"></path>
            <path d="M0 133.333H44.444V177.777H0z"></path>
            <path d="M44.444 133.333H88.888V177.777H44.444z"></path>
            <path d="M88.889 133.333H133.333V177.777H88.889z"></path>
            <path d="M133.333 133.333H177.777V177.777H133.333z"></path>
            <path d="M177.778 133.333H222.22199999999998V177.777H177.778z"></path>
            <path d="M222.222 133.333H266.666V177.777H222.222z"></path>
            <path d="M266.667 133.333H311.111V177.777H266.667z"></path>
            <path d="M311.111 133.333H355.555V177.777H311.111z"></path>
            <path d="M355.556 133.333H400V177.777H355.556z"></path>
            <path d="M400 133.333H444.444V177.777H400z"></path>
            <path d="M444.444 133.333H488.88800000000003V177.777H444.444z"></path>
            <path d="M488.889 133.333H533.333V177.777H488.889z"></path>
            <path d="M533.333 133.333H577.7769999999999V177.777H533.333z"></path>
            <path d="M577.778 133.333H622.222V177.777H577.778z"></path>
            <path d="M622.222 133.333H666.6659999999999V177.777H622.222z"></path>
            <path d="M666.667 133.333H711.111V177.777H666.667z"></path>
            <path d="M711.111 133.333H755.555V177.777H711.111z"></path>
            <path d="M755.556 133.333H800V177.777H755.556z"></path>
            <path d="M800 133.333H844.444V177.777H800z"></path>
            <path d="M0 177.778H44.444V222.22199999999998H0z"></path>
            <path d="M44.444 177.778H88.888V222.22199999999998H44.444z"></path>
            <path d="M88.889 177.778H133.333V222.22199999999998H88.889z"></path>
            <path d="M133.333 177.778H177.777V222.22199999999998H133.333z"></path>
            <path d="M177.778 177.778H222.22199999999998V222.22199999999998H177.778z"></path>
            <path d="M222.222 177.778H266.666V222.22199999999998H222.222z"></path>
            <path d="M266.667 177.778H311.111V222.22199999999998H266.667z"></path>
            <path d="M311.111 177.778H355.555V222.22199999999998H311.111z"></path>
            <path d="M355.556 177.778H400V222.22199999999998H355.556z"></path>
            <path d="M400 177.778H444.444V222.22199999999998H400z"></path>
            <path d="M444.444 177.778H488.88800000000003V222.22199999999998H444.444z"></path>
            <path d="M488.889 177.778H533.333V222.22199999999998H488.889z"></path>
            <path d="M533.333 177.778H577.7769999999999V222.22199999999998H533.333z"></path>
            <path d="M577.778 177.778H622.222V222.22199999999998H577.778z"></path>
            <path d="M622.222 177.778H666.6659999999999V222.22199999999998H622.222z"></path>
            <path d="M666.667 177.778H711.111V222.22199999999998H666.667z"></path>
            <path d="M711.111 177.778H755.555V222.22199999999998H711.111z"></path>
            <path d="M755.556 177.778H800V222.22199999999998H755.556z"></path>
            <path d="M800 177.778H844.444V222.22199999999998H800z"></path>
            <path d="M0 222.222H44.444V266.666H0z"></path>
            <path d="M44.444 222.222H88.888V266.666H44.444z"></path>
            <path d="M88.889 222.222H133.333V266.666H88.889z"></path>
            <path d="M133.333 222.222H177.777V266.666H133.333z"></path>
            <path d="M177.778 222.222H222.22199999999998V266.666H177.778z"></path>
            <path d="M222.222 222.222H266.666V266.666H222.222z"></path>
            <path d="M266.667 222.222H311.111V266.666H266.667z"></path>
            <path d="M311.111 222.222H355.555V266.666H311.111z"></path>
            <path d="M355.556 222.222H400V266.666H355.556z"></path>
            <path d="M400 222.222H444.444V266.666H400z"></path>
            <path d="M444.444 222.222H488.88800000000003V266.666H444.444z"></path>
            <path d="M488.889 222.222H533.333V266.666H488.889z"></path>
            <path d="M533.333 222.222H577.7769999999999V266.666H533.333z"></path>
            <path d="M577.778 222.222H622.222V266.666H577.778z"></path>
            <path d="M622.222 222.222H666.6659999999999V266.666H622.222z"></path>
            <path d="M666.667 222.222H711.111V266.666H666.667z"></path>
            <path d="M711.111 222.222H755.555V266.666H711.111z"></path>
            <path d="M755.556 222.222H800V266.666H755.556z"></path>
            <path d="M800 222.222H844.444V266.666H800z"></path>
            <path d="M0 266.667H44.444V311.111H0z"></path>
            <path d="M44.444 266.667H88.888V311.111H44.444z"></path>
            <path d="M88.889 266.667H133.333V311.111H88.889z"></path>
            <path d="M133.333 266.667H177.777V311.111H133.333z"></path>
            <path d="M177.778 266.667H222.22199999999998V311.111H177.778z"></path>
            <path d="M222.222 266.667H266.666V311.111H222.222z"></path>
            <path d="M266.667 266.667H311.111V311.111H266.667z"></path>
            <path d="M311.111 266.667H355.555V311.111H311.111z"></path>
            <path d="M355.556 266.667H400V311.111H355.556z"></path>
            <path d="M400 266.667H444.444V311.111H400z"></path>
            <path d="M444.444 266.667H488.88800000000003V311.111H444.444z"></path>
            <path d="M488.889 266.667H533.333V311.111H488.889z"></path>
            <path d="M533.333 266.667H577.7769999999999V311.111H533.333z"></path>
            <path d="M577.778 266.667H622.222V311.111H577.778z"></path>
            <path d="M622.222 266.667H666.6659999999999V311.111H622.222z"></path>
            <path d="M666.667 266.667H711.111V311.111H666.667z"></path>
            <path d="M711.111 266.667H755.555V311.111H711.111z"></path>
            <path d="M755.556 266.667H800V311.111H755.556z"></path>
            <path d="M800 266.667H844.444V311.111H800z"></path>
            <path d="M0 311.111H44.444V355.555H0z"></path>
            <path d="M44.444 311.111H88.888V355.555H44.444z"></path>
            <path d="M88.889 311.111H133.333V355.555H88.889z"></path>
            <path d="M133.333 311.111H177.777V355.555H133.333z"></path>
            <path d="M177.778 311.111H222.22199999999998V355.555H177.778z"></path>
            <path d="M222.222 311.111H266.666V355.555H222.222z"></path>
            <path d="M266.667 311.111H311.111V355.555H266.667z"></path>
            <path d="M311.111 311.111H355.555V355.555H311.111z"></path>
            <path d="M355.556 311.111H400V355.555H355.556z"></path>
            <path d="M400 311.111H444.444V355.555H400z"></path>
            <path d="M444.444 311.111H488.88800000000003V355.555H444.444z"></path>
            <path d="M488.889 311.111H533.333V355.555H488.889z"></path>
            <path d="M533.333 311.111H577.7769999999999V355.555H533.333z"></path>
            <path d="M577.778 311.111H622.222V355.555H577.778z"></path>
            <path d="M622.222 311.111H666.6659999999999V355.555H622.222z"></path>
            <path d="M666.667 311.111H711.111V355.555H666.667z"></path>
            <path d="M711.111 311.111H755.555V355.555H711.111z"></path>
            <path d="M755.556 311.111H800V355.555H755.556z"></path>
            <path d="M800 311.111H844.444V355.555H800z"></path>
            <path d="M0 355.556H44.444V400H0z"></path>
            <path d="M44.444 355.556H88.888V400H44.444z"></path>
            <path d="M88.889 355.556H133.333V400H88.889z"></path>
            <path d="M133.333 355.556H177.777V400H133.333z"></path>
            <path d="M177.778 355.556H222.22199999999998V400H177.778z"></path>
            <path d="M222.222 355.556H266.666V400H222.222z"></path>
            <path d="M266.667 355.556H311.111V400H266.667z"></path>
            <path d="M311.111 355.556H355.555V400H311.111z"></path>
            <path d="M355.556 355.556H400V400H355.556z"></path>
            <path d="M400 355.556H444.444V400H400z"></path>
            <path d="M444.444 355.556H488.88800000000003V400H444.444z"></path>
            <path d="M488.889 355.556H533.333V400H488.889z"></path>
            <path d="M533.333 355.556H577.7769999999999V400H533.333z"></path>
            <path d="M577.778 355.556H622.222V400H577.778z"></path>
            <path d="M622.222 355.556H666.6659999999999V400H622.222z"></path>
            <path d="M666.667 355.556H711.111V400H666.667z"></path>
            <path d="M711.111 355.556H755.555V400H711.111z"></path>
            <path d="M755.556 355.556H800V400H755.556z"></path>
            <path d="M800 355.556H844.444V400H800z"></path>
            <path d="M0 400H44.444V444.444H0z"></path>
            <path d="M44.444 400H88.888V444.444H44.444z"></path>
            <path d="M88.889 400H133.333V444.444H88.889z"></path>
            <path d="M133.333 400H177.777V444.444H133.333z"></path>
            <path d="M177.778 400H222.22199999999998V444.444H177.778z"></path>
            <path d="M222.222 400H266.666V444.444H222.222z"></path>
            <path d="M266.667 400H311.111V444.444H266.667z"></path>
            <path d="M311.111 400H355.555V444.444H311.111z"></path>
            <path d="M355.556 400H400V444.444H355.556z"></path>
            <path d="M400 400H444.444V444.444H400z"></path>
            <path d="M444.444 400H488.88800000000003V444.444H444.444z"></path>
            <path d="M488.889 400H533.333V444.444H488.889z"></path>
            <path d="M533.333 400H577.7769999999999V444.444H533.333z"></path>
            <path d="M577.778 400H622.222V444.444H577.778z"></path>
            <path d="M622.222 400H666.6659999999999V444.444H622.222z"></path>
            <path d="M666.667 400H711.111V444.444H666.667z"></path>
            <path d="M711.111 400H755.555V444.444H711.111z"></path>
            <path d="M755.556 400H800V444.444H755.556z"></path>
            <path d="M800 400H844.444V444.444H800z"></path>
            <path d="M0 444.444H44.444V488.88800000000003H0z"></path>
            <path d="M44.444 444.444H88.888V488.88800000000003H44.444z"></path>
            <path d="M88.889 444.444H133.333V488.88800000000003H88.889z"></path>
            <path d="M133.333 444.444H177.777V488.88800000000003H133.333z"></path>
            <path d="M177.778 444.444H222.22199999999998V488.88800000000003H177.778z"></path>
            <path d="M222.222 444.444H266.666V488.88800000000003H222.222z"></path>
            <path d="M266.667 444.444H311.111V488.88800000000003H266.667z"></path>
            <path d="M311.111 444.444H355.555V488.88800000000003H311.111z"></path>
            <path d="M355.556 444.444H400V488.88800000000003H355.556z"></path>
            <path d="M400 444.444H444.444V488.88800000000003H400z"></path>
            <path d="M444.444 444.444H488.88800000000003V488.88800000000003H444.444z"></path>
            <path d="M488.889 444.444H533.333V488.88800000000003H488.889z"></path>
            <path d="M533.333 444.444H577.7769999999999V488.88800000000003H533.333z"></path>
            <path d="M577.778 444.444H622.222V488.88800000000003H577.778z"></path>
            <path d="M622.222 444.444H666.6659999999999V488.88800000000003H622.222z"></path>
            <path d="M666.667 444.444H711.111V488.88800000000003H666.667z"></path>
            <path d="M711.111 444.444H755.555V488.88800000000003H711.111z"></path>
            <path d="M755.556 444.444H800V488.88800000000003H755.556z"></path>
            <path d="M800 444.444H844.444V488.88800000000003H800z"></path>
            <path d="M0 488.889H44.444V533.333H0z"></path>
            <path d="M44.444 488.889H88.888V533.333H44.444z"></path>
            <path d="M88.889 488.889H133.333V533.333H88.889z"></path>
            <path d="M133.333 488.889H177.777V533.333H133.333z"></path>
            <path d="M177.778 488.889H222.22199999999998V533.333H177.778z"></path>
            <path d="M222.222 488.889H266.666V533.333H222.222z"></path>
            <path d="M266.667 488.889H311.111V533.333H266.667z"></path>
            <path d="M311.111 488.889H355.555V533.333H311.111z"></path>
            <path d="M355.556 488.889H400V533.333H355.556z"></path>
            <path d="M400 488.889H444.444V533.333H400z"></path>
            <path d="M444.444 488.889H488.88800000000003V533.333H444.444z"></path>
            <path d="M488.889 488.889H533.333V533.333H488.889z"></path>
            <path d="M533.333 488.889H577.7769999999999V533.333H533.333z"></path>
            <path d="M577.778 488.889H622.222V533.333H577.778z"></path>
            <path d="M622.222 488.889H666.6659999999999V533.333H622.222z"></path>
            <path d="M666.667 488.889H711.111V533.333H666.667z"></path>
            <path d="M711.111 488.889H755.555V533.333H711.111z"></path>
            <path d="M755.556 488.889H800V533.333H755.556z"></path>
            <path d="M800 488.889H844.444V533.333H800z"></path>
            <path d="M0 533.333H44.444V577.7769999999999H0z"></path>
            <path d="M44.444 533.333H88.888V577.7769999999999H44.444z"></path>
            <path d="M88.889 533.333H133.333V577.7769999999999H88.889z"></path>
            <path d="M133.333 533.333H177.777V577.7769999999999H133.333z"></path>
            <path d="M177.778 533.333H222.22199999999998V577.7769999999999H177.778z"></path>
            <path d="M222.222 533.333H266.666V577.7769999999999H222.222z"></path>
            <path d="M266.667 533.333H311.111V577.7769999999999H266.667z"></path>
            <path d="M311.111 533.333H355.555V577.7769999999999H311.111z"></path>
            <path d="M355.556 533.333H400V577.7769999999999H355.556z"></path>
            <path d="M400 533.333H444.444V577.7769999999999H400z"></path>
            <path d="M444.444 533.333H488.88800000000003V577.7769999999999H444.444z"></path>
            <path d="M488.889 533.333H533.333V577.7769999999999H488.889z"></path>
            <path d="M533.333 533.333H577.7769999999999V577.7769999999999H533.333z"></path>
            <path d="M577.778 533.333H622.222V577.7769999999999H577.778z"></path>
            <path d="M622.222 533.333H666.6659999999999V577.7769999999999H622.222z"></path>
            <path d="M666.667 533.333H711.111V577.7769999999999H666.667z"></path>
            <path d="M711.111 533.333H755.555V577.7769999999999H711.111z"></path>
            <path d="M755.556 533.333H800V577.7769999999999H755.556z"></path>
            <path d="M800 533.333H844.444V577.7769999999999H800z"></path>
            <path d="M0 577.778H44.444V622.222H0z"></path>
            <path d="M44.444 577.778H88.888V622.222H44.444z"></path>
            <path d="M88.889 577.778H133.333V622.222H88.889z"></path>
            <path d="M133.333 577.778H177.777V622.222H133.333z"></path>
            <path d="M177.778 577.778H222.22199999999998V622.222H177.778z"></path>
            <path d="M222.222 577.778H266.666V622.222H222.222z"></path>
            <path d="M266.667 577.778H311.111V622.222H266.667z"></path>
            <path d="M311.111 577.778H355.555V622.222H311.111z"></path>
            <path d="M355.556 577.778H400V622.222H355.556z"></path>
            <path d="M400 577.778H444.444V622.222H400z"></path>
            <path d="M444.444 577.778H488.88800000000003V622.222H444.444z"></path>
            <path d="M488.889 577.778H533.333V622.222H488.889z"></path>
            <path d="M533.333 577.778H577.7769999999999V622.222H533.333z"></path>
            <path d="M577.778 577.778H622.222V622.222H577.778z"></path>
            <path d="M622.222 577.778H666.6659999999999V622.222H622.222z"></path>
            <path d="M666.667 577.778H711.111V622.222H666.667z"></path>
            <path d="M711.111 577.778H755.555V622.222H711.111z"></path>
            <path d="M755.556 577.778H800V622.222H755.556z"></path>
            <path d="M800 577.778H844.444V622.222H800z"></path>
            <path d="M0 622.222H44.444V666.6659999999999H0z"></path>
            <path d="M44.444 622.222H88.888V666.6659999999999H44.444z"></path>
            <path d="M88.889 622.222H133.333V666.6659999999999H88.889z"></path>
            <path d="M133.333 622.222H177.777V666.6659999999999H133.333z"></path>
            <path d="M177.778 622.222H222.22199999999998V666.6659999999999H177.778z"></path>
            <path d="M222.222 622.222H266.666V666.6659999999999H222.222z"></path>
            <path d="M266.667 622.222H311.111V666.6659999999999H266.667z"></path>
            <path d="M311.111 622.222H355.555V666.6659999999999H311.111z"></path>
            <path d="M355.556 622.222H400V666.6659999999999H355.556z"></path>
            <path d="M400 622.222H444.444V666.6659999999999H400z"></path>
            <path d="M444.444 622.222H488.88800000000003V666.6659999999999H444.444z"></path>
            <path d="M488.889 622.222H533.333V666.6659999999999H488.889z"></path>
            <path d="M533.333 622.222H577.7769999999999V666.6659999999999H533.333z"></path>
            <path d="M577.778 622.222H622.222V666.6659999999999H577.778z"></path>
            <path d="M622.222 622.222H666.6659999999999V666.6659999999999H622.222z"></path>
            <path d="M666.667 622.222H711.111V666.6659999999999H666.667z"></path>
            <path d="M711.111 622.222H755.555V666.6659999999999H711.111z"></path>
            <path d="M755.556 622.222H800V666.6659999999999H755.556z"></path>
            <path d="M800 622.222H844.444V666.6659999999999H800z"></path>
            <path d="M0 666.667H44.444V711.111H0z"></path>
            <path d="M44.444 666.667H88.888V711.111H44.444z"></path>
            <path d="M88.889 666.667H133.333V711.111H88.889z"></path>
            <path d="M133.333 666.667H177.777V711.111H133.333z"></path>
            <path d="M177.778 666.667H222.22199999999998V711.111H177.778z"></path>
            <path d="M222.222 666.667H266.666V711.111H222.222z"></path>
            <path d="M266.667 666.667H311.111V711.111H266.667z"></path>
            <path d="M311.111 666.667H355.555V711.111H311.111z"></path>
            <path d="M355.556 666.667H400V711.111H355.556z"></path>
            <path d="M400 666.667H444.444V711.111H400z"></path>
            <path d="M444.444 666.667H488.88800000000003V711.111H444.444z"></path>
            <path d="M488.889 666.667H533.333V711.111H488.889z"></path>
            <path d="M533.333 666.667H577.7769999999999V711.111H533.333z"></path>
            <path d="M577.778 666.667H622.222V711.111H577.778z"></path>
            <path d="M622.222 666.667H666.6659999999999V711.111H622.222z"></path>
            <path d="M666.667 666.667H711.111V711.111H666.667z"></path>
            <path d="M711.111 666.667H755.555V711.111H711.111z"></path>
            <path d="M755.556 666.667H800V711.111H755.556z"></path>
            <path d="M800 666.667H844.444V711.111H800z"></path>
            <path d="M0 711.111H44.444V755.555H0z"></path>
            <path d="M44.444 711.111H88.888V755.555H44.444z"></path>
            <path d="M88.889 711.111H133.333V755.555H88.889z"></path>
            <path d="M133.333 711.111H177.777V755.555H133.333z"></path>
            <path d="M177.778 711.111H222.22199999999998V755.555H177.778z"></path>
            <path d="M222.222 711.111H266.666V755.555H222.222z"></path>
            <path d="M266.667 711.111H311.111V755.555H266.667z"></path>
            <path d="M311.111 711.111H355.555V755.555H311.111z"></path>
            <path d="M355.556 711.111H400V755.555H355.556z"></path>
            <path d="M400 711.111H444.444V755.555H400z"></path>
            <path d="M444.444 711.111H488.88800000000003V755.555H444.444z"></path>
            <path d="M488.889 711.111H533.333V755.555H488.889z"></path>
            <path d="M533.333 711.111H577.7769999999999V755.555H533.333z"></path>
            <path d="M577.778 711.111H622.222V755.555H577.778z"></path>
            <path d="M622.222 711.111H666.6659999999999V755.555H622.222z"></path>
            <path d="M666.667 711.111H711.111V755.555H666.667z"></path>
            <path d="M711.111 711.111H755.555V755.555H711.111z"></path>
            <path d="M755.556 711.111H800V755.555H755.556z"></path>
            <path d="M800 711.111H844.444V755.555H800z"></path>
            <path d="M0 755.556H44.444V800H0z"></path>
            <path d="M44.444 755.556H88.888V800H44.444z"></path>
            <path d="M88.889 755.556H133.333V800H88.889z"></path>
            <path d="M133.333 755.556H177.777V800H133.333z"></path>
            <path d="M177.778 755.556H222.22199999999998V800H177.778z"></path>
            <path d="M222.222 755.556H266.666V800H222.222z"></path>
            <path d="M266.667 755.556H311.111V800H266.667z"></path>
            <path d="M311.111 755.556H355.555V800H311.111z"></path>
            <path d="M355.556 755.556H400V800H355.556z"></path>
            <path d="M400 755.556H444.444V800H400z"></path>
            <path d="M444.444 755.556H488.88800000000003V800H444.444z"></path>
            <path d="M488.889 755.556H533.333V800H488.889z"></path>
            <path d="M533.333 755.556H577.7769999999999V800H533.333z"></path>
            <path d="M577.778 755.556H622.222V800H577.778z"></path>
            <path d="M622.222 755.556H666.6659999999999V800H622.222z"></path>
            <path d="M666.667 755.556H711.111V800H666.667z"></path>
            <path d="M711.111 755.556H755.555V800H711.111z"></path>
            <path d="M755.556 755.556H800V800H755.556z"></path>
            <path d="M800 755.556H844.444V800H800z"></path>
            <path d="M0 800H44.444V844.444H0z"></path>
            <path d="M44.444 800H88.888V844.444H44.444z"></path>
            <path d="M88.889 800H133.333V844.444H88.889z"></path>
            <path d="M133.333 800H177.777V844.444H133.333z"></path>
            <path d="M177.778 800H222.22199999999998V844.444H177.778z"></path>
            <path d="M222.222 800H266.666V844.444H222.222z"></path>
            <path d="M266.667 800H311.111V844.444H266.667z"></path>
            <path d="M311.111 800H355.555V844.444H311.111z"></path>
            <path d="M355.556 800H400V844.444H355.556z"></path>
            <path d="M400 800H444.444V844.444H400z"></path>
            <path d="M444.444 800H488.88800000000003V844.444H444.444z"></path>
            <path d="M488.889 800H533.333V844.444H488.889z"></path>
            <path d="M533.333 800H577.7769999999999V844.444H533.333z"></path>
            <path d="M577.778 800H622.222V844.444H577.778z"></path>
            <path d="M622.222 800H666.6659999999999V844.444H622.222z"></path>
            <path d="M666.667 800H711.111V844.444H666.667z"></path>
            <path d="M711.111 800H755.555V844.444H711.111z"></path>
            <path d="M755.556 800H800V844.444H755.556z"></path>
            <path d="M800 800H844.444V844.444H800z"></path>
          </g>
        </svg>

        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1000"
          height="700"
          opacity="0.05"
          viewBox="0 0 800 800"
          className="absolute -right-20"
        >
          <g fill="none" stroke="hsla(212, 72%, 59%, 1)">
            <path d="M0 0H44.444V44.444H0z"></path>
            <path d="M44.444 0H88.888V44.444H44.444z"></path>
            <path d="M88.889 0H133.333V44.444H88.889z"></path>
            <path d="M133.333 0H177.777V44.444H133.333z"></path>
            <path d="M177.778 0H222.22199999999998V44.444H177.778z"></path>
            <path d="M222.222 0H266.666V44.444H222.222z"></path>
            <path d="M266.667 0H311.111V44.444H266.667z"></path>
            <path d="M311.111 0H355.555V44.444H311.111z"></path>
            <path d="M355.556 0H400V44.444H355.556z"></path>
            <path d="M400 0H444.444V44.444H400z"></path>
            <path d="M444.444 0H488.88800000000003V44.444H444.444z"></path>
            <path d="M488.889 0H533.333V44.444H488.889z"></path>
            <path d="M533.333 0H577.7769999999999V44.444H533.333z"></path>
            <path d="M577.778 0H622.222V44.444H577.778z"></path>
            <path d="M622.222 0H666.6659999999999V44.444H622.222z"></path>
            <path d="M666.667 0H711.111V44.444H666.667z"></path>
            <path d="M711.111 0H755.555V44.444H711.111z"></path>
            <path d="M755.556 0H800V44.444H755.556z"></path>
            <path d="M800 0H844.444V44.444H800z"></path>
            <path d="M0 44.444H44.444V88.888H0z"></path>
            <path d="M44.444 44.444H88.888V88.888H44.444z"></path>
            <path d="M88.889 44.444H133.333V88.888H88.889z"></path>
            <path d="M133.333 44.444H177.777V88.888H133.333z"></path>
            <path d="M177.778 44.444H222.22199999999998V88.888H177.778z"></path>
            <path d="M222.222 44.444H266.666V88.888H222.222z"></path>
            <path d="M266.667 44.444H311.111V88.888H266.667z"></path>
            <path d="M311.111 44.444H355.555V88.888H311.111z"></path>
            <path d="M355.556 44.444H400V88.888H355.556z"></path>
            <path d="M400 44.444H444.444V88.888H400z"></path>
            <path d="M444.444 44.444H488.88800000000003V88.888H444.444z"></path>
            <path d="M488.889 44.444H533.333V88.888H488.889z"></path>
            <path d="M533.333 44.444H577.7769999999999V88.888H533.333z"></path>
            <path d="M577.778 44.444H622.222V88.888H577.778z"></path>
            <path d="M622.222 44.444H666.6659999999999V88.888H622.222z"></path>
            <path d="M666.667 44.444H711.111V88.888H666.667z"></path>
            <path d="M711.111 44.444H755.555V88.888H711.111z"></path>
            <path d="M755.556 44.444H800V88.888H755.556z"></path>
            <path d="M800 44.444H844.444V88.888H800z"></path>
            <path d="M0 88.889H44.444V133.333H0z"></path>
            <path d="M44.444 88.889H88.888V133.333H44.444z"></path>
            <path d="M88.889 88.889H133.333V133.333H88.889z"></path>
            <path d="M133.333 88.889H177.777V133.333H133.333z"></path>
            <path d="M177.778 88.889H222.22199999999998V133.333H177.778z"></path>
            <path d="M222.222 88.889H266.666V133.333H222.222z"></path>
            <path d="M266.667 88.889H311.111V133.333H266.667z"></path>
            <path d="M311.111 88.889H355.555V133.333H311.111z"></path>
            <path d="M355.556 88.889H400V133.333H355.556z"></path>
            <path d="M400 88.889H444.444V133.333H400z"></path>
            <path d="M444.444 88.889H488.88800000000003V133.333H444.444z"></path>
            <path d="M488.889 88.889H533.333V133.333H488.889z"></path>
            <path d="M533.333 88.889H577.7769999999999V133.333H533.333z"></path>
            <path d="M577.778 88.889H622.222V133.333H577.778z"></path>
            <path d="M622.222 88.889H666.6659999999999V133.333H622.222z"></path>
            <path d="M666.667 88.889H711.111V133.333H666.667z"></path>
            <path d="M711.111 88.889H755.555V133.333H711.111z"></path>
            <path d="M755.556 88.889H800V133.333H755.556z"></path>
            <path d="M800 88.889H844.444V133.333H800z"></path>
            <path d="M0 133.333H44.444V177.777H0z"></path>
            <path d="M44.444 133.333H88.888V177.777H44.444z"></path>
            <path d="M88.889 133.333H133.333V177.777H88.889z"></path>
            <path d="M133.333 133.333H177.777V177.777H133.333z"></path>
            <path d="M177.778 133.333H222.22199999999998V177.777H177.778z"></path>
            <path d="M222.222 133.333H266.666V177.777H222.222z"></path>
            <path d="M266.667 133.333H311.111V177.777H266.667z"></path>
            <path d="M311.111 133.333H355.555V177.777H311.111z"></path>
            <path d="M355.556 133.333H400V177.777H355.556z"></path>
            <path d="M400 133.333H444.444V177.777H400z"></path>
            <path d="M444.444 133.333H488.88800000000003V177.777H444.444z"></path>
            <path d="M488.889 133.333H533.333V177.777H488.889z"></path>
            <path d="M533.333 133.333H577.7769999999999V177.777H533.333z"></path>
            <path d="M577.778 133.333H622.222V177.777H577.778z"></path>
            <path d="M622.222 133.333H666.6659999999999V177.777H622.222z"></path>
            <path d="M666.667 133.333H711.111V177.777H666.667z"></path>
            <path d="M711.111 133.333H755.555V177.777H711.111z"></path>
            <path d="M755.556 133.333H800V177.777H755.556z"></path>
            <path d="M800 133.333H844.444V177.777H800z"></path>
            <path d="M0 177.778H44.444V222.22199999999998H0z"></path>
            <path d="M44.444 177.778H88.888V222.22199999999998H44.444z"></path>
            <path d="M88.889 177.778H133.333V222.22199999999998H88.889z"></path>
            <path d="M133.333 177.778H177.777V222.22199999999998H133.333z"></path>
            <path d="M177.778 177.778H222.22199999999998V222.22199999999998H177.778z"></path>
            <path d="M222.222 177.778H266.666V222.22199999999998H222.222z"></path>
            <path d="M266.667 177.778H311.111V222.22199999999998H266.667z"></path>
            <path d="M311.111 177.778H355.555V222.22199999999998H311.111z"></path>
            <path d="M355.556 177.778H400V222.22199999999998H355.556z"></path>
            <path d="M400 177.778H444.444V222.22199999999998H400z"></path>
            <path d="M444.444 177.778H488.88800000000003V222.22199999999998H444.444z"></path>
            <path d="M488.889 177.778H533.333V222.22199999999998H488.889z"></path>
            <path d="M533.333 177.778H577.7769999999999V222.22199999999998H533.333z"></path>
            <path d="M577.778 177.778H622.222V222.22199999999998H577.778z"></path>
            <path d="M622.222 177.778H666.6659999999999V222.22199999999998H622.222z"></path>
            <path d="M666.667 177.778H711.111V222.22199999999998H666.667z"></path>
            <path d="M711.111 177.778H755.555V222.22199999999998H711.111z"></path>
            <path d="M755.556 177.778H800V222.22199999999998H755.556z"></path>
            <path d="M800 177.778H844.444V222.22199999999998H800z"></path>
            <path d="M0 222.222H44.444V266.666H0z"></path>
            <path d="M44.444 222.222H88.888V266.666H44.444z"></path>
            <path d="M88.889 222.222H133.333V266.666H88.889z"></path>
            <path d="M133.333 222.222H177.777V266.666H133.333z"></path>
            <path d="M177.778 222.222H222.22199999999998V266.666H177.778z"></path>
            <path d="M222.222 222.222H266.666V266.666H222.222z"></path>
            <path d="M266.667 222.222H311.111V266.666H266.667z"></path>
            <path d="M311.111 222.222H355.555V266.666H311.111z"></path>
            <path d="M355.556 222.222H400V266.666H355.556z"></path>
            <path d="M400 222.222H444.444V266.666H400z"></path>
            <path d="M444.444 222.222H488.88800000000003V266.666H444.444z"></path>
            <path d="M488.889 222.222H533.333V266.666H488.889z"></path>
            <path d="M533.333 222.222H577.7769999999999V266.666H533.333z"></path>
            <path d="M577.778 222.222H622.222V266.666H577.778z"></path>
            <path d="M622.222 222.222H666.6659999999999V266.666H622.222z"></path>
            <path d="M666.667 222.222H711.111V266.666H666.667z"></path>
            <path d="M711.111 222.222H755.555V266.666H711.111z"></path>
            <path d="M755.556 222.222H800V266.666H755.556z"></path>
            <path d="M800 222.222H844.444V266.666H800z"></path>
            <path d="M0 266.667H44.444V311.111H0z"></path>
            <path d="M44.444 266.667H88.888V311.111H44.444z"></path>
            <path d="M88.889 266.667H133.333V311.111H88.889z"></path>
            <path d="M133.333 266.667H177.777V311.111H133.333z"></path>
            <path d="M177.778 266.667H222.22199999999998V311.111H177.778z"></path>
            <path d="M222.222 266.667H266.666V311.111H222.222z"></path>
            <path d="M266.667 266.667H311.111V311.111H266.667z"></path>
            <path d="M311.111 266.667H355.555V311.111H311.111z"></path>
            <path d="M355.556 266.667H400V311.111H355.556z"></path>
            <path d="M400 266.667H444.444V311.111H400z"></path>
            <path d="M444.444 266.667H488.88800000000003V311.111H444.444z"></path>
            <path d="M488.889 266.667H533.333V311.111H488.889z"></path>
            <path d="M533.333 266.667H577.7769999999999V311.111H533.333z"></path>
            <path d="M577.778 266.667H622.222V311.111H577.778z"></path>
            <path d="M622.222 266.667H666.6659999999999V311.111H622.222z"></path>
            <path d="M666.667 266.667H711.111V311.111H666.667z"></path>
            <path d="M711.111 266.667H755.555V311.111H711.111z"></path>
            <path d="M755.556 266.667H800V311.111H755.556z"></path>
            <path d="M800 266.667H844.444V311.111H800z"></path>
            <path d="M0 311.111H44.444V355.555H0z"></path>
            <path d="M44.444 311.111H88.888V355.555H44.444z"></path>
            <path d="M88.889 311.111H133.333V355.555H88.889z"></path>
            <path d="M133.333 311.111H177.777V355.555H133.333z"></path>
            <path d="M177.778 311.111H222.22199999999998V355.555H177.778z"></path>
            <path d="M222.222 311.111H266.666V355.555H222.222z"></path>
            <path d="M266.667 311.111H311.111V355.555H266.667z"></path>
            <path d="M311.111 311.111H355.555V355.555H311.111z"></path>
            <path d="M355.556 311.111H400V355.555H355.556z"></path>
            <path d="M400 311.111H444.444V355.555H400z"></path>
            <path d="M444.444 311.111H488.88800000000003V355.555H444.444z"></path>
            <path d="M488.889 311.111H533.333V355.555H488.889z"></path>
            <path d="M533.333 311.111H577.7769999999999V355.555H533.333z"></path>
            <path d="M577.778 311.111H622.222V355.555H577.778z"></path>
            <path d="M622.222 311.111H666.6659999999999V355.555H622.222z"></path>
            <path d="M666.667 311.111H711.111V355.555H666.667z"></path>
            <path d="M711.111 311.111H755.555V355.555H711.111z"></path>
            <path d="M755.556 311.111H800V355.555H755.556z"></path>
            <path d="M800 311.111H844.444V355.555H800z"></path>
            <path d="M0 355.556H44.444V400H0z"></path>
            <path d="M44.444 355.556H88.888V400H44.444z"></path>
            <path d="M88.889 355.556H133.333V400H88.889z"></path>
            <path d="M133.333 355.556H177.777V400H133.333z"></path>
            <path d="M177.778 355.556H222.22199999999998V400H177.778z"></path>
            <path d="M222.222 355.556H266.666V400H222.222z"></path>
            <path d="M266.667 355.556H311.111V400H266.667z"></path>
            <path d="M311.111 355.556H355.555V400H311.111z"></path>
            <path d="M355.556 355.556H400V400H355.556z"></path>
            <path d="M400 355.556H444.444V400H400z"></path>
            <path d="M444.444 355.556H488.88800000000003V400H444.444z"></path>
            <path d="M488.889 355.556H533.333V400H488.889z"></path>
            <path d="M533.333 355.556H577.7769999999999V400H533.333z"></path>
            <path d="M577.778 355.556H622.222V400H577.778z"></path>
            <path d="M622.222 355.556H666.6659999999999V400H622.222z"></path>
            <path d="M666.667 355.556H711.111V400H666.667z"></path>
            <path d="M711.111 355.556H755.555V400H711.111z"></path>
            <path d="M755.556 355.556H800V400H755.556z"></path>
            <path d="M800 355.556H844.444V400H800z"></path>
            <path d="M0 400H44.444V444.444H0z"></path>
            <path d="M44.444 400H88.888V444.444H44.444z"></path>
            <path d="M88.889 400H133.333V444.444H88.889z"></path>
            <path d="M133.333 400H177.777V444.444H133.333z"></path>
            <path d="M177.778 400H222.22199999999998V444.444H177.778z"></path>
            <path d="M222.222 400H266.666V444.444H222.222z"></path>
            <path d="M266.667 400H311.111V444.444H266.667z"></path>
            <path d="M311.111 400H355.555V444.444H311.111z"></path>
            <path d="M355.556 400H400V444.444H355.556z"></path>
            <path d="M400 400H444.444V444.444H400z"></path>
            <path d="M444.444 400H488.88800000000003V444.444H444.444z"></path>
            <path d="M488.889 400H533.333V444.444H488.889z"></path>
            <path d="M533.333 400H577.7769999999999V444.444H533.333z"></path>
            <path d="M577.778 400H622.222V444.444H577.778z"></path>
            <path d="M622.222 400H666.6659999999999V444.444H622.222z"></path>
            <path d="M666.667 400H711.111V444.444H666.667z"></path>
            <path d="M711.111 400H755.555V444.444H711.111z"></path>
            <path d="M755.556 400H800V444.444H755.556z"></path>
            <path d="M800 400H844.444V444.444H800z"></path>
            <path d="M0 444.444H44.444V488.88800000000003H0z"></path>
            <path d="M44.444 444.444H88.888V488.88800000000003H44.444z"></path>
            <path d="M88.889 444.444H133.333V488.88800000000003H88.889z"></path>
            <path d="M133.333 444.444H177.777V488.88800000000003H133.333z"></path>
            <path d="M177.778 444.444H222.22199999999998V488.88800000000003H177.778z"></path>
            <path d="M222.222 444.444H266.666V488.88800000000003H222.222z"></path>
            <path d="M266.667 444.444H311.111V488.88800000000003H266.667z"></path>
            <path d="M311.111 444.444H355.555V488.88800000000003H311.111z"></path>
            <path d="M355.556 444.444H400V488.88800000000003H355.556z"></path>
            <path d="M400 444.444H444.444V488.88800000000003H400z"></path>
            <path d="M444.444 444.444H488.88800000000003V488.88800000000003H444.444z"></path>
            <path d="M488.889 444.444H533.333V488.88800000000003H488.889z"></path>
            <path d="M533.333 444.444H577.7769999999999V488.88800000000003H533.333z"></path>
            <path d="M577.778 444.444H622.222V488.88800000000003H577.778z"></path>
            <path d="M622.222 444.444H666.6659999999999V488.88800000000003H622.222z"></path>
            <path d="M666.667 444.444H711.111V488.88800000000003H666.667z"></path>
            <path d="M711.111 444.444H755.555V488.88800000000003H711.111z"></path>
            <path d="M755.556 444.444H800V488.88800000000003H755.556z"></path>
            <path d="M800 444.444H844.444V488.88800000000003H800z"></path>
            <path d="M0 488.889H44.444V533.333H0z"></path>
            <path d="M44.444 488.889H88.888V533.333H44.444z"></path>
            <path d="M88.889 488.889H133.333V533.333H88.889z"></path>
            <path d="M133.333 488.889H177.777V533.333H133.333z"></path>
            <path d="M177.778 488.889H222.22199999999998V533.333H177.778z"></path>
            <path d="M222.222 488.889H266.666V533.333H222.222z"></path>
            <path d="M266.667 488.889H311.111V533.333H266.667z"></path>
            <path d="M311.111 488.889H355.555V533.333H311.111z"></path>
            <path d="M355.556 488.889H400V533.333H355.556z"></path>
            <path d="M400 488.889H444.444V533.333H400z"></path>
            <path d="M444.444 488.889H488.88800000000003V533.333H444.444z"></path>
            <path d="M488.889 488.889H533.333V533.333H488.889z"></path>
            <path d="M533.333 488.889H577.7769999999999V533.333H533.333z"></path>
            <path d="M577.778 488.889H622.222V533.333H577.778z"></path>
            <path d="M622.222 488.889H666.6659999999999V533.333H622.222z"></path>
            <path d="M666.667 488.889H711.111V533.333H666.667z"></path>
            <path d="M711.111 488.889H755.555V533.333H711.111z"></path>
            <path d="M755.556 488.889H800V533.333H755.556z"></path>
            <path d="M800 488.889H844.444V533.333H800z"></path>
            <path d="M0 533.333H44.444V577.7769999999999H0z"></path>
            <path d="M44.444 533.333H88.888V577.7769999999999H44.444z"></path>
            <path d="M88.889 533.333H133.333V577.7769999999999H88.889z"></path>
            <path d="M133.333 533.333H177.777V577.7769999999999H133.333z"></path>
            <path d="M177.778 533.333H222.22199999999998V577.7769999999999H177.778z"></path>
            <path d="M222.222 533.333H266.666V577.7769999999999H222.222z"></path>
            <path d="M266.667 533.333H311.111V577.7769999999999H266.667z"></path>
            <path d="M311.111 533.333H355.555V577.7769999999999H311.111z"></path>
            <path d="M355.556 533.333H400V577.7769999999999H355.556z"></path>
            <path d="M400 533.333H444.444V577.7769999999999H400z"></path>
            <path d="M444.444 533.333H488.88800000000003V577.7769999999999H444.444z"></path>
            <path d="M488.889 533.333H533.333V577.7769999999999H488.889z"></path>
            <path d="M533.333 533.333H577.7769999999999V577.7769999999999H533.333z"></path>
            <path d="M577.778 533.333H622.222V577.7769999999999H577.778z"></path>
            <path d="M622.222 533.333H666.6659999999999V577.7769999999999H622.222z"></path>
            <path d="M666.667 533.333H711.111V577.7769999999999H666.667z"></path>
            <path d="M711.111 533.333H755.555V577.7769999999999H711.111z"></path>
            <path d="M755.556 533.333H800V577.7769999999999H755.556z"></path>
            <path d="M800 533.333H844.444V577.7769999999999H800z"></path>
            <path d="M0 577.778H44.444V622.222H0z"></path>
            <path d="M44.444 577.778H88.888V622.222H44.444z"></path>
            <path d="M88.889 577.778H133.333V622.222H88.889z"></path>
            <path d="M133.333 577.778H177.777V622.222H133.333z"></path>
            <path d="M177.778 577.778H222.22199999999998V622.222H177.778z"></path>
            <path d="M222.222 577.778H266.666V622.222H222.222z"></path>
            <path d="M266.667 577.778H311.111V622.222H266.667z"></path>
            <path d="M311.111 577.778H355.555V622.222H311.111z"></path>
            <path d="M355.556 577.778H400V622.222H355.556z"></path>
            <path d="M400 577.778H444.444V622.222H400z"></path>
            <path d="M444.444 577.778H488.88800000000003V622.222H444.444z"></path>
            <path d="M488.889 577.778H533.333V622.222H488.889z"></path>
            <path d="M533.333 577.778H577.7769999999999V622.222H533.333z"></path>
            <path d="M577.778 577.778H622.222V622.222H577.778z"></path>
            <path d="M622.222 577.778H666.6659999999999V622.222H622.222z"></path>
            <path d="M666.667 577.778H711.111V622.222H666.667z"></path>
            <path d="M711.111 577.778H755.555V622.222H711.111z"></path>
            <path d="M755.556 577.778H800V622.222H755.556z"></path>
            <path d="M800 577.778H844.444V622.222H800z"></path>
            <path d="M0 622.222H44.444V666.6659999999999H0z"></path>
            <path d="M44.444 622.222H88.888V666.6659999999999H44.444z"></path>
            <path d="M88.889 622.222H133.333V666.6659999999999H88.889z"></path>
            <path d="M133.333 622.222H177.777V666.6659999999999H133.333z"></path>
            <path d="M177.778 622.222H222.22199999999998V666.6659999999999H177.778z"></path>
            <path d="M222.222 622.222H266.666V666.6659999999999H222.222z"></path>
            <path d="M266.667 622.222H311.111V666.6659999999999H266.667z"></path>
            <path d="M311.111 622.222H355.555V666.6659999999999H311.111z"></path>
            <path d="M355.556 622.222H400V666.6659999999999H355.556z"></path>
            <path d="M400 622.222H444.444V666.6659999999999H400z"></path>
            <path d="M444.444 622.222H488.88800000000003V666.6659999999999H444.444z"></path>
            <path d="M488.889 622.222H533.333V666.6659999999999H488.889z"></path>
            <path d="M533.333 622.222H577.7769999999999V666.6659999999999H533.333z"></path>
            <path d="M577.778 622.222H622.222V666.6659999999999H577.778z"></path>
            <path d="M622.222 622.222H666.6659999999999V666.6659999999999H622.222z"></path>
            <path d="M666.667 622.222H711.111V666.6659999999999H666.667z"></path>
            <path d="M711.111 622.222H755.555V666.6659999999999H711.111z"></path>
            <path d="M755.556 622.222H800V666.6659999999999H755.556z"></path>
            <path d="M800 622.222H844.444V666.6659999999999H800z"></path>
            <path d="M0 666.667H44.444V711.111H0z"></path>
            <path d="M44.444 666.667H88.888V711.111H44.444z"></path>
            <path d="M88.889 666.667H133.333V711.111H88.889z"></path>
            <path d="M133.333 666.667H177.777V711.111H133.333z"></path>
            <path d="M177.778 666.667H222.22199999999998V711.111H177.778z"></path>
            <path d="M222.222 666.667H266.666V711.111H222.222z"></path>
            <path d="M266.667 666.667H311.111V711.111H266.667z"></path>
            <path d="M311.111 666.667H355.555V711.111H311.111z"></path>
            <path d="M355.556 666.667H400V711.111H355.556z"></path>
            <path d="M400 666.667H444.444V711.111H400z"></path>
            <path d="M444.444 666.667H488.88800000000003V711.111H444.444z"></path>
            <path d="M488.889 666.667H533.333V711.111H488.889z"></path>
            <path d="M533.333 666.667H577.7769999999999V711.111H533.333z"></path>
            <path d="M577.778 666.667H622.222V711.111H577.778z"></path>
            <path d="M622.222 666.667H666.6659999999999V711.111H622.222z"></path>
            <path d="M666.667 666.667H711.111V711.111H666.667z"></path>
            <path d="M711.111 666.667H755.555V711.111H711.111z"></path>
            <path d="M755.556 666.667H800V711.111H755.556z"></path>
            <path d="M800 666.667H844.444V711.111H800z"></path>
            <path d="M0 711.111H44.444V755.555H0z"></path>
            <path d="M44.444 711.111H88.888V755.555H44.444z"></path>
            <path d="M88.889 711.111H133.333V755.555H88.889z"></path>
            <path d="M133.333 711.111H177.777V755.555H133.333z"></path>
            <path d="M177.778 711.111H222.22199999999998V755.555H177.778z"></path>
            <path d="M222.222 711.111H266.666V755.555H222.222z"></path>
            <path d="M266.667 711.111H311.111V755.555H266.667z"></path>
            <path d="M311.111 711.111H355.555V755.555H311.111z"></path>
            <path d="M355.556 711.111H400V755.555H355.556z"></path>
            <path d="M400 711.111H444.444V755.555H400z"></path>
            <path d="M444.444 711.111H488.88800000000003V755.555H444.444z"></path>
            <path d="M488.889 711.111H533.333V755.555H488.889z"></path>
            <path d="M533.333 711.111H577.7769999999999V755.555H533.333z"></path>
            <path d="M577.778 711.111H622.222V755.555H577.778z"></path>
            <path d="M622.222 711.111H666.6659999999999V755.555H622.222z"></path>
            <path d="M666.667 711.111H711.111V755.555H666.667z"></path>
            <path d="M711.111 711.111H755.555V755.555H711.111z"></path>
            <path d="M755.556 711.111H800V755.555H755.556z"></path>
            <path d="M800 711.111H844.444V755.555H800z"></path>
            <path d="M0 755.556H44.444V800H0z"></path>
            <path d="M44.444 755.556H88.888V800H44.444z"></path>
            <path d="M88.889 755.556H133.333V800H88.889z"></path>
            <path d="M133.333 755.556H177.777V800H133.333z"></path>
            <path d="M177.778 755.556H222.22199999999998V800H177.778z"></path>
            <path d="M222.222 755.556H266.666V800H222.222z"></path>
            <path d="M266.667 755.556H311.111V800H266.667z"></path>
            <path d="M311.111 755.556H355.555V800H311.111z"></path>
            <path d="M355.556 755.556H400V800H355.556z"></path>
            <path d="M400 755.556H444.444V800H400z"></path>
            <path d="M444.444 755.556H488.88800000000003V800H444.444z"></path>
            <path d="M488.889 755.556H533.333V800H488.889z"></path>
            <path d="M533.333 755.556H577.7769999999999V800H533.333z"></path>
            <path d="M577.778 755.556H622.222V800H577.778z"></path>
            <path d="M622.222 755.556H666.6659999999999V800H622.222z"></path>
            <path d="M666.667 755.556H711.111V800H666.667z"></path>
            <path d="M711.111 755.556H755.555V800H711.111z"></path>
            <path d="M755.556 755.556H800V800H755.556z"></path>
            <path d="M800 755.556H844.444V800H800z"></path>
            <path d="M0 800H44.444V844.444H0z"></path>
            <path d="M44.444 800H88.888V844.444H44.444z"></path>
            <path d="M88.889 800H133.333V844.444H88.889z"></path>
            <path d="M133.333 800H177.777V844.444H133.333z"></path>
            <path d="M177.778 800H222.22199999999998V844.444H177.778z"></path>
            <path d="M222.222 800H266.666V844.444H222.222z"></path>
            <path d="M266.667 800H311.111V844.444H266.667z"></path>
            <path d="M311.111 800H355.555V844.444H311.111z"></path>
            <path d="M355.556 800H400V844.444H355.556z"></path>
            <path d="M400 800H444.444V844.444H400z"></path>
            <path d="M444.444 800H488.88800000000003V844.444H444.444z"></path>
            <path d="M488.889 800H533.333V844.444H488.889z"></path>
            <path d="M533.333 800H577.7769999999999V844.444H533.333z"></path>
            <path d="M577.778 800H622.222V844.444H577.778z"></path>
            <path d="M622.222 800H666.6659999999999V844.444H622.222z"></path>
            <path d="M666.667 800H711.111V844.444H666.667z"></path>
            <path d="M711.111 800H755.555V844.444H711.111z"></path>
            <path d="M755.556 800H800V844.444H755.556z"></path>
            <path d="M800 800H844.444V844.444H800z"></path>
          </g>
        </svg>
      </div>

<h1 className='text-4xl font-visita-bold mb-10 mt-16 capitalize' >{company_name.replace(/[-]/g," ")}</h1>

     <div className="h-16 w-full flex items-center justify-center  z-50">

         <button onClick={onOpen} className="px-6 py-2 mr-3 hover:bg-red-500 hover:text-white transition-colors bg-white border-2 border-red-500 text-red-500 rounded-3xl  font-visita-bold"><i class="fa-solid mr-1 fa-circle-xmark"></i> Close Card</button>

        <button onClick={()=> navigate('/manage/card/' + company_name + '/edit')} className="px-6 py-2 bg-blue-600 border-2 border-blue-600 text-white rounded-3xl  font-visita-bold"><i class="fa-regular fa-pen-to-square mr-1"></i> Edit Card</button>
    </div>

    <div className="w-full  mt-10 flex flex-wrap items-center justify-center z-50">

        <div className="h-44 w-72 bg-white rounded-3xl mr-6 border flex flex-col items-center justify-center">
            <h6 className='text-xl font-visita-medium' >Total Views</h6>
            <h1 className='text-5xl font-visita-bold mt-4 text-blue-600' >{cardDatas && cardDatas.views}</h1>
        </div>

        <div className="h-44 w-72 bg-white rounded-3xl mr-6 lg:mt-0 mt-4 border flex flex-col items-center justify-center">
            <h6 className='text-xl font-visita-medium' >Total Feedbaks</h6>
            <h1 className='text-5xl font-visita-bold mt-4 text-blue-600' >{cardDatas.feedbacks && cardDatas.feedbacks.length}</h1>
        </div>

    </div>

    {

franchiseeDatas.length != 0 ?
      
      <div className=" w-[576px]  mt-5 flex flex-col items-center justify-center z-50">

    <div className="h-16 w-full bg-white rounded-3xl mt-4 border flex  items-center justify-center">
        <h6 className='text-xl font-visita-medium' >Created Via</h6>
        <h1 className='text-xl font-visita-bold ml-2  text-blue-600' >{franchiseeDatas && franchiseeDatas.franchisee_name}</h1>
    </div>

    <div className="h-16 w-full bg-white rounded-3xl mt-4 border flex  items-center justify-center">
        <h6 className='text-xl font-visita-medium' >Contact {franchiseeDatas && franchiseeDatas.franchisee_name}</h6>
        <h1 className='text-xl font-visita-bold ml-2  text-blue-600' >+91 {franchiseeDatas && franchiseeDatas.phone_no}</h1>
    </div>

    </div>
  :''  
  }

<div className="w-full h-10 bg-purple-50 fixed bottom-10  lg:flex hidden items-center justify-center">
            <h1 className='font-visita-medium' >Company Name - <span className='text-[#6635E3]' >{cardDatas && cardDatas.company_name}</span> <span className="mx-4">|</span>  For any help <span onClick={()=> window.location.href = '/support'} className="cursor-pointer text-[#6635E3] hover:underline">contact visita</span> with this company name</h1>
       </div>
    
   </div>
  )
}

export default ManageCard