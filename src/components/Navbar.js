import React from "react";

import classes from "./Navbar.module.css";

const Navbar = () => {
  return (
    <nav className={classes.navbar}>
      <h1 className={classes.title}>Quiz App</h1>
    </nav>
  );
};

export default Navbar;
