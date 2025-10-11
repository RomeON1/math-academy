// day10-volumes.js
const getRandomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

export const volumesGenerator = (count, t) => {
  const tasks = [];
  const usedQuestions = new Set();

  while (tasks.length < count) {
    let question, answer, explanation, answerFormat;
    let translationKey, translationParams, explanationKey, explanationParams, formatKey;
    let type = getRandomInt(1, 10);

    switch (type) {
      case 1: // Объем куба
        const edge1 = getRandomInt(2, 8);
        const volume1 = edge1 * edge1 * edge1;
        question = `Найдите объем куба с ребром ${edge1} см`;
        translationKey = 'tasks.volumes.cube';
        translationParams = { edge: edge1 };
        answer = volume1.toString();
        explanation = `Объем куба = ребро³ = ${edge1} × ${edge1} × ${edge1} = ${volume1} см³`;
        explanationKey = 'tasks.volumes.cube_explanation';
        explanationParams = { edge: edge1, result: volume1 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 2: // Объем прямоугольного параллелепипеда
        const length2 = getRandomInt(4, 10);
        const width2 = getRandomInt(3, 8);
        const height2 = getRandomInt(5, 12);
        const volume2 = length2 * width2 * height2;
        question = `Найдите объем прямоугольного параллелепипеда ${length2}×${width2}×${height2} см`;
        translationKey = 'tasks.volumes.rectangular_prism';
        translationParams = { length: length2, width: width2, height: height2 };
        answer = volume2.toString();
        explanation = `Объем = длина × ширина × высота = ${length2} × ${width2} × ${height2} = ${volume2} см³`;
        explanationKey = 'tasks.volumes.rectangular_prism_explanation';
        explanationParams = { length: length2, width: width2, height: height2, result: volume2 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 3: // Объем цилиндра
        const radius3 = getRandomInt(2, 5);
        const height3 = getRandomInt(6, 12);
        const volume3 = Math.round(3.14 * radius3 * radius3 * height3);
        question = `Найдите объем цилиндра радиусом ${radius3} см и высотой ${height3} см (π≈3.14)`;
        translationKey = 'tasks.volumes.cylinder';
        translationParams = { radius: radius3, height: height3 };
        answer = volume3.toString();
        explanation = `Объем цилиндра = π × радиус² × высота = 3.14 × ${radius3}² × ${height3} = ${volume3} см³`;
        explanationKey = 'tasks.volumes.cylinder_explanation';
        explanationParams = { radius: radius3, height: height3, result: volume3 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 4: // Объем конуса
        const radius4 = getRandomInt(2, 5);
        const height4 = getRandomInt(6, 12);
        const volume4 = Math.round((3.14 * radius4 * radius4 * height4) / 3);
        question = `Найдите объем конуса радиусом ${radius4} см и высотой ${height4} см (π≈3.14)`;
        translationKey = 'tasks.volumes.cone';
        translationParams = { radius: radius4, height: height4 };
        answer = volume4.toString();
        explanation = `Объем конуса = (π × радиус² × высота) / 3 = (3.14 × ${radius4}² × ${height4}) / 3 = ${volume4} см³`;
        explanationKey = 'tasks.volumes.cone_explanation';
        explanationParams = { radius: radius4, height: height4, result: volume4 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 5: // Объем пирамиды
        const baseSide5 = getRandomInt(4, 8);
        const height5 = getRandomInt(6, 12);
        const baseArea5 = baseSide5 * baseSide5;
        const volume5 = Math.round((baseArea5 * height5) / 3);
        question = `Найдите объем квадратной пирамиды со стороной основания ${baseSide5} см и высотой ${height5} см`;
        translationKey = 'tasks.volumes.pyramid';
        translationParams = { side: baseSide5, height: height5 };
        answer = volume5.toString();
        explanation = `Площадь основания = ${baseSide5} × ${baseSide5} = ${baseArea5} см², объем = (площадь основания × высота) / 3 = (${baseArea5} × ${height5}) / 3 = ${volume5} см³`;
        explanationKey = 'tasks.volumes.pyramid_explanation';
        explanationParams = { side: baseSide5, height: height5, baseArea: baseArea5, result: volume5 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 6: // Объем шара
        const radius6 = getRandomInt(3, 6);
        const volume6 = Math.round((4 * 3.14 * radius6 * radius6 * radius6) / 3);
        question = `Найдите объем шара радиусом ${radius6} см (π≈3.14)`;
        translationKey = 'tasks.volumes.sphere';
        translationParams = { radius: radius6 };
        answer = volume6.toString();
        explanation = `Объем шара = (4 × π × радиус³) / 3 = (4 × 3.14 × ${radius6}³) / 3 = ${volume6} см³`;
        explanationKey = 'tasks.volumes.sphere_explanation';
        explanationParams = { radius: radius6, result: volume6 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 7: // Объем призмы
        const base7 = getRandomInt(4, 8);
        const height7 = getRandomInt(3, 6);
        const length7 = getRandomInt(5, 10);
        const baseArea7 = (base7 * height7) / 2;
        const volume7 = Math.round(baseArea7 * length7);
        question = `Найдите объем треугольной призмы с основанием ${base7} см, высотой ${height7} см и длиной ${length7} см`;
        translationKey = 'tasks.volumes.triangular_prism';
        translationParams = { base: base7, height: height7, length: length7 };
        answer = volume7.toString();
        explanation = `Площадь основания = (${base7} × ${height7}) / 2 = ${baseArea7} см², объем = площадь основания × длина = ${baseArea7} × ${length7} = ${volume7} см³`;
        explanationKey = 'tasks.volumes.triangular_prism_explanation';
        explanationParams = { base: base7, height: height7, length: length7, baseArea: baseArea7, result: volume7 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 8: // Объем через площадь основания
        const baseArea8 = getRandomInt(20, 50);
        const height8 = getRandomInt(6, 12);
        const volume8 = baseArea8 * height8;
        question = `Площадь основания цилиндра ${baseArea8} см², высота ${height8} см. Найдите объем`;
        translationKey = 'tasks.volumes.from_base_area';
        translationParams = { area: baseArea8, height: height8 };
        answer = volume8.toString();
        explanation = `Объем = площадь основания × высота = ${baseArea8} × ${height8} = ${volume8} см³`;
        explanationKey = 'tasks.volumes.from_base_area_explanation';
        explanationParams = { area: baseArea8, height: height8, result: volume8 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
        break;

      case 9: // Сравнение объемов
        const edgeA9 = getRandomInt(3, 6);
        const edgeB9 = getRandomInt(4, 7);
        const volumeA9 = edgeA9 * edgeA9 * edgeA9;
        const volumeB9 = edgeB9 * edgeB9 * edgeB9;
        const comparisonResult = volumeA9 > volumeB9 ? "больше" : volumeA9 < volumeB9 ? "меньше" : "равны";
        question = `Сравните объемы кубов с ребрами ${edgeA9} см и ${edgeB9} см`;
        translationKey = 'tasks.volumes.compare_volumes';
        translationParams = { edgeA: edgeA9, edgeB: edgeB9 };
        answer = comparisonResult;
        explanation = `Объем₁ = ${edgeA9}³ = ${volumeA9} см³, объем₂ = ${edgeB9}³ = ${volumeB9} см³ → ${volumeA9} ${comparisonResult} ${volumeB9}`;
        explanationKey = 'tasks.volumes.compare_volumes_explanation';
        explanationParams = { edgeA: edgeA9, edgeB: edgeB9, volumeA: volumeA9, volumeB: volumeB9, result: comparisonResult };
        answerFormat = "больше/меньше/равно";
        formatKey = 'answerFormats.comparison';
        break;

      case 10: // Объем составного тела
        const cubeEdge10 = getRandomInt(3, 5);
        const prismBase10 = getRandomInt(4, 6);
        const prismHeight10 = getRandomInt(3, 5);
        const prismLength10 = getRandomInt(4, 6);
        const cubeVolume10 = cubeEdge10 * cubeEdge10 * cubeEdge10;
        const prismVolume10 = Math.round((prismBase10 * prismHeight10 / 2) * prismLength10);
        const totalVolume10 = cubeVolume10 + prismVolume10;
        question = `Найдите объем фигуры: куб с ребром ${cubeEdge10} см и треугольная призма с основанием ${prismBase10} см, высотой ${prismHeight10} см и длиной ${prismLength10} см`;
        translationKey = 'tasks.volumes.composite_volume';
        translationParams = { cubeEdge: cubeEdge10, prismBase: prismBase10, prismHeight: prismHeight10, prismLength: prismLength10 };
        answer = totalVolume10.toString();
        explanation = `Объем куба = ${cubeEdge10}³ = ${cubeVolume10} см³, объем призмы = (${prismBase10} × ${prismHeight10} / 2) × ${prismLength10} = ${prismVolume10} см³, общий объем = ${cubeVolume10} + ${prismVolume10} = ${totalVolume10} см³`;
        explanationKey = 'tasks.volumes.composite_volume_explanation';
        explanationParams = { cubeVolume: cubeVolume10, prismVolume: prismVolume10, result: totalVolume10 };
        answerFormat = "число (в см³)";
        formatKey = 'answerFormats.cm3';
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
