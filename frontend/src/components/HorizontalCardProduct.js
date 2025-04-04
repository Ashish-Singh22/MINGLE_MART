import React, { useContext, useEffect, useRef, useState } from "react";
import fetchCategoryWiseProduct from "../helpers/fetchCategoryWiseProuct";
import displayINRCurrency from '../helpers/displayCurrency'
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6'
import { Link } from 'react-router-dom'
import addToCart from '../helpers/addToCart'
import Context from '../context'


const HorizontalCardProduct = ({category,heading}) => {
    const [data,setData] = useState([])
    const [loading , setLoading] = useState(true)
    const loadingList = new Array(13).fill(null)

    const [scroll,setScroll] = useState(0)
    const scrollElement = useRef()

    const { fetchUserAddToCart } = useContext(Context)


    const fetchData = async() => {

        setLoading(true)
        const categoryProduct = await fetchCategoryWiseProduct(category)

        setLoading(false)

        console.log("horizontal data",categoryProduct.data)
        setData(categoryProduct?.data)


    }

    useEffect(()=>{
        fetchData()

    },[])

    const scrollRight = () =>{
        scrollElement.current.scrollLeft += 300
    }
    const scrollLeft = () =>{
        scrollElement.current.scrollLeft -= 300
    }

    const handleAddToCart = async(e,id)=>{
        await addToCart(e,id)
        fetchUserAddToCart()
    }

    return(
        <>
            
            <div className='mx-auto px-4 my-6 relative'>

<h2 className='text-2xl font-semibold text-white py-4'>{heading}</h2>

    
<div className='flex items-center gap-4 md:gap-6 overflow-scroll scrollbar-none transition-all' ref={scrollElement}>

<button  className=' bg-gradient-to-r from-white to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-white shadow-md rounded-full p-1 absolute left-0 text-xl font-bold hidden md:block' onClick={scrollLeft}><FaAngleLeft/></button>
<button  className='bg-gradient-to-r from-white to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-white shadow-md rounded-full p-1 absolute right-0 text-xl font-bold  hidden md:block' onClick={scrollRight}><FaAngleRight/></button> 

{   loading ? (
    loadingList.map((product,index)=>{
        return(
            <div className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                <div className='bg-slate-200 h-full p-4 min-w-[120px] md:min-w-[145px] animate-pulse'>

                </div>
                <div className='p-4 grid w-full gap-2'>
                    <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                    <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                    <div className='flex gap-3 w-full'>
                        <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                        <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                    </div>
                    <button className='text-sm  text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                </div>
            </div>
        )
    })
) : (
data.map((product,index)=>{
    return(
        <Link to={"product/"+product?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-black rounded-sm shadow flex'>
            <div className='bg-gradient-to-r from-yellow-600 to-black hover:bg-gradient-to-r hover:from-black hover:to-yellow-600 h-full p-4 min-w-[120px] md:min-w-[145px]'>
                <img src={product.productImage[0]} className='object-scale-down h-full bg-transparent hover:scale-110 transition-all'/>
            </div>
            <div className='p-4 grid bg-gradient-to-r from-black to-black hover:bg-gradient-to-r hover:from-black hover:to-white'>
                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-yellow-500'>{product?.productName}</h2>
                <p className='capitalize text-slate-200'>{product?.category}</p>
                <div className='flex gap-3'>
                    <p className='text-red-600 font-medium'>{ displayINRCurrency(product?.sellingPrice) }</p>
                    <p className='text-yellow-500 line-through'>{ displayINRCurrency(product?.price)  }</p>
                </div>
                <button className='text-md bg-gradient-to-r from-black  to-red-600 hover:bg-gradient-to-r hover:from-red-500 hover:to-black text-white px-3 py-0.5 rounded-full' onClick={(e)=>handleAddToCart(e,product?._id)}>Add to Cart </button>
            </div>
        </Link>
    )
})
)
   
}
</div>


</div>

        </>
    )
}

export default HorizontalCardProduct;