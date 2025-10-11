import React, { useEffect, useState, useCallback } from "react";
import Header from "./components/Header";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { authAPI, courseAPI, userAPI } from './services/api';
import { courseStructure } from './taskGenerators';
import * as taskGenerators from './taskGenerators';
import { useTranslation } from 'react-i18next';
import DayNavigation from './components/DayNavigation';

const applyTranslationsToTasks = (tasks, t) => {
  if (!tasks || !Array.isArray(tasks)) return [];
  
  return tasks.map(task => ({
    ...task,
    question: task.translationKey ? t(task.translationKey, task.translationParams) : task.question,
    explanation: task.explanationKey ? t(task.explanationKey, task.explanationParams) : task.explanation,
    answerFormat: task.formatKey ? t(task.formatKey) : task.answerFormat
  }));
};

const isCorrectAnswerCheck = (day, index, correctAnswer, currentAnswers) => {
  if (!currentAnswers) return false;
  
  const userAnswer = currentAnswers[`${day}-${index}`]?.toString().trim().toLowerCase();
  const correct = correctAnswer?.toString().toLowerCase();
  
  if (!userAnswer || !correct) return false;
  
  if (correct.includes('%')) {
    const userNum = userAnswer.replace('%', '');
    const correctNum = correct.replace('%', '');
    return userNum === correctNum;
  }

  if (correct.includes('/')) {
    const [userA, userB] = userAnswer.split('/');
    const [correctA, correctB] = correct.split('/');
    return userA === correctA && userB === correctB;
  }

  return userAnswer === correct;
};

