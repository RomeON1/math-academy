import axios from 'axios';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

const getAPIBaseURL = () => {
  return '/api';
};

const API_BASE_URL = getAPIBaseURL();

const getToken = () => {
  return localStorage.getItem('authToken');
};

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  withCredentials: false,
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
      if (!IS_PRODUCTION) {
        console.log(`🔐 Добавлен токен в запрос: ${config.url}`);
      }
    } else if (!IS_PRODUCTION) {
      console.log(`⚠️ Токен не найден для: ${config.url}`);
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    if (!IS_PRODUCTION) {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request Interceptor Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Success: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error Details:', error);
    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (userData) => 
    api.post('/auth/register', userData).then(response => {
      console.log('✅ Регистрация успешна, сохраняем данные');
      const userDataToSave = {
        id: response.data.id,
        name: response.data.username,
        email: response.data.email,
        isLoggedIn: true
      };
      localStorage.setItem('userData', JSON.stringify(userDataToSave));
      return response;
    }),
  
  login: (credentials) => 
    api.post('/auth/login', credentials).then(response => {
      console.log('✅ Логин успешен, сохраняем токен и данные');
      
      if (response.data.access_token) {
        localStorage.setItem('authToken', response.data.access_token);
        console.log('🔐 Токен сохранен в localStorage');
      }
      
      const userDataToSave = {
        id: response.data.user_id,
        name: response.data.username,
        email: response.data.email,
        isLoggedIn: true
      };
      localStorage.setItem('userData', JSON.stringify(userDataToSave));
      
      return response;
    }),
  
  getMe: () => api.get('/auth/me'),
};

export const courseAPI = {
  getStructure: () => api.get('/course/structure'),
  generateTasks: (dayNumber) => api.get(`/course/day/${dayNumber}/tasks`),
  getProgress: () => api.get('/course/progress'),
  updateProgress: (day, answers, completed) => 
    api.post(`/course/progress/${day}`, { completed_tasks: completed }),
  resetProgress: () => api.post('/course/reset-progress'),
};

export const userAPI = {
  getAllTasks: () => api.get('/users/tasks'),
  getTasks: (day) => api.get(`/users/tasks/${day}`),
  
  // 🟢 ИСПРАВЛЕННЫЙ МЕТОД - преобразуем поля в правильный формат
  saveTasks: (day, tasks) => {
    console.log('💾 Сохраняем задания в БД:', { day, tasks });
    
    const formattedTasks = tasks.map(task => ({
      question: task.question || '',
      answer: task.answer || '',
      explanation: task.explanation || '',
      // 🟢 ПРЕОБРАЗУЕМ ПОЛЯ В snake_case
      answer_format: task.answerFormat || 'number',
      translation_key: task.translationKey || null,
      translation_params: task.translationParams || null,
      task_data: {
        explanationKey: task.explanationKey || null,
        explanationParams: task.explanationParams || null,
        formatKey: task.formatKey || null
      }
    }));
    
    console.log('📦 Отправляемые данные:', formattedTasks);
    return api.post(`/users/tasks/${day}`, formattedTasks);
  },
  
  getAnswers: () => api.get('/users/answers'),
  saveAnswer: (day, taskIndex, answer, isCorrect = false) => 
    api.post(`/users/answers/${day}/${taskIndex}`, { 
      answer, 
      is_correct: isCorrect 
    }),
};

// Методы для работы с классами
export const gradeAPI = {
  // Получить список доступных классов
  getAvailableGrades: () => {
    return api.get('/grades');
  },

  // Обновить класс пользователя
  updateUserGrade: (userId, newGrade) => {
    return api.post(`/users/${userId}/grade`, null, {
      params: { new_grade: newGrade }
    });
  },

  // Получить историю классов пользователя
  getGradeHistory: (userId) => {
    return api.get(`/users/${userId}/grade-history`);
  }
};

// Методы для работы с предметами
export const subjectAPI = {
  // Получить список доступных предметов
  getAvailableSubjects: () => {
    return api.get('/subjects');
  },

  // Обновить предмет пользователя
  updateUserSubject: (userId, newSubject) => {
    return api.post(`/users/${userId}/subject`, null, {
      params: { new_subject: newSubject }
    });
  },

  // Получить историю предметов пользователя
  getSubjectHistory: (userId) => {
    return api.get(`/users/${userId}/subject-history`);
  }
};

// НОВЫЕ МЕТОДЫ ДЛЯ ПРОФИЛЯ И ПРЕПОДАВАТЕЛЕЙ
export const profileAPI = {
  // Получить профиль пользователя
  getUserProfile: (userId) => {
    return api.get(`/users/${userId}/profile`);
  },

  // Обновить профиль пользователя
  updateUserProfile: (userId, profileData) => {
    return api.put(`/users/${userId}/profile`, profileData);
  },

  // Получить список преподавателей пользователя
  getUserTeachers: (userId) => {
    return api.get(`/users/${userId}/teachers`);
  },

  // Добавить преподавателя
  addUserTeacher: (userId, teacherData) => {
    return api.post(`/users/${userId}/teachers`, teacherData);
  },

  // Удалить преподавателя
  removeUserTeacher: (userId, teacherId) => {
    return api.delete(`/users/${userId}/teachers/${teacherId}`);
  },

  // Обновить список преподавателей
  updateUserTeachers: (userId, teachersData) => {
    return api.put(`/users/${userId}/teachers`, teachersData);
  }
};

// ФУНКЦИИ ДЛЯ СТАТИСТИКИ
export const statsAPI = {
  // Общая статистика
  getStatsOverview: () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) throw new Error('User not authenticated');
    return api.get(`/users/${user.id}/stats/overview`);
  },

  // Статистика прогресса по дням
  getStatsProgress: () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) throw new Error('User not authenticated');
    return api.get(`/users/${user.id}/stats/progress`);
  },

  // Статистика успеваемости
  getStatsPerformance: () => {
    const user = JSON.parse(localStorage.getItem('userData'));
    if (!user) throw new Error('User not authenticated');
    return api.get(`/users/${user.id}/stats/performance`);
  }

  // 🟢 УБРАН МЕТОД ДЛЯ СТАТИСТИКИ ПО ТИПАМ ЗАДАНИЙ
};

