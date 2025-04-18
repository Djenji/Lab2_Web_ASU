import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Paper, Box, IconButton, Tooltip } from "@mui/material";
import {
    Home as HomeIcon,
    Settings as SettingsIcon,
    Feedback as FeedbackIcon,
    Brightness4 as ThemeIcon,
} from '@mui/icons-material';
import { ThemeContext } from "../ThemeContext";
import "../App.css";

export default function Footer() {
    const navigate = useNavigate();
    const { toggleTheme } = React.useContext(ThemeContext);

    const quickActions = [
        { icon: <HomeIcon />, tooltip: 'Главная', action: () => navigate('/') },
        { icon: <FeedbackIcon />, tooltip: 'Обратная связь', action: () => navigate('/otzyv') }, // Изменено на переход к отзывам
        { icon: <ThemeIcon />, tooltip: 'Сменить тему', action: toggleTheme },
        { icon: <SettingsIcon />, tooltip: 'Настройки', action: () => navigate('/settings') }
    ];

    return (
        <Paper
            component="footer"
            square
            sx={{
                position: "fixed",
                bottom: 0,
                width: "100%",
                bgcolor: "primary.main",
                color: "white",
                zIndex: 1000,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0 16px"
            }}
        >
            <Box sx={{ 
                display: "flex", 
                gap: 1,
                padding: "8px 0"
            }}>
                {quickActions.map((action, index) => (
                    <Tooltip key={index} title={action.tooltip} arrow>
                        <IconButton 
                            color="inherit"
                            onClick={action.action}
                            sx={{
                                '&:hover': {
                                    transform: 'translateY(-3px)',
                                    backgroundColor: 'rgba(255, 255, 255, 0.2)'
                                },
                                transition: 'all 0.3s ease',
                            }}
                        >
                            {action.icon}
                        </IconButton>
                    </Tooltip>
                ))}
            </Box>
            <Box sx={{ 
                display: "flex", 
                gap: 2,
                padding: "8px 0"
            }}>
                <span>butkeeva.42012</span>
            </Box>
        </Paper>
    );
}