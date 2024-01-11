import React, { useContext, useEffect, useState } from "react";
import "./bag.css";
import ShopBagItem from "../../components/ShopBagItem";
import { variables } from "../../Variables";
import Ticket from "../Ticket/Ticket";

function Bag({ games, reference }) {
  const [total, setTotal] = useState(0);
  const [shoppingCarts, setshoppingCarts] = useState([]);
  const [ticket, setticket] = useState([]);

  // const { selectedTicket } = useContext(TicketContext);

  const handleTotalPayment = () => {
    if (games && games.length > 0) {
      return games
        .map((game) => game.price * (1 - game.discount))
        .reduce((accumulator, currentValue) => accumulator + currentValue, 0)
        .toFixed(2);
    }
    return 0;
  };


  useEffect(() => {
    setTotal(handleTotalPayment());
  }, [games]);

  useEffect(() => {
    fetchAll();
  }, []);
  
  const fetchAll = async () => {
    try {
      const shoppingCartsResponse = await fetch(variables.API_URL + "shoppingCarts");
      const ticketsResponse = await fetch(variables.API_URL + "tickets");
      
      const shoppingCartsData = await shoppingCartsResponse.json();
      const ticketsData = await ticketsResponse.json();

      const shoppingCartTicket = shoppingCartsData.map((shoppingCarts) => {
        const ticket = ticketsData.find((ticket) => ticket.ticketId === shoppingCarts.ticketId);
        const ticketPrice = ticket ? ticket.ticketPrice : "Unknown ticket";
        const ticketseat = ticket ? ticket.seatNumber : "Unknown ticket";
        return { ...shoppingCarts, ticketseat ,ticketPrice};
      });

      setshoppingCarts(shoppingCartTicket);
      setticket(ticketsData);
      console.log(shoppingCartTicket);
      console.log(ticketsData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <section id="bag" className="bag" ref={reference}>
      <div className="container-fluid">
        <div className="row mb-3">
          <h1>My Bag</h1>
        </div>
      </div>
      {/* {games.length === 0 ? (
        <h2>Your bag is empty</h2>
      ) : ( */}
        <>
          <div className="row">
          {/* {shoppingCarts.map((ticket) => (
            <p>{ticket.ticketPrice}</p>
        // <ShopBagItem key={index} ticket={ticket} />
      ))} */}
            <div className="table-responsive">
              <table className="shopBagTable table table-borderless align-middle">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Preview</th>
                    
                  </tr>
                </thead>
                <tbody>
                  {shoppingCarts.map((shoppingCart) => (
                    // <tr key={shoppingCart.shoppingCartsid}>
                    <tr key={shoppingCart.ticketId === ticket.ticketId}>
                      <td>{shoppingCart.ticketseat}</td>
                      <td>Price: {shoppingCart.ticketPrice}$</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>





            <div className="table-responsive">
              <table className="shopBagTable table table-borderless align-middle">
                <thead>
                  <tr>
                    <th scope="col">No.</th>
                    <th scope="col">Preview</th>
                    <th scope="col">Game</th>
                    <th scope="col">Price</th>
                    <th scope="col">Discount</th>
                    <th scope="col">Payment</th>
                    <th scope="col">Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {/* {games.map((game, index) => (
                    <ShopBagItem index={index} key={game._id} game={game} />
                  ))} */}
                </tbody>
              </table>
            </div>



          </div>
          <div className="row d-flex justify-content-between mt-1">
            <div className="col-lg-2 d-flex align-items-center">
              {/* <p className="itemCount">Total Items:{games.length}</p> */}
            </div>
            <div className="col-lg-10 d-flex justify-content-end">
              <div className="payment">
                Total: {total}
                <a href="#">
                  Check out <i class="bi bi-wallet-fill"></i>
                </a>
              </div>
            </div>
          </div>
        </>
      {/* ) */}
      {/* } */}
    </section>
  );
}

export default Bag;
