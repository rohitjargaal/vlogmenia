import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from 'react-toastify';
import { Backendapi } from "./Api";
import { useNavigate } from "react-router";
import Loader from "./compnents/Loader.jsx";
import { Link } from "react-router";

function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  const navigate = useNavigate()

  function Loginhandle(e) {
    e.preventDefault();
    setIsLoading(true)
    axios.post(`${Backendapi}/users/login`, { email, password }, { withCredentials: true })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/home")
        }
      })
      .catch((err) => {
        toast.error(err.response?.data?.message);
        navigate("/");
      });
  }
  return (
    <div className="loginpage row aligncenter justifycenter">
      <div className="card shadow">
        <div className="image">
          <img src="/media/images/login.svg" alt="" />
        </div>
        <form onSubmit={Loginhandle} className="flex column">
          <h1>Login In <span style={{ color: "#3a86ff" }}>Blogmenia</span></h1>
          <div className="input-container">
            <label >Email</label>
            <input type="text" onChange={(e) => { setEmail(e.target.value) }} />
          </div>
          <div className="input-container">
            <label>Password</label>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
          </div>
          <Link to="/signup" className="btn-link">Don't have account ? Create a Account</Link>
          <div className="buttonclass">
            <button className="btnclass primary-btnclass">Log in</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
