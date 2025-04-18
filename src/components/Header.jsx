import React, { useContext } from "react";
import { AppBar, Toolbar, Box } from '@mui/material';
import Menu from './Menu';
import ThemeToggleButton from './ThemeToggleButton';
import { ThemeContext } from '../ThemeContext';
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile';
import '../App.css';

function Header({ userData, onLogout }) {
    const { toggleTheme } = useContext(ThemeContext);

    return (
        <AppBar position="fixed" className="header">
            <Toolbar>
                <nav className="header-nav">
                    <ul>
                        <li>
                            <Link to="/" className="header-link" style={{ 
                                fontSize: '1.4rem',
                                fontWeight: '700',
                                letterSpacing: '1px',
                                marginRight: '20px'
                            }}>
                                Главная
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="header-spacer" />
                <Box sx={{ 
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    paddingRight: '8px'
                }}>
                    <ThemeToggleButton onClick={toggleTheme} />
                    <Menu />
                    {userData && (
                        <UserProfile userData={userData} onLogout={onLogout} />
                    )}
                </Box>
            </Toolbar>
        </AppBar>
    );
}

export default Header;