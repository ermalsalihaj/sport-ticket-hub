import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { DateTime } from "luxon";
import { variables } from '../../../Variables';

const CreateEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    eventCategory: 0,
  });
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "date") {
      const selectedDate = DateTime.fromFormat(e.target.value, "yyyy-MM-dd", {
        zone: "Europe/Belgrade",
      }).toISODate();
      const today = DateTime.now().toISODate();

      if (selectedDate < today) {
        alert("Please select a date that is not older than today.");
        return;
      }
    }

    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };


  const handleClick = async (e) => {
    e.preventDefault();
  
    if (!event.name.trim() || !event.date.trim() || !event.eventCategory) {
      setFormError(true);
      return;
    }
  
    // Ensure eventCategory is a number
    const eventCategoryNumber = parseInt(event.eventCategory, 10);
    if (isNaN(eventCategoryNumber)) {
      setFormError(true);
      return;
    }
  
    try {
      await axios.post("https://localhost:7051/api/Events/PostEvent", {
        ...event,
        eventCategory: eventCategoryNumber,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };
  
  

  return (
    <div>
      <h2 className="s">Add new Event</h2>
            <input
              type="text"
              placeholder="name"
              onChange={handleChange}
              name="name"
            />
            <input
              type="date"
              placeholder="date"
              onChange={handleChange}
              name="date"
            />
            <input
              type="number"
              placeholder="eventCategory"
              onChange={handleChange}
              name="eventCategory"
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

export default CreateEvent