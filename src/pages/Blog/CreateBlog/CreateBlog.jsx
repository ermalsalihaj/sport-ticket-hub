import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { variables } from '../../../Variables';
import "./createBlog.css"; // Update the CSS file name if needed
import { toast } from 'react-toastify';

const CreateBlog = () => {
  

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    createdAt: "", // Add the createdAt field
    userId:localStorage.getItem("userId") || "",
    comment: "", // Add the createdAt field

  });

  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
  
    if (!blog.title.trim() || !blog.content.trim()) {
      setFormError(true);
      return;
    }
  
    try {
      // Log the request body before making the request
      console.log("Request Body:", blog);
  
      const response = await axios.post("https://localhost:7051/api/Blog/PostBlog", blog);
      
      console.log("Server Response:", response);
  
      if (response.status === 201) {
        navigate("/");
        toast.success(" Created Successfully! ");
      } else {
        console.error("Unexpected status code:", response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error("Validation Errors:", error.response.data.errors);
      } 
    }
  };

  useEffect(() => {
    document.body.classList.add("body-with-create-blog");
    return () => {
      document.body.classList.remove("body-with-create-blog");
    };
  }, []);

  return (
    <div className='container'>
      <h2 className="s">Create a New Blog</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          onChange={handleChange}
          name="title"
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Content"
          onChange={handleChange}
          name="content"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="createdAt">Creation Date:</label>
        <input
          type="date"
          className="form-control"
          onChange={handleChange}
          name="createdAt"
        />
      </div>
      {formError && (
        <p className="error-message">Please fill in all required fields.</p>
      )}
      <button className="btn btn-primary mt-2" onClick={handleClick}>
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlog;
