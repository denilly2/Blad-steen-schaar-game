
let isPlaying = false;
let lastStartTime = 0;

let playerScore = 0;
let aiScore = 0;

const URL = "./model/";

let model, webcam, maxPredictions;

const aiChoices = ["✋", "✊", "✌️"];