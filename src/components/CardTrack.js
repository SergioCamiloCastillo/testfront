import React from "react";
import Slider from "react-slick";

const CardTrack = (tracks) => {
  console.log("viene a tracks: ", tracks);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
  };
  return (
    <div>
      <Slider {...settings}>
        {tracks?.tracks.map((item,index) => (
          <div key={item.track.id}>
            <h3>{item.track.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CardTrack;
