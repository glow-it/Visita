
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, ButtonGroup } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'


function FranchiseeRegister() {

  let navigate = useNavigate()
  let [loading,setLoading] = useState(false)
  let [loadingText,setLoadingText] = useState('Processing Payment')

useEffect(()=> {
  document.querySelectorAll('header').forEach((elem)=> {
    elem.style.display = 'none'
  })
},[])

let toast = useToast()

// When Click On Franchisee Register Button
function franchiseeRegisterClick(button){
  setLoading(true)
  axios.post('/create-franchisee-payment').then((response)=> {
    if(response.data.status){
      setLoading(false)

      var options = {
        key: 'rzp_live_kucmC1FpLUFMBr', // Enter the Key ID generated from the Dashboard
        amount: 99900, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
        currency: "INR",
        name: "Visita | Digital Visiting Card",
        description: "Payment For Register Franchisee",
        image: "https://i.postimg.cc/ZKnK7rC2/visitalogo.png",
        order_id: response.data.payment_data.id,
        handler: function (response){
          setLoadingText('Registering Franchisee')
          setLoading(true)
          let res_obj = {
            payment_id: response.razorpay_payment_id,
            subscription_id: response.razorpay_subscription_id,
            signature: response.razorpay_signature,
          };
          axios({
            method: "post",
            url: "/verify-payment",
            data: res_obj,
          }).then((response) => {
            if (response) {
              toast({
                title: 'Successfully Registered',
                position: 'top-right',
                status: 'success'
              })
              document.getElementById('franchisee_register_form').submit()
            }else{
              setLoading(false)
              toast({
                title: 'We Have Troubling To Register Franchisee',
                description: 'Try again later!',
                position: 'top-right',
                status: 'error'
              })
            }
          })
      },
        theme: {
          color: "#6733E4",
        },
        prefill: {
            name: document.getElementById('franchisee_name').value,
            email: document.getElementById('franchisee_email').value,
            contact: "+91" + document.getElementById('franchisee_phone_no').value
        }
    };
   
    var rzp1 = new window.Razorpay(options);



    rzp1.open()


    }else{
      toast({
        title: 'We Have Troubling To Register Franchisee',
        description: 'Try again later!',
        position: 'top-right',
        status: 'error'
      })
    }
  })
}

  return (
<div>


    <div className="flex min-h-full items-center  justify-center lg:mt-24 mt-16 px-4 sm:px-6 lg:px-8">




    <div className="w-full max-w-md space-y-8 z-50">
      <div>
        <img
          className="mx-auto h-12 w-auto"
          src="https://i.postimg.cc/xdZpZScW/visitalogo.png"
          alt="Your Company"
        />
        <h2 className="mt-6 text-center lg:text-4xl text-3xl font-visita-bold tracking-tight text-gray-900">
        Franchisee Register
        </h2>
       
      </div>
      <form id='franchisee_register_form' className="mt-8 space-y-6" action="/franchisee/register" method="POST">
       
        <div className="-space-y-px rounded-md shadow-sm">
          <div>
            <label  className="sr-only">
              Franchisee Name
            </label>
            <input
             
              name="franchisee_name"
              autoComplete="off"
              required
              type={"text"}
              
              id='franchisee_name'
              className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
              placeholder="Enter franchisee name"
            />
          </div>
          <div>
            <label className="sr-only">
              Phone Number
            </label>
            <input
              
              name="phone_no"
              id='franchisee_phone_no'
              autoComplete="off"
              required
              type={"tel"}
              
              className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
              placeholder="Enter phone no"
            />
          </div>

          <div>
            <label className="sr-only">
              UPI ID
            </label>
            <input
              
              name="upi_id"
              id='franchisee_upi_id'
              autoComplete="off"
              required
              type={"tel"}
              
              className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
              placeholder="Enter Upi Id"
            />
          </div>

          <div>
            <label className="sr-only">
              Email
            </label>
            <input
              
              name="email"
              id='franchisee_email'
              autoComplete="off"
              required
              type={"email"}
              
              className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
              placeholder="Enter email"
            />
          </div>

          <div>
            <label className="sr-only">
              Password
            </label>
            <input
              
              name="password"
              
              autoComplete="off"
              required
              type={"password"}
              id='franchisee_password'
              className="relative block transition-all franch-register-inputs font-visita-medium w-full appearance-none rounded-full border border-gray-300 px-6 mt-3 py-3 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-lg"
              placeholder="Enter password"
            />
          </div>

        </div>

        <div>
        <Button
        onClick={(e)=> {franchiseeRegisterClick(e)}}
        
        isLoading={loading} loadingText={loadingText} className='font-visita-bold' rounded='full' _hover={{backgroundColor: 'rgb(66 56 157 / 1)'}} backgroundColor='rgb(88 80 236 / 1)' style={{padding: '25px 60px',width: '100%'}} colorScheme='blue'>Pay ₹999</Button>
         
        </div>
        <div className="w-full flex justify-center items-center">
        <p onClick={()=> navigate('/franchisee/login')} className='font-visita-medium' >already have a franchisee? <span className='ml-1 text-blue-500 cursor-pointer hover:underline' >Login now</span></p>
        </div>
      </form>
    </div>
  </div>
  </div>
  )
}

export default FranchiseeRegister