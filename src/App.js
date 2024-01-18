import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import React, { useState } from "react";
import "./App.css";
import Main from "./pages/Main/Main";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blog from "./pages/Blog/Blog";
import CreateBlog from "./pages/Blog/CreateBlog/CreateBlog";
import UpdateBlog from "./pages/Blog/CreateBlog/UpdateBlog";
import BlogDetails from "./pages/Blog/BlogDetails";
import Event from "./pages/Event/Event";
import CreateComment from "./pages/Blog/CreateComment/CreateComment";
import CreateVenue from "./pages/Venue/CreateVenue/CreateVenue";
import UpdateVenue from "./pages/Venue/CreateVenue/UpdateVenue";
import CreateEvent from "./pages/Event/CreateEvent/CreateEvent";
import UpdateEvent from "./pages/Event/CreateEvent/UpdateEvent";
import Login from "./pages/Login/Login";
import CreateTicket from "./pages/Ticket/CreateTicket/CreateTicket";
import UpdateTicket from "./pages/Ticket/CreateTicket/UpdateTicket";
import Admin from "./pages/Admin/Admin";
import UpdateUser from "./pages/Admin/UpdateUser";
import UpdateShoppingCart from "./pages/ShoppingCart/CreateShoppingCart/UpdateShoppingCart";
import Bag from "./pages/Bag/Bag";
import Ticket from "./pages/Ticket/Ticket";

export const AppContext = React.createContext();

function App() {
  const [library, setLibrary] = useState([]);
  const [bag, setBag] = useState([]);
  const [blog, setBlog] = useState([]);

  return (
    <>
      <AppContext.Provider value={{ library, setLibrary, blog, setBlog, bag, setBag }}>
        <Router>
          <Routes>
            <Route path="/create-venue" element={<CreateVenue />} />
            <Route path="/login" element={<Login />} />
            {/* <Route path="/blog" element={<Blog />} /> */}
            <Route path="/blog/:id" element={<BlogDetails />} />

            <Route path="/admin" element={<Admin />} />
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/create-comment/:blogId" element={<CreateComment />} />

            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/create-blog" element={<CreateBlog />} />
            <Route path="/update-venue/:venueId" element={<UpdateVenue />} />
            <Route path="/update-user/:userId" element={<UpdateUser />} />
            <Route path="/update-blog/:id" element={<UpdateBlog />} />
            <Route path="/update-event/:eventId" element={<UpdateEvent />} />
            <Route path="/update-ticket/:id" element={<UpdateTicket />} />
            <Route
              path="/update-shoppingcart/:shoppingCartId"
              element={<UpdateShoppingCart />}
            />
            <Route path="/" element={<Main />} />
          </Routes>
        </Router>
      </AppContext.Provider>
    </>
  );
}

export default App;
