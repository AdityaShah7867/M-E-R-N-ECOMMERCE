import React from 'react';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useAuth from '../Context/authContext';
import useProduct from '../Context/ProductContext';
import CartItem from '../components/CartItem';
import { NavLink } from 'react-router-dom';


const Cart = () => {
  const { setUserState, user } = useAuth();
  const { setCartState, Cart } = useProduct();

  const getTotals = () => {
    const total = Cart.reduce((acc, curr) => {
      acc += curr.price;
      return acc;
    }, 0);
    return total;
  };

  return (
    <div className='bg-gray-100 min-h-screen p-4 md:p-8'>
      <div className='flex flex-col md:flex-row'>
        <div className="md:p-6 flex-1">
          {Cart.map((product) => (
            <CartItem key={product._id} product={product} />
          ))}
        </div>
        <div className="md:ml-4 md:w-80 md:mt-0 mt-4">
          <div className="relative bg-gray-50 rounded-2xl p-4 shadow shadow-sky-800 flex flex-col justify-end gap-8 items-stretch">
            <div className="flex flex-row justify-between items-stretch">
              <svg
                className="stroke-blue-400 w-12 h-12 p-1 bg-sky-100 rounded-2xl"
                height="100"
                preserveAspectRatio="xMidYMid meet"
                viewBox="0 0 100 100"
                width="100"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M60.7,25v7.2m0,14.2v7.2m0,14.2V75M25,25a7.1,7.1,0,0,0-7.1,7.2V42.9a7.1,7.1,0,1,1,0,14.2V67.8A7.1,7.1,0,0,0,25,75H75a7.1,7.1,0,0,0,7.1-7.2V57.1a7.1,7.1,0,1,1,0-14.2V32.2A7.1,7.1,0,0,0,75,25Z" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="8">
                </path>
              </svg>
              <div className="">
                <span className="text-blue-400 font-semibold text-xl">Continue payment</span>
                <p className="text-base text-gray-600 md:w-56">Wait! have you finished adding proucts to cart, do you want to continue? </p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-xl md:text-2xl">TOTAL AMOUNT : ${getTotals()} </h1>
              <button className="border-2 border-blue-400 bg-blue-400 py-1 rounded text-gray-50 hover:bg-blue-300">Continue</button>
              <NavLink
              to='/home'
               className="border-2 border-blue-400 text-center py-1 rounded hover:bg-gray-100">See more Products
              </NavLink>

            </div>
            <div className="absolute top-3 right-2  text-red-300 hover:text-red-500">
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
