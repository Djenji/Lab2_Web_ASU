import PropTypes from 'prop-types';
import { useState, useContext } from 'react';
import { ThemeContext } from './ThemeContext';
import { useGetFeedbacksQuery } from './adminApi';
import { useSelector } from 'react-redux';
import TestModeController from './TestModeController';
import './Footer.css';

const FeedbackCard = ({ feedback, isDarkTheme }) => (
  <div className="col-lg-4 col-md-6 mb-4">
    <div className={`card h-100 border-0 shadow-sm ${isDarkTheme ? 'bg-dark text-light' : 'bg-white'}`}>
      <div className="card-body d-flex flex-column">
        <div className="d-flex align-items-center mb-3">
          <div className={`rounded-circle d-flex align-items-center justify-content-center ${isDarkTheme ? 'bg-secondary' : 'bg-light'}`} style={{ width: '40px', height: '40px' }}>
            <i className="bi bi-person-fill"></i>
          </div>
          <h5 className="card-title ms-3 mb-0">{feedback.name}</h5>
        </div>
        <p className="card-text flex-grow-1">{feedback.feedback}</p>
        <small className={`text-end ${isDarkTheme ? 'text-light opacity-75' : 'text-muted'}`}>
          <i className="bi bi-clock me-1"></i>
          {new Date(feedback.date).toLocaleString()}
        </small>
      </div>
    </div>
  </div>
);

FeedbackCard.propTypes = {
  feedback: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
    feedback: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  }).isRequired,
  isDarkTheme: PropTypes.bool.isRequired,
};

const RainbowSpinner = () => (
  <div className="text-center my-5 py-4">
    <div className="spinner-border" style={{
      width: '3rem',
      height: '3rem',
      border: '0.25em solid transparent',
      borderTopColor: '#ff0000',
      borderRightColor: '#00ff00',
      borderBottomColor: '#0000ff',
      borderLeftColor: '#ff00ff',
      animation: 'spinner-border 0.75s linear infinite, rainbow 2s linear infinite'
    }} role="status">
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
    isEmpty: false
  });
  const { isDarkTheme } = useContext(ThemeContext);
  
  const { isLoggedIn, isAdmin } = useSelector(state => state.auth);

  const { 
    data: feedbacks = [], 
    isLoading: isFeedbacksLoading,
    isFetching: isFeedbacksFetching,
    isError: isFeedbacksError,
    error: feedbacksError,
    refetch: refetchFeedbacks
  } = useGetFeedbacksQuery(undefined, {
    skip: !isLoggedIn
  });

  const testFeedbacks = [
    { 
      id: 1, 
      name: "Тестовый пользователь 1", 
      feedback: "Это тестовый отзыв для демонстрации работы интерфейса. Отзывы помогают улучшить качество сервиса.", 
      date: new Date().toISOString() 
    },
    { 
      id: 2, 
      name: "Тестовый пользователь 2", 
      feedback: "Еще один пример отзыва, который показывает как будет выглядеть контент в этой секции.", 
      date: new Date().toISOString() 
    },
    { 
      id: 3, 
      name: "Тестовый пользователь 3", 
      feedback: "Пользовательские отзывы важны для развития проекта и помогают другим пользователям.", 
      date: new Date().toISOString() 
    }
  ];

  const handleRetry = () => {
    refetchFeedbacks();
  };

  const getState = () => {
    if (!testMode.active) {
      return {
        isLoading: isFeedbacksLoading,
        isFetching: isFeedbacksFetching,
        isError: isFeedbacksError,
        error: feedbacksError,
        feedbacks
      };
    }
    
    return {
      isLoading: testMode.isLoading,
      isFetching: false,
      isError: testMode.isError,
      error: { message: "Тестовая ошибка загрузки отзывов" },
      feedbacks: testMode.isEmpty ? [] : [...testFeedbacks]
    };
  };

  const {
    isLoading,
    isFetching,
    isError,
    error,
    feedbacks: displayFeedbacks
  } = getState();

  if (!isLoggedIn) {
    return null;
  }

  return (
    <footer className={`py-5 ${isDarkTheme ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <div className="container">
        <div className="feedback-section">
          <div className="text-center mb-5">
            <h2 className="display-6 fw-bold mb-3">
              <i className="bi bi-chat-square-quote me-2"></i>
              Отзывы пользователей
            </h2>
          </div>

          {import.meta.env.DEV && isAdmin && (
            <div className="mb-4">
              <TestModeController 
                testMode={testMode}
                onTestModeChange={setTestMode}
              />
            </div>
          )}

          {/* Индикатор загрузки */}
          {isLoading && <RainbowSpinner />}

          {/* Сообщение об ошибке */}
          {isError && (
            <div className={`alert ${isDarkTheme ? 'alert-warning' : 'alert-danger'} alert-dismissible fade show d-flex align-items-center mb-5`}>
              <i className="bi bi-exclamation-triangle-fill me-3 fs-4"></i>
              <div className="flex-grow-1">
                <h5 className="alert-heading mb-1">Ошибка загрузки</h5>
                <p className="mb-0">{error?.message || 'Неизвестная ошибка'}</p>
              </div>
              <button 
                className={`btn ${isDarkTheme ? 'btn-outline-light' : 'btn-outline-danger'} ms-3`}
                onClick={handleRetry}
              >
                <i className="bi bi-arrow-clockwise me-1"></i>
                Повторить
              </button>
            </div>
          )}

          {/* Отображение отзывов */}
          {!isLoading && !isError && (
            <div className="row g-4">
              {displayFeedbacks.length > 0 ? (
                displayFeedbacks.map(feedback => (
                  <FeedbackCard 
                    key={feedback.id} 
                    feedback={feedback} 
                    isDarkTheme={isDarkTheme} 
                  />
                ))
              ) : (
                <div className="col-12">
                  <div className={`text-center py-5 ${isDarkTheme ? 'bg-dark' : 'bg-white'} rounded-3 shadow-sm`}>
                    <i className="bi bi-chat-square-text display-4 mb-3 opacity-50"></i>
                    <h4 className="mb-3">Нет отзывов для отображения</h4>
                    <p className={`${isDarkTheme ? 'text-light opacity-75' : 'text-muted'}`}>
                      Будьте первым, кто оставит отзыв!
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Индикатор фонового обновления */}
          {isFetching && !isLoading && (
            <div className="text-center mt-4">
              <div className="spinner-border spinner-border-sm text-primary" role="status">
                <span className="visually-hidden">Обновление...</span>
              </div>
              <small className="ms-2">Обновление отзывов...</small>
            </div>
          )}
        </div>

        <div className={`mt-5 pt-4 text-center ${isDarkTheme ? 'border-top border-secondary' : 'border-top'}`}>
          <p className={`mb-0 ${isDarkTheme ? 'text-light opacity-75' : 'text-muted'}`}>
            © {new Date().getFullYear()} butkeeva.42012
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;