import React, {Component} from "react";
import "./App.css";
import {Route, Switch, Redirect} from "react-router-dom";
import {UserContext} from './hooks/UserProvider';
import HomePage from "./pages/home";

import AboutPage from "./pages/about";
import ErrorPage from "./pages/error";
import ProfilePage from "./pages/profile";

import NavigationBar from "./components/mainNav";
import SideNavigation from "./components/sideNav";

import axios from "axios";
import SignupPage from "./pages/signup";
import LoginPage from "./pages/login";
import MainPage from "./pages/main";
import QuizzesPage from "./pages/quizzes";
import ClassesPage from "./pages/classes";
import StudentMainPage from "./pages/studentMain";
import TeacherMainPage from "./pages/teacherMain";

class App extends Component {
    state = {};

    constructor(props) {
        super(props);
        this.state = {isauth: false, user: null, user_id: null};
    }

    checkAuth() {
        axios
            .get("/api/user/isauthenticated")
            .then(response => {
                console.log(response);
                if (
                    this.state.isauth !== response.data.isauth ||
                    this.state.user !== response.data.username
                ) {
                    this.setState({
                        isauth: response.data.isauth,
                        user: response.data.username,
                        userType: response.data.type,
                        user_id: response.data.user_id
                    });
                }
            })
            .catch(error => {
                console.log("error", error);
            });
    }

    componentDidMount() {
        this.checkAuth();
    }

    render() {
        //if (!this.state.isauth) return <h1>ERROR</h1>;

        let sideNav = this.state.isauth ? <SideNavigation type={this.state.userType}/> : "";
        let just_left = this.state.isauth
            ? "App_top_just App_left_just"
            : "App_top_just";
        // Determine swtich rules if authenticated or not
        let switchRule = (
            <Switch>
                <Route exact path="/">
                    <HomePage/>
                </Route>
                <Route exact path="/signup">
                    <SignupPage/>
                </Route>
                <Route exact path="/login">
                    <LoginPage/>
                </Route>
                <Route exact path="/error">
                    <ErrorPage/>
                </Route>
            </Switch>
        );
        if (this.state.isauth) {
            switchRule = (
                <Switch>
                    <Route path="/main">
                        <MainPage isauth={this.state.isauth} user={this.state.user} userType={this.state.userType}/>
                    </Route>
                    <Route path="/profile">
                        <ProfilePage isauth={this.state.isauth} user={this.state.user}
                                     userType={this.state.userType}/>
                    </Route>
                    <Route path="/quizzes">
                        <QuizzesPage isauth={this.state.isauth} user={this.state.user}
                                     userType={this.state.userType}/>
                    </Route>
                    <Route path="/classes">
                        <ClassesPage
                            isauth={this.state.isauth}
                            user={this.state.user}
                            userType={this.state.userType}
                        />
                    </Route>
                    <Route path="/about">
                        <AboutPage isauth={this.state.isauth} user={this.state.user} userType={this.state.userType}/>
                    </Route>
                    <Route path="/student">
                        <StudentMainPage isauth={this.state.isauth} user={this.state.user} user_id={this.state.user_id}
                                         userType={this.state.userType}/>
                    </Route>
                    <Route path="/teacher">
                        <TeacherMainPage isauth={this.state.isauth} user={this.state.user}
                                         userType={this.state.userType}/>
                    </Route>
                    <Route path="/error">
                        <ErrorPage/>
                    </Route>
                    <Redirect from="/" to="/main"/>
                </Switch>
            );
        }
        return (
            <div>
                <NavigationBar isauth={this.state.isauth} user={this.state.user} userType={this.state.userType}/>
                {sideNav}
                <div className={just_left}>{switchRule}</div>
            </div>
        );
    }
}

export default App;
