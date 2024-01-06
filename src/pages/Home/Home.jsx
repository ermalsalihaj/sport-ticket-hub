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
            <Venue/>
            <Event/>
            <Ticket/>
            <ShoppingCart/>
          {/* {tickets.map((ticket) => (
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="gameCard">
                <img className="img-fluid" />
                <div className="gameFeature">
                  <span className="gameType">{ticket.seatNumber}</span>
                  <h3 className="gameTitle mt-4 mb-3">{ticket.isAvailable ? "Available" : "Not Available"}</h3>
                  
                </div>
                <div className="gamePrice">
                  <h3 className="gameTitle mt-4 mb-3">{ticket.eventName}</h3>
                  <span className="currentPrice">{formatDate(ticket.eventDate)}</span>
                  <hr />
                  <span className="currentPrice">Price: {ticket.ticketPrice}$</span>
                </div>
              </div>
            </div>
          ))} */}
          
        </div>
      </div>
    </section>

    // <section id="home" className="home active" ref={reference}>

    //   <div className="container-fluid">
    //     <div className="row">
    //       <GameSwiper games={games} />
    //     </div>
    //     <div className="row mb-4 mt-4">
    //       <div className="col-lg-6">
    //         <h2 className="sectionTitle">Game on promotion</h2>
    //       </div>
    //       <div className="col-lg-6 d-flex justify-content-end align-items-center">
    //         <a href="#" className="viewMore">
    //           View more Games <i className="bi bi-arrow-right"></i>
    //         </a>
    //       </div>
    //     </div>

    //         <div className="col-xl-3 col-lg-4 col-md-6">
    //           <div className="gameCard">
    //             <img className="img-fluid" />
    //             {/* <a
    //   href="#"
    //   className={`like ${library.includes(game) ? "active" : undefined}`}
    //   onClick={
    //     library.includes(game)
    //       ? () => handleRemoveFromLibrary(game)
    //       : () => handleAddToLibrary(game)
    //   }
    // >
    //   <i class="bi bi-heart-fill"></i>
    // </a> */}

    //             <div className="gameFeature">
    //               <span className="gameType" >{venue.name}</span>
    //               {/* <GameRating rating={game.rating} /> */}
    //               <h3 className="gameTitle mt-4 mb-3">{venue.location}</h3>
    //             </div>

    //             <div className="gamePrice">
    //               {/* {game.discount != 0 && (
    //   <>
    //     <span className="discount">
    //       <i>{game.discount * 100}%</i>
    //     </span>
    //     <span className="prevPrice">${game.price.toFixed(2)}</span>
    //   </>
    // )}
    // <span className="currentPrice">
    //   ${((1 - game.discount) * game.price).toFixed(2)}
    // </span> */}
    //               <span className="currentPrice">price</span>
    //             </div>
    //             {/* <a href="#" className="addBag" onClick={()=>handleAddToBag(game)}>
    //   <i class="bi bi-bag-plus-fill"></i>
    // </a> */}
    //           </div>
    //         </div>

    //     {/* <div className="row">
    //       {games.slice(0, 4).map((game) => (
    //         <GameCard key={game._id} game={game} />
    //       ))}
    //     </div> */}
    //   </div>
    // </section>
  );
}

export default Home;
