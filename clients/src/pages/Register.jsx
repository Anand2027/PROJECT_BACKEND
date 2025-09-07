import React from 'react';
import { useState } from 'react';
import {useNavigate} from "react-router-dom"
import { useAuth } from '../store/auth';
import { toast } from 'react-toastify';

function Register() {
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // use of navigate to other
  const navigate = useNavigate();
const {storeTokenInLS} = useAuth();

  // handling the input values
  const handleInput = (e) => {
    console.log(e);
    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]: value,
    });
  };

  // handling the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });
      
      const res_data = await response.json();
      console.log("res from server",res_data)

      if(response.ok){

        // stored the token in localhost
        // storeTokenInLS(res_data.token)
        localStorage.setItem("token",res_data.extraDetails)
        
        setUser({
          username:"",
          email:"",
          phone:"",
          password:""
      });

      toast.success("Registration Successful!!")
      // use navigate to send login
      navigate("/")
      } else{
        toast.error(res_data.extraDetails ? res_data.extraDetails : res_data.message)
      }

      
    } catch (error) {
      console.log("register", error);
    }
  };

  return (
    <>
      <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/register.png"
                  alt="try to fill form"
                  width="500"
                  height="500"
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                  <div>
                    <label htmlFor="username">username</label>
                    <input
                      type="text"
                      name="username"
                      placeholder="Enter your username"
                      id="username"
                      required
                      autoComplete="off"
                      value={user.username}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      id="email"
                      required
                      autoComplete="off"
                       value={user.email}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="phone">Phone</label>
                    <input
                      type="number"
                      name="phone"
                      placeholder="Enter your phone number"
                      id="phone"
                      required
                      autoComplete="off"
                       value={user.phone}
                      onChange={handleInput}
                    />
                  </div>

                  <div>
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"  // ✅ fixed invalid type
                      name="password"
                      placeholder="put your password"
                      id="password"
                      required
                      autoComplete="off"
                       value={user.password}
                      onChange={handleInput}
                    />
                  </div>

                  <br />

                  <button type="submit" className="btn btn-submit">
                    Register Now
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
    </>
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

