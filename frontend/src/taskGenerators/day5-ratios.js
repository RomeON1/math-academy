// day5-ratios.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const ratiosGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Простое отношение
        const a1 = getRandomInt(2, 8);
        const b1 = getRandomInt(2, 8);
        question = `Запишите отношение ${a1} к ${b1}`;
        translationKey = 'tasks.ratios.simple_ratio';
        translationParams = { a: a1, b: b1 };
        answer = `${a1}:${b1}`;
        explanation = `Отношение = ${a1}:${b1}`;
        explanationKey = 'tasks.ratios.simple_ratio_explanation';
        explanationParams = { a: a1, b: b1 };
        answerFormat = "отношение (a:b)";
        formatKey = 'answerFormats.ratio';
        break;

      case 2: // Упрощение отношения
        const a2 = getRandomInt(4, 12) * 2;
        const b2 = getRandomInt(4, 12) * 2;
        const gcd2 = (x, y) => y === 0 ? x : gcd2(y, x % y);
        const divisor2 = gcd2(a2, b2);
        const simplifiedA = a2 / divisor2;
        const simplifiedB = b2 / divisor2;
        question = `Упростите отношение ${a2}:${b2}`;
        translationKey = 'tasks.ratios.simplify_ratio';
        translationParams = { a: a2, b: b2 };
        answer = `${simplifiedA}:${simplifiedB}`;
        explanation = `Делим на ${divisor2}: ${a2}:${b2} = ${answer}`;
        explanationKey = 'tasks.ratios.simplify_ratio_explanation';
        explanationParams = { a: a2, b: b2, divisor: divisor2, result: answer };
        answerFormat = "отношение (a:b)";
        formatKey = 'answerFormats.ratio';
        break;

      case 3: // Пропорция: нахождение x
        const a3 = getRandomInt(2, 6);
        const b3 = getRandomInt(2, 6);
        const c3 = getRandomInt(2, 8);
        const x3 = (b3 * c3) / a3;
        question = `Найдите x: ${a3}/${b3} = ${c3}/x`;
        translationKey = 'tasks.ratios.find_proportion';
        translationParams = { a: a3, b: b3, c: c3 };
        answer = x3.toString();
        explanation = `x = (${b3} × ${c3}) / ${a3} = ${x3}`;
        explanationKey = 'tasks.ratios.find_proportion_explanation';
        explanationParams = { a: a3, b: b3, c: c3, result: x3 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 4: // Деление в данном отношении
        const total4 = getRandomInt(30, 60);
        const ratioA4 = getRandomInt(2, 5);
        const ratioB4 = getRandomInt(2, 5);
        const partA4 = Math.round((total4 * ratioA4) / (ratioA4 + ratioB4));
        const partB4 = Math.round((total4 * ratioB4) / (ratioA4 + ratioB4));
        question = `Разделите ${total4} в отношении ${ratioA4}:${ratioB4}`;
        translationKey = 'tasks.ratios.divide_in_ratio';
        translationParams = { total: total4, a: ratioA4, b: ratioB4 };
        answer = `${partA4}:${partB4}`;
        explanation = `${total4} / (${ratioA4} + ${ratioB4}) = ${total4/(ratioA4+ratioB4)}, части: ${partA4} и ${partB4}`;
        explanationKey = 'tasks.ratios.divide_in_ratio_explanation';
        explanationParams = { 
          total: total4, 
          a: ratioA4, 
          b: ratioB4, 
          unit: total4/(ratioA4+ratioB4),
          result: answer
        };
        answerFormat = "отношение (a:b)";
        formatKey = 'answerFormats.ratio';
        break;

      case 5: // Масштаб
        const distance5 = getRandomInt(10, 50);
        const scale5 = getRandomInt(2, 5);
        const realDistance5 = distance5 * scale5;
        question = `По карте масштаба 1:${scale5} расстояние ${distance5} см. Найдите реальное расстояние.`;
        translationKey = 'tasks.ratios.scale';
        translationParams = { distance: distance5, scale: scale5 };
        answer = realDistance5.toString();
        explanation = `Реальное расстояние = ${distance5} × ${scale5} = ${realDistance5} см`;
        explanationKey = 'tasks.ratios.scale_explanation';
        explanationParams = { distance: distance5, scale: scale5, result: realDistance5 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 6: // Процентное отношение
        const part6 = getRandomInt(5, 20);
        const whole6 = getRandomInt(30, 60);
        const percentage6 = Math.round((part6 / whole6) * 100);
        question = `Какой процент составляет ${part6} от ${whole6}?`;
        translationKey = 'tasks.ratios.percentage_ratio';
        translationParams = { part: part6, whole: whole6 };
        answer = percentage6.toString();
        explanation = `(${part6} / ${whole6}) × 100 = ${percentage6}%`;
        explanationKey = 'tasks.ratios.percentage_ratio_explanation';
        explanationParams = { part: part6, whole: whole6, result: percentage6 };
        answerFormat = "процент";
        formatKey = 'answerFormats.percentage';
        break;

      case 7: // Обратное отношение
        const a7 = getRandomInt(2, 6);
        const b7 = getRandomInt(2, 6);
        question = `Запишите обратное отношение к ${a7}:${b7}`;
        translationKey = 'tasks.ratios.inverse_ratio';
        translationParams = { a: a7, b: b7 };
        answer = `${b7}:${a7}`;
        explanation = `Обратное отношение = ${b7}:${a7}`;
        explanationKey = 'tasks.ratios.inverse_ratio_explanation';
        explanationParams = { a: a7, b: b7 };
        answerFormat = "отношение (a:b)";
        formatKey = 'answerFormats.ratio';
        break;

      case 8: // Отношение трех чисел
        const a8 = getRandomInt(2, 5);
        const b8 = getRandomInt(2, 5);
        const c8 = getRandomInt(2, 5);
        question = `Запишите отношение ${a8} : ${b8} : ${c8}`;
        translationKey = 'tasks.ratios.triple_ratio';
        translationParams = { a: a8, b: b8, c: c8 };
        answer = `${a8}:${b8}:${c8}`;
        explanation = `Отношение = ${a8}:${b8}:${c8}`;
        explanationKey = 'tasks.ratios.triple_ratio_explanation';
        explanationParams = { a: a8, b: b8, c: c8 };
        answerFormat = "отношение (a:b:c)";
        formatKey = 'answerFormats.ratio';
        break;

      case 9: // Пропорция из текста
        const ratio9 = getRandomInt(2, 4);
        const boys9 = getRandomInt(10, 20);
        const girls9 = boys9 * ratio9;
        question = `Мальчиков ${boys9}, девочек в ${ratio9} раза больше. Найдите отношение мальчиков к девочкам.`;
        translationKey = 'tasks.ratios.word_problem';
        translationParams = { boys: boys9, ratio: ratio9 };
        answer = `1:${ratio9}`;
        explanation = `Девочек = ${boys9} × ${ratio9} = ${girls9}, отношение = 1:${ratio9}`;
        explanationKey = 'tasks.ratios.word_problem_explanation';
        explanationParams = { boys: boys9, girls: girls9, ratio: ratio9 };
        answerFormat = "отношение (a:b)";
        formatKey = 'answerFormats.ratio';
        break;

      case 10: // Сравнение отношений
        const a10 = getRandomInt(2, 5);
        const b10 = getRandomInt(2, 5);
        const c10 = getRandomInt(2, 5);
        const d10 = getRandomInt(2, 5);
        const ratio1 = a10 / b10;
        const ratio2 = c10 / d10;
        const comparisonResult = ratio1 > ratio2 ? "больше" : ratio1 < ratio2 ? "меньше" : "равны";
        question = `Сравните отношения ${a10}:${b10} и ${c10}:${d10}`;
        translationKey = 'tasks.ratios.compare_ratios';
        translationParams = { a: a10, b: b10, c: c10, d: d10 };
        answer = comparisonResult;
        explanation = `${a10}/${b10} = ${ratio1.toFixed(2)}, ${c10}/${d10} = ${ratio2.toFixed(2)} - ${comparisonResult}`;
        explanationKey = 'tasks.ratios.compare_ratios_explanation';
        explanationParams = { 
          a: a10, b: b10, c: c10, d: d10, 
          value1: ratio1.toFixed(2), 
          value2: ratio2.toFixed(2),
          result: comparisonResult
        };
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
