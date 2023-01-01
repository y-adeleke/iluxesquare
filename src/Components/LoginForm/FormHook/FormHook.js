import { useState } from "react";

///Input Custom Hooks///////
export const useInput = (validate) => {
  const [input, setInput] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const valueIsValid = validate(input);
  const hasError = !valueIsValid && isTouched;

  const InputHandler = (event) => {
    setInput(event.target.value);
  };

  const TouchedHandler = (event) => {
    setIsTouched(true);
  };

  const Validation = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setInput("");
    setIsTouched(false);
  };
  return {
    value: input,
    hasError,
    InputHandler,
    TouchedHandler,
    Validation,
    reset,
    valueIsValid,
  };
};

export const useCheckbox = (validate) => {
  const [checkedBox, setCheckBox] = useState(false);
  const [checkboxTouched, setCheckBoxTouched] = useState(false);

  const valueIsValid = validate(checkedBox);
  const checkboxHandler = (event) => {
    if (event.target.checked) {
      setCheckBox(true);
      setCheckBoxTouched(true);
      return;
    }
    setCheckBox(false);
  };

  const checkboxTouchedHandler = () => {
    setCheckBoxTouched(true);
  };

  const checkboxValidation = () => {
    setCheckBoxTouched(true);
  };

  const checkboxCheck = !checkedBox && checkboxTouched;

  const reset = () => {
    setCheckBox(false);
    setCheckBoxTouched(false);
  };

  return {
    checkboxHandler,
    checkboxTouchedHandler,
    checkedBox,
    checkboxCheck,
    checkboxValidation,
    reset,
    valueIsValid,
  };
};
