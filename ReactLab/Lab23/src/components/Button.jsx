import PropTypes from "prop-types";

function Button({ onClick, children }) {
    return (
        <button className="btn btn-primary" onClick={onClick}>
            {children}
        </button>
    );
}

Button.propTypes = {
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

Button.defaultProps = {
    onClick: () => {}, // Значение по умолчанию для onClick
};

export default Button;
