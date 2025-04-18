import React, { useState, useContext } from "react";
import {
    Drawer,
    Box,
    Typography,
    IconButton,
    ListItem,
    ListItemText,
    useMediaQuery,
    useTheme
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { pages } from "./const";
import { ThemeContext } from "../ThemeContext";
import "../App.css";

function Menu() {
    const [isOpen, setIsOpen] = useState(false);
    const theme = useTheme();
    const { theme: currentTheme } = useContext(ThemeContext);
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const toggleDrawer = (open) => () => {
        setIsOpen(open);
    };

    const menuStyles = {
        light: {
            background: '#ffffff',
            textColor: '#333333',
            hoverBg: 'rgba(95, 75, 139, 0.08)',
            dividerColor: 'rgba(0, 0, 0, 0.12)'
        },
        dark: {
            background: '#1e1e1e',
            textColor: '#e0e0e0',
            hoverBg: 'rgba(255, 255, 255, 0.08)',
            dividerColor: 'rgba(255, 255, 255, 0.12)'
        }
    };

    const currentStyle = menuStyles[currentTheme];

    return (
        <>
            <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer(true)}
            >
                <MenuIcon />
            </IconButton>
            
            <Drawer
                anchor={isMobile ? "bottom" : "right"}
                open={isOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: isMobile ? '100%' : '320px',
                        height: isMobile ? '70vh' : '100vh',
                        background: currentStyle.background,
                        color: currentStyle.textColor,
                    },
                }}
            >
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    height: '100%'
                }}>
                    {/* Шапка меню */}
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '16px',
                        borderBottom: `1px solid ${currentStyle.dividerColor}`
                    }}>
                        <Typography
                            variant="h6"
                            component="div"
                            sx={{
                                fontFamily: 'var(--accent-font)',
                                fontWeight: 600,
                            }}
                        >
                            Меню
                        </Typography>
                        <IconButton
                            onClick={toggleDrawer(false)}
                            sx={{ 
                                color: currentStyle.textColor,
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Box>
                    
                    {/* Пункты меню */}
                    <Box sx={{
                        flex: 1,
                        overflowY: 'auto',
                        padding: '8px 0'
                    }}>
                        {pages.map((page) => (
                            <ListItem
                                key={page.path}
                                button
                                component={Link}
                                to={`/${page.path}`}
                                onClick={toggleDrawer(false)}
                                sx={{
                                    padding: '12px 24px',
                                    '&:hover': {
                                        backgroundColor: currentStyle.hoverBg
                                    }
                                }}
                            >
                                <ListItemText
                                    primary={page.linktitle}
                                    primaryTypographyProps={{
                                        sx: { 
                                            color: currentStyle.textColor,
                                            fontFamily: 'var(--main-font)',
                                            fontWeight: 500,
                                        }
                                    }}
                                />
                            </ListItem>
                        ))}
                    </Box>

                    {/* Подвал меню */}
                    <Box sx={{
                        padding: '16px',
                        borderTop: `1px solid ${currentStyle.dividerColor}`,
                        textAlign: 'center'
                    }}>
                        <Typography
                            variant="body2"
                            sx={{
                                color: currentTheme === 'dark' ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.6)',
                                fontFamily: 'var(--main-font)'
                            }}
                        >
                            Выберите лабораторную работу
                        </Typography>
                    </Box>
                </Box>
            </Drawer>
        </>
    );
}

export default Menu;