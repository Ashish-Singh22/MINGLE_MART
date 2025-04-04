import React, { useState } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { Link, Outlet, useNavigate } from 'react-router-dom';
import ROLE from '../common/role';
import { RiAdminFill } from "react-icons/ri";

const AdminPanel = () => {
     
    const user = useSelector(state => state?.user?.user)
    const navigate = useNavigate()
    const [panel,setPanel] = useState(false)


    return (
      <>
          <div className='min-h-[calc(100vh-120px)] flex max-[700px]:flex-col'>

<aside className='bg-gradient-to-r from-yellow-900 via-slate-800 to-black min-h-full  w-full  max-w-60 customShadow p-4 max-[700px]:hidden'>
        <div className='h-32 mt-4 flex justify-center gap-1 items-center flex-col'>
            <div className='text-5xl cursor-pointer relative flex justify-center'>
                {
                user?.profilePic ? (
                    <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                ) : (
                    <FaRegCircleUser className="text-white text-xl"/>
                )
                }
            </div>
            <p className='capitalize text-lg font-bold text-yellow-600'>{user?.name}</p>
            <p className='text-sm font-semibold text-white'>{user?.role}</p>
        </div>

         {/***navigation */}       
        <div>   
            <nav className='grid mt-8 gap-1'>
                <Link to={"all-users"} className=' font-semibold px-2 py-1 text-white hover:bg-gradient-to-r hover:from-white hover:to-black hover:text-black hover:rounded-lg'>All Users</Link>
                <Link to={"all-products"} className='font-semibold px-2 py-1 text-white hover:bg-gradient-to-r hover:from-white hover:to-black hover:text-black hover:rounded-lg'>All product</Link>
                <Link to={"all-order"} className='font-semibold px-2 py-1 text-white hover:bg-gradient-to-r hover:from-white hover:to-black hover:text-black hover:rounded-lg'>All Orders</Link>
                
            </nav>
        </div>  
</aside>

<div className="min-[700px]:hidden bg-gradient-to-r from-white via-slate-800 to-black pt-6 pl-4 onClick={() => panel && setPanel(false)}" onClick={() => panel && setPanel(false)}>

<button className="text-black text-4xl flex gap-2 items-center " onClick={()=>setPanel(preve => !preve)}>

<RiAdminFill/>
<p className="text-yellow-900 text-2xl font-bold">Admin</p>

</button>

{
    panel && (

        <div className={`fixed top-20 left-0 w-3/4 h-full bg-gradient-to-r from-black via-slate-800 to-yellow-900 p-5 transform ${panel ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out  z-50`}>
        <div className='h-32 mt-4 flex justify-center gap-1 items-center flex-col'>
            <div className='text-5xl cursor-pointer relative flex justify-center'>
                {
                user?.profilePic ? (
                    <img src={user?.profilePic} className='w-20 h-20 rounded-full' alt={user?.name} />
                ) : (
                    <FaRegCircleUser className="text-white text-xl"/>
                )
                }
            </div>
            <p className='capitalize text-lg font-bold text-yellow-600'>{user?.name}</p>
            <p className='text-sm font-semibold text-white'>{user?.role}</p>
        </div>

         {/***navigation */}       
        <div>   
            <nav className='grid mt-8 gap-1'>
                <Link to={"all-users"} className=' font-semibold px-2 py-1 text-white hover:bg-gradient-to-r hover:from-white hover:to-black hover:text-black hover:rounded-lg'>All Users</Link>
                <Link to={"all-products"} className='font-semibold px-2 py-1 text-white hover:bg-gradient-to-r hover:from-white hover:to-black hover:text-black hover:rounded-lg'>All product</Link>
                <Link to={"all-order"} className='font-semibold px-2 py-1 text-white hover:bg-gradient-to-r hover:from-white hover:to-black hover:text-black hover:rounded-lg'>All Orders</Link>
            </nav>
        </div>  
</div>

    )
}


</div>





<main 
    className='w-full h-full bg-gradient-to-r from-white via-slate-800 to-black p-4' 
    onClick={() => panel && setPanel(false)}
>
    <Outlet />
</main>
</div>
      </>
    )
}

export default AdminPanel