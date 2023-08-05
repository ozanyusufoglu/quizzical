import React from "react"
import Question from "./Question.jsx"

export default function App() {

  // 3 states of the game 
  // -----------
  // | initiate | -> | select |  -> | replay | 

  const [questions, setQuestions] = React.useState([])
  const [gameRound, setGameRound] = React.useState(0)
  const [gameState, setGameState] = React.useState("initiate")

  React.useEffect(function () {

    const url = "https://opentdb.com/api.php?amount=10&category=24&type=multiple"
    fetch(url).then(res => res.json())
      .then(data => {
        const dataWithShuffledAnswers = data.results.map(item => {
          return {
            ...item,
            answers: [item.correct_answer, ...item.incorrect_answers].sort((a, b) => 0.5 - Math.random())
          }
        })
        setQuestions(dataWithShuffledAnswers)
      })
  }, [gameRound])

  const questionComponents = questions.map((eachQuestion, index) => {

    const { correct_answer, answers, question } = eachQuestion
    return <Question
      question={question}
      answers={answers}
      correct_answer={correct_answer}
      key={index}
    />
  })

  function startQuiz() {
    setGameState("select")
  }

  function checkAnswers() {

    event.preventDefault()
    setGameState("replay")

    const answerElements = document.getElementsByName("answer")
    for (const eachAnswer of answerElements) {
      (eachAnswer.value == "correct" && eachAnswer.className == "selected") ?
        eachAnswer.className = "correct" :
        (eachAnswer.className == "selected") ?
          eachAnswer.className = "incorrect" :
          eachAnswer.className = "disabled"
    }
  }

  function restart() {
    setGameRound(prevRound => prevRound + 1)
    setGameState("select")
    for (const eachAnswer of document.getElementsByName("answer")) {
      eachAnswer.className = "unselected"
    }
  }

  return <main>
    {gameState == "initiate" &&
      <div className="main-page">
        <h1>Quizzical</h1>
        <h3 id="info">Ready to test your cinema knowledge?</h3>
        <button
          type="button"
          className="big-button"
          id="start-quiz"
          onClick={startQuiz}>Start the quiz
        </button>
      </div>
    }

    <form>
      {gameState != "initiate" && questionComponents}

      {gameState == "select" &&
        <button
          id="check"
          type="submit"
          className="big-button"
          onClick={checkAnswers}>
          Check Answers
        </button>}
    </form>

    {
      gameState == "replay" &&
      <div className="score">
        <h3>Round {gameRound}</h3>
        <h3>
          You scored {document.getElementsByClassName("correct").length}/10
        </h3>
        <button className="big-button"
          onClick={restart}>
          Play again?
        </button>
      </div>
    }

  </main>
}