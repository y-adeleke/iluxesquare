import { BiKey } from "react-icons/bi";
import { Fragment } from "react";
import { useInput } from "./FormHook";
import { useState } from "react";
import { useEffect } from "react";

const specialChars = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"
);

const isPassword = (value) =>
  value.trim().length >= 8 &&
  value.trim().length <= 20 &&
  specialChars.test(value);

const PasswordInput = (prop) => {
  const [passVisible, setPassVisible] = useState(false);

  const showPasswordHandler = (e) => {
    e.preventDefault();
    setPassVisible(!passVisible);
  };

  const {
    value: inputPass,
    hasError: passCheck,
    InputHandler: passwordHandler,
    TouchedHandler: passTouchedHandler,
    Validation: passwordValidation,
    reset: passwordReset,
    valueIsValid,
  } = useInput(isPassword);

  useEffect(() => {
    prop.sendPasswordData({
      inputPass,
      passwordValidation,
      valueIsValid,
      passwordReset,
    });
  }, [inputPass]);

  return (
    <Fragment>
      <div className={`box ${passCheck ? " box-invalid" : ""}`}>
        <BiKey className="icon" />
        <input
          className="input"
          type={!passVisible ? "password" : "text"}
          placeholder="Password"
          onChange={passwordHandler}
          onBlur={passTouchedHandler}
          value={inputPass}
        />
        <button onClick={showPasswordHandler} className="show-btn">
          {!passVisible ? "show" : "hide"}
        </button>
      </div>

      {passCheck ? (
        <p className="display-error">
          password must be 8-15 characters, no spaces, contain Uppercase,
          Lowercase, number and special character e.g(-+_!@#$%^&*.,?)
        </p>
      ) : (
        ""
      )}
    </Fragment>
  );
};
export default PasswordInput;
