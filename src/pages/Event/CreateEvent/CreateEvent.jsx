import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import { variables } from "../../../Variables";
import { toast } from "react-toastify";
import "./updateEvent.css";

const CreateEvent = () => {
  const defaultimage = '/sport-ticket-hub/src/images/UBT LOGO.png'

  const [event, setEvent] = useState({
    eventId: 0,
    name: "",
    date: "",
    eventCategory: 0,
    image: "",
    imageSrc: defaultimage,
    imageFile: null,
  });
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    console.log("Handling change...");
    if (e.target.name === "date") {
      // const selectedDate = DateTime.fromFormat(e.target.value, "yyyy-MM-dd", {
      //   zone: "Europe/Belgrade",
      // }).toISODate();
      const selectedDate = e.target.value;
      const today = DateTime.now().toISODate();

      if (selectedDate < today) {
        alert("Please select a date that is not older than today.");
        return;
      }

      setEvent((prev) => ({
        ...prev,
        date: selectedDate, // Set event.date with the selected date
      }));
    } else if (e.target.name === "image") {
      setEvent((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]),
      }));
      console.log(e.target.files[0]);
    } else {
      setEvent((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log(e.target.value);
    }
  };

  useEffect(() => {
    document.body.classList.add("body-with-update-user");
    return () => {
      document.body.classList.remove("body-with-update-user");
    };
  }, []);



  const handleClick = async (e) => {
    e.preventDefault();

    if (!event.name.trim() || !event.date.trim() || !event.eventCategory) {
      setFormError(true);
      return;
    }

    const eventCategoryNumber = parseInt(event.eventCategory, 10);
    if (isNaN(eventCategoryNumber)) {
      setFormError(true);
      return;
    }

    const formData = new FormData();
    formData.append("eventId", event.eventId);
    formData.append("name", event.name);
    formData.append("date", event.date);
    formData.append("eventCategory", event.eventCategory);
    formData.append("ImageFile", event.imageFile);
    addData(formData)

    // console.log(setEvent);

    // try {
    //   await axios.post(
    //     "https://localhost:7051/api/Events/PostEvent",
    //     formData,
    //     {
    //       headers: {
    //         "Content-Type": "multipart/form-data",
    //       },
    //     }

    //     // {
    //     //   ...event,
    //     //   eventCategory: eventCategoryNumber,
    //     // }
    //   );
    //   console.log("API Response:", response.data);
    // navigate("/");
    //   toast.success(" Created Successfully! ");
    // } catch (err) {
    //   console.log(err);
    // }

  };

  const addData = async (formData) => {
    try {
      
      await axios.post(
        "https://localhost:7051/api/Events/PostEvent", formData,
        {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              }
      )
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }
  // try {
  //   const response = await axios.post(
  //     "https://localhost:7051/api/Events/PostEvent",
  //     formData,
  //     {
  //       headers: {
  //         "Content-Type": "multipart/form-data",
  //       },
  //     }
  //   );
  //   console.log("API Response:", response.data);
  //   navigate("/");
  //   toast.success(" Created Successfully! ");
  // } catch (err) {
  //   console.log("API Error:", err);

  // if (err.response && err.response.status === 400) {
  //     // Handle validation errors or other specific cases
  //     console.log("Validation Errors:", err.response.data);
  //     // Display validation errors to the user
  //     // e.g., setFormErrors(err.response.data);
  // } else {
  //     // Handle other errors
  //     toast.error("An error occurred while creating the event.");
  // }
  // }

  console.log(event);

  return (
    <div className="container">
      <h2 className="s">Add new Event</h2>
      <form autoComplete="off" noValidate onSubmit={handleClick}>

      <div className="mb-3">
        <img src={event.imageSrc} alt="" style={{ width: "250px" }}/>
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
          type="date"
          className="form-control"
          placeholder="date"
          onChange={handleChange}
          name="date"
        />
      </div>
      <div className="mb-3">
        <input
          type="file"
          accept="images/*"
          className="form-control"
          // placeholder="image"
          onChange={handleChange}
          name="image"
        />
      </div>
      <div className="mb-3">
        <label htmlFor="category">Select Category:</label>

        <select
          name="eventCategory"
          value={event.eventCategory}
          onChange={handleChange}
        >
          <option value={null}>All Categories</option>
          <option value={1}>Football</option>
          <option value={2}>Basketball</option>
          <option value={3}>Tennis</option>
          <option value={4}>Ucf</option>
        </select>
      </div>
      {formError && <p className="error-message">Please fill in all fields.</p>}
      <button className="btn btn-primary mt-2" type="submit">
        Add
      </button>
          </form>
    </div>
  );
};

export default CreateEvent;
