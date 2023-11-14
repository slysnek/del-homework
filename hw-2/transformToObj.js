function transformToObj(str) {
  let answer;
  if (str === '' || str === '.') {
    answer = {};
    return answer;
  }
  const strArray = str.split('.');
  const length = strArray.length;
  for (let i = length - 1; i >= 0; i--) {
    if (!answer) {
      answer = {
        [strArray[i]]: {},
      };
    } else {
      const greaterObj = {
        [strArray[i]]: answer,
      };
      answer = greaterObj;
    }
  }
  return answer;
}

console.log(transformToObj('one.two.three')); 

