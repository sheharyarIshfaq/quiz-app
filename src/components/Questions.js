import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { quizActions } from "../store";

import classes from "./Questions.module.css";

const Questions = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rightOption, setRightOption] = useState();

  const dispatch = useDispatch();
  const showQuiz = useSelector((state) => state.startQuiz);
  const showScore = useSelector((state) => state.showScore);

  const currentQuestion = useSelector((state) => state.currentQuestion);
  const current = useSelector((state) => state.current);
  const score = useSelector((state) => state.score);

  useEffect(() => {
    if (currentQuestion) {
      const option = currentQuestion.options.find(
        (option) => option.isRight === true
      );
      setRightOption(option);
    }
  }, [currentQuestion]);

  const startQuizHandler = () => {
    dispatch(quizActions.start());
  };

  const nextQuestionHandler = () => {
    setSubmitted(false);
    dispatch(quizActions.changeQuestion());
  };

  const checkOptionHandler = (e) => {
    setSubmitted(true);
    if (!submitted && e.target.innerText === rightOption.answer) {
      dispatch(quizActions.increase());
    }
  };

  const checkScoreHandler = () => {
    setSubmitted(false);
    dispatch(quizActions.showScore());
  };

  return (
    <div className={classes.container}>
      {!showQuiz && (
        <button className={classes.startBtn} onClick={startQuizHandler}>
          Start the Quiz
        </button>
      )}
      {showQuiz && !showScore && (
        <div className={classes.card}>
          <h1 className={classes.title}>Question {current}/5</h1>
          <p className={classes.question}>{currentQuestion.question}</p>
          <ul className={classes.options}>
            {currentQuestion.options.map((option) => (
              <li
                className={
                  submitted
                    ? !option.isRight
                      ? classes.false
                      : classes.true
                    : ""
                }
                key={option.answer}
                onClick={checkOptionHandler}
              >
                {option.answer}
              </li>
            ))}
          </ul>
          {current < 5 && (
            <div className={classes.nextBtnContainer}>
              <button className={classes.nextBtn} onClick={nextQuestionHandler}>
                Next
              </button>
            </div>
          )}
          {current > 4 && (
            <div className={classes.nextBtnContainer}>
              <button className={classes.nextBtn} onClick={checkScoreHandler}>
                Check Scores
              </button>
            </div>
          )}
        </div>
      )}
      {showScore && (
        <div className={`${classes.card} ${classes.score}`}>
          <h1>You scored {score === 4 ? "5" : score} out of 5</h1>
        </div>
      )}
    </div>
  );
};

export default Questions;
