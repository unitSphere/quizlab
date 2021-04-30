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
import ViewDialog from "./viewDialog";
import AddClassDialog from "./addClassDialog";
import {getStudentsByIds} from "../../api/data";
import CircularProgress from "@material-ui/core/CircularProgress";

const {getClasses} = require("../../api/data");

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


export default function ClassesTable(props) {
    const classes = useStyles();
    const [loadClasses, setLoadClasses] = React.useState(true);
    const [rows, setRows] = React.useState([]);
    React.useEffect( () => {
        if (loadClasses) {
            // Query database and load new
            getClasses().then(rows => {
                setRows(rows);
                setLoadClasses(false);
            });

        }
    },    [loadClasses]);

    const addNewClass = () => {
        setLoadClasses(true);
    };


    return (<div>
            <div className={classes.loading} style={{display: loadClasses ? 'flex' : 'none' }}>
                <CircularProgress />
            </div>

        <div className={classes.flexboxContainer} style={{display: loadClasses ? 'none' : 'flex' }}>
                <div className={classes.title}>Classes</div>
                <div style={{marginLeft: "auto"}}>
                    <AddClassDialog onAdd={addNewClass} teacherEmail={props.user}/>
                </div>
            </div>
            <TableContainer component={Paper} style={{display: loadClasses ? 'none' : 'flex' }}>
                <Table className={classes.table} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Class Name</TableCell>
                            <TableCell align="right"># of Students</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows.map((row) => (
                            <TableRow key={row.name}>
                                <TableCell key={row.name} component="th" scope="row">
                                    {row.name}
                                </TableCell>
                                <TableCell  align="right">{row.student_ids.length}</TableCell>
                                <TableCell align="right">
                                    <ViewDialog classId={row.classId} student_ids={row.student_ids} name={row.name}/>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

        </div>

    );
}
