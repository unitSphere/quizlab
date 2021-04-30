import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import "../style/home.css";


const useStyles = makeStyles(theme => ({
    title: {
        color: "#245f87",
        fontSize: "50px",
        alignSelf: "center",
        fontWeight: "500"
    }
}));

export default function ProfilePage(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.title}>Profile</div>
            <div>
                <h1>Your email is {props.user}</h1>
                <h4>Account type: {props.userType}</h4>
            </div>
        </div>
    );
}
