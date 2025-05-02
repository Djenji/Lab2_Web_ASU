import "./Header.css";
import PropTypes from "prop-types";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";
import { useDispatch, useSelector } from "react-redux";
import { postFeedback } from "../redux/slices/feedbackSlice";
import FeedbackModal from "./FeedbackModal";
import { FiMoon, FiSun, FiMessageSquare, FiUser, FiLogOut, FiEdit3, FiLayers, FiShield, FiHome } from "react-icons/fi";

function Header({ isLoggedIn, logout }) {
    const { isDarkTheme, toggleTheme, colors } = useContext(ThemeContext);
    const [showFeedbackModal, setShowFeedbackModal] = useState(false);
    const { userName, isAdmin } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const onSubmitFeedback = async (data) => {
        try {
            await dispatch(
                postFeedback({
                    ...data,
                    date: new Date().toISOString(),
                })
            );
            setShowFeedbackModal(false);
        } catch (error) {
            console.error("Ошибка при отправке отзыва:", error);
        }
    };

    return (
        <header 
            className="sticky-top"
            style={{
                backgroundColor: colors.surface
            }}
        >
            <div className="container">
                <nav className="navbar navbar-expand-lg py-1 px-0">
                    <div className="container-fluid">
                        {/* Логотип с иконкой дома */}
                        <Link 
                            to="/" 
                            className="navbar-brand p-0 me-4 d-flex align-items-center"
                            style={{ 
                                color: colors.primary,
                                transition: 'all 0.3s ease'
                            }}
                        >
                            <FiHome 
                                size={22} 
                                className="me-2" 
                                style={{ 
                                    strokeWidth: '2.5px',
                                    minWidth: '22px'
                                }} 
                            />
                            <span 
                                className="fw-bold fs-5 position-relative"
                                style={{
                                    letterSpacing: '0.5px',
                                    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                                }}
                            >
                                <span 
                                    className="position-absolute"
                                    style={{
                                        content: '""',
                                        bottom: '-2px',
                                        left: 0,
                                        width: '100%',
                                        height: '2px',
                                        background: colors.primary,
                                        transform: 'scaleX(0)',
                                        transformOrigin: 'right',
                                        transition: 'transform 0.3s ease'
                                    }}
                                ></span>
                                Главная
                            </span>
                        </Link>

                        {/* Мобильное меню */}
                        <button
                            className="navbar-toggler border-0 p-2"
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#navbarContent"
                            aria-label="Toggle navigation"
                            style={{ color: colors.text }}
                        >
                            <div className="d-flex flex-column gap-1">
                                <span 
                                    className="d-block"
                                    style={{
                                        width: '22px',
                                        height: '2px',
                                        background: colors.text,
                                        transition: 'all 0.3s ease'
                                    }}
                                ></span>
                                <span 
                                    className="d-block"
                                    style={{
                                        width: '22px',
                                        height: '2px',
                                        background: colors.text,
                                        transition: 'all 0.3s ease'
                                    }}
                                ></span>
                                <span 
                                    className="d-block"
                                    style={{
                                        width: '22px',
                                        height: '2px',
                                        background: colors.text,
                                        transition: 'all 0.3s ease'
                                    }}
                                ></span>
                            </div>
                        </button>

                        {/* Основное содержимое */}
                        <div className="collapse navbar-collapse" id="navbarContent">
                            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                {/* Меню лабораторных */}
                                <li className="nav-item dropdown mx-1">
                                    <Link
                                        className="nav-link d-flex align-items-center px-3 py-2 position-relative"
                                        to="#"
                                        id="labsDropdown"
                                        role="button"
                                        data-bs-toggle="dropdown"
                                        style={{ 
                                            color: colors.text,
                                            borderRadius: '6px'
                                        }}
                                    >
                                        <FiLayers className="me-2" size={20} style={{ minWidth: '20px', strokeWidth: '2.3px' }} />
                                        <span>Лабораторные</span>
                                    </Link>
                                    <ul 
                                        className="dropdown-menu p-2 mt-1"
                                        style={{
                                            backgroundColor: colors.surface,
                                            borderRadius: '8px',
                                            minWidth: '220px'
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((lab) => (
                                            <li key={lab}>
                                                <Link
                                                    to={`/lab${lab}`}
                                                    className="dropdown-item d-flex align-items-center py-2 px-3 rounded-2"
                                                    style={{ 
                                                        color: colors.text,
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <span 
                                                        className="d-flex align-items-center justify-content-center me-3"
                                                        style={{
                                                            width: '24px',
                                                            height: '24px',
                                                            borderRadius: '6px',
                                                            background: colors.primary + '15',
                                                            color: colors.primary,
                                                            fontSize: '0.9rem',
                                                            fontWeight: 'bold'
                                                        }}
                                                    >
                                                        {lab}
                                                    </span>
                                                    <span>Лабораторная работа {lab}</span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>

                                {/* Админ-панель */}
                                {isLoggedIn && isAdmin && (
                                    <li className="nav-item mx-1">
                                        <Link
                                            to="/admin"
                                            className="nav-link d-flex align-items-center px-3 py-2 rounded-2"
                                            style={{ 
                                                color: colors.text,
                                                background: isDarkTheme ? 'rgba(138, 43, 226, 0.1)' : 'rgba(138, 43, 226, 0.05)'
                                            }}
                                        >
                                            <FiShield className="me-2" size={20} style={{ minWidth: '20px', strokeWidth: '2.3px' }} />
                                            <span>Админ</span>
                                        </Link>
                                    </li>
                                )}
                            </ul>

                            {/* Правая часть */}
                            <div className="d-flex align-items-center gap-2">
                                {/* Кнопка отзыва */}
                                {isLoggedIn && (
                                    <button
                                        className="btn d-flex align-items-center px-3 py-2 position-relative"
                                        onClick={() => setShowFeedbackModal(true)}
                                        style={{ 
                                            color: colors.text,
                                            borderRadius: '6px',
                                            transition: 'all 0.2s ease'
                                        }}
                                    >
                                        <FiMessageSquare className="me-2" size={20} style={{ minWidth: '20px', strokeWidth: '2.3px' }} />
                                        <span>Отзыв</span>
                                    </button>
                                )}

                                {/* Переключатель темы */}
                                <button
                                    onClick={toggleTheme}
                                    className="btn d-flex align-items-center justify-content-center p-2 rounded-2"
                                    aria-label={isDarkTheme ? "Светлая тема" : "Тёмная тема"}
                                    style={{ 
                                        color: colors.text,
                                        width: '42px',
                                        height: '42px',
                                        transition: 'all 0.2s ease'
                                    }}
                                >
                                    {isDarkTheme ? <FiSun size={20} strokeWidth="2.3px" /> : <FiMoon size={20} strokeWidth="2.3px" />}
                                </button>

                                {/* Профиль пользователя */}
                                {isLoggedIn ? (
                                    <div className="dropdown">
                                        <button
                                            className="btn d-flex align-items-center justify-content-center p-2 rounded-2"
                                            type="button"
                                            id="userDropdown"
                                            data-bs-toggle="dropdown"
                                            style={{ 
                                                color: colors.text,
                                                width: '42px',
                                                height: '42px',
                                                transition: 'all 0.2s ease'
                                            }}
                                        >
                                            <FiUser size={20} strokeWidth="2.3px" />
                                        </button>
                                        <ul 
                                            className="dropdown-menu dropdown-menu-end p-2 mt-2"
                                            style={{
                                                backgroundColor: colors.surface,
                                                borderRadius: '8px',
                                                minWidth: '200px'
                                            }}
                                        >
                                            <li className="px-3 py-2 mb-1" style={{ 
                                                color: colors.textSecondary,
                                                fontSize: '0.85rem',
                                                whiteSpace: 'nowrap'
                                            }}>
                                                Вы вошли как <strong>{userName}</strong>
                                            </li>
                                            <li>
                                                <Link
                                                    to="/edit-profile"
                                                    className="dropdown-item d-flex align-items-center py-2 px-3 rounded-2"
                                                    style={{ 
                                                        color: colors.text,
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <FiEdit3 className="me-2" size={18} style={{ minWidth: '18px', strokeWidth: '2.3px' }} />
                                                    <span>Профиль</span>
                                                </Link>
                                            </li>
                                            <li>
                                                <button
                                                    className="dropdown-item d-flex align-items-center py-2 px-3 rounded-2"
                                                    onClick={logout}
                                                    style={{ 
                                                        color: colors.error,
                                                        transition: 'all 0.2s ease'
                                                    }}
                                                >
                                                    <FiLogOut className="me-2" size={18} style={{ minWidth: '18px', strokeWidth: '2.3px' }} />
                                                    <span>Выйти</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                ) : (
                                    <div className="d-flex gap-2">
                                        <Link
                                            to="/auth"
                                            className="btn px-3 py-2 rounded-2"
                                            style={{ 
                                                color: colors.primary,
                                                border: `1px solid ${colors.primary}`,
                                                transition: 'all 0.2s ease',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Войти
                                        </Link>
                                        <Link
                                            to="/register"
                                            className="btn px-3 py-2 rounded-2"
                                            style={{ 
                                                backgroundColor: colors.primary,
                                                color: colors.surface,
                                                transition: 'all 0.2s ease',
                                                fontWeight: '500'
                                            }}
                                        >
                                            Регистрация
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>
            </div>

            <FeedbackModal
                isDarkTheme={isDarkTheme}
                userName={userName}
                showFeedbackModal={showFeedbackModal}
                setShowFeedbackModal={setShowFeedbackModal}
                onSubmitFeedback={onSubmitFeedback}
            />

            <style>{`
                .navbar-brand:hover span:after {
                    transform: scaleX(1);
                    transform-origin: left;
                }
                .nav-link:hover, .btn:hover:not(.dropdown-toggle) {
                    background: ${isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} !important;
                }
                .dropdown-item:hover {
                    background: ${isDarkTheme ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)'} !important;
                    transform: translateX(3px);
                }
                .navbar-toggler:not(.collapsed) span:nth-child(1) {
                    transform: translateY(6px) rotate(45deg);
                }
                .navbar-toggler:not(.collapsed) span:nth-child(2) {
                    opacity: 0;
                }
                .navbar-toggler:not(.collapsed) span:nth-child(3) {
                    transform: translateY(-6px) rotate(-45deg);
                }
            `}</style>
        </header>
    );
}

Header.propTypes = {
    isLoggedIn: PropTypes.bool.isRequired,
    logout: PropTypes.func.isRequired,
};

export default Header;