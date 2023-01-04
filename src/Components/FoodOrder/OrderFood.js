import { Fragment, useState } from "react";
import Header from "../Homepage/Header/Header";
import "./OrderFood.css";
import FoodSelect from "./FoodSelect";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import { useEffect } from "react";
import LoadSpinner from "../PublicHelper/Spinner";
import QuantityInput from "./QuantityInput";

const OrderFood = () => {
  const auth = useContext(AuthContext);
  const [value, setValue] = useState("");
  const [displayMore, setDisplayMoreBtn] = useState(8);
  const [openCart, setOpenCart] = useState(false);
  const [ordered, setOrdered] = useState(false);

  useEffect(() => {
    auth.foodSearchFunc(auth.foodName);

    ///The next line commented code is to ignore the warning "React Hook useEffect has a missing dependency"
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = auth.foodSearchResult;

  const searchInputFoodHandler = () => {
    auth.foodSearchFunc(value);
    setValue("");
  };
  let totalAmount = [];

  const orderBtnHandler = () => {
    auth.orderFunc();
    setOrdered(true);
  };

  return (
    <Fragment>
      <section className={`section-food ${openCart && "blur-section"}`}>
        <Header openCartHandler={() => setOpenCart(true)} />
        <div className="title-box">
          <h1>
            Eat <span className="fresh-text">fresh</span> &
            <span className="healthy-text"> healthy</span>
          </h1>
          <div className="searchbox">
            <div className="text-box">
              <p>
                Find the best food <span>🍟</span>
              </p>
            </div>

            <div className="input-box">
              <input
                type="text"
                placeholder="Search Food"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button onClick={searchInputFoodHandler}>search</button>
            </div>
          </div>
        </div>

        <div className="products-box">
          <div className="products-con">
            <FoodSelect displayMoreFunc={() => setDisplayMoreBtn(8)} />
          </div>
          <div className="move-right-box">
            <AiOutlineDoubleRight className="move-right" />
          </div>
        </div>

        <div className="food-display_box">
          {auth.errorOccured && (
            <p className="invalid-search-error">
              Unable to fetch, Please check your Internet and try again.
            </p>
          )}
          {data.length === 0 && !auth.isLoading && !auth.errorOccured && (
            <p className="invalid-search-error">
              Invalid food, Please search again.
            </p>
          )}
          {!data || auth.isLoading ? (
            <LoadSpinner />
          ) : (
            data.map((menu, key) => {
              if (key + 1 <= displayMore) {
                const amount = `${String(menu.id).slice(0, 2)}.00`;
                const exist = auth.foodCartData.filter(
                  (data) => data.id === menu.id
                );
                let qty = 1;
                return (
                  <div
                    key={menu.id}
                    className={`food-display ${
                      +key % 2 === 1 && "display-design"
                    }`}
                  >
                    <img src={menu.image} alt="food-pic" />
                    <span className="food-name">{menu.title}</span>
                    <div className="food-booking">
                      <div className="price-box">
                        <p>Price</p>
                        <span>${amount}</span>
                      </div>
                      {exist.length === 0 ? (
                        <QuantityInput
                          value={(val) => {
                            qty = val;
                          }}
                          orderCompleted={ordered}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                    {exist.length === 0 ? (
                      <button
                        className="btn"
                        onClick={() => {
                          auth.foodCart({
                            id: menu.id,
                            title: menu.title.split(" ").slice(0, 2).join(" "),
                            image: menu.image,
                            amount: amount,
                            quantity: qty,
                          });
                        }}
                      >
                        Add to cart
                      </button>
                    ) : (
                      <button className="btn btn__selected">Selected!</button>
                    )}
                  </div>
                );
              } else return null;
            })
          )}
        </div>
        <div className="search-more-box">
          {!auth.isLoading && data.length > displayMore && (
            <button
              className="search-more"
              onClick={() => setDisplayMoreBtn(displayMore + 8)}
            >
              Search more
            </button>
          )}
        </div>
      </section>

      {openCart && (
        <div className={`cart-section ${!openCart && "close-cart-section"}`}>
          {!ordered && <h1>Place your order now</h1>}
          {ordered && (
            <p className="no-cart-error">sit back and await your order!</p>
          )}
          {!auth.foodCartData ||
          (auth.foodCartData.length === 0 && !ordered) ? (
            <p className="no-cart-error">please, add an Item!</p>
          ) : (
            auth.foodCartData.map((menu, key) => {
              totalAmount.push(menu.amount * menu.quantity);
              return (
                <div className="food-cart-info" key={key}>
                  <img src={menu.image} alt="food-pic" />
                  <div className="food-info">
                    <span className="food-sort-name">{menu.title}</span>
                    <div className="quantity-box">
                      <span className="amount">
                        ${+menu.amount * menu.quantity}.00({menu.quantity})
                      </span>
                      <button
                        onClick={() => {
                          auth.removeItem(menu);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}

          {!auth.foodCartData.length < 1 && (
            <div className="total-amount-box">
              <p>total order</p>
              <span>
                ${totalAmount.reduce((acc, current) => acc + current)}.00
              </span>
            </div>
          )}
          <div className="btns-con">
            <button
              className="cancel-btn"
              onClick={() => {
                setOrdered(false);
                setOpenCart(false);
              }}
            >
              Close
            </button>

            {!auth.foodCartData.length < 1 && (
              <button className="order-btn" onClick={orderBtnHandler}>
                order
              </button>
            )}
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default OrderFood;
