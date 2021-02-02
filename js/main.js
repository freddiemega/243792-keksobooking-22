// функция сложения - функциональное выражение
const sumWay1 = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

console.log(sumWay1(1, 3));

// функция сложения - декларирование
function sumWay2 (firstNumber, secondNumber) {
  return Number(firstNumber) + Number(secondNumber);
}

console.log(sumWay2('123', 5));

// обязательные функции из ДЗ "2. Нужно больше функций"
// функция случайное целое число из диапазона
const getRandom = function (minNumber, maxNumber) {
  if (minNumber <= maxNumber) {
    return Math.ceil(Math.random() * (maxNumber - minNumber) + minNumber);
  }
  console.log('Диапазон чисел отрицательный!');
  return false;
}

console.log(getRandom(5, 10));

// функция случайное число из диапазона с заданным "количеством знаков после запятой"
const getRandomDecimalPlaces = function (minNumber, maxNumber, decimalPlaces) {
  if (minNumber <= maxNumber) {
    num = Math.random() * (maxNumber - minNumber) + minNumber;
    return Number(num.toFixed(decimalPlaces));
  }
  return false;
}

console.log(getRandomDecimalPlaces(0, 20, 3));
