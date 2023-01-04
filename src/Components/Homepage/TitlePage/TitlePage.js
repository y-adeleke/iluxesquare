import { Fragment, useEffect, useState } from "react";
import Header from "../Header/Header";
import "./TitlePage.css";
import AdventurePng from "../../../pictures/maintitle.png";
import { FaGooglePlay } from "react-icons/fa";
import { FaApple } from "react-icons/fa";

const TitlePage = (prop) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const titleText = [
    "one for all.",
    "Order Food.",
    "Buy an Apartment.",
    "Book flights.",
  ];
  const subText = [
    "less stress.",
    "don't stress, order instead.",
    "live like you never left home.",
    "fly anywhere, live your dreams.",
  ];

  useEffect(() => {
    setTimeout(() => {
      const isLastSlide = currentIndex === subText.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 2000);
  }, [currentIndex, subText.length]);
  return (
    <Fragment>
      <Header name={prop.name} />
      <div className="title-page">
        <section className="title-section">
          <div className="title-text">
            <div className="word-text">
              <span className="one-text">{titleText[currentIndex]}</span>
              <span className="all-text">{subText[currentIndex]}</span>
            </div>
            <div className="button-con">
              <button className="appstore-btn">
                <FaApple className="download-icon" />
                Download on App Store
              </button>
              <button className="playstore-btn">
                <FaGooglePlay className="download-icon" />
                Download on App Store
              </button>
            </div>
          </div>
          <div className="illus-con">
            <img src={AdventurePng} alt="" />
          </div>
        </section>
      </div>
    </Fragment>
  );
};
export default TitlePage;
