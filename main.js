
var buttonRow = document.getElementById("buttonRow")
var category = '';

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
})

function addColor(button, activeClass) {
  button.classList.add(activeClass)
}

function removeColor(button, activeClass) {
  button.classList.remove(activeClass)
}

var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var startActivityButton = document.getElementById("startActivityButton");
var description = document.getElementById("descriptionInput");
var numberInputs = document.getElementById("numberInputs");



numberInputs.addEventListener('keydown', function(event) {
  if (event.target.id === "minutes" || "seconds") {
    if (event.key === 'e') {
    event.preventDefault(event)
    };
  }
});

startActivityButton.addEventListener("click", startTimer);

var activityForm = document.getElementById("activityForm");
var timerDisplay = document.getElementById("timerDisplay")
var categoryError = document.getElementById("categoryError");
var descriptionError = document.getElementById("descriptionError");
var timeError = document.getElementById("timeError");
var boxTitle = document.getElementById("boxTitle");

function startTimer(event) {
  event.preventDefault(event);

  var activity = new Activity(category, description.value, minutes.value, seconds.value)
  //console.log(activity);
  checkInputs(activity);
  //displayTimer();
};

function checkInputs(activity) {
  if (activity.category === ""){
    categoryError.classList.remove("hidden")
  } else if (activity.description === ""){
    descriptionError.classList.remove("hidden")
  } else if (activity.minutes === "" && activity.seconds === ""){
    timeError.classList.remove("hidden")
  } else {
    displayTimer();
  }
};

function displayTimer() {
  activityForm.classList.add("hidden");
  timerDisplay.classList.remove("hidden");
  boxTitle.innerText = "Current Activity";
  displayActivityValues();
  changeTimerColor();
};

function displayActivityValues() {
  //var minutesCountdown = document.getElementById("minutesCountdown");
  // var secondsCountdown = document.getElementById("secondsCountdown");
  // var descriptionHeader = document.getElementById("descriptionHeader");
  if(minutes.value){
    document.getElementById("minutesCountdown").innerText = minutes.value;
  }
  if(seconds.value){
    document.getElementById("secondsCountdown").innerText = seconds.value;
  }
  document.getElementById("descriptionHeader").innerText = description.value;
}

function changeTimerColor() {
  if(category === "studyButton") {
    document.getElementById("startButton").style.borderColor = "#B3FD78";
  }
}
