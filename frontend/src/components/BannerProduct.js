import React, { useEffect, useState } from "react";
import image1 from '../assest/assest/banner/img1.webp'
import image2 from '../assest/assest/banner/img2.webp'
import image3 from '../assest/assest/banner/img3.jpg'
import image4 from '../assest/assest/banner/img4.jpg'
import image5 from '../assest/assest/banner/img5.webp'


import image1Mobile from '../assest/assest/banner/img1_mobile.jpg'
import image2Mobile from '../assest/assest/banner/img2_mobile.webp'
import image3Mobile from '../assest/assest/banner/img3_mobile.jpg'
import image4Mobile from '../assest/assest/banner/img4_mobile.jpg'
import image5Mobile from '../assest/assest/banner/img5_mobile.png'

import { FaAngleRight } from "react-icons/fa6";
import { FaAngleLeft } from "react-icons/fa6";

const BannerProduct = ()=>{
    const [currentImage,setCurrentImage]= useState(0)

    const desktopImages = [
        image1,
        image2,
        image3,
        image4,
        image5,
    ]

    const mobileImages = [
        image1Mobile,
        image2Mobile,
        image3Mobile,
        image4Mobile,
        image5Mobile
    ]

    const nextImage = ()=>{
        if(desktopImages.length-1 > currentImage)
        {
            setCurrentImage(preve => preve+1)
        }
        else{
            setCurrentImage(0)
        }
    }

    const preveImage = () =>{
        if(currentImage != 0){
            setCurrentImage(preve => preve - 1)
        }
        else{
            setCurrentImage(desktopImages.length-1)
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            nextImage();
        }, 5000); // Automatically switch images every 5 seconds
    
        return () => clearInterval(interval); // Cleanup interval on unmount
    }, [currentImage]);
    console.log(currentImage)

    return(
        <>
          <div className=' mx-auto px-8 rounded-xl' >

            <div className="h-56 md:h-72 w-full bg-slate-200 relative">

               

            <div className='absolute z-10 h-full w-full md:flex items-center hidden '>
                    <div className=' flex justify-between w-full text-2xl'>
                        <button onClick={preveImage} className='bg-gradient-to-r from-white to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-white shadow-md rounded-full p-2'><FaAngleLeft/></button>
                        <button onClick={nextImage} className='bg-gradient-to-r from-white to-yellow-600 hover:bg-gradient-to-r hover:from-yellow-600 hover:to-white shadow-md rounded-full p-1'><FaAngleRight/></button> 
                    </div>
                </div>
            

            {/* desktop and tablet version  */}
            <div className='hidden md:flex h-full w-full overflow-hidden'>
                {
                        desktopImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full'/>
                            </div>
                            )
                        })
                }
              </div>

           {/* mobile version */}
              <div className='flex h-full w-full overflow-hidden md:hidden'>
                {
                        mobileImages.map((imageURl,index)=>{
                            return(
                            <div className='w-full h-full min-w-full min-h-full transition-all' key={imageURl} style={{transform : `translateX(-${currentImage * 100}%)`}}>
                                <img src={imageURl} className='w-full h-full object-cover'/>
                            </div>
                            )
                        })
                }
              </div>

              </div>
          </div>
           

        </>
    )


}

export default BannerProduct;