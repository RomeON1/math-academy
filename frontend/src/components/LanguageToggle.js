import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageToggle = () => {
  const { i18n } = useTranslation();

  const changeLanguage = async (lng) => {
    // Меняем язык
    await i18n.changeLanguage(lng);
    
    // 🟢 ПЕРЕЗАГРУЖАЕМ ПРОГРЕСС ПОСЛЕ СМЕНЫ ЯЗЫКА
    try {
      const token = localStorage.getItem('authToken');
      if (token) {
        const response = await fetch('/api/course/progress', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        
        if (response.ok) {
          const progressData = await response.json();
          console.log('🔄 Прогресс перезагружен после смены языка:', progressData);
          
          // Обновляем прогресс в localStorage
          const currentState = JSON.parse(localStorage.getItem('mathAppState') || '{}');
          localStorage.setItem('mathAppState', JSON.stringify({
            ...currentState,
            progress: progressData
          }));
        }
      }
    } catch (error) {
      console.error('❌ Ошибка перезагрузки прогресса:', error);
    }
  };

  return (
    <div className="relative group">
      <button className="p-1.5 rounded-lg border border-gray-200 dark:border-gray-600 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-sm">
        {i18n.language === 'de' ? '🇩🇪' : '🇷🇺'}
      </button>
      
      <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-lg shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
        
        {/* 🟢 ДОБАВЛЕННАЯ СТРЕЛОЧКА */}
        <div className="absolute top-0 right-2 transform -translate-y-full border-8 border-transparent border-b-gray-200 dark:border-b-gray-600" />
        
        <button
          onClick={() => changeLanguage('ru')}
          className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
        >
          <span>🇷🇺</span>
          <span>Русский</span>
        </button>
        <button
          onClick={() => changeLanguage('de')}
          className="w-full px-3 py-2 text-left text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center space-x-2"
        >
          <span>🇩🇪</span>
          <span>Deutsch</span>
        </button>
      </div>
    </div>
  );
};

export default LanguageToggle;
