// day11-statistics.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const statisticsGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Среднее арифметическое
        const numbers1 = Array.from({length: 5}, () => getRandomInt(10, 20));
        const sum1 = numbers1.reduce((a, b) => a + b, 0);
        const average1 = Math.round(sum1 / numbers1.length);
        question = `Найдите среднее арифметическое чисел: ${numbers1.join(', ')}`;
        translationKey = 'tasks.statistics.average';
        translationParams = { numbers: numbers1.join(', ') };
        answer = average1.toString();
        explanation = `Сумма = ${numbers1.join(' + ')} = ${sum1}, среднее = ${sum1} / ${numbers1.length} = ${average1}`;
        explanationKey = 'tasks.statistics.average_explanation';
        explanationParams = { numbers: numbers1.join(' + '), sum: sum1, count: numbers1.length, result: average1 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      // Вместо задачи с диаграммой:
      case 11: // Конкретная диаграмма
        const subjects = ['Математика', 'Русский язык', 'История', 'Биология', 'Физкультура'];
        const percentages = [25, 20, 15, 18, 22];
        const maxIndex = percentages.indexOf(Math.max(...percentages));
        question = `По диаграмме: Математика 25%, Русский язык 20%, История 15%, Биология 18%, Физкультура 22%. Какой предмет самый популярный?`;
        translationKey = 'tasks.statistics.read_chart_fixed';
        answer = subjects[maxIndex];
        explanation = `Самый высокий процент (25%) у Математики`;
        answerFormat = "название предмета";
        break;

      case 2: // Медиана
        const numbers2 = Array.from({length: 5}, () => getRandomInt(10, 30)).sort((a, b) => a - b);
        const median2 = numbers2[2];
        question = `Найдите медиану чисел: ${numbers2.join(', ')}`;
        translationKey = 'tasks.statistics.median';
        translationParams = { numbers: numbers2.join(', ') };
        answer = median2.toString();
        explanation = `Упорядоченный ряд: ${numbers2.join(', ')}, медиана (3е число) = ${median2}`;
        explanationKey = 'tasks.statistics.median_explanation';
        explanationParams = { numbers: numbers2.join(', '), result: median2 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 3: // Мода
        const numbers3 = [12, 15, 12, 18, 15, 12, 20];
        const mode3 = 12;
        question = `Найдите моду чисел: ${numbers3.join(', ')}`;
        translationKey = 'tasks.statistics.mode';
        translationParams = { numbers: numbers3.join(', ') };
        answer = mode3.toString();
        explanation = `Число 12 встречается 3 раза (чаще других) → мода = ${mode3}`;
        explanationKey = 'tasks.statistics.mode_explanation';
        explanationParams = { numbers: numbers3.join(', '), result: mode3 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 4: // Размах ряда
        const numbers4 = Array.from({length: 6}, () => getRandomInt(15, 40)).sort((a, b) => a - b);
        const min4 = numbers4[0];
        const max4 = numbers4[numbers4.length - 1];
        const range4 = max4 - min4;
        question = `Найдите размах чисел: ${numbers4.join(', ')}`;
        translationKey = 'tasks.statistics.range';
        translationParams = { numbers: numbers4.join(', ') };
        answer = range4.toString();
        explanation = `Минимум = ${min4}, максимум = ${max4}, размах = ${max4} - ${min4} = ${range4}`;
        explanationKey = 'tasks.statistics.range_explanation';
        explanationParams = { min: min4, max: max4, result: range4 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 5: // Вероятность
        const favorable5 = getRandomInt(2, 5);
        const total5 = getRandomInt(8, 12);
        const probability5 = `${favorable5}/${total5}`;
        question = `В корзине ${total5} шаров, ${favorable5} красных. Найдите вероятность вытащить красный шар`;
        translationKey = 'tasks.statistics.probability';
        translationParams = { favorable: favorable5, total: total5 };
        answer = probability5;
        explanation = `Вероятность = благоприятные / все = ${favorable5} / ${total5} = ${probability5}`;
        explanationKey = 'tasks.statistics.probability_explanation';
        explanationParams = { favorable: favorable5, total: total5, result: probability5 };
        answerFormat = "дробь";
        formatKey = 'answerFormats.fraction';
        break;

      case 6: // Процент от общего
        const part6 = getRandomInt(3, 8);
        const whole6 = getRandomInt(20, 30);
        const percentage6 = Math.round((part6 / whole6) * 100);
        question = `В классе ${whole6} учеников, ${part6} отличников. Найдите процент отличников`;
        translationKey = 'tasks.statistics.percentage';
        translationParams = { part: part6, whole: whole6 };
        answer = percentage6.toString();
        explanation = `Процент = (${part6} / ${whole6}) × 100 = ${percentage6}%`;
        explanationKey = 'tasks.statistics.percentage_explanation';
        explanationParams = { part: part6, whole: whole6, result: percentage6 };
        answerFormat = "процент";
        formatKey = 'answerFormats.percentage';
        break;

      case 7: // Частота
        const value7 = getRandomInt(5, 10);
        const total7 = getRandomInt(25, 40);
        const frequency7 = Math.round((value7 / total7) * 100);
        question = `Событие произошло ${value7} раз из ${total7}. Найдите частоту`;
        translationKey = 'tasks.statistics.frequency';
        translationParams = { value: value7, total: total7 };
        answer = frequency7.toString();
        explanation = `Частота = (${value7} / ${total7}) × 100 = ${frequency7}%`;
        explanationKey = 'tasks.statistics.frequency_explanation';
        explanationParams = { value: value7, total: total7, result: frequency7 };
        answerFormat = "процент";
        formatKey = 'answerFormats.percentage';
        break;

      case 8: // Диаграмма (чтение)
        const values8 = [30, 25, 20, 15, 10];
        const subjects8 = ["Математика", "Русский", "История", "Биология", "Физкультура"];
        const maxIndex8 = values8.indexOf(Math.max(...values8));
        const maxSubject = subjects8[maxIndex8];
        const maxValue = values8[maxIndex8];
        question = `По диаграмме: Математика ${values8[0]}%, Русский ${values8[1]}%, История ${values8[2]}%, Биология ${values8[3]}%, Физкультура ${values8[4]}%`;
        translationKey = 'tasks.statistics.read_chart';
        translationParams = { 
          values: values8.map((v, i) => `${subjects8[i]} ${v}%`).join(', ')
        };
        answer = maxSubject;
        explanation = `Самый высокий процент у ${maxSubject} - ${maxValue}%`;
        explanationKey = 'tasks.statistics.read_chart_explanation';
        explanationParams = { subject: maxSubject, value: maxValue };
        answerFormat = "название предмета";
        formatKey = 'answerFormats.subject';
        break;

      case 9: // Прогноз
        const current9 = getRandomInt(100, 200);
        const growth9 = getRandomInt(10, 30);
        const forecast9 = Math.round(current9 * (1 + growth9 / 100));
        question = `Сейчас ${current9} единиц, рост ${growth9}% в год. Каким будет значение через год?`;
        translationKey = 'tasks.statistics.forecast';
        translationParams = { current: current9, growth: growth9 };
        answer = forecast9.toString();
        explanation = `Через год = ${current9} + ${growth9}% = ${current9} × 1.${growth9} = ${forecast9}`;
        explanationKey = 'tasks.statistics.forecast_explanation';
        explanationParams = { current: current9, growth: growth9, result: forecast9 };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 10: // Сравнение средних
        const groupA10 = Array.from({length: 4}, () => getRandomInt(15, 25));
        const groupB10 = Array.from({length: 4}, () => getRandomInt(18, 28));
        const avgA10 = Math.round(groupA10.reduce((a, b) => a + b, 0) / groupA10.length);
        const avgB10 = Math.round(groupB10.reduce((a, b) => a + b, 0) / groupB10.length);
        const comparisonResult = avgA10 > avgB10 ? "A > B" : avgA10 < avgB10 ? "A < B" : "A = B";
        question = `Сравните средние: Группа A: ${groupA10.join(', ')}, Группа B: ${groupB10.join(', ')}`;
        translationKey = 'tasks.statistics.compare_averages';
        translationParams = { groupA: groupA10.join(', '), groupB: groupB10.join(', ') };
        answer = comparisonResult;
        explanation = `Среднее A = ${avgA10}, среднее B = ${avgB10} → ${comparisonResult}`;
        explanationKey = 'tasks.statistics.compare_averages_explanation';
        explanationParams = { avgA: avgA10, avgB: avgB10, result: comparisonResult };
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
