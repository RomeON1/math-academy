// day4-decimals.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const decimalsGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Сложение десятичных
        const a1 = (getRandomInt(10, 50) / 10).toFixed(1);
        const b1 = (getRandomInt(10, 50) / 10).toFixed(1);
        const sum1 = (parseFloat(a1) + parseFloat(b1)).toFixed(1);
        question = `Сложите: ${a1} + ${b1}`;
        translationKey = 'tasks.decimals.addition';
        translationParams = { a: a1, b: b1 };
        answer = sum1;
        explanation = `${a1} + ${b1} = ${sum1}`;
        explanationKey = 'tasks.decimals.addition_explanation';
        explanationParams = { a: a1, b: b1, result: sum1 };
        answerFormat = "десятичная дробь";
        formatKey = 'answerFormats.decimal';
        break;

      case 2: // Вычитание десятичных
        const a2 = (getRandomInt(30, 80) / 10).toFixed(1);
        const b2 = (getRandomInt(10, 40) / 10).toFixed(1);
        const diff2 = (parseFloat(a2) - parseFloat(b2)).toFixed(1);
        question = `Вычтите: ${a2} - ${b2}`;
        translationKey = 'tasks.decimals.subtraction';
        translationParams = { a: a2, b: b2 };
        answer = diff2;
        explanation = `${a2} - ${b2} = ${diff2}`;
        explanationKey = 'tasks.decimals.subtraction_explanation';
        explanationParams = { a: a2, b: b2, result: diff2 };
        answerFormat = "десятичная дробь";
        formatKey = 'answerFormats.decimal';
        break;

      case 3: // Умножение десятичных
        const a3 = (getRandomInt(2, 9) / 10).toFixed(1);
        const b3 = getRandomInt(2, 8);
        const product3 = (parseFloat(a3) * b3).toFixed(1);
        question = `Умножьте: ${a3} × ${b3}`;
        translationKey = 'tasks.decimals.multiplication';
        translationParams = { a: a3, b: b3 };
        answer = product3;
        explanation = `${a3} × ${b3} = ${product3}`;
        explanationKey = 'tasks.decimals.multiplication_explanation';
        explanationParams = { a: a3, b: b3, result: product3 };
        answerFormat = "десятичная дробь";
        formatKey = 'answerFormats.decimal';
        break;

      case 4: // Деление десятичных
        const a4 = getRandomInt(15, 45);
        const b4 = getRandomInt(2, 6);
        const quotient4 = (a4 / b4).toFixed(1);
        question = `Разделите: ${a4} ÷ ${b4}`;
        translationKey = 'tasks.decimals.division';
        translationParams = { a: a4, b: b4 };
        answer = quotient4;
        explanation = `${a4} ÷ ${b4} = ${quotient4}`;
        explanationKey = 'tasks.decimals.division_explanation';
        explanationParams = { a: a4, b: b4, result: quotient4 };
        answerFormat = "десятичная дробь";
        formatKey = 'answerFormats.decimal';
        break;

      case 5: // Округление до целых
        const decimal5 = (getRandomInt(10, 95) / 10).toFixed(1);
        const rounded5 = Math.round(parseFloat(decimal5));
        question = `Округлите до целых: ${decimal5}`;
        translationKey = 'tasks.decimals.rounding';
        translationParams = { number: decimal5 };
        answer = rounded5.toString();
        explanation = `${decimal5} ≈ ${rounded5}`;
        explanationKey = 'tasks.decimals.rounding_explanation';
        explanationParams = { number: decimal5, result: rounded5 };
        answerFormat = "целое число";
        formatKey = 'answerFormats.number';
        break;

      case 6: // Сравнение десятичных
        const a6 = (getRandomInt(10, 40) / 10).toFixed(1);
        const b6 = (getRandomInt(10, 40) / 10).toFixed(1);
        const comparisonResult = parseFloat(a6) > parseFloat(b6) ? "больше" : parseFloat(a6) < parseFloat(b6) ? "меньше" : "равны";
        question = `Сравните: ${a6} и ${b6}`;
        translationKey = 'tasks.decimals.comparison';
        translationParams = { a: a6, b: b6 };
        answer = comparisonResult;
        explanation = `${a6} ${comparisonResult} ${b6}`;
        explanationKey = 'tasks.decimals.comparison_explanation';
        explanationParams = { a: a6, b: b6, result: comparisonResult };
        answerFormat = "больше/меньше/равно";
        formatKey = 'answerFormats.comparison';
        break;

      case 7: // Перевод в проценты
        const decimal7 = (getRandomInt(1, 9) / 10).toFixed(1);
        const percent7 = parseFloat(decimal7) * 100;
        question = `Представьте ${decimal7} в процентах`;
        translationKey = 'tasks.decimals.to_percentage';
        translationParams = { number: decimal7 };
        answer = percent7.toString();
        explanation = `${decimal7} = ${percent7}%`;
        explanationKey = 'tasks.decimals.to_percentage_explanation';
        explanationParams = { number: decimal7, result: percent7 };
        answerFormat = "процент";
        formatKey = 'answerFormats.percentage';
        break;

      case 8: // Перевод из процентов
        const percent8 = getRandomInt(10, 90);
        const decimal8 = (percent8 / 100).toFixed(2);
        question = `Представьте ${percent8}% в виде десятичной дроби`;
        translationKey = 'tasks.decimals.from_percentage';
        translationParams = { percent: percent8 };
        answer = decimal8;
        explanation = `${percent8}% = ${decimal8}`;
        explanationKey = 'tasks.decimals.from_percentage_explanation';
        explanationParams = { percent: percent8, result: decimal8 };
        answerFormat = "десятичная дробь";
        formatKey = 'answerFormats.decimal';
        break;

      case 9: // Сложение с сотыми
        const a9 = (getRandomInt(100, 500) / 100).toFixed(2);
        const b9 = (getRandomInt(100, 500) / 100).toFixed(2);
        const sum9 = (parseFloat(a9) + parseFloat(b9)).toFixed(2);
        question = `Сложите: ${a9} + ${b9}`;
        translationKey = 'tasks.decimals.addition_hundredths';
        translationParams = { a: a9, b: b9 };
        answer = sum9;
        explanation = `${a9} + ${b9} = ${sum9}`;
        explanationKey = 'tasks.decimals.addition_hundredths_explanation';
        explanationParams = { a: a9, b: b9, result: sum9 };
        answerFormat = "десятичная дробь";
        formatKey = 'answerFormats.decimal';
        break;

      case 10: // Умножение на 10, 100, 1000
        const decimal10 = (getRandomInt(1, 50) / 10).toFixed(1);
        const multiplier10 = [10, 100, 1000][getRandomInt(0, 2)];
        const product10 = (parseFloat(decimal10) * multiplier10).toFixed(0);
        question = `Умножьте: ${decimal10} × ${multiplier10}`;
        translationKey = 'tasks.decimals.multiply_by_power';
        translationParams = { number: decimal10, multiplier: multiplier10 };
        answer = product10;
        explanation = `${decimal10} × ${multiplier10} = ${product10}`;
        explanationKey = 'tasks.decimals.multiply_by_power_explanation';
        explanationParams = { number: decimal10, multiplier: multiplier10, result: product10 };
        answerFormat = "целое число";
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
