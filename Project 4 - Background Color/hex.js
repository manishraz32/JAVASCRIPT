let hexColor = [0, 1, 2, 3, 4, 5,6,7, 8, 9, "A", "B", "C", "D", "E", "F"];
const hexLen = hexColor.length;
const btnElem = document.getElementById("btn");
const colorElem = document.querySelector(".color");

btnElem.addEventListener("click", function() {
    let hex = "#";
    for(let i = 0; i < 6; i++) {
        let randomNum = getRandom();
        //console.log(hex[randomNum]);
        console.log(hexColor[randomNum]);
        hex += hexColor[randomNum];
    }
    document.body.style.backgroundColor = hex;
    colorElem.textContent = hex;

});

function getRandom() {
    return Math.floor(Math.random() * hexLen);
}