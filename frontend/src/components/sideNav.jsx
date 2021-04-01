import React, { Component } from "react";
import "../style/mainNav.css";
import { Link } from "react-router-dom";

class SideNavigation extends Component {
  state = {};
  render() {
    return (
      <div className="side_nav">
        <Link className="menu_item" to="/">
          Main
        </Link>
        <Link className="menu_item" to="/quizzes">
          Quizzes
        </Link>
        <Link className="menu_item" to="/classes">
          Classes
        </Link>
        <Link className="menu_item" to="/about">
          About
        </Link>
      <Link className="menu_item" to="/student">
          Student
      </Link>
      </div>
    );
  }
}

export default SideNavigation;
