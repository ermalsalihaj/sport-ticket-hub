import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./updateUser.css";

const UpdateUser = () => {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    role: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const iduser = location.pathname.split("/")[2];

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://localhost:7051/api/Users/${iduser}`);
        setUser(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [iduser]);

  useEffect(() => {
    // Add the unique class to the body element when the component mounts
    document.body.classList.add("body-with-update-user");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("body-with-update-user");
    };
  }, []);

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7051/api/Users/PutUser/${iduser}`,
        user
      );
      navigate("/admin");
      toast.success("Updated Successfully!");
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Update User</h2>
      <form>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            onChange={handleChange}
            name="userName"
            value={user.userName}
          />
        </div>
        <div className="mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            onChange={handleChange}
            name="email"
            value={user.email}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role:
          </label>
          <select
            className="form-select"
            onChange={handleChange}
            name="role"
            value={user.role}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button className="btn btn-primary" onClick={handleClick}>
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateUser;
