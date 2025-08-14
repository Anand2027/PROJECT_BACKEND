import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/auth';

function Login() {

 const [user, setUser] = useState({
    
    email: "",
    password: "",
  });


  const navigate = useNavigate();
const {storeTokenInLS} = useAuth();

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
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      console.log("login form",response)

      if(response.ok){
        alert("Login Successful!!")

        const res_data = await response.json();
        
        // stored the token in localhost
        storeTokenInLS(res_data.token)
        // localStorage.setItem("token",res_data.token)
        

        setUser({
          email:"",
          password:""
      });

      navigate("/")

      }else{
        alert("invalid credentials");
        console.log("invalid credentials")
      }
    } catch (error) {
      console.log( error);
    }
  };




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
                <h1 className="main-heading mb-3">Login Here</h1>
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
