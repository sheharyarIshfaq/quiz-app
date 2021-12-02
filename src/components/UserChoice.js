import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { quizActions } from "../store";

import classes from "./UserChoice.module.css";

const UserChoice = () => {
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();

  const categoryChangeHandler = (e) => {
    dispatch(quizActions.setCategory(e.target.value));
  };

  const difficultyChangeHandler = (e) => {
    dispatch(quizActions.setDifficulty(e.target.value));
  };

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch("https://opentdb.com/api_category.php");
      const data = await response.json();
      setCategories(data.trivia_categories);
    };
    fetchCategories();

    return () => {
      setCategories([]);
    };
  }, []);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.container}>
        <label htmlFor="category">Select Category</label>
        <select name="category" id="category" onChange={categoryChangeHandler}>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.container}>
        <label htmlFor="difficulty">Select Difficulty</label>
        <select
          name="difficulty"
          id="difficulty"
          onChange={difficultyChangeHandler}
        >
          <option value="easy">Easy</option>
          <option value="medium">Medium</option>
          <option value="hard">Hard</option>
        </select>
      </div>
    </div>
  );
};

export default UserChoice;
