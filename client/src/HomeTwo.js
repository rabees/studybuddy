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

        {/* Video CTA */}
        <AboutUs />

        {/* Project Slider */}
        {/* <ProjectSliderTwo /> */}

        {/* Service Tab */}
        {/* <ServiceTab /> */}

        {/* Testimonial Slider */}
        <TestimonialSlider />

        {/* Team job */}

        {/* Brand logo */}
        {/* <BrandLogoSlider background="grey-bg" /> */}

        {/* Blog grid */}

        {/* Footer */}
        <Footer />

        {/* Mobile Menu */}
        {/* <MobileMenu /> */}
      </div>
    );
  }
}

export default HomeTwo;
