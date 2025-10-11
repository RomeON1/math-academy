import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'react-i18next';
import React, { useState } from 'react';
import ThemeToggle from './ThemeToggle';
import VerticalLevelIndicator from './level/VerticalLevelIndicator';

const Header = ({ 
  user = { name: "Гость" }, 
  progress = 0, 
  onResetClick, 
  onSettingsClick,
  onLoginClick,
  onLogoutClick,
  grade = "6"
}) => {
  const { t } = useTranslation();
  const [showMobileProgress, setShowMobileProgress] = useState(false);
  const [showMobileUserMenu, setShowMobileUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const toggleMobileProgress = () => {
    setShowMobileProgress(!showMobileProgress);
    setShowMobileUserMenu(false);
  };

  const toggleMobileUserMenu = () => {
    setShowMobileUserMenu(!showMobileUserMenu);
    setShowMobileProgress(false);
  };

  return (
    <>
      {/* Десктоп версия - фиксированные отступы */}
      <div className="hidden md:flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 py-3 px-6">
        <div className="flex-1 flex items-start space-x-3">
          <div className="text-2xl">📘</div>
          
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white text-xl">
              {t('header.title')}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5 pl-0.5">
             {grade} {t('header.klass')}, {t('header.subtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          
          {/* Блок пользователя */}
          <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5">
            <div className="flex items-center space-x-1">
              <div className="text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div className="text-xs text-gray-700 dark:text-gray-300">
                {user.username || user.name}
              </div>
            </div>

            <VerticalLevelIndicator progress={progress} />

            <button
              onClick={onSettingsClick}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              title="Настройки"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {user && user.isLoggedIn ? (
              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                title="Выход"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </button>
            ) : (
              <button
                onClick={onLoginClick}
                className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
                title="Вход"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
              </button>
            )}
          </div>

          {/* Блок прогресса */}
          <div className="flex items-center space-x-2 border border-gray-200 dark:border-gray-600 rounded-lg px-3 py-1.5">
            <div className="text-xs text-gray-600 dark:text-gray-400">{t('header.progress')}</div>
            
            <div className="w-16 bg-gray-200 dark:bg-gray-600 rounded-full h-1.5">
              <div
                className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            
            <div className="text-xs font-bold text-primary-600 dark:text-primary-400 w-8">
              {progress}%
            </div>

            <button
              onClick={onResetClick}
              className="p-1 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-colors"
              title={t('header.hint-gen-task')}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
          </div>

          {/* Переключатель языка */}
          <LanguageToggle />

          {/* Переключатель темы */}
          <ThemeToggle />
        </div>
      </div>

      {/* Мобильная версия - фиксированные отступы */}
      <div className="md:hidden flex items-center justify-between bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50 py-2 px-4">
        <div className="flex-1 flex items-start space-x-2">
          <div className="text-2xl">📘</div>
          <div>
            <h1 className="font-bold text-gray-900 dark:text-white text-lg">
              {t('header.title')}
            </h1>
            <p className="text-xs text-gray-600 dark:text-gray-400">
              {grade} {t('header.klass')} · {t('header.mobile-subtitle')}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          
          <div className="relative">
            <button 
              onClick={toggleMobileUserMenu}
              className="flex items-center space-x-1 border border-gray-200 dark:border-gray-600 rounded-md p-1.5"
            >
              <div className="text-gray-500 dark:text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <VerticalLevelIndicator progress={progress} />
            </button>

{showMobileUserMenu && (
  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50 p-2 min-w-[140px]">
    <div className="absolute top-0 left-3 transform -translate-y-full border-8 border-transparent border-b-gray-200 dark:border-b-gray-600" />
    <button className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-x-2">
      <VerticalLevelIndicator progress={progress} />
      <span>{t('header.level')}</span>
    </button>
    <button className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-x-2">
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
      </svg>
      <span>{t('header.settings')}</span>
    </button>
    <button 
      onClick={() => setShowLogoutConfirm(true)}
      className="w-full px-3 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md flex items-center gap-x-2"
    >
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
      </svg>
      <span>{t('header.logout')}</span>
    </button>
  </div>
)}

          </div>

          <div className="relative">
            <button 
              onClick={toggleMobileProgress}
              className="flex items-center space-x-1 border border-gray-200 dark:border-gray-600 rounded-md p-1.5"
            >
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                {progress}%
              </span>
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </button>

            {showMobileProgress && (
              <div className="absolute top-full right-0 mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-md shadow-lg z-50 p-3 min-w-[180px]">
                <div className="absolute top-0 right-3 transform -translate-y-full border-8 border-transparent border-b-gray-200 dark:border-b-gray-600" />
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {t('header.general-progress')}
                  </span>
                  <span className="text-sm font-bold text-primary-600 dark:text-primary-400">
                    {progress}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2 mb-3">
                  <div
                    className="bg-green-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                
		<button
		  onClick={onResetClick}
		  className="w-full flex items-center justify-start text-xs text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-100 p-2 border border-gray-300 dark:border-gray-500 rounded-md bg-gray-50 hover:bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
		>
		  <svg className="w-4 h-4 flex-shrink-0 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
		    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
		  </svg>
		  <span className="truncate">{t('header.button-exit')}</span>
		</button>

              </div>
            )}
          </div>

          {/* Переключатель языка для мобильной версии */}
          <div className="h-8">
            <LanguageToggle />
          </div>

          <div className="h-8">
            <ThemeToggle />
          </div>
        </div>
      </div>

      {/* Модальное окно подтверждения выхода */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 m-4 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              🔐 {t('exit-modal-window.h3-exit')}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('exit-modal-window.p-ask')}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t('exit-modal-window.cancel-button')}
              </button>
              <button
                onClick={() => {
                  onLogoutClick();
                  setShowLogoutConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                {t('exit-modal-window.ok-button')}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
