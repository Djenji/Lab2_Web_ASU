import React from 'react';
import '../App.css';

const Button = ({ onClick, children }) => {
    return (
        <button onClick={onClick}>
            {'кнопка'}
            {children}
        </button>
    );
};

export default Button;