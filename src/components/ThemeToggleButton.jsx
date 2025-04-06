import React, { useContext } from 'react';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import IconButton from '@mui/material/IconButton';
import { ThemeContext } from '../ThemeContext';

const ThemeToggleButton = () => {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <IconButton onClick={toggleTheme} color="inherit">
            <Brightness4Icon />
        </IconButton>
    );
};

export default ThemeToggleButton;