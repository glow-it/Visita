import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Cookies from 'js-cookie';
import { Toast } from '../miniComponents/Toast'
import apiKeys from '../Api/apiKeys'
import Loading from '../miniComponents/Loading'
import capitalize from '../Tools/capitalize'
import installPwaApp from '../Tools/InstallPwaApp'
import reactManifest from "react-manifest";

function ManageFranchisee() {



    let [franchiseeData,setFranchiseeData] = useState([])

    let [createdCards,setCreatedCards] = useState([])
    let [createdCardsThisMonth,setCreatedCardsThisMonth] = useState([])
    let [createdCardsToday,setCreatedCardsToday] = useState([])
    let [isLoading,setIsLoading] = useState([])

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
        
        


      },[])

    useEffect(()=> {

        localStorage.setItem('franchisee_top_information_closed',false)

        document.querySelector('body').style.padding = '0 0 0 0'
        document.querySelectorAll('header').forEach((elem)=> {
            elem.style.display = 'none'
        })
        let franchisee_email = localStorage.getItem("franchisee_email")
        axios.get(`${apiKeys.server_url}/get-franchisee-datas/${franchisee_email}`).then((res)=> {
            
            if(res.status){
                if(franchisee_email){
                    
                    setFranchiseeData(res.data.franchisee_data);
                    setIsLoading(false)

                     // Setting Favicon
         var link = document.querySelector("link[rel*='icon']") || document.createElement('link');
         link.type = 'image/x-icon';
         link.rel = 'shortcut icon';
         link.href = 'https://i.postimg.cc/1zGKb58x/franchiseelogo.png';
         document.getElementsByTagName('head')[0].appendChild(link);


 
            document.title = capitalize(res.data.franchisee_data.franchisee_name) + ' - Franchisee'

            // Set Manifest Dynamically

            reactManifest.update({
                name: capitalize(res.data.franchisee_data.franchisee_name),
                short_name: capitalize(res.data.franchisee_data.franchisee_name),
                description: 'Visita Franchisee',
                start_url: `https://www.visitasmart.com/franchisee`,
                scope: `https://www.visitasmart.com/franchisee`,
                background_color: "#fff",
                theme_color: "#fff",
                display: "standalone",
                icons: [
                  {
                    src: 'https://i.postimg.cc/1zGKb58x/franchiseelogo.png',
                    sizes: "256x256",
                    type: "image/png",
                  },
                ],
              },"#my-manifest-placeholder")


         



                    axios.get(`${apiKeys.server_url}/get-all-created-cards`).then((response)=> {
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
                Toast({
                    status:'error',
                    title: res.data.err,
                    postition: 'top',
                    toast
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





 // Configure Install PWA App
 let installButton = document.getElementById("app-install-button-franchisee");
 let deferredPrompt;
 installPwaApp(installButton,deferredPrompt,(response)=> {
    if(response){
        localStorage.setItem("isInstalledFranchiseeApp",true)
    }
 })

   



  return (
    <div >

        <Loading isLoading={isLoading} />

   

{/* Top Information */}

        <div className='flex flex-col w-full h-screen' >



       <div className="w-full lg:min-h-[100px] min-h-[130px]  flex lg:flex-row flex-col items-center justify-center ">
        <img onClick={()=> window.location.href = '/'} className='lg:block hidden cursor-pointer h-12 left-12 absolute' src=" https://i.postimg.cc/ZKnK7rC2/visitalogo.png />" />
        <h1 className='font-bold text-3xl text-indigo-600 capitalize' >{franchiseeData && franchiseeData.franchisee_name}</h1>

        <h1 onClick={()=> navigate('/pricing',{state:{franchisee:true,franchisee_email:franchiseeData.email}})} className='font-bold lg:absolute lg:mt-0 mt-4 flex right-28 text-white bg-indigo-600 px-6 py-2 rounded-full hover:bg-indigo-700 cursor-pointer' ><span className='flex items-center justify-center mr-1' ><ion-icon name="add"></ion-icon></span> Create website</h1>

       </div>
      
       <div className="w-full font-bold mt-6">
       <Tabs defaultIndex={1} isFitted variant='line' colorScheme="purple">
  <TabList mb='1em'>
    <Tab>This month</Tab>
    <Tab>Today</Tab>
    <Tab>Total</Tab>
  </TabList>
  <TabPanels>

    <TabPanel>
        <div className="w-full flex flex-col">
            <div className="w-full  flex-wrap flex items-center justify-center">
                <div className="w-[320px] h-56 bg-indigo-50  text-indigo-800 flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                    <h2 className='-mt-6' >My earnings</h2>
                    <h1  className=' text-7xl mt-3 text-indigo-800' >₹{earnings_this_month}</h1>
                </div>
                <div className="w-[320px] h-56 bg-indigo-50  text-indigo-800 flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                <h2 className='-mt-6' >Websites created</h2>
                    <h1  className=' text-7xl mt-3 text-indigo-800' >{cards_created_this_month}</h1>
                </div>
            </div>
            <div className="w-full h-[330px] overflow-scroll flex flex-col lg:items-center mt-6 border-indigo-600">

                {
                    createdCardsThisMonth && createdCardsThisMonth.length == 0 ?
                    <h1 className='text-2xl mt-16 text-indigo-400 font-medium' >No websites created this month</h1>
                    : ''
                }

                {
                    createdCardsThisMonth && createdCardsThisMonth.map((data,index)=> {
                        return(
                            <div className="lg:min-w-[100%] min-w-[200%] pl-12 min-h-[64px] border border-indigo-100 rounded-xl shadow-sm shadow-black/5 flex items-center mt-4">

                    <h1 className='text-lg' >{index + 1}. <span className='ml-4 text-indigo-600 capitalize' >{data.comp_name}</span></h1>
                    <div className="flex-1  h-full  flex justify-end items-center pr-12">

                    <h1 onClick={()=> navigate('/' + data.comp_name)} className=' flex items-center justify-center text-2xl mr-4 cursor-pointer -rotate-45 text-indigo-600' ><ion-icon name="arrow-forward-circle"></ion-icon></h1>

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
                <div className="w-[320px] h-56 bg-indigo-50  text-indigo-800 flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                    <h2 className='-mt-6' >My earnings</h2>
                    <h1 className='text-7xl mt-3 text-indigo-800' >₹{earnings_this_today}</h1>
                </div>
                <div className="w-[320px] h-56 bg-indigo-50  text-indigo-800 flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                <h2 className='-mt-6' >Websites created</h2>
                    <h1 className='text-7xl mt-3 text-indigo-800' >{cards_created_today}</h1>
                </div>
            </div>
            <div className="w-full h-[330px] overflow-scroll flex flex-col lg:items-center mt-6 border-indigo-600">

            {
                    createdCardsToday && createdCardsToday.length == 0 ?
                    <h1 className='text-2xl mt-16 text-indigo-400 font-medium' >No website created today</h1>
                    : ''
                }

                {
                    createdCardsToday && createdCardsToday.map((data,index)=> {
                        return(
                            <div className="lg:min-w-[100%] min-w-[200%] pl-12 min-h-[64px] border border-indigo-100 rounded-xl shadow-sm shadow-black/5 flex items-center mt-4">

                    <h1 className='text-lg' >{index + 1}. <span className='ml-4 text-indigo-600 capitalize' >{data.comp_name}</span></h1>
                    <div className="flex-1  h-full  flex justify-end items-center pr-12">

                    <h1 onClick={()=> navigate('/' + data.comp_name)} className=' flex items-center justify-center text-2xl mr-4 cursor-pointer -rotate-45 text-indigo-600' ><ion-icon name="arrow-forward-circle"></ion-icon></h1>

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
                <div className="w-[320px] h-56 bg-indigo-50  text-indigo-800 flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                    <h2 className='-mt-6' >My earnings</h2>
                    <h1 className='text-7xl mt-3 text-indigo-800' >₹{total_earnings}</h1>
                </div>
                <div className="w-[320px] h-56 bg-indigo-50  text-indigo-800 flex flex-col items-center justify-center rounded-3xl lg:mr-12 lg:mb-0 mb-6">
                <h2 className='-mt-6' >Websites created</h2>
                    <h1 className='text-7xl mt-3 text-indigo-800' >{cards_created}</h1>
                </div>
            </div>
            <div className="w-full h-[330px] overflow-scroll flex flex-col lg:items-center mt-6 border-indigo-600">

            {
                    createdCards && createdCards.length == 0 ?
                    <h1 className='text-2xl mt-16 text-indigo-400 font-medium' >No websites created</h1>
                    : ''
                }

                {
                    createdCards && createdCards.map((data,index)=> {
                        return(
                            <div className="lg:min-w-[100%] min-w-[200%] pl-12 min-h-[64px] border border-indigo-100 rounded-xl shadow-sm shadow-black/5 flex items-center mt-4">

                    <h1 className='text-lg' >{index + 1}. <span className='ml-4 text-indigo-600 capitalize' >{data.comp_name}</span></h1>
                    <div className="flex-1  h-full  flex justify-end items-center pr-12">

                    <h1 onClick={()=> navigate('/' + data.comp_name)} className=' flex items-center justify-center text-2xl mr-4 cursor-pointer -rotate-45 text-indigo-600' ><ion-icon name="arrow-forward-circle"></ion-icon></h1>

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

 {/* Dashboard Install Prompt */}

 {
    localStorage.getItem("isInstalledFranchiseeApp") != "true" ?
<div className="add-dashboard-prompt-franchisee-overlay fixed opacity-0 h-full top-0 w-full bg-black/50">
 <div
 className="add-dashboard-prompt-franchisee px-12  w-full absolute  flex flex-col items-center bg-white  h-[300px]">
 <h1 className="font-bold text-3xl text-black text-center mt-8">
                Add <span className="text-indigo-500">dashboard</span> <br /> to homescreen
            </h1>
            <button onClick={()=> {
                document.querySelector('.add-dashboard-prompt-franchisee-overlay').classList.replace("add-dashboard-prompt-franchisee-overlay","add-dashboard-prompt-franchisee-overlay-inactive")
                document.querySelector('.add-dashboard-prompt-franchisee').classList.replace("add-dashboard-prompt-franchisee","add-dashboard-prompt-franchisee-inactive")
            }} id='app-install-button-franchisee' className="text-lg text-white bg-indigo-500 rounded-full mt-8 w-full font-semibold py-2">
                Add now
            </button>
 </div>
 </div>
 : ''
 }

 

           
    </div>
  )
}

export default ManageFranchisee