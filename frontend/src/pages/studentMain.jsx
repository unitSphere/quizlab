import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import "../style/home.css";
import ClassesTable from "../components/classes/classesTable";
import Button from "@material-ui/core/Button";
import AddClassDialog from "../components/classes/addClassDialog";
import QuizTable from "../components/studentMain/quizTable";
import {getStudentIdByEmail, getSubmissionsByStudentId} from "../api/data";

export default function StudentMainPage(props) {
    const {user_id} = props;
    return (
        <div>
            <QuizTable newClass user_id={user_id}/>
        </div>
    );
}
