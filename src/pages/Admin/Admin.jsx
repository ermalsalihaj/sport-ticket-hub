import "./admin.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import EventCategoryEnum from "../Event/EventCategoryEnum";

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [events, setEvents] = useState([]);
  const [venues, setVenues] = useState([]);
  const [tickets, setTickets] = useState([]);
  const [shoppingCarts, setShoppingCarts] = useState([]);
  const [loading, setLoading] = useState(true);
  const role = localStorage.getItem("role");
  const [selectedContent, setSelectedContent] = useState("home");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await axios.get(
          "https://localhost:7051/api/Users"
        );
        setUsers(usersResponse.data);

        const eventsResponse = await axios.get(
          "https://localhost:7051/api/Events"
        );
        setEvents(eventsResponse.data);

        const venuesResponse = await axios.get(
          "https://localhost:7051/api/Venues"
        );
        setVenues(venuesResponse.data);

        const ticketsResponse = await axios.get(
          "https://localhost:7051/api/Tickets"
        );
        setTickets(ticketsResponse.data);

        const shoppingCartsResponse = await axios.get(
          "https://localhost:7051/api/ShoppingCarts"
        );
        setShoppingCarts(shoppingCartsResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const deleteTicket = async (id) => {
    try {
      await axios.delete(`https://localhost:7051/api/Tickets/${id}`);
      setTickets(tickets.filter((ticket) => ticket.ticketId !== id));
      toast.success("Ticket deleted successfully");
    } catch (error) {
      console.error("Error deleting ticket:", error);
      toast.error("Error deleting ticket");
    }
  };

  const deleteShoppingCart = async (id) => {
    try {
      await axios.delete(`https://localhost:7051/api/ShoppingCarts/${id}`);
      setShoppingCarts(
        shoppingCarts.filter((cart) => cart.shoppingCartId !== id)
      );
      toast.success("Shopping cart deleted successfully");
    } catch (error) {
      console.error("Error deleting shopping cart:", error);
      toast.error("Error deleting shopping cart");
    }
  };

  const deleteEvent = async (id) => {
    try {
      await axios.delete(`https://localhost:7051/api/Events/${id}`);
      setEvents(events.filter((event) => event.eventId !== id));
      toast.success("Event deleted successfully");
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Error deleting event");
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.delete(`https://localhost:7051/api/Users/${id}`);
      setUsers(users.filter((user) => user.userId !== id));
      toast.success("User deleted successfully");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("Error deleting user");
    }
  };

  const deleteVenue = async (id) => {
    try {
      await axios.delete(`https://localhost:7051/api/Venues/${id}`);
      setVenues(venues.filter((venue) => venue.venueId !== id));
      toast.success("Venue deleted successfully");
    } catch (error) {
      console.error("Error deleting venue:", error);
      toast.error("Error deleting venue");
    }
  };

  const updateUser = async (id, updatedUserData) => {
    try {
      await axios.put(
        `https://localhost:7051/api/Users/PutUser/${id}`,
        updatedUserData
      );
      const response = await axios.get("https://localhost:7051/api/Users");
      setUsers(response.data);
      toast.success("User updated successfully");
    } catch (error) {
      console.error("Error updating user:", error);
      toast.error("Error updating user");
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

  const [searchdata, setsearchdata] = useState(users);

  const [text, setText] = useState("");

  useEffect(() => {
    setsearchdata(users);
  }, [users]);
  
  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
  
    const filteredUsers = searchText
      ? users.filter((user) =>
          user.userName.toLowerCase().includes(searchText)
        )
      : users;
  
    setsearchdata(filteredUsers);
    setText(searchText);
  };
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  const renderSidebar = () => {
    if (role === "admin") {
      return (
        <div className="sidebar">
          <button onClick={() => handleContentChange("home")}>Home</button>
          <button onClick={() => handleContentChange("users")}>Users</button>
          <button onClick={() => handleContentChange("events")}>Events</button>
          <button onClick={() => handleContentChange("venues")}>Venues</button>
          <button onClick={() => handleContentChange("tickets")}>
            Tickets
          </button>
          <button onClick={() => handleContentChange("shoppingCarts")}>
            Shopping Carts
          </button>
          <button className="logout-btn" onClick={handleLogOut}>
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="sidebar">
          <div className="access-message">
            <p>You Do Not Have Access To This Page Admins Only</p>
          </div>
        </div>
      );
    }
  };

  const renderContentTable = () => {
    switch (selectedContent) {
      case "home":
        return renderHomeCard();
      case "users":
        return renderUsersTable();
      case "events":
        return renderEventsTable();
      case "venues":
        return renderVenuesTable();
      case "tickets":
        return renderTicketsTable();
      case "shoppingCarts":
        return renderShoppingCartsTable();
      default:
        return null;
    }
  };

  const renderHomeCard = () => {
    return (
      <div>
        <h2>Home</h2>
        <div className="home-card">
          <div className="length-box">
            <p>Total Users: {users.length}</p>
          </div>
          <div className="length-box">
            <p>Total Events: {events.length}</p>
          </div>
          <div className="length-box">
            <p>Total Venues: {venues.length}</p>
          </div>
          <div className="length-box">
            <p>Total Tickets: {tickets.length}</p>
          </div>
          <div className="length-box">
            <p>Total Shopping Carts: {shoppingCarts.length}</p>
          </div>
        </div>
      </div>
    );
  };

  const renderUsersTable = () => {
    return (
      <div>
        <h2 style={{ marginLeft: "250px" }}>Users</h2>
            <input style={{ marginLeft: "250px" }}
                    type="text"
                    name="search"
                    value={text}
                    placeholder="Search"
                    onChange={handleSearch}
                  />
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {searchdata.map((user) => (
              <tr key={user.userId}>
                <td>{user.userId}</td>
                <td>{user.userName}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <button
                    className="btn btn-danger button-danger"
                    onClick={() => deleteUser(user.userId)}
                  >
                    Delete
                  </button>
                  <Link to={`/update-user/${user.userId}`}>
                    <button className="btn btn-primary">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderEventsTable = () => {
    return (
      <div>
        <div className="links">
          <h2>Events</h2>
          <Link to={`/create-event`}>
            <button className="btn btn-warning">Create Event</button>
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Date</th>
              <th>Event Category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.eventId}>
                <td>{event.eventId}</td>
                <td>{event.name}</td>
                <td>{formatDate(event.date)}</td>
                <td>
                  Category:{" "}
                  {Object.keys(EventCategoryEnum)[event.eventCategory - 1]}
                </td>
                <td>
                  <button
                    className="btn btn-danger button-danger"
                    onClick={() => deleteEvent(event.eventId)}
                  >
                    Delete
                  </button>
                  <Link to={`/update-event/${event.eventId}`}>
                    <button className="btn btn-primary">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderVenuesTable = () => {
    return (
      <div>
        <div className="links">
          <h2>Venues</h2>
          <Link to={`/create-venue`}>
            <button className="btn btn-warning">Create Venue</button>
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Capacity</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {venues.map((venue) => (
              <tr key={venue.venueId}>
                <td>{venue.venueId}</td>
                <td>{venue.name}</td>
                <td>{venue.location}</td>
                <td>{venue.capacity}</td>
                <td>
                  <button
                    className="btn btn-danger button-danger"
                    onClick={() => deleteVenue(venue.venueId)}
                  >
                    Delete
                  </button>
                  <Link to={`/update-venue/${venue.venueId}`}>
                    <button className="btn btn-primary">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderTicketsTable = () => {
    return (
      <div>
        <div className="links">
          <h2>Tickets</h2>
          <Link to={`/create-ticket`}>
            <button className="btn btn-warning">Create Ticket</button>
          </Link>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Event ID</th>
              <th>SeatNumber</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.ticketId}>
                <td>{ticket.ticketId}</td>
                <td>{ticket.eventId}</td>
                <td>{ticket.seatNumber}</td>
                <td>{ticket.ticketPrice}</td>
                <td>{ticket.isAvailable.toString()}</td>
                <td>
                  <button
                    className="btn btn-danger button-danger"
                    onClick={() => deleteTicket(ticket.ticketId)}
                  >
                    Delete
                  </button>
                  <Link to={`/update-ticket/${ticket.ticketId}`}>
                    <button className="btn btn-primary">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderShoppingCartsTable = () => {
    return (
      <div>
        <h2 style={{ marginLeft: "250px" }}>Shopping Carts</h2>
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              {/* <th>User ID</th> */}
              <th>Total Price</th>
              <th>Ticket ID</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {shoppingCarts.map((cart) => (
              <tr key={cart.shoppingCartId}>
                <td>{cart.shoppingCartId}</td>
                {/* <td>{cart.userId}</td> */}
                <td>{cart.totalPrice}</td>
                <td>{cart.ticketId}</td>
                <td>
                  <button
                    className="btn btn-danger button-danger"
                    onClick={() => deleteShoppingCart(cart.shoppingCartId)}
                  >
                    Delete
                  </button>
                  <Link to={`/update-shoppingcart/${cart.shoppingCartId}`}>
                    <button className="btn btn-primary">Update</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <ToastContainer />

      {renderSidebar()}

      {role === "admin" ? (
        <div>
          <h1>Admin Dashboard</h1>

          {renderContentTable()}
        </div>
      ) : (
        <div>
          <h1>You Do Not Have Access To This Page Admins Only</h1>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
