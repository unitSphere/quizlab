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
import { DataGrid } from '@material-ui/data-grid';
import makeStyles from "@material-ui/core/styles/makeStyles";
import TextField from "@material-ui/core/TextField";
import {getClassesByTeacherEmail, addQuiz} from "../../api/data";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";


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
    }
});


const use = makeStyles({
    addButton:{
        marginLeft: "auto",
        marginRight: "2.5em"

    }
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

export default function AddClassDialog(props) {
    const [open, setOpen] = React.useState(false);
    const [selections, setSelections] = React.useState([]);
    const [quizName, setQuizName] = React.useState();
    const [rows, setRows] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const {quizId, name, onAdd, teacherEmail} = props;
    // const classes = styles();
    const handleClickOpen = () => {
        setOpen(true);
        setLoaded(true);

    };
    const handleClose = () => {
        setOpen(false);
    };

    // Data for each class the teacher oversees
    function createData(id, name, nums) {
        return { id, name, nums };
    }

    const handleAdd = () => {
        let newQuiz = {
            name: quizName,
            teacher_email: teacherEmail,
            class_ids: selections.selectionModel
        };

        addQuiz(newQuiz).then(resp => {
            console.log("Add quiz? ", resp)
            onAdd();
        });

        handleClose();
    };

    const handleChange = (event) => {
        setQuizName(event.target.value);
    };


    const handleSelection = (selections2) => {
        setSelections(selections2);
    };

    React.useEffect( () => {
        if(loaded){
            getClassesByTeacherEmail(teacherEmail).then(items => {
                items.forEach((item, index, items) => {items[index] = createData(item._id, item.name, items.length);});
                setRows(items);
                setLoaded(true);
            });
        }
    }, [teacherEmail, loaded]);

    const columns = [{ field: 'name', headerName: 'Name', width: 130 },
        { field: 'nums', headerName: 'No. Students', width: 130 }];
    const classes = use();

    return (
        <div style={{display: "flex",
            flexDirection: "row"}}>


            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{marginLeft: "auto"}}>
                Add Quiz
            </Button>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="classNameInput" label="Input Quiz Name" variant="outlined" onChange={handleChange}
                        />
                    </form>
                </DialogTitle>
                <DialogContent dividers style={{ height: 400, width: 500}}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={handleSelection}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleAdd} color="primary">
                        Create Quiz
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
