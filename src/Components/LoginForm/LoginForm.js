import SignUp from "./SignUp/SignUp";
import SignIn from "./SignIn/SignIn";
import FormImage from "../../pictures/loginform.png";
import "./LoginForm.css";
import { useState } from "react";
import ErrorExist from "../PublicHelper/EroorExist";
import LoadSpinner from "../PublicHelper/Spinner";
import { useContext } from "react";
import AuthContext from "../store/auth-context";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

const LoginForm = (props) => {
  const [emailExistError, setEmailExistError] = useState(false);
  const [userExistError, setUserExistError] = useState(false);
  const [loadSpinner, setLoadSpinner] = useState(false);

  const authCtx = useContext(AuthContext);
  const navigate = useNavigate();

  const signInHandler = async (userInfo) => {
    setUserExistError(false);
    setLoadSpinner(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB7U9qz_VnRiKTv5yJCQtMogv4mXbnQm4M",
        {
          method: "POST",
          body: JSON.stringify({
            email: userInfo.email,
            password: userInfo.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("No user Found");

      const data = await response.json();

      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyB7U9qz_VnRiKTv5yJCQtMogv4mXbnQm4M",
        {
          method: "POST",
          body: JSON.stringify({ idToken: data.idToken }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const profileData = await res.json();
      const displayName = profileData.users[0].displayName;

      setLoadSpinner(false);

      if (!data.idToken) return;
      authCtx.login(data.idToken, data.email, displayName);
      navigate("/home");
    } catch (error) {
      setUserExistError(true);
      setLoadSpinner(false);
    }
  };

  const signUpDataHandler = async (userData) => {
    setEmailExistError(false);
    setLoadSpinner(true);
    try {
      const response = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB7U9qz_VnRiKTv5yJCQtMogv4mXbnQm4M",
        {
          method: "POST",
          body: JSON.stringify({
            email: userData.email,
            password: userData.password,
            returnSecureToken: true,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) throw new Error("Email already exist");

      const data = await response.json();
      //console.log(data);

      const res = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyB7U9qz_VnRiKTv5yJCQtMogv4mXbnQm4M",
        {
          method: "POST",
          body: JSON.stringify({
            idToken: data.idToken,
            displayName: userData.name,
            returnSecureToken: true,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );
      const dataProfile = await res.json();
      // console.log(dataProfile);

      const userInfo = {
        email: userData.email,
        password: userData.password,
      };

      setLoadSpinner(false);
      signInHandler(userInfo);
    } catch (error) {
      console.log(error.message);
      setLoadSpinner(false);
      setEmailExistError(true);
    }
  };

  const emailErr = "Email already exist, Please sign In";
  const notExist = "Your credentials are invalid, Please check again.";

  return (
    <div className="auth-page-box">
      <div className="auth-mini-box">
        <Routes>
          <Route
            path="sign-up"
            element={
              <SignUp onSignUp={signUpDataHandler}>
                {loadSpinner ? <LoadSpinner /> : ""}
                {emailExistError ? <ErrorExist ErrorText={emailErr} /> : ""}
              </SignUp>
            }
          />

          <Route
            path="sign-in"
            element={
              <SignIn onSignIn={signInHandler}>
                {loadSpinner ? <LoadSpinner /> : ""}
                {userExistError ? <ErrorExist ErrorText={notExist} /> : ""}
              </SignIn>
            }
          />

          <Route path="forgot-password" element={<ForgotPassword />} />
        </Routes>
        <div className="auth-box">
          <div className="texts-box">
            <h1>Enjoy Premium services for</h1>
            <h1>Zero fee.</h1>
            <h1>Login Now!</h1>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginForm;
