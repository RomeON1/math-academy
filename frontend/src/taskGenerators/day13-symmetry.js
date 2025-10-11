// day13-symmetry.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const symmetryGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Осевая симметрия относительно X
        const x1 = getRandomInt(-4, 4);
        const y1 = getRandomInt(-4, 4);
        const symmetricPoint1 = `(${x1}, ${-y1})`;
        question = `Найдите точку, симметричную точке (${x1}, ${y1}) относительно оси X`;
        translationKey = 'tasks.symmetry.axis_x';
        translationParams = { x: x1, y: y1 };
        answer = symmetricPoint1;
        explanation = `При симметрии относительно оси X координата y меняет знак: (${x1}, ${y1}) → ${symmetricPoint1}`;
        explanationKey = 'tasks.symmetry.axis_x_explanation';
        explanationParams = { x: x1, y: y1, result: symmetricPoint1 };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 2: // Осевая симметрия относительно Y
        const x2 = getRandomInt(-4, 4);
        const y2 = getRandomInt(-4, 4);
        const symmetricPoint2 = `(${-x2}, ${y2})`;
        question = `Найдите точку, симметричную точке (${x2}, ${y2}) относительно оси Y`;
        translationKey = 'tasks.symmetry.axis_y';
        translationParams = { x: x2, y: y2 };
        answer = symmetricPoint2;
        explanation = `При симметрии относительно оси Y координата x меняет знак: (${x2}, ${y2}) → ${symmetricPoint2}`;
        explanationKey = 'tasks.symmetry.axis_y_explanation';
        explanationParams = { x: x2, y: y2, result: symmetricPoint2 };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 3: // Центральная симметрия
        const x3 = getRandomInt(-4, 4);
        const y3 = getRandomInt(-4, 4);
        const symmetricPoint3 = `(${-x3}, ${-y3})`;
        question = `Найдите точку, симметричную точке (${x3}, ${y3}) относительно начала координат`;
        translationKey = 'tasks.symmetry.central';
        translationParams = { x: x3, y: y3 };
        answer = symmetricPoint3;
        explanation = `При симметрии относительно начала координат обе координаты меняют знак: (${x3}, ${y3}) → ${symmetricPoint3}`;
        explanationKey = 'tasks.symmetry.central_explanation';
        explanationParams = { x: x3, y: y3, result: symmetricPoint3 };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 4: // Симметрия относительно точки
        const x4 = getRandomInt(-3, 3);
        const y4 = getRandomInt(-3, 3);
        const centerX4 = getRandomInt(-2, 2);
        const centerY4 = getRandomInt(-2, 2);
        const symX4 = 2 * centerX4 - x4;
        const symY4 = 2 * centerY4 - y4;
        const symmetricPoint4 = `(${symX4}, ${symY4})`;
        question = `Найдите точку, симметричную точке (${x4}, ${y4}) относительно точки (${centerX4}, ${centerY4})`;
        translationKey = 'tasks.symmetry.point';
        translationParams = { x: x4, y: y4, centerX: centerX4, centerY: centerY4 };
        answer = symmetricPoint4;
        explanation = `x' = 2 × ${centerX4} - ${x4} = ${symX4}, y' = 2 × ${centerY4} - ${y4} = ${symY4}`;
        explanationKey = 'tasks.symmetry.point_explanation';
        explanationParams = { x: x4, y: y4, centerX: centerX4, centerY: centerY4, resultX: symX4, resultY: symY4, result: symmetricPoint4 };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 5: // Количество осей симметрии фигуры
        const shapes5 = [
          { shape: "равносторонний треугольник", axes: 3 },
          { shape: "квадрат", axes: 4 },
          { shape: "прямоугольник (не квадрат)", axes: 2 },
          { shape: "правильный пятиугольник", axes: 5 },
          { shape: "окружность", axes: "бесконечное" }
        ];
        const shape5 = shapes5[getRandomInt(0, shapes5.length - 1)];
        question = `Сколько осей симметрии у ${shape5.shape}?`;
        translationKey = 'tasks.symmetry.axes_count';
        translationParams = { shape: shape5.shape };
        answer = shape5.axes.toString();
        explanation = `${shape5.shape} имеет ${shape5.axes} ${typeof shape5.axes === 'number' ? 'оси' : 'количество'} симметрии`;
        explanationKey = 'tasks.symmetry.axes_count_explanation';
        explanationParams = { shape: shape5.shape, result: shape5.axes };
        answerFormat = "число";
        formatKey = 'answerFormats.number';
        break;

      case 6: // Симметричные фигуры в природе
        const naturalObjects6 = [
          { object: "лист дерева", symmetry: "билатеральная" },
          { object: "снежинка", symmetry: "радиальная" },
          { object极: "морская звезда", symmetry: "радиальная" },
          { object: "бабочка", symmetry: "билатеральная" },
          { object: "солнце", symmetry: "радиальная" }
        ];
        const object6 = naturalObjects6[getRandomInt(0, naturalObjects6.length - 1)];
        question = `Какой тип симметрии у ${object6.object}?`;
        translationKey = 'tasks.symmetry.nature';
        translationParams = { object: object6.object };
        answer = object6.symmetry;
        explanation = `${object6.object} имеет ${object6.symmetry} симметрию`;
        explanationKey = 'tasks.symmetry.nature_explanation';
        explanationParams = { object: object6.object, result: object6.symmetry };
        answerFormat = "тип симметрии";
        formatKey = 'answerFormats.symmetry_type';
        break;

      case 7: // Построение симметричной фигуры
        const figure7 = "треугольник ABC";
        const axis7 = ["оси X", "оси Y", "начала координат"][getRandomInt(0, 2)];
        const resultFigure7 = "треугольник A'B'C'";
        question = `Постройте фигуру, симметричную ${figure7} относительно ${axis7}`;
        translationKey = 'tasks.symmetry.construct';
        translationParams = { figure: figure7, axis: axis7 };
        answer = resultFigure7;
        explanation = `Каждая точка ${figure7} отражается относительно ${axis7}`;
        explanationKey = 'tasks.symmetry.construct_explanation';
        explanationParams = { figure: figure7, axis: axis7, result: resultFigure7 };
        answerFormat = "название фигуры";
        formatKey = 'answerFormats.figure_name';
        break;

      case 8: // Определение центра симметрии
        const points8 = [
          { x: 2, y: 3 },
          { x: 4, y: 1 },
          { x: 6, y: -1 }
        ];
        const centerX8 = 4;
        const centerY8 = 1;
        const centerPoint8 = `(${centerX8}, ${centerY8})`;
        question = `Точки ${points8.map(p => `(${p.x},${p.y})`).join(', ')} симметричны. Найдите центр симметрии`;
        translationKey = 'tasks.symmetry.find_center';
        translationParams = { points: points8.map(p => `(${p.x},${p.y})`).join(', ') };
        answer = centerPoint8;
        explanation = `Центр симметрии находится посередине между соответствующими точками`;
        explanationKey = 'tasks.symmetry.find_center_explanation';
        explanationParams = { points: points8.map(p => `(${p.x},${p.y})`).join(', '), result: centerPoint8 };
        answerFormat = "координаты (x,y)";
        formatKey = 'answerFormats.coordinate';
        break;

      case 9: // Симметрия в буквах
        const letters9 = [
          { letter: "A", symmetry: "вертикальная" },
          { letter: "B", symmetry: "вертикальная" },
          { letter: "H", symmetry: "вертикальная и горизонтальная" },
          { letter: "O", symmetry: "вертикальная и горизонтальная" },
          { letter: "M", symmetry: "вертикальная" }
        ];
        const letter9 = letters9[getRandomInt(0, letters9.length - 1)];
        question = `Какая симметрия у буквы "${letter9.letter}"?`;
        translationKey = 'tasks.symmetry.letters';
        translationParams = { letter: letter9.letter };
        answer = letter9.symmetry;
        explanation = `Буква "${letter9.letter}" имеет ${letter9.symmetry} симметрию`;
        explanationKey = 'tasks.symmetry.letters_explanation';
        explanationParams = { letter: letter9.letter, result: letter9.symmetry };
        answerFormat = "тип симметрии";
        formatKey = 'answerFormats.symmetry_type';
        break;

      case 10: // Симметричные выражения
        const a10 = getRandomInt(1, 5);
        const b10 = getRandomInt(1, 5);
        question = `Являются ли выражения ${a10}x + ${b10}y и ${b10}x + ${a10}y симметричными?`;
        translationKey = 'tasks.symmetry.expression';
        translationParams = { a: a10, b: b10 };
        answer = "да";
        explanation = `Выражения симметричны относительно замены x и y: ${a10}x + ${b10}y → ${b10}x + ${a10}y`;
        explanationKey = 'tasks.symmetry.expression_explanation';
        explanationParams = { a: a10, b: b10, result: "да" };
        answerFormat = "да/нет";
        formatKey = 'answerFormats.yes_no';
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
