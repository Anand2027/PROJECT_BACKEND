import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Login() {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { storeTokenInLS } = useAuth();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        storeTokenInLS(res_data.token);

        setUser({ email: "", password: "" });
        toast.success("Login Successful!!");
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <section className="bg-gray-50 py-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="/images/login.png"
            alt="Login illustration"
            className="w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Form */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center">
            Login Here
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="email" className="font-semibold mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                required
                autoComplete="off"
                value={user.email}
                onChange={handleInput}
                className="border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Password */}
            <div className="flex flex-col">
              <label htmlFor="password" className="font-semibold mb-1">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                required
                autoComplete="off"
                value={user.password}
                onChange={handleInput}
                className="border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-green-500 text-white font-bold py-3 rounded-xl shadow-lg hover:bg-green-600 hover:scale-105 transform transition duration-300"
            >
              Login Here
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Login;





// // Import React and required hooks
// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom';   // For redirecting user after login
// import { useAuth } from '../store/auth';          // Custom auth context for token handling

// function Login() {

//   // State to store user input values
//   const [user, setUser] = useState({
//     email: "",
//     password: "",
//   });

//   const navigate = useNavigate();          // Hook to programmatically navigate (redirect)
//   const { storeTokenInLS } = useAuth();    // Function from auth context to store JWT in localStorage

//   // Handle input changes (email & password fields)
//   const handleInput = (e) => {
//     let name = e.target.name;   // Field name (email or password)
//     let value = e.target.value; // Field value

//     // Update state dynamically based on input field
//     setUser({
//       ...user,
//       [name]: value,
//     })
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default page reload
//     console.log("Form submitted with:", user);

//     try {
//       // Send POST request to backend for login
//       const response = await fetch(`http://localhost:5000/api/auth/login`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",  // Tell server request body is JSON
//         },
//         body: JSON.stringify(user), // Send login credentials
//       });

//       console.log("Login response:", response);

//       if (response.ok) {
//         alert("Login Successful!!");

//         // Parse response JSON (contains JWT token from backend)
//         const res_data = await response.json();
        
//         // Store JWT token securely (here we use localStorage via custom hook)
//         storeTokenInLS(res_data.token);

//         // Clear form after successful login
//         setUser({
//           email: "",
//           password: ""
//         });

//         // Redirect user to home page
//         navigate("/");

//       } else {
//         // If credentials are wrong or server rejects
//         alert("Invalid credentials");
//         console.log("Invalid credentials");
//       }
//     } catch (error) {
//       // Handle network/server errors
//       console.log("Error during login:", error);
//     }
//   };

//   // UI Part (Form + Image)
//   return (
//     <section>
//       <main>
//         <div className="section-registration">
//           <div className="container grid grid-two-cols">
            
//             {/* Left side login illustration */}
//             <div className="registration-image">
//               <img
//                 src="/images/login.png"
//                 alt="fill the login form"
//                 width="500"
//                 height="500"
//               />
//             </div>

//             {/* Right side login form */}
//             <div className="registration-form">
//               <h1 className="main-heading mb-3">Login Here</h1>
//               <br />

//               {/* Login Form */}
//               <form onSubmit={handleSubmit}>
                
//                 {/* Email Input */}
//                 <div>
//                   <label htmlFor="email">Email</label>
//                   <input
//                     type="email"
//                     name="email"
//                     placeholder="Enter your email"
//                     id="email"
//                     required
//                     autoComplete="off"
//                     value={user.email}
//                     onChange={handleInput}
//                   />
//                 </div>

//                 {/* Password Input */}
//                 <div>
//                   <label htmlFor="password">Password</label>
//                   <input
//                     type="password"  // ✅ correct type for password field
//                     name="password"
//                     placeholder="Enter your password"
//                     id="password"
//                     required
//                     autoComplete="off"
//                     value={user.password}
//                     onChange={handleInput}
//                   />
//                 </div>

//                 <br />

//                 {/* Submit Button */}
//                 <button type="submit" className="btn btn-submit">
//                   Login Here
//                 </button>
//               </form>
//             </div>
//           </div>
//         </div>
//       </main>
//     </section>
//   )
// }

// export default Login;
