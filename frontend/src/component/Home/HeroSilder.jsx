import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import Button from "@mui/material/Button";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";

import img06 from "../../Image/Cricket-wepon/06.jpg";
import img01 from "../../Image/Cricket-wepon/01.jpeg";
import img2 from "../../Image/Cricket-wepon/img2.png";
import img03 from "../../Image/Cricket-wepon/03.jpg";
import img05 from "../../Image/Cricket-wepon/05.jpg";
import img04 from "../../Image/Cricket-wepon/04.jpeg";

const classes = {
  slide: {
    height: "calc(100vh - 64px)",
    width: "100%",
    position: "relative",
  },
  slideContent: {
    position: "absolute",
    top: "50%",
    left: "10%",
    transform: "translateY(-50%)",
    textAlign: "left",
    color: "#fff",
    zIndex: 1,
  },
  quote: {
    fontSize: "16px",
    width: "30vw",
    fontWeight: 500,
    marginBottom: "8px",
  },
  saleText: {
    fontSize: "32px",
    fontFamily: "Roboto",
    fontWeight: "800",
    width: "45vw",
    marginBottom: "8px",
  },
  productButton: {
    backgroundColor: "transparent",
    color: "#fff",
    border: "1px solid #fff",
    borderRadius: "4px",
    padding: "8px 24px",
    transition: "background-color 0.3s ease-in-out",
  },
  slideImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  swiperContainer: {
    height: "calc(100vh - 64px)",
  },
  navButton: {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 10,
    backgroundColor: "#00000088",
    color: "#fff",
    border: "none",
    padding: "8px",
    cursor: "pointer",
  },
  prevButton: {
    left: 0,
  },
  nextButton: {
    right: 0,
  },
};

const slides = [
  {
    image: img06,
    quote: "Elevate Your Everyday.",
    saleText: "Next Toppers Signature Black Hoodie — Crafted for Those Who Lead.",
    productText: "Discover Collection",
  },
  {
    image: img01,
    quote: "Where Comfort Meets Prestige.",
    saleText: "Premium Cotton T-Shirts Designed with Refined Simplicity.",
    productText: "Explore Now",
  },
  {
    image: img2,
    quote: "Minimal. Timeless. Exceptional.",
    saleText: "Luxury Streetwear Inspired by Ambition and Excellence.",
    productText: "View Collection",
  },
  {
    image: img03,
    quote: "Made for the Modern Achiever.",
    saleText: "Tailored Fit • Superior Fabric • Signature Finish.",
    productText: "Shop Now",
     
  },
  {
    image: img05,
    quote: "Statement in Every Detail.",
    saleText: "The Next Toppers Hoodie — Limited Edition Winter Essential.",
    productText: "Own It",
  },
  {
    image: img04,
    quote: "Designed to Be Remembered.",
    saleText: "Exclusive Apparel for Those Who Define the Future.",
    productText: "Enter Store",
  },
];

export default function HeroSlider() {
  const isMobile = useMediaQuery("(max-width:600px)");

  // Only include the special banner on mobile
  const filteredSlides = isMobile
    ? slides
    : slides.filter(
        (slide) =>
          slide.image !== img06
      );

  return (
    <div style={classes.swiperContainer}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={0}
        slidesPerView={1}
        navigation={{
          prevEl: '.prevButton',
          nextEl: '.nextButton',
        }}
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        style={classes.slide}
      >
        {filteredSlides.map((slide, index) => (
          <SwiperSlide key={index}>
            <img src={slide.image} alt="slider" style={classes.slideImage} />
            <div style={classes.slideContent}>
              <h2 style={classes.quote}>{slide.quote}</h2>
              <h3 style={classes.saleText}>{slide.saleText}</h3>
              <Link to="/products">
                <Button style={classes.productButton}>{slide.productText}</Button>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <button style={{ ...classes.navButton, ...classes.prevButton }} className="prevButton">
        <ArrowBackIosIcon />
      </button>
      <button style={{ ...classes.navButton, ...classes.nextButton }} className="nextButton">
        <ArrowForwardIosIcon />
      </button>
    </div>
  );
}
