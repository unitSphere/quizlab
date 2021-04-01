import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from "@material-ui/core/Button";
import ViewDialog from "../classes/viewDialog";
import AddClassDialog from "../classes/addClassDialog";
import {getStudentsByIds, getSubmissionsByStudentId} from "../../api/data";
import CircularProgress from "@material-ui/core/CircularProgress";
import ViewSubmission from "./viewSubmission";

const {getSubmissions} = require("../../api/data");

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
    title: {
        color: "#245f87",
        fontSize: "50px",
        alignSelf: "center",
        fontWeight: "500"
    },

    flexboxContainer: {
        flexDirection: "row"
    },

    addButton: {
        marginLeft: "auto",
        marginRight: "2.5em",
    },
    loading: {
        width: "100%",
        height: "100%",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "auto",
        marginBottom: "auto"
    }
});


export default function QuizTable() {
    const classes = useStyles();
    const [loadSubmissions, setLoadSubmissions] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    const student_id = 1;
    React.useEffect( () => {
        if (loadSubmissions) {
            // Query database and load new
            getSubmissionsByStudentId(student_id).then(rows => {
                setRows(rows);
                setLoadSubmissions(false);
            });

        }
    },    [loadSubmissions]);

    return (<div>
            <div className={classes.loading} style={{display: loadSubmissions ? 'flex' : 'none' }}>
                <CircularProgress />
            </div>

            <div className={classes.flexboxContainer} style={{display: loadSubmissions ? 'none' : 'flex' }}>
                <div className={classes.title}>Quizzes</div>

            </div>
            <TableContainer component={Paper} style={{display: loadSubmissions ? 'none' : 'flex' }}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Score</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.quiz_name}>
                                <TableCell component="th" scope="row">
                                    {row.quiz_name}
                                </TableCell>
                                <TableCell align="right">{row.submitted ? row.score : "NA"}</TableCell>
                                <TableCell align="right">
                                    <ViewSubmission assignment_id={row.assignment_id}  student_id={row.student_id} answers={row.answers}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    );
}
