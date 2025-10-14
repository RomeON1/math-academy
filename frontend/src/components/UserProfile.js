import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { courseAPI } from '../services/api';

const UserProfile = ({ user, onClose, onGradeChange, onSubjectChange }) => {
  const { t } = useTranslation();
  const [currentGrade, setCurrentGrade] = useState(user?.grade || 6);
  const [currentSubject, setCurrentSubject] = useState(user?.current_subject || 'математика');
  const [gradeHistory, setGradeHistory] = useState([]);
  const [subjectHistory, setSubjectHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [activeSection, setActiveSection] = useState('profile');
  
  // Новые состояния для полей профиля
  const [profileData, setProfileData] = useState({
    parent_name: '',
    parent_email: '',
    age: '',
    school: '',
    real_grade: '',
    city: '',
    teachers: []
  });

  // Состояния для формы добавления преподавателя
  const [newTeacher, setNewTeacher] = useState({
    teacher_name: '',
    subject: 'математика',
    custom_subject: ''
  });

  // Состояние для ошибок валидации
  const [errors, setErrors] = useState({});

  // Состояния для аккордеонов
  const [isTeachersExpanded, setIsTeachersExpanded] = useState(false);
  const [isGradeHistoryExpanded, setIsGradeHistoryExpanded] = useState(false);
  const [isSubjectHistoryExpanded, setIsSubjectHistoryExpanded] = useState(false);

  // Список доступных предметов
  const availableSubjects = [
    { value: 'математика', label: t('profile.subjects.mathematics') },
    { value: 'физика', label: t('profile.subjects.physics') },
    { value: 'химия', label: t('profile.subjects.chemistry') },
    { value: 'биология', label: t('profile.subjects.biology') },
    { value: 'русский язык', label: t('profile.subjects.russian') },
    { value: 'немецкий язык', label: t('profile.subjects.german') },
    { value: 'английский язык', label: t('profile.subjects.english') },
    { value: 'информатика', label: t('profile.subjects.computer_science') }
  ];

  useEffect(() => {
    if (user) {
      setCurrentGrade(user.grade);
      setCurrentSubject(user.current_subject || 'математика');
      fetchGradeHistory();
      fetchSubjectHistory();
      loadUserProfile();
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

  const fetchSubjectHistory = async () => {
    try {
      const response = await courseAPI.getSubjectHistory(user.id);
      setSubjectHistory(response.data);
    } catch (error) {
      console.error('Error fetching subject history:', error);
      // Если endpoint ещё не реализован, используем mock данные
      setSubjectHistory([
        { id: 1, subject: user.current_subject || 'математика', start_date: new Date().toISOString() }
      ]);
    }
  };

  const loadUserProfile = async () => {
    try {
      // Загружаем данные профиля из API
      const userResponse = await courseAPI.getUserProfile(user.id);
      const userData = userResponse.data;
      
      // Загружаем преподавателей
      const teachersResponse = await courseAPI.getUserTeachers(user.id);
      const teachersData = teachersResponse.data;

      setProfileData({
        parent_name: userData.parent_name || '',
        parent_email: userData.parent_email || '',
        age: userData.age || '',
        school: userData.school || '',
        real_grade: userData.real_grade || '',
        city: userData.city || '',
        teachers: teachersData || []
      });
    } catch (error) {
      console.error('Error loading user profile:', error);
      // Если API не доступно, используем данные из user props
      setProfileData({
        parent_name: user.parent_name || '',
        parent_email: user.parent_email || '',
        age: user.age || '',
        school: user.school || '',
        real_grade: user.real_grade || '',
        city: user.city || '',
        teachers: user.teachers || []
      });
    }
  };

  const validateAge = (age) => {
    if (!age) return true; // Пустое значение допустимо
    const ageNum = parseInt(age);
    return ageNum >= 5 && ageNum <= 90;
  };

  const validateRealGrade = (grade) => {
    if (!grade) return true; // Пустое значение допустимо
    const gradeNum = parseInt(grade);
    return gradeNum >= 1 && gradeNum <= 11;
  };

  const handleGradeChange = async () => {
    if (currentGrade === user.grade) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      await courseAPI.updateUserGrade(user.id, currentGrade);
      setMessage(t('profile.gradeUpdated'));
      if (onGradeChange) {
        onGradeChange(currentGrade);
      }
      await fetchGradeHistory();
    } catch (error) {
      setMessage(t('profile.updateError'));
      console.error('Error updating grade:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubjectChange = async () => {
    if (currentSubject === user.current_subject) return;
    
    setLoading(true);
    setMessage('');
    
    try {
      await courseAPI.updateUserSubject(user.id, currentSubject);
      setMessage(t('profile.subjectUpdated'));
      if (onSubjectChange) {
        onSubjectChange(currentSubject);
      }
      await fetchSubjectHistory();
    } catch (error) {
      setMessage(t('profile.updateError'));
      console.error('Error updating subject:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileFieldChange = (field, value) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));

    // Валидация в реальном времени
    if (field === 'age') {
      if (value && !validateAge(value)) {
        setErrors(prev => ({ ...prev, age: 'Возраст должен быть от 5 до 90 лет' }));
      } else {
        setErrors(prev => ({ ...prev, age: null }));
      }
    }

    if (field === 'real_grade') {
      if (value && !validateRealGrade(value)) {
        setErrors(prev => ({ ...prev, real_grade: 'Класс должен быть от 1 до 11' }));
      } else {
        setErrors(prev => ({ ...prev, real_grade: null }));
      }
    }
  };

  const handleTeacherFieldChange = (field, value) => {
    setNewTeacher(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddTeacher = async () => {
    if (!newTeacher.teacher_name.trim()) return;
    
    setLoading(true);
    try {
      const teacherData = {
        teacher_name: newTeacher.teacher_name.trim(),
        subject: newTeacher.subject,
        custom_subject: newTeacher.subject === 'другой' ? newTeacher.custom_subject.trim() : null
      };

      const response = await courseAPI.addUserTeacher(user.id, teacherData);
      
      // Добавляем преподавателя в локальное состояние
      setProfileData(prev => ({
        ...prev,
        teachers: [...prev.teachers, response.data]
      }));
      
      // Сброс формы
      setNewTeacher({
        teacher_name: '',
        subject: 'математика',
        custom_subject: ''
      });
      
      setMessage(t('profile.teacherAdded'));
    } catch (error) {
      setMessage(t('profile.teacherAddError'));
      console.error('Error adding teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveTeacher = async (teacherId) => {
    setLoading(true);
    try {
      await courseAPI.removeUserTeacher(user.id, teacherId);
      
      // Удаляем преподавателя из локального состояния
      setProfileData(prev => ({
        ...prev,
        teachers: prev.teachers.filter(teacher => teacher.id !== teacherId)
      }));
      
      setMessage(t('profile.teacherRemoved'));
    } catch (error) {
      setMessage(t('profile.teacherRemoveError'));
      console.error('Error removing teacher:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSaveProfile = async () => {
    // Проверка валидации перед сохранением
    if (errors.age || errors.real_grade) {
      setMessage(t('profile.fixErrors'));
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      // Подготавливаем данные для отправки
      const profileUpdateData = {
        parent_name: profileData.parent_name || null,
        parent_email: profileData.parent_email || null,
        age: profileData.age ? parseInt(profileData.age) : null,
        school: profileData.school || null,
        real_grade: profileData.real_grade ? parseInt(profileData.real_grade) : null,
        city: profileData.city || null
      };

      await courseAPI.updateUserProfile(user.id, profileUpdateData);
      setMessage(t('profile.profileSaved'));
    } catch (error) {
      setMessage(t('profile.profileSaveError'));
      console.error('Error saving profile:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!user) return null;

  // ===== РАЗДЕЛЫ ЛИЧНОГО КАБИНЕТА =====

  const renderProfileSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">👤 {t('profile.title')}</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Имя пользователя */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.username')}
          </label>
          <div className="text-lg font-semibold text-gray-900 dark:text-white p-2 bg-gray-50 dark:bg-gray-700 rounded">
            {user.username}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.email')}
          </label>
          <div className="text-lg font-semibold text-gray-900 dark:text-white p-2 bg-gray-50 dark:bg-gray-700 rounded">
            {user.email}
          </div>
        </div>

        {/* Родитель/опекун */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.parentName')} {t('profile.optional')}
          </label>
          <input
            type="text"
            value={profileData.parent_name}
            onChange={(e) => handleProfileFieldChange('parent_name', e.target.value)}
            placeholder={t('profile.parentNamePlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={loading}
          />
        </div>

        {/* Email родителя/опекуна */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.parentEmail')} {t('profile.optional')}
          </label>
          <input
            type="email"
            value={profileData.parent_email}
            onChange={(e) => handleProfileFieldChange('parent_email', e.target.value)}
            placeholder="email@example.com"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={loading}
          />
        </div>

        {/* Возраст */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.age')} {t('profile.optional')}
          </label>
          <input
            type="number"
            min="5"
            max="90"
            value={profileData.age}
            onChange={(e) => handleProfileFieldChange('age', e.target.value)}
            placeholder={t('profile.agePlaceholder')}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.age 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            disabled={loading}
          />
          {errors.age && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.age}</p>
          )}
        </div>

        {/* Город/регион */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.city')} {t('profile.optional')}
          </label>
          <input
            type="text"
            value={profileData.city}
            onChange={(e) => handleProfileFieldChange('city', e.target.value)}
            placeholder={t('profile.cityPlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={loading}
          />
        </div>

        {/* Школа */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.school')} {t('profile.optional')}
          </label>
          <input
            type="text"
            value={profileData.school}
            onChange={(e) => handleProfileFieldChange('school', e.target.value)}
            placeholder={t('profile.schoolPlaceholder')}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            disabled={loading}
          />
        </div>

        {/* Реальный класс в школе */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            {t('profile.realGrade')} {t('profile.optional')}
          </label>
          <input
            type="number"
            min="1"
            max="11"
            value={profileData.real_grade}
            onChange={(e) => handleProfileFieldChange('real_grade', e.target.value)}
            placeholder={t('profile.realGradePlaceholder')}
            className={`w-full px-3 py-2 border rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white ${
              errors.real_grade 
                ? 'border-red-500 dark:border-red-400' 
                : 'border-gray-300 dark:border-gray-600'
            }`}
            disabled={loading}
          />
          {errors.real_grade && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.real_grade}</p>
          )}
        </div>

        {/* Блок управления классом - ТЕПЕРЬ 1/2 ШИРИНЫ */}
        <div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 h-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('profile.currentGrade')}
            </label>
            <div className="flex flex-col gap-3 mb-4">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={currentGrade}
                onChange={(e) => setCurrentGrade(parseInt(e.target.value))}
                disabled={loading}
              >
                {Array.from({ length: 11 }, (_, i) => i + 1).map(grade => (
                  <option key={grade} value={grade}>
                    {t('profile.grade')} {grade}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleGradeChange}
                disabled={loading || currentGrade === user.grade}
                className="w-full px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded-lg font-medium transition-colors"
              >
                {loading ? t('profile.updating') : t('profile.updateGrade')}
              </button>
            </div>
            
            {/* История классов внутри того же блока - АККОРДЕОН */}
            {gradeHistory.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                {/* Заголовок аккордеона истории классов */}
                <button
                  onClick={() => setIsGradeHistoryExpanded(!isGradeHistoryExpanded)}
                  className="w-full text-left flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('profile.gradeHistory')}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transform transition-transform ${
                      isGradeHistoryExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Контент истории классов */}
                {isGradeHistoryExpanded && (
                  <div className="mt-2 space-y-1">
                    {gradeHistory.map((record, index) => (
                      <div key={record.id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-600 rounded text-sm">
                        <span className="text-gray-900 dark:text-white">
                          {t('profile.grade')} {record.grade}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(record.start_date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* НОВЫЙ БЛОК УПРАВЛЕНИЯ ПРЕДМЕТОМ - 1/2 ШИРИНЫ */}
        <div>
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600 h-full">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              {t('profile.currentSubject')}
            </label>
            <div className="flex flex-col gap-3 mb-4">
              <select
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white"
                value={currentSubject}
                onChange={(e) => setCurrentSubject(e.target.value)}
                disabled={loading}
              >
                {availableSubjects.map(subject => (
                  <option key={subject.value} value={subject.value}>
                    {subject.label}
                  </option>
                ))}
              </select>
              
              <button
                onClick={handleSubjectChange}
                disabled={loading || currentSubject === user.current_subject}
                className="w-full px-4 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg font-medium transition-colors"
              >
                {loading ? t('profile.changing') : t('profile.changeSubject')}
              </button>
            </div>
            
            {/* История предметов - АККОРДЕОН */}
            {subjectHistory.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                {/* Заголовок аккордеона истории предметов */}
                <button
                  onClick={() => setIsSubjectHistoryExpanded(!isSubjectHistoryExpanded)}
                  className="w-full text-left flex justify-between items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-lg transition-colors"
                >
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {t('profile.subjectHistory')}
                  </span>
                  <svg
                    className={`w-4 h-4 text-gray-500 transform transition-transform ${
                      isSubjectHistoryExpanded ? 'rotate-180' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Контент истории предметов */}
                {isSubjectHistoryExpanded && (
                  <div className="mt-2 space-y-1">
                    {subjectHistory.map((record, index) => (
                      <div key={record.id} className="flex justify-between items-center p-2 bg-white dark:bg-gray-600 rounded text-sm">
                        <span className="text-gray-900 dark:text-white">
                          {availableSubjects.find(s => s.value === record.subject)?.label || record.subject}
                        </span>
                        <span className="text-xs text-gray-500 dark:text-gray-400">
                          {new Date(record.start_date).toLocaleDateString()}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Преподаватели - АККОРДЕОН */}
        <div className="md:col-span-2">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 overflow-hidden">
            {/* Заголовок аккордеона */}
            <button
              onClick={() => setIsTeachersExpanded(!isTeachersExpanded)}
              className="w-full px-4 py-3 text-left flex justify-between items-center hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
            >
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                {t('profile.teachers')} {t('profile.optional')}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transform transition-transform ${
                  isTeachersExpanded ? 'rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>

            {/* Контент аккордеона */}
            {isTeachersExpanded && (
              <div className="px-4 pb-4 space-y-4">
                {/* Список преподавателей */}
                {profileData.teachers.length > 0 && (
                  <div className="space-y-2">
                    {profileData.teachers.map((teacher) => (
                      <div key={teacher.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-600 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="font-medium text-gray-900 dark:text-white">
                            {teacher.teacher_name}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">
                            {teacher.subject === 'другой' ? teacher.custom_subject : t(`profile.subjects.${getSubjectKey(teacher.subject)}`)}
                          </span>
                        </div>
                        <button
                          onClick={() => handleRemoveTeacher(teacher.id)}
                          disabled={loading}
                          className="text-red-500 hover:text-red-700 disabled:text-red-300 text-sm p-1"
                          title={t('profile.removeTeacher')}
                        >
                          ❌
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Форма добавления преподавателя */}
                <div className="bg-white dark:bg-gray-600 rounded-lg p-4 space-y-3">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* ФИО преподавателя - 2/3 ширины */}
                    <div className="md:col-span-2">
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {t('profile.teacherName')}
                      </label>
                      <input
                        type="text"
                        value={newTeacher.teacher_name}
                        onChange={(e) => handleTeacherFieldChange('teacher_name', e.target.value)}
                        placeholder={t('profile.teacherNamePlaceholder')}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        disabled={loading}
                      />
                    </div>
                    
                    {/* Предмет - 1/3 ширины */}
                    <div>
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {t('profile.subject')}
                      </label>
                      <select
                        value={newTeacher.subject}
                        onChange={(e) => handleTeacherFieldChange('subject', e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                        disabled={loading}
                      >
                        <option value="математика">{t('profile.subjects.mathematics')}</option>
                        <option value="физика">{t('profile.subjects.physics')}</option>
                        <option value="химия">{t('profile.subjects.chemistry')}</option>
                        <option value="биология">{t('profile.subjects.biology')}</option>
                        <option value="русский язык">{t('profile.subjects.russian')}</option>
                        <option value="немецкий язык">{t('profile.subjects.german')}</option>
                        <option value="другой">{t('profile.subjects.other')}</option>
                      </select>
                    </div>
                  </div>

                  {/* Другой предмет - 1/3 ширины под полем предмет */}
                  {newTeacher.subject === 'другой' && (
                    <div className="flex justify-end">
                      <div className="w-1/3">
                        <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                          {t('profile.customSubject')}
                        </label>
                        <input
                          type="text"
                          value={newTeacher.custom_subject}
                          onChange={(e) => handleTeacherFieldChange('custom_subject', e.target.value)}
                          placeholder={t('profile.customSubjectPlaceholder')}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                          disabled={loading}
                        />
                      </div>
                    </div>
                  )}
                  
                  <button
                    onClick={handleAddTeacher}
                    disabled={loading || !newTeacher.teacher_name.trim()}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white rounded text-sm font-medium transition-colors"
                  >
                    {loading ? t('profile.adding') : t('profile.addTeacher')}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Кнопка сохранения профиля */}
      <div className="flex justify-end pt-4 border-t border-gray-200 dark:border-gray-600">
        <button
          onClick={handleSaveProfile}
          disabled={loading || errors.age || errors.real_grade}
          className="px-6 py-2 bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white rounded-lg font-medium transition-colors"
        >
          {loading ? t('profile.saving') : t('profile.saveProfile')}
        </button>
      </div>
    </div>
  );

  // Вспомогательная функция для получения ключа перевода предмета
  const getSubjectKey = (subject) => {
    const subjectMap = {
      'математика': 'mathematics',
      'физика': 'physics',
      'химия': 'chemistry',
      'биология': 'biology',
      'русский язык': 'russian',
      'немецкий язык': 'german',
      'другой': 'other'
    };
    return subjectMap[subject] || 'other';
  };

  // Остальные разделы с переводами
  const renderProgressSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile.sections.progress')}</h2>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          {t('profile.sections.progressDevelopment')}
        </p>
      </div>
    </div>
  );

  const renderAchievementsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile.sections.achievements')}</h2>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          {t('profile.sections.achievementsDevelopment')}
        </p>
      </div>
    </div>
  );

  const renderSettingsSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile.sections.settings')}</h2>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          {t('profile.sections.settingsDevelopment')}
        </p>
      </div>
    </div>
  );

  const renderCalendarSection = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{t('profile.sections.calendar')}</h2>
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
        <p className="text-yellow-800 dark:text-yellow-200">
          {t('profile.sections.calendarDevelopment')}
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
              {t('profile.title')}
            </h3>
            <nav className="space-y-2">
              {[
                { id: 'profile', label: t('profile.sections.profile') },
                { id: 'progress', label: t('profile.sections.progress') },
                { id: 'achievements', label: t('profile.sections.achievements') },
                { id: 'settings', label: t('profile.sections.settings') },
                { id: 'calendar', label: t('profile.sections.calendar') }
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
            ← {t('profile.close')}
          </button>
        </div>

        {/* Мобильная навигация */}
        <div className="md:hidden bg-gray-50 dark:bg-gray-700 p-4 border-b border-gray-200 dark:border-gray-600">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('profile.title')}
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
