import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "./createBlog.css"; 
import { toast } from 'react-toastify';

const UpdateBlog = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    title: "",
    content: "",
    createdAt: "", // Add the createdAt field
    userId: localStorage.getItem("userId") || "",
    comment: "", // Add the comment field
  });

  const [formError, setFormError] = useState(false);

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

      const response = await axios.put(`https://localhost:7051/api/Blog/${id}`, blog);

      console.log("Server Response:", response);

      if (response.status === 204) {
        navigate("/");
        toast.success(" Blog Updated Successfully! ");
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
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://localhost:7051/api/Blog/${id}`);
        const formattedDate = new Date(response.data.createdAt).toISOString().split('T')[0];

      setBlog({
        ...response.data,
        createdAt: formattedDate,
      });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className='container'>
      <h2 className="s">Update Blog</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Title"
          value={blog.title}
          onChange={handleChange}
          name="title"
        />
      </div>
      <div className="mb-3">
        <textarea
          className="form-control"
          placeholder="Content"
          value={blog.content}
          onChange={handleChange}
          name="content"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="createdAt">Creation Date:</label>
        <input
          type="date"
          className="form-control"
          value={blog.createdAt}
          onChange={handleChange}
          name="createdAt"
        />
      </div>
      {formError && (
        <p className="error-message">Please fill in all required fields.</p>
      )}
      <button className="btn btn-primary mt-2" onClick={handleClick}>
        Update Blog
      </button>
    </div>
  );
};

export default UpdateBlog;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";

// function UpdateBlog() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [blog, setBlog] = useState({
//     title: "",
//     content: "",
//     createdAt: "",
//     userId: localStorage.getItem("userId") || "",
//     comment: "",
//   });

//   const [formError, setFormError] = useState(false);

//   const handleChange = (e) => {
//     const value =
//       e.target.name === "createdAt"
//         ? formatDateForInput(e.target.value)
//         : e.target.value;
//     setBlog((prev) => ({ ...prev, [e.target.name]: value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();

//     if (!blog.title.trim() || !blog.content.trim() || !blog.createdAt.trim()) {
//       setFormError(true);
//       return;
//     }

//     try {
//       console.log("Request Body:", blog);

//       const response = await axios.put(
//         `https://localhost:7051/api/Blog/${id}`,
//         blog
//       );

//       console.log("Server Response:", response);

//       if (response.status === 204) {
//         navigate("/");
//       } else {
//         console.error("Unexpected status code:", response.status);
//       }
//     } catch (error) {
//       console.error("Error during Axios request:", error);

//       if (error.response) {
//         console.error("Server Response Data:", error.response.data);

//         if (error.response.status === 400) {
//           console.error("Validation Errors:", error.response.data.errors);
//         }
//       }
//     }
//   };

//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await axios.get(
//           `https://localhost:7051/api/Blog/${id}`
//         );

//         const blogData = response.data;

//         setBlog({
//           title: blogData.title,
//           content: blogData.content,
//           createdAt: formatDateForInput(blogData.createdAt),
//           userId: blogData.userId,
//           comment: blogData.comment,
//         });
//       } catch (error) {
//         console.error("Error fetching blog data:", error);
//       }
//     };

//     fetchBlogData();
//   }, [id]);

//   const formatDateForInput = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toISOString().split("T")[0];
//     return formattedDate;
//   };

//   return (
//     <div className="container">
//       <h2 className="s">Update Blog</h2>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Title"
//           value={blog.title}
//           onChange={handleChange}
//           name="title"
//         />
//       </div>
//       <div className="mb-3">
//         <textarea
//           className="form-control"
//           placeholder="Content"
//           value={blog.content}
//           onChange={handleChange}
//           name="content"
//         />
//       </div>
//       <div className="mb-3">
//         <label htmlFor="createdAt">Creation Date:</label>
//         <input
//           type="date"
//           className="form-control"
//           value={blog.createdAt}
//           onChange={handleChange}
//           name="createdAt"
//         />
//       </div>
//       {formError && (
//         <p className="error-message">Please fill in all required fields.</p>
//       )}
//       <button className="btn btn-primary mt-2" onClick={handleClick}>
//         Update Blog
//       </button>
//     </div>
//   );
// }

// export default UpdateBlog;


// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { useParams, useNavigate } from "react-router-dom";
// import { variables } from "../../../Variables";
// import "./createBlog.css"; // Update the CSS file name if needed