// Добавляем методы в courseAPI для обратной совместимости
courseAPI.updateUserGrade = gradeAPI.updateUserGrade;
courseAPI.getGradeHistory = gradeAPI.getGradeHistory;
courseAPI.getAvailableGrades = gradeAPI.getAvailableGrades;

// Добавляем методы предметов в courseAPI для обратной совместимости
courseAPI.updateUserSubject = subjectAPI.updateUserSubject;
courseAPI.getSubjectHistory = subjectAPI.getSubjectHistory;
courseAPI.getAvailableSubjects = subjectAPI.getAvailableSubjects;

// Добавляем методы профиля в courseAPI
courseAPI.getUserProfile = profileAPI.getUserProfile;
courseAPI.updateUserProfile = profileAPI.updateUserProfile;
courseAPI.getUserTeachers = profileAPI.getUserTeachers;
courseAPI.addUserTeacher = profileAPI.addUserTeacher;
courseAPI.removeUserTeacher = profileAPI.removeUserTeacher;
courseAPI.updateUserTeachers = profileAPI.updateUserTeachers;

// Добавляем методы статистики в courseAPI
courseAPI.getStatsOverview = statsAPI.getStatsOverview;
courseAPI.getStatsProgress = statsAPI.getStatsProgress;
courseAPI.getStatsPerformance = statsAPI.getStatsPerformance;

// 🟢 УБРАН МЕТОД ДЛЯ СТАТИСТИКИ ПО ТИПАМ ЗАДАНИЙ ИЗ courseAPI

export default api;
