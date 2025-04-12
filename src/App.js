import React, { useState } from "react";
import { ThemeProvider } from "./ThemeContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import { pages } from "./components/const";
import store from "./redux/store";
import { Provider } from "react-redux";
import { useLoginState } from "./hooks/useLoginState";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import "./App.css";

const muiTheme = createTheme({
    palette: {
        primary: { main: "#5f4b8b" },
        secondary: { main: "#7d6ba0" },
    },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
});

function App() {
    const { isLoggedIn, userData, login, logout, register } = useLoginState();
    const [showRegister, setShowRegister] = useState(false);

    return (
        <BrowserRouter>
            <Provider store={store}>
                <MuiThemeProvider theme={muiTheme}>
                    <ThemeProvider>
                        <div className="App">
                            {/* Оставляем только один Header с пропсами */}
                            <Header
                                isLoggedIn={isLoggedIn}
                                userData={userData}
                                onLogout={logout}
                            />
                            <main>
                                <Routes>
                                    {/* Главная страница */}
                                    <Route
                                        path="/"
                                        element={
                                            isLoggedIn ? (
                                                <>
                                                    <Counter />
                                                    <Content content={null} />
                                                </>
                                            ) : (
                                                <Navigate to="/auth" replace />
                                            )
                                        }
                                    />

                                    {/* Страница аутентификации */}
                                    <Route
                                        path="/auth"
                                        element={
                                            !isLoggedIn ? (
                                                showRegister ? (
                                                    <RegisterForm
                                                        onRegister={register} // Используем метод register из useLoginState
                                                        onSwitchToLogin={() =>
                                                            setShowRegister(
                                                                false
                                                            )
                                                        }
                                                    />
                                                ) : (
                                                    <LoginForm
                                                        onLogin={login} // Используем метод login из useLoginState
                                                        onSwitchToRegister={() =>
                                                            setShowRegister(
                                                                true
                                                            )
                                                        }
                                                    />
                                                )
                                            ) : (
                                                <Navigate to="/" replace />
                                            )
                                        }
                                    />

                                    {/* Защищенные маршруты */}
                                    {pages.map((page) => (
                                        <Route
                                            key={page.path}
                                            path={`/${page.path}`}
                                            element={
                                                isLoggedIn ? (
                                                    <Content
                                                        content={page.element}
                                                    />
                                                ) : (
                                                    <Navigate
                                                        to="/auth"
                                                        replace
                                                    />
                                                )
                                            }
                                        />
                                    ))}

                                    {/* Перенаправление для всех остальных путей */}
                                    <Route
                                        path="*"
                                        element={
                                            <Navigate
                                                to={isLoggedIn ? "/" : "/auth"}
                                                replace
                                            />
                                        }
                                    />
                                </Routes>
                            </main>

                            <Footer />
                        </div>
                    </ThemeProvider>
                </MuiThemeProvider>
            </Provider>
        </BrowserRouter>
    );
}

const Counter = () => {
    const [count, setCount] = useState(0);

    const increment = () => {
        setCount((prevCount) => prevCount + 1);
    };

    const decrement = () => {
        setCount((prevCount) => prevCount - 1);
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
