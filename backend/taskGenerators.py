# Вспомогательные функции
import random
from typing import Dict, List

def getRandomInt(min_val: int, max_val: int) -> int:
    return random.randint(min_val, max_val)

# Генераторы задач по темам
taskGenerators = {
    # Заглушка - нужно перенести логику из JS
    'fractions': lambda count: [{
        'question': 'Пример вопроса по дробям',
        'answer': '42',
        'answerFormat': 'число',
        'explanation': 'Объяснение'
    } for _ in range(count)],
    
    'geometry': lambda count: [{
        'question': 'Пример вопроса по геометрии', 
        'answer': '42',
        'answerFormat': 'число',
        'explanation': 'Объяснение'
    } for _ in range(count)]
}

# Структура курса
courseStructure = [
    {'day': 1, 'title': 'Дроби и проценты', 'theoryLink': 'https://math.ru/drobi', 'generator': 'fractions', 'taskCount': 10},
    {'day': 2, 'title': 'Геометрические фигуры', 'theoryLink': 'https://math.ru/geometry/6class', 'generator': 'geometry', 'taskCount': 10},
    # ... остальные дни
    {'day': 14, 'title': 'Итоговое повторение', 'theoryLink': 'https://math.ru/repetition', 'generator': 'fractions', 'taskCount': 10}
]
