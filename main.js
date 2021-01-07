
var buttonRow = document.getElementById("buttonRow")

buttonRow.addEventListener("click", function(event){
  event.preventDefault();
})

//target minutes and seconds input
// add addEventListener start activity button
//

var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var startActivityButton = document.getElementById("startActivityButton");

startActivityButton.addEventListener("click", handleTime);

function handleTime(event) {
  event.preventDefault(event);
  minutes.value
  if(minutes.value.includes("e")){
    
  }
}
