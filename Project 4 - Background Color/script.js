const colors = ["green", "blue", "white", "red"];
const btnElem = document.getElementById("btn");
const colorElem = document.querySelector(".color");

const colorLen = colors.length;
btnElem.addEventListener("click", function() {
    const randomNum = getRandom();
    document.body.style.backgroundColor = colors[randomNum];
    colorElem.textContent = colors[randomNum];
});

function getRandom() {
    return Math.floor(Math.random() * colorLen);
}