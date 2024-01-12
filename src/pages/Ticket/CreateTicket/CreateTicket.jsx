import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import { variables } from "../../../Variables";
import { toast } from "react-toastify";
import "./updateTicket.css"
const CreateTicket = () => {
  const [ticket, setTicket] = useState({
    seatNumber: "",
    ticketPrice: 0,
    isAvailable: false,
    eventId: 0,
  });
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (!ticket.seatNumber.trim() || !ticket.ticketPrice || !ticket.eventId) {
      setFormError(true);
      return;
    }

    // Ensure ticketPrice is a valid float
    const ticketPriceFloat = parseFloat(ticket.ticketPrice);
    if (isNaN(ticketPriceFloat)) {
      setFormError(true);
      return;
    }

    try {
      await axios.post("https://localhost:7051/api/Tickets/PostTicket", {
        ...ticket,
        ticketPrice: ticketPriceFloat,
      });
      navigate("/");
      toast.success(" Created Successfully! ");
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    document.body.classList.add("body-with-update-ticket");
    return () => {
      document.body.classList.remove("body-with-update-ticket");
    };
  }, []);
  return (
    <div className="container">
      <h2 className="s">Add new Ticket</h2>
      <div className="mb-3">

      <input
        type="text"
        className="form-control"
        placeholder="Seat Number"
        onChange={handleChange}
        name="seatNumber"
      />
      </div>
      <div className="mb-3">

      <input
        type="number"
        className="form-control"
        placeholder="Ticket Price"
        onChange={handleChange}
        name="ticketPrice"
      />
      </div>
      <div className="mb-3">
      
      <input
        type="number"
        className="form-control"
        placeholder="Event ID"
        onChange={handleChange}
        name="eventId"
      />
      </div>
      
      <label>
        <input
          type="checkbox"
          onChange={(e) =>
            setTicket((prev) => ({ ...prev, isAvailable: e.target.checked }))
          }
        />
        Available
      </label>

      {formError && (
        <p className="error-message">Please fill in all required fields.</p>
      )}
      <button className="btn btn-primary" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default CreateTicket;
