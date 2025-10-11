// day14-review.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const reviewGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Дроби - сокращение
        const num1 = getRandomInt(2, 8);
        const den1 = getRandomInt(3, 12);
        question = `Сократите дробь: ${num1 * 2}/${den1 * 2}`;
        translationKey = 'tasks.review.fractions';
        translationParams = { num: num1 * 2, den: den1 * 2 };
        answer = `${num1}/${den1}`;
        explanation = `Делим на 2: ${num1 * 2}/${den1 * 2} = ${num1}/${den1}`;
        explanationKey = 'tasks.review.fractions_explanation';
        explanationParams = { num: num1 * 2, den: den1 * 2, result: `${num1}/${den1}` };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 2: // Геометрия - площадь квадрата
        const side2 = getRandomInt(3, 12);
        const area2 = side2 * side2;
        question = `Найдите площадь квадрата со стороной ${side2} см`;
        translationKey = 'tasks.review.geometry';
        translationParams = { side: side2 };
        answer = area2.toString();
        explanation = `Площадь = ${side2} × ${side2} = ${area2} см²`;
        explanationKey = 'tasks.review.geometry_explanation';
        explanationParams = { side: side2, result: area2 };
        answerFormat = "число (в см²)";
        formatKey = 'answer极formats.cm2';
        break;

      case 3: // Уравнения
        const a3 = getRandomInt(2, 6);
        const b3 = getRandomInt(5, 20);
        const c3 = getRandomInt(25, 50);
        const result3 = Math.round((c3 - b3) / a3);
        question = `Решите уравнение: ${a3}x + ${b3} = ${c3}`;
        translationKey = 'tasks.review.equations';
        translationParams = { a: a3, b: b3, c: c3 };
        answer = result3.toString();
        explanation = `${a3}x = ${c3} - ${b3} = ${c3 - b3}, x = ${result3}`;
        explanationKey = 'tasks.review.equations_explanation';
        explanationParams = { a: a3, b: b3, c: c3, step: c3 - b3, result: result3 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 4: // Проценты
        const percent4 = getRandomInt(5, 25) * 5;
        const number4 = getRandomInt(100, 500);
        const result4 = Math.round((percent4 / 100) * number4);
        question = `Найдите ${percent4}% от числа ${number4}`;
        translationKey = 'tasks.review.percentages';
        translationParams = { percent: percent4, number: number4 };
        answer = result4.toString();
        explanation = `${percent4}% от ${number4} = (${percent4} × ${number4}) / 100 = ${result4}`;
        explanationKey = 'tasks.review.percentages_explanation';
        explanationParams = { percent: percent4, number: number4, result: result4 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 5: // Отношения
        const a5 = getRandomInt(2, 8);
        const b5 = getRandomInt(2, 8);
        question = `Запишите отношение ${a5} к ${b5}`;
        translationKey = 'tasks.review.ratios';
        translationParams = { a: a5, b: b5 };
        answer = `${a5}:${b5}`;
        explanation = `Отношение = ${a5}:${b5}`;
        explanationKey = 'tasks.review.ratios_explanation';
        explanationParams = { a: a5, b: b5 };
        answerFormat = "отношение (a:b)";
        formatKey = 'answerFormats.ratio';
        break;

      case 6: // Координаты - симметрия
        const x6 = getRandomInt(-4, 4);
        const y6 = getRandomInt(-4, 4);
        const symmetricPoint6 = `(${-x6}, ${y6})`;
        question = `Найдите точку, симметричную (${x6}, ${y6}) относительно оси Y`;
        translationKey = 'tasks.review.coordinates';
        translationParams = { x: x6, y: y6 };
        answer = symmetricPoint6;
        explanation = `Симметрия относительно Y: x меняет знак → ${symmetricPoint6}`;
        explanationKey = 'tasks.review.coordinates_explanation';
        explanationParams = { x: x6, y: y6, result: symmetricPoint6 };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 7: // Объем куба
        const edge7 = getRandomInt(2, 8);
        const volume7 = edge7 * edge7 * edge7;
        question = `Найдите объем куба с ребром ${edge7} см`;
        translationKey = 'tasks.review.volume';
        translationParams = { edge: edge7 };
        answer = volume7.toString();
        explanation = `Объем = ${edge7} × ${edge7} × ${edge7} = ${volume7} см³`;
        explanationKey = 'tasks.review.volume_explanation';
        explanationParams = { edge: edge7, result: volume7 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 8: // Статистика - среднее
        const numbers8 = Array.from({length: 5}, () => getRandomInt(10, 20));
        const sum8 = numbers8.reduce((a, b) => a + b, 0);
        const average8 = Math.round(sum8 / numbers8.length);
        question = `Найдите среднее арифметическое чисел: ${numbers8.join(', ')}`;
        translationKey = 'tasks.review.statistics';
        translationParams = { numbers: numbers8.join(', ') };
        answer = average8.toString();
        explanation = `Сумма = ${numbers8.join(' + ')} = ${sum8}, среднее = ${sum8} / ${numbers8.length} = ${average8}`;
        explanationKey = 'tasks.review.statistics_explanation';
        explanationParams = { numbers: numbers8.join(' + '), sum: sum8, count: numbers8.length, result: average8 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 9: // Текстовая задача
        const price9 = getRandomInt(50, 150);
        const quantity9 = getRandomInt(3, 8);
        const totalCost9 = price9 * quantity9;
        question = `Одна тетрадь стоит ${price9} руб. Сколько стоят ${quantity9} тетрадей?`;
        translationKey = 'tasks.review.word_problem';
        translationParams = { price: price9, quantity: quantity9 };
        answer = totalCost9.toString();
        explanation = `Стоимость = цена × количество = ${price9} × ${quantity9} = ${totalCost9} руб`;
        explanationKey = 'tasks.review.word_problem_explanation';
        explanationParams = { price: price9, quantity: quantity9, result: totalCost9 };
        answerFormat = "число (руб.)";
        formatKey = 'answerFormats.rub';
        break;

      case 10: // Симметрия
        const letter10 = "H";
        question = `Какая симметрия у буквы "${letter10}"?`;
        translationKey = 'tasks.review.symmetry';
        translationParams = { letter: letter10 };
        answer = "вертикальная и горизонтальная";
        explanation = `Буква "${letter10}" имеет вертикальную и горизонтальную симметрию`;
        explanationKey = 'tasks.review.symmetry_explanation';
        explanationParams = { letter: letter10, result: "вертикальная и горизонтальная" };
        answerFormat = "тип симметрии";
        formatKey = 'answerFormats.symmetry_type';
        break;

      default:
        type = getRandomInt(1, 10);
        continue;
    }

    // Fallback: если translationKey не определен, используем обычный текст
    if (!translationKey) {
      translationKey = null;
    }

    if (!usedQuestions.has(question)) {
      usedQuestions.add(question);
      tasks.push({ 
        question, 
        answer, 
        explanation, 
        answerFormat,
        translationKey: translationKey || undefined,
        translationParams: translationParams || undefined,
        explanationKey: explanationKey || undefined, 
        explanationParams: explanationParams || undefined,
        formatKey: formatKey || undefined
      });
    }
  }
  return tasks;
};
