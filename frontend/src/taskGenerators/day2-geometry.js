// day2-geometry.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const geometryGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Периметр квадрата
        const side1 = getRandomInt(3, 12);
        const perimeter1 = side1 * 4;
        question = `Периметр квадрата со стороной ${side1} см?`;
        translationKey = 'tasks.geometry.perimeter_square';
        translationParams = { side: side1 };
        answer = perimeter1.toString();
        explanation = `Периметр = 4 × ${side1} = ${perimeter1} см`;
        explanationKey = 'tasks.geometry.perimeter_square_explanation';
        explanationParams = { side: side1, result: perimeter1 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 2: // Площадь прямоугольника
        const width2 = getRandomInt(4, 10);
        const height2 = getRandomInt(5, 15);
        const area2 = width2 * height2;
        question = `Площадь прямоугольника ${width2}×${height2} см?`;
        translationKey = 'tasks.geometry.area_rectangle';
        translationParams = { width: width2, height: height2 };
        answer = area2.toString();
        explanation = `Площадь = ${width2} × ${height2} = ${area2} см²`;
        explanationKey = 'tasks.geometry.area_rectangle_explanation';
        explanationParams = { width: width2, height: height2, result: area2 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 3: // Площадь треугольника
        const base3 = getRandomInt(6, 15);
        const height3 = getRandomInt(4, 12);
        const area3 = Math.round((base3 * height3) / 2);
        question = `Найдите площадь треугольника с основанием ${base3} см и высотой ${height3} см`;
        translationKey = 'tasks.geometry.area_triangle';
        translationParams = { base: base3, height: height3 };
        answer = area3.toString();
        explanation = `Площадь = (${base3} × ${height3}) / 2 = ${area3} см²`;
        explanationKey = 'tasks.geometry.area_triangle_explanation';
        explanationParams = { base: base3, height: height3, result: area3 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 4: // Длина окружности
        const radius4 = getRandomInt(2, 10);
        const circumference4 = Math.round(2 * 3.14 * radius4);
        question = `Длина окружности радиусом ${radius4} см (π≈3.14)?`;
        translationKey = 'tasks.geometry.circumference';
        translationParams = { radius: radius4 };
        answer = circumference4.toString();
        explanation = `Длина = 2 × 3.14 × ${radius4} = ${circumference4} см`;
        explanationKey = 'tasks.geometry.circumference_explanation';
        explanationParams = { radius: radius4, result: circumference4 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 5: // Площадь круга
        const radius5 = getRandomInt(3, 8);
        const area5 = Math.round(3.14 * radius5 * radius5);
        question = `Площадь круга радиусом ${radius5} см (π≈3.14)?`;
        translationKey = 'tasks.geometry.area_circle';
        translationParams = { radius: radius5 };
        answer = area5.toString();
        explanation = `Площадь = 3.14 × ${radius5}² = ${area5} см²`;
        explanationKey = 'tasks.geometry.area_circle_explanation';
        explanationParams = { radius: radius5, result: area5 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 6: // Объем куба
        const edge6 = getRandomInt(2, 7);
        const volume6 = edge6 * edge6 * edge6;
        question = `Объем куба с ребром ${edge6} см?`;
        translationKey = 'tasks.geometry.volume_cube';
        translationParams = { edge: edge6 };
        answer = volume6.toString();
        explanation = `Объем = ${edge6} × ${edge6} × ${edge6} = ${volume6} см³`;
        explanationKey = 'tasks.geometry.volume_cube_explanation';
        explanationParams = { edge: edge6, result: volume6 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 7: // Углы треугольника
        const angle17 = getRandomInt(30, 70);
        const angle27 = getRandomInt(30, 70);
        const angle37 = 180 - angle17 - angle27;
        question = `Два угла треугольника равны ${angle17}° и ${angle27}°. Найдите третий угол.`;
        translationKey = 'tasks.geometry.triangle_angles';
        translationParams = { angle1: angle17, angle2: angle27 };
        answer = angle37.toString();
        explanation = `Сумма углов = 180°, третий угол = 180 - ${angle17} - ${angle27} = ${angle37}°`;
        explanationKey = 'tasks.geometry.triangle_angles_explanation';
        explanationParams = { angle1: angle17, angle2: angle27, result: angle37 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 8: // Периметр треугольника
        const side18 = getRandomInt(5, 12);
        const side28 = getRandomInt(6, 14);
        const side38 = getRandomInt(7, 16);
        const perimeter8 = side18 + side28 + side38;
        question = `Периметр треугольника со сторонами ${side18} см, ${side28} см и ${side38} см?`;
        translationKey = 'tasks.geometry.perimeter_triangle';
        translationParams = { side1: side18, side2: side28, side3: side38 };
        answer = perimeter8.toString();
        explanation = `Периметр = ${side18} + ${side28} + ${side38} = ${perimeter8} см`;
        explanationKey = 'tasks.geometry.perimeter_triangle_explanation';
        explanationParams = { side1: side18, side2: side28, side3: side38, result: perimeter8 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 9: // Объем прямоугольного параллелепипеда
        const length9 = getRandomInt(4, 10);
        const width9 = getRandomInt(3, 8);
        const height9 = getRandomInt(5, 12);
        const volume9 = length9 * width9 * height9;
        question = `Объем прямоугольного параллелепипеда ${length9}×${width9}×${height9} см?`;
        translationKey = 'tasks.geometry.volume_rectangular';
        translationParams = { length: length9, width: width9, height: height9 };
        answer = volume9.toString();
        explanation = `Объем = ${length9} × ${width9} × ${height9} = ${volume9} см³`;
        explanationKey = 'tasks.geometry.volume_rectangular_explanation';
        explanationParams = { length: length9, width: width9, height: height9, result: volume9 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 10: // Диаметр окружности
        const radius10 = getRandomInt(3, 12);
        const diameter10 = radius10 * 2;
        question = `Диаметр окружности радиусом ${radius10} см?`;
        translationKey = 'tasks.geometry.diameter';
        translationParams = { radius: radius10 };
        answer = diameter10.toString();
        explanation = `Диаметр = 2 × ${radius10} = ${diameter10} см`;
        explanationKey = 'tasks.geometry.diameter_explanation';
        explanationParams = { radius: radius10, result: diameter10 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
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
