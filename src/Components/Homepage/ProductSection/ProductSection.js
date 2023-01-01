import { useContext } from "react";
import "./ProductSection.css";
import ProductsHelper from "./ProductComponentHelper";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

const ProductSection = () => {
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  ///////////

  const foodOrdercontent = {
    title: "Don't stress, Order Instead!",
    infoContent:
      "while stress yourself, when it can be brought to your doorstep instead? enjoy  a swift process of ordering any food  of your choice and it will be brought to your door-step with an affordable develivery fee. ",
    btnText: "Order Food →",
    onClick: () => {
      if (!ctx.isLoggedIn) {
        navigate("/authentication/sign-in", { replace: true });
        return;
      }
      ctx.foodPageActiveFunc("active");
      navigate("food");
    },
  };

  const shortletcontent = {
    title: "Live in a home of your choice",
    infoContent:
      "with diffrent price range, enjoy a good apartments of your choice in a well equiped environment, good roads, non-interrupted power supply, fire services, secuirty and wide range of payment methods. ",
    btnText: "Buy an apartment →",
    onClick: () => {
      if (!ctx.isLoggedIn) {
        navigate("/authentication/sign-in", { replace: true });
        return;
      }
      ctx.housePageActiveFunc("active");
      navigate("properties");
    },
  };
  const flightContent = {
    title: "Fly anywhere, Live your dreams",
    infoContent:
      "          Our services includes giving you diffrent options, find an affordable  fares which gives you the opportunity to explore the world, and live like the paradise is on earth, and enjoy the comfort you desire.",
    btnText: "Book Flight →",
    onClick: () => {
      if (!ctx.isLoggedIn) {
        navigate("/authentication/sign-in", { replace: true });
        return;
      }
      navigate("bookflight");
    },
  };

  return (
    <section className="product-display">
      <ProductsHelper {...foodOrdercontent} />
      <ProductsHelper {...shortletcontent} />
      <ProductsHelper {...flightContent} />
    </section>
  );
};
export default ProductSection;
