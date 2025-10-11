// day7-commonFractions.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const commonFractionsGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Сокращение дроби
        const num1 = getRandomInt(2, 8);
        const den1 = getRandomInt(3, 12);
        const gcd1 = (a, b) => b === 0 ? a : gcd1(b, a % b);
        const divisor1 = gcd1(num1 * 2, den1 * 2);
        question = `Сократите дробь: ${num1 * 2}/${den1 * 2}`;
        translationKey = 'tasks.common_fractions.reduce';
        translationParams = { numerator: num1 * 2, denominator: den1 * 2 };
        answer = `${num1}/${den1}`;
        explanation = `Делим числитель и знаменатель на ${divisor1}: ${num1 * 2}/${den1 * 2} = ${num1}/${den1}`;
        explanationKey = 'tasks.common_fractions.reduce_explanation';
        explanationParams = { numerator: num1 * 2, denominator: den1 * 2, divisor: divisor1, result: `${num1}/${den1}` };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 2: // Приведение к общему знаменателю
        const a2 = getRandomInt(1, 4);
        const b2 = getRandomInt(1, 4);
        const den2 = 6;
        const fraction1 = `${a2 * 2}/${den2}`;
        const fraction2 = `${b2 * 3}/${den2}`;
        question = `Приведите дроби ${a2}/3 и ${b2}/2 к общему знаменателю ${den2}`;
        translationKey = 'tasks.common_fractions.common_denominator';
        translationParams = { a: a2, b: b2, den: den2 };
        answer = `${fraction1} и ${fraction2}`;
        explanation = `3 → ${den2}: ×2 = ${fraction1}, 2 → ${den2}: ×3 = ${fraction2}`;
        explanationKey = 'tasks.common_fractions.common_denominator_explanation';
        explanationParams = { a: a2, b: b2, den: den2, result: answer };
        answerFormat = "две дроби через 'и'";
        formatKey = 'answerFormats.fractions_pair';
        break;

      case 3: // Сравнение дробей
        const num3_1 = getRandomInt(1, 3);
        const den3_1 = getRandomInt(4, 8);
        const num3_2 = getRandomInt(1, 3);
        const den3_2 = getRandomInt(4, 8);
        const value1 = (num3_1 / den3_1).toFixed(2);
        const value2 = (num3_2 / den3_2).toFixed(2);
        const comparisonResult = num3_1/den3_1 > num3_2/den3_2 ? ">" : num3_1/den3_1 < num3_2/den3_2 ? "<" : "=";
        question = `Сравните дроби: ${num3_1}/${den3_1} и ${num3_2}/${den3_2}`;
        translationKey = 'tasks.common_fractions.compare';
        translationParams = { a: num3_1, b: den3_1, c: num3_2, d: den3_2 };
        answer = comparisonResult;
        explanation = `${num3_1}/${den3_1} ${comparisonResult} ${num3_2}/${den3_2} (${value1} ${comparisonResult} ${value2})`;
        explanationKey = 'tasks.common_fractions.compare_explanation';
        explanationParams = { 
          a: num3_1, b: den3_1, c: num3_2, d: den3_2, 
          value1, value2, result: comparisonResult 
        };
        answerFormat = "больше/меньше/равно";
        formatKey = 'answerFormats.comparison';
        break;

      case 4: // Перевод в смешанное число
        const num4 = getRandomInt(7, 15);
        const den4 = getRandomInt(2, 5);
        const whole4 = Math.floor(num4 / den4);
        const remainder4 = num4 % den4;
        question = `Переведите дробь ${num4}/${den4} в смешанное число`;
        translationKey = 'tasks.common_fractions.to_mixed';
        translationParams = { numerator: num4, denominator: den4 };
        answer = remainder4 === 0 ? `${whole4}` : `${whole4} ${remainder4}/${den4}`;
        explanation = `${num4}/${den4} = ${whole4} целых и ${remainder4}/${den4}`;
        explanationKey = 'tasks.common_fractions.to_mixed_explanation';
        explanationParams = { numerator: num4, denominator: den4, whole: whole4, remainder: remainder4 };
        answerFormat = "смешанное число";
        formatKey = 'answerFormats.mixed_number';
        break;

      case 5: // Перевод из смешанного числа
        const whole5 = getRandomInt(1, 3);
        const num5 = getRandomInt(1, 4);
        const den5 = getRandomInt(2, 6);
        const improperFraction = `${whole5 * den5 + num5}/${den5}`;
        question = `Переведите смешанное число ${whole5} ${num5}/${den5} в неправильную дробь`;
        translationKey = 'tasks.common_fractions.from_mixed';
        translationParams = { whole: whole5, numerator: num5, denominator: den5 };
        answer = improperFraction;
        explanation = `${whole5} ${num5}/${den5} = (${whole5} × ${den5} + ${num5}) / ${den5} = ${improperFraction}`;
        explanationKey = 'tasks.common_fractions.from_mixed_explanation';
        explanationParams = { whole: whole5, numerator: num5, denominator: den5, result: improperFraction };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 6: // Сложение с общим знаменателем
        const num6_1 = getRandomInt(1, 4);
        const num6_2 = getRandomInt(1, 4);
        const den6 = 8;
        const sum6 = num6_1 + num6_2;
        question = `Сложите дроби: ${num6_1}/${den6} + ${num6_2}/${den6}`;
        translationKey = 'tasks.common_fractions.add_same_denominator';
        translationParams = { a: num6_1, b: num6_2, den: den6 };
        answer = `${sum6}/${den6}`;
        explanation = `При одинаковых знаменателях складываем числители: ${num6_1} + ${num6_2} = ${sum6}`;
        explanationKey = 'tasks.common_fractions.add_same_denominator_explanation';
        explanationParams = { a: num6_1, b: num6_2, den: den6, result: answer };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 7: // Вычитание с общим знаменателем
        const num7_1 = getRandomInt(3, 7);
        const num7_2 = getRandomInt(1, 3);
        const den7 = 8;
        const diff7 = num7_1 - num7_2;
        question = `Вычтите дроби: ${num7_1}/${den7} - ${num7_2}/${den7}`;
        translationKey = 'tasks.common_fractions.subtract_same_denominator';
        translationParams = { a: num7_1, b: num7_2, den: den7 };
        answer = `${diff7}/${den7}`;
        explanation = `При одинаковых знаменателях вычитаем числители: ${num7_1} - ${num7_2} = ${diff7}`;
        explanationKey = 'tasks.common_fractions.subtract_same_denominator_explanation';
        explanationParams = { a: num7_1, b: num7_2, den: den7, result: answer };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 8: // Нахождение части от числа
        const fraction8 = getRandomInt(1, 4);
        const den8 = getRandomInt(2, 6);
        const number8 = getRandomInt(10, 30);
        const result8 = Math.round((fraction8 / den8) * number8);
        question = `Найдите ${fraction8}/${den8} от числа ${number8}`;
        translationKey = 'tasks.common_fractions.fraction_of_number';
        translationParams = { numerator: fraction8, denominator: den8, number: number8 };
        answer = result8.toString();
        explanation = `${fraction8}/${den8} от ${number8} = (${fraction8} × ${number8}) / ${den8} = ${result8}`;
        explanationKey = 'tasks.common_fractions.fraction_of_number_explanation';
        explanationParams = { numerator: fraction8, denominator: den8, number: number8, result: result8 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 9: // Нахождение числа по его части
        const fraction9 = getRandomInt(1, 3);
        const den9 = getRandomInt(2, 5);
        const part9 = getRandomInt(5, 15);
        const whole9 = Math.round((part9 * den9) / fraction9);
        question = `Если ${fraction9}/${den9} числа равны ${part9}, найдите всё число`;
        translationKey = 'tasks.common_fractions.number_from_fraction';
        translationParams = { numerator: fraction9, denominator: den9, part: part9 };
        answer = whole9.toString();
        explanation = `Всё число = (${part9} × ${den9}) / ${fraction9} = ${whole9}`;
        explanationKey = 'tasks.common_fractions.number_from_fraction_explanation';
        explanationParams = { numerator: fraction9, denominator: den9, part: part9, result: whole9 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 10: // Приведение к несократимому виду
        const num10 = getRandomInt(2, 6) * 2;
        const den10 = getRandomInt(3, 9) * 2;
        const gcd10 = (a, b) => b === 0 ? a : gcd10(b, a % b);
        const divisor10 = gcd10(num10, den10);
        const simplifiedFraction = `${num10 / divisor10}/${den10 / divisor10}`;
        question = `Приведите дробь ${num10}/${den10} к несократимому виду`;
        translationKey = 'tasks.common_fractions.simplify';
        translationParams = { numerator: num10, denominator: den10 };
        answer = simplifiedFraction;
        explanation = `Делим на ${divisor10}: ${num10}/${den10} = ${simplifiedFraction}`;
        explanationKey = 'tasks.common_fractions.simplify_explanation';
        explanationParams = { numerator: num10, denominator: den10, divisor: divisor10, result: simplifiedFraction };
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
