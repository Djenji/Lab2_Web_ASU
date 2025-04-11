import React, { useContext } from "react";
import { AppBar, Toolbar } from '@mui/material';
import Menu from './Menu'; 
import ThemeToggleButton from './ThemeToggleButton'; 
import { ThemeContext } from '../ThemeContext'; 
import { Link } from 'react-router-dom';
import UserProfile from './UserProfile'; // Добавляем импорт UserProfile
import '../App.css';

function Header({ userData, onLogout }) { // Добавляем props для UserProfile
    const { toggleTheme } = useContext(ThemeContext); 

    return (
        <AppBar position="fixed" className="header">
            <Toolbar>
                <nav className="header-nav">
                    <ul>
                        <li>
                            <Link to="/" className="header-link">
                                Главная
                            </Link>
                        </li>
                    </ul>
                </nav>
                <div className="header-spacer" />
                <Menu />
                <ThemeToggleButton onClick={toggleTheme} />
                {/* Добавляем UserProfile с передачей пропсов */}
                {userData && (
                    <UserProfile userData={userData} onLogout={onLogout} />
                )}
            </Toolbar>
        </AppBar>
    );
}

export default Header;