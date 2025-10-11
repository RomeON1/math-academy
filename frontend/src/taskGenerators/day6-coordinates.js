// day6-coordinates.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const coordinatesGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Определение координат точки
        const x1 = getRandomInt(-5, 5);
        const y1 = getRandomInt(-5, 5);
        question = `Какие координаты у точки (${x1}, ${y1})?`;
        translationKey = 'tasks.coordinates.point_coordinates';
        translationParams = { x: x1, y: y1 };
        answer = `(${x1}, ${y1})`;
        explanation = `Точка имеет координаты (${x1}, ${y1}) - x=${x1}, y=${y1}`;
        explanationKey = 'tasks.coordinates.point_coordinates_explanation';
        explanationParams = { x: x1, y: y1 };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 2: // Построение точки по координатам
        const x2 = getRandomInt(-4, 4);
        const y2 = getRandomInt(-4, 4);
        const positionX = x2 > 0 ? 'правой' : 'левой';
        const positionY = y2 > 0 ? 'верхней' : 'нижней';
        question = `Постройте точку с координаты (${x2}, ${y2})`;
        translationKey = 'tasks.coordinates.plot_point';
        translationParams = { x: x2, y: y2 };
        answer = `Точка в ${positionX} части, ${positionY} половине`;
        explanation = `Точка (${x2}, ${y2}) находится в ${positionX} части и ${positionY} половине плоскости`;
        explanationKey = 'tasks.coordinates.plot_point_explanation';
        explanationParams = { x: x2, y: y2, positionX, positionY };
        answerFormat = "описание положения";
        formatKey = 'answerFormats.description';
        break;

      case 3: // Определение четверти
        const x3 = getRandomInt(-5, 5);
        const y3 = getRandomInt(-5, 5);
        let quarter3 = '';
        if (x3 > 0 && y3 > 0) quarter3 = 'I';
        else if (x3 < 0 && y3 > 0) quarter3 = 'II';
        else if (x3 < 0 && y3 < 0) quarter3 = 'III';
        else if (x3 > 0 && y3 < 0) quarter3 = 'IV';
        else quarter3 = 'на оси';
        
        question = `В какой четверти находится точка (${x3}, ${y3})?`;
        translationKey = 'tasks.coordinates.find_quarter';
        translationParams = { x: x3, y: y3 };
        answer = quarter3;
        explanation = `Точка (${x3}, ${y3}) находится ${quarter3 === 'на оси' ? 'на оси координат' : 'в ' + quarter3 + ' четверти'}`;
        explanationKey = 'tasks.coordinates.find_quarter_explanation';
        explanationParams = { x: x3, y: y3, quarter: quarter3 };
        answerFormat = "номер четверти (I,II,III,IV)";
        formatKey = 'answerFormats.quarter';
        break;

      case 4: // Расстояние между точками
        const x4_1 = getRandomInt(-3, 3);
        const y4_1 = getRandomInt(-3, 3);
        const x4_2 = getRandomInt(-3, 3);
        const y4_2 = getRandomInt(-3, 3);
        const distance4 = Math.sqrt(Math.pow(x4_2 - x4_1, 2) + Math.pow(y4_2 - y4_1, 2)).toFixed(2);
        question = `Найдите расстояние между точками (${x4_1}, ${y4_1}) и (${x4_2}, ${y4_2})`;
        translationKey = 'tasks.coordinates.distance_between';
        translationParams = { x1: x4_1, y1: y4_1, x2: x4_2, y2: y4_2 };
        answer = distance4;
        explanation = `Расстояние = √((${x4_2}-${x4_1})² + (${y4_2}-${y4_1})²) = ${distance4}`;
        explanationKey = 'tasks.coordinates.distance_between_explanation';
        explanationParams = { x1: x4_1, y1: y4_1, x2: x4_2, y2: y4_2, result: distance4 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 5: // Симметрия относительно оси X
        const x5 = getRandomInt(-4, 4);
        const y5 = getRandomInt(-4, 4);
        const symmetricX = `(${x5}, ${-y5})`;
        question = `Найдите точку, симметричную (${x5}, ${y5}) относительно оси X`;
        translationKey = 'tasks.coordinates.symmetry_x';
        translationParams = { x: x5, y: y5 };
        answer = symmetricX;
        explanation = `Симметрия относительно X: y меняет знак → ${symmetricX}`;
        explanationKey = 'tasks.coordinates.symmetry_x_explanation';
        explanationParams = { x: x5, y: y5, result: symmetricX };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 6: // Симметрия относительно оси Y
        const x6 = getRandomInt(-4, 4);
        const y6 = getRandomInt(-4, 4);
        const symmetricY = `(${-x6}, ${y6})`;
        question = `Найдите точку, симметричную (${x6}, ${y6}) относительно оси Y`;
        translationKey = 'tasks.coordinates.symmetry_y';
        translationParams = { x: x6, y: y6 };
        answer = symmetricY;
        explanation = `Симметрия относительно Y: x меняет знак → ${symmetricY}`;
        explanationKey = 'tasks.coordinates.symmetry_y_explanation';
        explanationParams = { x: x6, y: y6, result: symmetricY };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 7: // Симметрия относительно начала координат
        const x7 = getRandomInt(-4, 4);
        const y7 = getRandomInt(-4, 4);
        const symmetricOrigin = `(${-x7}, ${-y7})`;
        question = `Найдите точку, симметричную (${x7}, ${y7}) относительно начала координат`;
        translationKey = 'tasks.coordinates.symmetry_origin';
        translationParams = { x: x7, y: y7 };
        answer = symmetricOrigin;
        explanation = `Симметрия относительно (0,0): x и y меняют знак → ${symmetricOrigin}`;
        explanationKey = 'tasks.coordinates.symmetry_origin_explanation';
        explanationParams = { x: x7, y: y7, result: symmetricOrigin };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 8: // Точка на оси
        const axis8 = ['X', 'Y'][getRandomInt(0, 1)];
        const coord8 = getRandomInt(-5, 5);
        const point8 = axis8 === 'X' ? `(${coord8}, 0)` : `(0, ${coord8})`;
        question = `Запишите координаты точки на оси ${axis8} с координатой ${coord8}`;
        translationKey = 'tasks.coordinates.on_axis';
        translationParams = { axis: axis8, coord: coord8 };
        answer = point8;
        explanation = `На оси ${axis8} вторая координата равна 0 → ${point8}`;
        explanationKey = 'tasks.coordinates.on_axis_explanation';
        explanationParams = { axis: axis8, coord: coord8, result: point8 };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 9: // Определение по описанию
        const quadrants = [
          { q: 'I', desc: 'правая верхняя' },
          { q: 'II', desc: 'левая верхняя' },
          { q: 'III', desc: 'левая нижняя' },
          { q: 'IV', desc: 'правая нижняя' }
        ];
        const quadrant9 = quadrants[getRandomInt(0, 3)];
        question = `В какой четверти находятся точки с ${quadrant9.desc} четверти?`;
        translationKey = 'tasks.coordinates.by_description';
        translationParams = { description: quadrant9.desc };
        answer = quadrant9.q;
        explanation = `${quadrant9.desc} четверть → ${quadrant9.q} четверть`;
        explanationKey = 'tasks.coordinates.by_description_explanation';
        explanationParams = { description: quadrant9.desc, result: quadrant9.q };
        answerFormat = "номер четверти (I,II,III,IV)";
        formatKey = 'answerFormats.quarter';
        break;

      case 10: // Координаты вершин прямоугольника
        const x10 = getRandomInt(1, 3);
        const y10 = getRandomInt(1, 3);
        const width10 = getRandomInt(2, 4);
        const height10 = getRandomInt(2, 4);
        const vertices = [
          `(${x10},${y10})`,
          `(${x10+width10},${y10})`,
          `(${x10+width10},${y10+height10})`,
          `(${x10},${y10+height10})`
        ].join(', ');
        question = `Найдите координаты всех вершин прямоугольника с левым нижним углом (${x10}, ${y10}), шириной ${width10} и высотой ${height10}`;
        translationKey = 'tasks.coordinates.rectangle_vertices';
        translationParams = { x: x10, y: y10, width: width10, height: height10 };
        answer = vertices;
        explanation = `Вершины: (${x10},${y10}) → (+${width10},0) → (${x10+width10},${y10}) → (0,+${height10}) → (${x10+width10},${y10+height10})`;
        explanationKey = 'tasks.coordinates.rectangle_vertices_explanation';
        explanationParams = { x: x10, y: y10, width: width10, height: height10, result: vertices };
        answerFormat = "список координат через запятую";
        formatKey = 'answerFormats.coordinates_list';
        break;

      default:
        type = getRandomInt(1, 10);
        continue;
    }

    if (!usedQuestions.has(question)) {
      usedQuestions.add(question);
      tasks.push({ 
        question, 
        answer, 
        explanation, 
        answerFormat,
        translationKey,
        translationParams,
        explanationKey, 
        explanationParams,
        formatKey
      });
    }
  }
  return tasks;
};
