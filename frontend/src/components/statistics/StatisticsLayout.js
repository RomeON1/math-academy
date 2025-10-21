import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import StatsCards from './StatsCards';

const StatisticsLayout = ({ user }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('current');

  const tabs = [
    { id: 'current', label: t('stats.tabs.current'), icon: '📈' },
    { id: 'history', label: t('stats.tabs.history'), icon: '📋' },
    { id: 'calendar', label: t('stats.tabs.calendar'), icon: '📅' },
    { id: 'analysis', label: t('stats.tabs.analysis'), icon: '🔍' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'current': 
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('stats.currentSession')}
            </h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                {t('stats.comingSoon')}
              </p>
            </div>
          </div>
        );
      case 'history':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('stats.sessionHistory')}
            </h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                {t('stats.comingSoon')}
              </p>
            </div>
          </div>
        );
      case 'calendar':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('stats.progressCalendar')}
            </h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                {t('stats.comingSoon')}
              </p>
            </div>
          </div>
        );
      case 'analysis':
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('stats.taskAnalysis')}
            </h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                {t('stats.comingSoon')}
              </p>
            </div>
          </div>
        );
      default: 
        return (
          <div className="space-y-6">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              {t('stats.currentSession')}
            </h3>
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <p className="text-yellow-800 dark:text-yellow-200">
                {t('stats.comingSoon')}
              </p>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Вкладки */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab.id
                  ? 'border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'border-transparent text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <span className="mr-2">{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Контент */}
      {renderContent()}
    </div>
  );
};

export default StatisticsLayout;
