import { Alert, AlertTitle, Button, Paper, Snackbar, Stack, Typography } from "@mui/material";
import { Component, Fragment, lazy, Suspense } from "react";
import { Link, Route, Routes } from "react-router-dom";
import Utils from "../utils/Utils";
import Splash from "./Splash";

export default class Tasks extends Component {

    get taskList() {
        return lazy(async () => import("../component/TaskList"));
    }

    get taskView() {
        return lazy(async () => import("../component/ViewTask"));
    }

    get taskEdit() {
        return lazy(async () => import("../component/EditTask"));
    }

    get notFound() {
        return lazy(async () => import("../component/NotFound"));
    }

    render() {
        return (
            <Stack>
                <Stack direction="row" justifyContent="space-between">
                    <Button component={Link} to="/"><Typography>Support Tickets</Typography></Button>
                    <Stack direction="row" gap={1} alignItems="center">
                        <Typography>{Utils.userName}</Typography>
                        <Button component={Link} to="/" onClick={() => this.props.setToken("")}>Logout</Button>
                    </Stack>
                </Stack>
                <Suspense fallback={<Splash />}>
                    <Paper sx={{ m: 1, p: 2 }}>
                        <Routes>
                            <Route path="/" element={<this.taskList token={this.props.token} showMessage={this.props.showMessage} />} />
                            <Route path="/edit/*" element={<this.taskEdit token={this.props.token} showMessage={this.props.showMessage} />} />
                            <Route path="/create" element={<this.taskEdit token={this.props.token} showMessage={this.props.showMessage} />} />
                            <Route path="/view/*" element={<this.taskView token={this.props.token} showMessage={this.props.showMessage} />} />
                            <Route path="*" element={<this.notFound />} />
                        </Routes>
                    </Paper>
                </Suspense>
            </Stack>
        );
    }
}