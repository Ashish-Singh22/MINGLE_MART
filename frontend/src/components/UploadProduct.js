import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import { FaCloudUploadAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import productCategory from "../helpers/productCategory";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import SummaryApi from "../common";
import {toast} from 'react-toastify'

const UploadProduct = ({
    onClose,
    fetchData
})=>{
    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })

    const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
    const [fullScreenImage,setFullScreenImage] = useState("")

    
    const handleSubmit =async(e)=>{
        e.preventDefault()
      
        const response = await fetch(SummaryApi.uploadProduct.url,{
          method : SummaryApi.uploadProduct.method,
          credentials : "include",
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })

        const responseData = await response.json()

        if(responseData.success){
          toast.success(responseData?.message)
          onClose()
          fetchData()
        }

        if(responseData.error){
          toast.error(responseData?.message)
        }

    }

    const handleOnChange =(e)=>{
        const {name , value} = e.target

        setData((preve)=>{
            return{
                ...preve,
                [name] : value
            }
        })

    }

    const handleUploadProduct = async(e)=>{
        const file = e.target.files[0]
        console.log(file)
        // // setUploadProductImageInput(file.name)
        // // console.log("file",file)
        const uploadImageCloudinary = await uploadImage(file)

        // console.log(uploadImageCloudinary)
        setData((preve)=>{
            return{
                ...preve,
                productImage : [...preve.productImage,uploadImageCloudinary.secure_url]
            }
        })

    }

    const handleDeleteProductImage = async(index)=>{
        console.log("image index",index)
        
        const newProductImage = [...data.productImage]
        newProductImage.splice(index,1)
    
        setData((preve)=>{
          return{
            ...preve,
            productImage : [...newProductImage]
          }
        })
        
      }


    return(
        <>
           <div className="fixed w-full  h-full text-white bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center">
             
              <div className="bg-gradient-to-r from-black  to-white p-4  rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">

                 <div className="flex justify-between items-center pb-3">
                       <h2 className='font-bold text-lg'>Upload Product</h2>
                       <div className='w-fit ml-auto text-2xl text-black cursor-pointer' onClick={onClose}>
                          <CgClose/>
                       </div>
                 </div>


                 <form className = "grid p-4 gap-2 overflow-y-scroll h-full pb-5" onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name :</label>
                    <input
                        type="text"
                        id="productName"
                        placeholder="Enter Product Name"
                        name="productName"
                        value={data.productName}
                        onChange = {handleOnChange}
                        className="p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black  hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white border rounded"
                        required
                    />

                    <label htmlFor="brandName" className="mt-3">Brand Name :</label>
                    <input
                       text="text"
                       id="brandName"
                       placeholder="Enter Brand Name"
                       value={data.brandName}
                       name="brandName"
                       onChange = {handleOnChange}
                       className="p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white"
                       required
                    />

                    <label htmlFor="category" className="mt-3">Category :</label>
                    <select required value={data.category} name="category" onChange={handleOnChange} className="p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white">
                        <option value={""}>SelectCategory</option>
                        {
                            productCategory.map((el,index)=>{
                                return(
                                    <option value={el.value} key={el.value+index}>{el.label}</option>
                                )
                            })
                        }
                    </select>

                    <label htmlFor="productImage" className="mt-3">Product Image :</label>
                    <label htmlFor="uploadImageInput">
                        <div className="p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white h-32 w-full flex justify-center items-center cursor-pointer">
                         
                          <span className='text-4xl'><FaCloudUploadAlt/></span>
                          <p className='text-sm'>Upload Product Image</p>
                          <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>

                        </div>
                    </label>


                    <div>
                  {
                    data?.productImage[0] ? (
                        <div className='flex items-center gap-2'>
                            {
                              data.productImage.map((el,index)=>{
                                return(
                                  <div className='relative group'>
                                      <img 
                                        src={el} 
                                        alt={el} 
                                        width={80} 
                                        height={80}  
                                        className='placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white cursor-pointer'  
                                        onClick={()=>{
                                          setOpenFullScreenImage(true)
                                          setFullScreenImage(el)
                                        }}/>

                                        <div className='absolute bottom-0 right-0 p-1 text-black  rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                          <MdDelete className="text-xl text-black"/>  
                                        </div>
                                  </div>
                                  
                                )
                              })
                            }
                        </div>
                    ) : (
                      <p className='text-red-600 text-xs'>*Please upload product image</p>
                    )
                  }
                  
              </div>

              <label htmlFor='price' className='mt-3'>Price :</label>
              <input 
                type='number' 
                id='price' 
                placeholder='enter price' 
                value={data.price} 
                name='price'
                onChange={handleOnChange}
                className='p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white'
                required
              />


              <label htmlFor='sellingPrice' className='mt-3'>Selling Price :</label>
              <input 
                type='number' 
                id='sellingPrice' 
                placeholder='enter selling price' 
                value={data.sellingPrice} 
                name='sellingPrice'
                onChange={handleOnChange}
                className='p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white'
                required
              />

              <label htmlFor='description' className='mt-3 text-white'>Description :</label>
              <textarea 
                className='h-28 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white resize-none p-1' 
                placeholder='enter product description' 
                rows={3} 
                onChange={handleOnChange} 
                name='description'
                value={data.description}
              >
              </textarea>





              <button className='px-3 py-2 border-2 border-white  bg-gradient-to-r from-red-600  to-black text-white hover:bg-gradient-to-r hover:from-black  hover:to-red-600 rounded-xl mb-4 '>Upload Product</button>

           </form>

              </div>

                {/***display image full screen */}
       {
        openFullScreenImage && (
          <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
        )
       }
              
           </div>
        </>
    )
}

export default UploadProduct