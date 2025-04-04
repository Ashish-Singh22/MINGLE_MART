import React, { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SummaryApi from "../common";
import AllReview from "./AllReview";

const AddReview = ({ product_id }) => {
    const user = useSelector(state => state?.user?.user);
    const [reviewRate, setReviewRate] = useState(false);
    const [refreshReviews, setRefreshReviews] = useState(0); // State to trigger re-render
    const [data, setData] = useState({
        comment: "",
        rating: "",
        userId: user?._id,
        productId: product_id,
        name: user?.name,
        profilePic: user?.profilePic
    });

    const ratingValue = [1, 2, 3, 4, 5];

    const handleReviewRateProduct = async () => {
        if (!user) {
            toast.error("Login First", { position: "top-center", autoClose: 3000 });
            return;
        }

        const response = await fetch(SummaryApi.checkProductInOrder.url, {
            method: SummaryApi.checkProductInOrder.method,
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ userId: user?._id, productId: product_id }),
        });

        const dataResponse = await response.json();
        if (dataResponse?.data?.length === 0) {
            toast.error("You cannot review without buying this product", { position: "top-center", autoClose: 3000 });
        } else {
            setReviewRate(true);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setReviewRate(false);
        
        const response = await fetch(SummaryApi.addReview.url, {
            method: SummaryApi.addReview.method,
            credentials: "include",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const dataResponse = await response.json();

        if (dataResponse.success) {
            toast.success(dataResponse?.message);
            setData({
                comment: "",
                rating: "",
                userId: user?._id,
                productId: product_id,
                name: user?.name,
                profilePic: user?.profilePic
            });
            setRefreshReviews(prev => prev + 1); // Trigger re-render of AllReview
        }

        if (dataResponse.error) {
            toast.error(dataResponse?.message);
        }
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <div className="flex flex-col gap-4">
                <button
                    className="p-2 bg-gradient-to-r from-black  to-green-600 text-white rounded-2xl text-lg hover:bg-gradient-to-r hover:from-green-600  hover:to-black"
                    onClick={handleReviewRateProduct}
                >
                    Rate and Review Product
                </button>

                {reviewRate && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-4 rounded-lg w-80 shadow-lg relative">
                            <div className="flex justify-between items-center pb-2 border-b">
                                <h2 className="font-bold text-lg">Rate and Review</h2>
                                <button className="text-xl hover:text-red-500" onClick={() => setReviewRate(false)}>✖</button>
                            </div>

                            <form className="grid gap-3 pt-3" onSubmit={handleSubmit}>
                                <label htmlFor="comment" className="text-sm font-medium">Comment:</label>
                                <input
                                    type="text"
                                    id="comment"
                                    placeholder="Enter your review"
                                    name="comment"
                                    value={data.comment}
                                    onChange={handleOnChange}
                                    className="p-2 border rounded-md text-sm w-full"
                                    required
                                />

                                <label htmlFor="rating" className="text-sm font-medium">Rating:</label>
                                <select
                                    required
                                    value={data.rating}
                                    name="rating"
                                    onChange={handleOnChange}
                                    className="p-2 border rounded-md text-sm w-full"
                                >
                                    <option value="">Select Rating</option>
                                    {ratingValue.map((el, index) => (
                                        <option key={index} value={el}>{el}</option>
                                    ))}
                                </select>

                                <button className="px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm mt-2">
                                    Submit Review
                                </button>
                            </form>
                        </div>
                    </div>
                )}
            </div>
            <div>
                <AllReview product_id={product_id} key={refreshReviews} />
            </div>
        </>
    );
};

export default AddReview;
