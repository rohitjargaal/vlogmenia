import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { Backendapi } from '../../Api'
import { toast } from 'react-toastify'

function Homepage() {
  const navigate = useNavigate()
  const [vlogs, setVlogs] = useState([])
  const [data, setdata] = useState("")


  const getdata = (e) => {
    setdata(e.target.value);
  }

  useEffect(() => {
  axios.get(`${Backendapi}/users/check`, { withCredentials: true })
    .then(() => {
      axios.get(`${Backendapi}/vlogs/all`, { withCredentials: true })
        .then((res) => setVlogs(res.data.allVlog))
    })
    .catch((err) => {
      if (err.response?.status === 401) {
        navigate("/login")
        toast.error("Please login first");
      }
    })
}, [])


  const filterout = vlogs.filter((curvalue) => {
    return curvalue.title.toLowerCase().includes(data.toLowerCase());
  })



  return (
    <div className='homepage flex column'>
      <div className="hero-section column justifycenter aligncenter">
        <h1 className='black' style={{ fontSize: "50px" }}>Express Your thought with others</h1>
        <p className='white'>Nobody can you judge your thoughts and feeling please write something for express your thought and calm your mind with all stuffs </p>
      </div>
      <div className="midbar row aligncenter">
        <h2>This is enhance your skills to elaborate you memories to someone</h2>
        <input type="text" placeholder='Search...' onChange={getdata} />
      </div>
      <div className="card-group" >
        {filterout.map((vlog) => (
          <a href={`/blogs/${vlog._id}`} key={vlog._id} >
            <div className="card">
              <img src={vlog.image.url} />
              <div className="content">
                <p>{vlog.title}</p>
                <p>Location : {vlog.location}</p>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  )
}
export default Homepage
