import React, { memo } from "react";
import Slider from "react-slick";
import Image from "../../assets/image.png";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const LeftSideContainer = () => {
  const settings = {
    infinite: true,
    speed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
  };
  return (
    // <div className="login-left">
    //   <img src={Image} alt="" />
    // </div>
    <div className="carousel-container">
      <Slider {...settings}>
        <div>
          <img src={Image} alt="Image 1" className="carousel-image" />
        </div>
        <div>
          <img src={Image} alt="Image 2" className="carousel-image" />
        </div>
        <div>
          <img src={Image} alt="Image 3" className="carousel-image" />
        </div>
      </Slider>
    </div>
  );
};

export default LeftSideContainer;
