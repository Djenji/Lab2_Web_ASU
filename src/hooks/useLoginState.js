// src/hooks/useLoginState.js
import { useState, useEffect } from "react";

export const useLoginState = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
    const [registeredUsers, setRegisteredUsers] = useState([]);

    useEffect(() => {
        const savedUser = localStorage.getItem('userData');
        const savedRegistered = localStorage.getItem('registeredUsers');
        
        if (savedUser) {
            setIsLoggedIn(true);
            setUserData(JSON.parse(savedUser));
        }
        
        if (savedRegistered) {
            setRegisteredUsers(JSON.parse(savedRegistered));
        }
    }, []);

    const register = (userData) => {
        const newUser = {
            email: userData.email,
            name: userData.name || userData.email.split("@")[0] || "Пользователь",
            password: userData.password // Сохраняем пароль
        };
        
        const newRegisteredUsers = [...registeredUsers, newUser];
        setRegisteredUsers(newRegisteredUsers);
        localStorage.setItem('registeredUsers', JSON.stringify(newRegisteredUsers));
        
        // Автоматический вход после регистрации
        login(newUser);
    };

    const login = (credentials) => {
        const user = registeredUsers.find(u => u.email === credentials.email);
        
        if (!user) {
            throw new Error("Пожалуйста, сначала зарегистрируйтесь");
        }
        
        // Проверяем пароль
        if (user.password !== credentials.password) {
            throw new Error("Пароль неверный");
        }
        
        setIsLoggedIn(true);
        setUserData({
            email: user.email,
            name: user.name
        });
        localStorage.setItem('userData', JSON.stringify({
            email: user.email,
            name: user.name
        }));
    };

    const logout = () => {
        setIsLoggedIn(false);
        setUserData(null);
        localStorage.removeItem('userData');
    };

    return { isLoggedIn, userData, register, login, logout };
};