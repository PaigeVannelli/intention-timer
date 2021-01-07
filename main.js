
var buttonRow = document.getElementById("buttonRow")
var category = '';

buttonRow.addEventListener("click", function(event){
  event.preventDefault();
  category = event.target.id
})



var minutes = document.getElementById("minutes");
var seconds = document.getElementById("seconds");
var startActivityButton = document.getElementById("startActivityButton");
var description = document.getElementById("descriptionInput")

startActivityButton.addEventListener("click", handleTime);

function handleTime(event) {
  event.preventDefault(event);
  if(minutes.value.includes("e")){
  }
  var activity = new Activity(category, description.value, minutes.value, seconds.value)
  console.log(activity)
}
