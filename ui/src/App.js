import { Component, Suspense, lazy, Fragment } from "react";
import Splash from "./screen/Splash";
import request, { gql } from "graphql-request";
import environment from "./environment";
import { Alert, AlertTitle, Box, Snackbar } from "@mui/material";
import Utils from "./utils/Utils";

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            token: Utils.token,
            alertMessage: "",
            alertType: "info"
        };

        this.setToken = this.setToken.bind(this);
        this.showMessage = this.showMessage.bind(this);
        this.clearMessage = this.clearMessage.bind(this);

    }

    setToken(token) {
        this.setState({ token: token }, () => {
            Utils.token = token;
        });
    }

    get mainScreen() {
        return lazy(async () => {
            let token = this.state.token;

            if (token.length != 0) {
                let query = gql`mutation { login (token : "${token}") { email } }`;

                let response = await request(environment.graphqlUrl, query);

                if (response.login != null) {
                    return import('./screen/Tasks');
                }
            }
            return import('./screen/Login');
        });
    }

    showMessage(alert) {
        this.setState({ alertMessage: alert.alertMessage, alertType: alert.AlertType });
    }

    clearMessage() {
        this.setState({ alertMessage: "" });
    }

    render() {
        return (
            <Suspense fallback={<Splash />}>
                <Fragment sx={{ backgroundColor: "grey" }}>
                    <this.mainScreen setToken={this.setToken} key={this.state.token} token={this.state.token} showMessage={this.showMessage} clearMessage={this.clearMessage} />
                    <Snackbar open={this.state.alertMessage.length != 0} onClose={this.clearMessage} autoHideDuration={5000}>
                        <Alert severity={this.state.alertType} onClose={this.clearMessage} >
                            <AlertTitle>Message</AlertTitle>
                            {this.state.alertMessage}
                        </Alert>
                    </Snackbar>
                </Fragment>
            </Suspense>
        );
    }
}