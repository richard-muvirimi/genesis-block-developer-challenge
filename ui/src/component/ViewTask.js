import { Edit } from "@mui/icons-material";
import { Button, FormControl, InputLabel, MenuItem, Select, Stack, Typography } from "@mui/material";
import request, { gql } from "graphql-request";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { sprintf } from "sprintf-js";
import environment from "../environment";
import Utils from "../utils/Utils";

export default class ViewTask extends Component {

    constructor(props) {
        super(props);

        this.state = {
            task: null,
        };

        this.doSave = this.doSave.bind(this);
    }

    async componentDidMount() {

        let task = Utils.pathTask;
        let token = this.props.token;

        let query = gql`query { tasks (token : "${token}", id : ${task}) { title description status priority created updated } }`;

        let response = await request(environment.graphqlUrl, query);

        this.setState({
            task: response.tasks[0],
        });
    }

    async doSave(status) {

        let task = Utils.pathTask;
        let token = this.props.token;

        let title = this.state.task?.title;
        let description = this.state.task?.description;
        let priority = this.state.task?.priority;

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

    get taskPriority() {
        let priority = "";
        switch (this.state.task?.priority || "") {
            case "PRIORITY_lOW":
                priority = "Low";
                break;
            case "PRIORITY_MEDIUM":
                priority = "Medium";
                break;
            case "PRIORITY_HIGH":
                priority = "High";
                break;
            case "PRIORITY_CRITICAL":
                priority = "Critical";
                break;
        }
        return priority;
    }

    render() {
        return (
            <Fragment>
                <Stack direction="column" gap={2}>
                    <Stack direction="row" justifyContent="flex-end" sx={{ mb: 2 }}>
                        <Button component={Link} to="/" >Home</Button>
                        <Button component={Link} to={sprintf("/edit/%s", Utils.pathTask)} startIcon={<Edit />}>Edit</Button>
                    </Stack>
                    <Stack direction="column">
                        <Typography variant="h6">
                            Title
                        </Typography>
                        <Typography>
                            {this.state.task?.title || ""}
                        </Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography variant="h6">
                            Description
                        </Typography>
                        <Typography>
                            {this.state.task?.description || ""}
                        </Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography variant="h6">
                            Status
                        </Typography>
                        <FormControl fullWidth>
                            <InputLabel id="status-select-label">Status</InputLabel>
                            <Select
                                labelId="status-select-label"
                                value={this.state.task?.status || ""}
                                label="Status"
                                onChange={(event) => this.doSave(event.target.value)}
                            >
                                <MenuItem value={"STATUS_OPEN"}>Open</MenuItem>
                                <MenuItem value={"STATUS_CLOSED"}>Closed</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                    <Stack direction="column">
                        <Typography variant="h6">
                            Priority
                        </Typography>
                        <Typography>
                            {this.taskPriority}
                        </Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography variant="h6">
                            Created
                        </Typography>
                        <Typography>
                            {this.state.task?.created || ""}
                        </Typography>
                    </Stack>
                    <Stack direction="column">
                        <Typography variant="h6">
                            Updated
                        </Typography>
                        <Typography>
                            {this.state.task?.updated || ""}
                        </Typography>
                    </Stack>
                </Stack>
            </Fragment>
        );
    }
}