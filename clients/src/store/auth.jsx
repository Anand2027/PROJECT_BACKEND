import { useState, createContext, useContext , useEffect} from "react";

// 1. Create the context
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [token,setToken]= useState(localStorage.getItem("token"))
    const[user,setUser]= useState("")

    const[services,setServices]= useState([])


  // 2. Store token function
  const storeTokenInLS = (serverToken) => {
    setToken(serverToken)                                                     // 37.0
   return localStorage.setItem("token", serverToken);
  };

let isLoggedIn = !!token;
console.log("isLogIn", isLoggedIn)

//   tackling the logot functionality
const LogoutUser = () =>{
 setToken("")
 return localStorage.removeItem("token");
}

// JWT AUTHENTICATION - to get the currently loggedIN data

const userAuthentication = async()=>{
 try{
 const response = await fetch('http://localhost:5000/api/auth/user',{
  method:"GET",
  headers:{
    Authorization:`Bearer ${token}`,
  }
 })

if(response.ok){
  const data = await response.json()
  console.log("user data",data.userData)
  setUser(data.userData)
}

 } catch(error){
  console.log("Error fetching user data")
 }
}

 // to fetch the services data from the database
  const getServices = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/data/service`, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data.msg);
        setServices(data.msg);
      }
    } catch (error) {
      console.log(`services frontend error: ${error}`);
    }
  };



useEffect(()=>{
  getServices();
  userAuthentication()
},[])



  return (
    <AuthContext.Provider value={{isLoggedIn, storeTokenInLS,LogoutUser,user,services}}>
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