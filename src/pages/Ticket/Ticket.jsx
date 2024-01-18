import React, { useContext, useEffect, useState } from "react";
import { variables } from "../../Variables";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const Ticket = () => {
  const [events, setevents] = useState([]);
  const [tickets, settickets] = useState([]);
  const userRole = localStorage.getItem("role");

  useEffect(() => {
    fetchAll();
  }, []);

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

  const handleDelete = async (id) => {
    try {
      if (
        window.confirm("Are you sure you want to delete this venue?") == true
      ) {
        await axios.delete(`https://localhost:7051/api/Tickets/${id}`);
        toast.success(" Ticket Deleted! ");
        fetchAll();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAddToCart = (ticketId) => {
    const data = {
      ticketId: ticketId,
    };
    axios
      .post("https://localhost:7051/api/ShoppingCarts/PostShoppingCart", data)
      .then((result) => {
        toast.success(" Added to Bag! ");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
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
      <ToastContainer />
      <div className="col-lg-8">
        <h4 className="sectionTitle">Tickets</h4>
        {userRole === "admin" && (
          <>
            <Link to="/create-ticket">
              <button className="btn btn-warning">Create Ticket</button>
            </Link>
          </>
        )}
      </div>
      <div className="row mb-4 mt-4">
        {tickets.map((ticket) => (
          <div className="col-xl-4 col-lg-6 col-md-6">
            <div className="gameCard p-3" style={{ height: "500px" }}>
              <img
                className="img-fluid"
                src={`https://localhost:7051/Images/${ticket.image}`}
                alt={ticket.name}
                style={{ maxHeight: "200px" }}
              />
              <button
                className="btn btn-success"
                onClick={() => handleAddToCart(ticket.ticketId)}
              >
                <i className="bi bi-bag-fill"></i>
              </button>
              <div className="gameFeature mt-3">
                <span className="gameType">{ticket.seatNumber}</span>
                <h3 className="gameTitle mt-1 mb-2">
                  {ticket.isAvailable ? "Available" : "Not Available"}
                </h3>
              </div>
              <div className="gamePrice">
                <h3 className="gameTitle mt-4 mb-3">{ticket.eventName}</h3>
                <div>
                  <span className="currentPrice">
                    Date: {formatDate(ticket.eventDate)}
                  </span>
                  <br />
                  <span className="currentPrice">
                    Price: {ticket.ticketPrice}$
                  </span>
                </div>
              </div>
              <div className="gameButtons">
                {userRole === "admin" && (
                  <div>
                    <Link to={`/update-ticket/${ticket.ticketId}`}>
                      <button className="btn btn-primary mb-2">Update</button>
                    </Link>
                    <button
                      className="btn btn-danger mb-2 ml-2"
                      onClick={() => handleDelete(ticket.ticketId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Ticket;
