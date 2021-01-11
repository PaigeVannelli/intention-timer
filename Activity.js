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
        this.completed = true;
        // console.log(this.completed)
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

  saveToStorage(pastActivities) {

    // if (!localStorage) {
      var stringified = JSON.stringify(pastActivities)
      console.log("test2", pastActivities, stringified)
      localStorage.setItem("pastActivitesKey", stringified)
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
