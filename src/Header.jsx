import React from 'react';
import Menu from './Menu';
import { Link } from 'react-router-dom';
import './App.css';

const Header = () => {
    return (
        <header>
            <h1>
                <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Название
                </Link>
            </h1>
            <Menu />
        </header>
    );
};

export default Header;