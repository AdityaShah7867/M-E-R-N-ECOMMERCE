import React, { createContext, useContext, useEffect, useState } from 'react';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
 
    const [Cart,setCart] = useState([]);

    useEffect(()=>{
        console.log(Cart);

    },[Cart])


    const setCartState =(newProduct)=>{
        setCart([
            ...Cart,
            newProduct
        ])
    }
    const ProductContextValue = {
        setCartState,
        Cart
    };

    return (
        <ProductContext.Provider value={ProductContextValue}>
            {children}
        </ProductContext.Provider>
    );
};


const useProduct = () =>{
    return useContext(ProductContext)
}

export default useProduct;