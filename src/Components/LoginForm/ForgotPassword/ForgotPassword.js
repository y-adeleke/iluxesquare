import ReceiveEmail from "./ReceiveEmail";
import { useState } from "react";
import { Fragment } from "react";
import EmailVerificationSent from "./CodeVerify/CodeVerification";
import ErrorExist from "../../PublicHelper/EroorExist";
import LoadSpinner from "../../PublicHelper/Spinner";

const ForgotPassword = ({ location }) => {
  const [codeSentSucess, setDisplaySentSuccesss] = useState(false);
  const [email, setEmail] = useState("");
  const [loadSpinner, setLoadSpinner] = useState(false);
  const [emailNotexist, setEmailNotExist] = useState(false);

  const emailSentHandler = async (data) => {
    setLoadSpinner(true);
    setEmailNotExist(false);
    try {
      // Validate email if valid
      const respose = await fetch(
        "https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyB7U9qz_VnRiKTv5yJCQtMogv4mXbnQm4M",
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: data,
          }),
        }
      );
      if (!respose.ok) throw new Error("This user does not exist");
      setEmail(data);
      setLoadSpinner(false);
      setDisplaySentSuccesss(true);
    } catch (error) {
      setEmailNotExist(true);
      setLoadSpinner(false);
    }
  };

  return (
    <Fragment>
      {!codeSentSucess && (
        <ReceiveEmail emailSent={emailSentHandler}>
          {loadSpinner && <LoadSpinner />}
          {emailNotexist && <ErrorExist ErrorText="User not exist" />}
        </ReceiveEmail>
      )}
      {codeSentSucess && <EmailVerificationSent email={email} />}
    </Fragment>
  );
};
export default ForgotPassword;
