import { Stack, Typography } from "@mui/material";
import { Component } from "react";

export default class NotFound extends Component {
    render() {
        return (
            <Stack gap={2} sx={{ p: 5, minHeight: "80vh" }} justifyContent="center">
                <Typography variant="subtitle1" textAlign="center">
                    The page you are looking for was
                </Typography>
                <Typography variant="h1" textAlign="center">
                    Not Found
                </Typography>
            </Stack>
        );
    }
}