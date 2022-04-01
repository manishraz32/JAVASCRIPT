const countElem = document.getElementById("count");
const decElem = document.querySelector(".decrement");
const resetElem = document.querySelector(".reset");
const incElem = document.querySelector(".increment");
var count = 0;
countElem.innerText = count;
decElem.addEventListener("click", function() {
    countElem.innerText = --count;
});
resetElem.addEventListener("click", function() {
    countElem.innerText = 0;
});
incElem.addEventListener("click", function() {
    countElem.innerText = ++count;
});