import "../formCss/formHelper.css";
import { EmailInput } from "../FormHook/EmailInput";
import FeatureButtonHelper from "../../PublicHelper/featuresHelper/FeatureButtonHelper";
import { useState } from "react";
import SvgWaves from "../SvgWaves";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

const ReceiveEmail = (props) => {
  const navigate = useNavigate();
  ///Managing inputs data
  const [emaildata, setEmaildata] = useState({
    inputEmail: "",
    emailValidation: "",
    valueIsValid: "",
    emailReset: "",
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

  const fgtPassSubmitHandler = (e) => {
    e.preventDefault();
    emaildata.emailValidation();

    if (!emaildata.valueIsValid) return;
    props.emailSent(emaildata.inputEmail);
  };
  return (
    <form className="form-auth" onSubmit={fgtPassSubmitHandler}>
      <BiArrowBack
        className="go-back-icon"
        onClick={() => {
          navigate("/authentication/sign-in", { replace: true });
        }}
      />
      <h2>Forgot Password?</h2>
      {props.children}
      <p className="fgtpass-instruct">
        Please enter your registered email address. We will send instructions to
        help reset your passsword.
      </p>
      <EmailInput sendEmailData={emailDataHandler} />
      <FeatureButtonHelper buttonText="Submit" className="submit-btn" />

      <SvgWaves />
    </form>
  );
};
export default ReceiveEmail;
