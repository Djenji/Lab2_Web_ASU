import React, { useState } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    List,
    ListItem,
    ListItemText,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { pages } from "./const";
import "../App.css";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => () => {
        setIsOpen(open);
    };

    return (
        <div>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                sx={{
                    mr: 2,
                    "& svg": {
                        fontSize: "2rem",
                        transition: "transform 0.3s ease",
                    },
                    "&:hover svg": {
                        transform: "scale(1.1)",
                    },
                }}
            >
                <MenuIcon />
            </IconButton>
            <Drawer
                anchor="top"
                open={isOpen}
                onClose={toggleDrawer(false)}
                className="menu-drawer"
            >
                <Box className="menu-drawer-container">
                    <IconButton
                        className="menu-close-button"
                        onClick={toggleDrawer(false)}
                        size="large"
                    >
                        <CloseIcon />
                    </IconButton>
                    <Typography
                        variant="h6"
                        component="div"
                        className="menu-title"
                    >
                        Лабораторные работы
                    </Typography>
                    <List>
                        {pages.map((page) => (
                            <ListItem
                                button
                                key={page.path}
                                component={Link}
                                to={`/${page.path}`}
                                onClick={toggleDrawer(false)}
                            >
                                <ListItemText
                                    primary={page.linktitle}
                                    primaryTypographyProps={{
                                        variant: "body1",
                                    }}
                                />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

export default Menu;
