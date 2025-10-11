import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Login = ({ onLogin, onSwitchToRegister, error }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('🔄 LOGIN FORM SUBMITTED:', formData);
    
    // Валидация
    if (!formData.email || !formData.password) {
      return;
    }
    
    setLoading(true);
    try {
      await onLogin(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        {t('auth.login.title', "Вход в систему")}
      </h2>
      
      {/* 🟢 ОТОБРАЖЕНИЕ ОШИБКИ */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-300 dark:border-red-700 rounded-md">
          <p className="text-red-700 dark:text-red-300 text-sm">{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('auth.login.email', "Email")}
            </label>
            <input
              type="email"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('auth.login.password', "Пароль")}
            </label>
            <input
              type="password"
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              required
              disabled={loading}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white py-2 rounded-md font-medium transition-colors"
          >
            {loading ? t('auth.loading', "Загрузка...") : t('auth.login.submit', "Войти")}
          </button>
        </div>
      </form>
      
      <div className="text-center mt-4">
        <button
          onClick={onSwitchToRegister}
          disabled={loading}
          className="text-blue-500 hover:text-blue-600 disabled:text-blue-300 text-sm"
        >
          {t('auth.login.noAccount', "Нет аккаунта? Зарегистрироваться")}
        </button>
      </div>
    </div>
  );
};

export default Login;