function App() {
  const { t, i18n } = useTranslation();
  const [tests, setTests] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [currentDay, setCurrentDay] = useState(1);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [authError, setAuthError] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const checkAuth = useCallback(async () => {
    try {
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        setUser({ name: t('header.guest', "Гость"), isLoggedIn: false });
        setLoading(false);
        return;
      }

      try {
        const response = await authAPI.getMe();
        const userData = {
          ...response.data,
          isLoggedIn: true
        };
        setUser(userData);
        localStorage.setItem('userData', JSON.stringify(userData));
      } catch (error) {
        const savedUser = localStorage.getItem('userData');
        if (savedUser) {
          const userData = JSON.parse(savedUser);
          setUser({ ...userData, isLoggedIn: true });
        }
      }
    } catch (error) {
      setUser({ name: t('header.guest', "Гость"), isLoggedIn: false });
    } finally {
      setLoading(false);
    }
  }, [t]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // 🟢 ИСПРАВЛЕННАЯ ФУНКЦИЯ ДЛЯ ЗАГРУЗКИ ПРОГРЕССА С СЕРВЕРА
  const loadServerProgress = useCallback(async () => {
    console.log("🔍 ДИАГНОСТИКА: loadServerProgress начал выполнение");
    if (!user || !user.isLoggedIn) return;
    
    try {
      console.log('🔄 Загрузка прогресса с сервера...');
      
      const answersResponse = await userAPI.getAnswers();
      const serverAnswers = answersResponse.data;
      
      console.log('📥 Ответы с сервера:', serverAnswers);
      
      // 🟢 ПРЕОБРАЗУЕМ ОТВЕТЫ ИЗ СЕРВЕРНОГО ФОРМАТА В КЛИЕНТСКИЙ
      const transformedAnswers = {};
      
      if (serverAnswers && typeof serverAnswers === 'object') {
        Object.keys(serverAnswers).forEach(day => {
          Object.keys(serverAnswers[day]).forEach(taskIndex => {
            const answerData = serverAnswers[day][taskIndex];
            const clientKey = `${day}-${taskIndex}`;
            transformedAnswers[clientKey] = answerData.answer || '';
          });
        });
      }
      
      console.log('🔄 Преобразованные ответы:', transformedAnswers);
      
      // Обновляем состояние
      setAnswers(transformedAnswers);
      console.log("🔍 ДИАГНОСТИКА loadServerProgress: Устанавливаем answers:", transformedAnswers);
      console.log("🔍 ДИАГНОСТИКА loadServerProgress: Ключи ответов:", Object.keys(transformedAnswers));
      localStorage.setItem('userMathAnswers', JSON.stringify(transformedAnswers));
      
      console.log('✅ Прогресс успешно загружен и преобразован');
      
    } catch (error) {
      console.log('❌ Ошибка загрузки прогресса с сервера:', error);
    }
  }, [user]);

  // 🟢 ИСПРАВЛЕННАЯ ФУНКЦИЯ ЗАГРУЗКИ ДАННЫХ
  const loadUserData = useCallback(async () => {
    console.log("🔍 ДИАГНОСТИКА: loadUserData начал выполнение, user:", user?.username);
    try {
      // 🟢 КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Для залогиненных пользователей ВСЕГДА используем БД
      if (user && user.isLoggedIn) {
        console.log('🔄 Загрузка данных для авторизованного пользователя');
        
        // 1. Загружаем задания из БД
        const serverTasks = await userAPI.getAllTasks();
        if (serverTasks.data && Object.keys(serverTasks.data).length > 0) {
          console.log('✅ Задания загружены из БД');
          const serverTests = Object.keys(serverTasks.data).map(dayStr => {
            const day = parseInt(dayStr);
            const dayTasks = serverTasks.data[dayStr];
            const dayInfo = courseStructure.find(d => d.day === day) || {
              titleKey: `days.day${day}`,
              theoryLink: null
            };
            
            return {
              day: day,
              titleKey: dayInfo.titleKey,
              theoryLink: dayInfo.theoryLink,
              tasks: applyTranslationsToTasks(dayTasks, t)
            };
          });
          
          setTests(serverTests);
          localStorage.setItem('userMathTests', JSON.stringify(serverTests));
          
          // 2. Загружаем ответы
          console.log("🔍 ДИАГНОСТИКА: Вызов loadServerProgress...");
          await loadServerProgress();
          
        } else {
          console.log('❌ В БД нет заданий, генерируем и сохраняем');
          // Только если в БД действительно нет заданий - генерируем
          const finalTests = courseStructure.map(day => ({
            day: day.day,
            titleKey: day.titleKey,
            theoryLink: day.theoryLink,
            tasks: taskGenerators[day.generator] ? taskGenerators[day.generator](day.taskCount, t) : []
          })).filter(day => day.tasks.length > 0);
          
          setTests(finalTests);
          localStorage.setItem('userMathTests', JSON.stringify(finalTests));
          
          // Сохраняем в БД
          for (const dayData of finalTests) {
            await userAPI.saveTasks(dayData.day, dayData.tasks);
          }
        }
        
      } else {
        // Для гостей используем локальную генерацию
        console.log('🔄 Загрузка данных для гостя');
        const savedTests = localStorage.getItem('userMathTests');
        const savedAnswers = localStorage.getItem('userMathAnswers');

        let finalTests = [];
        let finalAnswers = {};

        if (savedTests && savedAnswers) {
          try {
            const parsedTests = JSON.parse(savedTests);
            const parsedAnswers = JSON.parse(savedAnswers);
            
            finalTests = parsedTests.map(dayData => ({
              ...dayData,
              tasks: applyTranslationsToTasks(dayData.tasks, t)
            }));
            finalAnswers = parsedAnswers;
          } catch (parseError) {
            console.error('Error parsing localStorage data:', parseError);
            throw new Error('Invalid localStorage data');
          }
        } else {
          finalTests = courseStructure.map(day => ({
            day: day.day,
            titleKey: day.titleKey,
            theoryLink: day.theoryLink,
            tasks: taskGenerators[day.generator] ? taskGenerators[day.generator](day.taskCount, t) : []
          })).filter(day => day.tasks.length > 0);
          
          finalAnswers = {};
        }

        setTests(finalTests);
        setAnswers(finalAnswers);
        
        localStorage.setItem('userMathTests', JSON.stringify(finalTests));
        localStorage.setItem('userMathAnswers', JSON.stringify(finalAnswers));
      }

    } catch (error) {
      console.error('Error loading user data:', error);
      
      // Аварийный режим
      const emergencyTests = courseStructure.map(day => ({
        day: day.day,
        titleKey: day.titleKey,
        theoryLink: day.theoryLink,
        tasks: taskGenerators[day.generator] ? taskGenerators[day.generator](day.taskCount, t) : []
      })).filter(day => day.tasks.length > 0);
      
      setTests(emergencyTests);
      setAnswers({});
      localStorage.setItem('userMathTests', JSON.stringify(emergencyTests));
      localStorage.setItem('userMathAnswers', JSON.stringify({}));
    }
  }, [user, t, loadServerProgress]);

  useEffect(() => {
    if (!loading && user !== null) {
      loadUserData();
    }
  }, [user, loading, loadUserData]);

  // 🟢 ИСПРАВЛЕНИЕ: При смене языка только переводим существующие задания
  useEffect(() => {
    if (tests.length > 0) {
      console.log('🌐 Смена языка: применяем переводы к существующим заданиям');
      const updatedTests = tests.map(dayData => ({
        ...dayData,
        tasks: applyTranslationsToTasks(dayData.tasks, t)
      }));
      setTests(updatedTests);
    }
  }, [i18n.language, t, tests.length]);

  const handleLogin = async (formData) => {
    setAuthError('');
    
    try {
      const response = await authAPI.login({ 
        email: formData.email, 
        password: formData.password 
      });
      
      if (!response.data?.access_token) {
        throw new Error('No access token received');
      }
      
      localStorage.setItem('authToken', response.data.access_token);
      setShowLogin(false);
      await checkAuth();
      
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'Ошибка входа';
      setAuthError(errorMessage);
      localStorage.removeItem('authToken');
    }
  };

  const handleRegister = async (formData) => {
    setAuthError('');
    
    try {
      await authAPI.register({ 
        email: formData.email,
        username: formData.username, 
        password: formData.password,
        grade: formData.grade
      });
      
      const loginResponse = await authAPI.login({
        email: formData.email,
        password: formData.password
      });
      
      localStorage.setItem('authToken', loginResponse.data.access_token);
      setShowRegister(false);
      await checkAuth();
      
    } catch (error) {
      const errorMessage = error.response?.data?.detail || error.message || 'Ошибка регистрации';
      setAuthError(errorMessage);
      localStorage.removeItem('authToken');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    setUser({ name: t('header.guest', "Гость"), isLoggedIn: false });
    setAuthError('');
  };

  // 🟢 ДИАГНОСТИКА ОТОБРАЖЕНИЯ ОТВЕТОВ
  useEffect(() => {
    console.log("🔍 ДИАГНОСТИКА ОТВЕТОВ: answers state:", answers);
    console.log("🔍 ДИАГНОСТИКА ОТВЕТОВ: tests length:", tests.length);
  }, [answers, tests]);

  const handleAnswerChange = async (day, index, value) => {
    const answerKey = `${day}-${index}`;
    const newAnswers = {
      ...answers,
      [answerKey]: value
    };
    
    setAnswers(newAnswers);
    localStorage.setItem('userMathAnswers', JSON.stringify(newAnswers));
    
    if (user && user.isLoggedIn) {
      setTimeout(async () => {
        try {
          const dayData = tests.find(d => d.day === day);
          if (dayData && dayData.tasks[index]) {
            const task = dayData.tasks[index];
            const isCorrectAnswer = isCorrectAnswerCheck(day, index, task.answer, newAnswers);
            await userAPI.saveAnswer(day, index, value, isCorrectAnswer);
          }
        } catch (error) {
          console.log('Background answer sync failed');
        }
      }, 500);
    }
  };

  const getDayProgress = (day, tasks) => {
    if (!tasks || !Array.isArray(tasks)) return 0;
    
    const correctCount = tasks.filter((task, index) =>
      isCorrectAnswerCheck(day, index, task.answer, answers)
    ).length;
    
    return tasks.length > 0 ? Math.round((correctCount / tasks.length) * 100) : 0;
  };

  const getTotalProgress = () => {
    let totalCorrect = 0;
    let totalTasks = 0;

    tests.forEach(dayData => {
      if (dayData.tasks && Array.isArray(dayData.tasks)) {
        dayData.tasks.forEach((task, index) => {
          totalTasks++;
          if (isCorrectAnswerCheck(dayData.day, index, task.answer, answers)) {
            totalCorrect++;
          }
        });
      }
    });

    return totalTasks > 0 ? Math.round((totalCorrect / totalTasks) * 100) : 0;
  };

  // 🟢 КРИТИЧЕСКОЕ ИСПРАВЛЕНИЕ: Убрали resetProgress из БД
  const resetProgress = async () => {
    try {
      console.log('🔄 Локальный сброс прогресса (БД не затрагивается)');
      
      const userTests = courseStructure.map(day => ({
        day: day.day,
        titleKey: day.titleKey,
        theoryLink: day.theoryLink,
        tasks: taskGenerators[day.generator] ? taskGenerators[day.generator](day.taskCount, t) : []
      })).filter(day => day.tasks.length > 0);
      
      setTests(userTests);
      setAnswers({});
      
      localStorage.setItem('userMathTests', JSON.stringify(userTests));
      localStorage.setItem('userMathAnswers', JSON.stringify({}));
      
      if (user && user.isLoggedIn) {
        setTimeout(async () => {
          try {
            // 🟢 УБРАЛИ: await courseAPI.resetProgress(); - больше не сбрасываем БД
            console.log('💾 Сохраняем новые задания в БД...');
            for (const dayData of userTests) {
              await userAPI.saveTasks(dayData.day, dayData.tasks);
            }
            console.log('✅ Новые задания сохранены в БД');
          } catch (error) {
            console.log('Background reset sync failed');
          }
        }, 500);
      }
      
    } catch (error) {
      console.error('Error resetting progress:', error);
    }
  };

  const handleLoginClick = () => {
    setShowLogin(true);
    setAuthError('');
  };

  const handleRegisterClick = () => {
    setShowRegister(true);
    setAuthError('');
  };

  const handleDayClick = (dayNumber) => {
    setCurrentDay(dayNumber);
    const element = document.getElementById(`day-${dayNumber}`);
    if (element) {
      const headerOffset = 340;
      const elementPosition = element.offsetTop;
      const offsetPosition = elementPosition - headerOffset;

      setTimeout(() => {
        window.scrollTo({
          top: Math.max(0, offsetPosition),
          behavior: 'smooth'
        });
      }, 50);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">{t('loading', "Загрузка...")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
      <Header 
        user={user || { name: t('header.guest', "Гость"), isLoggedIn: false }}
        progress={getTotalProgress()}
        onResetClick={() => setShowResetConfirm(true)}
        onSettingsClick={() => console.log("Settings clicked")}
        onLoginClick={handleLoginClick}
        onLogoutClick={handleLogout}
        grade="6"
      />

      {showLogin && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Login 
            onLogin={handleLogin} 
            onSwitchToRegister={() => { 
              setShowLogin(false); 
              setShowRegister(true); 
              setAuthError('');
            }}
            error={authError}
          />
        </div>
      )}

      {showRegister && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <Register 
            onRegister={handleRegister} 
            onSwitchToLogin={() => { 
              setShowRegister(false); 
              setShowLogin(true); 
              setAuthError('');
            }}
            error={authError}
          />
        </div>
      )}

      {user && user.isLoggedIn && tests.length > 0 && (
        <DayNavigation 
          days={tests.map(day => ({
            ...day,
            progress: getDayProgress(day.day, day.tasks)
          }))}
          currentDay={currentDay}
          onDayClick={handleDayClick}
        />
      )}

      {user && user.isLoggedIn ? (
        <div className="container mx-auto p-14 max-w-4xl">
          <div className="grid gap-16">
            {tests.map(dayData => {
              const dayProgress = getDayProgress(dayData.day, dayData.tasks);
              
              return (
                <div key={dayData.day} id={`day-${dayData.day}`} className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1 min-w-0">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {t('days.day', "День")} {dayData.day}
                      </h2>
                      <p className="text-lg text-gray-800 dark:text-gray-200 font-medium">
                        {t(dayData.titleKey)}
                      </p>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-1 flex-shrink-0">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                          {dayProgress}%
                        </span>
                        <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${dayProgress}%` }}
                          />
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {dayData.tasks?.length || 0} {t('days.tasks', "заданий")}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    {dayData.tasks?.map((task, index) => {
                      const isAnswerCorrect = isCorrectAnswerCheck(dayData.day, index, task.answer, answers);
                      const hasAnswer = answers[`${dayData.day}-${index}`];
                      
                      return (
                        <div key={index} className={`p-4 rounded-lg ${
                          hasAnswer 
                            ? isAnswerCorrect 
                              ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                              : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                            : 'bg-gray-50 dark:bg-gray-700'
                        }`}>
                          <div className="flex items-center space-x-3">
                            <span className="flex-1 text-gray-800 dark:text-gray-200">
                              <strong>{t('tasks.task', "Задача")} {index + 1}:</strong> {task.question}
                            </span>

                            <div className="flex items-center space-x-2">
                              <input
                                type="text"
                                placeholder={t('answer', "Ответ")}
                                value={answers[`${dayData.day}-${index}`] || ""}
                                onChange={e => handleAnswerChange(dayData.day, index, e.target.value)}
                                className="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-center"
                              />
                              {hasAnswer && (
                                isAnswerCorrect ? (
                                  <span className="text-green-500 text-xl" title={t('correct', "Правильно!")}>✅</span>
                                ) : (
                                  <span className="text-red-500 text-xl" title={t('try_again', "Попробуйте еще раз")}>❌</span>
                                )
                              )}
                            </div>
                          </div>
                          
                          {task.answerFormat && (
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                              💡 {t('answerFormat.hint', "Формат ответа")}: {task.answerFormat}
                            </div>
                          )}
                          
                          {hasAnswer && !isAnswerCorrect && task.explanation && (
                            <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                              <p className="text-sm text-blue-800 dark:text-blue-200">
                                💡 {task.explanation}
                              </p>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {dayData.theoryLink && (
                    <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                      <a
                        href={dayData.theoryLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 dark:text-blue-400 hover:underline text-sm flex items-center"
                      >
                        📖 {t('days.theory', "Теоретические материалы")} "{t(dayData.titleKey)}"
                      </a>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-8 text-center text-gray-500 dark:text-gray-400 text-sm">
            <p>{t('footer.course_description', "Курс для закрепления знаний по математике за 6 класс")}</p>
            <p>© 2025 Math Academy | {t('footer.generated', "Задания генерируются случайно")}</p>
          </div>
        </div>
      ) : (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-2xl mx-auto">
            <div className="mb-8 flex justify-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-6xl">
                📚
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              {t('auth.welcome', "Добро пожаловать в Math Academy!")}
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto leading-relaxed">
              {t('auth.prompt', "Войдите или зарегистрируйтесь чтобы начать обучение")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={handleLoginClick}
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors shadow-lg"
              >
                {t('header.login', "Войти")}
              </button>
              <button
                onClick={handleRegisterClick}
                className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium text-lg transition-colors shadow-lg"
              >
                {t('header.register', "Регистрация")}
              </button>
            </div>
            
            <div className="border-t border-gray-200 dark:border-gray-700 pt-8">
              <p className="text-lg text-gray-500 dark:text-gray-400 italic">
                {t('slogan', "От математических основ к образовательной экосистеме! 🚀")}
              </p>
            </div>
          </div>
        </div>
      )}

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 m-4 max-w-md w-full">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
              🔄 {t('reset.new_tasks', "Новые задания")}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              {t('reset.confirmation', "Вы уверены, что хотите сгенерировать новые задания? Весь текущий прогресс будет сброшен.")}
            </p>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                {t('reset.cancel', "Отмена")}
              </button>
              <button
                onClick={() => {
                  resetProgress();
                  setShowResetConfirm(false);
                }}
                className="flex-1 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
              >
                {t('reset.generate', "Сгенерировать")}
              </button>
            </div>
          </div>
        </div>
      )}

      {showScrollTop && (
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-500 rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          aria-label="Наверх"
        >
          ↑
        </button>
      )}
    </div>
  );
}

export default App;