// function UpdateBlog() {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const [blog, setBlog] = useState({
//     title: "",
//     content: "",
//     createdAt: "",
//     userId: localStorage.getItem("userId") || "",
//     comment: "",
//   });
//   useEffect(() => {
//     document.body.classList.add("body-with-create-blog");
//     return () => {
//       document.body.classList.remove("body-with-create-blog");
//     };
//   }, []);

//   const [formError, setFormError] = useState(false);

//   // const handleChange = (e) => {
//   //   setBlog((prev) => ({
//   //     ...prev,
//   //     [e.target.name]: e.target.value,
//   //   }));
//   // };

//   const handleChange = (e) => {
//     const value =
//       e.target.name === "createdAt"
//         ? formatDateForInput(e.target.value)
//         : e.target.value;
//     setBlog((prev) => ({ ...prev, [e.target.name]: value }));
//   };

//   // const handleClick = async (e) => {
//   //   e.preventDefault();

//   //   if (!blog.title.trim() || !blog.content.trim()) {
//   //     setFormError(true);
//   //     return;
//   //   }

//   //   try {
//   //     console.log("Request Body:", blog);
    
//   //     const formattedDate = formatDateForInput(blog.createdAt);

//   //     const response = await axios.put(
//   //       `https://localhost:7051/api/Blog/${id}`,
//   //       {
//   //         ...blog,
//   //         createdAt: formattedDate,
//   //       }
//   //     );
//   //     // const response = await axios.put(
//   //     //   `https://localhost:7051/api/Blog/${id}`,
//   //     //   blog
//   //     // );

//   //     console.log("Server Response:", response);

//   //     if (response.status === 200) {
//   //       navigate("/blog");
//   //     } else {
//   //       console.error("Unexpected status code:", response.status);
//   //     }
//   //   } catch (error) {
//   //     console.error("Error during Axios request:", error);

//   //     if (error.response) {
//   //       console.error("Server Response Data:", error.response.data);
//   //     }
//   //   }
//   // };

//   const handleClick = async (e) => {
//     e.preventDefault();
  
//     if (!blog.title.trim() || !blog.content.trim() || !blog.createdAt.trim()) {
//       setFormError(true);
//       return;
//     }
  
//     try {
//       console.log("Request Body:", blog);
  
//       const response = await axios.put(
//         `https://localhost:7051/api/Blog/${id}`,
//         blog
//       );
  
//       console.log("Server Response:", response);
  
//       if (response.status === 200) {
//         navigate("/");
//       } else {
//         console.error("Unexpected status code:", response.status);
//       }
//     } catch (error) {
//       console.error("Error during Axios request:", error);
  
//       if (error.response) {
//         console.error("Server Response Data:", error.response.data);
//       }
//     }
//   };
  
//   useEffect(() => {
//     const fetchBlogData = async () => {
//       try {
//         const response = await axios.get(
//           `https://localhost:7051/api/Blog/${id}`
//         );

//         const blogData = response.data;

//         setBlog({
//           title: blogData.title,
//           content: blogData.content,
//           createdAt:formatDateForInput(blogData.createdAt),
//           // createdAt: blogData.createdAt,
//           userId: blogData.userId,
//           comment: blogData.comment,
//         });
//       } catch (error) {
//         console.error("Error fetching blog data:", error);
//       }
//     };

//     fetchBlogData();
//   }, [id]);

//   const formatDateForInput = (dateString) => {
//     const date = new Date(dateString);
//     const formattedDate = date.toISOString().split("T")[0];
//     return formattedDate;
//   };

//   return (
//     <div className="container">
//       <h2 className="s">Update Blog</h2>
//       <div className="mb-3">
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Title"
//           value={blog.title}
//           onChange={handleChange}
//           name="title"
//         />
//       </div>
//       <div className="mb-3">
//         <textarea
//           className="form-control"
//           placeholder="Content"
//           value={blog.content}
//           onChange={handleChange}
//           name="content"
//         />
//       </div>
//       <div className="mb-3">
//       <label htmlFor="createdAt">Creation Date:</label>
//         <input
//           type="date"
//           className="form-control"
//           value={blog.createdAt}
//           onChange={handleChange}
//           name="createdAt"
//         />
//       </div>
//       {formError && (
//         <p className="error-message">Please fill in all required fields.</p>
//       )}
//       <button className="btn btn-primary mt-2" onClick={handleClick}>
//         Update Blog
//       </button>
//     </div>
//   );
// }

// export default UpdateBlog;
