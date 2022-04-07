const countElem = document.getElementById("count");
const decElem = document.querySelector(".decrement");
const resetElem = document.querySelector(".reset");
const incElem = document.querySelector(".increment");
var count = 0;
countElem.innerText = count;
decElem.addEventListener("click", function() {
    //console.log(count);
    countElem.innerText = --count;
});
resetElem.addEventListener("click", function() {
    count = 0;
    countElem.innerText = count;
});
incElem.addEventListener("click", function() {
    countElem.innerText = ++count;
});