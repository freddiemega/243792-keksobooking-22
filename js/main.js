// функция сложения - функциональное выражение
const sumWay1 = function (firstNumber, secondNumber) {
  return firstNumber + secondNumber;
}

sumWay1(1, 3);

// функция сложения - декларирование
function sumWay2 (firstNumber, secondNumber) {
  return Number(firstNumber) + Number(secondNumber);
}

sumWay2('123', 5);

// обязательные функции из ДЗ "2. Нужно больше функций"
// функция случайное целое число из диапазона
const getRandom = function (minNumber, maxNumber) {
  const min = Math.min(minNumber, maxNumber);
  const max = Math.max(minNumber, maxNumber);
  return Math.ceil(Math.random() * (max - min) + min);
}

getRandom(1, 10);

// функция случайное число из диапазона с заданным "количеством знаков после запятой"
const getRandomDecimalPlaces = function (minNumber, maxNumber, decimalPlaces) {
  const min = Math.min(minNumber, maxNumber);
  const max = Math.max(minNumber, maxNumber);
  let num = Math.random() * (max - min) + min;
  return Number(num.toFixed(decimalPlaces));
}

document.body.innerHTML = getRandomDecimalPlaces(30, 20, 2);
