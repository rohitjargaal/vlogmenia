import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Backendapi } from '../../Api'
import { useNavigate } from 'react-router';



const Editprofile = () => {
  const [username, setusername] = useState("")
  const [email, setemail] = useState("")
  const [image, setimage] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const navigate = useNavigate();

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
    axios.get(`${Backendapi}/users/navbardata`, { withCredentials: true })
      .then((res) => {
        console.log(res)
        setusername(res.data.userdetail.username)
        setemail(res.data.userdetail.email)
        setImageUrl(res.data.userdetail.userDP?.url || '')
      })
      .catch((err) => {
        console.log(err)
      })
  }, [])

  function updateprofile(e) {
    e.preventDefault()
    const formdata = new FormData();
    formdata.append("username", username)
    formdata.append("email", email)
    if (image) {
      formdata.append("image", image);
    }
    axios.put(`${Backendapi}/users/updateuser`, formdata, {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => {
        console.log(res)
        if (res.data.success) {
          navigate("/dashboard")
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <div className="editprofile">

      <div className="main-content">
        <div className="top">
          <h1>Edit Profile</h1>
          <p>Update your information and profile picture</p>
        </div>
        <form onSubmit={updateprofile}>
          <div className="input-container column">
            <label><i className="fa-regular fa-user"></i> Username</label>
            <input type="text" value={username} onChange={(e) => { setusername(e.target.value) }} required />
          </div>
          <div className="input-container column">
            <label><i className="fa-regular fa-envelope"></i> Email</label>
            <input type="text" value={email} onChange={(e) => { setemail(e.target.value) }} required />
          </div>
          <div className="input-container column">
            <label><i className="fa-solid fa-image"></i> User Image</label><br></br>
            <div className='image-con'>{imageUrl && (<img src={imageUrl} />)}</div>
          </div>
          <div className="input-container column">
            <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} />
          </div>
          <button className='primary-btnclass width-100' >Update</button>
        </form>
        <div className="tips">
          <h1> <span><i className="fa-regular fa-lightbulb"></i></span> Tips</h1>
          <p>✓ Use a clear profile picture</p>
          <p>✓ Your image will be visible to other users</p>
          <p>✓ JPG, JPEG or PNG are allowed</p>
          <p>✓ Square image work best</p>
        </div>
      </div>
    </div>
  )
}

export default Editprofile
