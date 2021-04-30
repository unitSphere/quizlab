import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {addClass, genAssignment, getClassesByTeacherEmail, getStudentsByIds} from "../../api/data";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import {DataGrid} from "@material-ui/data-grid";

const styles = (theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles((theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

export default function QuizAssignDialog(props) {
    const [open, setOpen] = React.useState(false);
    const {quizName, teacherEmail, onAdd} = props;
    const [rows, setRows] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const [selections, setSelections] = React.useState([]);

    const handleClickOpen = () => {
        setOpen(true);
        setLoaded(true);
    };

    function createData(id, name, nums) {
        return { id, name, nums };
    }

    React.useEffect( () => {
        if(loaded){
            getClassesByTeacherEmail(props.teacherEmail).then(items => {
                items.forEach((item, index) => {items[index] = createData(item._id, item.name, item.student_ids.length);});

                setRows(items);
                setLoaded(false);
            });
        }
    },[loaded]);

    const handleAssign = () => {

        let newAssignment = {
            quiz_name: quizName,
            teacher_email: teacherEmail,
            class_id: selections.selectionModel[0]
        }
        genAssignment(newAssignment).then(resp => {
            if(resp.message === "Added assignment") {
                onAdd()
                handleClose()
            }
        })
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSelection = (selections) => {
        setSelections(selections);
    };

    const columns = [{ field: 'name', headerName: 'Class Name', width: 130 },
        { field: 'nums', headerName: '# Students', width: 130 }];

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Assign to a Class
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    Classes for {props.teacherEmail}
                </DialogTitle>
                <DialogContent dividers style={{ height: 400, width: 500}}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} onSelectionModelChange={handleSelection}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleAssign} color="primary" disabled={!selections.selectionModel}>
                        Assign Quiz
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
