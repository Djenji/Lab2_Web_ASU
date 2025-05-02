import PropTypes from "prop-types";
import { useContext } from "react";
import Container from "./Container";
import { ThemeContext } from "./ThemeContext";

function Content({ children }) {
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <div
            className={`content ${
                isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"
            }`}
        >
            <Container>{children}</Container>
        </div>
    );
}

// Добавляем валидацию пропсов
Content.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Content;
