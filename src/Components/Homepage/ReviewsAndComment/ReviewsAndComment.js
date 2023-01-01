import "./Reviews.css";
import ReviewText from "./ReviewText";
import AddReview from "./AddReview";
import AuthContext from "../../store/auth-context";
import { useContext } from "react";

const ReviewsAndComments = () => {
  const ctx = useContext(AuthContext);
  const userSignedIn = ctx.isLoggedIn;
  return (
    <section className="reviews-section">
      <div className="reviews-box">
        <h1>See what others has to say about us!</h1>
        <ReviewText />
      </div>

      <div className="add-review-box">
        {userSignedIn ? (
          <h1>enjoy our Services? Please, Leave a review here</h1>
        ) : (
          <h1>Please sign in to leave a review</h1>
        )}

        <AddReview />
      </div>
    </section>
  );
};
export default ReviewsAndComments;
