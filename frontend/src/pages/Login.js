import React, { useContext, useState } from "react";
import loginIcons from '../assest/assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const { fetchUserAddToCart } = useContext(Context)
    const [data,setData]=useState({
        email : "",
        password : "",
    })
      const navigate = useNavigate()
      const {fetchUserDetails} = useContext(Context)

      const handleOnChange = (e) =>{
        const { name , value } = e.target

        setData((prev)=>{
            return{
                ...prev,
                [name] : value
            }
        })
    }
    console.log(data)


    const handleSubmit = async(e)=>{

        e.preventDefault()

        
        const dataResponse = await fetch(SummaryApi.signIn.url,{
            method : SummaryApi.signIn.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(data)
        })

        const dataApi = await dataResponse.json()

        if(dataApi.success){
            toast.success(dataApi.message)
            navigate('/')
            fetchUserDetails()
        }

        if(dataApi.error){
            toast.error(dataApi.message)
        }
        fetchUserAddToCart()

    }

    console.log("data login" , data)
     
    return (
        <section id='login'>
            <div className='mx-auto p-20 bg-gradient-to-r from-black via-slate-800  to-yellow-600'>
                <div className='bg-gradient-to-r from-white  to-black p-5 w-full max-w-sm mx-auto rounded-3xl shadow-xl'> {/* Added rounded-lg for the card */}
                    <div className='w-20 h-20 mx-auto'>
                        <img src={loginIcons} alt='login icon' className="bg-white" />
                    </div>

                    <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='grid gap-2' >
                            <label>Email:</label>
                            <div className='bg-slate-100 p-3 rounded-xl'> {/* Added rounded-md to make the input rounded */}
                                <input
                                    type='email'
                                    placeholder='Enter email'
                                    name="email"
                                    required
                                    value={data.email}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

                        <div className="grid gap-2">
                            <label>Password:</label>
                            <div className='bg-slate-100 p-4 flex items-center rounded-xl'> {/* Added rounded-md for rounded password input */}
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder='Enter password'
                                    name ="password"
                                    required
                                    value = {data.password}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div 
                                    className='cursor-pointer text-xl pl-2'
                                    onClick={() => setShowPassword(prev => !prev)}
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>
                            <Link to='/forgot-password' className='block w-fit ml-auto hover:underline font-semibold text-red-600'>
                                Forgot password?
                            </Link>
                        </div>

                        <button 
                            type="submit"
                            className=' text-xl font-semibold bg-gradient-to-r from-black  to-red-600 hover:bg-gradient-to-r hover:from-red-600  hover:to-black hover:border-2 hover:border-white text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6'
                        >
                            Login
                        </button>
                    </form>

                    <p className='my-5 text-center font-bold'>
                        Don't have an account? <Link to="/sign-up" className='text-red-600 hover:text-red-700 text-xl font-bold hover:underline'>Sign up</Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Login;
