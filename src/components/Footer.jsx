import * as React from "react";
import { Link } from "react-router-dom";
import { Paper, Box } from "@mui/material";
import "../App.css";

export default function Footer() {
    return (
        <Paper
            component="footer"
            square
            sx={{
                py: 2,
                position: "fixed",
                bottom: 0,
                width: "100%",
                bgcolor: "primary.main",
                color: "white",
            }}
        >
            <Box sx={{ display: "flex", justifyContent: "center", gap: 2 }}>
                <Link to="/otzyv" style={{ color: "inherit" }}>
                    Отзывы
                </Link>
                <span>butkeeva.42012</span>
            </Box>
        </Paper>
    );
}
