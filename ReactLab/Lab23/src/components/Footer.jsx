import { useState, useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { useGetFeedbacksQuery } from "./adminApi";
import { useSelector } from "react-redux";
import TestModeController from "./TestModeController";
import "./Footer.css";
import FeedbackList from "./FeedbackList";

const RainbowSpinner = () => (
    <div className="text-center my-5 py-4">
        <div
            className="spinner-border"
            style={{
                width: "3rem",
                height: "3rem",
                border: "0.25em solid transparent",
                borderTopColor: "#ff0000",
                borderRightColor: "#00ff00",
                borderBottomColor: "#0000ff",
                borderLeftColor: "#ff00ff",
                animation:
                    "spinner-border 0.75s linear infinite, rainbow 2s linear infinite",
            }}
            role="status"
        >
            <span className="visually-hidden">Загрузка...</span>
        </div>
        <h5 className="mt-3">Загружаем отзывы...</h5>
    </div>
);

const Footer = () => {
    const [testMode, setTestMode] = useState({
        active: false,
        isLoading: false,
        isError: false,
        isEmpty: false,
    });
    const [showFeedbacks, setShowFeedbacks] = useState(false); // Новое состояние для отображения отзывов
    const { isDarkTheme } = useContext(ThemeContext);

    const { isLoggedIn, isAdmin } = useSelector((state) => state.auth);

    const {
        data: feedbacks,
        isLoading: isFeedbacksLoading,
        isFetching: isFeedbacksFetching,
        isError: isFeedbacksError,
        error: feedbacksError,
        refetch: refetchFeedbacks,
    } = useGetFeedbacksQuery(undefined, {
        skip: !isLoggedIn || !showFeedbacks, // Запрашиваем отзывы только когда showFeedbacks=true
    });

    const testFeedbacks = [
        {
            id: 1,
            name: "Тестовый пользователь 1",
            feedback:
                "Это тестовый отзыв для демонстрации работы интерфейса. Отзывы помогают улучшить качество сервиса.",
            date: new Date().toISOString(),
        },
        {
            id: 2,
            name: "Тестовый пользователь 2",
            feedback:
                "Еще один пример отзыва, который показывает как будет выглядеть контент в этой секции.",
            date: new Date().toISOString(),
        },
        {
            id: 3,
            name: "Тестовый пользователь 3",
            feedback:
                "Пользовательские отзывы важны для развития проекта и помогают другим пользователям.",
            date: new Date().toISOString(),
        },
    ];

    const handleRetry = () => {
        refetchFeedbacks();
    };

    const toggleFeedbacks = () => {
        setShowFeedbacks(!showFeedbacks);
    };

    const getState = () => {
        if (!testMode.active) {
            return {
                isLoading: isFeedbacksLoading,
                isFetching: isFeedbacksFetching,
                isError: isFeedbacksError,
                error: feedbacksError,
                feedbacks,
            };
        }

        return {
            isLoading: testMode.isLoading,
            isFetching: false,
            isError: testMode.isError,
            error: { message: "Тестовая ошибка загрузки отзывов" },
            feedbacks: testMode.isEmpty ? [] : [...testFeedbacks],
        };
    };

    const {
        isLoading,
        isFetching,
        isError,
        error,
        feedbacks: displayFeedbacks = [],
    } = getState();

    if (!isLoggedIn) {
        return null;
    }

    return (
        <footer
            className={`py-5 ${
                isDarkTheme ? "bg-dark text-light" : "bg-light text-dark"
            }`}
        >
            <div className="container">
                <div className="feedback-section">
                    <div className="text-center mb-5">
                        <h2 className="display-6 fw-bold mb-3">
                            <i className="bi bi-chat-square-quote me-2"></i>
                            Отзывы пользователей
                        </h2>
                        <button
                            onClick={toggleFeedbacks}
                            className={`btn ${
                                isDarkTheme
                                    ? "btn-outline-light"
                                    : "btn-outline-primary"
                            }`}
                        >
                            {showFeedbacks
                                ? "Скрыть отзывы"
                                : "Показать отзывы"}
                        </button>
                    </div>

                    {import.meta.env.DEV && isAdmin && (
                        <div className="mb-4">
                            <TestModeController
                                testMode={testMode}
                                onTestModeChange={setTestMode}
                            />
                        </div>
                    )}

                    {/* Отображаем контент только если showFeedbacks=true */}
                    {showFeedbacks && (
                        <>
                            {/* Индикатор загрузки */}
                            {isLoading && <RainbowSpinner />}

                            {/* Сообщение об ошибке */}
                            {isError && (
                                <div
                                    className={`alert ${
                                        isDarkTheme
                                            ? "alert-warning"
                                            : "alert-danger"
                                    } alert-dismissible fade show d-flex align-items-center mb-5`}
                                >
                                    <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
                                    <div className="flex-grow-1">
                                        <h5 className="alert-heading mb-1">
                                            Ошибка загрузки
                                        </h5>
                                        <p className="mb-0">
                                            {error?.message ||
                                                "Неизвестная ошибка"}
                                        </p>
                                    </div>
                                    <button
                                        className={`btn ${
                                            isDarkTheme
                                                ? "btn-outline-light"
                                                : "btn-outline-danger"
                                        } ms-3`}
                                        onClick={handleRetry}
                                    >
                                        <i className="bi bi-arrow-clockwise me-1"></i>
                                        Повторить
                                    </button>
                                </div>
                            )}
                            {/* Отображение отзывов */}
                            {!isLoading && !isError && (
                                <FeedbackList
                                    feedbacks={displayFeedbacks}
                                    isDarkTheme={isDarkTheme}
                                />
                            )}

                            {/* Индикатор фонового обновления */}
                            {isFetching && !isLoading && (
                                <div className="text-center mt-4">
                                    <div
                                        className="spinner-border spinner-border-sm text-primary"
                                        role="status"
                                    >
                                        <span className="visually-hidden">
                                            Обновление...
                                        </span>
                                    </div>
                                    <small className="ms-2">
                                        Обновление отзывов...
                                    </small>
                                </div>
                            )}
                        </>
                    )}
                </div>

                <div
                    className={`mt-5 pt-4 text-center ${
                        isDarkTheme
                            ? "border-top border-secondary"
                            : "border-top"
                    }`}
                >
                    <p
                        className={`mb-0 ${
                            isDarkTheme ? "text-light opacity-75" : "text-muted"
                        }`}
                    >
                        © {new Date().getFullYear()} butkeeva.42012
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
