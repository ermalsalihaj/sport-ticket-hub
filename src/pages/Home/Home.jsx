import React, { useEffect, useState } from "react";
import "./home.css";
import GameSwiper from "../../components/GameSwiper";
import GameCard from "../../components/GameCard";
import { variables } from "../../Variables";
import Event from "../Event/Event";
import Ticket from "../Ticket/Ticket";
import Venue from "../Venue/Venue";
import ShoppingCart from "../ShoppingCart/ShoppingCart";

function Home({ games, reference }) {
  return (
    <section id="home" className="home active" ref={reference}>
      <div className="container-fluid">
        <div className="row">
          <GameSwiper games={games} />
        </div>
        <div className="row mb-4 mt-4">
          <div className="col-lg-6">
            <h2 className="sectionTitle">Game on promotion</h2>
          </div>
          <div className="col-lg-6 d-flex justify-content-end align-items-center">
            <a href="#" className="viewMore">
              View more Games <i className="bi bi-arrow-right"></i>
            </a>
          </div>

          <Ticket />
          <Event />
          <Venue />
        </div>
      </div>
    </section>
  );
}

export default Home;
