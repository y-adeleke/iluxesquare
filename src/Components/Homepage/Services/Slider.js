import TavelProductPng from "../../../pictures/connectedworld.png";
import OrderFoodPng from "../../../pictures/food.png";
import ApartmentRentPng from "../../../pictures/homecabin.png";
import { Fragment, useEffect, useState } from "react";
import { MdFastfood } from "react-icons/md";
import { MdFlightTakeoff } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";

const Slider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slides = [
    {
      title: "Explore the world",
      image: TavelProductPng,
      class: "products-display-travel",
      icon: <MdFlightTakeoff className="icon" />,
    },
    {
      title: "Live in comfort",
      image: ApartmentRentPng,
      class: "products-display-apartment",
      icon: <GiFamilyHouse className="icon" />,
    },
    {
      title: "don't stress, order instead.",
      image: OrderFoodPng,
      class: "products-display-food",
      icon: <MdFastfood className="icon" />,
    },
  ];

  const slide = (
    <div className={slides[currentIndex].class}>
      <h1>{slides[currentIndex].title}</h1>
      <div className="img-con">
        <img src={slides[currentIndex].image} alt="" />
      </div>
      <div className="progress-box">
        <progress value="100" max="100" />
        <div className="arrows-box">
          <div>{slides[currentIndex].icon}</div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    setTimeout(() => {
      const isLastSlide = currentIndex === slides.length - 1;
      const newIndex = isLastSlide ? 0 : currentIndex + 1;
      setCurrentIndex(newIndex);
    }, 2000);
  }, [currentIndex, slides.length]);

  return <Fragment>{slide}</Fragment>;
};
export default Slider;
