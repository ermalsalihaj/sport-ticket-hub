import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

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

  return (
    <div>
      <h2 className="s">Update Event</h2>
      <input
        type="text"
        placeholder="name"
        onChange={handleChange}
        name="name"
        value={event.name}
      />
      <input
        type="date"
        placeholder="date"
        onChange={handleChange}
        name="date"
        value={event.date}
      />
      <input
        type="number"
        placeholder="eventCategory"
        onChange={handleChange}
        name="eventCategory"
        value={event.eventCategory}
      />

      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default UpdateEvent;
