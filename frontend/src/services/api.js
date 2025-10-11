import axios from 'axios';

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
      console.log(`🔐 Добавлен токен в запрос: ${config.url}`);
    } else {
      console.log(`⚠️ Токен не найден для: ${config.url}`);
    }
    config.headers['Content-Type'] = 'application/json';
    config.headers['Accept'] = 'application/json';
    console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
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

export default api;
