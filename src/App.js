import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import {
    createTheme,
    ThemeProvider as MuiThemeProvider,
} from "@mui/material/styles";
import { Provider } from "react-redux";
import store from "./redux/store";
import { useLoginState } from "./hooks/useLoginState";
import { ThemeProvider } from "./ThemeContext";
import { pages } from "./components/const";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Content from "./components/Content";
import LoginForm from "./components/auth/LoginForm";
import RegisterForm from "./components/auth/RegisterForm";
import EditProfilePage from "./components/EditProfilePage";
import "./App.css";

// Конфигурация темы MUI
const muiTheme = createTheme({
    palette: {
        primary: { main: "#5f4b8b" },
        secondary: { main: "#7d6ba0" },
    },
    breakpoints: {
        values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
    },
});

// Компонент счетчика
const Counter = () => {
    const [count, setCount] = useState(0);

    return (
        <div className="counter-container">
            <h2>Счетчик: {count}</h2>
            <div className="counter-buttons-container">
                <button
                    className="counter-button"
                    onClick={() => setCount((c) => c - 1)}
                >
                    Уменьшить
                </button>
                <button
                    className="counter-button"
                    onClick={() => setCount((c) => c + 1)}
                >
                    Увеличить
                </button>
            </div>
        </div>
    );
};

// Главный компонент приложения
function App() {
    const { isLoggedIn, userData, login, logout, register } = useLoginState();
    const [showRegister, setShowRegister] = useState(false);

    const renderAuthPage = () => {
        if (showRegister) {
            return (
                <RegisterForm
                    onRegister={register}
                    onSwitchToLogin={() => setShowRegister(false)}
                />
            );
        }
        return (
            <LoginForm
                onLogin={login}
                onSwitchToRegister={() => setShowRegister(true)}
            />
        );
    };

    const renderProtectedRoute = (element) => {
        return isLoggedIn ? element : <Navigate to="/auth" replace />;
    };

    return (
        <BrowserRouter>
            <Provider store={store}>
                <MuiThemeProvider theme={muiTheme}>
                    <ThemeProvider>
                        <div className="App">
                            <Header
                                isLoggedIn={isLoggedIn}
                                userData={userData}
                                onLogout={logout}
                            />

                            <main>
                                <Routes>
                                    <Route
                                        path="/"
                                        element={renderProtectedRoute(
                                            <>
                                                <Counter />
                                                <Content content={null} />
                                            </>
                                        )}
                                    />

                                    <Route
                                        path="/auth"
                                        element={
                                            !isLoggedIn ? (
                                                renderAuthPage()
                                            ) : (
                                                <Navigate to="/" replace />
                                            )
                                        }
                                    />

                                    {pages.map((page) => (
                                        <Route
                                            key={page.path}
                                            path={`/${page.path}`}
                                            element={renderProtectedRoute(
                                                <Content
                                                    content={page.element}
                                                />
                                            )}
                                        />
                                    ))}

                                    <Route
                                        path="*"
                                        element={
                                            <Navigate
                                                to={isLoggedIn ? "/" : "/auth"}
                                                replace
                                            />
                                        }
                                    />

                                    <Route
                                        path="/profile/edit/:userId"
                                        element={
                                            isLoggedIn ? (
                                                <EditProfilePage />
                                            ) : (
                                                <Navigate to="/auth" replace />
                                            )
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

export default App;
