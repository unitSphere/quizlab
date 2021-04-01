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
import {addClass, getAllStudents, getStudentsByIds} from "../../api/data";
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
    const [className, setClassName] = React.useState();
    const [rows, setRows] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);
    const {classId, name, onAdd, teacher_id} = props;
    // const classes = styles();
    const handleClickOpen = () => {
        setOpen(true);
        setLoaded(true);

    };
    const handleClose = () => {
        setOpen(false);
    };

    function createData(id, name,surname, email) {
        return { id, name, surname, email};
    }

    const handleAdd = () => {
        let newClass = {
            name: className,
            teacher_id: "DUMMY",
            student_ids: selections.selectionModel
        };
        addClass(newClass).then(resp => {
            onAdd();
        });

        handleClose();

    };

    const handleChange = (event) => {
        setClassName(event.target.value);
    };


    const handleSelection = (selections2) => {
        setSelections(selections2);
    };

    React.useEffect( () => {
        if(loaded){
            getAllStudents().then(items => {
                items.forEach((item, index, items) => {items[index] = createData(item._id, item.name, item.surname, item.email);});
                setRows(items);
                setLoaded(true);
            });
        }
    }, [loaded]);

    const columns = [{ field: 'name', headerName: 'Name', width: 130 },
        { field: 'surname', headerName: 'Surname', width: 130 },
        { field: 'email', headerName: 'Email', width: 130 }];
    const classes = use();

    return (
         <div style={{display: "flex",
            flexDirection: "row"}}>


            <Button variant="outlined" color="primary" onClick={handleClickOpen} style={{marginLeft: "auto"}}>
                Add Class
            </Button>

            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    <form className={classes.root} noValidate autoComplete="off">
                        <TextField id="classNameInput" label="Input Class Name" variant="outlined" onChange={handleChange}
                        />
                    </form>
                </DialogTitle>
                <DialogContent dividers style={{ height: 400, width: 500}}>
                    <DataGrid rows={rows} columns={columns} pageSize={5} checkboxSelection onSelectionModelChange={handleSelection}/>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleAdd} color="primary">
                        Create Class
                    </Button>
                </DialogActions>
            </Dialog>

        </div>
    );
}
