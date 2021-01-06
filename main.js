//target the study button by ID
//change innerSRC? and target different image
//change border color

var studyButtonImage = document.getElementById("studyButtonImage")
var studyButton = document.getElementById("studyButton")

var meditateButton = document.getElementById("meditateButton")
var mediateButtonImage = document.getElementById("mediateButtonImage")

studyButton.addEventListener("click", activateButton)
meditateButton.addEventListener("click", activateButton)

function activateButton(event) {
  event.preventDefault()
  studyButtonImage.src = "./assets/study-active.svg"
}

//target buttonRow
//add event listener to parent for click and fire anonymous function
//create conditions for each button (event.target.classname?)


// var buttonRow = document.getElementById("buttonRow")
//
// buttonRow.addEventListener("click", function(event){
//   event.preventDefault();
//   // console.log(event.target.className)
//   if (event.target.className === "meditate-button") {
//     console.log("it worked")
//   }
// })
