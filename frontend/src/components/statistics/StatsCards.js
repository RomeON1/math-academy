import React from 'react';
import { useTranslation } from 'react-i18next';

const StatsCards = ({ overviewData, loading = false }) => {
  const { t } = useTranslation();

  if (loading || !overviewData) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2"></div>
            <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  const cards = [
    {
      title: t('stats.totalDays'),
      value: overviewData.total_days,
      icon: '📅',
      color: 'blue'
    },
    {
      title: t('stats.completedDays'),
      value: overviewData.completed_days,
      icon: '✅',
      color: 'green'
    },
    {
      title: t('stats.overallProgress'),
      value: `${overviewData.overall_progress}%`,
      icon: '📊',
      color: 'purple'
    },
    {
      title: t('stats.successRate'),
      value: `${overviewData.overall_success_rate}%`,
      icon: '🎯',
      color: 'orange'
    }
  ];

  const colorClasses = {
    blue: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800',
    green: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800',
    purple: 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800',
    orange: 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`border rounded-lg p-4 transition-all duration-200 hover:shadow-md ${colorClasses[card.color]}`}
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                {card.title}
              </p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                {card.value}
              </p>
            </div>
            <span className="text-2xl">{card.icon}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatsCards;
