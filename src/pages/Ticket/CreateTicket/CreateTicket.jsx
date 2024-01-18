import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DateTime } from "luxon";
import { variables } from "../../../Variables";
import { toast } from "react-toastify";
import "./updateTicket.css"
const CreateTicket = () => {
  const defaultimage = "/sport-ticket-hub/src/images/UBT LOGO.png";

  const [ticket, setTicket] = useState({
    seatNumber: "",
    ticketPrice: 0,
    isAvailable: false,
    eventId: 0,
    image: "s", // Set the default value to "s"
    imageSrc: defaultimage,
    imageFile: null,
  });
  const [formError, setFormError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
     if (e.target.name === "image") {
      setTicket((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]),
      }));
      console.log(e.target.files[0]);
    } else {
      setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
      console.log(e.target.value);
    }
    // setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
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

    const formData = new FormData();
    formData.append("SeatNumber", ticket.seatNumber);
    formData.append("TicketPrice", ticket.ticketPrice);
    formData.append("IsAvailable", ticket.isAvailable);
    formData.append("EventId", ticket.eventId);
    formData.append("Image", ticket.image); // This should be the file name
    formData.append("ImageFile", ticket.imageFile); // This should be the file content
    // addData(formData);

      // const addData = async (formData) => {
      try {
      await axios.post("https://localhost:7051/api/Tickets/PostTicket", 
         formData,
        // ticketPrice: ticketPriceFloat,  
        {
           headers: {
            accept: "text/plain",
            "Content-Type": "multipart/form-data",
        }      
         
        
      });
      navigate("/");
      toast.success(" Created Successfully! ");
    } catch (err) {
      console.log(err);
    }
  // }
  };


  useEffect(() => {
    document.body.classList.add("body-with-update-ticket");
    return () => {
      document.body.classList.remove("body-with-update-ticket");
    };
  }, []);
  return (
    <div className="container">
      <h2 className="s">Add new Ticket</h2>
      <div className="mb-3">
      <img src={ticket.imageSrc} alt="" style={{ width: "250px" }} />
      <input
        type="text"
        className="form-control"
        placeholder="Seat Number"
        onChange={handleChange}
        name="seatNumber"
      />
      </div>
      <div className="mb-3">

      <input
        type="number"
        className="form-control"
        placeholder="Ticket Price"
        onChange={handleChange}
        name="ticketPrice"
      />
      </div>
      <div className="mb-3">
      
      <input
        type="number"
        className="form-control"
        placeholder="Event ID"
        onChange={handleChange}
        name="eventId"
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
      <button className="btn btn-primary" onClick={handleClick}>
        Add
      </button>
    </div>
  );
};

export default CreateTicket;
