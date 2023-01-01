import "../formCss/formHelper.css";
import FormImage from "../../../pictures/loginform.png";
import PasswordInput from "../FormHook/PasswordInput";
import ErrorExist from "../../PublicHelper/EroorExist";
import LoadSpinner from "../../PublicHelper/Spinner";
import FeatureButtonHelper from "../../PublicHelper/featuresHelper/FeatureButtonHelper";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SvgWaves from "../SvgWaves";

const NewPassword = (props) => {
  const navigate = useNavigate();
  const [passdata, setPassdata] = useState({
    inputPass: "",
    passwordValidation: "",
    valueIsValid: "",
    passwordReset: "",
  });
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [passResetError, setPassResetError] = useState(false);
  ////Extract and save Password Data////
  const passwordDataHandler = (data) => {
    setPassdata({
      inputPass: data.inputPass,
      passwordValidation: data.passwordValidation,
      valueIsValid: data.valueIsValid,
      passwordReset: data.passwordReset,
    });
  };

  const passwordResetHandler = async (e) => {
    e.preventDefault();
    passdata.passwordValidation();
    if (!passdata.valueIsValid) return;
    const data = passdata.inputPass;
    try {
      setLoadSpinner(true);
      setPassResetError(false);
      //Reset New Password request
      const params = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
      });
      const value = params.oobCode;
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=AIzaSyB7U9qz_VnRiKTv5yJCQtMogv4mXbnQm4M",
        {
          method: "POST",
          body: JSON.stringify({ oobCode: value, newPassword: data }),
        }
      );

      if (!response.ok) throw new Error("something happened");
      const newPasswordData = await response.json();
      setLoadSpinner(false);
      console.log(newPasswordData);
      navigate("/");
    } catch (error) {
      console.log(error.message);
      setPassResetError(true);
      setLoadSpinner(false);
    }
  };

  return (
    <div className="auth-page-box">
      <div className="auth-mini-box">
        <form className="form-auth" onSubmit={passwordResetHandler}>
          <h2>Reset your password.</h2>
          {loadSpinner && <LoadSpinner />}
          {passResetError && (
            <ErrorExist ErrorText="Invalid or Expired link. Please, reset your password again." />
          )}
          <p className="fgtpass-instruct">Please enter new password.</p>
          <PasswordInput sendPasswordData={passwordDataHandler} />
          <FeatureButtonHelper buttonText="Submit" className="submit-btn" />
          <SvgWaves />
        </form>

        <div className="auth-box">
          <div className="texts-box">
            <h1>Protect your password.</h1>
            <h1>Ready to explore?</h1>
            <h1>Login Now!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NewPassword;
