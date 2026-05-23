import React, { useEffect, useState } from "react";
import axios from "axios";
import { Backendapi } from "../../Api.jsx"
import { useNavigate } from "react-router";


function Dashbaord() {
  let [person, setperson] = useState({})
  let [vloglength, setvloglength] = useState("");
  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${Backendapi}/users/check`, { withCredentials: true })
      .then(() => { })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login")
        }
      })
  }, [])

  useEffect(() => {
    axios.get(`${Backendapi}/vlogs/profile`,{withCredentials:true})
      .then((res) => {
        setperson(res.data.user)
        setvloglength(res.data.vloglength)
      }).catch((err) => {
        console.log("error", err);
      })
  }, [])

  function editprofilehandle() {
    navigate("/editprofile")
  }

  return (
    <div className="dashboard">
      <div className="top-section">
        <div className="left">
          <p>Welcome back.,</p>
          <h1>{person.username} 👋</h1>
          <p>Manage your profile, create new blogs, <br />and track your journey.</p>
        </div>
        <div className="right">
          <div className="container">
            <i class="fa-regular fa-pen-to-square" style={{ color: "#9d4edd" }}></i>
            <h3>Create New Blog</h3>
            <p>Share your thoughts</p>
          </div>
          <div className="container">
            <i class="fa-regular fa-file-lines" style={{ color: "#4ad66d" }}></i>
            <h3>My Blogs</h3>
            <p>View your stories</p>
          </div>
          <div className="container">
            <i class="fa-solid fa-chart-line" style={{ color: "#fdc921" }}></i>
            <h3>Dashboard</h3>
            <p>Track your progress</p>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <img src={person.userDP?.url} className="dashboard-image" style={{ objectFit: "cover" }} />
        <div className="content">
          <div className="top-section">
            <h4><i class="fa-regular fa-user"></i> User Profile</h4>
            <button onClick={editprofilehandle}><i class="fa-solid fa-pen"></i> Edit Profile</button>
          </div>
          <h1>{person.username} <i class="fa-solid fa-circle-check" style={{ color: "#5fa8ff" }}></i></h1>
          <p>Username : {person.username}</p>
          <p>Email : {person.email}</p>
          <p>My vlogs : {vloglength}</p>
        </div>
      </div>
    </div>
  )
}
export default Dashbaord
