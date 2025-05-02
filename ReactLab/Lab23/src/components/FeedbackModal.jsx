import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';

const FeedbackModal = ({ 
  isDarkTheme, 
  userName, 
  showFeedbackModal, 
  setShowFeedbackModal, 
  onSubmitFeedback,
  serverError 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset,
    setValue
  } = useForm({
    defaultValues: {
      name: userName || '',
      feedback: ''
    }
  });

  useEffect(() => {
    if (userName) {
      setValue('name', userName);
    }
  }, [userName, setValue]);

  useEffect(() => {
    if (showFeedbackModal) {
      reset({
        name: userName || '',
        feedback: ''
      });
    }
  }, [showFeedbackModal, userName, reset]);

  if (!showFeedbackModal) return null;

  return (
    <div style={{ 
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      zIndex: 1050,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '20px'
    }}>
      <div style={{
        width: '100%',
        maxWidth: '500px',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        backgroundColor: isDarkTheme ? '#2c2c2c' : '#fff'
      }}>
        <div style={{
          padding: '20px',
          borderBottom: isDarkTheme ? '1px solid #444' : '1px solid #eee',
          position: 'relative'
        }}>
          <h2 style={{ 
            margin: 0,
            fontSize: '1.5rem',
            fontWeight: 600,
            color: isDarkTheme ? '#fff' : '#333',
            textAlign: 'center'
          }}>
            Обратная связь
          </h2>
          <button 
            onClick={() => setShowFeedbackModal(false)}
            style={{
              position: 'absolute',
              right: '20px',
              top: '20px',
              background: 'none',
              border: 'none',
              fontSize: '1.5rem',
              cursor: 'pointer',
              color: isDarkTheme ? '#aaa' : '#666'
            }}
          >
            &times;
          </button>
        </div>

        <div style={{ 
          padding: '20px',
          width: '100%' // Добавлено для правильного растягивания
        }}>
          <form onSubmit={handleSubmit(onSubmitFeedback)} style={{
            width: '100%' // Форма занимает всю ширину
          }}>
            {serverError && (
              <div style={{
                padding: '12px 16px',
                marginBottom: '20px',
                borderRadius: '6px',
                backgroundColor: '#ffebee',
                color: '#d32f2f',
                display: 'flex',
                alignItems: 'center',
                gap: '8px'
              }}>
                <span>⚠️</span>
                <div>{serverError}</div>
              </div>
            )}

            <div style={{ 
              marginBottom: '20px',
              width: '100%' // Ширина 100%
            }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 500,
                color: isDarkTheme ? '#ddd' : '#555'
              }}>
                Ваше имя
              </label>
              <input
                {...register('name')}
                readOnly
                disabled
                style={{
                  width: '100%', // Занимает всю ширину
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: isDarkTheme ? '1px solid #444' : '1px solid #ddd',
                  backgroundColor: isDarkTheme ? '#3a3a3a' : '#f9f9f9',
                  color: isDarkTheme ? '#eee' : '#333',
                  boxSizing: 'border-box' // Важно для правильного расчета ширины
                }}
              />
            </div>

            <div style={{ 
              marginBottom: '24px',
              width: '100%' // Ширина 100%
            }}>
              <label style={{
                display: 'block',
                marginBottom: '8px',
                fontWeight: 500,
                color: isDarkTheme ? '#ddd' : '#555'
              }}>
                Ваш отзыв
              </label>
              <textarea
                {...register('feedback', { 
                  required: 'Пожалуйста, напишите отзыв',
                  minLength: {
                    value: 10,
                    message: 'Минимум 10 символов'
                  },
                  maxLength: {
                    value: 500,
                    message: 'Максимум 500 символов'
                  }
                })}
                rows={5}
                style={{
                  width: '100%', // Занимает всю ширину
                  padding: '12px 16px',
                  borderRadius: '6px',
                  border: errors.feedback ? 
                    (isDarkTheme ? '1px solid #d32f2f' : '1px solid #f44336') : 
                    (isDarkTheme ? '1px solid #444' : '1px solid #ddd'),
                  backgroundColor: isDarkTheme ? '#3a3a3a' : '#fff',
                  color: isDarkTheme ? '#eee' : '#333',
                  resize: 'vertical',
                  boxSizing: 'border-box' // Важно для правильного расчета ширины
                }}
                placeholder="Поделитесь вашим мнением..."
              />
              {errors.feedback && (
                <div style={{
                  marginTop: '8px',
                  fontSize: '0.875rem',
                  color: isDarkTheme ? '#ff6b6b' : '#d32f2f'
                }}>
                  {errors.feedback.message}
                </div>
              )}
            </div>

            <div style={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '16px',
              width: '100%' // Ширина 100%
            }}>
              <button
                type="button"
                onClick={() => setShowFeedbackModal(false)}
                disabled={isSubmitting}
                style={{
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: isDarkTheme ? '#444' : '#f0f0f0',
                  color: isDarkTheme ? '#eee' : '#333',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  flexShrink: 0 // Предотвращает сжатие кнопок
                }}
              >
                Отмена
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                style={{
                  padding: '12px 24px',
                  borderRadius: '6px',
                  border: 'none',
                  backgroundColor: '#4caf50',
                  color: '#fff',
                  cursor: 'pointer',
                  fontWeight: 500,
                  transition: 'all 0.2s',
                  flexShrink: 0 // Предотвращает сжатие кнопок
                }}
              >
                {isSubmitting ? 'Отправка...' : 'Отправить'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

FeedbackModal.propTypes = {
  isDarkTheme: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  showFeedbackModal: PropTypes.bool.isRequired,
  setShowFeedbackModal: PropTypes.func.isRequired,
  onSubmitFeedback: PropTypes.func.isRequired,
  serverError: PropTypes.string,
};

export default FeedbackModal;