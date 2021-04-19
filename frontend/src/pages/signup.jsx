import React, { Component } from "react";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import Box from "@material-ui/core/Box";
import Loading from "../components/utilities/loading";
import CheckIcon from "@material-ui/icons/Check";

// TEMPLATE FOR THIS COMPONENT FROM:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-up/SignUp.js

const styles = (theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  radio: {
    marginTop: "10px"
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

const useStyles = makeStyles(() => ({
  main: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  top: {
    marginTop: "20px",
  },
  info: {
    fontSize: "20px",
  },
}));


class SignupPage extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      email: "",
      userType: "student",
      error: "",
      loading: false,
      openvalidator: false,
    };
    this.signup = this.signup.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
  }

  signup(event) {
    this.setState({ loading: true });
    axios
      .post("/api/user/signup", {
        email: this.state.email,
        name: this.state.name,
        password: this.state.password,
        userType: this.state.userType
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ loading: false, openvalidator: true });
          document.location.href = "/";
        }
      })
      .catch((error) => {
        console.log(error.response);
        this.setState({
          error: error.response.data.error,
          loading: false,
        });
      });
    event.preventDefault();
  }

  render() {
    const { classes } = this.props;
    let page = (
      <div>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign up
            </Typography>
            <form className={classes.form} onSubmit={this.signup}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={this.handleChange}
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    autoComplete="fname"
                    name="name"
                    variant="outlined"
                    required
                    fullWidth
                    id="name"
                    onChange={this.handleChange}
                    label="Full Name"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    onChange={this.handleChange}
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <FormControl component="fieldset" className={classes.radio}>
                <FormLabel component="legend">Account Type</FormLabel>
                <RadioGroup aria-label="type" name="userType" value={this.state.userType} onChange={this.handleChange}>
                  <FormControlLabel value="student" control={<Radio />} label="Student" />
                  <FormControlLabel value="teacher" control={<Radio />} label="Teacher" />
                </RadioGroup>
              </FormControl>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                type="submit"
              >
                Sign Up
              </Button>
              <Grid container justify="flex-end">
                <Grid item>
                  <Link to="/login">Already have an account? Sign in</Link>
                </Grid>
              </Grid>
            </form>
            <Box mt={1} style={{ color: "red" }}>
              {this.state.error}
            </Box>
          </div>
        </Container>
        <Loading loading={this.state.loading} />
      </div>
    );
    return <div>{page}</div>;
  }
}

export default withStyles(styles, { withTheme: true })(SignupPage);
