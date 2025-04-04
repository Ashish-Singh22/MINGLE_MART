import logo from './logo.svg';
import './App.css';
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { toast, ToastContainer,} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SummaryApi from './common';
import { useEffect, useState } from 'react';
import Context from './context';
import { useDispatch } from 'react-redux';
import { setUserDetails } from './store/userSlice';



function App() {
  const dispatch = useDispatch()
  const [cartProductCount,setCartProductCount] = useState(0)



  const fetchUserDetails = async()=>{
    const dataResponse = await fetch(SummaryApi.current_user.url,{
      method : SummaryApi.current_user.method,
      credentials : 'include'
    })

    const dataApi = await dataResponse.json()

    if(dataApi.success){
      dispatch(setUserDetails(dataApi.data))
    }
  }

  const fetchUserAddToCart = async()=>{

    const dataResponse = await fetch(SummaryApi.addToCartProductCount.url,{
      method : SummaryApi.addToCartProductCount.method,
      credentials : "include"
    })

    const dataApi = await dataResponse.json()

    setCartProductCount(dataApi?.data?.count)

  }

  const updateOrderImages = async () => {
    try {
      const response = await fetch(SummaryApi.updateOrderImage.url, {
        method: SummaryApi.updateOrderImage.method,
        credentials: "include"
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Order images updated successfully!");
      } else {
        toast.error("Failed to update order images.");
      }
    } catch (error) {
      console.error("Error updating order images:", error);
      toast.error("An error occurred while updating images.");
    }
  };
  const updateProductImages = async () => {
    try {
      const response = await fetch(SummaryApi.updateProductImage.url, {
        method: SummaryApi.updateProductImage.method,
        credentials: "include"
      });

      const result = await response.json();

      if (result.success) {
        toast.success("Product images updated successfully!");
      } else {
        toast.error("Failed to update Product images.");
      }
    } catch (error) {
      console.error("Error updating Product images:", error);
      toast.error("An error occurred while updating images.");
    }
  };

  useEffect(()=>{
    // userDetails 
     fetchUserDetails()
     //user details cart product
     
     fetchUserAddToCart()
    //  updateOrderImages()
    //  updateProductImages()
  },[])
  return (
    <>
    <Context.Provider value={{
        fetchUserDetails, // user detail fetch
        cartProductCount, // current user add to cart product count,
        fetchUserAddToCart 
    }}>
        <ToastContainer 
          position='top-center'
        />
        <Header/>
        <main className='min-h-[calc(100vh-120px)] pt-16'>
          <Outlet/>
        </main>
        <Footer/>
        </Context.Provider>
    </>
  
  );
}

export default App;
