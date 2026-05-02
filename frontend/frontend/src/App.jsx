import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Landing from "./components/LandingPage/index"
import Login from "./pages/Auth/Login.jsx"
import Signup from "./pages/Auth/Signup.jsx"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
<Routes>
     <Route path="/" element={<Landing />} />
        {/* <Route element={<AuthLayout />}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        {/* </Route> */}

      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </BrowserRouter>
  );
}

export default App;
