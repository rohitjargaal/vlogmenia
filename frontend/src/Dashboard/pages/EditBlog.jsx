import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { Backendapi } from '../../Api';
import { toast } from "react-toastify"
import Loader from '../../compnents/Loader';


function EditBlog() {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");

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

    const [isLoading, setIsLoading] = useState(false);


    useEffect(() => {
        axios.get(`${Backendapi}/vlogs/${id}`, { withCredentials: true })
            .then((res) => {
                const vlog = res.data.vlog;
                setTitle(vlog.title);
                setDescription(vlog.description);
                setLocation(vlog.location);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const updatehandle = (e) => {
        e.preventDefault();
        setIsLoading(true)
        axios.put(`${Backendapi}/vlogs/${id}`, { title, description, location }, { withCredentials: true })
            .then((res) => {
                console.log(res);
                if (res.data.success) {
                    navigate(`/blogs/${id}`)
                    toast.success(res.data.message)
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };


    return (
        <>
            {isLoading && <Loader />}
            <div className='editblog-page'>
                <form className='shadow'>
                    <h1>Edit Blog</h1>
                    <div className="input-container">
                        <label >Title</label>
                        <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} required />
                    </div>
                    <div className="input-container">
                        <label>Descriptions</label>
                        <textarea style={{ fontSize: '1.1rem' }} rows="15" value={description} onChange={(e) => { setDescription(e.target.value) }} required></textarea>
                    </div>
                    <div className="input-container">
                        <label >Locations</label>
                        <input type="text" value={location} onChange={(e) => { setLocation(e.target.value) }} required />
                    </div>
                    <div className="input-container">
                        <button class="btn primary-btnclass" onClick={updatehandle}>Edit</button>
                    </div>
                </form>
            </div>
        </>

    )
}

export default EditBlog
