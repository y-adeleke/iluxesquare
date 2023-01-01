import "./Services.css";
import Slider from "./Slider";

const Services = () => {
  return (
    <section className="section-services">
      <div className="services-text-con">
        <h1 className="services-title">
          Everything you need, Everything you want!
        </h1>
        <p>
          Need to travel for holidays or for other purposes? We have everything
          you need from booking flights, renting apartments and ordering food.
          you deserve no stress, give us a try and do everything in a go!
        </p>
      </div>
      <Slider />
    </section>
  );
};
export default Services;
