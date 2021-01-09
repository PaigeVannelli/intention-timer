// GLOBAL VARIABLES
var activity;
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
var logActivityButton = document.getElementById("logActivity");

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
    }
  }, 1000)
};

function displayComplete() {
  removeHidden(document.getElementById("logActivity"));
  document.getElementById("startButton").innerText = "COMPLETE!";
}

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
  element.classList.remove("hidden");
}

function displayTimer() {
  activityForm.classList.add("hidden");
  removeHidden(document.getElementById("timerDisplay"));
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
  if(category === "studyButton") {
    document.getElementById("startButton").style.borderColor = "#B3FD78";
  } else if (category === "meditateButton") {
    document.getElementById("startButton").style.borderColor = "#C278FD"
  } else if (category === "exerciseButton") {
    document.getElementById("startButton").style.borderColor = "#FD8078"
  }
};

function logActivity() {
  event.preventDefault(event)
  if (activity.minutes && activity.seconds) {
    changeCardDescription(`${activity.minutes} MIN ${activity.seconds} SEC`)
  } else if (activity.seconds && !activity.minutes) {
    changeCardDescription(`${activity.seconds} SEC`)
  } else if (activity.minutes && !activity.seconds) {
    changeCardDescription(`${activity.minutes} MIN`)
  }
}

function changeCardDescription(time) {
  document.getElementById("pastActivity").innerHTML +=
  `<div class="activity-card">
    <div class="activity-details">
      <h4>${activity.category}</h4>
      <p>${time}</p>
      <p>${activity.description}</p>
    </div>
    <div"tiny-box"></div>
  </div>`
}

  // if (activity.minutes && activity.seconds) {
  //   document.getElementById("pastActivity").innerHTML +=
  //   `<div class="activity-card">
  //     <div class="activity-details">
  //       <h4>${activity.category}</h4>
  //       <p>${activity.minutes} MIN ${activity.seconds} SEC</p>
  //       <p>${activity.description}</p>
  //     </div>
  //     <div"tiny-box"></div>
  //   </div>`
  // } else if (activity.seconds && !activity.minutes) {
  //   document.getElementById("pastActivity").innerHTML +=
  //   `<div class="activity-card">
  //     <div class="activity-details">
  //       <h4>${activity.category}</h4>
  //       <p>${activity.seconds} SEC</p>
  //       <p>${activity.description}</p>
  //     </div>
  //     <div"tiny-box"></div>
  //   </div>`
  // } else if (activity.minutes && !activity.seconds) {
  //   document.getElementById("pastActivity").innerHTML +=
  //   `<div class="activity-card">
  //     <div class="activity-details">
  //       <h4>${activity.category}</h4>
  //       <p>${activity.minutes} MIN</p>
  //       <p>${activity.description}</p>
  //     </div>
  //     <div"tiny-box"></div>
  //   </div>`
  // }
// }
