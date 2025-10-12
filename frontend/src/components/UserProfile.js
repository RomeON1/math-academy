import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { courseAPI } from '../services/api';

const UserProfile = ({ user, onClose, onGradeChange }) => {
  const { t } = useTranslation();
  const [currentGrade, setCurrentGrade] = useState(user?.grade || 6);
  const [gradeHistory, setGradeHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (user) {
      setCurrentGrade(user.grade);
      fetchGradeHistory();
    }
  }, [user]);

  const fetchGradeHistory = async () => {
    try {
      const response = await courseAPI.getGradeHistory(user.id);
      setGradeHistory(response.data);
    } catch (error) {
      console.error('Error fetching grade history:', error);
    }
  };

  const handleGradeChange = async () => {
    if (currentGrade === user.grade) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      await courseAPI.updateUserGrade(user.id, currentGrade);
      setMessage(t('profile.gradeUpdated', 'Класс успешно обновлен!'));
      if (onGradeChange) {
        onGradeChange(currentGrade);
      }
      await fetchGradeHistory(); // Обновляем историю
    } catch (error) {
      setMessage(t('profile.updateError', 'Ошибка обновления класса'));
      console.error('Error updating grade:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t('profile.title', 'Личный кабинет')}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            ✕
          </button>
        </div>

        {/* Информация пользователя */}
        <div className="mb-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('profile.username', 'Имя пользователя')}
            </label>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.username}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('profile.email', 'Email')}
            </label>
            <div className="text-lg font-semibold text-gray-900 dark:text-white">
              {user.email}
            </div>
          </div>

          {/* Смена класса */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              {t('profile.currentGrade', 'Текущий класс')}
            </label>
            <select
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={currentGrade}
              onChange={(e) => setCurrentGrade(parseInt(e.target.value))}
              disabled={loading}
            >
              {Array.from({ length: 11 }, (_, i) => i + 1).map(grade => (
                <option key={grade} value={grade}>
                  {grade}
                </option>
              ))}
            </select>
            
            <button
              onClick={handleGradeChange}
              disabled={loading || currentGrade === user.grade}
              className="mt-3 w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-md font-medium transition-colors"
            >
              {loading ? t('profile.updating', 'Обновление...') : t('profile.updateGrade', 'Обновить класс')}
            </button>
          </div>

          {/* Сообщения */}
          {message && (
            <div className={`p-3 rounded-md mb-4 ${
              message.includes('Ошибка') 
                ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
            }`}>
              {message}
            </div>
          )}

          {/* История классов */}
          {gradeHistory.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                {t('profile.gradeHistory', 'История классов')}
              </h3>
              <div className="space-y-2">
                {gradeHistory.map((record, index) => (
                  <div key={record.id} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                    <span className="text-gray-900 dark:text-white">
                      {t('profile.grade', 'Класс')} {record.grade}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(record.start_date).toLocaleDateString()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
