import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { courseAPI } from '../../services/api';

import { sessionAPI } from '../../services/api';
const SessionHistory = ({ user }) => {
  const { t } = useTranslation();
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedSession, setSelectedSession] = useState(null);
  const [sessionDetails, setSessionDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);

  useEffect(() => {
    fetchSessions();
  }, [user]);

  const fetchSessions = async () => {
    try {
      setLoading(true);
      const response = await sessionAPI.getUserSessions(user.id);
      setSessions(response.data);
    } catch (error) {
      console.error('Error fetching sessions:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessionDetails = async (sessionId) => {
    try {
      setDetailsLoading(true);
      const response = await sessionAPI.getSessionDetails(user.id, sessionId);
      setSessionDetails(response.data);
      setSelectedSession(sessionId);
    } catch (error) {
      console.error('Error fetching session details:', error);
    } finally {
      setDetailsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('ru-RU', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSessionDuration = (session) => {
    if (!session.end_date) return t('session.active');
    
    const start = new Date(session.start_date);
    const end = new Date(session.end_date);
    const diffMs = end - start;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffHours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    
    if (diffDays > 0) {
      return `${diffDays} ${t('session.days')} ${diffHours} ${t('session.hours')}`;
    }
    return `${diffHours} ${t('session.hours')}`;
  };

  const getProgressStats = (session) => {
    if (!sessionDetails || sessionDetails.session.id !== session.id) return null;
    
    const totalTasks = sessionDetails.days_stats.reduce((sum, day) => sum + day.total_tasks, 0);
    const completedTasks = sessionDetails.days_stats.reduce((sum, day) => sum + day.completed_tasks, 0);
    const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
    
    return { totalTasks, completedTasks, progressPercentage };
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          {t('session.history')}
        </h3>
        <div className="animate-pulse space-y-3">
          {[1, 2, 3].map(i => (
            <div key={i} className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-20"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
        {t('session.history')}
      </h3>

      {sessions.length === 0 ? (
        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
          <p className="text-gray-600 dark:text-gray-300">
            {t('session.noSessions')}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Список сессий */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('session.allSessions')}
            </h4>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {sessions.map((session) => {
                const progress = getProgressStats(session);
                const isActive = session.is_active;
                const isSelected = selectedSession === session.id;
                
                return (
                  <div
                    key={session.id}
                    className={`border rounded-lg p-4 cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-600 hover:border-gray-300 dark:hover:border-gray-500'
                    } ${isActive ? 'ring-2 ring-green-500' : ''}`}
                    onClick={() => fetchSessionDetails(session.id)}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h5 className="font-medium text-gray-900 dark:text-white">
                          {t(`subjects.${session.subject}`)} {isActive && `(${t('session.active')})`}
                        </h5>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(session.start_date)}
                        </p>
                        {session.end_date && (
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {t('session.ended')}: {formatDate(session.end_date)}
                          </p>
                        )}
                      </div>
                      <div className="text-right">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          isActive 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
                        }`}>
                          {isActive ? t('session.active') : t('session.completed')}
                        </span>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {getSessionDuration(session)}
                        </p>
                      </div>
                    </div>
                    
                    {progress && (
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-600 dark:text-gray-300">
                            {t('session.progress')}
                          </span>
                          <span className="font-medium">
                            {progress.completedTasks}/{progress.totalTasks} {t('session.tasks')}
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${progress.progressPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Детали сессии */}
          <div className="space-y-4">
            <h4 className="text-lg font-medium text-gray-900 dark:text-white">
              {t('session.details')}
            </h4>
            
            {detailsLoading ? (
              <div className="animate-pulse space-y-3">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-32"></div>
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg p-4 h-24"></div>
              </div>
            ) : sessionDetails ? (
              <div className="space-y-4">
                {/* Общая статистика */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('session.overview')}
                  </h5>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                        {sessionDetails.days_stats.length}
                      </div>
                      <div className="text-sm text-blue-600 dark:text-blue-400">
                        {t('session.days')}
                      </div>
                    </div>
                    <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                        {sessionDetails.performance.success_rate}%
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        {t('session.successRate')}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Прогресс по дням */}
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                    {t('session.dailyProgress')}
                  </h5>
                  <div className="space-y-3">
                    {sessionDetails.days_stats.map((day) => (
                      <div key={day.day} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <span className="font-medium text-gray-900 dark:text-white">
                          {t('days.day')} {day.day}
                        </span>
                        <div className="flex items-center space-x-4">
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {day.completed_tasks}/{day.total_tasks} {t('session.tasks')}
                          </span>
                          <span className={`font-bold ${
                            day.progress_percentage >= 100 
                              ? 'text-green-600 dark:text-green-400'
                              : day.progress_percentage >= 50
                              ? 'text-yellow-600 dark:text-yellow-400'
                              : 'text-red-600 dark:text-red-400'
                          }`}>
                            {day.progress_percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Типы заданий */}
                {sessionDetails.task_types_overview && Object.keys(sessionDetails.task_types_overview).length > 0 && (
                  <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h5 className="font-medium text-gray-900 dark:text-white mb-3">
                      {t('session.taskTypes')}
                    </h5>
                    <div className="space-y-2">
                      {Object.entries(sessionDetails.task_types_overview).map(([type, data]) => (
                        <div key={type} className="flex justify-between items-center p-2 bg-gray-50 dark:bg-gray-700 rounded">
                          <span className="text-sm text-gray-900 dark:text-white capitalize">
                            {type}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {data.count} {t('session.tasks')}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 text-center">
                <p className="text-gray-600 dark:text-gray-300">
                  {t('session.selectSession')}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionHistory;
