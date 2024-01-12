import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./updateEvent.css"; // Make sure to create this CSS file

const UpdateEvent = () => {
  const [event, setEvent] = useState({
    name: "",
    date: "",
    eventCategory: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [sport, setsport] = useState(null);

  const idevent = location.pathname.split("/")[2];

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://localhost:7051/api/Events/${idevent}`);
        setsport(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [idevent]);

  useEffect(() => {
    if (sport) {
      setEvent((prev) => ({
        ...prev,
        name: sport.name,
        date: formatDateForInput(sport.date),
        eventCategory: sport.eventCategory,
      }));
      console.log(sport);
    }
  }, [sport]);

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toISOString().split('T')[0];
    return formattedDate;
  };

  const handleChange = (e) => {
    setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7051/api/Events/PutEvent/${idevent}`,
        event
      );
      navigate("/");
      toast.success(" Updated Successfully! ");
      console.log(event);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // Add the unique class to the body element when the component mounts
    document.body.classList.add("body-with-update-event");

    // Remove the class when the component unmounts
    return () => {
      document.body.classList.remove("body-with-update-event");
    };
  }, []);

  return (
    <div className="container">
      <h2 className="s">Update Event</h2>
      <div className="mb-3">

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
        type="number"
        className="form-control"
        placeholder="eventCategory"
        onChange={handleChange}
        name="eventCategory"
        value={event.eventCategory}
      />
      </div>

      <button className="btn btn-primary mt-2" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default UpdateEvent;
