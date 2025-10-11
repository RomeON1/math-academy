import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Импорт SVG иконок
import FractionsIcon from '../assets/images/percentage.svg';
import GeometryIcon from '../assets/images/triangle-ruler.svg';
import EquationsIcon from '../assets/images/close.svg';
import DecimalsIcon from '../assets/images/increase-the-scale.svg';
import RatiosIcon from '../assets/images/many-to-many.svg';
import CoordinatesIcon from '../assets/images/direction-adjustment.svg';
import CommonFractionsIcon from '../assets/images/chart-pie.svg';
import PercentagesIcon from '../assets/images/data-screen.svg';
import AreasIcon from '../assets/images/subtract-selection.svg';
import VolumesIcon from '../assets/images/stereo-perspective.svg';
import StatisticsIcon from '../assets/images/chart-histogram.svg';
import WordProblemsIcon from '../assets/images/text.svg';
import SymmetryIcon from '../assets/images/switch-contrast.svg';
import ReviewIcon from '../assets/images/cycle.svg';

import ScrollIcon from '../assets/images/move.svg';

const DayNavigation = ({ days, currentDay, onDayClick }) => {
  const { t } = useTranslation();
  const scrollContainerRef = useRef(null);
  const [canScroll, setCanScroll] = useState({ left: false, right: false });

  // Функция для получения иконки по типу дня
const getDayIcon = (dayNumber) => {
  const icons = {
    1: <img src={FractionsIcon} alt="Дроби" className="w-6 h-6 dark:invert dark:brightness-125" />,
    2: <img src={GeometryIcon} alt="Геометрия" className="w-6 h-6 dark:invert dark:brightness-125" />,
    3: <img src={EquationsIcon} alt="Уравнения" className="w-6 h-6 dark:invert dark:brightness-125" />,
    4: <img src={DecimalsIcon} alt="Десятичные" className="w-6 h-6 dark:invert dark:brightness-125" />,
    5: <img src={RatiosIcon} alt="Отношения" className="w-6 h-6 dark:invert dark:brightness-125" />,
    6: <img src={CoordinatesIcon} alt="Координаты" className="w-6 h-6 dark:invert dark:brightness-125" />,
    7: <img src={CommonFractionsIcon} alt="Обычные дроби" className="w-6 h-6 dark:invert dark:brightness-125" />,
    8: <img src={PercentagesIcon} alt="Проценты" className="w-6 h-6 dark:invert dark:brightness-125" />,
    9: <img src={AreasIcon} alt="Площади" className="w-6 h-6 dark:invert dark:brightness-125" />,
    10: <img src={VolumesIcon} alt="Объемы" className="w-6 h-6 dark:invert dark:brightness-125" />,
    11: <img src={StatisticsIcon} alt="Статистика" className="w-6 h-6 dark:invert dark:brightness-125" />,
    12: <img src={WordProblemsIcon} alt="Текстовые задачи" className="w-6 h-6 dark:invert dark:brightness-125" />,
    13: <img src={SymmetryIcon} alt="Симметрия" className="w-6 h-6 dark:invert dark:brightness-125" />,
    14: <img src={ReviewIcon} alt="Повторение" className="w-6 h-6 dark:invert dark:brightness-125" />
  };
  return icons[dayNumber] || <img src={FractionsIcon} alt="Математика" className="w-6 h-6 dark:invert dark:brightness-125" />;
};

  // Функция проверки возможности скролла
  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const canScrollLeft = container.scrollLeft > 0;
    const canScrollRight = container.scrollLeft < (container.scrollWidth - container.clientWidth - 5);

    setCanScroll({ left: canScrollLeft, right: canScrollRight });
  };

  // Эффект для проверки скролла
  useEffect(() => {
    checkScroll();
    
    const handleResize = () => {
      setTimeout(checkScroll, 100);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [days]);

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 200;
      scrollContainerRef.current.scrollLeft += direction * scrollAmount;
      setTimeout(checkScroll, 300);
    }
  };

  return (
    <div className="pt-16 md:pt-20 bg-gray-50 dark:bg-gray-900 relative sticky top-0 z-40 shadow-lg dark:shadow-gray-700/40 border-b border-gray-200 dark:border-gray-700">
      <div className="px-4 py-3">
        
        {/* Главный заголовок курса */}
        <div className="text-center mb-3 w-full">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            {t('course.title', "14-дневный курс для закрепления знаний по математике")}
          </h2>
        </div>
        
        {/* Обёртка для навигации */}
        <div className="relative w-full">

          {/* Контейнер с карточками дней */}
          <div 
            ref={scrollContainerRef}
            className={`day-navigation flex overflow-x-auto scrollbar-hide py-4 px-2 gap-2 group ${
              canScroll.left ? 'can-scroll-left' : ''
            } ${canScroll.right ? 'can-scroll-right' : ''}`}
            onScroll={checkScroll}
            style={{ scrollBehavior: 'smooth' }}
          >
            {days.map(dayData => (
              <div
                key={dayData.day}
                className={`day-card-nav flex-shrink-0 w-20 ${currentDay === dayData.day ? 'active' : ''} ${
                  dayData.progress === 100 ? 'completed' : ''
                }`}
                onClick={() => onDayClick(dayData.day)}
              >
                <div className="text-lg font-bold mb-1 text-gray-900 dark:text-white">{dayData.day}</div>
                <div className="text-xs opacity-75 text-gray-600 dark:text-gray-300 mb-1">{t('days.day')}</div>
		<div className="flex justify-center items-center mb-1 h-8 w-full">{getDayIcon(dayData.day)}</div>
                <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1 mt-1">
                  <div
                    className="bg-green-500 h-1 rounded-full transition-all duration-300"
                    style={{ width: `${dayData.progress || 0}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Умная навигация */}
          <div className="navigation-controls relative">
            {/* Десктоп - стрелки по бокам */}

	  <div className="hidden md:flex justify-between items-center absolute -bottom-[25px] left-0 right-0 px-8 z-50">
	    <button 
	      onClick={() => scroll(-1)}
	      className={`bg-white dark:bg-gray-100 rounded-full w-10 h-7 flex items-center justify-center shadow-lg border-2 border-gray-200 dark:border-gray-300 text-gray-600 dark:text-gray-700 transition-all duration-300 ${
	        canScroll.left ? 'opacity-100' : 'opacity-30 cursor-default'
	      }`}
	    >
	      ←
	    </button>
  
	    <button 
	      onClick={() => scroll(1)}
	      className={`bg-white dark:bg-gray-100 rounded-full w-10 h-7 flex items-center justify-center shadow-lg border-2 border-gray-200 dark:border-gray-300 text-gray-600 dark:text-gray-700 transition-all duration-300 ${
	        canScroll.right ? 'opacity-100' : 'opacity-30 cursor-default'
	      }`}
	    >
	      →
	    </button>
	  </div>


	    {/* Мобилка - индикатор по центру */}
	    <div className="md:hidden flex justify-center absolute -bottom-[27px] left-1/2 transform -translate-x-1/2 z-10">
	      <div className="animate-scroll-gentle bg-white dark:bg-gray-800 p-2 px-4 py-1 rounded-full border border-gray-200 dark:border-gray-600 shadow-lg">
	         <img 
	          src={ScrollIcon} 
	          alt="Листайте" 
	          className="w-5 h-5 dark:invert dark:brightness-125"
	        />
	      </div>
	    </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default DayNavigation;
