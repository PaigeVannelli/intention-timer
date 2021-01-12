class Activity {
  constructor(category, description, minutes, seconds, id) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }

  startTimer(totalTime) {
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

  markComplete() {
      this.completed = true;
  }

  saveToStorage(pastActivities) {
      var stringified = JSON.stringify(pastActivities)
      localStorage.setItem("pastActivitiesKey", stringified)
  }
}
