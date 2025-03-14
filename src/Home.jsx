import React from 'react';
import Button from './Button';
import Container from './Container';
import './App.css';

const Home = () => {
    const handleClick = () => {
        alert("Кнопка нажата!");
    };

    return (
        <Container>
            <h2>Hello World!</h2>
            <Button onClick={handleClick} label="Кнопочка" />
        </Container>
    );
};

export default Home;