// GLOBAL VARIABLES
var activityForm = document.getElementById("activityForm");
var boxTitle = document.getElementById("boxTitle");
var buttonRow = document.getElementById("buttonRow");
var category = '';
var description = document.getElementById("descriptionInput");
var minutes = document.getElementById("minutes");
var numberInputs = document.getElementById("numberInputs");
var seconds = document.getElementById("seconds");
var startActivityButton = document.getElementById("startActivityButton");
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
  if(minutes.value){
    document.getElementById("minutesCountdown").innerText = minutes.value;
  }
  if(seconds.value){
    document.getElementById("secondsCountdown").innerText = seconds.value;
  }
  document.getElementById("descriptionHeader").innerText = description.value;
};

function changeTimerColor() {
  if(category === "studyButton") {
    document.getElementById("startButton").style.borderColor = "#B3FD78";
  }
};
