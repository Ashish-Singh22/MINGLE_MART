import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import productCategory from '../helpers/productCategory'
import VerticalCard from '../components/VerticalCard'
import SummaryApi from '../common'
import { IoColorFilterSharp } from "react-icons/io5";
import { IoCheckmarkDoneCircle } from "react-icons/io5";

const CategoryProduct = () => {
    const [data,setData] = useState([])
    const navigate = useNavigate()
    const [loading,setLoading] = useState(false)
    const location = useLocation()
    const [filterSearch,setFilterSearch] = useState(false)
    const urlSearch = new URLSearchParams(location.search)
    const urlCategoryListinArray = urlSearch.getAll("category")

    const urlCategoryListObject = {}
    urlCategoryListinArray.forEach(el =>{
      urlCategoryListObject[el] = true
    })

    const [selectCategory,setSelectCategory] = useState(urlCategoryListObject)
    const [filterCategoryList,setFilterCategoryList] = useState([])

    const [sortBy,setSortBy] = useState("")

    const fetchData = async()=>{
      const response = await fetch(SummaryApi.filterProduct.url,{
        method : SummaryApi.filterProduct.method,
        headers : {
          "content-type" : "application/json"
        },
        body : JSON.stringify({
          category : filterCategoryList
        })
      })

      const dataResponse = await response.json()
      setData(dataResponse?.data || [])
      console.log(data)
    }

    const handleSelectCategory = (e) =>{
      const {name , value, checked} =  e.target

      setSelectCategory((preve)=>{
        return{
          ...preve,
          [value] : checked
        }
      })
    }

    useEffect(()=>{
      fetchData()
    },[filterCategoryList])

    useEffect(()=>{
      const arrayOfCategory = Object.keys(selectCategory).map(categoryKeyName =>{
        if(selectCategory[categoryKeyName]){
          return categoryKeyName
        }
        return null
      }).filter(el => el)

      setFilterCategoryList(arrayOfCategory)

      //format for url change when change on the checkbox
      const urlFormat = arrayOfCategory.map((el,index) => {
        if((arrayOfCategory.length - 1 ) === index  ){
          return `category=${el}`
        }
        return `category=${el}&&`
      })

      navigate("/product-category?"+urlFormat.join(""))
    },[selectCategory])


    const handleOnChangeSortBy = (e)=>{
      const { value } = e.target

      setSortBy(value)

      if(value === 'asc'){
        setData(preve => preve.sort((a,b)=>a.sellingPrice - b.sellingPrice))
      }

      if(value === 'dsc'){
        setData(preve => preve.sort((a,b)=>b.sellingPrice - a.sellingPrice))
      }
    }

    useEffect(()=>{

    },[sortBy])
    
  return (
    <div className='bg-gradient-to-r from-black via-slate-800 to-yellow-900 mx-auto p-10 max-sm:p-2'>

       {/***desktop version */}
       <div className='max-sm:hidden sm:grid grid-cols-[200px,1fr]'>
           {/***left side */}
           <div className='bg-gradient-to-r from-black via-slate-800 to-yellow-900 rounded-xl border p-2 min-h-[calc(100vh-120px)] overflow-y-scroll'>
                {/**sort by */}
                <div className=''>
                    <h3 className='text-base uppercase font-medium text-yellow-600 border-b pb-1 border-slate-300'>Sort by</h3>

                    <form className='text-sm flex flex-col gap-2 py-2'>
                        <div className='flex items-center gap-3'>
                          <input type='radio' name='sortBy'  checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value={"asc"}/>
                          <label className="text-white">Price - Low to High</label>
                        </div>

                        <div className='flex items-center gap-3'>
                          <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value={"dsc"}/>
                          <label  className="text-white">Price - High to Low</label>
                        </div>
                    </form>
                </div>


                {/**filter by */}
                <div className=''>
                    <h3 className='text-base uppercase font-medium text-yellow-600 border-b pb-1 border-slate-300'>Category</h3>

                    <form className='text-sm flex flex-col gap-2 py-2'>
                        {
                          productCategory.map((categoryName,index)=>{
                            return(
                              <div className='flex items-center gap-3'>
                                 <input type='checkbox' name={"category"} checked={selectCategory[categoryName?.value]} value={categoryName?.value} id={categoryName?.value} onChange={handleSelectCategory} />
                                 <label htmlFor={categoryName?.value} className="text-white">{categoryName?.label}</label>
                              </div>
                            )
                          })
                        }
                    </form>
                </div>


           </div>


            {/***right side ( product ) */}
            <div className='px-4'>
              <p className='font-medium text-yellow-500 text-lg my-2'>Search Results : {data.length}</p>

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]'>
              {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )
              }
             </div>
            </div>
       </div>


       {/* for short and mobile screens */}

       <div className='min-sm:hidden'>

         {/***right side ( product ) */}
         <div className='px-1'>
          <div onClick={() => filterSearch && setFilterSearch(false)}>

          <p className='font-medium text-yellow-500 text-lg my-2'>Search Results : {data.length}</p>

          </div>
              
              <div>

                <div onClick={() => filterSearch && setFilterSearch(false)}>

                <button className='font-medium text-yellow-500 text-xl my-4 flex gap-2 items-center' onClick={()=>setFilterSearch(preve => !preve)}>
                <IoColorFilterSharp className="text-white text-3xl font-bold "/>
                <p>Filters</p>
              </button>

                </div>

             

              {
                filterSearch && (

                  <div className={`fixed top-20 left-0 w-3/4 h-full bg-gray-900 p-5 transform ${filterSearch ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out sm:hidden z-50`}>
                <button className="text-white text-3xl absolute top-4 right-4" onClick={() => setFilterSearch(preve => !preve)}>
                    <IoCheckmarkDoneCircle className='hover:text-green-600' />
                </button>
                <h3 className='text-base uppercase font-medium text-yellow-600 border-b pb-1 border-slate-300'>Sort by</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                    <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' checked={sortBy === 'asc'} onChange={handleOnChangeSortBy} value="asc" />
                        <label className="text-white">Price - Low to High</label>
                    </div>
                    <div className='flex items-center gap-3'>
                        <input type='radio' name='sortBy' checked={sortBy === 'dsc'} onChange={handleOnChangeSortBy} value="dsc" />
                        <label className="text-white">Price - High to Low</label>
                    </div>
                </form>
                <h3 className='text-base uppercase font-medium text-yellow-600 border-b pb-1 border-slate-300'>Category</h3>
                <form className='text-sm flex flex-col gap-2 py-2'>
                    {productCategory.map((category, index) => (
                        <div key={index} className='flex items-center gap-3'>
                            <input type='checkbox' name="category" checked={selectCategory[category?.value]} value={category?.value} id={category?.value} onChange={handleSelectCategory} />
                            <label htmlFor={category?.value} className="text-white">{category?.label}</label>
                        </div>
                    ))}
                </form>
            </div>

                )
              }

              </div>
              

             <div className='min-h-[calc(100vh-120px)] overflow-y-scroll max-h-[calc(100vh-120px)]' onClick={() => filterSearch && setFilterSearch(false)}>
              {
                  data.length !== 0 && !loading && (
                    <VerticalCard data={data} loading={loading}/>
                  )
              }
             </div>
            </div>


       </div>
       
    </div>
  )
}

export default CategoryProduct