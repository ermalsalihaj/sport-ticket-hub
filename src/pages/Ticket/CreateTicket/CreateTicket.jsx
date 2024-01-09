import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import { variables } from "../../../Variables";

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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="s">Add new Ticket</h2>
      <input
        type="text"
        placeholder="Seat Number"
        onChange={handleChange}
        name="seatNumber"
      />
      <input
        type="number"
        placeholder="Ticket Price"
        onChange={handleChange}
        name="ticketPrice"
      />
      <input
        type="number"
        placeholder="Event ID"
        onChange={handleChange}
        name="eventId"
      />
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
      <button className="formButton" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default CreateTicket;
