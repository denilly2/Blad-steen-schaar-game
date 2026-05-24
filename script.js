
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
    window.requestAnimationFrame(loop);
    return;
  }

  const prediction = await model.predict(webcam.canvas);

  let highest = prediction.reduce((prev, current) =>
    prev.probability > current.probability ? prev : current,
  );

    const gesture = highest.className;
  const confidence = (highest.probability * 100).toFixed(0);


}