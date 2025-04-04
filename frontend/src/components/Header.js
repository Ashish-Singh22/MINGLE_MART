import React, { useContext, useState } from 'react'
import Logo from './Logo'
import { GrSearch } from "react-icons/gr";
import { FaRegCircleUser } from "react-icons/fa6";
import { TiThMenu } from "react-icons/ti";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SummaryApi from '../common';
import { toast } from 'react-toastify';
import { setUserDetails } from '../store/userSlice';
import Context from '../context';
import ROLE from '../common/role';
import LOGO from '../assest/assest/LOGO MAIN.png'



const Header = () => {
  const user = useSelector(state => state?.user?.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [menuDisplay,setMenuDisplay]=useState(false)
  const context = useContext(Context)
  const searchInput = useLocation()
  const URLSearch = new URLSearchParams(searchInput?.search)
  const searchQuery = URLSearch.getAll("q")
  const [search,setSearch] = useState(searchQuery)
  const [mobileMenuDisplay,setMobileMenuDisplay] = useState(false)

  const { fetchUserAddToCart } = useContext(Context)

  const handleSearch = (e)=>{

    const { value } = e.target
    setSearch(value)

    if(value){
      navigate(`/search?q=${value}`)
    }
    else{
      navigate("/search")
    }

  }



  const handleLogout = async()=>{
    const fetchData = await fetch(SummaryApi.logout_user.url,{
      method : SummaryApi.logout_user.method,
      credentials : 'include'
    })

    const data = await fetchData.json()

    if(data.success){
      toast.success(data.message)
      dispatch(setUserDetails(null))
      navigate("/")
    }

    if(data.error){
      toast.error(data.message)
    }
   
    fetchUserAddToCart()

  } 

  const handleLogin = async()=>{

    fetchUserAddToCart()

  }


  return (
    <header className='h-20 shadow-md bg-black fixed w-full z-40'>
      <div className=' h-full max-[500px]:px-2 px-4 flex items-center justify-between'>
            <div className=''>
                <Link to={"/"}>
                    <img 
                       src={LOGO} 
                       className='w-35 h-20'  
                    />
                </Link>
            </div>

            <div className=' flex items-center sm:w-2/4 lg:w-full justify-between max-w-xl border bg-gradient-to-r from-black to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-black" rounded-full focus-within:shadow pl-3'>
                <input type='text' placeholder='Search Product here...' className='w-full h-full outline-none text-md text-white bg-transparent' onChange = {handleSearch} value = {search}/>
                <div className='text-lg min-w-[50px] h-8  flex items-center justify-center rounded-r-full text-white'>
                  <GrSearch />
                </div>
            </div>


            <div className='max-lg:hidden flex items-center gap-10 pr-4'>
                
                <div className='relative flex justify-center'>

                 
                      <div className='text-3xl cursor-pointer relative flex justify-center' onClick={()=>setMenuDisplay(preve => !preve)}>
                        
                          {
                            user?.profilePic ? (
                              <img src={user?.profilePic} className='w-10 h-10 rounded-full p-1 bg-gradient-to-r from-black to-yellow-600' alt={user?.name} />
                            ) : (
                              <FaRegCircleUser className='text-white'/>
                            )
                          }
                           
                          {
                            menuDisplay && (
                              <div className='absolute bg-gradient-to-r from-black to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-black bottom-0 top-11 h-fit md:p-1 lg:p-2 shadow-lg rounded' >
                                 <nav>
                                   {

                                    user?.role === ROLE.ADMIN && (

                                      <Link to={"/admin-panel/all-products"} className='whitespace-nowrap hidden md:block hover:scale-110 bg-transparent text-slate-200 md:p-1 lg:p-2 lg:text-[1rem] md:text-[0.8rem] font-bold' >Admin Panel</Link>
                                      
                                    )          
                                   }

                                   <Link to={'/order'} className='whitespace-nowrap hidden md:block hover:scale-110 bg-transparent text-slate-200 md:p-1 lg:p-2 lg:text-[1rem] md:text-[0.8rem] font-bold'>Order</Link>

                                   
                         
                                 </nav>
                              </div>
                            )
                          }
                          
                      </div>
                  
                  
                 

                 
                </div>

                 
                      <Link to={"/cart"} className='text-3xl relative'>
                          <span><FaShoppingCart className='rounded-full p-2 text-4xl text-white bg-gradient-to-r from-black to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-black'/></span>
                          <div className='bg-white text-black font-bold w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3'>
                              <p className='text-sm'>{context?.cartProductCount}</p>
                          </div>
                      </Link>
                    


                <div>
                   {
                    user?._id ? (
                       <button onClick={handleLogout} className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-black to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-black">Logout</button>
                    ) : (
                      <Link to={"/login"} onClick={handleLogin} className="px-3 py-1 rounded-full text-white bg-gradient-to-r from-black to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-black">Login</Link>
                
                    )
                   }
                   
                </div>

            </div>

            <div className="lg:hidden text-3xl cursor-pointer relative flex justify-center  pr-4 max-[500px]:pr-2 max-[500px]:ml-6"  onClick={()=>setMobileMenuDisplay(preve => !preve)}>
              {
                     <TiThMenu className="text-yellow-600"/>
              }

              {
                mobileMenuDisplay && (

                  <div className='absolute bg-gradient-to-r from-black to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-black bottom-0 top-11 h-fit p-5 max-[500px]:mr-5 shadow-lg rounded' >
                     <nav>
                       {

                        user?.role === ROLE.ADMIN && (

                          <Link to={"/admin-panel/all-products"} className='whitespace-nowrap block hover:scale-110 bg-transparent text-slate-200 p-1   text-[0.8rem] font-bold' >Admin Panel</Link>
                          
                        )          
                       }

                       <Link to={'/order'} className='whitespace-nowrap  block hover:scale-110 bg-transparent text-slate-200 p-1  text-[1rem]  font-bold'>Order</Link>
                       <Link to={'/cart'} className='whitespace-nowrap  block hover:scale-110 bg-transparent text-slate-200 p-1  text-[1rem]  font-bold'>Cart</Link>

                       {
                       user?._id ? (
                       <button onClick={handleLogout} className="whitespace-nowrap  block hover:scale-110 bg-transparent text-slate-200 p-1  text-[1rem]  font-bold">Logout</button>
                    ) : (
                      <Link to={"/login"} onClick={handleLogin} className="whitespace-nowrap block hover:scale-110 bg-transparent text-slate-200 p-1  text-[1rem]  font-bold">Login</Link>
                
                    )
                   }
                       
             
                     </nav>
                  </div>
                ) 
              }

            </div>

      </div>
    </header>
  )
}

export default Header