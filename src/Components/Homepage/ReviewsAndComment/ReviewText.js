import { FaThumbsUp } from "react-icons/fa";
import { FaThumbsDown } from "react-icons/fa";
import { AiFillStar } from "react-icons/ai";
import { Fragment, useEffect, useState } from "react";

const ReviewText = () => {
  const [reviewsData, setReviewsData] = useState([]);
  const stars = Array(5).fill(0);
  /////Get reviews from database
  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(
          "https://iluxesquare-default-rtdb.firebaseio.com/users.json"
        );
        if (!res.ok) throw new Error("Unable to get Reviews.");
        const data = await res.json();
        let extractreviews = [];
        for (const key in data) {
          extractreviews.push({
            id: key,
            userName: data[key].userReview.userName,
            reviewText: data[key].userReview.reviewText,
            rating: data[key].userReview.rating,
          });
          setReviewsData(extractreviews);
        }
      } catch (error) {
        console(error.meesage);
      }
    };
    getData();
  }, []);

  return (
    <Fragment>
      {reviewsData.map((val, index) => {
        return (
          <div className="review-user-box" key={index}>
            <div className="review-user">
              <h2 className="user-name"> {val.userName}</h2>
              {val.rating < 3 ? (
                <FaThumbsDown className="good-bad-icon" />
              ) : (
                <FaThumbsUp className="good-bad-icon" />
              )}
            </div>

            <p className="review-text">{val.reviewText}</p>

            <div className="rating-box">
              {stars.map((_, idx) => {
                return (
                  <AiFillStar
                    key={idx}
                    className={`${
                      val.rating > idx ? "rating-star" : "setrating-star"
                    }`}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </Fragment>
  );
};
export default ReviewText;
