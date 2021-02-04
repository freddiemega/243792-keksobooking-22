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
  if (minNumber <= maxNumber) {
    return Math.ceil(Math.random() * (maxNumber - minNumber) + minNumber);
  } else {
    //если аргументы перепутаны, то функция всё равно сработает - переставит аргументы местами
    return Math.ceil(Math.random() * (minNumber - maxNumber) + maxNumber);
  }

}

getRandom(5, 10);

// функция случайное число из диапазона с заданным "количеством знаков после запятой"
const getRandomDecimalPlaces = function (minNumber, maxNumber, decimalPlaces) {
  if (minNumber <= maxNumber) {
    let num = Math.random() * (maxNumber - minNumber) + minNumber;
    return Number(num.toFixed(decimalPlaces));
  }
  return false;
}

getRandomDecimalPlaces(0, 20, 3);
