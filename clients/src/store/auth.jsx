import { createContext, useContext } from "react";

// 1. Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  // 2. Store token function
  const storeTokenInLS = (serverToken) => {
    localStorage.setItem("token", serverToken);
  };

  return (
    <AuthContext.Provider value={{ storeTokenInLS }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook to use AuthContext
export const useAuth = () => {
  const authContextValue = useContext(AuthContext);
  if (!authContextValue) {
    throw new Error("useAuth must be used inside an AuthProvider");
  }
  return authContextValue;
};


























// import {createContext, useContext} from "react"

// export const AuthProvider =({children})=>{
//     const storeTokens = (servertoken)=>{
//         return localStorage.setItem("token",serverToken);
//     }
//         return(
//             <AuthContext.Provider value={{storeTokenInLS}}>
//                 {children}
//                 </AuthContext.Provider>
   
//         )
//     }

//     export const useAuth =()=>{    
//         const authContextValue = useContext(AuthContext);
//         if(!authContextValue){
//             throw new Error("useAuth used outside of the Provider")
//         }
//         return authContextValue
//     }