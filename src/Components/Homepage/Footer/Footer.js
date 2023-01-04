import "./Footer.css";
import { MdFastfood } from "react-icons/md";
import { MdFlightTakeoff } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { useEffect, useState } from "react";
import { BsTwitter } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsInstagram } from "react-icons/bs";

const Footer = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    <MdFlightTakeoff className="icon" />,
    <GiFamilyHouse className="icon" />,
    <MdFastfood className="icon" />,
  ];
  useEffect(() => {
    setTimeout(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 2000);
  }, [currentIndex, slides.length]);

  const footerIcon = (
    <div className="progress-box ">
      <progress value="100" max="100" />
      <div className="arrows-box">
        <div>{slides[currentIndex]}</div>
      </div>
    </div>
  );

  return (
    <footer className="homepage-footer">
      <div className="footer-icon">{footerIcon}</div>
      <div className="footer-con">
        <h1>Iluxesquare</h1>
        <div className="social-con">
          <div>
            <BsTwitter className="social-icon" />
            <span>Twitter</span>
          </div>
          <div>
            <BsInstagram className="social-icon" />
            <span>Instagram</span>
          </div>
          <div>
            <BsFacebook className="social-icon" />
            <span>Facebook</span>
          </div>
          <div>
            <span>©adeleke.co</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
