import { AiOutlineUser } from "react-icons/ai";
import { AiFillHome } from "react-icons/ai";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { MdArrowForwardIos } from "react-icons/md";
import { useContext, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useNavigate } from "react-router-dom";

import "./Header.css";

const Header = (prop) => {
  const [buyHouseactive, setBuyHouseActive] = useState(true);
  const [optionActive, setOptionActive] = useState(false);
  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();
  const userSignedIn = authCtx.isLoggedIn;

  const date = new Date();
  const hours = date.getHours();
  let greeting = "";
  if (hours >= 0 && hours <= 11) {
    greeting = "Good Morning";
  } else if (hours >= 12 && hours < 17) {
    greeting = "Good Afternoon";
  } else {
    greeting = "Good Evening";
  }

  const logoutHandler = () => {
    authCtx.foodPageActiveFunc("notActive");
    authCtx.logout();
    navigate("/home", { replace: true });
  };
  const homeButtonHandler = () => {
    authCtx.foodPageActiveFunc(false);
    navigate("/home", { replace: true });
  };

  const notSignedIn = (
    <nav>
      <div className="profile-box">
        <span></span>
        <span className="greeting">
          {greeting}, <span className="name">guest</span>
        </span>
      </div>
      <div className="auth-box">
        <button
          onClick={() => {
            navigate("/authentication/sign-in");
          }}
        >
          Sign In
        </button>
        <button
          onClick={() => {
            navigate("/authentication/sign-up");
          }}
        >
          Sign up
        </button>
      </div>
    </nav>
  );
  const signedIn = (
    <nav>
      <div className="profile-box">
        <AiOutlineUser className="user" />
        <span className="greeting">
          {greeting}, <span className="name">{authCtx.displayName}</span>
        </span>
      </div>
      <div className="auth-box">
        <AiFillHome className="home-icon" onClick={homeButtonHandler} />
        {authCtx.foodPageActive === "active" && (
          <div className="shopping-cart-box">
            <AiOutlineShoppingCart
              className="shoppingcart-icon"
              onClick={prop.openCartHandler}
            />
            <div className="cart-no">
              <span>{authCtx.foodCartData.length}</span>
            </div>
          </div>
        )}
        {authCtx.foodPageActive !== "active" &&
          authCtx.foodPageActive !== "removeLogoutBtn" && (
            <button className="logout-btn" onClick={logoutHandler}>
              Log Out
            </button>
          )}
      </div>
    </nav>
  );

  return (
    <header className="header">{userSignedIn ? signedIn : notSignedIn}</header>
  );
};

export default Header;
