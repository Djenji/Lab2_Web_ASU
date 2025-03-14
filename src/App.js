import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Content from './Content';
import Home from './Home';
import Lab1 from './StrLab1';
import Lab2 from './StrLab2';
import Lab3 from './StrLab3';
import Lab4 from './StrLab4';
import Lab5 from './StrLab5';
import Lab6 from './StrLab6';
import Lab7 from './StrLab7';
import Lab8 from './StrLab8';
import Lab9 from './StrLab9';
import './App.css';

const App = () => {
    return (
        <Router>
            <div className="App">
                <Header />
                <Content>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/lab1" element={<Lab1 />} />
                        <Route path="/lab2" element={<Lab2 />} />
                        <Route path="/lab3" element={<Lab3 />} />
                        <Route path="/lab4" element={<Lab4 />} />
                        <Route path="/lab5" element={<Lab5 />} />
                        <Route path="/lab6" element={<Lab6 />} />
                        <Route path="/lab7" element={<Lab7 />} />
                        <Route path="/lab8" element={<Lab8 />} />
                        <Route path="/lab9" element={<Lab9 />} />
                    </Routes>
                </Content>
                <Footer />
            </div>
        </Router>
    );
};

export default App;