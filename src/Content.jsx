import React from 'react';
import './App.css';

const Content = ({ children }) => {
    return (
        <main>
            <div className="container">
                {children}
            </div>
        </main>
    );
};

export default Content;