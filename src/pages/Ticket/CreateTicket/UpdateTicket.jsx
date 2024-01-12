import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./updateTicket.css"

const UpdateTicket = () => {
  const [ticket, setTicket] = useState({
    ticketId: 0,
    seatNumber: "",
    ticketPrice: 0,
    isAvailable: false,
    eventId: 0, // Add eventId field with default value
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [fetchedTicket, setFetchedTicket] = useState(null);

  const ticketId = location.pathname.split("/")[2];

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7051/api/Tickets/${ticketId}`
        );
        setFetchedTicket(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchTicket();
  }, [ticketId]);

  useEffect(() => {
    if (fetchedTicket) {
      setTicket((prev) => ({
        ...prev,
        ticketId: fetchedTicket.ticketId,
        seatNumber: fetchedTicket.seatNumber,
        ticketPrice: fetchedTicket.ticketPrice,
        isAvailable: fetchedTicket.isAvailable,
        eventId: fetchedTicket.eventId, 
      }));
      console.log(fetchedTicket);
    }
  }, [fetchedTicket]);

  const handleChange = (e) => {
    setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7051/api/Tickets/${ticket.ticketId}`,
        ticket
      );
      navigate("/");
      toast.success(" Updated Successfully! ");

      console.log(ticket);
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
      <h2 className="s">Update Ticket</h2>
      <div className="mb-3">

      <input
        type="text"
        className="form-control"
        placeholder="Seat Number"
        onChange={handleChange}
        name="seatNumber"
        value={ticket.seatNumber}
      />
      </div>
      <div className="mb-3">

      <input
        type="number"
        className="form-control"
        placeholder="Ticket Price"
        onChange={handleChange}
        name="ticketPrice"
        value={ticket.ticketPrice}
      />
      </div>
      <div className="mb-3">

      <input
        type="number"
        className="form-control"
        placeholder="Event ID"
        onChange={handleChange}
        name="eventId"
        value={ticket.eventId}
      />
      </div>
      <label>
        <input
          type="checkbox"
          checked={ticket.isAvailable}
          onChange={(e) =>
            setTicket((prev) => ({ ...prev, isAvailable: e.target.checked }))
          }
        />
        Available
      </label>

      <button className="btn btn-primary" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default UpdateTicket;
