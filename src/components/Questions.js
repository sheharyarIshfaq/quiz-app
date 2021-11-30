import React, { useState } from "react";

import classes from "./Questions.module.css";

const Questions = () => {
  const [showQuiz, setShowQuiz] = useState(false);

  const startQuizHandler = () => {
    setShowQuiz((prevState) => !prevState);
  };
  return (
    <div className={classes.container}>
      {!showQuiz && (
        <button className={classes.startBtn} onClick={startQuizHandler}>
          Start the Quiz
        </button>
      )}
      {showQuiz && (
        <div className={classes.card}>
          <h1 className={classes.title}>Question 1/5</h1>
          <p className={classes.question}>
            How many computer languages are in use?
          </p>
          <ul className={classes.options}>
            <li className={classes.true}>2000</li>
            <li>5000</li>
            <li>50</li>
            <li className={classes.false}>20</li>
          </ul>
        </div>
      )}
      {!showQuiz && (
        <div className={`${classes.card} ${classes.score}`}>
          <h1>You scored 3 out of 5</h1>
        </div>
      )}
    </div>
  );
};

export default Questions;
