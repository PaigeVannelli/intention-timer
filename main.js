// GLOBAL VARIABLES
var activity;
var activityForm = document.getElementById("activityForm");
var boxTitle = document.getElementById("boxTitle");
var buttonRow = document.getElementById("buttonRow");
var category = '';
var description = document.getElementById("descriptionInput");
var logActivityButton = document.getElementById("logActivity");
var minutes = document.getElementById("minutes");
var numberInputs = document.getElementById("numberInputs");
var pastActivities = [];
var seconds = document.getElementById("seconds");
var secondsCountdown = document.getElementById("secondsCountdown");
var startActivityButton = document.getElementById("startActivityButton");
var startButton = document.getElementById("startButton");

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

logActivityButton.addEventListener("click", logActivity);

// FUNCTIONS
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
};

function startCountDown() {
  var secondsInput = parseInt(seconds.value - 1);
  var minutesInput = 0;
  if (minutes.value === ""){
    minutesInput = 00;
  } else {
    minutesInput = parseInt(minutes.value);
  }
  var oneSecond = 1;
  var oneMinute = oneSecond * 60;
  var totalTime = (secondsInput * oneSecond) + (minutesInput * oneMinute);
  var timer = setInterval(function() {
    var displayMinutes = '00' + Math.floor(totalTime / 60);
    var displaySeconds = '00' + totalTime % 60;
    secondsCountdown.innerHTML = displaySeconds.slice(-2)
    minutesCountdown.innerHTML = displayMinutes.slice(-2);
    totalTime--;
    if (totalTime < 0) {
      displayComplete();
      clearInterval(timer);
      displayMotivation();
    }
  }, 1000)
};

function displayMotivation () {
  hide(document.getElementById("timer"), true);
  hide(document.getElementById("motivation"), false)
}

function displayComplete() {
  hide(document.getElementById("logActivity"), false);
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
  hide(document.getElementById("timerDisplay"), false);
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
  if(category === "studyButton") {
    document.getElementById(target).style.borderColor = "#B3FD78";
  } else if (category === "meditateButton") {
    document.getElementById(target).style.borderColor = "#C278FD"
  } else if (category === "exerciseButton") {
    document.getElementById(target).style.borderColor = "#FD8078"
  }
};

function logActivity() {
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
  changeCardInfo(buttonName, cardStyle);
  hide(document.getElementById("placeholder"), true)
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
