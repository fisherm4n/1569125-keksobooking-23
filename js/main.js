// function randomFloat (min, max, afterDot){
//   if (min < 0 || max < 0) {
//     return 'Вы ввели отрицательное число';
//   }
//   if (max <= min) {
//     return 'Вы ввели некорректный диапозон';
//   }
//   const randomResult = Math.random() * (max - min + 1) + min;

//   return randomResult.toFixed(afterDot);
// }
// randomFloat(2, 98, 1);
//check
function randomValue (min,max){
  if (min < 0 || max < 0 ){
    return 'Вы ввели отрицательное число';
  }
  if (max<=min){
    return 'Вы ввели некорректный диапозон';

  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
randomValue (0 , 100);

const SRC_IMG = 'img/avatars/user0';
const author = {
  avatar:`${SRC_IMG + randomValue(1,8)}.png`,
}
console.log(author);
