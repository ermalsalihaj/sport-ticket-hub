import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import { variables } from "../../../Variables";
import { toast } from "react-toastify";
import "./updateEvent.css";

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
  useEffect(() => {
    document.body.classList.add("body-with-update-user");
    return () => {
      document.body.classList.remove("body-with-update-user");
    };
  }, []);
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
      toast.success(" Created Successfully! ");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="s">Add new Event</h2>
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
          type="date"
          className="form-control"
          placeholder="date"
          onChange={handleChange}
          name="date"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="eventCategory"
          onChange={handleChange}
          name="eventCategory"
        />
      </div>
      {formError && <p className="error-message">Please fill in all fields.</p>}
      <button className="btn btn-primary mt-2" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default CreateEvent;
