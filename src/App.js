import React, { useState } from 'react';
import { ThemeProvider } from './ThemeContext';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Content from './components/Content';
import { pages } from './components/const';
import store from './redux/store';
import { Provider } from 'react-redux';
import './App.css';

function App() {
return (
    <BrowserRouter>
    <Provider store={store}>
        <ThemeProvider>
        <div className='App'>
            <Header />
            <main>
            <Routes>
                {/* Главная страница со счётчиком */}
                <Route 
                path="/" 
                element={
                    <>
                    <Counter />
                    <Content content={null} />
                    </>
                } 
                />
                
                {/* Страницы лабораторных работ */}
                {pages.map((page) => (
                <Route 
                    key={page.path} 
                    path={`/${page.path}`} 
                    element={<Content content={page.element} />} 
                />
                ))}
            </Routes>
            </main>
            <Footer />
        </div>
        </ThemeProvider>
    </Provider>
    </BrowserRouter>
);
}

const Counter = () => {
const [count, setCount] = useState(0);

const increment = () => {
    setCount(prevCount => prevCount + 1);
};

const decrement = () => {
    setCount(prevCount => prevCount - 1);
};

return (
    <div className="counter-container">
    <h2>Счетчик: {count}</h2>
    <div className="counter-buttons-container">
        <button className="counter-button" onClick={decrement}>
        Уменьшить
        </button>
        <button className="counter-button" onClick={increment}>
        Увеличить
        </button>
    </div>
    </div>
);
};

export default App;