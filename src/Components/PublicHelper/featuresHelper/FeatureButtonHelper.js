import { Fragment } from "react";
import "./FeatureButtonHelper.css";

const FeatureButtonHelper = (prop) => {
  return (
    <Fragment>
      <button onClick={prop.onClick} className={`button  ${prop.className}`}>
        {prop.buttonText}
      </button>
    </Fragment>
  );
};
export default FeatureButtonHelper;
