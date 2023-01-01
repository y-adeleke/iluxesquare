import { Fragment } from "react";
import { IoPersonCircle } from "react-icons/io5";
import { AiOutlineMail } from "react-icons/ai";
import { useInput } from "./FormHook";
import { useEffect } from "react";

const isEmail = (value) => value.includes("@");

export const EmailInput = (props) => {
  ////EMAIL CHECK/////
  const {
    value: inputEmail,
    hasError,
    InputHandler: emailInputHandler,
    TouchedHandler: emailTouchedHandler,
    Validation: emailValidation,
    reset: emailReset,
    valueIsValid,
  } = useInput(isEmail);

  useEffect(() => {
    props.sendEmailData({
      inputEmail,
      emailValidation,
      valueIsValid,
      emailReset,
    });
  }, [inputEmail]);

  return (
    <Fragment>
      <div className={`box ${hasError ? " box-invalid" : ""}`}>
        <AiOutlineMail className="icon" />
        <input
          className="input"
          type="email"
          placeholder="Email"
          onChange={emailInputHandler}
          onBlur={emailTouchedHandler}
          value={inputEmail}
        />
      </div>
      {hasError ? <p className="display-error">input a valid email</p> : ""}
    </Fragment>
  );
};

const isText = (value) => value.length > 1;

export const TextInput = (props) => {
  ////EMAIL CHECK/////
  const {
    value: inputText,
    hasError,
    InputHandler: textInputHandler,
    TouchedHandler: textTouchedHandler,
    Validation: textValidation,
    reset: textReset,
    valueIsValid,
  } = useInput(isText);

  useEffect(() => {
    props.sendNameData({
      inputText,
      textValidation,
      valueIsValid,
      textReset,
    });
  }, [inputText]);

  return (
    <Fragment>
      <div className={`box ${hasError ? " box-invalid" : ""}`}>
        <IoPersonCircle className="icon" />
        <input
          className="input"
          type="text"
          placeholder={props.type}
          onChange={textInputHandler}
          onBlur={textTouchedHandler}
          value={inputText}
        />
      </div>
      {hasError ? <p className="display-error">input a your name</p> : ""}
    </Fragment>
  );
};
