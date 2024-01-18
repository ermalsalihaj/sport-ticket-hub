import React from "react";

import { SwiperSlide } from "swiper/react";

function GameSlide({ game, active, toggleVideo }) {
  return (
    <SwiperSlide>
      <div className="gameSlider">
        <img src={game.img} alt="Game Image" />
        <div className={`video ${active ? "active" : undefined}`}>
          <iframe
            width="1280"
            height="720"
            src={game.trailer}
            title={game.title}
            allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
            allowfullscreen
          ></iframe>
        </div>
        <div className="content">
          <h2>{game.title}</h2>
          <p>{game.description}</p>
          <div className="buttons"></div>
        </div>
      </div>
    </SwiperSlide>
  );
}

export default GameSlide;
