
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

function startTimer(event) {
  event.preventDefault(event);

  var activity = new Activity(category, description.value, minutes.value, seconds.value)
  console.log(activity);

  displayTimer()

};

function displayTimer() {
  activityForm.classList.add("hidden");
  timerDisplay.classList.remove("hidden");
};
