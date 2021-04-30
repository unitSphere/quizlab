import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../style/home.css";


const useStyles = makeStyles(theme => ({
    title: {
        color: "#245f87",
        fontSize: "50px",
        alignSelf: "center",
        fontWeight: "500"
    }
}));

export default function MainPage(props) {
    const classes = useStyles();
    return (
        <div className={classes.title}>Welcome to Quizlab!</div>
    );
}
