import React, { useEffect } from 'react'
import { Backendapi } from '../../Api'
import axios from 'axios'
import { useNavigate } from 'react-router'

function About() {

  const navigate = useNavigate()
  useEffect(() => {
    axios.get(`${Backendapi}/users/check`, { withCredentials: true })
      .then(() => {})
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login")
        }
      })
  }, [])
  return (
    <div className="aboutpage column justifycenter" style={{textAlign:"center",gap:"1rem"}}>
      <h1>About Page</h1>
      <p>Learn more about our mission, values, an the promise we keep to our users.</p>
      <img src='/media/images/img2.png' style={{width:"100%",height:'50vh',objectFit:"contain"}} />
      <h2>This website is for your daily use and i secure your data from hackers and virus be comfortable with us.....</h2><br></br>
      <p>This is end to end encryptions</p>
    </div>
  )
}

export default About
