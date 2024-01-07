import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const UpdateShoppingCart = () => {
  const [cart, setCart] = useState({
    shoppingCartId: 0,
    totalPrice: 0,
    ticketId: 0,
  });

  const navigate = useNavigate();
  const location = useLocation();

  const [sport, setSport] = useState(null);

  const idshoppingCart = location.pathname.split("/")[2];

  useEffect(() => {
    const fetch = async () => {
      try {
        const response = await axios.get(`https://localhost:7051/api/ShoppingCarts/${idshoppingCart}`);
        setSport(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetch();
  }, [idshoppingCart]);

  useEffect(() => {
    if (sport) {
      setCart(sport);
    }
  }, [sport]);

  const handleChange = (e) => {
    setCart((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `https://localhost:7051/api/ShoppingCarts/PutShoppingCart/${idshoppingCart}`,
        cart
      );
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <h2 className="s">Update Shopping Cart</h2>
      <input
        type="text"
        placeholder="shoppingCartId"
        onChange={handleChange}
        name="shoppingCartId"
        value={cart.shoppingCartId}
        readOnly  // Make the input field readonly
      />
      <input
        type="number"
        placeholder="totalPrice"
        onChange={handleChange}
        name="totalPrice"
        value={cart.totalPrice}
      />
      <input
        type="number"
        placeholder="ticketId"
        onChange={handleChange}
        name="ticketId"
        value={cart.ticketId}
      />

      <button className="formButton" onClick={handleClick}>
        Update
      </button>
    </div>
  );
};

export default UpdateShoppingCart;
