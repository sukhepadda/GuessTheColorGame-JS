const color = document.getElementById("color");
const optionDiv = document.getElementById("optionDiv");
const scoreDiv =  document.getElementById('score');
let randomColor = null;
let score = 0;
let fails = 3;

function randomNumberGeneratorBetween(min, max) {
  return min + Math.floor(Math.random() * (max - min + 1));
}
// console.log(randomNumberGeneratorBetween(0, 255));
function randomColorGenerator() {
  const red = randomNumberGeneratorBetween(0, 255);
  const green = randomNumberGeneratorBetween(0, 255);
  const blue = randomNumberGeneratorBetween(0, 255);
  return `rgb(${red}, ${green}, ${blue})`;
}

function scoreIncreamentor() {
    score+=1;
    scoreDiv.innerHTML = score;
}

function resultValidate(el) {
  const selectedColor = el.target.style.backgroundColor;
  if (selectedColor === randomColor) {
    scoreIncreamentor();
  } else {
    if(fails > 1){
      fails --;
      alert(`oops wrong guess ${fails} guess remains`)
    }else{

      alert('loser your score is reset');
      score = 0;
      scoreDiv.innerHTML = score;
    }
}
window.localStorage.setItem('score', score);
startGame();
}
function startGame() {
    score = Number(window.localStorage.getItem('score')) ?? 0;
    scoreDiv.innerHTML = score;
    optionDiv.innerHTML = null;
  randomColor = randomColorGenerator();
  color.innerHTML = `Whats color is this: ${randomColor} Choose from below options`;
//   document.body.style.background = randomColor;

  const ansIndex = randomNumberGeneratorBetween(0, 5);
  for (let i = 0; i < 6; i++) {
    let div = document.createElement("div");
    div.addEventListener("click", resultValidate);
    div.style.backgroundColor =
      i === ansIndex ? randomColor : randomColorGenerator();
    optionDiv.append(div);
  }
}

window.addEventListener("load", startGame());
