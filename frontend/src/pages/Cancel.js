import React from "react";
import CANCEL_IMAGE from "../assest/icons8-cancel.gif"
import { Link } from "react-router-dom";


const Cancel = ()=>{
    return(
         <div className="flex justify-center items-center">
                 <div className="flex flex-col rounded-xl bg-slate-300 w-auto h-auto justify-center items-center p-4 m-6 gap-5">
                    <img 
                       src = {CANCEL_IMAGE}
                       width = {300}
                       height= {300}
                    />
                    <p className="text-red-600 text-2xl font-bold"  >PAYMENT CANCELLED</p>
                    <Link to="/cart" className="p-2 border-2 border-solid rounded-xl border-red-600 text-red-600 text-2xl font-semibold hover:text-white hover:bg-red-600">Go to Cart</Link>
                 </div>
                </div>
    )
}

export default Cancel