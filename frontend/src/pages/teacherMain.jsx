import React from "react";
import "../style/home.css";
import {makeStyles} from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableContainer from "@material-ui/core/TableContainer";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import AddQuizDialog from "../components/teacherMain/addQuizDialog";
import {getAssignmentsByTeacherEmail, getClassById, getSubmissionByAssignmentId} from "../api/data";
import {Rowing} from "@material-ui/icons";

const {getQuizzesByTeacherEmail} = require("../api/data");

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

export default function TeacherMainPage(props) {
    console.log(props);
    const classes = useStyles();
    const [loadQuizzes, setLoadQuizzes] = React.useState(true);
    const [rows, setRows] = React.useState([]);

    React.useEffect(() => {
        async function queryData() {
            let listObj = []
            await getAssignmentsByTeacherEmail(props.user).then(items => {
                listObj = items.map(async row => {
                    let rowObj = {name: row.quiz_name}
                    let totalAssigned = 0
                    let totalCompleted = 0

                    await getClassById(row.class_id).then(data => {
                        rowObj.className = data.name
                    })
                    await getSubmissionByAssignmentId(row._id).then(data => {
                        data.forEach(info => {
                            if (info.score !== -1)
                                totalCompleted++
                            totalAssigned++
                        })

                    })

                    rowObj.assigned = totalAssigned
                    rowObj.completed = totalCompleted
                    listObj.push(rowObj)
                    return rowObj
                })


            })
            const results = await Promise.all(listObj)
            setRows(results)
            setLoadQuizzes(false)
        }

        if (loadQuizzes) {
            queryData()
        }
    }, [props.user, loadQuizzes])

    const addNewQuiz = () => {
        setLoadQuizzes(true);
    };

    return (
        <div>
            <div className={classes.loading} style={{display: loadQuizzes ? 'flex' : 'none'}}>
                <CircularProgress/>
            </div>

            <div className={classes.flexboxContainer} style={{display: loadQuizzes ? 'none' : 'flex'}}>
                <div className={classes.title}>Teacher Homepage: Current Assignment Progress</div>
            </div>
            <TableContainer component={Paper} style={{display: loadQuizzes ? 'none' : 'flex'}}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Class</TableCell>
                            <TableCell align="right">Progress</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell key={row.class_id} align="right">
                                    {row.className}
                                </TableCell>
                                <TableCell align="right">
                                    {row.completed} / {row.assigned}
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}
