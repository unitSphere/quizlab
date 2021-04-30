import React, {Component} from "react";
import "../style/mainNav.css";
import {Link} from "react-router-dom";

class SideNavigation extends Component {

    constructor(props) {
        super(props);
        this.state = {type: props.type};

    }
    render() {
        if(this.state.type === "teacher") {
            return (
                <div className="side_nav">
                    <Link className="menu_item" to="/teacher">
                        Teacher
                    </Link>
                    <Link className="menu_item" to="/classes">
                        Classes
                    </Link>
                    <Link className="menu_item" to="/quizzes">
                        Quizzes
                    </Link>
                    <Link className="menu_item" to="/about">
                        About
                    </Link>
                </div>
            );
        }
        else {
            return (
                <div className="side_nav">
                    <Link className="menu_item" to="/student">
                        Student
                    </Link>
                    <Link className="menu_item" to="/about">
                        About
                    </Link>
                </div>
            );
        }

    }
}

export default SideNavigation;
