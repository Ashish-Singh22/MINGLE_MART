import React, { useState } from "react";
import loginIcons from '../assest/assest/signin.gif';
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    const [data,setData]=useState({
        email : "",
        password : "",
        name : "",
        confirmPassword: "",
        profilePic : "", 
    })

    const navigate = useNavigate()

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

        if(data.password === data.confirmPassword)
        {

            const dataResponse = await fetch(SummaryApi.signUp.url,{
                method : SummaryApi.signUp.method,
                headers : {
                    "content-type":"application/json"
                },
                body : JSON.stringify(data)
            })


            const dataApi = await dataResponse.json()

            // console.log("dataApi",dataApi)

            if(dataApi.success){
                toast.success(dataApi.message)
                navigate("/login")
            }
            if(dataApi.error){
                toast.error(dataApi.message)
            }
        }else{
            toast.error("Please check password and confirm password")
          }


    }

    const handleUploadPic = async(e)=>{
         const file = e.target.files[0]
        //  console.log(file)
        const imagePic =await imageTobase64(file)

        setData((prev) => {
            return{
                ...prev,
                profilePic : imagePic
            }
        })

    }
    return (
        <section id='login'>
            <div className='mx-auto p-8 bg-gradient-to-r from-black via-slate-800 to-yellow-800'>
                <div className='bg-gradient-to-r from-white  to-black p-5 w-full max-w-sm mx-auto rounded-3xl shadow-xl text-md'> {/* Added rounded-lg for the card */}
                <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full '>
                        <div>
                            <img src={data.profilePic || loginIcons} alt='login icons'/>
                        </div>
                        <form>
                          <label>
                            <div className='text-xs bg-opacity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                              Upload  Photo
                            </div>
                            <input type='file' className='hidden' onChange={handleUploadPic}/>
                          </label>
                        </form>
                    </div>

                    <form className='pt-6 flex flex-col gap-4' onSubmit={handleSubmit}>
                        <div className='grid gap-2' >
                            <label>Name:</label>
                            <div className='bg-slate-100 p-3 rounded-xl'> {/* Added rounded-md to make the input rounded */}
                                <input
                                    type='text'
                                    placeholder='Enter name'
                                    name="name"
                                    required
                                    value={data.name}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                            </div>
                        </div>

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
                        </div>



                            <div className="grid gap-2">
                            <label>Confirm Password:</label>
                            <div className='bg-slate-100 p-4 flex items-center rounded-xl'> {/* Added rounded-md for rounded password input */}
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder='Enter confirm password'
                                    name ="confirmPassword"
                                    required
                                    value = {data.confirmPassword}
                                    onChange={handleOnChange}
                                    className='w-full h-full outline-none bg-transparent'
                                />
                                <div 
                                    className='cursor-pointer text-xl pl-2'
                                    onClick={() => setShowConfirmPassword(prev => !prev)}
                                >
                                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                                </div>
                            </div>



                            
                        </div>

                        <button 
                            type="submit"
                            className='bg-gradient-to-r from-black  to-red-600 hover:bg-gradient-to-r hover:from-red-600  hover:to-black hover:border-2 hover:border-white text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 text-xl font-bold'
                        >
                            SignUp
                        </button>
                    </form>

                    <p className='my-5 text-center font-bold'>
                        Already have an account? <Link to="/login" className='text-red-600 hover:text-red-700 hover:underline text-xl font-bold'>Login</Link>
                    </p>
                </div>
            </div>
        </section>
    )
}


export default SignUp;
