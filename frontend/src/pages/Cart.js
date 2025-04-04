import React, { useContext, useEffect, useState } from 'react'
import SummaryApi from '../common'
import Context from '../context'
import displayINRCurrency from '../helpers/displayCurrency'
import { MdDelete } from "react-icons/md";
import {loadStripe} from '@stripe/stripe-js';

const Cart = ()=>{
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)
    const context = useContext(Context)
    const loadingCart = new Array(4).fill(null)

    const fetchData = async()=>{
        const response = await fetch(SummaryApi.addToCartProductView.url,{
            method : SummaryApi.addToCartProductView.method,
            credentials : "include",
            headers : {
                "content-type" : "application/json"
            },
        })

        const responseData = await response.json()

        if(responseData.success){
            setData(responseData.data)
        }
        console.log("data : ",data)
    }

    const handleLoading = async() =>{
        await fetchData()
    }

    useEffect(()=>{

        setLoading(true)
        handleLoading()
        setLoading(false)
    },[])

    const increaseQty = async(id,qty)=>{
        const response = await fetch(SummaryApi.updateCartProduct.url,{
            method : SummaryApi.updateCartProduct.method,
            credentials : "include",
            headers :{
                "content-type" : "application/json"
            },
            body : JSON.stringify(
                {
                    _id : id,
                    quantity : qty+1
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
        }
    }

    const decreaseQty = async(id,qty) =>{
        if(qty >= 2){
             const response = await fetch(SummaryApi.updateCartProduct.url,{
                 method : SummaryApi.updateCartProduct.method,
                 credentials : 'include',
                 headers : {
                     "content-type" : 'application/json'
                 },
                 body : JSON.stringify(
                     {   
                         _id : id,
                         quantity : qty - 1
                     }
                 )
             })
 
             const responseData = await response.json()
 
 
             if(responseData.success){
                 fetchData()
             }
         }
     }

     const deleteCartProduct = async(id)=>{
        const response = await fetch(SummaryApi.deleteCartProduct.url,{
            method : SummaryApi.deleteCartProduct.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify(
                {
                    _id : id,
                }
            )
        })

        const responseData = await response.json()

        if(responseData.success){
            fetchData()
            context.fetchUserAddToCart()
        }
     }

     
    const totalQty = data.reduce((previousValue,currentValue)=> previousValue + currentValue.quantity,0)
    const totalPrice = data.reduce((preve,curr)=> preve + (curr.quantity * curr?.productId?.sellingPrice) ,0)


    const handlePayment = async()=>{
        const stripePromise = await loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

        const response = await fetch(SummaryApi.payment.url,{
            method : SummaryApi.payment.method,
            credentials : 'include',
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                cartItems : data
            })
        })

        const responseData = await response.json()

        if(responseData?.id){
            stripePromise.redirectToCheckout({sessionId : responseData.id})
        }

        console.log("payment response",responseData)

    }


    return(
        <>
           <div className=' p-8 bg-gradient-to-r from-white via-slate-800 to-black mx-auto max-[500px]:pt-3 max-[500px]:px-0'>
        
        <div className='text-center text-lg my-3'>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white py-5'>No Data</p>
                )
            }
        </div>

        <div className='flex flex-col lg:flex-row gap-10 lg:justify-between p-4'>   
                {/***view product */}
                <div className='w-full max-w-3xl'>
                    {
                        loading ? (
                            loadingCart?.map((el,index) => {
                                return(
                                    <div key={el+"Add To Cart Loading"+index} className='w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded'>
                                    </div>
                                )
                            })
                             
                        ) : (
                          data.map((product,index)=>{
                           return(
                            <div key={product?._id+"Add To Cart Loading"} className='w-full bg-white h-32 my-2 border border-slate-300  rounded grid grid-cols-[128px,1fr] '>
                                <div className='w-32 h-32 bg-slate-200 bg-gradient-to-r from-yellow-600 to-black'>
                                    <img src={product?.productId?.productImage[0]} className='w-full h-full object-scale-down p-2 ' />
                                </div>
                                <div className='px-4 py-2 relative bg-gradient-to-r from-black via-slate-800 to-white'>
                                    {/**delete product */}
                                    <div className='absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer' onClick={()=>deleteCartProduct(product?._id)}>
                                        <MdDelete/>
                                    </div>

                                    <h2 className='text-lg lg:text-xl text-ellipsis line-clamp-1 text-yellow-600'>{product?.productId?.productName}</h2>
                                    <p className='capitalize text-white'>{product?.productId.category}</p>
                                    <div className='flex  justify-between '>
                                            <p className='text-red-600 font-medium text-lg  max-[500px]:hidden'>{displayINRCurrency(product?.productId?.sellingPrice)}</p>
                                            <p className='text-black font-bold  text-lg max-[500px]:text-yellow-600'>{displayINRCurrency(product?.productId?.sellingPrice  * product?.quantity)}</p>
                                    </div>
                                    <div className='flex items-center gap-3 mt-1'>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>decreaseQty(product?._id,product?.quantity)}>-</button>
                                        <span className='text-yellow-600 text-xl font-bold'>{product?.quantity}</span>
                                        <button className='border border-red-600 text-red-600 hover:bg-red-600 hover:text-white w-6 h-6 flex justify-center items-center rounded ' onClick={()=>increaseQty(product?._id,product?.quantity)}>+</button>
                                    </div>
                                </div>    
                            </div>
                           )
                          })
                        )
                    }
                </div>


                {/***summary  */}
                <div className='mt-5 lg:mt-0 w-full max-w-sm'>
                        {
                            loading ? (
                            <div className='h-36 bg-slate-200 border border-slate-300 animate-pulse'>
                                
                            </div>
                            ) : (
                                <div className='h-36 bg-gradient-to-r from-white  to-black'>
                                    <h2 className='text-white bg-gradient-to-r from-black  to-red-600 text-xl font-bold px-4 py-1'>Summary</h2>
                                    <div className='flex items-center justify-between px-4 gap-2 font-bold text-lg bg-gradient-to-r from-white  to-black'>
                                        <p className='text-black'>Quantity</p>
                                        <p className='text-yellow-600'>{totalQty}</p>
                                    </div>

                                    <div className='flex items-center justify-between px-4 gap-2 font-bold text-lg text-slate-600 bg-gradient-to-r from-white  to-black'>
                                        <p className='text-black'>Total Price</p>
                                        <p className='text-yellow-600'>{displayINRCurrency(totalPrice)}</p>    
                                    </div>

                                    <button className='bg-gradient-to-r from-black  to-blue-600 p-2 text-white text-xl font-bold w-full mt-2' onClick={handlePayment}>Payment</button>

                                </div>
                            )
                        }
                </div>
        </div>
    </div>
        </>
    )
}

export default Cart