import React from "react";
import "./AppBox.css";
import MainContent from "./MainContent";
import {Redirect} from "react-router-dom";
import PrivateRoute from "./authentication/PrivateRoute";
import Resources from "./pages/Resources";
import Rules from "./pages/Rules";
import EventsAnalytics from "./pages/EventsAnalytics";
import ProfilesAnalytics from "./pages/ProfilesAnalytics";
import SessionsAnalytics from "./pages/SessionsAnalytics";
import FlowEditor from "./flow/FlowEditor";
import Flows from "./pages/Flows";
import urlPrefix from "../misc/UrlPrefix";
import ActionPlugins from "./pages/ActionPlugins";
import Credentials from "./pages/Credentials";
import Segments from "./pages/Segments";
import FlowReader from "./flow/FlowReader";
import '@szhsin/react-menu/dist/index.css';
import Instances from "./pages/Instances";

const AppBox = () => {

    return <MainContent>

        <PrivateRoute exact path={urlPrefix("")} roles={["admin"]}>
            <Redirect to={urlPrefix("/home/events")}/>
        </PrivateRoute>

        <PrivateRoute exact path={urlPrefix("/home")} roles={["admin"]}>
            <Redirect to={urlPrefix("/home/events")}/>
        </PrivateRoute>

        <div className="Content">
            <PrivateRoute path={urlPrefix("/home/events")} roles={["admin"]}>
                <EventsAnalytics/>
            </PrivateRoute>

            <PrivateRoute path={urlPrefix("/home/profiles")} roles={["admin"]}>
                <ProfilesAnalytics/>
            </PrivateRoute>

            <PrivateRoute path={urlPrefix("/home/sessions")} roles={["admin"]}>
                <SessionsAnalytics/>
            </PrivateRoute>

            <PrivateRoute exact path={urlPrefix("")} roles={["admin"]}>

            </PrivateRoute>

            <PrivateRoute path={urlPrefix("/setup/resources")} roles={["admin"]}>
                <Resources/>
            </PrivateRoute>
            <PrivateRoute path={urlPrefix("/setup/flows")} roles={["admin"]}>
                <Flows/>
            </PrivateRoute>
            <PrivateRoute exact path={urlPrefix("/setup/flow/edit/:id")} roles={["admin"]}>
                <FlowEditor/>
            </PrivateRoute>
            <PrivateRoute exact path={urlPrefix("/setup/flow/:id")} roles={["admin"]}>
                <FlowReader/>
            </PrivateRoute>
            <PrivateRoute path={urlPrefix("/setup/flow-actions")} roles={["admin"]}>
                <ActionPlugins/>
            </PrivateRoute>
            <PrivateRoute path={urlPrefix("/setup/rules")} roles={["admin"]}>
                <Rules/>
            </PrivateRoute>
            <PrivateRoute path={urlPrefix("/setup/segments")} roles={["admin"]}>
                <Segments/>
            </PrivateRoute>

            <PrivateRoute path={urlPrefix("/setup/instances")} roles={["admin"]}>
                <Instances/>
            </PrivateRoute>

            <PrivateRoute path={urlPrefix("/setup/credentials")} roles={["admin"]}>
                <Credentials/>
            </PrivateRoute>
            <PrivateRoute exact path={urlPrefix("/setup")} roles={["admin"]}>
                <Flows/>
            </PrivateRoute>
        </div>

    </MainContent>
}

export default AppBox;