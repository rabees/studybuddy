import React, { Component } from "react";
import NavBar from "./components/NavBar";
import HeroSliderTwo from "./components/HeroSliderTwo";
import AboutUs from "./components/AboutUs";
import TestimonialSlider from "./components/TestimonialSlider";
import Footer from "./components/Footer";

class HomeTwo extends Component {
  render() {
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/* Hero slider */}
        <HeroSliderTwo />

        {/* AboutUs */}
        <AboutUs />

        {/* Testimonial Slider */}
        <TestimonialSlider />

        {/* Footer */}
        <Footer />
      </div>
    );
  }
}

export default HomeTwo;
