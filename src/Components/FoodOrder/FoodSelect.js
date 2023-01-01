import { Fragment } from "react";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
const foodProducts = [
  { image: "🍝", name: "spaghetti" },
  { image: "🍕", name: "pizza" },
  { image: "🍔", name: "burger" },
  { image: "🌭", name: "hotdog" },
  { image: "🥪", name: "sandwich" },
  { image: "🍟", name: "fries" },
  { image: "🍛", name: "african" },
  { image: "🍿", name: "snacks" },
  { image: "🍉", name: "fruits" },
  { image: "🍹", name: "cocktail" },
];

const FoodSelect = (prop) => {
  const auth = useContext(AuthContext);

  return (
    <Fragment>
      {foodProducts.map((product, key) => {
        return (
          <div
            className={`food-select ${
              auth.foodName === product.name && "food-select-active"
            }`}
            key={key}
          >
            <div
              onClick={() => {
                auth.foodSearchFunc(product.name);
                prop.displayMoreFunc();
              }}
              className={`product-box ${
                auth.foodName === product.name && "product-box-active"
              }`}
            >
              <span>{product.image}</span>
            </div>
            <p>{product.name}</p>
          </div>
        );
      })}
      ;
    </Fragment>
  );
};
export default FoodSelect;
