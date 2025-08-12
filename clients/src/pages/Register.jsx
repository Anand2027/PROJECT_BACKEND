import React from 'react';
import { useState } from 'react';

function Register() {

  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  // handling the input values
  const handleInput = (e) => {
    console.log(e);

    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value,
    })
  };


  // handling the form submission

  const handleSubmit =(e) =>{
    e.preventDefault();
    // alert(user)
    console.log(user)
  }

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

