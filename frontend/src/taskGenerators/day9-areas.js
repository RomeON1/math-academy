// day9-areas.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const areasGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Площадь квадрата
        const side1 = getRandomInt(3, 12);
        const area1 = side1 * side1;
        question = `Найдите площадь квадрата со стороной ${side1} см`;
        translationKey = 'tasks.areas.square';
        translationParams = { side: side1 };
        answer = area1.toString();
        explanation = `Площадь квадрата = сторона² = ${side1} × ${side1} = ${area1} см²`;
        explanationKey = 'tasks.areas.square_explanation';
        explanationParams = { side: side1, result: area1 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 2: // Площадь прямоугольника
        const length2 = getRandomInt(5, 15);
        const width2 = getRandomInt(3, 10);
        const area2 = length2 * width2;
        question = `Найдите площадь прямоугольника ${length2}×${width2} см`;
        translationKey = 'tasks.areas.rectangle';
        translationParams = { length: length2, width: width2 };
        answer = area2.toString();
        explanation = `Площадь прямоугольника = длина × ширина = ${length2} × ${width2} = ${area2} см²`;
        explanationKey = 'tasks.areas.rectangle_explanation';
        explanationParams = { length: length2, width: width2, result: area2 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 3: // Площадь треугольника
        const base3 = getRandomInt(6, 15);
        const height3 = getRandomInt(4, 12);
        const area3 = Math.round((base3 * height3) / 2);
        question = `Найдите площадь треугольника с основанием ${base3} см и высотой ${height3} см`;
        translationKey = 'tasks.areas.triangle';
        translationParams = { base: base3, height: height3 };
        answer = area3.toString();
        explanation = `Площадь треугольника = (основание × высота) / 2 = (${base3} × ${height3}) / 2 = ${area3} см²`;
        explanationKey = 'tasks.areas.triangle_explanation';
        explanationParams = { base: base3, height: height3, result: area3 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 4: // Площадь круга
        const radius4 = getRandomInt(2, 8);
        const area4 = Math.round(3.14 * radius4 * radius4);
        question = `Найдите площадь круга радиусом ${radius4} см (π≈3.14)`;
        translationKey = 'tasks.areas.circle';
        translationParams = { radius: radius4 };
        answer = area4.toString();
        explanation = `Площадь круга = π × радиус² = 3.14 × ${radius4}² = ${area4} см²`;
        explanationKey = 'tasks.areas.circle_explanation';
        explanationParams = { radius: radius4, result: area4 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 5: // Площадь параллелограмма
        const base5 = getRandomInt(5, 12);
        const height5 = getRandomInt(4, 10);
        const area5 = base5 * height5;
        question = `Найдите площадь параллелограмма с основанием ${base5} см и высотой ${height5} см`;
        translationKey = 'tasks.areas.parallelogram';
        translationParams = { base: base5, height: height5 };
        answer = area5.toString();
        explanation = `Площадь параллелограмма = основание × высота = ${base5} × ${height5} = ${area5} см²`;
        explanationKey = 'tasks.areas.parallelogram_explanation';
        explanationParams = { base: base5, height: height5, result: area5 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 6: // Площадь ромба
        const diagonal1_6 = getRandomInt(4, 10);
        const diagonal2_6 = getRandomInt(6, 12);
        const area6 = Math.round((diagonal1_6 * diagonal2_6) / 2);
        question = `Найдите площадь ромба с диагоналями ${diagonal1_6} см и ${diagonal2_6} см`;
        translationKey = 'tasks.areas.rhombus';
        translationParams = { diagonal1: diagonal1_6, diagonal2: diagonal2_6 };
        answer = area6.toString();
        explanation = `Площадь ромба = (диагональ₁ × диагональ₂) / 2 = (${diagonal1_6} × ${diagonal2_6}) / 2 = ${area6} см²`;
        explanationKey = 'tasks.areas.rhombus_explanation';
        explanationParams = { diagonal1: diagonal1_6, diagonal2: diagonal2_6, result: area6 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 7: // Площадь трапеции
        const base1_7 = getRandomInt(5, 10);
        const base2_7 = getRandomInt(8, 15);
        const height7 = getRandomInt(4, 8);
        const area7 = Math.round(((base1_7 + base2_7) / 2) * height7);
        question = `Найдите площадь трапеции с основаниями ${base1_7} см и ${base2_7} см и высотой ${height7} см`;
        translationKey = 'tasks.areas.trapezoid';
        translationParams = { base1: base1_7, base2: base2_7, height: height7 };
        answer = area7.toString();
        explanation = `Площадь трапеции = (основание₁ + основание₂) / 2 × высота = (${base1_7} + ${base2_7}) / 2 × ${height7} = ${area7} см²`;
        explanationKey = 'tasks.areas.trapezoid_explanation';
        explanationParams = { base1: base1_7, base2: base2_7, height: height7, result: area7 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 8: // Площадь составной фигуры (прямоугольник + треугольник)
        const rectWidth8 = getRandomInt(6, 10);
        const rectHeight8 = getRandomInt(4, 8);
        const triangleHeight8 = getRandomInt(3, 6);
        const areaRect8 = rectWidth8 * rectHeight8;
        const areaTriangle8 = Math.round((rectWidth8 * triangleHeight8) / 2);
        const totalArea8 = areaRect8 + areaTriangle8;
        question = `Найдите площадь фигуры: прямоугольник ${rectWidth8}×${rectHeight8} см с треугольником высотой ${triangleHeight8} см наверху`;
        translationKey = 'tasks.areas.composite_shape';
        translationParams = { width: rectWidth8, height: rectHeight8, triHeight: triangleHeight8 };
        answer = totalArea8.toString();
        explanation = `Площадь прямоугольника = ${rectWidth8} × ${rectHeight8} = ${areaRect8} см², площадь треугольника = (${rectWidth8} × ${triangleHeight8}) / 2 = ${areaTriangle8} см², общая площадь = ${areaRect8} + ${areaTriangle8} = ${totalArea8} см²`;
        explanationKey = 'tasks.areas.composite_shape_explanation';
        explanationParams = { width: rectWidth8, height: rectHeight8, triHeight: triangleHeight8, rectArea: areaRect8, triArea: areaTriangle8, result: totalArea8 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 9: // Площадь через периметр (квадрат)
        const perimeter9 = getRandomInt(20, 40);
        const side9 = perimeter9 / 4;
        const area9 = side9 * side9;
        question = `Периметр квадрата равен ${perimeter9} см. Найдите его площадь`;
        translationKey = 'tasks.areas.square_from_perimeter';
        translationParams = { perimeter: perimeter9 };
        answer = area9.toString();
        explanation = `Сторона = периметр / 4 = ${perimeter9} / 4 = ${side9} см, площадь = ${side9} × ${side9} = ${area9} см²`;
        explanationKey = 'tasks.areas.square_from_perimeter_explanation';
        explanationParams = { perimeter: perimeter9, side: side9, result: area9 };
        answerFormat = "число (в см²)";
        formatKey = 'answerFormats.cm2';
        break;

      case 10: // Сравнение площадей
        const sideA10 = getRandomInt(4, 8);
        const sideB10 = getRandomInt(5, 9);
        const areaA10 = sideA10 * sideA10;
        const areaB10 = sideB10 * sideB10;
        const comparisonResult = areaA10 > areaB10 ? "больше" : areaA10 < areaB10 ? "меньше" : "равны";
        question = `Сравните площади квадратов со сторонами ${sideA10} см и ${sideB10} см`;
        translationKey = 'tasks.areas.compare_areas';
        translationParams = { sideA: sideA10, sideB: sideB10 };
        answer = comparisonResult;
        explanation = `Площадь₁ = ${sideA10}² = ${areaA10} см², площадь₂ = ${sideB10}² = ${areaB10} см² → ${areaA10} ${comparisonResult} ${areaB10}`;
        explanationKey = 'tasks.areas.compare_areas_explanation';
        explanationParams = { side: sideA10, sideB: sideB10, areaA: areaA10, areaB: areaB10, result: comparisonResult };
        answerFormat = "больше/меньше/равно";
        formatKey = 'answerFormats.comparison';
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
