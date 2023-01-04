import { Fragment } from "react";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";

const PropertyDetails = (props) => {
  /*
  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "89a1126d79msh229c865a8237199p1dc543jsn2dd80ebcae58",
        "X-RapidAPI-Host": "zillow56.p.rapidapi.com",
      },
    };

    fetch(
      `https://zillow56.p.rapidapi.com/search?location=${cityName}`,
      options
    )
      .then((response) => response.json())
      .then((response) => console.log(response))
      .catch((err) => console.error(err));
  });
  */

  return (
    <Fragment>
      {props.data.map((data, key) => {
        if (!data) console.log("no data");

        return (
          <div key={key} className="property-container">
            <img src={data.imgSrc} alt="property-pic" />
            <p className="btn-tag">For Sale</p>
            <p className="address">
              {`${data.streetAddress}, ${data.city}, ${data.state}, ${data.country}, ${data.zipcode}.`}
            </p>
            <div className="utilities-box">
              <span className="utilities">
                <FaBed className="utility-icon" />
                <span>{`${data.bedrooms} beds`}</span>
              </span>
              <span className="utilities">
                <FaBath className="utility-icon" />
                <span>{`${data.bathrooms} bath`}</span>
              </span>
            </div>
            <div className="purchase-box">
              <h1 className="amount">{`$${data.price}.00`}</h1>
              <button className="btn-purchase">Contact</button>
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};
export default PropertyDetails;
