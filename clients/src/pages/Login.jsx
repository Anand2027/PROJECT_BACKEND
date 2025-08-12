import React, { useState } from 'react'

function Login() {

 const [user, setUser] = useState({
    
    email: "",
    password: "",
  });


   const handleInput = (e) => {
    console.log(e);

    let name = e.target.name;
    let value = e.target.value;

    setUser({
      ...user,
      [name]:value,
    })
  };

    const handleSubmit =(e) =>{
    e.preventDefault();
    // alert(user)
    console.log(user)
  }



  return (
       <section>
        <main>
          <div className="section-registration">
            <div className="container grid grid-two-cols">
              <div className="registration-image">
                <img
                  src="/images/login.png"
                  alt="fill the login form"
                  width="500"
                  height="500"
                />
              </div>

              <div className="registration-form">
                <h1 className="main-heading mb-3">Registration Form</h1>
                <br />

                <form onSubmit={handleSubmit}>
                

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
                    Login Here
                  </button>
                </form>
              </div>
            </div>
          </div>
        </main>
      </section>
  )
}

export default Login
