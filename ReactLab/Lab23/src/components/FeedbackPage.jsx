import { useContext } from "react";
import { useSelector } from "react-redux";
import { ThemeContext } from "./ThemeContext"; 

const FeedbackPage = () => {
    const feedbacks = useSelector((state) => state.feedback.items);
    const { isDarkTheme } = useContext(ThemeContext);

    return (
        <div
            className={`container my-4 ${
                isDarkTheme ? "text-light" : "text-dark"
            }`}
        >
            <h2>Все отзывы</h2>
            <div className="feedback-list">
                {feedbacks.length > 0 ? (
                    feedbacks.map((fb) => (
                        <div
                            key={fb.id}
                            className={`card mb-3 ${
                                isDarkTheme ? "bg-secondary" : ""
                            }`}
                        >
                            <div className="card-body">
                                <h5 className="card-title">{fb.name}</h5>
                                <p className="card-text">{fb.feedback}</p>
                                <small className="text-muted">
                                    {new Date(fb.date).toLocaleString()}
                                </small>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Пока нет отзывов</p>
                )}
            </div>
        </div>
    );
};

export default FeedbackPage;