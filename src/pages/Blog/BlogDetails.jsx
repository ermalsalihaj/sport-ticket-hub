import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch blog details
        const blogResponse = await axios.get(
          `https://localhost:7051/api/Blog/${id}`
        );
        setBlog(blogResponse.data);

        // Fetch comments based on BlogId
        const commentsResponse = await axios.get(
          `https://localhost:7051/api/Comment/ByBlog/${id}`
        );
        setComments(commentsResponse.data);
        const userLoggedIn = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(userLoggedIn === "true");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`https://localhost:7051/api/Comment/${commentId}`);
      // After deleting the comment, fetch the updated comments
      const commentsResponse = await axios.get(
        `https://localhost:7051/api/Comment/ByBlog/${id}`
      );
      setComments(commentsResponse.data);
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
    return formattedDate;
  }

  return (
    <div className="container-fluid bg-dark text-light min-vh-100">
      <Link to="/" className=" mb-3">
                &lt; Back 
              </Link>
      <div className="row">
        <div className="col-md-8">
          <img
            style={{ width: "250px", height: "250px", objectFit: "cover" }}
            className="custom-image-size mb-3 rounded mt-3"
            src={`https://localhost:7051/Images/${blog.image}`}
            alt={blog.title}
          />
          <h1 className="text-light">{blog.title}</h1>
          <p>Created: {formatDate(blog.createdAt)}</p>
          <p>{blog.content}</p>
        </div>
        <div className="col-md-4">
          <div className="card bg-secondary text-light">
            <div className="card-body">
              

              <h2 className="card-title">Comments</h2>
              <ul className="list-group">
                {comments.map((comment) => (
                  <li
                    key={comment.id}
                    className="list-group-item bg-dark text-light rounded"
                  >
                    <div>
                      <p>
                        Email: <strong>{comment.email}</strong>
                      </p>
                      <p>
                        Name: <strong>{comment.name}</strong>
                      </p>
                      <p>Comment: {comment.comments}</p>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              {isLoggedIn && (
                <Link to={`/create-comment/${id}`}>
                  <button className="btn btn-success mt-3">
                    Add a Comment
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
