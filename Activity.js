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

    // if (!localStorage) {
      var stringified = JSON.stringify(pastActivities)
      localStorage.setItem("pastActivitiesKey", stringified)
      // console.log("test3", pastActivities)
      // console.log("test4", localStorage);
    // } else if (localStorage) {
    //   localStorage.getItem("pastActivitiesKey")
    //   JSON.parse("pastActivitesKey")
    //   pastActivities.push(activity);
    //   JSON.stringify(pastActivities);
    //   localStorage.setItem("pastActivitesKey", pastActivities)
    // }
    // else {
    //   // pastActivities.push(JSON.parse)
    //   localStorage.setItem("pastActivitesKey", JSON.stringify(pastActivities))
    // }
  }
}
