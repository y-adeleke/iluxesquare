import FeatureButtonHelper from "../../PublicHelper/featuresHelper/FeatureButtonHelper";
import "../formCss/formHelper.css";
import SvgWaves from "../SvgWaves";
import { useState } from "react";
import { EmailInput } from "../FormHook/EmailInput";
import PasswordInput from "../FormHook/PasswordInput";
import CheckboxInput from "../FormHook/CheckboxInput";
import { useNavigate } from "react-router-dom";

const SignIn = (props) => {
  const navigate = useNavigate();
  ///Managing inputs data
  const [emaildata, setEmaildata] = useState({
    inputEmail: "",
    emailValidation: "",
    valueIsValid: "",
    emailReset: "",
  });
  const [passdata, setPassdata] = useState({
    inputPass: "",
    passwordValidation: "",
    valueIsValid: "",
    passwordReset: "",
  });
  const [checkboxData, setCheckBoxdata] = useState({
    checkboxValidation: "",
    valueIsValid: "",
  });

  ////Extract and save EMAIL Data /////
  const emailDataHandler = (data) => {
    setEmaildata({
      inputEmail: data.inputEmail,
      emailValidation: data.emailValidation,
      valueIsValid: data.valueIsValid,
      emailReset: data.emailReset,
    });
  };

  ////Extract and save Password Data////
  const passwordDataHandler = (data) => {
    setPassdata({
      inputPass: data.inputPass,
      passwordValidation: data.passwordValidation,
      valueIsValid: data.valueIsValid,
      passwordReset: data.passwordReset,
    });
  };

  ////Extract and save checkbox Data/////
  const checkboxDataHandler = (data) => {
    setCheckBoxdata({
      checkboxValidation: data.checkboxValidation,
      valueIsValid: data.valueIsValid,
    });
  };

  ////Validating whole form///////
  let formisvalid = false;
  if (
    emaildata.valueIsValid &&
    passdata.valueIsValid &&
    checkboxData.valueIsValid
  ) {
    formisvalid = true;
  }

  ////SUBMIT FORM///
  const signInSubmit = (e) => {
    e.preventDefault();
    emaildata.emailValidation();
    passdata.passwordValidation();
    checkboxData.checkboxValidation();
    if (!formisvalid) {
      return;
    }
    const userInfo = {
      email: emaildata.inputEmail,
      password: passdata.inputPass,
    };
    props.onSignIn(userInfo);
    // emaildata.emailReset();
    // passdata.passwordReset();
  };

  return (
    <form className="form-auth" onSubmit={signInSubmit}>
      <h2>Sign In</h2>
      {props.children}
      <EmailInput sendEmailData={emailDataHandler} />
      <PasswordInput sendPasswordData={passwordDataHandler} />
      <CheckboxInput sendCheckboxData={checkboxDataHandler} />
      <FeatureButtonHelper buttonText="Submit" className="submit-btn" />
      <div className="sign-in-link">
        <p className="p-text">Don't have an account?</p>
        <button
          className=" btn-click"
          onClick={() => {
            navigate("/authentication/sign-up", { replace: true });
          }}
        >
          Create an account
        </button>
      </div>
      <button
        className="fgt-pass-btn "
        onClick={() => {
          navigate("/authentication/forgot-password", { replace: true });
        }}
      >
        forgot password?
      </button>

      <SvgWaves />
    </form>
  );
};
export default SignIn;
