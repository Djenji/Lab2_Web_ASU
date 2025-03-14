import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="menu-container">
            <div className="menu-icon" onClick={toggleMenu}>
                &#9776; {}
            </div>
            {isOpen && (
                <nav className="dropdown-menu">
                    <ul>
                        <li><Link to="/lab1" onClick={toggleMenu}>Лабораторная работа №1</Link></li>
                        <li><Link to="/lab2" onClick={toggleMenu}>Лабораторная работа №2</Link></li>
                        <li><Link to="/lab3" onClick={toggleMenu}>Лабораторная работа №3</Link></li>
                        <li><Link to="/lab4" onClick={toggleMenu}>Лабораторная работа №4</Link></li>
                        <li><Link to="/lab5" onClick={toggleMenu}>Лабораторная работа №5</Link></li>
                        <li><Link to="/lab6" onClick={toggleMenu}>Лабораторная работа №6</Link></li>
                        <li><Link to="/lab7" onClick={toggleMenu}>Лабораторная работа №7</Link></li>
                        <li><Link to="/lab8" onClick={toggleMenu}>Лабораторная работа №8</Link></li>
                        <li><Link to="/lab9" onClick={toggleMenu}>Лабораторная работа №9</Link></li>
                    </ul>
                </nav>
            )}
        </div>
    );
};

export default Menu;