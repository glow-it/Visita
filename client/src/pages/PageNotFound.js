import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {

	useEffect(()=> {
		document.querySelectorAll('header').forEach((elem)=> {
			elem.style.display = 'none'
		})
	},[])


  return (
   
	<div id="app">
	<div id="wrapper" className='lg:scale-[3] scale-[1.5]'>
		
		<h1 class="glitch" data-text="
404">404</h1>
	</div>
		<span class="sub text-slate-800 lg:tracking-[1rem] tracking-[0.5rem] font-visita-medium  text-center lg:text-2xl text-xl lg:mt-16 ">PAGE NOT FOUND</span>

		<Link to='/' className='flex items-center justify-center font-visita-medium py-2 mt-16 px-6 rounded-full text-white bg-indigo-600 hover:bg-indigo-700 transition-colors' >Take me home <span className="flex items-center justify-center ml-1"><ion-icon name="arrow-forward-outline"></ion-icon></span></Link>
</div>

  )
}

export default PageNotFound