import React from 'react'
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import "./index.css"
import "./responsive.css"
import Homepage from "./Landingpage/Pages/Homepage"
import About from "./Landingpage/Pages/About"
import Contact from "./Landingpage/Pages/Contact"
import Signup from "./Signup"
import Login from "./Login"
import Dashbaord from "./Dashboard/pages/Dashbaord"
import Editprofile from "./Dashboard/pages/Editprofile"
import Navbar from './compnents/Navbar'
import Footer from './compnents/Footer'
import axios from 'axios'
import BlogDetail from './Dashboard/pages/BlogDetail'
import EditBlog from './Dashboard/pages/EditBlog'
import CreateBlog from './Dashboard/pages/CreateBlog'
import MyBlog from './Dashboard/pages/MyBlog'



function App() {
  const location = useLocation();

  if (location.pathname === "/login" || location.pathname === "/signup") {
    return (
      <Routes>
        <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
      </Routes>
    )
  } else {
    return (
      <>
        <Navbar />
        <div className="body-elements">
          <Routes>
            <Route path='/' element={<Navigate to="/login" replace />} />
            <Route path='/home' element={<Homepage />} />
            <Route path='/about' element={<About />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/dashboard' element={<Dashbaord />} />
            <Route path='/create' element={<CreateBlog />} />
            <Route path='/myblog' element={<MyBlog />} />
            <Route path="/blogs/:id/" element={<BlogDetail />} />
            <Route path="/blogs/:id/edit" element={<EditBlog />} />
            <Route path="/editprofile" element={<Editprofile />} />
          </Routes>
        </div>
        <Footer />
      </>
    )
  }

}

export default App
