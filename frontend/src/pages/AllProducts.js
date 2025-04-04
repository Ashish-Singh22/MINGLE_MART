import React, { useEffect, useState } from "react";
import UploadProduct from "../components/UploadProduct";
import SummaryApi from "../common";
import AdminProductCard from "../components/AdminProductCard";


const AllProducts = () => {
    const [openUploadProduct,setOpenUploadProduct]=useState(false)
    const [allProduct,setAllProduct] = useState([]);

    const fetchAllProduct = async()=>{
      const response = await fetch(SummaryApi.allProduct.url)
      const dataResponse = await response.json()

      console.log("product data",dataResponse.product)
      
      setAllProduct(dataResponse?.data || [])

    }

    useEffect(()=>{
      
      fetchAllProduct()

    },[])

    return (
      <>
         <div className="bg-gradient-to-r from-white via-slate-800 to-black">
        <div className='bg-gradient-to-r from-white via-slate-800 to-black py-2 px-4 flex justify-between items-center'>
            <h2 className='font-bold text-xl text-black'>All Product</h2>
            <button  className='border-2 border-white text-white bg-gradient-to-r from-black  to-red-600 hover:bg-gradient-to-r hover:from-red-600  hover:to-black hover:text-white transition-all py-1 px-3 rounded-full ' onClick={()=>setOpenUploadProduct(true)}>Upload Product</button>
        </div>

        {/** all product */}

        <div className='flex items-center  mx-0 flex-wrap gap-5 py-4 h-[calc(100vh-190px)] overflow-y-scroll '>
          {
            allProduct.map((product,index)=>{
              return(
                <AdminProductCard data={product} key={index+"allProduct"} fetchdata={fetchAllProduct}/>
                
              )
            })
          }
        </div>


       





        {/* *upload prouct component */}
        {
          openUploadProduct && (
            <UploadProduct onClose={()=>setOpenUploadProduct(false)} fetchData = {fetchAllProduct}/>
          )
        }
      

    </div>
      </>
    )
}

export default AllProducts