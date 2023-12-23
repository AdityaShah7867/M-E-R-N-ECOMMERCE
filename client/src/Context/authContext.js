import React, { createContext, useContext, useEffect, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
 
    const [user,setUser] = useState(null);

    useEffect(()=>{
        console.log(user);

    },[user])


    const setUserState =(newUser)=>{
        setUser(newUser)
    }
    const authContextValue = {
        setUserState,
        user
    };

    return (
        <AuthContext.Provider value={authContextValue}>
            {children}
        </AuthContext.Provider>
    );
};


const useAuth = () =>{
    return useContext(AuthContext)
}

export default useAuth;