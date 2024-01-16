// Blog.js

import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogDetails from "./BlogDetails"; // Import the new component

const Blog = () => {
  const [blogs, setBlog] = useState([]);
  const userRole = localStorage.getItem("role");
  const userName = localStorage.getItem("username");
  const userId = localStorage.getItem("UserId");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const blogResponse = await axios.get("https://localhost:7051/api/Blog");
        setBlog(blogResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this blog?")) {
        await axios.delete(`https://localhost:7051/api/Blog/${id}`);
        window.location.reload();
        toast.success(" Blog Deleted! ");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div style={{ backgroundColor: "#192938", minHeight: "100vh", color: "#fff" }}>
      <ToastContainer />
      <div className="col-lg-6">
        <h4 className="sectionTitle">Blogs</h4>
        {userRole === "admin" && (
          <>
            <Link to="/create-blog">
              <button className="btn btn-warning">Create Blog</button>
            </Link>
          </>
        )}
      </div>
      <div className="row mb-4 mt-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-xl-3 col-lg-4 col-md-6">
            <Link to={`/blog/${blog.id}`}>
              <div className="gameCard">
                <img className="img-fluid" alt="" />
                <div className="gameFeature">
                  <span className="gameType">{blog.title}</span>
                </div>
                <div className="gamePrice">
                  <h3 className="gameTitle mt-4 mb-3">Content: {blog.content}</h3>
                  <span className="currentPrice">Created: {blog.createdAt}</span>
                  {userRole === "admin" && (
                    <>
                      <Link to={`/update-blog/${blog.id}`}>
                        <button className="btn btn-primary">Update</button>
                      </Link>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(blog.id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
      {/* Use <Routes> instead of <Route> */}
      <Routes>
        <Route path="/blog/:id" element={<BlogDetails />} />
      </Routes>
    </div>
  );
};

export default Blog;
