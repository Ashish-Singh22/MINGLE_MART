import React, { useContext } from 'react'
import scrollTop from '../helpers/scrollTop'
import displayINRCurrency from '../helpers/displayCurrency'
import Context from '../context'
import addToCart from '../helpers/addToCart'
import { Link } from 'react-router-dom'

const VerticalCard = ({loading,data = []}) => {
    const loadingList = new Array(13).fill(null)
    const { fetchUserAddToCart } = useContext(Context)

    const handleAddToCart = async(e,id)=>{
       await addToCart(e,id)
       fetchUserAddToCart()
    }

  return (
    <div className='grid grid-cols-[repeat(auto-fit,minmax(260px,300px))] justify-center md:justify-between md:gap-4 overflow-x-scroll scrollbar-none transition-all'>
    {

         loading ? (
             loadingList.map((product,index)=>{
                 return(
                     <div className='w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  bg-white rounded-sm shadow '>
                         <div className='bg-slate-200 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center animate-pulse'>
                         </div>
                         <div className='p-4 grid gap-3'>
                             <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black p-1 py-2 animate-pulse rounded-full bg-slate-200'></h2>
                             <p className='capitalize text-slate-500 p-1 animate-pulse rounded-full bg-slate-200  py-2'></p>
                             <div className='flex gap-3'>
                                 <p className='text-red-600 font-medium p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                                 <p className='text-slate-500 line-through p-1 animate-pulse rounded-full bg-slate-200 w-full  py-2'></p>
                             </div>
                             <button className='text-sm  text-white px-3  rounded-full bg-slate-200  py-2 animate-pulse'></button>
                         </div>
                     </div>
                 )
             })
         ) : (
             data.map((product,index)=>{
                 return(
                    <Link to={"product/"+product?._id} className=' border-l-2 border-l-white border-t-2 border-t-white rounded-xl w-full min-w-[280px]  md:min-w-[320px] max-w-[280px] md:max-w-[320px]  gap-2 shadow '>
                    <div className=' bg-gradient-to-b from-yellow-600 to-black hover:bg-gradient-to-b hover:from-black hover:to-yellow-600 h-48 p-4 min-w-[280px] md:min-w-[145px] flex justify-center items-center'>
                        <img src={product.productImage[0]} className='object-scale-down h-full hover:scale-110 transition-all'/>
                    </div>
                    <div className='p-4 grid gap-3 bg-gradient-to-b from-black to-black hover:bg-gradient-to-b hover:from-black hover:to-white'>
                        <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-yellow-500'>{product?.productName}</h2>
                        <p className='capitalize text-slate-200'>{product?.category}</p>
                        <div className='flex gap-3'>
                            <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                            <p className='text-yellow-500 line-through'>{ displayINRCurrency(product?.price)  }</p>
                        </div>
                        <button className='bg-gradient-to-r from-black  to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-black text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart </button>
                    </div>
                </Link>
                 )
             })
         )
         
     }
    </div>
  )
}

export default VerticalCard