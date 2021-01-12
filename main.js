
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
window.addEventListener("load", accessLocalStorage)

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
  event.preventDefault();
  activity = new Activity(category, description.value, minutes.value, seconds.value)
  checkInputs();
  timerDisplay.reset()
};

function checkInputs() {
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

function displayTimer() {
  hide(document.getElementById("timer"), false);
  hide(document.getElementById("descriptionHeader"), false)
  hide(document.getElementById("motivation"), true)
  hide(document.getElementById("activityForm"), true)
  hide(timerDisplay, false);
  document.getElementById("startButton").innerText = "START";
  boxTitle.innerText = "Current Activity";
  displayActivityValues();
  changeTimerColor();
};

function displayActivityValues() {
  document.getElementById("minutesCountdown").innerText = ("00" + minutes.value).slice(-2);
  document.getElementById("secondsCountdown").innerText = ("00" + seconds.value).slice(-2);
  document.getElementById("descriptionHeader").innerText = description.value;
};

function changeTimerColor() {
  startButton.classList.remove("start-study-button", "start-meditate-button", "start-exercise-button")
  if(activity.category === "studyButton") {
    startButton.classList.add("start-study-button")
  } else if (activity.category === "meditateButton") {
    startButton.classList.add("start-meditate-button")
  } else if (activity.category === "exerciseButton") {
    startButton.classList.add("start-exercise-button")
  }
};

function startCountDown() {
  event.preventDefault();
  var minutesInput
  if (minutes.value) {
    minutesInput = parseInt(minutes.value)
  } else {
    minutesInput = 00;
  }
  var totalTime = (parseInt(seconds.value - 1)) + (minutesInput * 60);
  intiateTimer(totalTime);
  activity.markComplete()
};

function intiateTimer(totalTime) {
  var timer = setInterval(function() {
    var displayMinutes = '00' + Math.floor(totalTime / 60);
    var displaySeconds = '00' + totalTime % 60;
    secondsCountdown.innerHTML = displaySeconds.slice(-2)
    minutesCountdown.innerHTML = displayMinutes.slice(-2);
    totalTime--;
    if (totalTime < 0) {
      clearInterval(timer);
      displayComplete();
      displayMotivation();
    }
  }, 1000)
}

function displayMotivation () {
  hide(document.getElementById("timer"), true);
  hide(document.getElementById("motivation"), false)
}

function displayComplete() {
  hide(document.getElementById("logActivityButton"), false);
  hide(document.getElementById("timer"), true)
  document.getElementById("startButton").innerText = "COMPLETE!";
}

function hide(element, hidden) {
  if (hidden) {
    element.classList.add("hidden");
  } else {
    element.classList.remove("hidden");
  }
}

function logActivity() {
  createCardStyle(activity)
  displayCompletedActivity()
  pastActivities.push(activity)
  activity.saveToStorage(pastActivities)
}

function createCardStyle(activity) {
  var buttonName = "";
  var cardStyle = "";
  if (activity.category === "studyButton") {
    buttonName = "Study";
    cardStyle = "study-card-styles";
  } else if (activity.category === "meditateButton") {
    buttonName = "Meditate";
    cardStyle = "meditate-card-styles"
  } else {
    buttonName = "Exercise";
    cardStyle = "exercise-card-styles";
  }
  changeCardInfo(activity, buttonName, cardStyle);
}

function changeCardInfo(activity, buttonName, cardStyle) {
  event.preventDefault()
  if (activity.minutes && activity.seconds) {
    changeCardDescription(activity, `${activity.minutes} MIN ${activity.seconds} SEC`, buttonName, cardStyle)
  } else if (activity.seconds && !activity.minutes) {
    changeCardDescription(activity, `${activity.seconds} SEC`, buttonName, cardStyle)
  } else if (activity.minutes && !activity.seconds) {
    changeCardDescription(activity, `${activity.minutes} MIN`, buttonName, cardStyle)
  }
}

function displayCompletedActivity() {
  hide(document.getElementById("placeholder"), true);
  hide(timerDisplay, true)
  hide(document.getElementById("logActivityButton"), true)
  hide(document.getElementById("descriptionHeader"), true)
  hide(document.getElementById("newActivitySection"), false)
  boxTitle.innerText = "Completed Activity";
}

function changeCardDescription(activity, time, buttonName, cardStyle) {
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
  boxTitle.innerText = "New Activity"
  activityForm.reset();
}

function accessLocalStorage() {
  if (localStorage.length > 0) {
    hide(document.getElementById("placeholder"), true)
    var returnToNormal = JSON.parse(localStorage.getItem("pastActivitiesKey"))
    for(var i = 0; i < returnToNormal.length; i++){
      pastActivities.push(returnToNormal[i]);
      createCardStyle(returnToNormal[i]);
    }
  }
}
