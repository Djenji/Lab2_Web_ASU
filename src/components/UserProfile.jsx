import React, { useState, useContext } from "react";
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    ListItemIcon,
    Menu,
    MenuItem,
    Typography,
    styled,
} from "@mui/material";
import { Logout, AccountCircle, Settings } from "@mui/icons-material";
import { ThemeContext } from "../ThemeContext";

const StyledMenu = styled(Menu)(({ theme }) => ({
    "& .MuiPaper-root": {
        borderRadius: 12,
        marginTop: theme.spacing(1),
        minWidth: 200,
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
        "&:before": {
            content: '""',
            display: "block",
            position: "absolute",
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: "background.paper",
            transform: "translateY(-50%) rotate(45deg)",
            zIndex: 0,
        },
    },
}));

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
    "&:hover": {
        backgroundColor:
            theme.palette.mode === "dark"
                ? "rgba(255, 255, 255, 0.08)"
                : "rgba(95, 75, 139, 0.1)",
    },
    padding: theme.spacing(1.5, 2),
}));

function UserProfile({ userData, onLogout }) {
    const { theme } = useContext(ThemeContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        onLogout();
        handleMenuClose();
    };

    return (
        <Box>
            <IconButton
                onClick={handleMenuOpen}
                sx={{
                    background:
                        theme === "dark"
                            ? "linear-gradient(135deg, #7d6ba0 0%, #5f4b8b 100%)"
                            : "linear-gradient(135deg, #5f4b8b 0%, #7d6ba0 100%)",
                    color: "white",
                    p: 0.8,
                    transition: "all 0.3s ease",
                    "&:hover": {
                        transform: "scale(1.05)",
                        boxShadow: "0 4px 12px rgba(95, 75, 139, 0.3)",
                    },
                }}
            >
                <Avatar
                    sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "transparent",
                        color: "white",
                        fontSize: "0.9rem",
                        fontWeight: "bold",
                    }}
                >
                    {userData?.name?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>
            </IconButton>

            <StyledMenu
                anchorEl={anchorEl}
                open={isMenuOpen}
                onClose={handleMenuClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{
                    sx: {
                        bgcolor:
                            theme === "dark"
                                ? "background.default"
                                : "background.paper",
                    },
                }}
            >
                <Box sx={{ px: 2, py: 1.5, textAlign: "center" }}>
                    <Typography variant="subtitle1" noWrap fontWeight="600">
                        {userData?.name || "Пользователь"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" noWrap>
                        {userData?.email || ""}
                    </Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <StyledMenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <AccountCircle fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="body2">Профиль</Typography>
                </StyledMenuItem>

                <StyledMenuItem onClick={handleMenuClose}>
                    <ListItemIcon>
                        <Settings fontSize="small" color="primary" />
                    </ListItemIcon>
                    <Typography variant="body2">Настройки</Typography>
                </StyledMenuItem>

                <Divider sx={{ my: 1 }} />

                <StyledMenuItem
                    onClick={handleLogout}
                    sx={{
                        color: "error.main",
                        "&:hover": {
                            backgroundColor:
                                theme === "dark"
                                    ? "rgba(255, 102, 102, 0.08)"
                                    : "rgba(255, 68, 68, 0.1)",
                        },
                    }}
                >
                    <ListItemIcon sx={{ color: "error.main" }}>
                        <Logout fontSize="small" />
                    </ListItemIcon>
                    <Typography variant="body2">Выйти</Typography>
                </StyledMenuItem>
            </StyledMenu>
        </Box>
    );
}

export default UserProfile;
