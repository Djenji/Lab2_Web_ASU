import React from 'react';
import '../App.css';

function Container({ children }) {
    return (
        <section>
            <div>
                {children}
            </div>
        </section>
    );
}

export default Container;