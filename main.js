// GLOBAL VARIABLES
var activityForm = document.getElementById("activityForm");
var boxTitle = document.getElementById("boxTitle");
var buttonRow = document.getElementById("buttonRow");
var category = '';
var description = document.getElementById("descriptionInput");
var minutes = document.getElementById("minutes");
var numberInputs = document.getElementById("numberInputs");
var seconds = document.getElementById("seconds");
var secondsCountdown = document.getElementById("secondsCountdown");
var startActivityButton = document.getElementById("startActivityButton");
var startButton = document.getElementById("startButton");
// var timerDisplay = document.getElementById("timerDisplay")

// EVENT LISTENERS
buttonRow.addEventListener("click", function(event){
  if (event.target.id === "studyButton") {
    addColor(studyButton, "study-button-active");
    removeColor(meditateButton, "meditate-button-active")
    removeColor(exerciseButton, "exercise-button-active")
  } else if (event.target.id === "meditateButton") {
    addColor(meditateButton, "meditate-button-active")
    removeColor(studyButton, "study-button-active")
    removeColor(exerciseButton, "exercise-button-active")
  } else if (event.target.id === "exerciseButton") {
    addColor(exerciseButton, "exercise-button-active")
    removeColor(studyButton, "study-button-active")
    removeColor(meditateButton, "meditate-button-active")
  }
  event.preventDefault();
  category = event.target.id
});

numberInputs.addEventListener('keydown', function(event) {
  if (event.target.id === "minutes" || "seconds") {
    if (event.key === 'e') {
    event.preventDefault(event)
    };
  }
});

startActivityButton.addEventListener("click", startTimer);

startButton.addEventListener("click", startCountDown);

// FUNCTIONS
function addColor(button, activeClass) {
  button.classList.add(activeClass)
}

function removeColor(button, activeClass) {
  button.classList.remove(activeClass)
};

function startTimer(event) {
  event.preventDefault(event);
  var activity = new Activity(category, description.value, minutes.value, seconds.value)
  checkInputs(activity);
};

function startCountDown() {
  var secondsInput = parseInt(seconds.value - 1);
  var minutesInput = parseInt(minutes.value);
  var oneSecond = 1;
  var oneMinute = oneSecond * 60;
  var totalTime = (secondsInput * oneSecond) + (minutesInput * oneMinute);
  var timer = setInterval(function() {
    var displayMinutes = '00' + Math.floor(totalTime / 60);
    var displaySeconds = '0' + totalTime % 60;
    secondsCountdown.innerHTML = displaySeconds.slice(-2)
    minutesCountdown.innerHTML = displayMinutes.slice(-2);
    //Need to figure out what to do when timer hits zero- need to display 00 by default dislpaying NaNa instead
    //minutesCountdown.innerHTML = displayMinutes;
    // secondsCountdown.innerHTML = secondsInput;
    totalTime--;
    if(totalTime < 0){
      clearInterval(timer);
    }
  }, 1000)
};

function checkInputs(activity) {
  if (activity.category === ""){
    removeHidden(document.getElementById("categoryError"))
  } else if (activity.description === ""){
    removeHidden(document.getElementById("descriptionError"))
  } else if (activity.minutes === "" && activity.seconds === ""){
    removeHidden(document.getElementById("timeError"))
  } else {
    displayTimer();
  }
};

function removeHidden(element) {
  element.classList.remove("hidden")
}

function displayTimer() {
  activityForm.classList.add("hidden");
  removeHidden(document.getElementById("timerDisplay"));
  boxTitle.innerText = "Current Activity";
  displayActivityValues();
  changeTimerColor();
};

function displayActivityValues() {
    var staticMinutes = "00" + (minutes.value.toString())
    document.getElementById("minutesCountdown").innerText = staticMinutes.slice(-2);
  // Need to maybe add more zeros to my string once it hit zero it's displaying NA because of slice
  if (seconds.value < 10 && seconds.value > 0) {
    document.getElementById("secondsCountdown").innerText = "0" + seconds.value
  } else {
    document.getElementById("secondsCountdown").innerText = seconds.value;
  }
  document.getElementById("descriptionHeader").innerText = description.value;
};

function changeTimerColor() {
  if(category === "studyButton") {
    document.getElementById("startButton").style.borderColor = "#B3FD78";
  }
};
