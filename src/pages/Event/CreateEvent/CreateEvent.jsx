import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import { variables } from "../../../Variables";
import { toast } from "react-toastify";
import "./updateEvent.css";

const CreateEvent = () => {
  const defaultimage = "/sport-ticket-hub/src/images/UBT LOGO.png";

  const [event, setEvent] = useState({
    eventId: 0,
    name: "",
    date: "",
    eventCategory: 0,
    image: "s", // Set the default value to "s"
    imageSrc: defaultimage,
    imageFile: null,
  });
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("Handling change...");
    if (e.target.name === "date") {
      const selectedDate = e.target.value;
      const today = DateTime.now().toISODate();

      if (selectedDate < today) {
        alert("Please select a date that is not older than today.");
        return;
      }

      setEvent((prev) => ({
        ...prev,
        date: selectedDate,
      }));
    } else if (e.target.name === "image") {
      setEvent((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]),
      }));
      console.log(e.target.files[0]);
    } else {
      setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log(e.target.value);
    }
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

    const eventCategoryNumber = parseInt(event.eventCategory, 10);
    if (isNaN(eventCategoryNumber)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();
    formData.append("Name", event.name);
    formData.append("Date", event.date);
    formData.append("Image", event.image); // This should be the file name
    formData.append("ImageFile", event.imageFile); // This should be the file content
    formData.append("EventCategory", event.eventCategory);
    addData(formData);
  };

  const addData = async (formData) => {
    try {
      console.log("Request Body:", event);

      await axios.post(
        "https://localhost:7051/api/Events/PostEvent",
        formData,
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error adding data:", error);
      if (error.response) {
        console.error("Server responded with:", error.response.data);

        // Log specific validation errors
        if (error.response.data.errors) {
          console.error("Validation errors:", error.response.data.errors);
        }
      }
    }
  };

  return (
    <div className="container">
      <h2 className="s">Add new Event</h2>
      <form autoComplete="off" noValidate onSubmit={handleClick}>
        <div className="mb-3">
          <img src={event.imageSrc} alt="" style={{ width: "250px" }} />
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
            type="file"
            accept="image/*"
            className="form-control"
            onChange={handleChange}
            name="image"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="category">Select Category:</label>
          <select
            name="eventCategory"
            value={event.eventCategory}
            onChange={handleChange}
          >
            <option value={null}>All Categories</option>
            <option value={1}>Football</option>
            <option value={2}>Basketball</option>
            <option value={3}>Tennis</option>
            <option value={4}>Ucf</option>
          </select>
        </div>
        {formError && (
          <p className="error-message">Please fill in all fields.</p>
        )}
        <button className="btn btn-primary mt-2" type="submit">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateEvent;
