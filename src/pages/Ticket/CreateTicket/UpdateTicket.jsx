import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "./updateTicket.css"

const UpdateTicket = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState({
    seatNumber: "",
    ticketPrice: 0,
    isAvailable: false,
    eventId: 0,
    image: "",
    imageSrc: "",
    imageFile: null,
  });

  const [formError, setFormError] = useState(false);

  useEffect(() => {
    fetchTicketData();
  }, [id]);

  const fetchTicketData = async () => {
    try {
      const response = await axios.get(`https://localhost:7051/api/Tickets/${id}`);

      const ticketData = response.data;

      setTicket({
        seatNumber: ticketData.seatNumber,
        ticketPrice: ticketData.ticketPrice,
        isAvailable: ticketData.isAvailable,
        eventId: ticketData.eventId,
        image: ticketData.image,
        imageSrc: `https://localhost:7051/Images/${ticketData.image}`,
        imageFile: null,
      });
    } catch (error) {
      console.error("Error fetching ticket data:", error);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setTicket((prev) => ({
        ...prev,
        imageFile: e.target.files[0],
        imageSrc: URL.createObjectURL(e.target.files[0]),
      }));
    } else {
      setTicket((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleUpdate = async (e) => {
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
    formData.append("TicketId", id);
    formData.append("SeatNumber", ticket.seatNumber);
    formData.append("TicketPrice", ticketPriceFloat);
    formData.append("IsAvailable", ticket.isAvailable);
    formData.append("EventId", ticket.eventId);
    formData.append("Image", ticket.image);
    formData.append("ImageFile", ticket.imageFile);

    try {
      await axios.put(`https://localhost:7051/api/Tickets/${id}`, formData, {
        headers: {
          accept: "text/plain",
          "Content-Type": "multipart/form-data",
        },
      });

      navigate("/");
      toast.success("Ticket Updated Successfully!");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container">
      <h2>Update Ticket</h2>
      <div className="mb-3">
        <img src={ticket.imageSrc} alt="" style={{ width: "250px" }} />
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
          checked={ticket.isAvailable}
          onChange={(e) =>
            setTicket((prev) => ({ ...prev, isAvailable: e.target.checked }))
          }
        />
        Available
      </label>

      {formError && (
        <p className="error-message">Please fill in all required fields.</p>
      )}
      <button className="btn btn-primary mt-2" onClick={handleUpdate}>
        Update
      </button>
    </div>
  );
};

export default UpdateTicket;


// const UpdateTicket = () => {
//   const [ticket, setTicket] = useState({
//     ticketId: 0,
//     seatNumber: "",
//     ticketPrice: 0,
//     isAvailable: false,
//     eventId: 0, // Add eventId field with default value
//     image: "", 
//     imageSrc: "",
//     imageFile: null,
//   });

//   const navigate = useNavigate();

//   // useEffect(() => {
//   //   console.log("Venue ID:", ticketId);
//   //   fetchVenueData();
//   // }, [venueId]);

//   const [fetchedTicket, setFetchedTicket] = useState(null);

//   const ticketId = useParams();

//   useEffect(() => {
//     const fetchTicket = async () => {
//       try {
//         const response = await axios.get(
//           `https://localhost:7051/api/Tickets/${ticketId}`
//         );
//         setFetchedTicket(response.data);
//         console.log(response.data);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchTicket();
//   }, [ticketId]);

//   useEffect(() => {
//     if (fetchedTicket) {
//       setTicket((prev) => ({
//         ...prev,
//         ticketId: fetchedTicket.ticketId,
//         seatNumber: fetchedTicket.seatNumber,
//         ticketPrice: fetchedTicket.ticketPrice,
//         isAvailable: fetchedTicket.isAvailable,
//         eventId: fetchedTicket.eventId, 
//       }));
//       console.log(fetchedTicket);
//     }
//   }, [fetchedTicket]);

//   const handleChange = (e) => {
//     setTicket((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleClick = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `https://localhost:7051/api/Tickets/${ticket.ticketId}`,
//         ticket
//       );
//       navigate("/");
//       toast.success(" Updated Successfully! ");

//       console.log(ticket);
//     } catch (err) {
//       console.log(err);
//     }
//   };
//   useEffect(() => {
//     document.body.classList.add("body-with-update-ticket");
//     return () => {
//       document.body.classList.remove("body-with-update-ticket");
//     };
//   }, []);
//   return (
//     <div className="container">
//       <h2 className="s">Update Ticket</h2>
//       <div className="mb-3">

//       <input
//         type="text"
//         className="form-control"
//         placeholder="Seat Number"
//         onChange={handleChange}
//         name="seatNumber"
//         value={ticket.seatNumber}
//       />
//       </div>
//       <div className="mb-3">

//       <input
//         type="number"
//         className="form-control"
//         placeholder="Ticket Price"
//         onChange={handleChange}
//         name="ticketPrice"
//         value={ticket.ticketPrice}
//       />
//       </div>
//       <div className="mb-3">

//       <input
//         type="number"
//         className="form-control"
//         placeholder="Event ID"
//         onChange={handleChange}
//         name="eventId"
//         value={ticket.eventId}
//       />
//       </div>
//       <label>
//         <input
//           type="checkbox"
//           checked={ticket.isAvailable}
//           onChange={(e) =>
//             setTicket((prev) => ({ ...prev, isAvailable: e.target.checked }))
//           }
//         />
//         Available
//       </label>

//       <button className="btn btn-primary" onClick={handleClick}>
//         Update
//       </button>
//     </div>
//   );
// };

// export default UpdateTicket;
