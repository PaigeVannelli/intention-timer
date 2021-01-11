// Refactor List

// 1. move all global variables into functions?
// 2. Reorder all functions
// 3. this.category changes border color for both
// 4. fix form height for each form display - add new class on higher level div

// GLOBAL VARIABLES
var activity;
var activityForm = document.getElementById("activityForm");
var boxTitle = document.getElementById("boxTitle");
var buttonRow = document.getElementById("buttonRow");
var category = '';
var description = document.getElementById("descriptionInput");
var logActivityButton = document.getElementById("logActivityButton");
var minutes = document.getElementById("minutes");
var numberInputs = document.getElementById("numberInputs");
var pastActivities = [];
var seconds = document.getElementById("seconds");
var secondsCountdown = document.getElementById("secondsCountdown");
var startActivityButton = document.getElementById("startActivityButton");
var startButton = document.getElementById("startButton");
var createNewButton = document.getElementById("createNewButton");
var timerDisplay = document.getElementById("timerDisplay");
// EVENT LISTENERS
buttonRow.addEventListener("click", activateButton)

numberInputs.addEventListener('keydown', preventE)

startActivityButton.addEventListener("click", startTimer);

startButton.addEventListener("click", startCountDown);

logActivityButton.addEventListener("click", logActivity);

createNewButton.addEventListener("click", displayNewActivityForm);

// FUNCTIONS

function activateButton(event) {
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
}

function preventE(event) {
  if ((event.target.id === "minutes" || "seconds") && event.key === 'e') {
    event.preventDefault(event)
  }
}

function addColor(button, activeClass) {
  button.classList.add(activeClass)
}

function removeColor(button, activeClass) {
  button.classList.remove(activeClass)
};

function startTimer(event) {
  event.preventDefault(event);
  activity = new Activity(category, description.value, minutes.value, seconds.value)
  checkInputs(activity);
  timerDisplay.reset()
  hide(document.getElementById("timer"), false);
  hide(document.getElementById("motivation"), true)
  hide(document.getElementById("descriptionHeader"), false)
  document.getElementById("startButton").innerText = "START";
};

function startCountDown() {
  event.preventDefault(event);
  var minutesInput = minutes.value ? parseInt(minutes.value) : 00;
  var totalTime = (parseInt(seconds.value - 1)) + (minutesInput * 60);
  activity.startTimer(totalTime);
  if (activity.completed === true) {
  //   clearInterval(timer);
    // displayComplete();
    // displayMotivation();
    }
};

function displayMotivation () {
  hide(document.getElementById("timer"), true);
  hide(document.getElementById("motivation"), false)
}

function displayComplete() {
  hide(document.getElementById("logActivityButton"), false);
  document.getElementById("startButton").innerText = "COMPLETE!";
  document.getElementById("timer").classList.add("hidden");
}

function checkInputs(activity) {
  if (activity.category === ""){
    hide(document.getElementById("categoryError"), false)
  } else if (activity.description === ""){
    hide(document.getElementById("descriptionError"), false)
  } else if (activity.minutes === "" && activity.seconds === ""){
    hide(document.getElementById("timeError"), false)
  } else {
    displayTimer();
  }
};

function hide(element, hidden) {
  if (hidden) {
    element.classList.add("hidden");
  } else {
    element.classList.remove("hidden");
  }
}

function displayTimer() {
  activityForm.classList.add("hidden");
  hide(timerDisplay, false);
  boxTitle.innerText = "Current Activity";
  displayActivityValues();
  changeTimerColor("startButton");
};

function displayActivityValues() {
  document.getElementById("minutesCountdown").innerText = ("00" + minutes.value).slice(-2);
  document.getElementById("secondsCountdown").innerText = ("00" + seconds.value).slice(-2);
  document.getElementById("descriptionHeader").innerText = description.value;
};

function changeTimerColor(target) {
  var element = document.getElementById(target)
  if(category === "studyButton") {
    element.classList.add("start-study-button")
    // document.getElementById(target).style.borderColor = "#B3FD78";
  } else if (category === "meditateButton") {
    element.classList.add("start-meditate-button")
    // document.getElementById(target).style.borderColor = "#C278FD"
  } else if (category === "exerciseButton") {
    element.classList.add("start-exercise-button")
    // document.getElementById(target).style.borderColor = "#FD8078"
  }
};

function logActivity() {
  var buttonName = "";
  var cardStyle = "";
  activity.markComplete(buttonName, cardStyle);
  hide(document.getElementById("placeholder"), true);
  displayCompletedActivity()
  // pastActivities.push(activity)
  activity.saveToStorage(pastActivities, activity)
  // activity.saveToStorage()
  // changeCardInfo(buttonName, cardStyle);
  // displayCompletedActivity()
}

function displayCompletedActivity() {
  // hide(document.getElementById("placeholder"), true)
  // hide(document.getElementById("timer"), true)
  // hide(document.getElementById("startButton"), true)
  // hide(document.getElementById("motivation"), true)
  hide(timerDisplay, true)
  hide(document.getElementById("logActivityButton"), true)
  hide(document.getElementById("descriptionHeader"), true)
  hide(document.getElementById("newActivitySection"), false)
  boxTitle.innerText = "Completed Activity";
}


function changeCardInfo(buttonName, cardStyle) {
  event.preventDefault(event)
  if (activity.minutes && activity.seconds) {
    changeCardDescription(`${activity.minutes} MIN ${activity.seconds} SEC`, buttonName, cardStyle)
  } else if (activity.seconds && !activity.minutes) {
    changeCardDescription(`${activity.seconds} SEC`, buttonName, cardStyle)
  } else if (activity.minutes && !activity.seconds) {
    changeCardDescription(`${activity.minutes} MIN`, buttonName, cardStyle)
  }
}

function changeCardDescription(time, buttonName, cardStyle) {
  document.getElementById("pastActivity").innerHTML +=
  `<div class="activity-card">
    <div class="activity-details">
      <div class="activity-card-styles ${cardStyle}">
        <h4>${buttonName}</h4>
        <p>${time}</p>
      </div>
      <p>${activity.description}</p>
    </div>
  </div>`
}

function displayNewActivityForm() {
  hide(document.getElementById("newActivitySection"), true);
  hide(document.getElementById("activityForm"), false);
  activityForm.reset();
}
