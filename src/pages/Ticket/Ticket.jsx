import React, { useEffect, useState } from "react";
import { variables } from "../../Variables";
import { Link } from "react-router-dom";
import axios from "axios";

const Ticket = () => {
  const [events, setevents] = useState([]);
  const [tickets, settickets] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const ticketResponse = await fetch(variables.API_URL + "tickets");
        const eventResponse = await fetch(variables.API_URL + "events");

        const ticketData = await ticketResponse.json();
        const eventData = await eventResponse.json();

        const ticketsWithEvent = ticketData.map((ticket) => {
          const event = eventData.find(
            (event) => event.eventId === ticket.eventId
          );
          const eventName = event ? event.name : "Unknown Event";
          const eventDate = event ? event.date : "Unknown Date";
          return { ...ticket, eventName, eventDate };
        });

        settickets(ticketsWithEvent);
        // console.log(ticketsWithEvent);
        setevents(eventData);
        // console.log(eventData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchAll();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:7051/api/Tickets/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();

    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  return (
    <div>
      <div className="col-lg-6">
        <h4 className="sectionTitle">Tickets</h4>
        <Link to="/create-ticket">Create Ticket</Link>
      </div>
      <div className="row mb-4 mt-4">
        {tickets.map((ticket) => (
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="gameCard">
              <img className="img-fluid" />
              <div className="gameFeature">
                <span className="gameType">{ticket.seatNumber}</span>
                <h3 className="gameTitle mt-4 mb-3">
                  {ticket.isAvailable ? "Available" : "Not Available"}
                </h3>
              </div>
              <div className="gamePrice">
                <h3 className="gameTitle mt-4 mb-3">{ticket.eventName}</h3>
                <span className="currentPrice">
                  {formatDate(ticket.eventDate)}
                </span>
                <hr />
                <span className="currentPrice">
                  Price: {ticket.ticketPrice}$
                </span>

                <Link to={`/update-ticket/${ticket.ticketId}`}>
                  <p> Update</p>
                </Link>
                <button
                  className="delete"
                  onClick={() => handleDelete(ticket.ticketId)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticket;
