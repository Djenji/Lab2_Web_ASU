import '../../App.css';

function FeedbackList({ feedbacks, onDelete }) {
    return (
        <div className="feedback-list-container">
            <h3>Отзывы</h3>
            {feedbacks.length === 0 ? (
                <p className="no-feedbacks-message">Пока нет отзывов</p>
            ) : (
                feedbacks.map((feedback) => (
                    <div key={feedback.id} className="feedback-item">
                        <div className="feedback-header">
                            <strong>{feedback.name}</strong>
                            <span>{feedback.date}</span>
                        </div>
                        <div className="feedback-message">{feedback.message}</div>
                        <div className="feedback-footer">
                            <span>Оценка:</span>
                            <span className="rating-stars">
                                {"★".repeat(Number(feedback.rating))}
                                {"☆".repeat(5 - Number(feedback.rating))}
                            </span>
                            <button 
                                onClick={() => onDelete(feedback.id)}
                                className="delete-button"
                            >
                                удалить
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default FeedbackList;