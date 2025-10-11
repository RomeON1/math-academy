// day12-wordProblems.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const wordProblemsGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Задача на движение
        const speed = getRandomInt(40, 80);
        const time = getRandomInt(2, 5);
        const distance = speed * time;
        question = `Автомобиль едет со скоростью ${speed} км/ч. Какое расстояние он проедет за ${time} часа?`;
        translationKey = 'tasks.word_problems.motion';
        translationParams = { speed, time };
        answer = distance.toString();
        explanation = `Расстояние = скорость × время = ${speed} × ${time} = ${distance} км`;
        explanationKey = 'tasks.word_problems.motion_explanation';
        explanationParams = { speed, time, result: distance };
        answerFormat = "число (км)";
        formatKey = 'answerFormats.km';
        break;

      case 2: // Задача на стоимость
        const price = getRandomInt(50, 150);
        const quantity = getRandomInt(3, 8);
        const totalCost = price * quantity;
        question = `Одна тетрадь стоит ${price} руб. Сколько стоят ${quantity} тетрадей?`;
        translationKey = 'tasks.word_problems.cost';
        translationParams = { price, quantity };
        answer = totalCost.toString();
        explanation = `Стоимость = цена × количество = ${price} × ${quantity} = ${totalCost} руб`;
        explanationKey = 'tasks.word_problems.cost_explanation';
        explanationParams = { price, quantity, result: totalCost };
        answerFormat = "число (руб.)";
        formatKey = 'answerFormats.rub';
        break;

      case 3: // Задача на работу
        const workTime = getRandomInt(4, 8);
        const workRate = getRandomInt(10, 20);
        const totalParts = workRate * workTime;
        question = `Рабочий делает ${workRate} деталей в час. Сколько деталей он сделает за ${workTime} часов?`;
        translationKey = 'tasks.word_problems.work';
        translationParams = { rate: workRate, time: workTime };
        answer = totalParts.toString();
        explanation = `Детали = производительность × время = ${workRate} × ${workTime} = ${totalParts}`;
        explanationKey = 'tasks.word_problems.work_explanation';
        explanationParams = { rate: workRate, time: workTime, result: totalParts };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 4: // Задача на пропорции (рабочие)
        const workers = getRandomInt(2, 5);
        const days = getRandomInt(3, 7);
        const newWorkers = getRandomInt(4, 8);
        const newDays = Math.round((workers * days) / newWorkers);
        question = `${workers} рабочих выполняют работу за ${days} дней. За сколько дней выполнят работу ${newWorkers} рабочих?`;
        translationKey = 'tasks.word_problems.ratio';
        translationParams = { workers, days, newWorkers };
        answer = newDays.toString();
        explanation = `Время обратно пропорционально рабочим: (${workers} × ${days}) / ${newWorkers} = ${newDays} дней`;
        explanationKey = 'tasks.word_problems.ratio_explanation';
        explanationParams = { workers, days, newWorkers, result: newDays };
        answerFormat = "число (дней)";
        formatKey = 'answerFormats.number';
        break;

      case 5: // Задача на смеси
        const solution1 = getRandomInt(100, 200);
        const concentration1 = getRandomInt(10, 20);
        const solution2 = getRandomInt(50, 100);
        const concentration2 = getRandomInt(30, 40);
        const totalSalt = solution1 * concentration1/100 + solution2 * concentration2/100;
        const totalSolution = solution1 + solution2;
        const finalConc = Math.round((totalSalt / totalSolution) * 100);
        question = `Смешали ${solution1} г ${concentration1}% раствора и ${solution2} г ${concentration2}% раствора. Найдите концентрацию смеси`;
        translationKey = 'tasks.word_problems.mixture';
        translationParams = { solution: solution1, concentration: concentration1, solution2, concentration2 };
        answer = finalConc.toString();
        explanation = `Общая концентрация = (общая соль / общий раствор) × 100 = (${totalSalt.toFixed(1)} / ${totalSolution}) × 100 ≈ ${finalConc}%`;
        explanationKey = 'tasks.word_problems.mixture_explanation';
        explanationParams = { solution: solution2, concentration: concentration1, solution2, concentration2, result: finalConc };
        answerFormat = "процент";
        formatKey = 'answerFormats.percentage';
        break;

      case 6: // Задача на возраст
        const ageNow = getRandomInt(8, 12);
        const yearsLater = getRandomInt(5, 8);
        const fatherAgeNow = ageNow + 25;
        const fatherAgeLater = fatherAgeNow + yearsLater;
        question = `Сейчас сыну ${ageNow} лет, отцу ${fatherAgeNow} лет. Сколько лет будет отцу, когда сыну будет ${ageNow + yearsLater} лет?`;
        translationKey = 'tasks.word_problems.age';
        translationParams = { age: ageNow, years: yearsLater };
        answer = fatherAgeLater.toString();
        explanation = `Разница в возрасте 25 лет. Когда сыну будет ${ageNow + yearsLater}, отцу будет ${fatherAgeLater} лет`;
        explanationKey = 'tasks.word_problems.age_explanation';
        explanationParams = { age: ageNow, years: yearsLater, result: fatherAgeLater };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 7: // Задача на скорость работы
        const workAmount = getRandomInt(100, 200);
        const workTime2 = getRandomInt(4, 8);
        const workSpeed = Math.round(workAmount / workTime2);
        question = `Рабочий выполнил ${workAmount} единиц работы за ${workTime2} часов. Найдите его производительность`;
        translationKey = 'tasks.word_problems.work_speed';
        translationParams = { work: workAmount, time: workTime2 };
        answer = workSpeed.toString();
        explanation = `Производительность = работа / время = ${workAmount} / ${workTime2} = ${workSpeed} единиц/час`;
        explanationKey = 'tasks.word_problems.work_speed_explanation';
        explanationParams = { work: workAmount, time: workTime2, result: workSpeed };
        answerFormat = "число (ед./час)";
        formatKey = 'answerFormats.units_per_hour';
        break;

      case 8: // Задача на площадь
        const length8 = getRandomInt(5, 10);
        const width8 = getRandomInt(4, 8);
        const area8 = length8 * width8;
        question = `Найдите площадь комнаты длиной ${length8} м и шириной ${width8} м`;
        translationKey = 'tasks.word_problems.area';
        translationParams = { length: length8, width: width8 };
        answer = area8.toString();
        explanation = `Площадь = длина × ширина = ${length8} × ${width8} = ${area8} м²`;
        explanationKey = 'tasks.word_problems.area_explanation';
        explanationParams = { length: length8, width: width8, result: area8 };
        answerFormat = "число (м²)";
        formatKey = 'answerFormats.m2';
        break;

      case 9: // Задача на объем
        const length9 = getRandomInt(4, 8);
        const width9 = getRandomInt(3, 6);
        const height9 = getRandomInt(2, 5);
        const volume9 = length9 * width9 * height9;
        question = `Найдите объем аквариума длиной ${length9} см, шириной ${width9} см и высотой ${height9} см`;
        translationKey = 'tasks.word_problems.volume';
        translationParams = { length: length9, width: width9, height: height9 };
        answer = volume9.toString();
        explanation = `Объем = длина × ширина × высота = ${length9} × ${width9} × ${height9} = ${volume9} см³`;
        explanationKey = 'tasks.word_problems.volume_explanation';
        explanationParams = { length: length9, width: width9, height: height9, result: volume9 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 10: // Задача на проценты (скидка)
        const original10 = getRandomInt(200, 600);
        const discount10 = 17;
        const newPrice10 = original10 * (1 - discount10/100);
        question = `Товар стоил ${original10} руб. Скидка ${discount10}%. Найдите новую цену.`;
        answer = Math.round(newPrice10).toString();
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
