import React, { useEffect, useState } from "react";
import { variables } from "../../Variables";
import { Link } from "react-router-dom";
import axios from "axios";
import {ToastContainer, toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Venue = () => {
  const [venues, setvenues] = useState([]);

  useEffect(() => {
    fetchAll();
  }, []);
  
  const fetchAll = async () => {
    try {
      const venuesResponse = await fetch(variables.API_URL + "venues");

      const venuesData = await venuesResponse.json();

      setvenues(venuesData);
      // console.log(venuesData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  const handleDelete = async (id) => {
    try {
      if (window.confirm("Are you sure you want to delete this venue?") == true) {
        await axios.delete(`https://localhost:7051/api/Venues/${id}`);
        // window.location.reload();
        toast.success(" Venue Deleted! ");
        fetchAll();
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <ToastContainer/>
      <div className="col-lg-6">
        <h4 className="sectionTitle">Venues</h4>
        <Link to="/create-venue">Create Venue</Link>
        {/* <button>create</button> */}
      </div>
      <div className="row mb-4 mt-4">
        {venues.map((venue) => (
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="gameCard">
              <img className="img-fluid" />
              <div className="gameFeature">
                <span className="gameType">{venue.name}</span>
              </div>
              <div className="gamePrice">
                <h3 className="gameTitle mt-4 mb-3">
                  Location: {venue.location}
                </h3>

                <span className="currentPrice">Capacity: {venue.capacity}</span>
                <Link to={`/update-venue/${venue.venueId}`}>
                  <p> Update</p>
                </Link>
                <button
                  className="delete"
                  onClick={() => handleDelete(venue.venueId)}
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

export default Venue;
