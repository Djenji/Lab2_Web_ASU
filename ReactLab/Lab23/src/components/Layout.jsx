import PropTypes from 'prop-types';
import { useContext } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Content from "./Content";
import { ThemeContext } from "./ThemeContext";
import "./css/Layout.css";

function Layout({ children, isLoggedIn, logout, userName }) {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <div
            className={`layout ${
                isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"
            }`}
        >
            <Header
                isLoggedIn={isLoggedIn}
                logout={logout}
                userName={userName}
            />
            <Content>{children}</Content>
            <Footer isLoggedIn={isLoggedIn} />
        </div>
    );
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
    userName: PropTypes.string,
};

export default Layout;