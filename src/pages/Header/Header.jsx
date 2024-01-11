import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./header.css";
import userImg from "../../images/UBT LOGO.png";

function Header({ toggleActive, isLoggedIn }) {
  let username = localStorage.getItem('username');
  const navigate = useNavigate();
  const handleLogOut = () => {
    if(username !== '' || username !== null){
      localStorage.clear();
      // window.reload();
      navigate("/");
    }
  }

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
          <span className="bag">0</span>
        </a>
        {username === '' || username === null ? (
          <div className="loginButton">
          <Link to="/login" className="button">
            Login
          </Link>
        </div>
          // <div className="avatar">
          //   <a href="#">
          //     <img src={userImg} alt="User Image" />
          //   </a>
          //   <div className="user">
          //     <span>User Name</span>
          //     <a href="#">View Profile</a>
          //   </div>
          // </div>
        ) : (
          <div className="loginButton">
            <button className="button" onClick={handleLogOut}>
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
