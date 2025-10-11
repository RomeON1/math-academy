// day8-percentages.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const percentagesGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Нахождение процента от числа
        const percent1 = getRandomInt(5, 25) * 5;
        const number1 = getRandomInt(100, 500);
        const result1 = Math.round((percent1 / 100) * number1);
        question = `Найдите ${percent1}% от числа ${number1}`;
        translationKey = 'tasks.percentages.percentage_of';
        translationParams = { percent: percent1, number: number1 };
        answer = result1.toString();
        explanation = `${percent1}% от ${number1} = (${percent1} × ${number1}) / 100 = ${result1}`;
        explanationKey = 'tasks.percentages.percentage_of_explanation';
        explanationParams = { percent: percent1, number: number1, result: result1 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 2: // Нахождение числа по проценту
        const percent2 = getRandomInt(10, 40);
        const value2 = getRandomInt(20, 80);
        const total2 = Math.round((value2 * 100) / percent2);
        question = `Если ${percent2}% числа равны ${value2}, найдите всё число`;
        translationKey = 'tasks.percentages.number_from_percentage';
        translationParams = { percent: percent2, value: value2 };
        answer = total2.toString();
        explanation = `Всё число = (${value2} × 100) / ${percent2} = ${total2}`;
        explanationKey = 'tasks.percentages.number_from_percentage_explanation';
        explanationParams = { percent: percent2, value: value2, result: total2 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 3: // Нахождение процентного отношения
        const part3 = getRandomInt(15, 45);
        const whole3 = getRandomInt(60, 150);
        const percentage3 = Math.round((part3 / whole3) * 100);
        question = `Какой процент составляет ${part3} от ${whole3}?`;
        translationKey = 'tasks.percentages.percentage_ratio';
        translationParams = { part: part3, whole: whole3 };
        answer = percentage3.toString();
        explanation = `(${part3} / ${whole3}) × 100 = ${percentage3}%`;
        explanationKey = 'tasks.percentages.percentage_ratio_explanation';
        explanationParams = { part: part3, whole: whole3, result: percentage3 };
        answerFormat = "процент";
        formatKey = 'answerFormats.percentage';
        break;

      case 4: // Увеличение на процент
        const number4 = getRandomInt(200, 800);
        const increase4 = getRandomInt(5, 20);
        const result4 = Math.round(number4 * (1 + increase4 / 100));
        question = `Увеличьте число ${number4} на ${increase4}%`;
        translationKey = 'tasks.percentages.increase_by';
        translationParams = { number: number4, percent: increase4 };
        answer = result4.toString();
        explanation = `${number4} + ${increase4}% = ${number4} × 1.${increase4} = ${result4}`;
        explanationKey = 'tasks.percentages.increase_by_explanation';
        explanationParams = { number: number4, percent: increase4, result: result4 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 5: // Уменьшение на процент
        const number5 = getRandomInt(200, 800);
        const decrease5 = getRandomInt(5, 20);
        const result5 = Math.round(number5 * (1 - decrease5 / 100));
        question = `Уменьшите число ${number5} на ${decrease5}%`;
        translationKey = 'tasks.percentages.decrease_by';
        translationParams = { number: number5, percent: decrease5 };
        answer = result5.toString();
        explanation = `${number5} - ${decrease5}% = ${number5} × 0.${100 - decrease5} = ${result5}`;
        explanationKey = 'tasks.percentages.decrease_by_explanation';
        explanationParams = { number: number5, percent: decrease5, result: result5 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 6: // Скидка в магазине
        const price6 = getRandomInt(500, 2000);
        const discount6 = getRandomInt(10, 30);
        const finalPrice6 = Math.round(price6 * (1 - discount6 / 100));
        question = `Товар стоит ${price6} руб. Скидка ${discount6}%. Найдите конечную цену`;
        translationKey = 'tasks.percentages.discount';
        translationParams = { price: price6, discount: discount6 };
        answer = finalPrice6.toString();
        explanation = `Конечная цена = ${price6} - ${discount6}% = ${finalPrice6} руб.`;
        explanationKey = 'tasks.percentages.discount_explanation';
        explanationParams = { price: price6, discount: discount6, result: finalPrice6 };
        answerFormat = "число (руб.)";
        formatKey = 'answerFormats.rub';
        break;

      case 7: // Налог на добавленную стоимость
        const price7 = getRandomInt(1000, 5000);
        const tax7 = 20;
        const priceWithTax7 = Math.round(price7 * (1 + tax7 / 100));
        question = `Цена без НДС: ${price7} руб. НДС ${tax7}%. Найдите цену с НДС`;
        translationKey = 'tasks.percentages.tax';
        translationParams = { price: price7, tax: tax7 };
        answer = priceWithTax7.toString();
        explanation = `Цена с НДС = ${price7} + ${tax7}% = ${priceWithTax7} руб.`;
        explanationKey = 'tasks.percentages.tax_explanation';
        explanationParams = { price: price7, tax: tax7, result: priceWithTax7 };
        answerFormat = "число (руб.)";
        formatKey = 'answerFormats.rub';
        break;

      case 8: // Процент успеваемости
        const total8 = getRandomInt(20, 30);
        const correct8 = getRandomInt(15, total8 - 2);
        const success8 = Math.round((correct8 / total8) * 100);
        question = `Из ${total8} заданий верно решено ${correct8}. Найдите процент успеваемости`;
        translationKey = 'tasks.percentages.success_rate';
        translationParams = { correct: correct8, total: total8 };
        answer = success8.toString();
        explanation = `Процент успеваемости = (${correct8} / ${total8}) × 100 = ${success8}%`;
        explanationKey = 'tasks.percentages.success_rate_explanation';
        explanationParams = { correct: correct8, total: total8, result: success8 };
        answerFormat = "процент";
        formatKey = 'answerFormats.percentage';
        break;

      case 9: // Распределение бюджета
        const budget9 = getRandomInt(10000, 50000);
        const percent9 = getRandomInt(10, 30);
        const part9 = Math.round((percent9 / 100) * budget9);
        question = `Бюджет ${budget9} руб. ${percent9}% выделено на проект. Сколько это?`;
        translationKey = 'tasks.percentages.budget_allocation';
        translationParams = { budget: budget9, percent: percent9 };
        answer = part9.toString();
        explanation = `${percent9}% от ${budget9} = (${percent9} × ${budget9}) / 100 = ${part9} руб.`;
        explanationKey = 'tasks.percentages.budget_allocation_explanation';
        explanationParams = { budget: budget9, percent: percent9, result: part9 };
        answerFormat = "число (руб.)";
        formatKey = 'answerFormats.rub';
        break;

      case 10: // Концентрация раствора
        const total10 = getRandomInt(200, 500);
        const substance10 = getRandomInt(30, 100);
        const concentration10 = Math.round((substance10 / total10) * 100);
        question = `В ${total10}г раствора содержится ${substance10}г вещества. Найдите концентрацию`;
        translationKey = 'tasks.percentages.concentration';
        translationParams = { total: total10, substance: substance10 };
        answer = concentration10.toString();
        explanation = `Концентрация = (${substance10} / ${total10}) × 100 = ${concentration10}%`;
        explanationKey = 'tasks.percentages.concentration_explanation';
        explanationParams = { total: total10, substance: substance10, result: concentration10 };
        answerFormat = "процент";
        formatKey = 'answerFormats.percentage';
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
