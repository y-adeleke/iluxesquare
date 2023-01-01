import React from "react";
//import Header from "./Header/Header";
import TitlePage from "./TitlePage/TitlePage";
import ProductSection from "./ProductSection/ProductSection";
import Services from "./Services/Services";
import ReviewsAndComments from "./ReviewsAndComment/ReviewsAndComment";
import FaqAnswer from "./FaqAndAnswers/FaqAnswer";
import Footer from "./Footer/Footer";

import "./HomePage.css";

const HomePage = () => {
  return (
    <div className="homepage-container">
      <TitlePage />
      <ProductSection />
      <Services />
      <ReviewsAndComments />
      <FaqAnswer />
      <Footer />
    </div>
  );
};
export default HomePage;

/**
 *       <svg
        className="background-svg"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#28405b"
          fillOpacity="1"
          d="M0,64L80,69.3C160,75,320,85,480,96C640,107,800,117,960,106.7C1120,96,1280,64,1360,48L1440,32L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
        ></path>
      </svg>
 */
