export const courseData = [
  {
    day: 1,
    title: "Дроби и проценты",
    theoryLink: "https://math.ru/drobi",
    tasks: [
      { question: "Сколько будет ½ от 100?", answer: "50", explanation: "½ означает половину. Половина от 100 равна 50." },
      { question: "Переведите 25% в дробь", answer: "1/4", explanation: "25% = 25/100 = 1/4" },
      { question: "Вычислите: ⅓ + ⅓", answer: "2/3", explanation: "При сложении дробей с одинаковым знаменателем складываем числители: 1 + 1 = 2, знаменатель остается 3." },
      { question: "Найдите ¾ от 80", answer: "60", explanation: "¾ от 80 = 80 × 3 ÷ 4 = 60" },
      { question: "Переведите 0.75 в процент", answer: "75%", explanation: "0.75 × 100 = 75%" },
      { question: "Сократите дробь 8/12", answer: "2/3", explanation: "8/12 = 2/3 (делим числитель и знаменатель на 4)" },
      { question: "Вычислите: 20% от 150", answer: "30", explanation: "20% от 150 = 150 × 0.20 = 30" },
      { question: "Сравните: ½ и 0.5", answer: "равны", explanation: "½ = 0.5, поэтому они равны" },
      { question: "Переведите 3/5 в процент", answer: "60%", explanation: "3/5 = 0.6 = 60%" },
      { question: "Решите: ⅔ - ⅓", answer: "1/3", explanation: "При вычитании дробей с одинаковым знаменателем вычитаем числители: 2 - 1 = 1, знаменатель остается 3." },
      { question: "Найдите 15% от 200", answer: "30", explanation: "15% от 200 = 200 × 0.15 = 30" },
      { question: "Переведите 0.2 в дробь", answer: "1/5", explanation: "0.2 = 2/10 = 1/5" }
    ]
  },
  {
    day: 2,
    title: "Геометрические фигуры",
    theoryLink: "https://math.ru/geometry/6class",
    tasks: [
      { question: "Периметр квадрата со стороной 5 см?", answer: "20", explanation: "Периметр квадрата = 4 × сторона = 4 × 5 = 20 см." },
      { question: "Площадь прямоугольника 4×6 см?", answer: "24", explanation: "Площадь прямоугольника = длина × ширина = 4 × 6 = 24 см²." },
      { question: "Угол в равностороннем треугольнике?", answer: "60", explanation: "В равностороннем треугольнике все углы равны 60°." },
      { question: "Диаметр окружности радиусом 7 см?", answer: "14", explanation: "Диаметр = 2 × радиус = 2 × 7 = 14 см." },
      { question: "Объем куба с ребром 3 см?", answer: "27", explanation: "Объем куба = ребро³ = 3 × 3 × 3 = 27 см³." },
      { question: "Площадь круга радиусом 5 см (π≈3.14)?", answer: "78.5", explanation: "Площадь круга = π × радиус² = 3.14 × 25 = 78.5 см²." },
      { question: "Периметр равнобедренного треугольника со сторонами 5,5,8 см?", answer: "18", explanation: "Периметр = сумма всех сторон = 5 + 5 + 8 = 18 см." },
      { question: "Количество вершин у куба?", answer: "8", explanation: "Куб имеет 8 вершин." },
      { question: "Площадь треугольника с основанием 10 и высотой 6?", answer: "30", explanation: "Площадь треугольника = (основание × высота) ÷ 2 = (10 × 6) ÷ 2 = 30." },
      { question: "Длина окружности диаметром 10 см (π≈3.14)?", answer: "31.4", explanation: "Длина окружности = π × диаметр = 3.14 × 10 = 31.4 см." }
    ]
  },
  {
    day: 3,
    title: "Уравнения",
    theoryLink: "https://interneturok.ru/textbook/math/6-klass/uravneniya",
    tasks: [
      { question: "Решите: x + 7 = 15", answer: "8", explanation: "x = 15 - 7 = 8" },
      { question: "Найдите y: 2y = 18", answer: "9", explanation: "y = 18 ÷ 2 = 9" },
      { question: "Решите: 3z - 5 = 10", answer: "5", explanation: "3z = 10 + 5 = 15, z = 15 ÷ 3 = 5" },
      { question: "Решите: 4a + 2 = 18", answer: "4", explanation: "4a = 18 - 2 = 16, a = 16 ÷ 4 = 4" },
      { question: "Найдите b: b/3 = 7", answer: "21", explanation: "b = 7 × 3 = 21" },
      { question: "Решите: 5x - 3 = 2x + 9", answer: "4", explanation: "5x - 2x = 9 + 3, 3x = 12, x = 4" },
      { question: "Найдите c: 2(c + 3) = 14", answer: "4", explanation: "2c + 6 = 14, 2c = 8, c = 4" },
      { question: "Решите: 3(x - 2) = 2(x + 1)", answer: "8", explanation: "3x - 6 = 2x + 2, 3x - 2x = 2 + 6, x = 8" }
    ]
  },
  {
    day: 4,
    title: "Десятичные дроби",
    theoryLink: "https://math.ru/drobi/desyatichnye",
    tasks: [
      { question: "Сложите: 2.5 + 3.7", answer: "6.2", explanation: "2.5 + 3.7 = 6.2" },
      { question: "Вычтите: 8.9 - 4.3", answer: "4.6", explanation: "8.9 - 4.3 = 4.6" },
      { question: "Умножьте: 3.2 × 4", answer: "12.8", explanation: "3.2 × 4 = 12.8" },
      { question: "Разделите: 9.6 ÷ 3", answer: "3.2", explanation: "9.6 ÷ 3 = 3.2" },
      { question: "Округлите 7.846 до сотых", answer: "7.85", explanation: "Цифра 4 в разряде тысячных больше 5, поэтому округляем вверх." },
      { question: "Сравните: 0.75 и 3/4", answer: "равны", explanation: "3/4 = 0.75, поэтому они равны" }
    ]
  },
  {
    day: 5,
    title: "Отношения и пропорции",
    theoryLink: "https://interneturok.ru/textbook/math/6-klass/otnosheniya",
    tasks: [
      { question: "Найдите отношение 12 к 4", answer: "3:1", explanation: "12:4 = 3:1" },
      { question: "Решите пропорцию: 2/3 = x/9", answer: "6", explanation: "2/3 = x/9, x = (2×9)/3 = 6" },
      { question: "Если 5 кг яблок стоят 250 руб, сколько стоят 3 кг?", answer: "150", explanation: "250/5 = 50 руб/кг, 3×50 = 150 руб" }
    ]
  },
  {
    day: 6,
    title: "Координатная плоскость",
    theoryLink: "https://math.ru/geometry/koordinaty",
    tasks: [
      { question: "В какой четверти находится точка (3, -2)?", answer: "IV", explanation: "x>0, y<0 - четверть IV" },
      { question: "Найдите расстояние между точками (1,2) и (4,6)", answer: "5", explanation: "√((4-1)² + (6-2)²) = √(9+16) = √25 = 5" }
    ]
  },
  // Дни 7-14 будут добавлены аналогично...
  {
    day: 7,
    title: "Обыкновенные дроби",
    theoryLink: "https://math.ru/drobi/obyknovennye",
    tasks: [
      { question: "Сложите: 1/2 + 1/3", answer: "5/6", explanation: "Общий знаменатель 6: 3/6 + 2/6 = 5/6" },
      { question: "Вычтите: 3/4 - 1/2", answer: "1/4", explanation: "3/4 - 2/4 = 1/4" }
    ]
  }
];

// Остальные дни (8-14) добавляются по аналогии...
