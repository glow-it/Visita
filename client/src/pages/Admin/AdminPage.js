import React, { useEffect, useState } from 'react'
import { Tabs, TabList, TabPanels, Tab, TabPanel, Tooltip, useToast } from '@chakra-ui/react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import { Toast } from '../../miniComponents/Toast'

function AdminPage() {

    let [createdCards,setCreatedCards] = useState([])
    let [franchisees,setFranchisees] = useState([])
    let [cardSearch,setCardSearch] = useState("")
    let [franchiseeSearch,setFranchiseeSearch] = useState("")
    let [index,setIndex] = useState(0)

    let params = useParams()
    

useEffect(()=> {

    if(params.type == 'pay-salary'){
        setIndex(3)
    }

    document.querySelectorAll('header').forEach((elem)=> {
        elem.style.display = 'none'
    })


    axios.get('/get-all-created-cards').then((response)=> {
        setCreatedCards(response.data);
        
    })
    
    axios.get('/get-all-franchisees').then((response)=> {
        setFranchisees(response.data);
    })



},[])

let navigate = useNavigate()

let profit_for_franchisee = 300
let profit_for_company = 299
let card_price = 599
let price_for_create_franchisee = 999

let total_expence = 0;
let total_franchisees = franchisees && franchisees.length
let total_cards_created = createdCards && createdCards.length


let cards_created_via_franchisee = 0;



let income_via_franchisee = 0;


franchisees && franchisees.map((data)=> {
    total_expence += parseInt(data.created_cards_total) * profit_for_franchisee
})
createdCards && createdCards.filter((data)=> {
    if(data.franchisee_email != "no franchisee") {
        income_via_franchisee += card_price
    }
})
createdCards && createdCards.filter((data)=> {
    if(data.franchisee_email != "no franchisee") {
        cards_created_via_franchisee += 1
    }
})



let income_via_normal_card_creation = (createdCards && createdCards.length - cards_created_via_franchisee) * card_price

let total_earnings = (income_via_franchisee + income_via_normal_card_creation) + (franchisees && franchisees.length * price_for_create_franchisee)

let total_card_earnings = income_via_franchisee + income_via_normal_card_creation

let earnings_from_franchisee_creation = total_franchisees * price_for_create_franchisee


let toast = useToast()

function handleSalaryPayedClick(franchisee_email){
    axios.post('/salary-payed/' + franchisee_email).then((response)=> {
        if(response.status){
            window.location.href = '/admin/pay-salary'
        }else{
            Toast({
                status:'error',
                title: response.data.err,
                postition: 'top',
                toast
            })
        }
        
    })
}






  return (
    <div>



        <Tabs index={index} className='mt-6 font-visita-bold' isFitted variant='solid-rounded' colorScheme='purple'>
  <TabList>
    <Tab onClick={()=> setIndex(0)} >Overview</Tab>
    <Tab onClick={()=> setIndex(1)} >Created Cards</Tab>
    <Tab onClick={()=> setIndex(2)} >Franchisees</Tab>
    <Tab onClick={()=> setIndex(3)} >Pay Salary</Tab>
  </TabList>



  <TabPanels>


    

    <TabPanel>

        <div className="w-full py-6  flex items-center flex-wrap justify-center px-3">

            <div className="w-[300px] h-[200px] border border-purple-500 rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Income</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >₹{(total_earnings-total_expence).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            </div>
            <div className="w-[300px] h-[200px] border rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Total Earnings</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >₹{total_earnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            </div>
            <div className="w-[300px] h-[200px] border rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Earnings From Card</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >₹{total_card_earnings.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            </div>
            <div className="w-[300px] h-[200px] border rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Earnings Franchisee Creation</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >₹{earnings_from_franchisee_creation.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            </div>
            <div className="w-[300px] h-[200px] border rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Total Expences</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >₹{total_expence.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            </div>
            <div className="w-[300px] h-[200px] border rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Income Via Franchisee</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >₹{income_via_franchisee.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</h1>
            </div>
            <div className="w-[300px] h-[200px] border rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Total Franchisees</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >{total_franchisees}</h1>
            </div>
            <div className="w-[300px] h-[200px] border rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Total Cards Created</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >{total_cards_created}</h1>
            </div>
            <div className="w-[300px] h-[200px] border rounded-3xl mx-4 my-4 flex flex-col items-center justify-center">
                <h1 className='-mt-6' >Cards Created Via Franchisee</h1>
                <h1 className='text-5xl text-purple-600 mt-4' >{cards_created_via_franchisee}</h1>
            </div>

        </div>
     
    </TabPanel>

    <TabPanel>

    


    <form class="flex items-center mt-6">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 :text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input onChange={(e)=> setCardSearch(e.target.value)}  id="simple-search" class="bg-gray-50 border border-gray-profit_for_franchisee text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  :bg-gray-700 :border-gray-card_price :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Search By Company Name" required />
    </div>
    
</form>

        <div className="w-full h-screen flex flex-col items-center  overflow-scroll">

            {
                createdCards && createdCards.filter((data)=> {
                    let comp_name = data.comp_name.replace(/[-]/g," ")
                    return comp_name.includes(cardSearch)
                }).map((data,index)=> {
return(
    <div className="w-full pl-12 min-h-[64px] border border-purple-100 rounded-xl shadow-sm shadow-black/5 flex items-center mt-4">

    <h1 className='text-lg' >{index + 1}. <span className='ml-4 text-[#6635E3] capitalize' >{data.comp_name}</span></h1>
    <div className="flex-1  h-full  flex justify-end items-center pr-12">
    
    <h1 onClick={()=> window.open('/' + data.comp_name)} className=' flex items-center justify-center text-2xl mr-4 cursor-pointer -rotate-45 text-[#6635E3]' ><ion-icon name="arrow-forward-circle"></ion-icon></h1>
    
        <h1 className='mr-4' >+91{data.phone_no}</h1>

        {
            data.franchisee_email != "no franchisee" ?
<Tooltip bg='white' rounded='full' className='text-white font-visita-medium' label={franchisees && franchisees.map((franchisee_data)=> {
    let franchisee_id;
    if(franchisee_data.email == data.franchisee_email){
        franchisee_id = franchisee_data.franchisee_id
    }
    return franchisee_id
})} aria-label='A tooltip'>
        <span class="cursor-pointer bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full :bg-purple-200 :text-purple-800 ml-4">Franchisee</span>
        </Tooltip>
        : 
       
                <span class="cursor-pointer bg-purple-100 text-purple-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full :bg-purple-200 :text-purple-800 ml-4">No Franchisee</span>
        }
    
        
    
       
       
    </div>
    
    </div>
)
                })
            }

       

        </div>


   


    </TabPanel>

    <TabPanel>

    <form class="flex items-center mt-6">   
    <label for="simple-search" class="sr-only">Search</label>
    <div class="relative w-full">
        <div class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
            <svg aria-hidden="true" class="w-5 h-5 text-gray-500 :text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg>
        </div>
        <input onChange={(e)=> setFranchiseeSearch(e.target.value)}  id="simple-search" class="bg-gray-50 border border-gray-profit_for_franchisee text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  :bg-gray-700 :border-gray-card_price :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500" placeholder="Search By Franchisee Id" required />
    </div>
   
</form>

<div className="w-full h-screen flex flex-col items-center  overflow-scroll">

    {/* ----------------------------------------------------------------- */}

    {
        franchisees && franchisees.filter((data)=> {
            if(franchiseeSearch != ""){
                return data.franchisee_id == parseInt(franchiseeSearch)
            }else{
                return data
            }
            
        }).map((data,index)=> {
            return(

<div className="w-full pl-12 min-h-[64px] border border-purple-100 rounded-xl shadow-sm shadow-black/5 flex items-center mt-4">

<h1 className='text-lg' >{index + 1}. <span className='ml-4 text-[#6635E3] capitalize' >{data.franchisee_name}</span></h1>
<div className="flex-1  h-full  flex justify-end items-center pr-12">



<h1>+91{data.phone_no}</h1>
<h1 className='ml-4' >{data.email}</h1>
<h1 className='ml-4' >{data.franchisee_id}</h1>




<h1 className="px-3 ml-4 py-1 text-sm rounded-full border border-purple-600">
    Cards Created

    <span class="ml-3 bg-blue-100 text-blue-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 rounded-full :bg-blue-200 :text-blue-800">
  
  {data.created_cards_total}
</span>

</h1>





</div>

</div>

            )
        })
    }




{/* ------------------------------------------------------------- */}



</div>





</TabPanel>

<TabPanel>


<div className="w-full py-6  flex items-center flex-wrap justify-center px-3">



    {
        franchisees && franchisees.filter((data)=> {
            return data.created_cards_thismonth != 0
            
        }).map((data,index)=> {
            
            return (

                

<div className={`w-[350px] relative h-[350px] border ${index == 0 ? 'border-purple-600':''}  rounded-3xl mx-4 my-4 flex flex-col items-center justify-center`}>





<h1 className='capitalize text-2xl' >{data.franchisee_name}</h1>
<h1 className='mt-1 ' >{data.franchisee_id}</h1>


<span class="cursor-pointer bg-purple-100 text-purple-800 text-xl font-medium  px-2.5 py-0.5 rounded-full :bg-purple-200 :text-purple-800 mt-6">{data.upi_id}</span>


<h1 className='text-4xl text-purple-600 mt-4' >₹{data.created_cards_thismonth * profit_for_franchisee}</h1>

<button onClick={()=> handleSalaryPayedClick(data.email)}  class="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-profit_for_franchisee font-medium rounded-full text-xl px-5 mt-6 py-2.5 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Salary Payed</button>

</div>
            )
        })
    }



</div>


</TabPanel>


  </TabPanels>
</Tabs>
    </div>
  )
}

export default AdminPage