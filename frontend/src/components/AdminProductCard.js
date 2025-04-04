import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import displayINRCurrency from '../helpers/displayCurrency';
import AdminEditProduct from "./Admin Edit Product";

const AdminProductCard = ({
    data,
    fetchdata
})=>{

    const [editProduct,setEditProduct]=useState(false);

    return(
        <>
           <div className='bg-gradient-to-r from-black  to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600  hover:to-black p-4 rounded  '>
       <div className='w-40 flex flex-col gap-2 '>
            <div className='w-32 h-32 flex justify-center items-center'>
              <img src={data?.productImage[0]}  className='mx-auto object-fill h-full'/>   
            </div> 
            <h1 className='text-ellipsis line-clamp-2 text-white'>{data.productName}</h1>

            <div>
               <p className='font-semibold line-through text-red-600'>
                  {
                    displayINRCurrency(data.price)
                  }
        
                </p>
                <p className='font-semibold text-yellow-600'>
                  {
                    displayINRCurrency(data.sellingPrice)
                  }
        
                </p>

                <div className='w-fit ml-auto p-2 bg-green-100 hover:bg-green-600 rounded-full hover:text-white cursor-pointer' onClick={()=>setEditProduct(true)}>
                    <MdModeEditOutline/>
                </div>

            </div>

          
       </div>
        
        {
          editProduct && (
            <AdminEditProduct productData={data} onClose={()=>setEditProduct(false)} fetchdata={fetchdata}/>
          )
        }
    
    </div>


        </>
    )
}

export default AdminProductCard