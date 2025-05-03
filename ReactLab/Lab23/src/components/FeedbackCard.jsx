import PropTypes from "prop-types";
import React from "react";

const FeedbackCard = ({ feedback, isDarkTheme }) => (
    <div className="col-lg-4 col-md-6 mb-4">
        <div
            className={`card h-100 border-0 shadow-sm ${
                isDarkTheme ? "bg-dark text-light" : "bg-white"
            }`}
        >
            <div className="card-body d-flex flex-column">
                <div className="d-flex align-items-center mb-3">
                    <div
                        className={`rounded-circle d-flex align-items-center justify-content-center ${
                            isDarkTheme ? "bg-secondary" : "bg-light"
                        }`}
                        style={{ width: "40px", height: "40px" }}
                    >
                        <i className="bi bi-person-fill"></i>
                    </div>
                    <h5 className="card-title ms-3 mb-0">{feedback.name}</h5>
                </div>
                <p className="card-text flex-grow-1">{feedback.feedback}</p>
                <small
                    className={`text-end ${
                        isDarkTheme ? "text-light opacity-75" : "text-muted"
                    }`}
                >
                    <i className="bi bi-clock me-1"></i>
                    {new Date(feedback.date).toLocaleString()}
                </small>
            </div>
        </div>
    </div>
);

FeedbackCard.propTypes = {
    feedback: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
            .isRequired,
        name: PropTypes.string.isRequired,
        feedback: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
    }).isRequired,
    isDarkTheme: PropTypes.bool.isRequired,
};

export default FeedbackCard;
