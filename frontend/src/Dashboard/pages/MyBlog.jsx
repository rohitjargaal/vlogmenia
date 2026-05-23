import React, { useEffect, useState } from 'react'
import axios from "axios"
import { Backendapi } from '../../Api.jsx';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';

function MyBlog() {
  const [userVlogs, setUserVlogs] = useState([]);
  const navigate = useNavigate()
  const [data, setdata] = useState("")


  const getdata = (e) => {
    setdata(e.target.value);
    console.log(e.target.value)
  }
  useEffect(() => {
    axios.get(`${Backendapi}/users/check`, { withCredentials: true })
      .then(() => {
        axios.get(`${Backendapi}/vlogs/my`, { withCredentials: true })
          .then((res) => { setUserVlogs(res.data.vlogs) })
      })
      .catch((err) => {
        if (err.response?.status === 401) {
          navigate("/login")
        }
      })
  }, [])



  const filterout = userVlogs.filter((curvalue) => {
    return curvalue.title.toLowerCase().includes(data.toLowerCase());
  })

  return (
    <div className="myvlog">
      <h2 style={{ textAlign: "center" }}>My Vlogs</h2>
      <input type="text" placeholder='Search...' onChange={getdata} />
      <div className="card-group">
        {userVlogs.length === 0 ?
          <div className="column aligncenter justifycenter" style={{ width: "100%" }}>
            <img className="vlognotfound" src="media/images/vlognotfound.png" alt="No Blog" style={{ height: "50vh", width: "100%", objectFit: "contain" }} />
          </div>
          : filterout.map((vlog) => (
            <a href={`/blogs/${vlog._id}`} key={vlog._id}>
              <div className="card">
                <img src={vlog.image.url} alt="image error" />
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

export default MyBlog
