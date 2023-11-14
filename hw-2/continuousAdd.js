function continuousAdd(num = 0) {
  let sum = num;
  return function add(next = null) {
    if(!next){
      return sum;
    }
    sum += next;
    return continuousAdd(sum);
  };
}

const add3Numbers = continuousAdd(2)(3)(5);
const add1 = continuousAdd(1);
const add0 = continuousAdd(0);
const add2Numbers = continuousAdd(0)(4);
const addNothing = continuousAdd();

console.log(add3Numbers());
console.log(add1());
console.log(add0());
console.log(add2Numbers());
console.log(addNothing());
