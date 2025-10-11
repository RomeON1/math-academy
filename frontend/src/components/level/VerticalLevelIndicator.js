import React from 'react';

const VerticalLevelIndicator = ({ progress = 0 }) => {
  const getBatteryLevel = (progress) => {
    if (progress >= 75) return 4;
    if (progress >= 50) return 3;
    if (progress >= 25) return 2;
    return 1;
  };

  const batteryLevel = getBatteryLevel(progress);
  const levelNames = ['', 'Новичок', 'Знаток', 'Эксперт', 'Мастер'];

  return (
    <div className="relative group" title={`Уровень: ${levelNames[batteryLevel]} (${progress}%)`}>
      <div className="flex items-center">
        <div className="flex flex-col-reverse space-y-0.5 space-y-reverse w-3 h-4 p-0.5 border border-gray-400 dark:border-gray-500 rounded-sm">
          <div className={`h-0.5 rounded-sm transition-all duration-300 ${
            batteryLevel >= 1 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          }`} />
          <div className={`h-0.5 rounded-sm transition-all duration-300 ${
            batteryLevel >= 2 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          }`} />
          <div className={`h-0.5 rounded-sm transition-all duration-300 ${
            batteryLevel >= 3 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          }`} />
          <div className={`h-0.5 rounded-sm transition-all duration-300 ${
            batteryLevel >= 4 ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'
          }`} />
        </div>
        <div className="w-0.5 h-0.5 bg-gray-400 dark:bg-gray-500 ml-0.5" />
      </div>

      <div className="absolute hidden group-hover:block top-full left-1/2 transform -translate-x-1/2 mt-1 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap z-50">
        Уровень: {levelNames[batteryLevel]} ({progress}%)
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-800" />
      </div>
    </div>
  );
};

export default VerticalLevelIndicator;
