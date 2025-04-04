import React from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../pages/Login";
import SignUp from "../pages/SignUp";
import ForgotPassword from "../pages/ForgotPassword";
import AdminPanel from "../pages/AdminPanel";
import AllUsers from "../pages/AllUsers";
import AllProducts from "../pages/AllProducts";
import CategoryProduct from "../pages/CategoryProduct";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import SearchProduct from "../pages/SearchProduct";
import Success from "../pages/Success";
import Cancel from "../pages/Cancel";
import Order from "../pages/Order";
import AllOrder from "../pages/AllOrder";
import Dashboard from "../pages/Dashboard";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "forgot-password",
                element: <ForgotPassword />,
            },
            {
                path: "sign-up",
                element: <SignUp />,
            },
            {
                path : "product-category",
                element : <CategoryProduct/>
            },
            {
                path : "product/:id",
                element : <ProductDetails/>
            },
            {
                path : "cart",
                element : <Cart/>
            },
            {
                path : "success",
                element : <Success/>
            },
            {
                path : "cancel",
                element : <Cancel/>
            },
            {
                path : "search",
                element : <SearchProduct/>

            },
            {
                path : "search/product/:id",
                element : <ProductDetails/>
            },
            {
                path : "order",
                element : <Order/>
            },
            {
                path: "admin-panel",
                element: <AdminPanel />,
                children: [
                    {
                        path: "all-users", // Removed leading '/'
                        element: <AllUsers />,
                    },
                    {
                        path: "all-products", // Removed leading '/'
                        element: <AllProducts />,
                    },
                    {
                        path : "all-order", // Removed leading '/'
                        element: <AllOrder/>
                    },
                    {
                        path : "dashboard",
                        element : <Dashboard/>
                    },
                ],
            },
        ],
    },
]);

export default router;
