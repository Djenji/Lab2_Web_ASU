import React, { useState } from "react";
import { Drawer, Box, Typography, Button, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';
import { pages } from './const';
import '../App.css';

function Menu() {
    const [isOpen, setIsOpen] = useState(false); 

    const toggleDrawer = (open) => () => {
        setIsOpen(open); 
    };

    return (
        <div>
            <Button onClick={toggleDrawer(true)} color="inherit">Меню</Button>
            <Drawer
                anchor="top"
                open={isOpen}
                onClose={toggleDrawer(false)}
                className="menu-drawer"
            >
                <Box className="menu-drawer-container">
                    <Typography variant="h6" component="div" className="menu-title">
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
                                <ListItemText primary={page.linktitle} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Drawer>
        </div>
    );
}

export default Menu;