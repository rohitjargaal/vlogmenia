import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { toast } from 'react-toastify';
import { Backendapi } from "./Api";
import Loader from "./compnents/Loader.jsx";

function Signup() {
  let navigate = useNavigate();
  let [username, setUsername] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [image, setimage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formdata = new FormData();
  formdata.append("username", username)
  formdata.append("email", email)
  formdata.append("password", password)
  formdata.append("image", image)


  function Signuphandle(e) {
    e.preventDefault();
    setIsLoading(true)
    axios.post(`${Backendapi}/users/register`, formdata, { withCredentials: true }, { headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          toast.success("User Registered Successfully");
          navigate("/login")
        } else {
          toast.error("user exists")
        }
      })
      .catch((err) => {
        console.log(err)
      })

  }


  return (
    <>
      {isLoading ? <Loader value="Please wait user is regestering" /> :
        (
          <div className="signuppage row aligncenter justifycenter">
            <div className="card shadow">
              <div className="image">
                <img src="/media/images/login.svg" alt="" />
              </div>
              <form onSubmit={Signuphandle} className="flex column">
                <h1>Create a Account On <span style={{color:"#3a86ff"}}>Blogmenia</span></h1>
                <div className="input-container">
                  <label>Username</label>
                  <input type="text" onChange={(e) => { setUsername(e.target.value) }} />
                </div>
                <div className="input-container">
                  <label> Email address</label>
                  <input type="email" onChange={(e) => { setEmail(e.target.value) }} />
                </div>
                <div className="input-container">
                  <label> Password </label>
                  <input type="password" onChange={(e) => { setPassword(e.target.value) }} />
                </div>
                <div className="input-container">
                  <label> User Image </label>
                  <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} />
                </div>
                <a href="/login" className="btn-link">Already a user</a>
                <div className="buttonclass">
                  <button className="btnclass primary-btnclass">Signup</button>
                </div>
              </form>
            </div>
          </div>
        )
      }
    </>

  );
}

export default Signup;