import React from "react";
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import "../style/home.css";
import ClassesTable from "../components/classes/classesTable";
import Button from "@material-ui/core/Button";
import AddClassDialog from "../components/classes/addClassDialog";


export default function ClassesPage(props) {

    return (
        <div>
            <ClassesTable user={props.user} newClass/>
        </div>
    );
}
