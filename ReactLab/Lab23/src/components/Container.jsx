import PropTypes from "prop-types";
import "./css/Container.css";

function Container({ children }) {
    return <div className="container">{children}</div>;
}

Container.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Container;
