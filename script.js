
const gameArea = document.getElementById("gameArea");
const targets = document.querySelectorAll(".target");
const timerDisplay = document.getElementById("timer");
const winMessage = document.getElementById("winMessage");
const finalTimeDisplay = document.getElementById("finalTime");
const tryAgainButton = document.getElementById("tryAgain");

let startTime;
let timeInterval;
let targetIndex = 0;
let targetClicksNeeded = targets.length * 3;
let targetClicks = 0;
let isTargetVisible = false;

const gunshotSound = new Audio('sounds/gunshot.mp3'); 
gunshotSound.preload = 'auto';  


function startTimer() {
  startTime = Date.now();
  timeInterval = setInterval(() => {
    const elapsedTime = Math.floor((Date.now() - startTime) / 1000);
    timerDisplay.textContent = `Time: ${elapsedTime}s`;
  }, 1000);
}


function stopTimer() {
  clearInterval(timeInterval);
  const finalTime = Math.floor((Date.now() - startTime) / 1000);
  finalTimeDisplay.textContent = `${finalTime}`;
}


function spawnTarget() {
  if (targetClicks >= targetClicksNeeded) {
    stopTimer();
    winMessage.style.display = "block"; 
    return;
  }

  if (isTargetVisible) return; 

  const target = targets[targetIndex];
  const gameAreaWidth = gameArea.clientWidth;
  const gameAreaHeight = gameArea.clientHeight;
  const targetWidth = 100; 
  const targetHeight = 250; 

  const maxX = gameAreaWidth - targetWidth;
  const maxY = gameAreaHeight - targetHeight;
  
  const randomX = Math.floor(Math.random() * maxX);
  const randomY = Math.floor(Math.random() * maxY);

  target.style.left = `${randomX}px`;
  target.style.top = `${randomY}px`;
  target.style.display = "block";

  isTargetVisible = true;

 
  target.onclick = () => {
    target.style.display = "none"; 
    targetClicks++; 
    isTargetVisible = false; 
    gunshotSound.currentTime = 0; 
    gunshotSound.play();  
    targetIndex = (targetIndex + 1) % targets.length; 
    spawnTarget(); 
  };
}


function resetGame() {
  targetClicks = 0;
  targetIndex = 0;
  winMessage.style.display = "none";
  startTimer();
  spawnTarget();
}


window.onload = () => {
  startTimer();
  spawnTarget();
  tryAgainButton.onclick = resetGame; 
};
