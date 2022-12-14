import { DeleteOutline, Edit, Search, Visibility } from "@mui/icons-material";
import { IconButton, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, TableSortLabel, Box, Typography, TextField, InputAdornment } from "@mui/material";
import request, { gql } from "graphql-request";
import { Component, Fragment } from "react";
import { Link } from "react-router-dom";
import { sprintf } from "sprintf-js";
import naturalCompare from "string-natural-compare";
import environment from "../environment";
import DeleteDialog from "./DeleteDialog";

export default class TaskList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            tasks: [],
            task: null,
            orderBy: this.tableHeaders[0].key,
            order: "asc",
            search: "",
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleDelete = this.handleDelete.bind(this);

        this.handleChangeSortOrder = this.handleChangeSortOrder.bind(this);
        this.handleSort = this.handleSort.bind(this);

        this.handleSearch = this.handleSearch.bind(this);
    }

    handleClose() {
        this.setState({ task: null });
    }

    handleChangeSortOrder(column) {
        let isAsc = this.state.orderBy === column && this.state.order === "asc";
        this.setState({ order: isAsc ? "desc" : "asc" });
        this.setState({ orderBy: column });
    }

    handleSort(a, b) {
        let appliedSortOrder = this.state.order === "asc" ? 1 : -1;

        return (
            naturalCompare(
                a[this.state.orderBy].toString(),
                b[this.state.orderBy].toString(),
                {
                    caseInsensitive: true,
                }
            ) * appliedSortOrder
        );
    }

    get tableHeaders() {
        return [
            { key: "id", title: "#" },
            { key: "title", title: "Title" },
            { key: "user", title: "User" },
            { key: "status", title: "Status" },
            { key: "created", title: "Submitted" },
            { key: "actions", title: "", align: "right" },
        ];
    }

    handleSearch(item) {
        return (
            item != undefined &&
            (this.state.search.length == 0 ||
                Object.values(item).find((val) =>
                    val.toString().toLowerCase().includes(this.state.search.toLowerCase())
                ))
        );
    }

    async handleDelete() {

        let token = this.props.token;
        let task = this.state.task;

        let query = gql`mutation { delete (token : "${token}", id : ${task} ) }`;

        let response = await request(environment.graphqlUrl, query);

        if (response.delete) {
            this.setState({ task: null, tasks: this.state.tasks.filter((i) => i.id != task) }, () => {
                this.props.showMessage({
                    alertMessage: "Task Successfully Deleted", alertType: "success"
                });
            });
        } else {
            this.props.showMessage({
                alertMessage: "Failed to delete Task", alertType: "error"
            });
        }

    }

    async componentDidMount() {

        let token = this.props.token;

        let query = gql`query { tasks (token : "${token}") { id title user { email } status created } }`;

        let response = await request(environment.graphqlUrl, query);

        this.setState({ tasks: response.tasks });
    }

    render() {
        return (
            <Fragment>
                <Stack>
                    <Stack direction="row" justifyContent="space-between">
                        <TextField
                            id="search"
                            placeholder="Search"
                            variant="outlined"
                            margin="dense"
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <Search />
                                    </InputAdornment>
                                ),
                                sx: {
                                    border: "none !mportant",
                                    outlineOffset: "none !mportant",
                                    ":focus-visible": { outlineOffset: "none !mportant" },
                                },
                            }}
                            sx={{ mx: 5 }}
                            onChange={(event) =>
                                this.setState({ search: event.target.value })
                            }
                        />

                        <Button component={Link} to="/create" >Create</Button>
                    </Stack>

                    <TableContainer>
                        <Table aria-label="Tasks table">
                            <TableHead>
                                <TableRow>
                                    {this.tableHeaders.map((header) => {
                                        return (
                                            <TableCell
                                                key={header.key}
                                                align={header.align || "left"}
                                                sortDirection={
                                                    this.state.orderBy === header.key
                                                        ? this.state.order
                                                        : false
                                                }
                                            >
                                                <TableSortLabel
                                                    active={this.state.orderBy === header.key}
                                                    direction={
                                                        this.state.orderBy === header.key
                                                            ? this.state.order
                                                            : "asc"
                                                    }
                                                    onClick={() => this.handleChangeSortOrder(header.key)}
                                                >
                                                    {header.title}
                                                </TableSortLabel>
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {this.state.tasks
                                    .filter(this.handleSearch)
                                    .sort(this.handleSort)
                                    .map((task) => {

                                        let status = "";
                                        switch (task.status) {
                                            case "STATUS_OPEN":
                                                status = "Open";
                                                break;
                                            case "STATUS_CLOSED":
                                                status = "Closed";
                                                break;
                                        }

                                        return (
                                            <TableRow
                                                key={task.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell>{task.id}</TableCell>
                                                <TableCell component="th" scope="row">
                                                    {task.title}
                                                </TableCell>
                                                <TableCell>{task.user.email}</TableCell>
                                                <TableCell>{status}</TableCell>
                                                <TableCell>{task.created}</TableCell>
                                                <TableCell align="right">
                                                    <Stack direction="row">
                                                        <Tooltip title="View">
                                                            <IconButton component={Link} to={sprintf("/view/%s", task.id)} >
                                                                <Visibility />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Edit">
                                                            <IconButton component={Link} to={sprintf("/edit/%s", task.id)} >
                                                                <Edit />
                                                            </IconButton>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                            <IconButton onClick={() => this.setState({ task: task.id })} >
                                                                <DeleteOutline />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </Stack>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Stack direction="row" justifyContent="flex-end">
                        <Button component={Link} to="/create" >Create</Button>
                    </Stack>
                </Stack>
                <DeleteDialog open={this.state.task != null} handleClose={this.handleClose} handleDelete={this.handleDelete} />
            </Fragment>
        );
    }
}