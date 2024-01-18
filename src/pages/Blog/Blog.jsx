// Blog.js

import React, { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./blog.css";
import BlogDetails from "./BlogDetails"; // Import the new component

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
        <div>
          {/* className="row mb-4 mt-4" */}
          {blogs.map((blog) => (
            <div key={blog.id}>
              {/* className="col-xl-3 col-lg-4 col-md-6" */}
              <Link to={`/blog/${blog.id}`}>
                {/* <div className="gameCard"> */}
                <div className="leftcolumn">
                  <img className="img-fluid" alt="" />
                  <div className="card">
                    <div className="gameFeature">
                      <h2 className="gameType">{blog.title}</h2>
                    </div>
                    {/* <div className="gamePrice"> */}
                    <h5 className="gameTitle mt-4 mb-3">
                      Content: {blog.content}
                    </h5>
                    <p>Created: {formatDate(blog.createdAt)}</p>
                    {userRole === "admin" && (
                      <>
                        <Link to={`/update-blog/${blog.id}`}>
                          <button className="btn btn-primary" id="update">Update</button>
                        </Link>
                        
                        <button
                          className="btn btn-danger"
                          id="update"
                          onClick={() => handleDelete(blog.id)}
                        >
                          Delete
                        </button>
                      </>
                    )}
                    {/* </div> */}
                  </div>
                </div>
                {/* </div> */}
              </Link>
            </div>
          ))}
        </div>
        <div class="row">
          {/* <div class="leftcolumn">
            <div class="card">
              <h2>TITLE HEADING</h2>
              <h5>Title description, Dec 7, 2017</h5>
              <p>Some text..</p>
            </div>
          </div> */}
          {/* <div class="rightcolumn">
    <div class="card">
      <h2>About Me</h2>
      <div class="fakeimg" style={{height:'100px'}}>Image</div>
      <p>Some text about me in culpa qui officia deserunt mollit anim..</p>
    </div>
  </div> */}
        </div>
        {/* Use <Routes> instead of <Route> */}
        <Routes>
          <Route path="/blog/:id" element={<BlogDetails />} />
        </Routes>
      </div>
    </section>
  );
};

export default Blog;
