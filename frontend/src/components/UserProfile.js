import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { courseAPI } from '../services/api';

const UserProfile = ({ user, onClose, onGradeChange }) => {
  const { t } = useTranslation();
  const [currentGrade, setCurrentGrade] = useState(user?.grade || 6);
  const [gradeHistory, setGradeHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('profile');

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
      await fetchGradeHistory();
    } catch (error) {
      setMessage(t('profile.updateError', 'Ошибка обновления класса'));
      console.error('Error updating grade:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  // ===== РАЗДЕЛЫ ЛИЧНОГО КАБИНЕТА =====

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">👤 Профиль</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Существующие поля */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.username', 'Имя пользователя')}
          </label>
          <div className="text-lg font-semibold text-gray-900 dark:text-white p-2 bg-gray-50 dark:bg-gray-700 rounded">
            {user.username}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.email', 'Email')}
          </label>
          <div className="text-lg font-semibold text-gray-900 dark:text-white p-2 bg-gray-50 dark:bg-gray-700 rounded">
            {user.email}
          </div>
        </div>

        {/* Смена класса - ОБЪЕДИНЕННЫЙ БЛОК */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('profile.currentGrade', 'Текущий класс')}
            </label>
            <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
              <select
                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(parseInt(e.target.value))}
                disabled={loading}
              >
                {Array.from({ length: 11 }, (_, i) => i + 1).map(grade => (
                  <option key={grade} value={grade}>
                    {t('profile.grade', 'Класс')} {grade}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleGradeChange}
                disabled={loading || currentGrade === user.grade}
                className="px-6 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors whitespace-nowrap"
              >
                {loading ? t('profile.updating', 'Обновление...') : t('profile.updateGrade', 'Обновить класс')}
              </button>
            </div>
            
            {/* Сообщения внутри блока */}
            {message && (
              <div className={`mt-3 p-3 rounded-md ${
                message.includes('Ошибка') 
                  ? 'bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-300'
                  : 'bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-300'
              }`}>
                {message}
              </div>
            )}
          </div>
        </div>

        {/* Новые поля профиля */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Возраст (опционально)
          </label>
          <input
            type="number"
            placeholder="Введите возраст"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Школа (опционально)
          </label>
          <input
            type="text"
            placeholder="Название школы"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Реальный класс в школе
          </label>
          <input
            type="number"
            placeholder="Ваш реальный класс"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Преподаватель (опционально)
          </label>
          <input
            type="text"
            placeholder="ФИО преподавателя"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Город/регион (опционально)
          </label>
          <input
            type="text"
            placeholder="Ваш город или регион"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      {/* История классов */}
      {gradeHistory.length > 0 && (
        <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
            {t('profile.gradeHistory', 'История классов')}
          </h3>
          <div className="space-y-2">
            {gradeHistory.map((record, index) => (
              <div key={record.id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-gray-900 dark:text-white font-medium">
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
  );

  const renderProgressSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📊 Прогресс и статистика</h2>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          Раздел в разработке. Скоро здесь появятся графики и детальная статистика!
        </p>
      </div>
    </div>
  );

  const renderAchievementsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">🏆 Достижения</h2>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          Система достижений и наград появится в следующем обновлении!
        </p>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">⚙️ Настройки обучения</h2>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          Настройки появятся здесь скоро!
        </p>
      </div>
    </div>
  );

  const renderCalendarSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">📅 Календарь</h2>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          Календарь обучения будет добавлен в ближайшее время!
        </p>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'profile': return renderProfileSection();
      case 'progress': return renderProgressSection();
      case 'achievements': return renderAchievementsSection();
      case 'settings': return renderSettingsSection();
      case 'calendar': return renderCalendarSection();
      default: return renderProfileSection();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-6xl h-5/6 flex flex-col md:flex-row">
        {/* Сайдбар навигации - десктоп */}
        <div className="hidden md:flex md:w-1/4 bg-gray-50 dark:bg-gray-700 rounded-l-xl p-6 flex-col">
          <div className="flex-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-6">
              {t('profile.title', 'Личный кабинет')}
            </h3>
            <nav className="space-y-2">
              {[
                { id: 'profile', label: '👤 Профиль' },
                { id: 'progress', label: '📊 Прогресс' },
                { id: 'achievements', label: '🏆 Достижения' },
                { id: 'settings', label: '⚙️ Настройки' },
                { id: 'calendar', label: '📅 Календарь' }
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full text-left p-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                      : 'hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
          
          <button
            onClick={onClose}
            className="w-full p-3 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors border-t border-gray-200 dark:border-gray-600 mt-4"
          >
            ← Закрыть
          </button>
        </div>

        {/* Мобильная навигация */}
        <div className="md:hidden bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('profile.title', 'Личный кабинет')}
            </h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              ✕
            </button>
          </div>
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {[
              { id: 'profile', label: '👤' },
              { id: 'progress', label: '📊' },
              { id: 'achievements', label: '🏆' },
              { id: 'settings', label: '⚙️' },
              { id: 'calendar', label: '📅' }
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm transition-colors ${
                  activeSection === item.id
                    ? 'bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300'
                    : 'bg-white dark:bg-gray-600 text-gray-700 dark:text-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>

        {/* Контентная область */}
        <div className="flex-1 overflow-y-auto p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
