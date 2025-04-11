import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "../../App.css";

function FeedbackForm({ onSubmit }) {
    const [rating, setRating] = useState(0);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    const handleFormSubmit = (data) => {
        onSubmit({
            ...data,
            id: Date.now(),
            date: new Date().toLocaleDateString(),
        });
        reset();
        setRating(0);
    };

    return (
        <div className="feedback-form-container">
            <h3>Оставить отзыв</h3>
            <form onSubmit={handleSubmit(handleFormSubmit)}>
                <div className="form-field">
                    <input
                        {...register("name", {
                            required: "Имя обязательно",
                            minLength: {
                                value: 2,
                                message:
                                    "Имя должно содержать минимум 2 символа",
                            },
                        })}
                        placeholder="Ваше имя"
                        className="form-input"
                    />
                    {errors.name && (
                        <span className="error-message">
                            {errors.name.message}
                        </span>
                    )}
                </div>

                <div className="form-field">
                    <textarea
                        {...register("message", {
                            required: "Сообщение обязательно",
                            minLength: {
                                value: 10,
                                message:
                                    "Сообщение должно содержать минимум 10 символов",
                            },
                        })}
                        placeholder="Ваш отзыв"
                        className="form-textarea"
                    />
                    {errors.message && (
                        <span className="error-message">
                            {errors.message.message}
                        </span>
                    )}
                </div>

                <div className="form-field">
                    <label>Оценка:</label>
                    <div className="wb-rating-stars">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <React.Fragment key={star}>
                                <input
                                    type="radio"
                                    id={`star-${star}`}
                                    {...register("rating", {
                                        required: "Выберите оценку",
                                    })}
                                    value={star}
                                    className="wb-rating-input"
                                />
                                <label
                                    htmlFor={`star-${star}`}
                                    className="wb-rating-star"
                                    onClick={() => setRating(star)}
                                >
                                    {star <= rating ? "★" : "☆"}
                                </label>
                            </React.Fragment>
                        ))}
                    </div>
                    {errors.rating && (
                        <span className="error-message">
                            {errors.rating.message}
                        </span>
                    )}
                </div>

                <button type="submit" className="submit-button">
                    Отправить отзыв
                </button>
            </form>
        </div>
    );
}

export default FeedbackForm;
