import React, { useState } from 'react'
import { CgClose } from "react-icons/cg";
import productCategory from '../helpers/productCategory';
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from '../helpers/uploadImage';
import DisplayImage from './DisplayImage';
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common';
import {toast} from 'react-toastify'

const AdminEditProduct = ({
    onClose,
    productData,
    fetchdata
})=>{
    const [data,setData] = useState({
        ...productData,
        productName : productData?.productName,
        brandName : productData?.brandName,
        category : productData?.category,
        productImage : productData?.productImage || [],
        description : productData?.description,
        price : productData?.price,
        sellingPrice : productData?.sellingPrice
      })
      const [openFullScreenImage,setOpenFullScreenImage] = useState(false)
      const [fullScreenImage,setFullScreenImage] = useState("")
    
    
      const handleOnChange = (e)=>{
          const { name, value} = e.target
    
          setData((preve)=>{
            return{
              ...preve,
              [name]  : value
            }
          })
      }
    
      const handleUploadProduct = async(e) => {
        const file = e.target.files[0]
        const uploadImageCloudinary = await uploadImage(file)
    
        setData((preve)=>{
          return{
            ...preve,
            productImage : [ ...preve.productImage, uploadImageCloudinary.secure_url]
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
    
    
      {/**upload product */}
      const handleSubmit = async(e) =>{
        e.preventDefault()
        
        const response = await fetch(SummaryApi.updateProduct.url,{
          method : SummaryApi.updateProduct.method,
          credentials : 'include',
          headers : {
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })
    
        const responseData = await response.json()
    
        if(responseData.success){
            toast.success(responseData?.message)
            onClose()
            fetchdata()
        }
    
    
        if(responseData.error){
          toast.error(responseData?.message)
        }
      
    
      }
    
      return (
        <div className='fixed w-full  h-full  bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
        <div className='bg-gradient-to-r from-black  to-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>
    
             <div className='flex justify-between items-center pb-3'>
                 <h2 className='font-bold text-xl text-white'>Edit Product</h2>
                 <div className='w-fit ml-auto text-2xl hover:text-white cursor-pointer' onClick={onClose}>
                     <CgClose className='text-bold text-3xl'/>
                 </div>
             </div>
    
           <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
             <label htmlFor='productName' className='text-white'>Product Name :</label>
             <input 
               type='text' 
               id='productName' 
               placeholder='enter product name' 
               name='productName'
               value={data.productName} 
               onChange={handleOnChange}
               className='p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white '
               required
             />
    
    
             <label htmlFor='brandName' className='mt-3 text-white'>Brand Name :</label>
             <input 
               type='text' 
               id='brandName' 
               placeholder='enter brand name' 
               value={data.brandName} 
               name='brandName'
               onChange={handleOnChange}
               className='hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded'
               required
             />
    
               <label htmlFor='category ' className='mt-3 text-white'>Category :</label>
               <select required value={data.category} name='category' onChange={handleOnChange} className=' hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded'>
                   <option value={""} className='text-black'>Select Category</option>
                   {
                     productCategory.map((el,index)=>{
                       return(
                         <option value={el.value} key={el.value+index} className='text-black'>{el.label}</option>
                       )
                     })
                   }
               </select>
    
               <label htmlFor='productImage' className='mt-3 text-white'>Product Image :</label>
               <label htmlFor='uploadImageInput'>
               <div className='hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                         <div className='text-slate-500 hover:text-white flex justify-center items-center flex-col gap-2'>
                           <span className='text-4xl text-black hover:text-white'><FaCloudUploadAlt/></span>
                           <p className='text-black hover:text-white text-xl'>Upload Product Image</p>
                           <input type='file' id='uploadImageInput'  className='hidden' onChange={handleUploadProduct}/>
                         </div>
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
                                         className='bg-slate-100 border cursor-pointer'  
                                         onClick={()=>{
                                           setOpenFullScreenImage(true)
                                           setFullScreenImage(el)
                                         }}/>
    
                                         <div className='absolute bottom-0 right-0 p-1 hover:white text-black bg-white rounded-full hidden group-hover:block cursor-pointer' onClick={()=>handleDeleteProductImage(index)}>
                                           <MdDelete/>  
                                         </div>
                                   </div>
                                   
                                 )
                               })
                             }
                         </div>
                     ) : (
                       <p className='text-black hover:text-white text-xs'>*Please upload product image</p>
                     )
                   }
                   
               </div>
    
               <label htmlFor='price' className='mt-3 text-white'>Price :</label>
               <input 
                 type='number' 
                 id='price' 
                 placeholder='enter price' 
                 value={data.price} 
                 name='price'
                 onChange={handleOnChange}
                 className='hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded'
                 required
               />
    
    
               <label htmlFor='sellingPrice' className='mt-3 text-white'>Selling Price :</label>
               <input 
                 type='number' 
                 id='sellingPrice' 
                 placeholder='enter selling price' 
                 value={data.sellingPrice} 
                 name='sellingPrice'
                 onChange={handleOnChange}
                 className='hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white p-2 placeholder-black bg-gradient-to-r from-white  to-black text-black border rounded'
                 required
               />
    
               <label htmlFor='description' className='mt-3 text-white'>Description :</label>
               <textarea 
                 className='hover:bg-gradient-to-r hover:from-black  hover:to-white hover:text-white hover:placeholder-white h-28 placeholder-black bg-gradient-to-r from-white  to-black text-black border resize-none p-1' 
                 placeholder='enter product description' 
                 rows={3} 
                 onChange={handleOnChange} 
                 name='description'
                 value={data.description}
               >
               </textarea>
    
    
    
    
    
               <button className='px-3 py-2 border-2 border-white  bg-gradient-to-r from-green-600  to-black text-white hover:bg-gradient-to-r hover:from-black  hover:to-green-600 rounded-xl mb-4 '>Update Product</button>
           </form> 
    
    
    
       
        </div>
    
    
    
        {/***display image full screen */}
        {
         openFullScreenImage && (
           <DisplayImage onClose={()=>setOpenFullScreenImage(false)} imgUrl={fullScreenImage}/>
         )
        }
         
    
     </div>
      )
    

}

export default AdminEditProduct