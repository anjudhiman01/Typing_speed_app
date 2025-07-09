let timeLeft = 60;
let timer;
let testStarted = false;

const originalText = document.getElementById("text-to-type").innerText.trim();
const inputArea = document.getElementById("input-area");
const timeDisplay = document.getElementById("time");
const resultBox = document.getElementById("result");
const startBtn = document.getElementById("start-btn");
const resetBtn = document.getElementById("reset-btn");

function startTest() {
  inputArea.disabled = false;
  inputArea.value = "";
  inputArea.focus();
  timeLeft = 60;
  timeDisplay.innerText = timeLeft;
  resultBox.innerText = "";
  testStarted = true;

  startBtn.disabled = true;
  resetBtn.disabled = false;

  timer = setInterval(() => {
    timeLeft--;
    timeDisplay.innerText = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      endTest();
    }
  }, 1000);
}

function resetTest() {
  clearInterval(timer);
  testStarted = false;
  inputArea.value = "";
  inputArea.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = true;
  timeLeft = 60;
  timeDisplay.innerText = timeLeft;
  resultBox.innerText = "";
}

function checkTyping() {
  if (!testStarted) return;

  const typedText = inputArea.value.trim();

  if (typedText === originalText) {
    clearInterval(timer);
    endTest();
  }
}

function endTest() {
  inputArea.disabled = true;
  startBtn.disabled = false;
  resetBtn.disabled = true;
  testStarted = false;

  const typedText = inputArea.value.trim();
  const typedWords = typedText.split(/\s+/).length;
  const timeTaken = 60 - timeLeft || 1;
  const wpm = Math.round((typedWords / timeTaken) * 60);

  const correctChars = countCorrectChars(typedText, originalText);
  const accuracy = Math.round((correctChars / originalText.length) * 100);

  resultBox.innerText = `WPM: ${wpm} | Accuracy: ${accuracy}%`;
}

function countCorrectChars(typed, original) {
  let count = 0;
  for (let i = 0; i < typed.length; i++) {
    if (typed[i] === original[i]) {
      count++;
    }
  }
  return count;
}
