import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

function EditProfilePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userName, userId } = useSelector(state => state.auth);
  const [newName, setNewName] = useState(userName);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    
    if (!newName.trim()) {
      setError('Введите имя пользователя');
      return;
    }

    if (newName.trim().length < 3) {
      setError('Минимум 3 символа');
      return;
    }

    if (newName === userName) {
      setError('Имя не изменилось');
      return;
    }

    setIsSubmitting(true);
    try {
      await dispatch(updateUserProfile({ userId, newName })).unwrap();
      navigate('/profile');
    } catch (error) {
      setError('Ошибка сохранения');
      console.error('Update error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px' }}>
      <div className="text-center mb-4 mt-5">
        <h2 className="mb-1">Редактирование профиля</h2>
        <p className="text-muted">Текущее имя: <strong>{userName}</strong></p>
      </div>

      {error && (
        <div className="alert alert-warning mb-3">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <input
            type="text"
            className="form-control form-control-lg"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Новое имя"
            autoFocus
          />
        </div>

        <div className="d-flex justify-content-between">
          <button 
            type="button"
            className="btn btn-outline-secondary"
            onClick={() => navigate(-1)}
            disabled={isSubmitting}
          >
            Назад
          </button>
          
          <button 
            type="submit" 
            className="btn btn-primary px-4"
            disabled={isSubmitting || !newName.trim() || newName === userName || newName.length < 3}
          >
            {isSubmitting ? 'Сохранение...' : 'Сохранить'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditProfilePage;