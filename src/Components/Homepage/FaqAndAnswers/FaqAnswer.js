import "./FaqAnswer.css";
import FaqHelper from "./FaqHelper";

const qAndA = [
  {
    question: "What do we offer?",
    answer:
      " We provide you the service of booking flight, sorting your accomodations and providing you the nearby restaurants wherever you are. you can do everything in this platform.",
  },
  {
    question: "Is there any additional fees when using this service? ",
    answer:
      "Yes we charge a minimal fee of 0.5% of your total amount in whatever services you choose to use.",
  },
  {
    question: "Do you refund?",
    answer:
      "There are terms and conditions that comes with refunding, so check the terms before using any service.",
  },
  {
    question: "How do I chnage my password",
    answer:
      "To chnage your password, Click on the user icon and follow the instructions",
  },
  {
    question: "Is there customer services?",
    answer:
      "At this time, there is no customer services but it will be available in the nearby future",
  },
  {
    question: "What payment method do you accept?",
    answer:
      "We accept various kinds of payment method such as visa,master or verve debit cards, amex cards, credit cards or an option to pay directly from your bank.",
  },
  {
    question: "How good is this services?",
    answer:
      "Our mission is to satisfy you and our past users has something to say about us, you can check the review section to read what our past users has to say about us.",
  },
];

const FaqAnswer = () => {
  const questionAndAnswer = qAndA.map((val, index) => {
    return (
      <FaqHelper key={index} question={val.question} answer={val.answer} />
    );
  });

  return (
    <section className="section-QA">
      <div className="QA-con">
        <h1>Faqs & Ans</h1>
        {questionAndAnswer}
      </div>
    </section>
  );
};
export default FaqAnswer;
