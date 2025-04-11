import React, { useState, useRef, useEffect, useContext } from "react";
import { ThemeContext } from "../ThemeContext";
import "../App.css";

function UserProfile({ userData, onLogout }) {
    const { theme } = useContext(ThemeContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);

    // Закрытие меню при клике вне его
    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className={`user-profile ${theme}`} ref={menuRef}>
            <div
                className="profile-icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                style={{
                    backgroundColor: theme === "dark" ? "#7d6ba0" : "#5f4b8b",
                }}
            >
                {userData?.name?.charAt(0)?.toUpperCase() || "U"}
            </div>

            {isMenuOpen && (
                <div className={`profile-menu ${theme}`}>
                    <div className="profile-info">
                        <span className="profile-name">
                            {userData?.name || "Пользователь"}
                        </span>
                        <span className="profile-email">
                            {userData?.email || ""}
                        </span>
                    </div>
                    <button
                        className="logout-button"
                        onClick={() => {
                            onLogout();
                            setIsMenuOpen(false);
                        }}
                        style={{
                            backgroundColor:
                                theme === "dark" ? "#ff6666" : "#ff4444",
                        }}
                    >
                        Выйти
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserProfile;
