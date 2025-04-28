import { useState, useEffect } from "react";
import { updateProfile } from "../redux/authSlice";
import { api } from "../api";

export const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    useEffect(() => {
        const loadData = () => {
            try {
                const savedUser = localStorage.getItem("userData");
                const savedRegistered = localStorage.getItem("registeredUsers");

                if (savedUser) {
                    const parsedUser = JSON.parse(savedUser);
                    setUserData(parsedUser);
                    setIsLoggedIn(true);

                    if (window.__REDUX_STORE__) {
                        window.__REDUX_STORE__.dispatch(
                            updateProfile(parsedUser)
                        );
                    }
                }

                if (savedRegistered) {
                    setRegisteredUsers(JSON.parse(savedRegistered));
                }
            } catch (error) {
                console.error("Ошибка загрузки данных:", error);
            }
        };

        loadData();
    }, []);

    const register = async (userData) => {
        try {
            // Отправляем данные на сервер для регистрации
            const response = await api.post("/api/register", userData);
            const newUser = response.data.user; // Сервер вернёт ID
            login(newUser); // Автоматический вход
        } catch (error) {
            throw error;
        }
    };

    const login = (credentials) => {
        const user = registeredUsers.find((u) => u.email === credentials.email);

        if (!user) throw new Error("Пользователь не найден");
        if (user.password !== credentials.password)
            throw new Error("Неверный пароль");

        const userData = {
            id: user.id,
            email: user.email,
            name: user.name,
            lastLogin: Date.now(),
        };

        setIsLoggedIn(true);
        setUserData(userData);
        localStorage.setItem("userData", JSON.stringify(userData));

        if (window.__REDUX_STORE__) {
            window.__REDUX_STORE__.dispatch(updateProfile(userData));
        }

        return userData;
    };

    const updateUser = (updatedData) => {
        if (!userData) return null;

        const newData = {
            ...userData,
            ...updatedData,
            updatedAt: Date.now(),
        };

        setUserData(newData);
        localStorage.setItem("userData", JSON.stringify(newData));

        if (window.__REDUX_STORE__) {
            window.__REDUX_STORE__.dispatch(
                updateProfile({
                    ...updatedData,
                    username: updatedData.name,
                })
            );
        }

        const updatedRegisteredUsers = registeredUsers.map((u) =>
            u.id === newData.id ? { ...u, ...updatedData } : u
        );
        setRegisteredUsers(updatedRegisteredUsers);
        localStorage.setItem(
            "registeredUsers",
            JSON.stringify(updatedRegisteredUsers)
        );

        return newData;
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem("userData");

        if (window.__REDUX_STORE__) {
            window.__REDUX_STORE__.dispatch({ type: "auth/logout" });
        }
    };

    return {
        isLoggedIn,
        userData,
        registeredUsers,
        register,
        login,
        logout,
        updateUser,
    };
};
