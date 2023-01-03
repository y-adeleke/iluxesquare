import { AiFillStar } from "react-icons/ai";
import { useEffect, useState } from "react";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const AddReview = () => {
  const [curValue, setCurVal] = useState(0);
  const [success, setSucess] = useState(false);
  const [reviewValue, setReviewValue] = useState("");
  const [ratingInvalid, setRatingInvalid] = useState(false);
  const [reviewInvalid, setReviewInvalid] = useState(false);

  const ctx = useContext(AuthContext);
  const userSignedIn = ctx.isLoggedIn;
  const stars = Array(5).fill(0);

  const handleClick = (value) => {
    setCurVal(value);
  };

  ////RSubmit Review Handler
  const postReviewHandler = async (e) => {
    e.preventDefault();

    if (!userSignedIn) return;
    ///review validation
    if (reviewValue.length < 1) {
      setReviewInvalid(true);
      return;
    } else if (curValue < 1) {
      setRatingInvalid(true);
      return;
    }

    const reviewInfo = {
      email: ctx.email,
      userName: ctx.displayName,
      reviewText: reviewValue,
      rating: curValue,
    };

    ////send review to database
    try {
      const res = await fetch(
        "https://iluxesquare-default-rtdb.firebaseio.com/users.json",
        {
          method: "POST",
          body: JSON.stringify({
            userData: ctx.email,
            userReview: reviewInfo,
          }),
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!res.ok) throw new Error("your review was'nt posted, try again.");
      setSucess(true);
      setCurVal(0);
      setReviewValue("");
    } catch (error) {
      console(error.message);
    }
  };

  useEffect(() => {
    if (success) {
      setTimeout(() => {
        setSucess(false);
      }, 2000);
    }
  }, [success]);

  return (
    <form onSubmit={postReviewHandler} className="form-add-review">
      {success && <div className="response">Feedback successfully sent</div>}
      <div className="input-box">
        <textarea
          onChange={(e) => {
            setReviewValue(e.target.value);
          }}
          value={reviewValue}
          placeholder={`${
            !reviewInvalid
              ? "Please, type in your review here."
              : "Your review should be more than a word."
          }`}
        />
      </div>
      <div className="rating-box">
        {stars.map((_, index) => {
          return (
            <AiFillStar
              key={index}
              onClick={() => handleClick(index + 1)}
              className={`${curValue > index ? "rating-star" : "rate-icon"}`}
            />
          );
        })}
        {!ratingInvalid ? "" : console.log("please rate this services.")}
      </div>
      <div className="add-review-btn-box">
        <button className="add-review-button">
          {userSignedIn ? "Add Review " : " Please sign in "}
        </button>
      </div>
    </form>
  );
};
export default AddReview;
