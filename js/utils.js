
function randomFloat(min, max, afterDot = 1) {
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  const randomResult = Math.random() * (upper - lower + 1) + lower;
  return randomResult.toFixed(afterDot);
}
function randomValue(min, max) {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1)) + lower;
}

// Функция возвращающая случайное количество элементов массива без дублирования элементов.
const getElementsArray = (array) => {
  const amountOfElements = randomValue(1, array.length);
  const elementsArray = [];
  for (let i = 0; i < amountOfElements; i++) {
    const randomIndex = randomValue(0, array.length - 1);
    const randomElement = array[randomIndex];
    if (elementsArray.includes(randomElement)) {
      continue;
    }
    elementsArray.push(randomElement);
  }
  return elementsArray;
};

/*Функция генерирующая массив чисел от min до max*/
const getArrayNumbers = (min, max) => {
  const arrayNumbers = [];
  for (let i = min; i <= max; i++) {
    arrayNumbers.push(i);
  }
  return arrayNumbers;
};
function endOfGuest(guests) {
  if (guests === 1) {
    return "гостя";
  } else {
    return "гостей"
  }
}
function endOfRooms(rooms) {
  if (rooms === 1) {
    return "комната";
  } else if(rooms > 1 && rooms <5) {
    return "комнаты"
  }else{
    return "комнат"

  }
}
function numOfAva() {
  const value = randomValue(1, 10)
  if (value < 10) {
    return `0${value}`;
  }
  return value;
}
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
export { randomFloat, randomValue, getElementsArray, getArrayNumbers, endOfGuest, numOfAva, endOfRooms,debounce };
