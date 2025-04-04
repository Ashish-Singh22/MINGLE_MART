import React, { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"
import SummaryApi from "../common"
import VerticalCard from "../components/VerticalCard"


const SearchProduct = ()=>{
    const query = useLocation()
    const [data,setData] = useState([])
    const [loading,setLoading] = useState(false)

    console.log("query",query.search)

    const fetchProduct = async()=>{

        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url+query.search)
        const dataResponse = await response.json()
        setLoading(false)

        setData(dataResponse.data)
    }

    useEffect(()=>{

        fetchProduct()
    },[query])

    return(
        <>

<div className='bg-gradient-to-r from-black via-slate-800 to-yellow-900 mx-auto p-10 max-[350px]:p-4'>
      {
        loading && (
          <p className='text-lg text-center'>Loading ...</p>
        )
      }
 
      <p className='text-xl text-white font-semibold my-3'>Search Results : {data.length}</p>

      {
        data.length === 0 && !loading && (
           <p className='bg-white text-lg text-center p-4'>No Data Found....</p>
        )
      }


      {
        data.length !==0 && !loading && (
          <VerticalCard loading={ loading} data={data}/>
        )
      }

    </div>


        
        </>
    )

}

export default SearchProduct