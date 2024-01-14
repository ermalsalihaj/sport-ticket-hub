import React, { useEffect, useState } from "react";
import "./categories.css";
import filterListData from "../../data/filterListData";
import GameCard from "../../components/GameCard";
import { variables } from "../../Variables";
import EventCategoryEnum from "../Event/EventCategoryEnum";

function Categories({ games, reference }) {
  const [filters, setFilters] = useState(filterListData);
  const [events, setevents] = useState([]);
  const [venues, setvenues] = useState([]);
  
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [text, setText] = useState("");
  
  const filteredEvents = selectedCategory
  ? events.filter(
    (event) => event.eventCategory === parseInt(selectedCategory)
    ) : events;

    const [data, setData] = useState(events);
    
  const handleSearchGames = (e) => {
    const searchText = e.target.value.toLowerCase();

    const filteredEvents = events.filter((event) =>
      event.name.toLowerCase().includes(searchText)
    );

    setData(filteredEvents);
    console.log(filteredEvents);

    setText(searchText);
    console.log(searchText);
  };

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const eventResponse = await fetch(variables.API_URL + "events");
        const venuesResponse = await fetch(variables.API_URL + "venues");

        const eventData = await eventResponse.json();
        const venuesData = await venuesResponse.json();

        const venuesEvent = eventData.map((events) => {
          const venue = venuesData.find(
            (venue) => venue.venueId === events.venueId
          );
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


  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  // console.log(filteredEvents);

  return (
    <section id="categories" className="categories" ref={reference}>
      <div className="container-fluid mt-2">
        <div className="row">
          <div className="col-lg-8 d-flex align-items-center justify-content-start">
            <ul className="filters" onClick={handleCategoryChange}>
              <li value={null} className="filter.active">
                All Categories
              </li>
              <li value={1} className="filter.active">
                Football
              </li>
              <li value={2} className="filter.active">
                Basketball
              </li>
              <li value={3} className="filter.active">
                Tennis
              </li>
              <li value={4} className="filter.active">
                Ucf
              </li>
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
          <div className="row mb-4 mt-4">
            {filteredEvents.map((event) => (
              <div className="col-xl-3 col-lg-4 col-md-6">
                <div className="gameCard">
                  <img className="img-fluid" />
                  <div className="gameFeature ">
                    <span className="gameType">{event.name}</span>
                  </div>
                  <div className="gamePrice">
                    <span className="currentPrice">
                      Category:{" "}
                      {Object.keys(EventCategoryEnum)[event.eventCategory - 1]}
                    </span>

                    <span className="currentPrice">
                      {formatDate(event.date)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Categories;
