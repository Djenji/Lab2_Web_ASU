import React from 'react';
import './App.css'; // Импортируем стили

const Container = ({ children }) => {
    return (
        <div className="container">
            {children}
        </div>
    );
};

export default Container;