import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./updateVenue.css";
import { toast } from "react-toastify";

const UpdateVenue = () => {
  const { venueId } = useParams();
  const navigate = useNavigate();

  const [venue, setVenue] = useState({
    name: "",
    location: "",
    capacity: "",
    image: "", 
    imageSrc: "",
    imageFile: null,
  });

  const [formError, setFormError] = useState(false);

  useEffect(() => {
    console.log("Venue ID:", venueId);
    fetchVenueData();
  }, [venueId]);

  const fetchVenueData = async () => {
    try {
      const response = await axios.get(
        `https://localhost:7051/api/Venues/${venueId}`
      );
  
      const venueData = response.data;
  
      setVenue({
        name: venueData.name,
        location: venueData.location,
        capacity: venueData.capacity,
        image: venueData.image,
        imageSrc: `https://localhost:7051/Images/${venueData.image}`,
        imageFile: null,
      });
    } catch (error) {
      console.error("Error fetching venue data:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setVenue((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setVenue((prev) => ({
        ...prev,
        [e.target.name]: e.target.name === "capacity" ? String(e.target.value) : e.target.value,
      }));
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!venue.name.trim() || !venue.location.trim()) {
      setFormError(true);
      return;
    }

    const formData = new FormData();
    formData.append("VenueId", venueId);
    formData.append("Name", venue.name);
    formData.append("Location", venue.location);
    formData.append("Capacity", venue.capacity);
    formData.append("Image", venue.image);
    formData.append("ImageFile", venue.imageFile);

    try {
      await axios.put(
        `https://localhost:7051/api/Venues/PutVenue/${venueId}`,
        formData,
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      toast.success("Venue Updated Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2 className="s">Update Venue</h2>
      <div className="mb-3">
        <img src={venue.imageSrc} alt="" style={{ width: "250px" }} />
        <input
          type="text"
          className="form-control"
          placeholder="name"
          onChange={handleChange}
          name="name"
          value={venue.name}
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="location"
          onChange={handleChange}
          name="location"
          value={venue.location}
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="capacity"
          onChange={handleChange}
          name="capacity"
          value={venue.capacity}
        />
      </div>
      <div className="mb-3">
        <input
          type="file"
          accept="image/*"
          className="form-control"
          onChange={handleChange}
          name="image"
        />
      </div>
      {formError && <p className="error-message">Please fill in all fields.</p>}
      <button className="btn btn-primary mt-2" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateVenue;
