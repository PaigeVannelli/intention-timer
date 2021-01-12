// Refactor List

// 1. move all global variables into functions?
// 2. Reorder all functions
// 3. this.category changes border color for both
// 4. fix form height for each form display - add new class on higher level div
// 5. if else consitency
// 6. refactor huge function
// 7. get rid of remove color - add class


// ERRORS

//start button doesn't change color based on new category
//need to get DOM manipulation out of methods startTimer

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
  // activityForm.classList.add("hidden");
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
  // var element = document.getElementById("startButton")
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
  // var minutesInput
  // if (minutes.value) {
  //   minutesInput = parseInt(minutes.value)
  // } else {
  //   minutesInput = 00;
  // }
  var minutesInput = minutes.value ? parseInt(minutes.value) : 00;
  var totalTime = (parseInt(seconds.value - 1)) + (minutesInput * 60);
  activity.startTimer(totalTime);
  activity.markComplete()
  console.log(activity)
  // if (activity.completed === true) {
  //   clearInterval(timer);
    // displayComplete();
    // displayMotivation();
    // }
};

function displayMotivation () {
  hide(document.getElementById("timer"), true);
  hide(document.getElementById("motivation"), false)
}

function displayComplete() {
  hide(document.getElementById("logActivityButton"), false);
  document.getElementById("startButton").innerText = "COMPLETE!";
  // document.getElementById("timer").classList.add("hidden");
  hide(document.getElementById("timer"), true)
}

function hide(element, hidden) {
  if (hidden) {
    element.classList.add("hidden");
  } else {
    element.classList.remove("hidden");
  }
}

function logActivity() {
  // var buttonName = "";
  // var cardStyle = "";
  // activity.markComplete(buttonName, cardStyle);
  // if (activity.category === "studyButton") {
  //   buttonName = "Study";
  //   cardStyle = "study-card-styles";
  // } else if (activity.category === "meditateButton") {
  //   buttonName = "Meditate";
  //   cardStyle = "meditate-card-styles"
  // } else {
  //   buttonName = "Exercise";
  //   cardStyle = "exercise-card-styles";
  // }
  createCardStyle(activity)
  // changeCardInfo(buttonName, cardStyle);
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
  // hide(document.getElementById("placeholder"), true)
  // hide(document.getElementById("timer"), true)
  // hide(document.getElementById("startButton"), true)
  // hide(document.getElementById("motivation"), true)
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
  activityForm.reset();
}

function accessLocalStorage() {
  if (localStorage.length > 0) {
    hide(document.getElementById("placeholder"), true)
    // var parsed = localStorage.getItem("pastActivitiesKey")
    // var returnToNormal = JSON.parse(parsed)
    var returnToNormal = JSON.parse(localStorage.getItem("pastActivitiesKey"))
    for(var i = 0; i < returnToNormal.length; i++){
      pastActivities.push(returnToNormal[i]);
      // activity = returnToNormal[i]
      // logActivity();
      //cardLogic(returnToNormal[i]);
      createCardStyle(returnToNormal[i]);
    }
  }
}

// function cardConstructor(cardInfo) {
//   var buttonName = "";
//   var cardStyle = "";
//   var timeInput = "";
//   if (cardInfo.category === "studyButton") {
//     buttonName = "Study";
//     cardStyle = "study-card-styles";
//   } else if (cardInfo.category === "meditateButton") {
//     buttonName = "Meditate";
//     cardStyle = "meditate-card-styles"
//   } else {
//     buttonName = "Exercise";
//     cardStyle = "exercise-card-styles";
//   }
//   if (cardInfo.minutes && cardInfo.seconds) {
//     timeInput = `${cardInfo.minutes} MIN ${cardInfo.seconds} SEC`
//   } else if (cardInfo.seconds && !cardInfo.minutes) {
//     timeInput = `${cardInfo.seconds} SEC`;
//   } else if (cardInfo.minutes && !cardInfo.seconds) {
//     timeInput = `${cardInfo.minutes} MIN`;
//   }
//   document.getElementById("pastActivity").innerHTML +=
//   `<div class="activity-card">
//     <div class="activity-details">
//       <div class="activity-card-styles ${cardStyle}">
//         <h4>${buttonName}</h4>
//         <p>${timeInput}</p>
//       </div>
//       <p>${cardInfo.description}</p>
//     </div>
//   </div>`
// }

// function cardLogic(cardInfo) {
//   var buttonName = "";
//   var cardStyle = "";
//   // activity.markComplete(buttonName, cardStyle);
//   if (cardInfo.category === "studyButton") {
//     buttonName = "Study";
//     cardStyle = "study-card-styles";
//   } else if (cardInfo.category === "meditateButton") {
//     buttonName = "Meditate";
//     cardStyle = "meditate-card-styles"
//   } else {
//     buttonName = "Exercise";
//     cardStyle = "exercise-card-styles";
//   }
// }
