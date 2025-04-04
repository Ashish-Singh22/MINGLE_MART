import React, { useEffect, useRef, useState } from "react";
import SummaryApi from "../common";
import { useSelector } from "react-redux";
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa6';
import { MdDelete } from "react-icons/md";

const AllReview = ({ product_id }) => {
    const user = useSelector(state => state?.user?.user);
    const [allReview, setAllReview] = useState([]);
    const scrollElement = useRef();
    const [loading, setLoading] = useState(true);
    const [averageRating, setAverageRating] = useState(null);

    const fetchAllReview = async () => {
        setLoading(true);
        const response = await fetch(SummaryApi.allReview.url, {
            method: SummaryApi.allReview.method,
            credentials: "include",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ productId: product_id })
        });

        const dataResponse = await response.json();
        const reviews = dataResponse?.data || [];
        setAllReview(reviews);
        setLoading(false);

        // Calculate average rating
        if (reviews.length > 0) {
            const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
            setAverageRating((totalRating / reviews.length).toFixed(1));
        } else {
            setAverageRating(null);
        }
    };

    useEffect(() => {
        fetchAllReview();
    }, []);

    const handleDeleteReview = async (reviewId) => {
        try {
            const response = await fetch(SummaryApi.deleteReview.url, {
                method: SummaryApi.deleteReview.method,
                credentials: "include",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ reviewId })
            });

            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }

            // Remove the deleted review from state
            setAllReview(prevReviews => {
                const updatedReviews = prevReviews.filter(review => review._id !== reviewId);
                
                // Recalculate the average rating
                if (updatedReviews.length > 0) {
                    const totalRating = updatedReviews.reduce((sum, review) => sum + review.rating, 0);
                    setAverageRating((totalRating / updatedReviews.length).toFixed(1));
                } else {
                    setAverageRating(null);
                }

                return updatedReviews;
            });

        } catch (error) {
            console.error("Error deleting review:", error.message);
            alert("Failed to delete review. Please try again.");
        }
    };

    const scrollRight = () => scrollElement.current.scrollLeft += 300;
    const scrollLeft = () => scrollElement.current.scrollLeft -= 300;

    // Sorting Logic: Show current user's reviews first if not an admin
    const sortedReviews = user?.role === "ADMIN"
        ? allReview
        : [
            ...allReview.filter(review => review.userId === user?._id),  
            ...allReview.filter(review => review.userId !== user?._id)   
          ];

    const loadingList = new Array(3).fill(null);

    return (
        <div className='mx-auto px-4 my-6 relative'>
            <h2 className='text-2xl font-semibold text-yellow-600 py-4'>Reviews:</h2>

            {/* Show average rating if available */}
            {averageRating && (
                <p className="text-xl font-semibold text-yellow-400">
                    Average Rating: {averageRating} ⭐
                </p>
            )}

            {/* Scroll Buttons */}
            <button 
                className='absolute left-0 bottom-16 bg-yellow-600 text-white p-2 rounded-full shadow-md hover:bg-yellow-500' 
                onClick={scrollLeft}
            >
                <FaAngleLeft />
            </button>
            <button 
                className='absolute right-0 bottom-16 bg-yellow-600 text-white p-2 rounded-full shadow-md hover:bg-yellow-500' 
                onClick={scrollRight}
            >
                <FaAngleRight />
            </button> 

            {/* Review List */}
            <div className='flex items-center gap-4 overflow-scroll scrollbar-none' ref={scrollElement}>
                {loading ? (
                    loadingList.map((_, index) => (
                        <div key={index} className='w-full min-w-[280px] md:min-w-[320px] max-w-[280px] md:max-w-[320px] h-36 bg-white rounded-sm shadow flex'>
                            <div className='p-4 grid w-full gap-2'>
                                <h2 className='font-medium text-base md:text-lg text-ellipsis line-clamp-1 text-black bg-slate-200 animate-pulse p-1 rounded-full'></h2>
                                <p className='capitalize text-slate-500 p-1 bg-slate-200 animate-pulse rounded-full'></p>
                                <div className='flex gap-3 w-full'>
                                    <p className='text-red-600 font-medium p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                    <p className='text-slate-500 line-through p-1 bg-slate-200 w-full animate-pulse rounded-full'></p>
                                </div>
                                <button className='text-sm text-white px-3 py-0.5 rounded-full w-full bg-slate-200 animate-pulse'></button>
                            </div>
                        </div>
                    ))
                ) : sortedReviews.length > 0 ? (
                    sortedReviews.map((review, index) => {
                        const canEditOrDelete = user?.role === "ADMIN" || review.userId === user?._id;

                        return (
                            <div key={review?._id} className='w-full min-w-[280px] md:min-w-[320px] max-w-[320px] h-fit p-4 flex flex-col gap-2 bg-gradient-to-r from-black via-black to-yellow-950 hover:from-yellow-950 hover:to-black rounded-md shadow'>

                                <div className="flex justify-between">
                                    <div className="flex gap-2">
                                        <img src={review?.profilePic} className='w-10 h-10 rounded-full p-0.5 bg-gradient-to-r from-black to-yellow-600' alt={review?.name} />
                                        <p className="font-medium text-lg text-yellow-600">{review?.name}</p>                    
                                    </div>
                                    {canEditOrDelete && (
                                        <MdDelete 
                                            className="text-white bg-red-600 p-1 rounded-full text-2xl hover:text-3xl hover:bg-white hover:text-red-600 cursor-pointer"
                                            onClick={() => handleDeleteReview(review._id)}
                                        />
                                    )}
                                </div>
                                
                                <div>
                                    <h2 className='text-lg text-white line-clamp-2'>{review.comment}</h2>
                                    <div className="flex justify-between mt-2">
                                        <p className='font-bold text-xl text-yellow-400'>{review.rating} ⭐</p> 
                                    </div>    
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <p className="text-white">No reviews found.</p>
                )}
            </div>
        </div>
    );
};

export default AllReview;
