// Import necessary libraries and components
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./blogDetails.css";
import { Link, useParams } from "react-router-dom";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [comments, setComments] = useState([]);

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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);
  useEffect(() => {
    document.body.classList.add("body-with-create-blog");
    return () => {
      document.body.classList.remove("body-with-create-blog");
    };
  }, []);
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
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  return (
    <div className="container">
      <h1>{blog.title}</h1>
      <p>{blog.content}</p>

      <p>Created: {formatDate(blog.createdAt)}</p>

      <h2>Comments:</h2>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <div className="comment-details">
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
      <Link to={`/create-comment/${id}`}>
        <button className="btn btn-success">Add a Comment</button>
      </Link>
    </div>
  );
};

export default BlogDetails;
