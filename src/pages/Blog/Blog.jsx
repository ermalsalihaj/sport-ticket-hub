// Blog.js

import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./blog.css";
import BlogDetails from "./BlogDetails"; 

const Blog = (props) => {
  const { reference } = props;
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

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  return (
    <section id="blog" className="blog" ref={reference}>
      <div
        style={{
          backgroundColor: "#192938",
          minHeight: "100vh",
          color: "#fff",
        }}
      >
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
            <div className="col-xl-4 col-lg-6 col-md-6" key={blog.id}>
              <Link to={`/blog/${blog.id}`} style={{ textDecoration: 'none' }}>
              <div className="gameCard p-3" style={{ height: "500px" }}>
                <img
                  className="img-fluid"
                  src={`https://localhost:7051/Images/${blog.image}`}
                  alt={blog.title}
                  style={{ maxHeight: "200px" }}
                />
                <div className="gameFeature mt-3">
                  <h3 className="gameType">{blog.title}</h3>
                  <p className="gameTitle mt-1 mb-2">Content: {blog.content}</p>
                  <p>Created: {formatDate(blog.createdAt)}</p>
                </div>
                {userRole === "admin" && (
                  <div className="gameButtons">
                    <Link to={`/update-blog/${blog.id}`}>
                      <button className="btn btn-primary mb-2">Update</button>
                    </Link>
                    <button
                      className="btn btn-danger mb-2 ml-2"
                      onClick={() => handleDelete(blog.id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
              </Link>
            </div>
          ))}
        </div>
        <Routes>
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </div>
    </section>
  );
};

export default Blog;
