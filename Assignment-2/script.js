const redText = document.getElementById("red-text");
const orangeText = document.getElementById("orange-text");
const pinkText = document.getElementById("pink-text");
let bodyColor = "blue";
let redToggle = false;
let orangeToggle = false;
let pinkToggle = false;

document.addEventListener("keydown", (event) => {
    if (event.code == "Space") {
        bodyColor = bodyColor == "blue" ? "green" : "blue";
        document.body.style.backgroundColor = bodyColor;
    } else if (event.key == "1") {
        redToggle = !redToggle;
        redText.style.color = redToggle ? "gold" : "red";
    } else if (event.key == "2") {
        orangeToggle = !orangeToggle;
        orangeText.style.color = orangeToggle ? "lightblue" : "orange";
    } else if (event.key == "3") {
        pinkToggle = !pinkToggle;
        pinkText.style.color = pinkToggle ? "white" : "pink";
    }
});
