import FeatureButtonHelper from "../../PublicHelper/featuresHelper/FeatureButtonHelper";
import "../formCss/formHelper.css";
import SvgWaves from "../SvgWaves";
import { useState } from "react";
import { EmailInput, TextInput } from "../FormHook/EmailInput";
import PasswordInput from "../FormHook/PasswordInput";
import CheckboxInput from "../FormHook/CheckboxInput";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  const navigate = useNavigate();
  ///Managing inputs data
  const [nameData, setNameData] = useState({
    inputText: "",
    textValidation: "",
    valueIsValid: "",
    textReset: "",
  });
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

  ////Extract and save Name Data /////
  const nameHandler = (data) => {
    setNameData({
      inputText: data.inputText,
      textValidation: data.textValidation,
      valueIsValid: data.valueIsValid,
      textReset: data.textReset,
    });
  };

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
    nameData.valueIsValid &&
    emaildata.valueIsValid &&
    passdata.valueIsValid &&
    checkboxData.valueIsValid
  ) {
    formisvalid = true;
  }

  ////SUBMIT FORM///
  const signUpSubmit = (e) => {
    e.preventDefault();
    nameData.textValidation();
    emaildata.emailValidation();
    passdata.passwordValidation();
    checkboxData.checkboxValidation();
    if (!formisvalid) {
      return;
    }
    const userInfo = {
      name: nameData.inputText,
      email: emaildata.inputEmail,
      password: passdata.inputPass,
    };
    props.onSignUp(userInfo);
    // emaildata.emailReset();
    // nameData.textReset();
    // passdata.passwordReset();
  };

  return (
    <form className="form-auth" onSubmit={signUpSubmit}>
      <h2>Create your account</h2>
      {props.children}
      <TextInput sendNameData={nameHandler} type="Full Name" />
      <EmailInput sendEmailData={emailDataHandler} />
      <PasswordInput sendPasswordData={passwordDataHandler} />
      <CheckboxInput sendCheckboxData={checkboxDataHandler} />
      <FeatureButtonHelper buttonText="Submit" className="submit-btn" />
      <div className="sign-in-link">
        <p className="p-text">Already have an account?</p>
        <button
          className="btn-click"
          onClick={() => {
            navigate("/authentication/sign-in", { replace: true });
          }}
        >
          Sign In
        </button>
      </div>
      <SvgWaves />
    </form>
  );
};
export default SignUp;
