

// Вспомогательные функции
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Генераторы задач по темам
export const taskGenerators = {
  // Дроби и проценты
  'fractions': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Простые дроби
          const num = getRandomInt(1, 5);
          const den = getRandomInt(2, 8);
          question = `Сократите дробь: ${num * 2}/${den * 2}`;
          answer = `${num}/${den}`;
          explanation = `Делим числитель и знаменатель на 2: ${num * 2}/${den * 2} = ${num}/${den}`;
          answerFormat = "дробь (например: 3/4)";
          break;

        case 2: // Проценты
          const percent = getRandomInt(10, 90);
          const number = getRandomInt(20, 200);
          const result = Math.round((percent / 100) * number);
          question = `Найдите ${percent}% от числа ${number}`;
          answer = result.toString();
          explanation = `${percent}% от ${number} = (${percent} × ${number}) / 100 = ${result}`;
          answerFormat = "число";
          break;

        case 3: // Сложение дробей
          const a = getRandomInt(1, 4);
          const b = getRandomInt(1, 4);
          const c = getRandomInt(1, 4);
          question = `Сложите дроби: ${a}/6 + ${b}/6`;
          answer = `${a + b}/6`;
          explanation = `При одинаковых знаменателях складываем числители: ${a} + ${b} = ${a + b}`;
          answerFormat = "дробь (например: 5/6)";
          break;

        case 4: // Вычитание дробей
          const x = getRandomInt(3, 7);
          const y = getRandomInt(1, 3);
          question = `Вычтите дроби: ${x}/8 - ${y}/8`;
          answer = `${x - y}/8`;
          explanation = `При одинаковых знаменателях вычитаем числители: ${x} - ${y} = ${x - y}`;
          answerFormat = "дробь";
          break;

        case 5: // Перевод процентов в дроби
          const p = getRandomInt(5, 95);
          question = `Представьте ${p}% в виде несократимой дроби`;
          answer = `${p}/100`;
          explanation = `${p}% = ${p}/100`;
          answerFormat = "дробь";
          break;

        case 6: // Нахождение числа по проценту
          const perc = getRandomInt(10, 40);
          const value = getRandomInt(15, 60);
          const total = Math.round((value * 100) / perc);
          question = `Если ${perc}% числа равны ${value}, найдите всё число`;
          answer = total.toString();
          explanation = `100% = (${value} × 100) / ${perc} = ${total}`;
          answerFormat = "число";
          break;
        
        default:
         // код по умолчанию
         break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Геометрические фигуры
  'geometry': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Периметр прямоугольника
          const l = getRandomInt(5, 15);
          const w = getRandomInt(3, 10);
          question = `Найдите периметр прямоугольника со сторонами ${l} см и ${w} см`;
          answer = (2 * (l + w)).toString();
          explanation = `Периметр = 2 × (${l} + ${w}) = ${2 * (l + w)} см`;
          answerFormat = "число (в см)";
          break;

        case 2: // Площадь прямоугольника
          const length = getRandomInt(6, 12);
          const width = getRandomInt(4, 8);
          question = `Найдите площадь прямоугольника со сторонами ${length} см и ${width} см`;
          answer = (length * width).toString();
          explanation = `Площадь = ${length} × ${width} = ${length * width} см²`;
          answerFormat = "число (в см²)";
          break;

        case 3: // Площадь треугольника
          const base = getRandomInt(8, 16);
          const height = getRandomInt(5, 10);
          question = `Найдите площадь треугольника с основанием ${base} см и высотой ${height} см`;
          answer = Math.round((base * height) / 2).toString();
          explanation = `Площадь = (${base} × ${height}) / 2 = ${(base * height) / 2} см²`;
          answerFormat = "число (в см²)";
          break;

        case 4: // Окружность
          const radius = getRandomInt(3, 10);
          question = `Найдите длину окружности с радиусом ${radius} см (π ≈ 3.14)`;
          answer = Math.round(2 * 3.14 * radius).toString();
          explanation = `Длина = 2 × π × R = 2 × 3.14 × ${radius} ≈ ${Math.round(2 * 3.14 * radius)} см`;
          answerFormat = "число (в см)";
          break;

        case 5: // Объем прямоугольника
          const l3 = getRandomInt(4, 8);
          const w3 = getRandomInt(3, 6);
          const h3 = getRandomInt(2, 5);
          question = `Найдите объем прямоугольного параллелепипеда со сторонами ${l3} см, ${w3} см и ${h3} см`;
          answer = (l3 * w3 * h3).toString();
          explanation = `Объем = ${l3} × ${w3} × ${h3} = ${l3 * w3 * h3} см³`;
          answerFormat = "число (в см³)";
          break;

        case 6: // Углы треугольника
          const angle1 = getRandomInt(30, 80);
          const angle2 = getRandomInt(30, 80);
          const angle3 = 180 - angle1 - angle2;
          question = `В треугольнике два угла равны ${angle1}° и ${angle2}°. Найдите третий угол`;
          answer = angle3.toString();
          explanation = `Сумма углов треугольника = 180°. Третий угол = 180 - ${angle1} - ${angle2} = ${angle3}°`;
          answerFormat = "число (в градусах)";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Уравнения
  'equations': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Простые уравнения
          const a = getRandomInt(2, 9);
          const b = getRandomInt(5, 15);
          question = `Решите: x + ${a} = ${b}`;
          answer = (b - a).toString();
          explanation = `x = ${b} - ${a} = ${b - a}`;
          answerFormat = "число";
          break;

        case 2: // Умножение
          const c = getRandomInt(2, 5);
          const d = getRandomInt(3, 8);
          question = `Решите: ${c}x = ${c * d}`;
          answer = d.toString();
          explanation = `x = ${c * d} / ${c} = ${d}`;
          answerFormat = "число";
          break;

        case 3: // Сложные уравнения
          const e = getRandomInt(2, 4);
          const f = getRandomInt(1, 3);
          const g = getRandomInt(10, 20);
          question = `Решите: ${e}x - ${f} = ${g}`;
          answer = Math.round((g + f) / e).toString();
          explanation = `${e}x = ${g} + ${f} = ${g + f}, x = ${g + f} / ${e} = ${(g + f) / e}`;
          answerFormat = "число";
          break;

        case 4: // Дроби в уравнениях
          const h = getRandomInt(2, 5);
          const i = getRandomInt(3, 7);
          question = `Решите: x/${h} = ${i}`;
          answer = (h * i).toString();
          explanation = `x = ${i} × ${h} = ${h * i}`;
          answerFormat = "число";
          break;

        case 5: // Уравнения с двумя шагами
          const j = getRandomInt(2, 4);
          const k = getRandomInt(1, 3);
          const m = getRandomInt(8, 16);
          question = `Решите: ${j}(x + ${k}) = ${j * (m + k)}`;
          answer = m.toString();
          explanation = `x + ${k} = ${j * (m + k)} / ${j} = ${m + k}, x = ${m + k} - ${k} = ${m}`;
          answerFormat = "число";
          break;

        case 6: // Комбинированные уравнения
          const n = getRandomInt(2, 3);
          const o = getRandomInt(4, 9);
          const p = getRandomInt(1, 3);
          question = `Решите: ${n}x + ${p} = ${n * o + p}`;
          answer = o.toString();
          explanation = `${n}x = ${n * o + p} - ${p} = ${n * o}, x = ${n * o} / ${n} = ${o}`;
          answerFormat = "число";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Десятичные дроби
  'decimals': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Сложение
          const a = (getRandomInt(10, 50) / 10).toFixed(1);
          const b = (getRandomInt(5, 30) / 10).toFixed(1);
          question = `Сложите: ${a} + ${b}`;
          answer = (parseFloat(a) + parseFloat(b)).toFixed(1);
          explanation = `${a} + ${b} = ${(parseFloat(a) + parseFloat(b)).toFixed(1)}`;
          answerFormat = "десятичная дробь (например: 2.5)";
          break;

        case 2: // Вычитание
          const c = (getRandomInt(20, 80) / 10).toFixed(1);
          const d = (getRandomInt(5, 40) / 10).toFixed(1);
          question = `Вычтите: ${c} - ${d}`;
          answer = (parseFloat(c) - parseFloat(d)).toFixed(1);
          explanation = `${c} - ${d} = ${(parseFloat(c) - parseFloat(d)).toFixed(1)}`;
          answerFormat = "десятичная дробь";
          break;

        case 3: // Умножение
          const e = (getRandomInt(10, 40) / 10).toFixed(1);
          const f = getRandomInt(2, 5);
          question = `Умножьте: ${e} × ${f}`;
          answer = (parseFloat(e) * f).toFixed(1);
          explanation = `${e} × ${f} = ${(parseFloat(e) * f).toFixed(1)}`;
          answerFormat = "десятичная дробь";
          break;

        case 4: // Деление
          const g = (getRandomInt(20, 60) / 10).toFixed(1);
          const h = getRandomInt(2, 4);
          question = `Разделите: ${g} ÷ ${h}`;
          answer = (parseFloat(g) / h).toFixed(1);
          explanation = `${g} ÷ ${h} = ${(parseFloat(g) / h).toFixed(1)}`;
          answerFormat = "десятичная дробь";
          break;

        case 5: // Округление
          const num = (getRandomInt(100, 999) / 100).toFixed(2);
          question = `Округлите число ${num} до десятых`;
          answer = (Math.round(parseFloat(num) * 10) / 10).toFixed(1);
          explanation = `${num} ≈ ${(Math.round(parseFloat(num) * 10) / 10).toFixed(1)} (цифра сотых ≥ 5, поэтому увеличиваем десятые на 1)`;
          answerFormat = "десятичная дробь";
          break;

        case 6: // Сравнение
          const dec1 = (getRandomInt(25, 75) / 100).toFixed(2);
          const dec2 = (getRandomInt(1, 4) / 4).toFixed(2);
          question = `Сравните: ${dec1} и ${dec2}`;
          answer = parseFloat(dec1) > parseFloat(dec2) ? ">" : "<";
          explanation = `${dec1} ${parseFloat(dec1) > parseFloat(dec2) ? ">" : "<"} ${dec2}`;
          answerFormat = "знак (> или <)";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Отношения и пропорции
  'ratios': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Отношения
          const num1 = getRandomInt(2, 10);
          const num2 = getRandomInt(2, 10);
          question = `Найдите отношение ${num1 * 2} к ${num2 * 2}`;
          answer = `${num1}:${num2}`;
          explanation = `${num1 * 2}:${num2 * 2} = ${num1}:${num2} (делим на 2)`;
          answerFormat = "отношение (например: 3:4)";
          break;

        case 2: // Пропорции
          const a = getRandomInt(2, 5);
          const b = getRandomInt(2, 5);
          const c = getRandomInt(5, 15);
          question = `Решите пропорцию: ${a}/${b} = x/${c * b / a}`;
          answer = c.toString();
          explanation = `${a}/${b} = x/${c * b / a}, x = (${a} × ${c * b / a}) / ${b} = ${c}`;
          answerFormat = "число";
          break;

        case 3: // Задачи на пропорции
          const price = getRandomInt(100, 500);
          const quantity = getRandomInt(2, 10);
          question = `Если ${quantity} кг товара стоят ${price * quantity} руб, сколько стоит 1 кг?`;
          answer = price.toString();
          explanation = `Цена за 1 кг = ${price * quantity} / ${quantity} = ${price} руб`;
          answerFormat = "число (руб)";
          break;

        case 4: // Масштаб
          const scale = getRandomInt(2, 5);
          const distance = getRandomInt(10, 50);
          question = `На карте масштаба 1:${scale}000 расстояние ${distance} мм. Какое реальное расстояние?`;
          answer = (distance * scale).toString();
          explanation = `Реальное расстояние = ${distance} × ${scale} = ${distance * scale} м`;
          answerFormat = "число (в метрах)";
          break;

        case 5: // Процентные отношения
          const part = getRandomInt(20, 80);
          const whole = getRandomInt(100, 200);
          question = `Какой процент составляет ${part} от ${whole}?`;
          answer = Math.round((part / whole) * 100).toString();
          explanation = `(${part} / ${whole}) × 100 = ${Math.round((part / whole) * 100)}%`;
          answerFormat = "число с %";
          break;

        case 6: // Деление в отношении
          const total = getRandomInt(60, 120);
          const ratio1 = getRandomInt(2, 4);
          const ratio2 = getRandomInt(1, 3);
          question = `Разделите число ${total} в отношении ${ratio1}:${ratio2}`;
          const part1 = Math.round((total * ratio1) / (ratio1 + ratio2));
          const part2 = total - part1;
          answer = `${part1} и ${part2}`;
          explanation = `Первая часть = (${total} × ${ratio1}) / ${ratio1 + ratio2} = ${part1}, вторая = ${total} - ${part1} = ${part2}`;
          answerFormat = "два числа через 'и'";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Координатная плоскость
  'coordinates': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Четверти
          const x = getRandomInt(-5, 5);
          const y = getRandomInt(-5, 5);
          let quarter;
          if (x > 0 && y > 0) quarter = "I";
          else if (x < 0 && y > 0) quarter = "II";
          else if (x < 0 && y < 0) quarter = "III";
          else if (x > 0 && y < 0) quarter = "IV";
          else quarter = "на оси";
          
          question = `В какой четверти находится точка (${x}, ${y})?`;
          answer = quarter;
          explanation = `Точка (${x}, ${y}) находится ${quarter === "на оси" ? "на оси координат" : "в " + quarter + " четверти"}`;
          answerFormat = "римская цифра (I, II, III, IV) или 'на оси'";
          break;

        case 2: // Расстояние между точками
          const x1 = getRandomInt(1, 5);
          const y1 = getRandomInt(1, 5);
          const x2 = getRandomInt(6, 10);
          const y2 = getRandomInt(6, 10);
          const distance = Math.round(Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2)));
          question = `Найдите расстояние между точками (${x1},${y1}) и (${x2},${y2})`;
          answer = distance.toString();
          explanation = `Расстояние = √((${x2}-${x1})² + (${y2}-${y1})²) = √(${Math.pow(x2 - x1, 2)} + ${Math.pow(y2 - y1, 2)}) = ${distance}`;
          answerFormat = "число";
          break;

        case 3: // Симметрия
          const pointX = getRandomInt(2, 8);
          const pointY = getRandomInt(2, 8);
          question = `Найдите точку, симметричную точке (${pointX},${pointY}) относительно оси Y`;
          answer = `(-${pointX},${pointY})`;
          explanation = `При симметрии относительно оси Y меняется знак у X: (${pointX},${pointY}) → (-${pointX},${pointY})`;
          answerFormat = "координаты в скобках";
          break;

        case 4: // Координаты середины
          const xa = getRandomInt(1, 4);
          const ya = getRandomInt(1, 4);
          const xb = getRandomInt(6, 9);
          const yb = getRandomInt(6, 9);
          const midX = Math.round((xa + xb) / 2);
          const midY = Math.round((ya + yb) / 2);
          question = `Найдите координаты середины отрезка с концами (${xa},${ya}) и (${xb},${yb})`;
          answer = `(${midX},${midY})`;
          explanation = `Середина = ((${xa}+${xb})/2, (${ya}+${yb})/2) = (${midX},${midY})`;
          answerFormat = "координаты в скобках";
          break;

        case 5: // Определение координат
          const figure = ["прямоугольник", "квадрат", "треугольник"][getRandomInt(0, 2)];
          question = `Назовите координаты вершин ${figure}`;
          answer = "зависит от фигуры";
          explanation = `Координаты вершин ${figure} можно определить по сетке координат`;
          answerFormat = "координаты точек";
          break;

        case 6: // Перемещение
          const startX = getRandomInt(1, 5);
          const startY = getRandomInt(1, 5);
          const moveX = getRandomInt(2, 4);
          const moveY = getRandomInt(2, 4);
          question = `Точка (${startX},${startY}) переместилась на (${moveX},${moveY}). Найдите новые координаты`;
          answer = `(${startX + moveX},${startY + moveY})`;
          explanation = `Новые координаты: (${startX}+${moveX}, ${startY}+${moveY}) = (${startX + moveX},${startY + moveY})`;
          answerFormat = "координаты в скобках";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Обыкновенные дроби
  'commonFractions': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Сложение с разными знаменателями
          const a = getRandomInt(1, 3);
          const b = getRandomInt(1, 3);
          question = `Сложите дроби: ${a}/2 + ${b}/3`;
          answer = `${a * 3 + b * 2}/6`;
          explanation = `Общий знаменатель 6: ${a}/2 = ${a * 3}/6, ${b}/3 = ${b * 2}/6, сумма = ${a * 3 + b * 2}/6`;
          answerFormat = "дробь";
          break;

        case 2: // Вычитание
          const c = getRandomInt(2, 4);
          const d = getRandomInt(1, 2);
          question = `Вычтите дроби: ${c}/4 - ${d}/2`;
          answer = `${c - d * 2}/4`;
          explanation = `Общий знаменатель 4: ${d}/2 = ${d * 2}/4, разность = ${c - d * 2}/4`;
          answerFormat = "дробь";
          break;

        case 3: // Умножение
          const e = getRandomInt(1, 3);
          const f = getRandomInt(1, 3);
          const g = getRandomInt(2, 4);
          const h = getRandomInt(2, 4);
          question = `Умножьте дроби: ${e}/${f} × ${g}/${h}`;
          answer = `${e * g}/${f * h}`;
          explanation = `Умножаем числители и знаменатели: ${e}×${g}/${f}×${h} = ${e * g}/${f * h}`;
          answerFormat = "дробь";
          break;

        case 4: // Деление
          const i = getRandomInt(1, 3);
          const j = getRandomInt(2, 4);
          const k = getRandomInt(1, 3);
          const l = getRandomInt(2, 4);
          question = `Разделите дроби: ${i}/${j} ÷ ${k}/${l}`;
          answer = `${i * l}/${j * k}`;
          explanation = `Деление = умножение на обратную: ${i}/${j} × ${l}/${k} = ${i * l}/${j * k}`;
          answerFormat = "дробь";
          break;

        case 5: // Сравнение
          const m = getRandomInt(1, 3);
          const n = getRandomInt(2, 5);
          const o = getRandomInt(1, 3);
          const p = getRandomInt(2, 5);
          const value1 = m / n;
          const value2 = o / p;
          question = `Сравните дроби: ${m}/${n} и ${o}/${p}`;
          answer = value1 > value2 ? ">" : "<";
          explanation = `${m}/${n} ${value1 > value2 ? ">" : "<"} ${o}/${p}`;
          answerFormat = "знак (> или <)";
          break;

        case 6: // Приведение к общему знаменателю
          const q = getRandomInt(1, 3);
          const r = getRandomInt(2, 4);
          const s = getRandomInt(1, 3);
          const t = getRandomInt(3, 5);
          question = `Приведите дроби ${q}/${r} и ${s}/${t} к общему знаменателю`;
          answer = `${q * t}/${r * t} и ${s * r}/${t * r}`;
          explanation = `Общий знаменатель ${r * t}: ${q}/${r} = ${q * t}/${r * t}, ${s}/${t} = ${s * r}/${t * r}`;
          answerFormat = "две дроби через 'и'";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Проценты в жизни
  'percentages': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Скидки
          const price = getRandomInt(500, 2000);
          const discount = getRandomInt(10, 30);
          question = `Товар стоит ${price} руб. Скидка ${discount}%. Какова новая цена?`;
          answer = Math.round(price * (1 - discount/100)).toString();
          explanation = `Новая цена = ${price} × (1 - ${discount}/100) = ${price} × ${1 - discount/100} = ${Math.round(price * (1 - discount/100))} руб`;
          answerFormat = "число (руб)";
          break;

        case 2: // Налоги
          const salary = getRandomInt(10000, 30000);
          const tax = getRandomInt(10, 15);
          question = `Зарплата ${salary} руб. Налог ${tax}%. Сколько получить на руки?`;
          answer = Math.round(salary * (1 - tax/100)).toString();
          explanation = `На руки = ${salary} × (1 - ${tax}/100) = ${Math.round(salary * (1 - tax/100))} руб`;
          answerFormat = "число (руб)";
          break;

        case 3: // Процентный рост
          const oldValue = getRandomInt(100, 300);
          const growth = getRandomInt(10, 25);
          question = `Число выросло на ${growth}% и стало ${oldValue * (1 + growth/100)}. Каково было исходное число?`;
          answer = oldValue.toString();
          explanation = `Исходное число = ${oldValue * (1 + growth/100)} / (1 + ${growth}/100) = ${oldValue}`;
          answerFormat = "число";
          break;

        case 4: // Распределение
          const total = getRandomInt(120, 240);
          const percent1 = getRandomInt(30, 50);
          const percent2 = getRandomInt(20, 40);
          question = `Из ${total} человек ${percent1}% - мужчины, ${percent2}% - женщины. Сколько остальных?`;
          const others = total * (1 - (percent1 + percent2)/100);
          answer = Math.round(others).toString();
          explanation = `Остальные = ${total} × (1 - (${percent1} + ${percent2})/100) = ${total} × ${1 - (percent1 + percent2)/100} ≈ ${Math.round(others)}`;
          answerFormat = "число";
          break;

        case 5: // Банковский процент
          const deposit = getRandomInt(1000, 5000);
          const rate = getRandomInt(5, 8);
          const years = getRandomInt(1, 3);
          question = `Вклад ${deposit} руб под ${rate}% годовых на ${years} год(а). Какая сумма будет?`;
          const amount = Math.round(deposit * Math.pow(1 + rate/100, years));
          answer = amount.toString();
          explanation = `Сумма = ${deposit} × (1 + ${rate}/100)^${years} ≈ ${amount} руб`;
          answerFormat = "число (руб)";
          break;

        case 6: // Концентрация
          const solution = getRandomInt(200, 400);
          const concentration = getRandomInt(10, 20);
          question = `В ${solution} г раствора ${concentration}% соли. Сколько грамм соли?`;
          answer = Math.round(solution * concentration/100).toString();
          explanation = `Соль = ${solution} × ${concentration}/100 = ${Math.round(solution * concentration/100)} г`;
          answerFormat = "число (г)";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Площади фигур
  'areas': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Площадь круга
          const radius = getRandomInt(3, 8);
          question = `Найдите площадь круга с радиусом ${radius} см (π ≈ 3.14)`;
          answer = Math.round(3.14 * radius * radius).toString();
          explanation = `Площадь = π × R² = 3.14 × ${radius}² ≈ ${Math.round(3.14 * radius * radius)} см²`;
          answerFormat = "число (см²)";
          break;

        case 2: // Площадь трапеции
          const base1 = getRandomInt(6, 10);
          const base2 = getRandomInt(4, 8);
          const height = getRandomInt(5, 9);
          question = `Найдите площадь трапеции с основаниями ${base1} см и ${base2} см и высотой ${height} см`;
          answer = Math.round(((base1 + base2) / 2) * height).toString();
          explanation = `Площадь = ((${base1} + ${base2}) / 2) × ${height} = ${Math.round(((base1 + base2) / 2) * height)} см²`;
          answerFormat = "число (см²)";
          break;

        case 3: // Площадь ромба
          const diagonal1 = getRandomInt(6, 12);
          const diagonal2 = getRandomInt(4, 10);
          question = `Найдите площадь ромба с диагоналями ${diagonal1} см и ${diagonal2} см`;
          answer = Math.round((diagonal1 * diagonal2) / 2).toString();
          explanation = `Площадь = (${diagonal1} × ${diagonal2}) / 2 = ${Math.round((diagonal1 * diagonal2) / 2)} см²`;
          answerFormat = "число (см²)";
          break;

        case 4: // Площадь параллелограмма
          const base = getRandomInt(7, 12);
          const h = getRandomInt(5, 9);
          question = `Найдите площадь параллелограмма с основанием ${base} см и высотой ${h} см`;
          answer = (base * h).toString();
          explanation = `Площадь = ${base} × ${h} = ${base * h} см²`;
          answerFormat = "число (см²)";
          break;

        case 5: // Площадь composite figure
          const side1 = getRandomInt(5, 8);
          const side2 = getRandomInt(3, 6);
          question = `Найдите площадь фигуры, состоящей из квадрата со стороной ${side1} см и прямоугольника ${side2}×${side1} см`;
          answer = (side1 * side1 + side2 * side1).toString();
          explanation = `Площадь = площадь квадрата + площадь прямоугольника = ${side1}² + ${side2}×${side1} = ${side1 * side1 + side2 * side1} см²`;
          answerFormat = "число (см²)";
          break;

        case 6: // Сравнение площадей
          const area1 = getRandomInt(20, 40);
          const area2 = getRandomInt(25, 45);
          question = `Сравните площади: ${area1} см² и ${area2} см²`;
          answer = area1 > area2 ? ">" : "<";
          explanation = `${area1} см² ${area1 > area2 ? ">" : "<"} ${area2} см²`;
          answerFormat = "знак (> или <)";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Объемы тел
  'volumes': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Объем куба
          const side = getRandomInt(3, 7);
          question = `Найдите объем куба с ребром ${side} см`;
          answer = (side * side * side).toString();
          explanation = `Объем = ${side}³ = ${side * side * side} см³`;
          answerFormat = "число (см³)";
          break;

        case 2: // Объем цилиндра
          const radius = getRandomInt(2, 5);
          const height = getRandomInt(6, 10);
          question = `Найдите объем цилиндра с радиусом ${radius} см и высотой ${height} см (π ≈ 3.14)`;
          answer = Math.round(3.14 * radius * radius * height).toString();
          explanation = `Объем = π × R² × h = 3.14 × ${radius}² × ${height} ≈ ${Math.round(3.14 * radius * radius * height)} см³`;
          answerFormat = "число (см³)";
          break;

        case 3: // Объем конуса
          const r = getRandomInt(3, 6);
          const h = getRandomInt(5, 9);
          question = `Найдите объем конуса с радиусом ${r} см и высотой ${h} см (π ≈ 3.14)`;
          answer = Math.round((3.14 * r * r * h) / 3).toString();
          explanation = `Объем = (π × R² × h) / 3 = (3.14 × ${r}² × ${h}) / 3 ≈ ${Math.round((3.14 * r * r * h) / 3)} см³`;
          answerFormat = "число (см³)";
          break;

        case 4: // Объем шара
          const sphereR = getRandomInt(4, 7);
          question = `Найдите объем шара с радиусом ${sphereR} см (π ≈ 3.14)`;
          answer = Math.round((4 * 3.14 * sphereR * sphereR * sphereR) / 3).toString();
          explanation = `Объем = (4 × π × R³) / 3 = (4 × 3.14 × ${sphereR}³) / 3 ≈ ${Math.round((4 * 3.14 * sphereR * sphereR * sphereR) / 3)} см³`;
          answerFormat = "число (см³)";
          break;

        case 5: // Емкость
          const length = getRandomInt(10, 20);
          const width = getRandomInt(8, 15);
          const depth = getRandomInt(5, 10);
          question = `Аквариум размером ${length}×${width}×${depth} см. Сколько литров воды вмещает?`;
          const liters = Math.round((length * width * depth) / 1000);
          answer = liters.toString();
          explanation = `Объем = ${length} × ${width} × ${depth} = ${length * width * depth} см³ = ${liters} л`;
          answerFormat = "число (л)";
          break;

        case 6: // Сравнение объемов
          const vol1 = getRandomInt(50, 100);
          const vol2 = getRandomInt(60, 110);
          question = `Сравните объемы: ${vol1} см³ и ${vol2} см³`;
          answer = vol1 > vol2 ? ">" : "<";
          explanation = `${vol1} см³ ${vol1 > vol2 ? ">" : "<"} ${vol2} см³`;
          answerFormat = "знак (> или <)";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Статистика
  'statistics': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Среднее арифметическое
          const num1 = getRandomInt(10, 20);
          const num2 = getRandomInt(15, 25);
          const num3 = getRandomInt(20, 30);
          question = `Найдите среднее арифметическое чисел: ${num1}, ${num2}, ${num3}`;
          answer = Math.round((num1 + num2 + num3) / 3).toString();
          explanation = `Среднее = (${num1} + ${num2} + ${num3}) / 3 = ${(num1 + num2 + num3) / 3}`;
          answerFormat = "число";
          break;

        case 2: // Медиана
          const a = getRandomInt(5, 10);
          const b = getRandomInt(11, 20);
          const c = getRandomInt(21, 30);
          question = `Найдите медиану чисел: ${a}, ${b}, ${c}`;
          answer = b.toString();
          explanation = `Медиана (среднее в упорядоченном ряду) = ${b}`;
          answerFormat = "число";
          break;

        case 3: // Размах
          const min = getRandomInt(10, 20);
          const max = getRandomInt(30, 40);
          question = `Найдите размах чисел: ${min}, ${getRandomInt(min+1, max-1)}, ${max}`;
          answer = (max - min).toString();
          explanation = `Размах = ${max} - ${min} = ${max - min}`;
          answerFormat = "число";
          break;

        case 4: // Вероятность
          const favorable = getRandomInt(1, 4);
          const total = getRandomInt(6, 12);
          question = `В коробке ${total} шаров, ${favorable} из них красные. Какова вероятность вытащить красный шар?`;
          answer = `${favorable}/${total}`;
          explanation = `Вероятность = благоприятные / все = ${favorable}/${total}`;
          answerFormat = "дробь";
          break;

        case 5: // Диаграммы
          const values = [getRandomInt(20, 40), getRandomInt(30, 50), getRandomInt(10, 30)];
          const totalVal = values.reduce((sum, val) => sum + val, 0);
          question = `На диаграмме сектора: ${values[0]}, ${values[1]}, ${values[2]}. Какой процент составляет первый сектор?`;
          answer = Math.round((values[0] / totalVal) * 100).toString();
          explanation = `Процент = (${values[0]} / ${totalVal}) × 100 ≈ ${Math.round((values[0] / totalVal) * 100)}%`;
          answerFormat = "число с %";
          break;

        case 6: // Частота
          const eventCount = getRandomInt(8, 15);
          const totalEvents = getRandomInt(20, 30);
          question = `Событие произошло ${eventCount} раз из ${totalEvents}. Найдите частоту`;
          answer = (eventCount / totalEvents).toFixed(2);
          explanation = `Частота = ${eventCount} / ${totalEvents} = ${(eventCount / totalEvents).toFixed(2)}`;
          answerFormat = "десятичная дробь";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Текстовые задачи
  'wordProblems': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Задача на движение
          const speed = getRandomInt(40, 80);
          const time = getRandomInt(2, 5);
          question = `Автомобиль едет со скоростью ${speed} км/ч. Какое расстояние он проедет за ${time} часа?`;
          answer = (speed * time).toString();
          explanation = `Расстояние = скорость × время = ${speed} × ${time} = ${speed * time} км`;
          answerFormat = "число (км)";
          break;

        case 2: // Задача на стоимость
          const price = getRandomInt(50, 150);
          const quantity = getRandomInt(3, 8);
          question = `Одна тетрадь стоит ${price} руб. Сколько стоят ${quantity} тетрадей?`;
          answer = (price * quantity).toString();
          explanation = `Стоимость = цена × количество = ${price} × ${quantity} = ${price * quantity} руб`;
          answerFormat = "число (руб)";
          break;

        case 3: // Задача на работу
          const workTime = getRandomInt(4, 8);
          const workRate = getRandomInt(10, 20);
          question = `Рабочий делает ${workRate} деталей в час. Сколько деталей он сделает за ${workTime} часов?`;
          answer = (workRate * workTime).toString();
          explanation = `Детали = производительность × время = ${workRate} × ${workTime} = ${workRate * workTime}`;
          answerFormat = "число";
          break;

        case 4: // Задача на пропорции
          const workers = getRandomInt(2, 5);
          const days = getRandomInt(3, 7);
          const newWorkers = getRandomInt(4, 8);
          question = `${workers} рабочих выполняют работу за ${days} дней. За сколько дней выполнят работу ${newWorkers} рабочих?`;
          const newDays = Math.round((workers * days) / newWorkers);
          answer = newDays.toString();
          explanation = `Время обратно пропорционально workers: (${workers} × ${days}) / ${newWorkers} = ${newDays} дней`;
          answerFormat = "число (дней)";
          break;

        case 5: // Задача на смеси
          const solution1 = getRandomInt(100, 200);
          const concentration1 = getRandomInt(10, 20);
          const solution2 = getRandomInt(50, 100);
          const concentration2 = getRandomInt(30, 40);
          question = `Смешали ${solution1} г ${concentration1}% раствора и ${solution2} г ${concentration2}% раствора. Найдите общую концентрацию`;
          const totalSalt = solution1 * concentration1/100 + solution2 * concentration2/100;
          const totalSolution = solution1 + solution2;
          const finalConc = Math.round((totalSalt / totalSolution) * 100);
          answer = finalConc.toString();
          explanation = `Общая концентрация = (общая соль / общий раствор) × 100 = (${totalSalt} / ${totalSolution}) × 100 ≈ ${finalConc}%`;
          answerFormat = "число с %";
          break;

        case 6: // Задача на возраст
          const ageNow = getRandomInt(8, 12);
          const yearsLater = getRandomInt(5, 8);
          question = `Сейчас сыну ${ageNow} лет, отцу ${ageNow + 25} лет. Сколько лет будет отцу, когда сыну будет ${ageNow + yearsLater}?`;
          answer = (ageNow + 25 + yearsLater).toString();
          explanation = `Разница в возрасте 25 лет. Когда сыну будет ${ageNow + yearsLater}, отцу будет ${ageNow + yearsLater + 25} лет`;
          answerFormat = "число";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Симметрия
  'symmetry': (count) => {
    const tasks = [];
    const usedQuestions = new Set();

    while (tasks.length < count) {
      let question, answer, explanation, answerFormat;
      const type = getRandomInt(1, 6);

      switch (type) {
        case 1: // Ось симметрии
          const figure = ["квадрат", "равносторонний треугольник", "прямоугольник", "ромб"][getRandomInt(0, 3)];
          let axes;
          switch (figure) {
            case "квадрат": axes = "4"; break;
            case "равносторонний треугольник": axes = "3"; break;
            case "прямоугольник": axes = "2"; break;
            case "ромб": axes = "2"; break;
          }
          question = `Сколько осей симметрии у ${figure}?`;
          answer = axes;
          explanation = `У ${figure} ${axes} оси симметрии`;
          answerFormat = "число";
          break;

        case 2: // Центр симметрии
          const shape = ["квадрат", "окружность", "параллелограмм", "правильный шестиугольник"][getRandomInt(0, 3)];
          question = `Есть ли центр симметрии у ${shape}?`;
          answer = "да";
          explanation = `У ${shape} есть центр симметрии`;
          answerFormat = "да/нет";
          break;

        case 3: // Симметричные точки
          const x = getRandomInt(2, 8);
          const y = getRandomInt(2, 8);
          question = `Найдите точку, симметричную точке (${x},${y}) относительно начала координат`;
          answer = `(-${x},-${y})`;
          explanation = `Симметрия относительно (0,0): (${x},${y}) → (-${x},-${y})`;
          answerFormat = "координаты";
          break;

        case 4: // Симметрия фигур
          const patterns = ["буква А", "буква О", "сердце", "снежинка"][getRandomInt(0, 3)];
          let symType;
          switch (patterns) {
            case "буква А": symType = "вертикальная"; break;
            case "буква О": symType = "и вертикальная, и горизонтальная"; break;
            case "сердце": symType = "вертикальная"; break;
            case "снежинка": symType = "вращательная"; break;
          }
          question = `Какая симметрия у ${patterns}?`;
          answer = symType;
          explanation = `У ${patterns} ${symType} симметрия`;
          answerFormat = "тип симметрии";
          break;

        case 5: // Построение симметрии
          const pointX = getRandomInt(1, 5);
          const pointY = getRandomInt(1, 5);
          question = `Постройте точку, симметричную (${pointX},${pointY}) относительно оси X`;
          answer = `(${pointX},-${pointY})`;
          explanation = `Относительно оси X: Y меняет знак → (${pointX},-${pointY})`;
          answerFormat = "координаты";
          break;

        case 6: // Симметрия в природе
          const natural = ["лист дерева", "паутина", "морская звезда", "кристалл"][getRandomInt(0, 3)];
          question = `Приведите пример симметрии в ${natural}`;
          answer = "радиальная или bilateral";
          explanation = `${natural} имеет красивую симметричную структуру`;
          answerFormat = "тип симметрии";
          break;
      }

      if (!usedQuestions.has(question)) {
        usedQuestions.add(question);
        tasks.push({ question, answer, explanation, answerFormat });
      }
    }
    return tasks;
  },

  // Итоговое повторение (смешанные задачи)
  'review': (count) => {
    const tasks = [];
    const usedQuestions = new Set();
    const generators = ['fractions', 'geometry', 'equations', 'decimals', 'ratios', 'commonFractions'];
    
    while (tasks.length < count) {
      const randomGenerator = generators[getRandomInt(0, generators.length - 1)];
      const generatedTasks = taskGenerators[randomGenerator](1);
      
      if (!usedQuestions.has(generatedTasks[0].question)) {
        usedQuestions.add(generatedTasks[0].question);
        tasks.push(generatedTasks[0]);
      }
    }
    return tasks;
  }
};

