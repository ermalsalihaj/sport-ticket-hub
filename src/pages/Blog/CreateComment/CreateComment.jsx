import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { variables } from "../../../Variables";
import "../CreateBlog/createBlog.css"; // Update the CSS file name if needed

const CreateComment = () => {
  const { blogId } = useParams(); // Get the blogId from the URL
  const [blog, setBlog] = useState({});
  const [comment, setComment] = useState({
    name: localStorage.getItem("username") || "",
    email: "",
    createdAt: "",
    userId: localStorage.getItem("userId") || "",
    comments: "",
    blogId: blogId, // Set the blogId from the URL
  });

  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogDetails = async () => {
      try {
        const blogResponse = await axios.get(
          `https://localhost:7051/api/Blog/${blogId}`
        );
        setBlog(blogResponse.data);
      } catch (error) {
        console.error("Error fetching blog details:", error);
      }
    };

    fetchBlogDetails();
  }, [blogId]);

  const handleChange = (e) => {
    setComment((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      // Log the request body before making the request
      console.log("Request Body:", comment);

      const response = await axios.post(
        "https://localhost:7051/api/Comment",
        comment
      );

      console.log("Server Response:", response);

      if (response.status === 201) {
        navigate(`/blog/${blogId}`); // Redirect back to the blog details page
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
    <div className="container">
      <h2 className="s">Create a New Comment for "{blog.title}"</h2>
      {/* Display blog details here */}
      <p>Blog Content: {blog.content}</p>
      <p>Created At: {blog.createdAt}</p>

      <div className="mb-3">
        <input
          type="email"
          className="form-control"
          placeholder="Email (Optionally)"
          onChange={handleChange}
          name="email"
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Comment"
          onChange={handleChange}
          name="comments"
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
        Create Comment
      </button>
    </div>
  );
};

export default CreateComment;
