import React from 'react';
import './App.css';

const Header = () => {
    return (
        <header>
            <h1>Название</h1>
            <nav>
                <ul>
                    <li><a href="/">Главная</a></li>
                    <li><a href="/about">О нас</a></li>
                    <li><a href="/contact">Контакты</a></li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;