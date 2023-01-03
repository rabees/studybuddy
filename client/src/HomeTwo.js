import React, { Component } from "react";
import NavBar from "./components/NavBar";
import HeroSliderTwo from "./components/HeroSliderTwo";
import TestimonialSlider from "./components/TestimonialSlider";
import Footer from "./components/Footer";
import AboutUs from "./components/AboutUs";

class HomeTwo extends Component {
  render() {
    return (
      <div>
        {/* Navigation bar */}
        <NavBar />

        {/* Hero slider */}
        <HeroSliderTwo />

        {/* About Us*/}
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
