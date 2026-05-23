import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Backendapi } from '../../Api';

function BlogDetail() {
  const { id } = useParams();
  const [vlog, setVlog] = useState({});
  const [author, setauthor] = useState("");
  const [loggedInUserId, setLoggedInUserId] = useState("");

  const navigate = useNavigate()

  useEffect(() => {
    axios.get(`${Backendapi}/users/check`, { withCredentials: true })
      .then(() => { })
      .catch((err) => {
        console.log(err)
        if (err.response?.status === 401) {
          navigate("/login")
        }
      })
  }, [])

  useEffect(() => {
    axios.get(`${Backendapi}/vlogs/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setVlog(res.data.vlog);
        setauthor(res.data.vlog.author.username)
        setLoggedInUserId(res.data.userid)
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const isAuthor = vlog.author && loggedInUserId === vlog.author._id;


  const handleDelete = () => {
    axios.delete(`${Backendapi}/vlogs/${id}`, { withCredentials: true })
      .then((res) => {
        console.log(res);
        if (res.data.success) {
          navigate(`/myblog`);
          toast.error(res.data.message)
        }
      })
      .catch((error) => {
        console.log('Delete error', error);
        toast.error(error.response.data.message)
      });
  };
  const handleEdit = () => {
    navigate(`/blogs/${id}/edit`);
  };

  return (
    <div className="detailBlog-page row justifycenter">
      <div className="card row shadow">
        <div className="image shadow">
          <img src={vlog.image?.url} alt="image error" />
        </div>
        <div className="content column">
          <h1>{vlog.title}</h1>
          <p><span>Description:</span> {vlog.description}</p>
          <p><span>Location:</span> {vlog.location}</p>
          <p><span>Author:</span> {author} </p>
          {isAuthor ? (
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: '20px' }}>
              <button className='primary-btnclass' onClick={handleEdit}>Edit</button>
              <button className='primary-btnclass' style={{ backgroundColor: "black" }} onClick={handleDelete}>Delete</button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default BlogDetail;