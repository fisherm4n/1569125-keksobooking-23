function randomValue (min,max){
  if (min < 0 || max < 0 ){
    return console.log('Вы ввели отрицательное число');
  }
  if (max<=min){
    return console.log('Вы ввели некорректный диапозон');

  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomValue (0 , 100);

function randomFloat (min, max, afterDot){
  if (min < 0 || max < 0) {
    return console.log('Вы ввели отрицательное число');
  }
  if (max <= min) {
    return console.log('Вы ввели некорректный диапозон');
  }
  let randomResult = Math.random() * (max - min + 1) + min;
  return randomResult.toFixed(afterDot);
}
randomFloat(2, 98, 1);
