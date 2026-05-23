import axios from "axios";
import React, { useEffect, useState } from "react";
import { Backendapi } from "../../Api.jsx"
import { toast } from "react-toastify";
import Loader from "../../compnents/Loader.jsx";
import { useNavigate } from "react-router";

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [image, setimage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
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



  async function addnewvloghandle(e) {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("location", location);
    if (image) {
      formData.append("image", image);
    }

    axios
      .post(
        `${Backendapi}/vlogs`, formData, { withCredentials: true, headers: { "Content-Type": "multipart/form-data" } })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message)
          naviagte("/home")
        } else {
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.log("this is addnewerror ", error);
      });
  }

  return (
    <>
      {isLoading ? (
        <Loader value="Blog creating ..." />
      ) : (
        <div className="newblog row">
          <div className="left column shadow">
            <h1>Create new vlog</h1>
            <p>Share your story, inspire others, and build your audience.</p>
            <div className="row aligncenter mt-1">
              <i className="fa-solid fa-pencil"></i>
              <div className="content">
                <h2>Easy to use</h2>
                <p>Create and publish your vlog in minutes</p>
              </div>
            </div>
            <div className="row aligncenter mt-1">
              <i className="fa-solid fa-image"></i>
              <div className="content">
                <h2>Add your vision</h2>
                <p>Upload stunning images that tell your story.</p>
              </div>
            </div>
            <div className="row aligncenter mt-1">
              <i className="fa-brands fa-chrome"></i>
              <div className="content">
                <h2>Reach everywhere</h2>
                <p>Share your thoughts with the world.</p>
              </div>
            </div>
          </div>
          <div className="right">
            <form onSubmit={addnewvloghandle}>
              <h1>Vlog Details</h1>
              <div className="input-container">
                <label>Title</label>
                <input type="text" placeholder="Enter title" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
              </div>
              <div className="input-container" >
                <label>Descriptions</label>
                <textarea rows="10" value={description} onChange={(e) => { setDescription(e.target.value) }} required placeholder="Write your vlog description here..."></textarea>
              </div>
              <div className="input-container" >
                <label>Locations</label>
                <input type="text" placeholder="Enter the location" value={location} onChange={(e) => { setLocation(e.target.value) }} required />
              </div>
              <div className="input-container" >
                <label>Cover Image</label>
                <input type="file" onChange={(e) => { setimage(e.target.files[0]) }} required />
              </div>
              <button type="submit" className="btn btn-primary width-100">
                <i className="fa-solid fa-rocket"></i> Create
              </button>
            </form>
          </div>
        </div>
      )}
    </>

  );
}

export default CreateBlog;