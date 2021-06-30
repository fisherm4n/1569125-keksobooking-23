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
function rndArray(someArray) {
  const arrayIndex = randomValue(0, someArray.length);
  const arrayIndex2 = randomValue(0, someArray.length);
  if (arrayIndex > arrayIndex2) {
    return someArray.slice(arrayIndex2, arrayIndex);
  } else if (arrayIndex === arrayIndex2) {
    return someArray.slice(0, someArray.length);
  } else {
    return someArray.slice(arrayIndex, arrayIndex2);
  }
}
export { randomFloat, randomValue, rndArray };
