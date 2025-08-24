import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home"; // make sure Home component exists
import About from "./pages/About";
import Contact from "./pages/Contact"; // make sure Home component exists
import {Service} from "./pages/Service";
import Register from "./pages/Register"; // make sure Home component exists
import Login from "./pages/Login";
import { Error } from "./pages/Error";
import {Logout} from "./pages/logout";

import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer/Footer";




const App = () => {
  return (
    <>
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route path="/" element={<Home />} />
           <Route path="/about" element={<About />} />
           <Route path="/contact" element={<Contact/>} />
            <Route path="/service" element={<Service/>} />
            <Route path="/register" element={<Register/>} />
           <Route path="/login" element={<Login />} />
           <Route path="*"  element={<Error/>} />
           <Route path="/logout" element={<Logout/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter>
    </>
  );
};

export default App;