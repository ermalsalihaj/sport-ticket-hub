import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const UpdateVenue = () => {
  const [venue, setvenue] = useState({
    name: "",
    location: "",
    capacity: "",
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [sport, setsport] = useState(null);

  const { venueId } = useParams();
  // console.log(venueId);
  const idvenue = location.pathname.split("/")[2];
  //   console.log(idvenue);
  useEffect(() => {
    document.body.classList.add("body-with-update-venue");
    return () => {
      document.body.classList.remove("body-with-update-venue");
    };
  }, []);
  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(
          `https://localhost:7051/api/Venues/${idvenue}`
        );
        setsport(response.data);
        console.log(response.data);
        // console.log(response.data[venueId - 1]);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, []);

  useEffect(() => {
    if (sport) {
      setvenue(sport);
      console.log(sport);
    }
  }, [sport]);

  const handleChange = (e) => {
    setvenue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7051/api/Venues/PutVenue/${idvenue}`,
        venue
      );
      navigate("/");
      console.log(venue);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="s">Update Venue</h2>
      <div className="mb-3">

      <input
        className="form-control"
        type="text"
        placeholder="name"
        onChange={handleChange}
        name="name"
        value={venue.name}
      />
      </div>
      <div className="mb-3">

      <input
        className="form-control"
        type="text"
        placeholder="location"
        onChange={handleChange}
        name="location"
        value={venue.location}
      />
      </div>
      <div className="mb-3">

      <input
        className="form-control"
        type="number"
        placeholder="capacity"
        onChange={handleChange}
        name="capacity"
        value={venue.capacity}
      />
      </div>

      <button className="btn btn-primary mt-2" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default UpdateVenue;
