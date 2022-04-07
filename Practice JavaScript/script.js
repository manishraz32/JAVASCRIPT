// console.log(x); // undefined
// var x = 7;

// console.log(x); // refrence error
// let x = 7;

// console.log(x); // refrence error
// const x = 7;


// console.log(getName); // console complete function
// function getName() {
//     console.log("Hello javascript");
// }
// console.log(getName);



// ---------------windows and this key word ------------------
 
var x = 10;
function fun() {
    var t = 10;
    console.log(t);
}
console.log(window); // log windows object
console.log(this); // log windows object
console.log(window === this); // true
console.log(window.x); // 10
console.log(x); // 10
console.log(t); // refrence error because t is not in the globabl object
