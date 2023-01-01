import { useCheckbox } from "../FormHook/FormHook";
import { Fragment } from "react";
import { useEffect } from "react";

const isChecked = (value) => value === true;

const CheckboxInput = (prop) => {
  const {
    checkboxHandler,
    checkboxTouchedHandler,
    checkedBox,
    checkboxCheck,
    checkboxValidation,
    reset,
    valueIsValid,
  } = useCheckbox(isChecked);

  useEffect(() => {
    prop.sendCheckboxData({
      checkboxValidation,
      valueIsValid,
    });
  }, [checkedBox]);

  return (
    <Fragment>
      <div className="terms-box">
        <input
          className="checkkbox"
          type="checkbox"
          onBlur={checkboxTouchedHandler}
          onChange={checkboxHandler}
        />
        <span>I agree to the Terms & Conditions</span>
      </div>
      {checkboxCheck ? (
        <p className="display-error">Terms needs to be agreed</p>
      ) : (
        ""
      )}
    </Fragment>
  );
};

export default CheckboxInput;
