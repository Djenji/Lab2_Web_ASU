import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Home from './Home'; // Создайте этот компонент для главной страницы
import About from './About'; // Создайте этот компонент для страницы "О нас"
import Contact from './Contact'; // Создайте этот компонент для страницы "Контакты"
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App"> {/* Оберните все в контейнер .App */}
                <Header />
                <main>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
};

export default App;