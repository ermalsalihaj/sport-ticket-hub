import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import { variables } from "../../Variables";

import userImg from "../../images/UBT LOGO.png";

function Header({ toggleActive, isLoggedIn }) {
  const [shoppingCart, setshoppingCart] = useState([]);

  let username = localStorage.getItem("username");
  const role = localStorage.getItem("role");

  const navigate = useNavigate();
  const handleLogOut = () => {
    if (username !== "" || username !== null) {
      localStorage.clear();
      // window.reload();
      navigate("/");
    }
  };

  const fetchAll = async () => {
    try {
      const shoppingCartResponse = await fetch(
        "https://localhost:7051/api/ShoppingCarts"
      );
      const shoppingCartData = await shoppingCartResponse.json();
      setshoppingCart(shoppingCartData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <header>
      <a href="#" className="menu" onClick={toggleActive}>
        <i className="bi bi-sliders"></i>
      </a>

      <div className="userItems">
        <a href="#" className="icon">
          <i className="bi bi-heart-fill"></i>
          <span className="like">0</span>
        </a>
        <a href="#" className="icon">
          <i className="bi bi-bag-fill"></i>
          <span className="bag">{shoppingCart.length}</span>
        </a>
        {role === "admin" && (
          <div className="link">
            <Link to="/admin" className="admin">
              Dashboard
            </Link>
          </div>
        )}
        {username === "" || username === null ? (
          <div className="loginButton">
            <Link to="/login" className="button">
              Login
            </Link>
          </div>
        ) : (
          <div className="link">
            <button className="link" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
