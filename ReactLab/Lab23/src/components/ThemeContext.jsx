import PropTypes from "prop-types";
import { createContext, useState } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    const theme = {
        isDarkTheme,
        toggleTheme: () => setIsDarkTheme(!isDarkTheme),
        colors: isDarkTheme ? {
            // Темная тема
            primary: '#7E57C2',
            primaryLight: '#9575CD',
            primaryDark: '#5E35B1',
            background: '#121212',
            surface: '#1E1E1E',
            text: '#E1E1E1',
            textSecondary: '#B0B0B0',
            accent: '#B388FF',
            error: '#CF6679',
            divider: 'rgba(255, 255, 255, 0.12)'
        } : {
            // Светлая тема
            primary: '#673AB7',
            primaryLight: '#9575CD',
            primaryDark: '#5E35B1',
            background: '#F5F3FF',
            surface: '#FFFFFF',
            text: '#333333',
            textSecondary: '#666666',
            accent: '#7C4DFF',
            error: '#D32F2F',
            divider: 'rgba(0, 0, 0, 0.08)'
        }
    };

    return (
        <ThemeContext.Provider value={theme}>
            {children}
        </ThemeContext.Provider>
    );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired,
};