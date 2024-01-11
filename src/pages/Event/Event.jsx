import React, { useEffect, useState } from "react";
import { variables } from "../../Variables";
import { Link } from "react-router-dom";
import axios from "axios";
import EventCategoryEnum from "./EventCategoryEnum";
import { ToastContainer, toast } from "react-toastify";

const Event = () => {
  const [events, setevents] = useState([]);
  const [venues, setvenues] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    try {
      const eventResponse = await fetch(variables.API_URL + "events");
      const venuesResponse = await fetch(variables.API_URL + "venues");

      const eventData = await eventResponse.json();
      const venuesData = await venuesResponse.json();

      const venuesEvent = eventData.map((events) => {
        const venue = venuesData.find(
          (venue) => venue.venueId === events.venueId
        );
        const venueName = venue ? venue.name : "Unknown Venue";
        return { ...events, venueName };
      });

      setevents(venuesEvent);
      setvenues(venuesData);
      // console.log(venuesData);
      console.log(eventData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleDelete = async (id) => {
    try {
      if (
        window.confirm("Are you sure you want to delete this venue?") == true
      ) {
        await axios.delete(`https://localhost:7051/api/Events/${id}`);
        // window.location.reload();
        toast.success(" Deleted Successfully! ");
        fetchAll();
      }
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
      <ToastContainer />

      <div className="col-lg-6">
        <h4 className="sectionTitle">Events</h4>
        <Link to="/create-event">Create Event</Link>
      </div>
      <div className="row mb-4 mt-4">
        {events.map((event) => (
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="gameCard">
              <img className="img-fluid" />
              <div className="gameFeature">
                <span className="gameType">{event.name}</span>
                {/* <h3 className="gameTitle mt-4 mb-3">{event.isAvailable ? "Available" : "Not Available"}</h3> */}
              </div>
              <div className="gamePrice">
                {/* <h3 className="gameTitle mt-4 mb-3">Venue: {event.venueName}</h3> */}

                <span className="currentPrice">
                  Category:{" "}
                  {Object.keys(EventCategoryEnum)[event.eventCategory - 1]}
                </span>

                <span className="currentPrice">{formatDate(event.date)}</span>
                <Link to={`/update-event/${event.eventId}`}>
                  <p> Update</p>
                </Link>
                <button
                  className="delete"
                  onClick={() => handleDelete(event.eventId)}
                >
                  Delete
                </button>

                {/* <span className="currentPrice">Price: {event.eventPrice}$</span> */}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Event;
