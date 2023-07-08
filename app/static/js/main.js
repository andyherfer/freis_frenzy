var words = [$WORD_LIST];
var currentIndex = -1;

function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function nextWord() {
  currentIndex = (currentIndex + 1) % words.length;
  document.getElementById("wordZone").innerText = words[currentIndex];
}

var totalTime = 60;
var timerId;
var alarmId;
var alarmInterval = 1000; // initial value for alarm sound interval in milliseconds
var alarmSound = document.getElementById("pingSound"); // get audio element
var timesupSound = document.getElementById("timesupSound"); // get audio element

function startTimer() {
  timer(); // function call timer
  startAlarm(alarmInterval);
}

function startAlarm(interval) {
  clearInterval(alarmId);
  playAlarmSound();
  alarmId = setInterval(playAlarmSound, interval);
}

function timer() {
  if (totalTime <= 0) {
    clearTimeout(timerId); // Timer has run out
    // stop the alarm sound
    clearInterval(alarmId);
    timesupSound.play();
    document.getElementById("wordZone").innerText = "Time's Up!";
    // Set the background color to red
    document.body.style.backgroundColor = "red";
    return;
  } else if (totalTime <= 5) {
    // last 10 seconds, decrease the alarm sound interval
    alarmInterval = 100;
    //startAlarm(alarmInterval)  // sound every 0.1 seconds
  } else if (totalTime <= 20) {
    alarmInterval = 250;
    //startAlarm(alarmInterval)  // sound every 0.25 seconds
  } else if (totalTime <= 40) {
    alarmInterval = 500;
    //startAlarm(alarmInterval)  // sound every 0.5 seconds
  }
  startAlarm(alarmInterval); // start a new alarm with the new interval
  console.log(alarmInterval);
  console.log(totalTime);
  timerId = setTimeout(timer, 1000);
  totalTime--;
}

function playAlarmSound() {
  alarmSound.currentTime = 0;
  alarmSound.play();
}

document.getElementById("startButton").addEventListener("click", function () {
  words = shuffle(words); // shuffle the words
  nextWord(); // start with the first word
  startTimer(); // start the timer

  // Handle visibility of the buttons
  document.getElementById("startButton").style.display = "none";
  document.getElementById("nextWordButton").hidden = false;
});
