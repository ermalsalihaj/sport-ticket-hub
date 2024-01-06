import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { variables } from '../../../Variables';

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

  return (
    <div>
      <h2 className="s">Add new Venue</h2>
            <input
              type="text"
              placeholder="name"
              onChange={handleChange}
              name="name"
            />
            <input
              type="text"
              placeholder="location"
              onChange={handleChange}
              name="location"
            />
            <input
              type="number"
              placeholder="capacity"
              onChange={handleChange}
              name="capacity"
            />
            {formError && (
              <p className="error-message">Please fill in all fields.</p>
            )}
            <button className="formButton" onClick={handleClick}>
              Add
            </button>
    </div>
  )
}

export default CreateVenue