
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
}