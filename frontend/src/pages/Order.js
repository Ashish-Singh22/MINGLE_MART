import React, { useEffect, useState } from "react";
import SummaryApi from "../common";
import moment from "moment";
import displayINRCurrency from "../helpers/displayCurrency";

const Order = ()=>{

    const [data,setData] = useState([])

    const fetchOrderDetails = async()=>{
        const response = await fetch(SummaryApi.getOrder.url,{
            method: SummaryApi.getOrder.method,
            credentials : "include"
        })

        const responseData = await response.json()
        
        console.log(responseData.data)
        setData(responseData.data)
    }

    useEffect(()=>{
        fetchOrderDetails()
    },[])


    return(
        <div className="m-4 bg-gradient-to-r from-white via-slate-800 to-black  max-[500px]:m-0 max-[500px]:p-2 max-[500px]:pt-10">
           {
            !data[0] && (
                <p>No Order Available</p>
            )
           }

           <div>
            {
                data.map((item,index)=>{
                    return(
                        <div key={item.userId+index} className="p-4 text-2xl font-bold max-[500px]:text-lg max-[500px]:p-0 max-[500px]:pr-1 max-[500px]:mb-10">
            
                           <p className="font-bold text-2xl mb-2 max-[500px]:text-red-600">{moment(item.createdAt).format('LL')}</p>

                           <div className="font-bold text-right mt-2 text-yellow-600">
                            Total Amount : {item.totalAmount}
                           </div>


                           <div className="flex flex-col justify-between pr-4 bg-gradient-to-r from-black via-slate-800 to-yellow-900 border rounded-xl shadow-md lg:flex-row lg:gap-2 ">

                           <div className="grid gap-1 p-4" >
                            {
                                item?.ProductDetails.map((product,index)=>{
                                    return(
                                        <div key={product.productId+index} className="flex gap-4  w-fit p-4 m-2">
                                            <div className="w-28 h-28 bg-slate-200 border rounded min-w-20">
                                               <img
                                                  src={product.image[0]}
                                                  className = "w-28 h-28 bg-slate-200 object-scale-down p-2"
                                               />

                                            </div>

                                            <div className="">

                                               <div className=" text-ellipsis line-clamp-1 text-yellow-600">{product.name}</div>
                                               <div className="flex flex-col gap-0.5 mt-1">
                                                  <div className="text-lg text-red-500">{displayINRCurrency(product.price)}</div>
                                                  <p className=" text-lg font-semibold text-white">Quantity : {product.quantity}</p>

                                               </div>

                                            </div>
                                            
                                           

                                        </div>
                                    )
                                })
                            }
                           </div>

                           <div className="flex gap-2 flex-col justify-center ">

                           <div className="flex flex-col gap-1 text-white max-[500px]:pl-6">
                            <div className="text-left text-yellow-600">Payment Details : </div>
                            <p className=" text-lg font-medium ml-1">Payment method : {item.paymentDetails.payment_method_type[0]}</p>
                            <p className="text-lg font-medium ml-1">Payment Status : {item.paymentDetails.payment_status}</p>
                           </div>

                           <div>
                            <div className="text-xl font-bold text-yellow-600 max-[500px]:pl-6 ">Shipping Details : </div>
                            {
                                item.shipping_options.map((shipping,index)=>{
                                    return(
                                        <div key={shipping.shipping_rate+index} className="font-medium text-lg text-white ml-1 max-[500px]:pl-6 max-[500px]:pb-3">
                                            Shipping Amount : {shipping.shipping_amount}
                                        </div>
                                    )
                                })
                            }
                           </div>


                           </div>


                           </div>
                          

                           

                           


                        </div>
                    )
                })
            }
           </div>
        
        </div>
    )
}

export default Order