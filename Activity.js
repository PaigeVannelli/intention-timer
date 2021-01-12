class Activity {
  constructor(category, description, minutes, seconds, id) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }

  startTimer() {

  }

  markComplete() {
      this.completed = true;
  }

  saveToStorage(pastActivities) {
      var stringified = JSON.stringify(pastActivities)
      localStorage.setItem("pastActivitiesKey", stringified)
  }
}
