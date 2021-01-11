class Activity {
  constructor(category, description, minutes, seconds, id) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = id;
  }

  startTimer(totalTime) {
    var timer = setInterval(function() {
      var displayMinutes = '00' + Math.floor(totalTime / 60);
      var displaySeconds = '00' + totalTime % 60;
      secondsCountdown.innerHTML = displaySeconds.slice(-2)
      minutesCountdown.innerHTML = displayMinutes.slice(-2);
      totalTime--;
      this.completed = totalTime === 0
      if (totalTime < 0) {
        clearInterval(timer);
        displayComplete();
        displayMotivation();
        this.completed = true;
      }
    }, 1000)
  }

  markComplete(buttonName, cardStyle) {
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
  }

  saveToStorage() {

  }
}
