import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { quizActions } from "../store";

import classes from "./Questions.module.css";
import Spinner from "./UI/Spinner";
import UserChoice from "./UserChoice";

const Questions = () => {
  const [submitted, setSubmitted] = useState(false);
  const [rightOption, setRightOption] = useState();
  const [options, setOptions] = useState([]);

  const [showQuiz, setShowQuiz] = useState(false);
  const [showScore, setShowScore] = useState(false);

  const dispatch = useDispatch();

  const isLoading = useSelector((state) => state.isLoading);

  const currentQuestion = useSelector((state) => state.currentQuestion);
  const current = useSelector((state) => state.current);
  const score = useSelector((state) => state.score);
  const category = useSelector((state) => state.category);
  const difficulty = useSelector((state) => state.difficulty);

  const randomNum = (maxNum) => {
    return Math.floor(Math.random() * Math.floor(maxNum));
  };

  useEffect(() => {
    if (!currentQuestion) {
      return;
    }

    setRightOption(currentQuestion.correct_answer);

    let options = [...currentQuestion.incorrect_answers];
    const randomIdx = randomNum(currentQuestion.incorrect_answers.length);
    options.splice(randomIdx, 0, currentQuestion.correct_answer);

    setOptions(options);
  }, [currentQuestion]);

  const startQuizHandler = async () => {
    setShowScore(false);
    dispatch(quizActions.setIsLoading(true));
    const response = await fetch(
      `https://opentdb.com/api.php?amount=5&category=${category}&difficulty=${difficulty}&type=multiple`
    );
    const data = await response.json();
    console.log(data.results);
    dispatch(quizActions.setQuestions(data.results));
    dispatch(quizActions.setIsLoading(false));
    dispatch(quizActions.start());
    setShowQuiz(true);
  };

  const nextQuestionHandler = () => {
    setSubmitted(false);
    dispatch(quizActions.changeQuestion());
  };

  const checkOptionHandler = (e) => {
    setSubmitted(true);
    if (!submitted && e.target.innerText === rightOption) {
      dispatch(quizActions.increase());
    }
  };

  const checkScoreHandler = () => {
    setSubmitted(false);
    setShowScore(true);
    setShowQuiz(false);
  };

  return (
    <div className={classes.container}>
      {isLoading && <Spinner />}
      {!showQuiz && !isLoading && (
        <>
          <UserChoice />
          <button className={classes.startBtn} onClick={startQuizHandler}>
            Start the Quiz
          </button>
        </>
      )}
      {showQuiz && currentQuestion && !showScore && !isLoading && (
        <div className={classes.card}>
          <h1 className={classes.title}>Question {current}/5</h1>
          <p className={classes.question}>{currentQuestion.question}</p>
          <ul className={classes.options}>
            {options.map((option) => (
              <li
                className={
                  submitted
                    ? option !== rightOption
                      ? classes.false
                      : classes.true
                    : ""
                }
                key={option}
                onClick={checkOptionHandler}
              >
                {option}
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
      {showScore && !isLoading && (
        <div className={`${classes.card} ${classes.score}`}>
          <h1>You scored {score} out of 5</h1>
        </div>
      )}
    </div>
  );
};

export default Questions;