// ПОЛНАЯ структура курса из 14 дней
export const courseStructure = [
  { day: 1, title: "Дроби и проценты", theoryLink: "https://math.ru/drobi", generator: 'fractions', taskCount: 10 },
  { day: 2, title: "Геометрические фигуры", theoryLink: "https://math.ru/geometry/6class", generator: 'geometry', taskCount: 10 },
  { day: 3, title: "Уравнения", theoryLink: "https://interneturok.ru/textbook/math/6-klass/uravneniya", generator: 'equations', taskCount: 10 },
  { day: 4, title: "Десятичные дроби", theoryLink: "https://math.ru/drobi/desyatichnye", generator: 'decimals', taskCount: 10 },
  { day: 5, title: "Отношения и пропорции", theoryLink: "https://interneturok.ru/textbook/math/6-klass/otnosheniya", generator: 'ratios', taskCount: 10 },
  { day: 6, title: "Координатная плоскость", theoryLink: "https://math.ru/geometry/koordinaty", generator: 'coordinates', taskCount: 10 },
  { day: 7, title: "Обыкновенные дроби", theoryLink: "https://math.ru/drobi/obyknovennye", generator: 'commonFractions', taskCount: 10 },
  { day: 8, title: "Проценты в жизни", theoryLink: "https://interneturok.ru/textbook/math/6-klass/protsenty", generator: 'percentages', taskCount: 10 },
  { day: 9, title: "Площади фигур", theoryLink: "https://math.ru/geometry/ploshchadi", generator: 'areas', taskCount: 10 },
  { day: 10, title: "Объемы тел", theoryLink: "https://math.ru/geometry/obemy", generator: 'volumes', taskCount: 10 },
  { day: 11, title: "Статистика", theoryLink: "https://interneturok.ru/textbook/math/6-klass/statistika", generator: 'statistics', taskCount: 10 },
  { day: 12, title: "Текстовые задачи", theoryLink: "https://math.ru/zadachi", generator: 'wordProblems', taskCount: 10 },
  { day: 13, title: "Симметрия", theoryLink: "https://math.ru/geometry/simmetriya", generator: 'symmetry', taskCount: 10 },
  { day: 14, title: "Итоговое повторение", theoryLink: "https://math.ru/repetition", generator: 'review', taskCount: 10 }
];
