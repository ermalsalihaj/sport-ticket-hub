import React, { useState } from "react";
import "./sideMenu.css";
import navListData from "../data/navListData";
import NavListItem from "./NavListItem";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

function SideMenu({ active, sectionActive }) {
  const [navActive, setNavActive] = useState(active);
  const [navData, setNavData] = useState(navListData);

  const handleNavOnClick = (id, target) => {
    const newNavData = navData.map((nav) => {
      nav.active = false;
      if (nav._id === id) nav.active = true;
      return nav;
    });
    setNavData(newNavData);
    sectionActive(target);
  };


  return (
    <div className={`sideMenu ${navActive ? "active" : ""}`}>
     
      <a href="#" className="logo">
        <i className="bi bi-ticket"></i>
        <span className="brand">Games</span>
      </a>
      <div className="container-fluid">
        <div className="row">
          <div className="col-md-12">
            <ul className="nav">
              {navData.map((item) => (
                <NavListItem key={item._id} item={item} navOnClick={handleNavOnClick} />
              ))}
            </ul>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <ul className="social">
              <li>
                <a href="#">
                  <i className="bi bi-meta"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-twitter-x"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-youtube"></i>
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="bi bi-share"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
