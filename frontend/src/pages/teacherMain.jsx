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
        if (loadQuizzes) {
            getQuizzesByTeacherEmail(props.user).then(rows => {
                setRows(rows);
                setLoadQuizzes(false);  // no longer need to load quizzes
            })
        }
    }, [props.user, loadQuizzes]);

    const addNewQuiz = () => {
        setLoadQuizzes(true);
    };
    return (
        <div>
            <div className={classes.loading} style={{display: loadQuizzes ? 'flex' : 'none' }}>
                <CircularProgress />
            </div>

            <div className={classes.flexboxContainer} style={{display: loadQuizzes ? 'none' : 'flex' }}>
                <div className={classes.title}>Teacher Homepage</div>
                <div style={{marginLeft: "auto"}}>
                    <AddQuizDialog onAdd={addNewQuiz} teacherEmail={props.user}/>
                </div>
            </div>
            <TableContainer component={Paper} style={{display: loadQuizzes ? 'none' : 'flex' }}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="right">Class Name</TableCell>
                            <TableCell align="right">Class Average</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell align="right">
                                    Statistics
                                </TableCell>
                                <TableCell align="right">
                                   <b>60</b> /100
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>
    );
}
