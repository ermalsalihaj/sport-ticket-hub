import React, { useEffect, useState } from "react";
import "./categories.css";
import filterListData from "../../data/filterListData";
import GameCard from "../../components/GameCard";
import { variables } from "../../Variables";

function Categories({ games, reference }) {
  const [data, setData] = useState(games);
  const [filters, setFilters] = useState(filterListData);
  const [events, setevents] = useState([]);
  const [venues, setvenues] = useState([]);

  const handleFilterGames = (category) => {
    setFilters(
      filters.map((filter) => {
        filter.active = false;
        if (filter.name === category) {
          filter.active = true;
        }
        return filter;
      })
    );
    if (category === "All") {
      setData(games);
      return;
    }
    setData(games.filter((game) => game.category === category));
  };
  const [text, setText] = useState("");

  const handleSearchGames = (e) => {
    setData(
      games.filter((game) =>
        game.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
    setText(e.target.value);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const eventResponse = await fetch(variables.API_URL + "events");
        const venuesResponse = await fetch(variables.API_URL + "venues");
        
        const eventData = await eventResponse.json();
        const venuesData = await venuesResponse.json();

        const venuesEvent = eventData.map((events) => {
          const venue = venuesData.find((venue) => venue.venueId === events.venueId);
          const venueName = venue ? venue.name : "Unknown Venue";
          return { ...events, venueName };
        });

        setevents(venuesEvent);
        setvenues(venuesData);
        // console.log(venuesData);
        // console.log(eventData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchAll();
  }, []);

  function formatDate(dateString) {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
  
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;
  
    return `${formattedDay}/${formattedMonth}/${year}`;
  }

  return (
    <section id="categories" className="categories" ref={reference}>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center justify-content-start">
            <ul className="filters">
              {filters.map((filter) => (
                <li
                  key={filter._id}
                  className={`${filter.active ? "active" : undefined}`}
                  onClick={() => handleFilterGames(filter.name)}
                >
                  {filter.name}
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-4 d-flex align-items-center justify-content-end">
            <div className="search">
              <i class="bi-bi-search"></i>
              <input
                type="text"
                name="search"
                value={text}
                placeholder="Search"
                onChange={handleSearchGames}
              />
            </div>
          </div>
        </div>
        <div className="row">
        {events.map((event) => (
            <div className="col-xl-3 col-lg-4 col-md-6">
              <div className="gameCard">
                <img className="img-fluid"/>
                <div className="gameFeature">
                  <span className="gameType">{event.name}</span>
                  {/* <h3 className="gameTitle mt-4 mb-3">{event.isAvailable ? "Available" : "Not Available"}</h3> */}
                  
                </div>
                <div className="gamePrice">
                  <h3 className="gameTitle mt-4 mb-3">Venue: {event.venueName}</h3>
               
                  <span className="currentPrice">Category: {event.eventCategory}</span>
             
                  <span className="currentPrice">{formatDate(event.date)}</span>
             

                  {/* <span className="currentPrice">Price: {event.eventPrice}$</span> */}
                </div>
              </div>
            </div>
          ))}

          {/* {data.map((game) => (
            <GameCard key={game._id} game={game} />
          ))} */}
        </div>
      </div>
    </section>
  );
}

export default Categories;
