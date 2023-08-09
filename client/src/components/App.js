import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { hot } from "react-hot-loader/root";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute.js"

import getCurrentUser from "../services/getCurrentUser";
import "../assets/scss/main.scss";
import RegistrationForm from "./registration/RegistrationForm";
import SignInForm from "./authentication/SignInForm";
import TopBar from "./layout/TopBar";
import SiteList from "./SiteList";
import SiteShow from "./SiteShow";
import ReviewForm from "./ReviewForm";
import AuthenticatedRoute from "./authentication/AuthenticatedRoute"

const App = (props) => {
    const [currentUser, setCurrentUser] = useState(undefined);
    const fetchCurrentUser = async () => {
        try {
            const user = await getCurrentUser();
            setCurrentUser(user);
        } catch (err) {
            setCurrentUser(null);
        }
    };

    useEffect(() => {
        fetchCurrentUser();
    }, []);
// console.warn("The user is:", currentUser)
// const currentUserId = currentUser ? currentUser.id : 0
    return (
        <Router>
            <TopBar user={currentUser} />
            <Switch>
                <Route exact path="/" component={SiteList} />
                <Route exact path="/sites/:id" render={(props) => <SiteShow user={currentUser} {...props} /> } />

                <Route exact path="/users/new" component={RegistrationForm} />
                <Route exact path="/user-sessions/new" component={SignInForm} /> 
            </Switch>
        </Router>
    );
};

export default hot(App);
