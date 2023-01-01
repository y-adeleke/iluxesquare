import "../../formCss/formHelper.css";
import FeatureButtonHelper from "../../../PublicHelper/featuresHelper/FeatureButtonHelper";
import { useNavigate } from "react-router-dom";
import SvgWaves from "../../SvgWaves";

const EmailVerificationSent = (props) => {
  const navigate = useNavigate();
  /*
  const [numInputOne, setNumInputOne] = useState("");
  const [numInputTwo, setNumInputTwo] = useState("");
  const [numInputThree, setNumInputThree] = useState("");
  const [numInputFour, setNumInputFour] = useState("");

  const limit = 1;
  const inputOneHandler = (e) => {
    setNumInputOne(e.target.value.slice(0, limit));
  };
  const inputTwoHandler = (e) => {
    setNumInputTwo(e.target.value.slice(0, limit));
  };
  const inputThreeHandler = (e) => {
    setNumInputThree(e.target.value.slice(0, limit));
  };
  const inputFourHandler = (e) => {
    setNumInputFour(e.target.value.slice(0, limit));
  };*/

  return (
    <form
      className="form-auth"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <h2>Please check your email.</h2>
      {props.children}
      <p className="fgtpass-instruct">
        We've sent verification link to {props.email} spam folder. continue to
        sign in after reset.
      </p>
      <FeatureButtonHelper
        onClick={() => {
          navigate("/authentication/sign-in", { replace: true });
        }}
        buttonText="Continue"
        className="submit-btn"
      />
      <SvgWaves />
    </form>
  );
};

export default EmailVerificationSent;

/**
      <div className="code-box">
        <Inputnumber handleNum={inputOneHandler} value={numInputOne} />
        <Inputnumber handleNum={inputTwoHandler} value={numInputTwo} />
        <Inputnumber handleNum={inputThreeHandler} value={numInputThree} />
        <Inputnumber handleNum={inputFourHandler} value={numInputFour} />
      </div>
      <FeatureButtonHelper buttonText="Submit" className="submit-btn" />
 */
