import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { variables } from "../../../Variables";
import "./updateVenue.css";
import { toast } from "react-toastify";

const CreateVenue = () => {
  const defaultimage = "/sport-ticket-hub/src/images/UBT LOGO.png";

  const [venue, setvenue] = useState({
    name: "",
    location: "",
    capacity: "",
    image: "s", // Set the default value to "s"
    imageSrc: defaultimage,
    imageFile: null,
  });
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setvenue((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]),
      }));
      console.log(e.target.files[0]);
    } else {
      setvenue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log(e.target.value);
    }
    // setvenue((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    if (
      !venue.name.trim() ||
      !venue.location.trim() ||
      !venue.capacity.trim()
    ) {
      setFormError(true);
      return;
    }

    const formData = new FormData();
    formData.append("Name", venue.name);
    formData.append("Location", venue.location);
    formData.append("Capacity", venue.capacity);
    formData.append("Image", venue.image); // This should be the file name
    formData.append("ImageFile", venue.imageFile); // This should be the file content
    addData(formData);
  };

  const addData = async (formData) => {
    try {
      console.log("Request Venue:", venue);

      await axios.post(
        "https://localhost:7051/api/Venues/PostVenue",
        formData,
        {
          headers: {
            accept: "text/plain",
            "Content-Type": "multipart/form-data",
          },
        }
      );
      navigate("/");
      toast.success(" Created Successfully! ");
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    document.body.classList.add("body-with-update-venue");
    return () => {
      document.body.classList.remove("body-with-update-venue");
    };
  }, []);

  return (
    <div className="container">
      <h2 className="s">Add new Venue</h2>
      <div className="mb-3">
        <img src={venue.imageSrc} alt="" style={{ width: "250px" }} />
        <input
          type="text"
          className="form-control"
          placeholder="name"
          onChange={handleChange}
          name="name"
        />
      </div>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="location"
          onChange={handleChange}
          name="location"
        />
      </div>
      <div className="mb-3">
        <input
          type="number"
          className="form-control"
          placeholder="capacity"
          onChange={handleChange}
          name="capacity"
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
      <button className="btn btn-primary mt-2" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default CreateVenue;
