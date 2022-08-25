import { Visibility } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import request, { gql } from "graphql-request";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { sprintf } from "sprintf-js";
import environment from "../environment";
import Utils from "../utils/Utils";

export default class EditTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            title: "",
            description: "",
            status: "STATUS_OPEN",
            priority: "PRIORITY_MEDIUM",
            message: ""
        };

        this.doSave = this.doSave.bind(this);

    }

    async componentDidMount() {

        let task = Utils.pathTask;

        if (task) {
            let token = this.props.token;

            let query = gql`query { tasks (token : "${token}", id : ${task}) { title description status priority } }`;

            let response = await request(environment.graphqlUrl, query);

            task = response.tasks[0];

            if (task) {
                this.setState({
                    title: task.title,
                    description: task.description,
                    status: task.status,
                    priority: task.priority
                });
            }
        }
    }

    async doSave() {

        let task = Utils.pathTask;
        let token = this.props.token;

        let title = this.state.title;
        let description = this.state.description;
        let status = this.state.status;
        let priority = this.state.priority;

        let query = gql`mutation { task (token : "${token}", id : ${task}, title : "${title}", description : "${description}", status : ${status}, priority : ${priority}) }`;

        let response = await request(environment.graphqlUrl, query);

        if (response.task) {
            this.props.showMessage({
                alertMessage: "Task Successfully Saved", alertType: "success"
            });
        } else {
            this.props.showMessage({
                alertMessage: "Failed to save Task", alertType: "error"
            });
        }
    }

    render() {
        return (
            <Fragment>
                <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                    <Button component={Link} to="/" >Home</Button>
                    <Button component={Link} to={sprintf("/view/%s", Utils.pathTask)} startIcon={<Visibility />}>View</Button>
                </Stack>
                <Stack gap={5}>
                    <TextField label="Title" variant="outlined" value={this.state.title} onChange={(event) => this.setState({ title: event.target.value })} helperText="Task Title" inputProps={{ maxLength: 50 }} />
                    <TextField label="Description" variant="outlined" value={this.state.description} onChange={(event) => this.setState({ description: event.target.value })} helperText="Task Description" inputProps={{ maxLength: 500 }} />
                    <FormControl fullWidth>
                        <InputLabel id="status-select-label">Status</InputLabel>
                        <Select
                            labelId="status-select-label"
                            value={this.state.status}
                            label="Status"
                            onChange={(event) => this.setState({ status: event.target.value })}
                        >
                            <MenuItem value={"STATUS_OPEN"}>Open</MenuItem>
                            <MenuItem value={"STATUS_CLOSED"}>Closed</MenuItem>
                        </Select>
                    </FormControl>
                    <FormControl fullWidth>
                        <InputLabel id="priority-select-label">Priority</InputLabel>
                        <Select
                            labelId="priority-select-label"
                            value={this.state.priority}
                            label="Priority"
                            onChange={(event) => this.setState({ priority: event.target.value })}
                        >
                            <MenuItem value={"PRIORITY_lOW"}>Low</MenuItem>
                            <MenuItem value={"PRIORITY_MEDIUM"}>Medium</MenuItem>
                            <MenuItem value={"PRIORITY_HIGH"}>High</MenuItem>
                            <MenuItem value={"PRIORITY_CRITICAL"}>Critical</MenuItem>
                        </Select>
                    </FormControl>
                    <Button variant="contained" onClick={this.doSave}>Save</Button>
                </Stack>
            </Fragment>
        );
    }
}