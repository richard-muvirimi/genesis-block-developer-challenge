import { Button, Stack, TextField, Typography } from "@mui/material";
import request, { gql } from "graphql-request";
import { Component, createRef } from "react";
import { sprintf } from "sprintf-js";
import base64 from "base-64";
import environment from "../environment";

export default class Login extends Component {

    #txtEmail;
    #txtPassword;

    constructor(props) {
        super(props);

        this.#txtEmail = createRef();
        this.#txtPassword = createRef();

        this.doLogin = this.doLogin.bind(this);
    }

    async doLogin() {
        this.props.clearMessage();

        let email = this.#txtEmail.current.value;
        let password = this.#txtPassword.current.value;

        let token = sprintf("%s:%s", email, password);
        token = base64.encode(token);

        let query = gql`mutation { login (token : "${token}") { email } }`;

        let response = await request(environment.graphqlUrl, query);

        if (response.login == null) {
            this.props.showMessage({
                alertMessage: "Invalid Credentials", alertType: "error"
            });
        } else {
            this.props.setToken(token);
        }

    }

    render() {
        return (
            <Stack gap={2} sx={{ p: 5, minHeight: "80vh" }} justifyContent="center">
                <Typography variant="h6" textAlign="center">
                    Genesis Block Demo
                </Typography>
                <Typography variant="h1" textAlign="center">
                    Support Ticket System
                </Typography>
                <TextField label="Email" variant="outlined" inputProps={{ ref: this.#txtEmail }} type="email" />
                <TextField label="Password" variant="outlined" inputProps={{ ref: this.#txtPassword }} type="password" />
                <Button variant="contained" onClick={this.doLogin}>Login</Button>
            </Stack>
        );
    }
}