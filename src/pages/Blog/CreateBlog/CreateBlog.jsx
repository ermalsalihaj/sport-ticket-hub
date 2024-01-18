import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './createBlog.css'; // Update the CSS file name if needed

const CreateBlog = () => {
  const defaultimage = "/sport-ticket-hub/src/images/UBT LOGO.png";

  const [blog, setBlog] = useState({
    title: '',
    content: '',
    createdAt: '', // Add the createdAt field
    userId: localStorage.getItem('userId') || '',
    comment: 's', // Add the comment field
    image: 's', // Add the image field
    imageSrc: defaultimage, // Add the imageSrc field
    imageFile: null, // Add the imageFile field
  });

  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setBlog((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setBlog((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!blog.title.trim() || !blog.content.trim()) {
      setFormError(true);
      return;
    }

    try {
      const formData = new FormData();
      formData.append('title', blog.title);
      formData.append('content', blog.content);
      formData.append('createdAt', blog.createdAt);
      formData.append('userId', blog.userId);
      formData.append('comment', blog.comment);
      formData.append('image', blog.image); // This should be the file name
      formData.append('imageFile', blog.imageFile); // This should be the file content

      const response = await axios.post('https://localhost:7051/api/Blog/PostBlog', formData);

      if (response.status === 201) {
        navigate('/');
        toast.success('Created Successfully!');
      } else {
        console.error('Unexpected status code:', response.status);
      }
    } catch (error) {
      if (error.response) {
        console.error('Validation Errors:', error.response.data.errors);
      }
    }
  };

  useEffect(() => {
    document.body.classList.add('body-with-create-blog');
    return () => {
      document.body.classList.remove('body-with-create-blog');
    };
  }, []);

  return (
    <div className="container">
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
      <div className="mb-3">
        <label htmlFor="image">Image:</label>
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleChange}
          name="image"
        />
      </div>
      <img src={blog.imageSrc} alt="" style={{ width: '250px' }} />
      {/* ... rest of the code ... */}
      <button className="btn btn-primary mt-2" onClick={handleClick}>
        Create Blog
      </button>
    </div>
  );
};

export default CreateBlog;
