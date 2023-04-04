import React from 'react'
import Slider from 'react-slick';

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 3000, 
};

const Banner = () => {
  return (
    <Slider {...settings}>
      <div>
        <img src={`${process.env.PUBLIC_URL}/event1.png`} className="slide-banner" alt="banner1" />
      </div>
      <div>
        <img src={`${process.env.PUBLIC_URL}/event2.png`} className="slide-banner" alt="banner2" />
      </div>
    </Slider>
  );
};

export default Banner