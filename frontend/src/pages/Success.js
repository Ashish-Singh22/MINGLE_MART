import React from "react";
import SUCCESS_IMAGE from "../assest/icons8-success.gif"
import { Link } from "react-router-dom";

const Success = ()=>{
    return(
        <div className="flex justify-center items-center">
         <div className="flex flex-col rounded-xl bg-slate-300 w-auto h-auto justify-center items-center p-4 m-6 gap-5">
            <img 
               src = {SUCCESS_IMAGE}
               width = {300}
               height= {300}
            />
            <p className="text-green-600 text-2xl font-bold"  >PAYMENT SUCCESSFULL</p>
            <Link to="/order" className="p-2 border-2 border-solid rounded-xl border-green-600 text-green-600 text-2xl font-semibold hover:text-white hover:bg-green-600">Go to Order</Link>
         </div>
        </div>
    )
}

export default  Success