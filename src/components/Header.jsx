import React, { useContext } from "react";
import { AppBar, Toolbar } from '@mui/material';
import Menu from './Menu'; 
import ThemeToggleButton from './ThemeToggleButton'; 
import { ThemeContext } from '../ThemeContext'; 
import { Link } from 'react-router-dom';
import '../App.css';

function Header() {
    const { toggleTheme } = useContext(ThemeContext); 

    return (
    <AppBar position="fixed">
        <Toolbar>
        <nav className="header-nav">
            <ul>
            <li><Link to="/">Главная</Link></li>
            </ul>
        </nav>
        <div className="header-spacer" />
        <Menu />
        <ThemeToggleButton onClick={toggleTheme} />
        </Toolbar>
    </AppBar>
    );
}

export default Header;