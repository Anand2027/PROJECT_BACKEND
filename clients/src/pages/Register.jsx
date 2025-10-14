import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
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
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });

      const res_data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", res_data.extraDetails);
        setUser({ username: "", email: "", phone: "", password: "" });
        toast.success("Registration Successful!!");
        navigate("/");
      } else {
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message);
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <section className="bg-gray-50 py-20 min-h-screen flex items-center">
      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div className="flex justify-center">
          <img
            src="/images/register.png"
            alt="try to fill form"
            className="w-full max-w-md rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500"
          />
        </div>

        {/* Form */}
        <div className="bg-white p-10 rounded-2xl shadow-2xl">
          <h1 className="text-4xl font-extrabold text-green-600 mb-8 text-center">
            Registration Form
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div className="flex flex-col">
              <label htmlFor="username" className="font-semibold mb-1">
                Username
              </label>
              <input
                type="text"
                name="username"
                id="username"
                placeholder="Enter your username"
                required
                autoComplete="off"
                value={user.username}
                onChange={handleInput}
                className="border-2 border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-green-500 transition"
              />
            </div>

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

            {/* Phone */}
            <div className="flex flex-col">
              <label htmlFor="phone" className="font-semibold mb-1">
                Phone
              </label>
              <input
                type="number"
                name="phone"
                id="phone"
                placeholder="Enter your phone number"
                required
                autoComplete="off"
                value={user.phone}
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
              Register Now
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Register;



















































// import React from 'react'

// function Register() {
//   return (
// <>
// <section>
//   <main>
//     <div className="section-registration">
//       <div className="container grid grid-two-cols">
//         <div className="registration-image">
//           <img src="/images/register.png " alt='try to fill form'
//           width="500" height="500 "
//           />
//         </div>


// <div className="registration-form">
//   <h1 className='main-heading mb-3'>registration form</h1>
//   <br/>

//   <form>
//     <div>
//      <label htmlFor='username'>username</label>
//       <input 
//       type="text" 
//       name="username" 
//        placeholder='enter your name'
//        id='username'
//        required
//        autoComplete='off' />
//     </div>

// <div>
//      <label htmlFor='email'>email</label>
//       <input 
//       type="text" 
//       name="email" 
//        placeholder='enter your email'
//        id='email'
//        required
//        autoComplete='off' />
//     </div>


//     <div>
//      <label htmlFor='phone'>phone</label>
//       <input 
//       type="number" 
//       name="phone" 
//        placeholder='enter your phone number'
//        id='phone'
//        required
//        autoComplete='off' />
//     </div>


//     <div>
//      <label htmlFor='username'>username</label>
//       <input 
//       type="username" 
//       name="username" 
//        placeholder='enter your name'
//        id='username'
//        required
//        autoComplete='off' />
//     </div>

//     <br></br>

//     <button type="submit" className='btn btn-submit'>Register Now</button>

//   </form>
// </div>
//       </div>
//     </div>
//   </main>
// </section>

// </>
//   )
// }

// export default Register

