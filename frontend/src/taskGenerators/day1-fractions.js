// day1-fractions.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Генераторы задач день 1
export const fractionsGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Простые дроби
        const num = getRandomInt(1, 5);
        const den = getRandomInt(2, 8);
        question = `Сократите дробь: ${num * 2}/${den * 2}`;
        translationKey = 'tasks.fractions.reduce';
        translationParams = { numerator: num * 2, denominator: den * 2 };
        answer = `${num}/${den}`;
        explanation = `Делим числитель и знаменатель на 2: ${num * 2}/${den * 2} = ${num}/${den}`;
        explanationKey = 'tasks.fractions.reduce_explanation';
        explanationParams = { numerator: num * 2, denominator: den * 2, result: `${num}/${den}` };
        answerFormat = "дробь (например: 3/4)";
        formatKey = 'answerFormats.fraction';
        break;

      case 2: // Проценты
        const percent = getRandomInt(10, 90);
        const number = getRandomInt(20, 200);
        const result = Math.round((percent / 100) * number);
        question = `Найдите ${percent}% от числа ${number}`;
        translationKey = 'tasks.fractions.percentage_of';
        translationParams = { percent, number };
        answer = result.toString();
        explanation = `${percent}% от ${number} = (${percent} × ${number}) / 100 = ${result}`;
        explanationKey = 'tasks.fractions.percentage_of_explanation';
        explanationParams = { percent, number, result };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 3: // Сложение дробей
        const a = getRandomInt(1, 4);
        const b = getRandomInt(1, 4);
        const sum = a + b;
        question = `Сложите дроби: ${a}/6 + ${b}/6`;
        translationKey = 'tasks.fractions.addition';
        translationParams = { a, b };
        answer = `${sum}/6`;
        explanation = `При одинаковых знаменателях складываем числители: ${a} + ${b} = ${sum}`;
        explanationKey = 'tasks.fractions.addition_explanation';
        explanationParams = { a, b, result: sum };
        answerFormat = "дробь (например: 5/6)";
        formatKey = 'answerFormats.fraction';
        break;

      case 4: // Вычитание дробей
        const x = getRandomInt(3, 7);
        const y = getRandomInt(1, 3);
        const diff = x - y;
        question = `Вычтите дроби: ${x}/8 - ${y}/8`;
        translationKey = 'tasks.fractions.subtraction';
        translationParams = { x, y };
        answer = `${diff}/8`;
        explanation = `При одинаковых знаменателях вычитаем числители: ${x} - ${y} = ${diff}`;
        explanationKey = 'tasks.fractions.subtraction_explanation';
        explanationParams = { x, y, result: diff };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 5: // Перевод процентов в дроби
        const p = getRandomInt(5, 95);
        question = `Представьте ${p}% в виде несократимой дроби`;
        translationKey = 'tasks.fractions.percentage_to_fraction';
        translationParams = { p };
        answer = `${p}/100`;
        explanation = `${p}% = ${p}/100`;
        explanationKey = 'tasks.fractions.percentage_to_fraction_explanation';
        explanationParams = { p };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 6: // Нахождение числа по проценту
        const perc = getRandomInt(10, 40);
        const value = getRandomInt(15, 60);
        const total = Math.round((value * 100) / perc);
        question = `Если ${perc}% числа равны ${value}, найдите всё число`;
        translationKey = 'tasks.fractions.find_number_by_percentage';
        translationParams = { perc, value };
        answer = total.toString();
        explanation = `100% = (${value} × 100) / ${perc} = ${total}`;
        explanationKey = 'tasks.fractions.find_number_by_percentage_explanation';
        explanationParams = { perc, value, total };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 7: // Сравнение дробей
        const a2 = getRandomInt(1, 5);
        const b2 = getRandomInt(2, 8);
        const c2 = getRandomInt(1, 5);
        const d2 = getRandomInt(2, 8);
        const result1 = (a2 / b2).toFixed(3);
        const result2 = (c2 / d2).toFixed(3);
        question = `Сравните дроби: ${a2}/${b2} и ${c2}/${d2}`;
        translationKey = 'tasks.fractions.compare_fractions';
        translationParams = { a: a2, b: b2, c: c2, d: d2 };
        answer = a2/b2 > c2/d2 ? "больше" : a2/b2 < c2/d2 ? "меньше" : "равны";
        explanation = `Приводим к общему знаменателю: ${a2}/${b2} = ${result1}, ${c2}/${d2} = ${result2}`;
        explanationKey = 'tasks.fractions.compare_fractions_explanation';
        explanationParams = { a: a2, b: b2, c: c2, d: d2, result1, result2 };
        answerFormat = "больше/меньше/равно";
        formatKey = 'answerFormats.comparison';
        break;

      case 8: // Смешанное число в неправильную дробь
        const whole8 = getRandomInt(1, 5);
        const num8 = getRandomInt(1, 4);
        const den8 = getRandomInt(2, 8);
        const improper8 = whole8 * den8 + num8;
        question = `Переведите смешанное число ${whole8} ${num8}/${den8} в неправильную дробь`;
        translationKey = 'tasks.fractions.mixed_to_improper';
        translationParams = { whole: whole8, num: num8, den: den8 };
        answer = `${improper8}/${den8}`;
        explanation = `${whole8} ${num8}/${den8} = (${whole8} × ${den8} + ${num8}) / ${den8} = ${improper8}/${den8}`;
        explanationKey = 'tasks.fractions.mixed_to_improper_explanation';
        explanationParams = { whole: whole8, num: num8, den: den8, result: `${improper8}/${den8}` };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 9: // Неправильная дробь в смешанное число
        const numerator9 = getRandomInt(7, 20);
        const denominator9 = getRandomInt(2, 6);
        const wholePart9 = Math.floor(numerator9 / denominator9);
        const remainder9 = numerator9 % denominator9;
        question = `Переведите неправильную дробь ${numerator9}/${denominator9} в смешанное число`;
        translationKey = 'tasks.fractions.improper_to_mixed';
        translationParams = { num: numerator9, den: denominator9 };
        answer = remainder9 === 0 ? `${wholePart9}` : `${wholePart9} ${remainder9}/${denominator9}`;
        explanation = `${numerator9}/${denominator9} = ${wholePart9} целых и ${remainder9}/${denominator9}`;
        explanationKey = 'tasks.fractions.improper_to_mixed_explanation';
        explanationParams = { num: numerator9, den: denominator9, whole: wholePart9, remainder: remainder9 };
        answerFormat = "смешанное число (например: 2 3/4)";
        formatKey = 'answerFormats.mixed_number';
        break;

      case 10: // Умножение дробей
        const a10 = getRandomInt(1, 4);
        const b10 = getRandomInt(2, 6);
        const c10 = getRandomInt(1, 4);
        const d10 = getRandomInt(2, 6);
        const resNum10 = a10 * c10;
        const resDen10 = b10 * d10;
        question = `Умножьте дроби: ${a10}/${b10} × ${c10}/${d10}`;
        translationKey = 'tasks.fractions.multiply_fractions';
        translationParams = { a: a10, b: b10, c: c10, d: d10 };
        answer = `${resNum10}/${resDen10}`;
        explanation = `Умножаем числители и знаменатели: (${a10} × ${c10}) / (${b10} × ${d10}) = ${resNum10}/${resDen10}`;
        explanationKey = 'tasks.fractions.multiply_fractions_explanation';
        explanationParams = { a: a10, b: b10, c: c10, d: d10, result: `${resNum10}/${resDen10}` };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
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
