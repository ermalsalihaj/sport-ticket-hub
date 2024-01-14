import React, { useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { variables } from '../../../Variables';
import "./updateVenue.css"

const CreateVenue = () => {
  const [venue, setvenue] = useState({
    name: "",
    location: "",
    capacity: "",
  });
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setvenue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      !venue.name.trim() ||
      !venue.location.trim() ||
      !venue.capacity.trim()
    ) {
      setFormError(true);
      return;
    }

    try {
      await axios.post("https://localhost:7051/api/Venues/PostVenue", venue);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  useEffect(() => {
    document.body.classList.add("body-with-update-venue");
    return () => {
      document.body.classList.remove("body-with-update-venue");
    };
  }, []);

  return (
    <div className='container'>
      <h2 className="s">Add new Venue</h2>
      <div className="mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="name"
              onChange={handleChange}
              name="name"
            />
            </div>
      <div className="mb-3">

            <input
              type="text"
              className="form-control"
              placeholder="location"
              onChange={handleChange}
              name="location"
            />
            </div>
      <div className="mb-3">

            <input
              type="number"
              className="form-control"
              placeholder="capacity"
              onChange={handleChange}
              name="capacity"
            />
            </div>
            {formError && (
              <p className="error-message">Please fill in all fields.</p>
            )}
            <button className="btn btn-primary mt-2" onClick={handleClick}>
              Add
            </button>
    </div>
  )
}

export default CreateVenue