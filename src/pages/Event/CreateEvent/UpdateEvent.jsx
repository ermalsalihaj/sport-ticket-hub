import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./updateEvent.css"; 

const UpdateEvent = () => {
  const { eventId } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState({
    name: "",
    date: "",
    eventCategory: 0,
    image: "",
    imageSrc: "",
    imageFile: null,
  });

  const [formError, setFormError] = useState(false);

  useEffect(() => {
    fetchEventData();
  }, [eventId]);

  const fetchEventData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7051/api/Events/${eventId}`
      );

      const eventData = response.data;

      setEvent({
        name: eventData.name,
        date: eventData.date.slice(0, 10), 
        eventCategory: eventData.eventCategory,
        image: eventData.image,
        imageSrc: `https://localhost:7051/Images/${eventData.image}`,
        imageFile: null,
      });
    } catch (error) {
      console.error("Error fetching event data:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setEvent((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setEvent((prev) => ({
        ...prev,
        [e.target.name]: e.target.name === "date" ? e.target.value : e.target.value,
      }));
    }
  };

  const handleUpdate = async (e) => {
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
    formData.append("EventId", eventId);
    formData.append("Name", event.name);
    formData.append("Date", event.date);
    formData.append("Image", event.image);
    formData.append("ImageFile", event.imageFile);
    formData.append("EventCategory", event.eventCategory);

    try {
      await axios.put(
        `https://localhost:7051/api/Events/PutEvent/${eventId}`,
        formData,
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      toast.success("Event Updated Successfully!");
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  return (
    <div className="container">
      <h2 className="s">Update Event</h2>
      <form autoComplete="off" noValidate onSubmit={handleUpdate}>
        <div className="mb-3">
          <img src={event.imageSrc} alt="" style={{ width: "250px" }} />
          <input
            type="text"
            className="form-control"
            placeholder="name"
            onChange={handleChange}
            name="name"
            value={event.name}
          />
        </div>
        <div className="mb-3">
          <input
            type="date"
            className="form-control"
            placeholder="date"
            onChange={handleChange}
            name="date"
            value={event.date}
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
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
