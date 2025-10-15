import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { Service } from "./pages/Service";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { Error } from "./pages/Error";
import { Logout } from "./pages/logout";

import Navbar from "./components/Navbar";
import { Footer } from "./components/Footer/Footer";
import { AdminLayout } from "./components/layouts/admin-Layouts";
import  {AdminUsers}  from "./pages/Admin-Users";
import { AdminContacts } from "./pages/Admin-Contacts";
import { AdminUpdate } from "./pages/Admin-Update";

import ChatBot from "./pages/ChatBot";
import { SplashScreen } from "./pages/SplashScreen";

const App = () => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const splashShown = sessionStorage.getItem("splashShown");

    if (!splashShown) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
        sessionStorage.setItem("splashShown", "true");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/service" element={<Service />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />

        <Route path="*" element={<Error />} />

        <Route path="/admin/" element={<AdminLayout />}>
          <Route path="users" element={<AdminUsers />} />
          <Route path="contacts" element={<AdminContacts />} />
          <Route path="users/:id/edit" element={<AdminUpdate />} />
        </Route>
      </Routes>
      <Footer />
      <ChatBot />
    </BrowserRouter>
  );
};

export default App;
