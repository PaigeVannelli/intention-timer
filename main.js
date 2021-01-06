//target the study button by ID
//change innerSRC? and target different image
//change border color

var studyButtonImage = document.getElementById("studyButtonImage")


studyButton.addEventListener("click", activateButton)

function activateButton(event) {
  event.preventDefault()
  studyButtonImage.src = "./assets/study-active.svg"
}

//
