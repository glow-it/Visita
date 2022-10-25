import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'

function ManageFranchisee() {

    let [franchiseeData,setFranchiseeData] = useState([])

    let [createdCards,setCreatedCards] = useState([])
    let [createdCardsThisMonth,setCreatedCardsThisMonth] = useState([])
    let [createdCardsToday,setCreatedCardsToday] = useState([])

    let franchisee_profit = 300 //This Is The Profit Of Franchisee For Each Cards Created

    let earnings_this_month = createdCardsThisMonth && (createdCardsThisMonth.length * franchisee_profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let earnings_this_today = createdCardsToday && (createdCardsToday.length * franchisee_profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let total_earnings = createdCards && (createdCards.length * franchisee_profit).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    let cards_created_this_month = createdCardsThisMonth.length
    let cards_created_today = createdCardsToday.length
    let cards_created = createdCards.length


    let toast = useToast()
    let navigate = useNavigate()

    useEffect(()=> {
        document.querySelectorAll('header').forEach((elem)=> {
            elem.style.display = 'none'
        })
        axios.get('/get-franchisee-datas').then((res)=> {
            if(res.status){
                if(res.data.isFranchiseeLogined == "true"){
                    
                    setFranchiseeData(res.data.franchisee_data);



                    axios.get('/get-all-created-cards').then((response)=> {
                        let cards = response.data
                        
                        let array = []
                        cards.map((data)=> {
                            if(data.franchisee_email == res.data.franchisee_data.email){
                            array.push(data)
                           
                        }
                        setCreatedCards(array)
                            
                        })

                    
                        
            
            
            
                    })




                }else{
                    navigate('/franchisee/login')
                }
            }else{
                toast({
                    title: res.data.err,
                    status: 'error',
                    position: 'top-right'
                })
                navigate('/')
            }
        })

        

    },[])




    useEffect(()=> {



        
        let array_1 = [];

        createdCards && createdCards.map((data)=> {
            // Calculate How Much Days Ago Created This Card
            var date1, date2;
            //define two date object variables with dates inside it
            date1 = data.created_at;
            date2 = new Date();
     
            //calculate time difference
            var time_difference = date2.getTime() - parseInt(date1);
     
            //calculate days difference by dividing total milliseconds in a day
            var days_difference = time_difference / (1000 * 60 * 60 * 24);
     
            let days = Math.trunc(days_difference)
            if(days < 1){
                array_1.push(data)
            }
            setCreatedCardsToday(array_1)
        })
     
     
        let array_2 = [];
         createdCards && createdCards.map((data)=> {
            // Calculate How Much Days Ago Created This Card
            var date1, date2;
            //define two date object variables with dates inside it
            date1 = data.created_at;
            date2 = new Date();
     
            //calculate time difference
            var time_difference = date2.getTime() - parseInt(date1);
     
            //calculate days difference by dividing total milliseconds in a day
            var days_difference = time_difference / (1000 * 60 * 60 * 24);
     
            let days = Math.trunc(days_difference)
            if(days < 31){
                array_2.push(data)
            }
             setCreatedCardsThisMonth(array_2)
         })

    },[createdCards])


    console.log(franchiseeData && franchiseeData);




   



  return (
    <div className='flex flex-col' >
       <div className="w-full h-16  flex items-center justify-center border-b">
        <img onClick={()=> window.location.href = '/'} className='cursor-pointer h-12 left-12 absolute' src=" https://i.postimg.cc/ZKnK7rC2/visitalogo.png />" />
        <h1 className='font-visita-bold absolute left-28 text-2xl' >Franchisee</h1>
        <h1 className='font-visita-bold text-3xl text-[#6635E3] capitalize' >{franchiseeData && franchiseeData.franchisee_name}</h1>

        <h1 onClick={()=> navigate('/create',{state:{franchisee:true,franchisee_email:franchiseeData.email}})} className='font-visita-bold absolute flex right-28 text-white bg-[#6635E3] px-6 py-2 rounded-full hover:bg-indigo-700 cursor-pointer' ><span className='flex items-center justify-center mr-1' ><ion-icon name="add"></ion-icon></span> Create Card</h1>

       </div>
       <div className="w-full flex justify-center items-center">
       <div className=" h-10 bg-purple-50 fixed bottom-6  px-12 rounded-full  flex items-center justify-center">
            <h1 className='font-visita-medium' >Franchisee Id - <span className='text-[#6635E3]' >{franchiseeData && franchiseeData.franchisee_id}</span> <span className="mx-4">|</span>  For any help <span onClick={()=> window.location.href = '/support'} className="cursor-pointer text-[#6635E3] hover:underline">contact visita</span> with this franchisee id</h1>
       </div>
       </div>

       <div className="w-full font-visita-bold mt-6">
       <Tabs isFitted variant='line' colorScheme="purple">
  <TabList mb='1em'>
    <Tab>This Month</Tab>
    <Tab>Today</Tab>
    <Tab>Total</Tab>
  </TabList>
  <TabPanels>

    <TabPanel>
        <div className="w-full flex flex-col">
            <div className="w-full  flex-wrap flex items-center justify-center">
                <div className="w-[320px] h-56 border flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                    <h2 className='-mt-6' >My Earnings</h2>
                    <h1  className=' text-5xl mt-3 text-[#6635E3]' >₹{earnings_this_month}</h1>
                </div>
                <div className="w-[320px] h-56 border flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                <h2 className='-mt-6' >Cards Created</h2>
                    <h1  className=' text-5xl mt-3 text-[#6635E3]' >{cards_created_this_month}</h1>
                </div>
            </div>
            <div className="w-full h-[290px] overflow-scroll flex flex-col items-center mt-6 border-t border-purple-600">

                {
                    createdCardsThisMonth && createdCardsThisMonth.map((data,index)=> {
                        return(
                            <div className="w-full pl-12 min-h-[64px] border border-purple-100 rounded-xl shadow-sm shadow-black/5 flex items-center mt-4">

                    <h1 className='text-lg' >{index + 1}. <span className='ml-4 text-[#6635E3] capitalize' >{data.comp_name}</span></h1>
                    <div className="flex-1  h-full  flex justify-end items-center pr-12">

                    <h1 onClick={()=> navigate('/' + data.comp_name)} className=' flex items-center justify-center text-2xl mr-4 cursor-pointer -rotate-45 text-[#6635E3]' ><ion-icon name="arrow-forward-circle"></ion-icon></h1>

                        <h1>+91{data.phone_no}</h1>
                       
                        <h1 className='text-slate-300 ml-6' >{data.created_date}</h1>
                    </div>

                </div>
                        )
                    })
                }


            </div>
        </div>
    </TabPanel>


    <TabPanel>
        <div className="w-full flex flex-col">
            <div className="w-full  flex-wrap flex items-center justify-center">
                <div className="w-[320px] h-56 border flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                    <h2 className='-mt-6' >My Earnings</h2>
                    <h1 className='text-5xl mt-3 text-[#6635E3]' >₹{earnings_this_today}</h1>
                </div>
                <div className="w-[320px] h-56 border flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                <h2 className='-mt-6' >Cards Created</h2>
                    <h1 className='text-5xl mt-3 text-[#6635E3]' >{cards_created_today}</h1>
                </div>
            </div>
            <div className="w-full h-[290px] overflow-scroll flex flex-col items-center mt-6 border-t border-purple-600">

                {
                    createdCardsToday && createdCardsToday.map((data,index)=> {
                        return(
                            <div className="w-full pl-12 min-h-[64px] border border-purple-100 rounded-xl shadow-sm shadow-black/5 flex items-center mt-4">

                    <h1 className='text-lg' >{index + 1}. <span className='ml-4 text-[#6635E3] capitalize' >{data.comp_name}</span></h1>
                    <div className="flex-1  h-full  flex justify-end items-center pr-12">

                    <h1 onClick={()=> navigate('/' + data.comp_name)} className=' flex items-center justify-center text-2xl mr-4 cursor-pointer -rotate-45 text-[#6635E3]' ><ion-icon name="arrow-forward-circle"></ion-icon></h1>

                        <h1>+91{data.phone_no}</h1>
                       
                        <h1 className='text-slate-300 ml-6' >{data.created_date}</h1>
                    </div>

                </div>
                        )
                    })
                }


            </div>
        </div>
    </TabPanel>


    <TabPanel>
        <div className="w-full flex flex-col">
            <div className="w-full  flex-wrap flex items-center justify-center">
                <div className="w-[320px] h-56 border flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                    <h2 className='-mt-6' >My Earnings</h2>
                    <h1 className='text-5xl mt-3 text-[#6635E3]' >₹{total_earnings}</h1>
                </div>
                <div className="w-[320px] h-56 border flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                <h2 className='-mt-6' >Cards Created</h2>
                    <h1 className='text-5xl mt-3 text-[#6635E3]' >{cards_created}</h1>
                </div>
            </div>
            <div className="w-full h-[290px] overflow-scroll flex flex-col items-center mt-6 border-t border-purple-600">

                {
                    createdCards && createdCards.map((data,index)=> {
                        return(
                            <div className="w-full pl-12 min-h-[64px] border border-purple-100 rounded-xl shadow-sm shadow-black/5 flex items-center mt-4">

                    <h1 className='text-lg' >{index + 1}. <span className='ml-4 text-[#6635E3] capitalize' >{data.comp_name}</span></h1>
                    <div className="flex-1  h-full  flex justify-end items-center pr-12">

                    <h1 onClick={()=> navigate('/' + data.comp_name)} className=' flex items-center justify-center text-2xl mr-4 cursor-pointer -rotate-45 text-[#6635E3]' ><ion-icon name="arrow-forward-circle"></ion-icon></h1>

                        <h1>+91{data.phone_no}</h1>
                       
                        <h1 className='text-slate-300 ml-6' >{data.created_date}</h1>
                    </div>

                </div>
                        )
                    })
                }


            </div>
        </div>
    </TabPanel>


    
  </TabPanels>
</Tabs>
       </div>

    </div>
  )
}

export default ManageFranchisee