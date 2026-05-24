
let isPlaying = false;
let lastStartTime = 0;

let playerScore = 0;
let aiScore = 0;

const URL = "./model/";

let model, webcam, maxPredictions;

const aiChoices = ["✋", "✊", "✌️"];

async function init() {
const modelURL = URL + "model.json";
const metadataURL = URL + "metadata.json";

model = await tmImage.load(modelURL, metadataURL);

webcam = new tmImage.Webcam(400, 300, true);
await webcam.setup();
await webcam.play();

const video = document.getElementById("webcam");
video.replaceWith(webcam.canvas);
webcam.canvas.id = "webcam";

window.requestAnimationFrame(loop);
}

async function loop() {
  webcam.update();

  if (!model) {
   setTimeout(() => {
  window.requestAnimationFrame(loop);
}, 100);
  }

  const prediction = await model.predict(webcam.canvas);

  let highest = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current,
  );

    const gesture = highest.className;
const confidence = highest.probability
  ? (highest.probability * 100).toFixed(0)
  : 0;

    const detectEl = document.getElementById("detectedGesture");
  if (detectEl) {
    detectEl.innerText = `Detectie: ${gesture} (${confidence}%)`;
  }

    if (
    gesture === "👍" &&
    highest.probability > 0.9 &&
    !isPlaying &&
    Date.now() - lastStartTime > 2000
  ) {
    startGame();
    lastStartTime = Date.now();
  }

  window.requestAnimationFrame(loop);
}


async function predict() {
  const prediction = await model.predict(webcam.canvas);

  let highest = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current,
);
   return highest.className;
}


async function playRound() {
  document.getElementById("resultText").classList.remove("show");

  await runCountdown();

  const user = await predict();
  const ai = getAI();

    document.getElementById("aiChoice").innerText = ai;

  const result = decide(user, ai);

    if (result === "WIN") playerScore++;
  if (result === "LOSE") aiScore++;

  document.getElementById("playerScore").innerText = playerScore;
  document.getElementById("aiScore").innerText = aiScore;

  const text =
    result === "WIN" ? "You WIN" : result === "LOSE" ? "You Lose" : "Draw";

  const resultEl = document.getElementById("resultText");
  resultEl.innerText = text;
  resultEl.classList.add("show");
}


init();

async function startGame() {
  isPlaying = true;

  document.getElementById("resultText").classList.remove("show");

  await runCountdown();

  const user = await predict();
  const ai = getAI();

   document.getElementById("aiChoice").innerText = ai;

  const result = decide(user, ai);

  if (result === "WIN") playerScore++;
  if (result === "LOSE") aiScore++;

  document.getElementById("playerScore").innerText = playerScore;
  document.getElementById("aiScore").innerText = aiScore;

  const text =
    result === "WIN" ? "You WIN" : result === "LOSE" ? "You Lose" : "Draw";

  const resultEl = document.getElementById("resultText");
  resultEl.innerText = text;
  resultEl.classList.add("show");

    setTimeout(() => { //delay
    isPlaying = false;
  }, 1500);
}


async function runCountdown() {
  const el = document.getElementById("countdown");
  el.classList.add("show");

  const steps = ["3", "2", "1", "GO"];

  for (let step of steps) {
    el.innerText = step;

       el.classList.remove("pop");
    void el.offsetWidth;
    el.classList.add("pop");

    await new Promise((r) => setTimeout(r, 700));
  }

  
  el.classList.remove("show");

  function getAI() {
  return aiChoices[Math.floor(Math.random() * 3)];
}

function decide(user, ai) {
  if (user === ai) return "DRAW";

  if (
    (user === "✋" && ai === "✊") ||
    (user === "✊" && ai === "✌️") ||
    (user === "✌️" && ai === "✋")
  )
    return "WIN";

  return "LOSE";
}
}