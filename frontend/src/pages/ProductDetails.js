import React, { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SummaryApi from "../common";
import { FaStar } from "react-icons/fa";
import { FaStarHalf } from "react-icons/fa";
import displayINRCurrency from "../helpers/displayCurrency";
import CategoryWiseProductDisplay from "../components/CategoryWiseProductDisplay";
import Context from "../context";
import addToCart from "../helpers/addToCart";
import AddReview from "../components/AddReview";
import AllReview from "../components/AllReview";

const ProductDetails = ()=>{

    const [data,setData] = useState({
        productName : "",
        brandName : "",
        category : "",
        productImage : [],
        description : "",
        price : "",
        sellingPrice : ""
    })

    const params = useParams();

    const [loading,setLoading] = useState(true)
    const productImageListLoading = new Array(4).fill(null)
    const [activeImage,setActiveImage]= useState("")

    const [zoomImageCoordinate,setZoomImageCoordinate] = useState({
        x : 0,
        y : 0
      })
      const [zoomImage,setZoomImage] = useState(false)

    //   const navigate = useNavigate()

      const { fetchUserAddToCart } = useContext(Context)


      const handleAddToCart = async(e,id) =>{
        await addToCart(e,id)
        fetchUserAddToCart()
      }

      const fetchProductDetails = async()=>{
        setLoading(true)
        const response = await fetch(SummaryApi.productDetails.url,{
            method : SummaryApi.productDetails.method,
            headers : {
                "content-type" : "application/json"
            },
            body : JSON.stringify({
                productId : params?.id
            })
        })
        setLoading(false)
        const dataResponse = await response.json()

        setData(dataResponse?.data)
        setActiveImage(dataResponse?.data?.productImage[0])
      }

      // console.log("data",data)

      useEffect(()=>{
        fetchProductDetails()
      },[params])

      const handleMouseEnterProduct = (imageURl)=>{
        setActiveImage(imageURl)
      }

      const handleZoomImage = useCallback((e)=>{
        setZoomImage(true)
        const { left,top,width,height} = e.target.getBoundingClientRect()
 
        // console.log("coordinate", left, top , width , height)

    const x = (e.clientX - left) / width
    const y = (e.clientY - top) / height

    setZoomImageCoordinate({
      x,
      y
    })
},[zoomImageCoordinate])

      const handleLeaveImageZoom = ()=>{
        setZoomImage(false)
      }


      
    
    

    return(
        <>

<div className='mx-auto p-10 max-[500px]:pl-5 bg-gradient-to-r from-black via-slate-800 to-yellow-900'>

<div className='min-h-[200px] flex flex-col sm:flex-row gap-4'>
    {/***product Image */}
    <div className='h-96 flex flex-col lg:flex-row-reverse gap-4 '>

        <div className='h-[300px] w-[300px] lg:h-96 lg:w-96 bg-slate-200 relative p-2 bg-gradient-to-r from-yellow-600 to-black hover:bg-gradient-to-r hover:from-black hover:to-yellow-600'>
            <img src={activeImage} className='h-full w-full object-scale-down ' onMouseMove={handleZoomImage} onMouseLeave={handleLeaveImageZoom}/>

              {/**product zoom */}
              {
                zoomImage && (
                  <div className='hidden lg:block absolute min-w-[500px] overflow-hidden min-h-[400px] bg-gradient-to-r from-yellow-600 to-black hover:bg-gradient-to-r hover:from-black hover:to-yellow-600 p-1 -right-[510px] top-0'>
                    <div
                      className='w-full h-full min-h-[400px] min-w-[500px] scale-150'
                      style={{
                        background : `url(${activeImage})`,
                        backgroundRepeat : 'no-repeat',
                        backgroundPosition : `${zoomImageCoordinate.x * 100}% ${zoomImageCoordinate.y * 100}% `

                      }}
                    >

                    </div>
                  </div>
                )
              }
            
        </div>

        <div className='h-full'>
            {
              loading ? (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full'>
                  {
                    productImageListLoading.map((el,index) =>{
                      return(
                        <div className='h-20 w-20 bg-slate-200 rounded animate-pulse' key={"loadingImage"+index}>
                        </div>
                      )
                    })
                  }
                </div>
                
              ) : (
                <div className='flex gap-2 lg:flex-col overflow-scroll scrollbar-none h-full '>
                  {
                    data?.productImage?.map((imgURL,index) =>{
                      return(
                        <div className='h-20 w-20 rounded p-1 bg-gradient-to-r from-yellow-600 to-black hover:bg-gradient-to-r hover:from-black hover:to-yellow-600' key={imgURL}>
                          <img src={imgURL} className='w-full h-full object-scale-down  cursor-pointer' onMouseEnter={()=>handleMouseEnterProduct(imgURL)}  onClick={()=>handleMouseEnterProduct(imgURL)}/>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
        </div>
    </div>

     {/***product details */}
     <div className=''>
     {
      loading ? (
        <div className='grid gap-1 w-full'>
          <p className='bg-slate-200 animate-pulse  h-6 lg:h-8 w-full rounded-full inline-block'></p>
          <h2 className='text-2xl lg:text-4xl font-medium h-6 lg:h-8  bg-slate-200 animate-pulse w-full'></h2>
          <p className='capitalize text-slate-400 bg-slate-200 min-w-[100px] animate-pulse h-6 lg:h-8  w-full'></p>

          <div className='text-red-600 bg-slate-200 h-6 lg:h-8  animate-pulse flex items-center gap-1 w-full'>

          </div>

          <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1 h-6 lg:h-8  animate-pulse w-full'>
            <p className='text-red-600 bg-slate-200 w-full'></p>
            <p className='text-slate-400 line-through bg-slate-200 w-full'></p>
          </div>

          <div className='flex items-center gap-3 my-2 w-full'>
            <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
            <button className='h-6 lg:h-8  bg-slate-200 rounded animate-pulse w-full'></button>
          </div>

          <div className='w-full'>
            <p className='text-slate-600 font-medium my-1 h-6 lg:h-8   bg-slate-200 rounded animate-pulse w-full'></p>
            <p className=' bg-slate-200 rounded animate-pulse h-10 lg:h-12  w-full'></p>
          </div>
        </div>
      ) : 
      (
        <div className='flex flex-col gap-1'>
          <p className='p-1 bg-gradient-to-r from-yellow-600 to-black hover:bg-gradient-to-r hover:from-black hover:to-yellow-600 text-white px-2 rounded-full inline-block w-fit'>{data?.brandName}</p>
          <h2 className='text-2xl lg:text-4xl font-medium text-yellow-600'>{data?.productName}</h2>
          <p className='capitalize text-xl text-slate-300'>{data?.category}</p>

          <div className='text-yellow-600 flex items-center gap-1'>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStar/>
              <FaStarHalf/>
          </div>

          <div className='flex items-center gap-2 text-2xl lg:text-3xl font-medium my-1'>
            <p className='text-red-600'>{displayINRCurrency(data.sellingPrice)}</p>
            <p className='text-slate-300 line-through'>{displayINRCurrency(data.price)}</p>
          </div>

          <div className='flex items-center gap-3 my-2'>
            <button className='border-2 border-white rounded px-3 py-1 min-w-[120px] font-medium text-xl text-white bg-gradient-to-r from-black to-red-600 hover:bg-gradient-to-r hover:from-red-600 hover:to-black ' onClick={(e)=>handleAddToCart(e,data?._id)}>Add To Cart</button>
          </div>

          <div>
            <p className='text-slate-300 font-medium text-xl my-1'>Description : </p>
            <p className="text-white">{data?.description}</p>
          </div>
        </div>
      )
     }
     </div>

</div>

<div className="flex flex-col justify-self-stretch gap-10 mt-10">

<div>
{
  <AddReview product_id={params?.id}/>
}

</div>



<div className="">

{
  data.category && (
    <CategoryWiseProductDisplay category={data?.category} heading={"Recommended Product"}/>
  )
}

</div>


</div>










</div>

        

        </>
    )


}

export default ProductDetails