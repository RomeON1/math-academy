// day3-equations.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const equationsGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Простое сложение: x + a = b
        const a1 = getRandomInt(2, 15);
        const b1 = getRandomInt(16, 30);
        const result1 = b1 - a1;
        question = `Решите: x + ${a1} = ${b1}`;
        translationKey = 'tasks.equations.simple_addition';
        translationParams = { a: a1, b: b1 };
        answer = result1.toString();
        explanation = `x = ${b1} - ${a1} = ${result1}`;
        explanationKey = 'tasks.equations.simple_addition_explanation';
        explanationParams = { a: a1, b: b1, result: result1 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 2: // Простое умножение: ay = b
        const a2 = getRandomInt(2, 8);
        const b2 = a2 * getRandomInt(3, 12);
        const result2 = b2 / a2;
        question = `Найдите y: ${a2}y = ${b2}`;
        translationKey = 'tasks.equations.simple_multiplication';
        translationParams = { a: a2, b: b2 };
        answer = result2.toString();
        explanation = `y = ${b2} ÷ ${a2} = ${result2}`;
        explanationKey = 'tasks.equations.simple_multiplication_explanation';
        explanationParams = { a: a2, b: b2, result: result2 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 3: // Со скобками: a(x + b) = c
        const a3 = getRandomInt(2, 5);
        const b3 = getRandomInt(1, 6);
        const c3 = getRandomInt(15, 40);
        const result3 = (c3 / a3) - b3;
        question = `Решите: ${a3}(x + ${b3}) = ${c3}`;
        translationKey = 'tasks.equations.with_brackets';
        translationParams = { a: a3, b: b3, c: c3 };
        answer = Math.round(result3).toString();
        explanation = `${a3}x + ${a3 * b3} = ${c3}, ${a3}x = ${c3 - a3 * b3}, x = ${Math.round(result3)}`;
        explanationKey = 'tasks.equations.with_brackets_explanation';
        explanationParams = { 
          a: a3, 
          b: b3, 
          c: c3, 
          ab: a3 * b3,
          step1: c3 - a3 * b3,
          result: Math.round(result3)
        };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 4: // Вычитание: x - a = b
        const a4 = getRandomInt(5, 20);
        const b4 = getRandomInt(1, 10);
        const result4 = a4 + b4;
        question = `Решите: x - ${a4} = ${b4}`;
        translationKey = 'tasks.equations.simple_subtraction';
        translationParams = { a: a4, b: b4 };
        answer = result4.toString();
        explanation = `x = ${b4} + ${a4} = ${result4}`;
        explanationKey = 'tasks.equations.simple_subtraction_explanation';
        explanationParams = { a: a4, b: b4, result: result4 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 5: // Деление: x/a = b
        const a5 = getRandomInt(2, 8);
        const b5 = getRandomInt(3, 12);
        const result5 = a5 * b5;
        question = `Решите: x/${a5} = ${b5}`;
        translationKey = 'tasks.equations.simple_division';
        translationParams = { a: a5, b: b5 };
        answer = result5.toString();
        explanation = `x = ${b5} × ${a5} = ${result5}`;
        explanationKey = 'tasks.equations.simple_division_explanation';
        explanationParams = { a: a5, b: b5, result: result5 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 6: // Двойное уравнение: ax + b = c
        const a6 = getRandomInt(2, 6);
        const b6 = getRandomInt(5, 20);
        const c6 = getRandomInt(25, 50);
        const result6 = (c6 - b6) / a6;
        question = `Решите: ${a6}x + ${b6} = ${c6}`;
        translationKey = 'tasks.equations.two_step';
        translationParams = { a: a6, b: b6, c: c6 };
        answer = Math.round(result6).toString();
        explanation = `${a6}x = ${c6} - ${b6} = ${c6 - b6}, x = ${Math.round(result6)}`;
        explanationKey = 'tasks.equations.two_step_explanation';
        explanationParams = { a: a6, b: b6, c: c6, step: c6 - b6, result: Math.round(result6) };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 7: // С переменными с обеих сторон: ax + b = cx + d
        const a7 = getRandomInt(2, 5);
        const b7 = getRandomInt(5, 15);
        const c7 = getRandomInt(1, 4);
        const d7 = getRandomInt(10, 25);
        const result7 = (d7 - b7) / (a7 - c7);
        question = `Решите: ${a7}x + ${b7} = ${c7}x + ${d7}`;
        translationKey = 'tasks.equations.both_sides';
        translationParams = { a: a7, b: b7, c: c7, d: d7 };
        answer = Math.round(result7).toString();
        explanation = `${a7}x - ${c7}x = ${d7} - ${b7}, ${a7 - c7}x = ${d7 - b7}, x = ${Math.round(result7)}`;
        explanationKey = 'tasks.equations.both_sides_explanation';
        explanationParams = { 
          a: a7, b: b7, c: c7, d: d7, 
          step1: a7 - c7, 
          step2: d7 - b7,
          result: Math.round(result7)
        };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 8: // Уравнение с дробями: (x + a)/b = c
        const a8 = getRandomInt(1, 5);
        const b8 = getRandomInt(2, 6);
        const c8 = getRandomInt(3, 10);
        const result8 = (c8 * b8) - a8;
        question = `Решите: (x + ${a8})/${b8} = ${c8}`;
        translationKey = 'tasks.equations.fractional';
        translationParams = { a: a8, b: b8, c: c8 };
        answer = result8.toString();
        explanation = `x + ${a8} = ${c8} × ${b8} = ${c8 * b8}, x = ${result8}`;
        explanationKey = 'tasks.equations.fractional_explanation';
        explanationParams = { a: a8, b: b8, c: c8, step: c8 * b8, result: result8 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 9: // Уравнение с вычитанием: a - x = b
        const a9 = getRandomInt(20, 40);
        const b9 = getRandomInt(5, 15);
        const result9 = a9 - b9;
        question = `Решите: ${a9} - x = ${b9}`;
        translationKey = 'tasks.equations.simple_subtraction_reverse';
        translationParams = { a: a9, b: b9 };
        answer = result9.toString();
        explanation = `x = ${a9} - ${b9} = ${result9}`;
        explanationKey = 'tasks.equations.simple_subtraction_reverse_explanation';
        explanationParams = { a: a9, b: b9, result: result9 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 10: // Уравнение с умножением на отрицательное: -ax = b
        const a10 = getRandomInt(2, 6);
        const b10 = getRandomInt(10, 30);
        const result10 = -b10 / a10;
        question = `Решите: -${a10}x = ${b10}`;
        translationKey = 'tasks.equations.negative_multiplication';
        translationParams = { a: a10, b: b10 };
        answer = Math.round(result10).toString();
        explanation = `x = ${b10} / -${a10} = ${Math.round(result10)}`;
        explanationKey = 'tasks.equations.negative_multiplication_explanation';
        explanationParams = { a: a10, b: b10, result: Math.round(result10) };
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
