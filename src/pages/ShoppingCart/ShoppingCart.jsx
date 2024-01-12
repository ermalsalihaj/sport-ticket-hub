import React, { useEffect, useState } from "react";
import { variables } from "../../Variables";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

const ShoppingCart = () => {
  const [tickets, settickets] = useState([]);
  const [shoppingCart, setshoppingCart] = useState([]);

  const handleDelete = async (id) => {
    try {
      if (
        window.confirm("Are you sure you want to delete this venue?") == true
      ) {
        await axios.delete(`https://localhost:7051/api/ShoppingCarts/${id}`);
        toast.success(" Deleted Successfully! ");
        fetchAll();
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchAll = async () => {
    try {
      const shoppingCartResponse = await fetch(
        variables.API_URL + "shoppingCarts"
      );
      const ticketResponse = await fetch(variables.API_URL + "tickets");

      const shoppingCartData = await shoppingCartResponse.json();
      const ticketData = await ticketResponse.json();

      const shoppingCartWithTicket = shoppingCartData.map((shoppingCart) => {
        const ticket = ticketData.find(
          (ticket) => ticket.ticketId === shoppingCart.ticketId
        );
        const ticketPrice = ticket ? ticket.ticketPrice : "Unknown ticket";
        return { ...shoppingCart, ticketPrice };
      });

      setshoppingCart(shoppingCartWithTicket);
      console.log(shoppingCartWithTicket);
      settickets(ticketData);
      // console.log(ticketData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchAll();
  }, []);
  return (
    <div>
      <ToastContainer />

      <div className="col-lg-6">
        <h4 className="sectionTitle">ShoppingCart</h4>
      </div>
      <div className="row mb-4 mt-4">
        {shoppingCart.map((ShoppingCart) => (
          <div className="col-xl-3 col-lg-4 col-md-6">
            <div className="gameCard">
              <img className="img-fluid" />
              <div className="gameFeature">
                <span className="gameType">{ShoppingCart.totalPrice}</span>
              </div>
              <div className="gamePrice">
                <hr />
                <span className="currentPrice">
                  Price: {ShoppingCart.ticketPrice}$
                </span>
                <Link
                  to={`/update-shoppingcart/${ShoppingCart.shoppingCartId}`}
                >
                  <p> Update</p>
                </Link>
                <button
                  className="delete"
                  onClick={() => handleDelete(ShoppingCart.shoppingCartId)}
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

export default ShoppingCart;
