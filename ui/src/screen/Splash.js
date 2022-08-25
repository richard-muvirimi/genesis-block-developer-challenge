import { Stack, Typography } from "@mui/material";
import { Component } from "react";

export default class Splash extends Component {
    render() {
        return (
            <Stack gap={2} sx={{ p: 5, minHeight: "80vh" }} justifyContent="center">
                <Typography variant="subtitle1" textAlign="center">
                    Support Ticket System
                </Typography>
                <Typography variant="caption" textAlign="center">
                    for
                </Typography>
                <Typography variant="h1" textAlign="center">
                    Genesis Block
                </Typography>
            </Stack>
        );
    }
}