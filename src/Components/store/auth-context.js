import { useEffect, useState } from "react";
import React from "react";
const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  email: "",
  displayName: "",
  foodCartData: "",
  isLoading: false,
  foodSearchResult: "",
  foodName: "",
  foodPageActive: false,
  errorOccured: "",
  orderFunc: () => {},
  foodPageActiveFunc: (isactive) => {},
  foodSearchFunc: (foodname) => {},
  foodCart: (cartData) => {},
  removeItem: (item) => {},
  login: (token, email, displayName) => {},
  logout: () => {},
});

export const AuthContextProvider = (props) => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedCart = JSON.parse(localStorage.getItem("cart"));
  const foodPageClicked = JSON.parse(localStorage.getItem("foodPageActive"));

  let initialToken;
  let initialEmail;
  let initialdisplayName;
  let initialCart = [];
  let initialFoodPage = "notActive";

  if (foodPageClicked) initialFoodPage = foodPageClicked;

  if (storedUser) {
    initialToken = storedUser.token;
    initialEmail = storedUser.email;
    initialdisplayName = storedUser.displayName;
  }

  if (storedCart) initialCart = storedCart;

  const [token, setToken] = useState(initialToken);
  const [email, setEmail] = useState(initialEmail);
  const [displayName, setDisplayName] = useState(initialdisplayName);
  const [loading, setLoading] = useState(false);
  const [foodSearchData, setFoodSearch] = useState("");
  const [errorOccured, setErrorOccured] = useState(false);
  const [foodInputName, setFoodName] = useState("spaghetti");
  const [cartOrder, setCartOrder] = useState(initialCart);
  const [foodPageActive, setFoodPageActive] = useState(initialFoodPage);

  const userIsLoggedIn = !!token;

  const loginHandler = (token, email, displayName) => {
    const user = { token: token, email: email, displayName: displayName };
    localStorage.setItem("user", JSON.stringify(user));
    JSON.parse(localStorage.getItem("cart"));
    setToken(token);
    setEmail(email);
    setDisplayName(displayName);
  };
  const logoutHandler = () => {
    localStorage.removeItem("user");
    setToken(null);
    setEmail("");
    setDisplayName("");
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartOrder));
  }, [cartOrder]);

  const foodCartHandler = (cartData) => {
    setCartOrder((old) => [...old, cartData]);
  };
  const removeItemHandler = (item) => {
    const filtered = cartOrder.filter((val, ind, Array) => {
      return val !== item;
    });
    if (cartOrder.length === 1) {
      setCartOrder([]);
    } else setCartOrder(filtered);
  };

  const orderHandler = () => {
    setCartOrder([]);
  };

  const foodSearchHandler = async (foodname) => {
    setFoodName(foodname);
    setErrorOccured(false);
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "89a1126d79msh229c865a8237199p1dc543jsn2dd80ebcae58",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    try {
      setLoading(true);
      const res = await fetch(
        `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/food/menuItems/search?query=${foodname}&offset=0&number=20&minCalories=0&maxCalories=5000&minProtein=0&maxProtein=100&minFat=0&maxFat=100&minCarbs=0&maxCarbs=100`,
        options
      );
      //  if (!res.ok) throw new Error("search for another food!");
      const fullData = await res.json();
      setFoodSearch(fullData.menuItems);
      setLoading(false);
    } catch (error) {
      setErrorOccured(true);
      setFoodSearch([]);
      setLoading(false);
    }
  };

  const foodPageActiveHandler = (isActive) => {
    setFoodPageActive(isActive);
    localStorage.setItem("foodPageActive", JSON.stringify(isActive));
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    email: email,
    displayName: displayName,
    foodCartData: cartOrder,
    isLoading: loading,
    foodSearchResult: foodSearchData,
    errorOccured: errorOccured,
    foodName: foodInputName,
    foodSearchFunc: foodSearchHandler,
    foodPageActive: foodPageActive,
    orderFunc: orderHandler,
    foodPageActiveFunc: foodPageActiveHandler,
    foodCart: foodCartHandler,
    removeItem: removeItemHandler,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};
export default AuthContext;
