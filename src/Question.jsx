import React from "react";

export default function Question(props) {
  const [selectedAnswer, setSelectedAnswer] = React.useState();
  const allAnswers = props.answers;

  function selectAnswer(event, index) {
    event.preventDefault();

    if (event.target.className == "unselected") {
      event.target.className = "selected";
      setSelectedAnswer(index);
    } else {
      event.target.className = "unselected";
      setSelectedAnswer(index);
    }
  }

  const answerElements = allAnswers.map((answer, index) => (
    <button
      onClick={(event) => selectAnswer(event, index)}
      className={index == selectedAnswer ? "selected" : "unselected"}
      value={props.correct_answer == answer ? "correct" : "incorrect"}
      name="answer"
      key={index}
    >
      {answer}
    </button>
  ));

  return (
    <div className="questionItem">
      <h4>{props.question}</h4>
      <div className="answers">{answerElements}</div>
      <hr />
    </div>
  );
}
