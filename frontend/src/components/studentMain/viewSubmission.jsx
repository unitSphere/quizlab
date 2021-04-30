import React from 'react';
import {withStyles} from '@material-ui/core/styles';
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
import {
    getProblemsByAssignmentId,
    getStudentsByIds,
    getSubmissionById,
    getSubmissionsByStudentId,
    submitResponse
} from "../../api/data";
import Table from "@material-ui/core/Table";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormLabel from "@material-ui/core/FormLabel";

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
    const {children, classes, onClose, ...other} = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon/>
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

export default function ViewSubmission(props) {
    const [open, setOpen] = React.useState(false);
    let {clicked, assignment_id, student_id, submission_id, alreadySubmitted, onSubmit} = props;
    const [rows, setRows] = React.useState([]);
    const [loaded, setLoaded] = React.useState(false);

    const [values, setValues] = React.useState({});

    const handleChange = (event) => {
        let newValues = values;
        newValues[event.target.name] = event.target.value;
        setValues(newValues);
    };

    const handleClickOpen = () => {
        setOpen(true);
        setLoaded(true);
    };

    React.useEffect(() => {
        if (loaded) {
            getProblemsByAssignmentId(assignment_id).then(items => {
                console.log(items)
                setRows(items);
                setLoaded(false);
            });

            if (alreadySubmitted) {
                getSubmissionById(submission_id).then(items => {
                    setValues(items[0].answers)
                })
            }
        }
    }, [loaded]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = () => {
        handleClose();
        submitResponse(submission_id, assignment_id, values).then(r => {
                console.log("Updated submission")
                onSubmit()
            }
        );

    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                View
            </Button>
            <Dialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={open}>
                <DialogTitle id="customized-dialog-title" onClose={handleClose}>
                    {props.quiz_name}
                </DialogTitle>
                <DialogContent dividers>
                    <FormControl component="fieldset">
                        {rows.map((row, index) => (
                            <div key={index}>
                                <FormLabel component="legend">{row.description}</FormLabel>
                                <RadioGroup aria-label="gender" name={row._id} value={values[row._id]}
                                            onChange={handleChange}>
                                    {Object.keys(row.choices).map(key => (
                                        <FormControlLabel key={key} value={key} control={<Radio/>}
                                                          label={row.choices[key]}/>
                                    ))
                                    }
                                </RadioGroup>
                            </div>
                        ))}
                    </FormControl>

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleSubmit} color="primary" disabled={alreadySubmitted}>
                        {alreadySubmitted ? "Submitted" : "Submit"}
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
