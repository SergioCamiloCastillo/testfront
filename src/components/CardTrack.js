import React from "react";
import Slider from "react-slick";

const CardTrack = (tracks) => {
  console.log("cliente id",process.env.CLIENTID);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
  };
  const millisToMinutesAndSeconds = (millis) => {
    let minutes = Math.floor(millis / 60000);
    let seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  };
  return (
    <div>
      <Slider {...settings}>
        {tracks?.tracks.map((item, index) => (
          <div key={item.track.id} className="track-list">
            <div className="track">
              <img src={item.track.album.images[0].url} />
              <div className='title-duration-artist'>
                <h3>{item.track.name}</h3>
                <span>{item.track.artists[0].name}</span><br/>
                <span>{millisToMinutesAndSeconds(item.track.duration_ms)}</span>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardTrack;
