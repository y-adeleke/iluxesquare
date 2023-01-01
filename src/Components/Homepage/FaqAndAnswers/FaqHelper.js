import { BsPlusLg } from "react-icons/bs";
import { AiOutlineMinus } from "react-icons/ai";
import { useState } from "react";

const FaqHelper = (props) => {
  const [displayAnswer, setDisplayAnswer] = useState(false);

  return (
    <div className="qa-box">
      <div className="question-box">
        <p>{props.question}</p>
        {!displayAnswer && (
          <BsPlusLg
            className="plus-icon"
            onClick={() => {
              setDisplayAnswer(true);
            }}
          />
        )}
        {displayAnswer && (
          <AiOutlineMinus
            className="plus-icon"
            onClick={() => {
              setDisplayAnswer(false);
            }}
          />
        )}
      </div>
      {displayAnswer && (
        <div className="answer-box">
          <p>{props.answer}</p>
        </div>
      )}
    </div>
  );
};
export default FaqHelper;
