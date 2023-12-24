const start = document.getElementById("start-button");
const reset = document.getElementById("reset-button");
const add = document.getElementById("task-button");

const taskList = document.getElementById("current-task-container");
const currentTask = document.getElementById("current-task-header");
const currentTaskContainer = document.getElementById("current-task-div");
const timer = document.getElementById("timer");
const alert = document.getElementById("alert-text");
const timerContainer = document.getElementById("timer-container");
const timerText = document.getElementById("timer-text");
const inputBox = document.getElementById("task-input");
const alertDiv = document.getElementById("alert-div");

let count = 0;
const task = [];

let timerStarted = false;

const workTimer = 1500;
const shortBreak = 300;
const longBreak = 900;

let pomodoro = [
  "Work Time!",
  "Short Break!",
  "Work Time!",
  "Short Break!",
  "Work Time!",
  "Short Break!",
  "Work Time!",
  "Long Break!",
];

//Adding tasks with enter key
inputBox.addEventListener("keyup", function (e) {
  if (e.key === "Enter") {
    add.click();
    document.getElementById("task-input").value = "";
  }

  //resetting alert
});
//setting alert
function setAlert(text, color) {
  alert.innerHTML = text;
  alert.style.color = color;
  alert.style.fontWeight = "light";
  alert.style.fontSize = "1.7rem";
  alertDiv.style.backgroundColor = "black";
  resetAlert();
}

function resetAlert() {
  setTimeout(function () {
    alert.innerHTML = "";
    alertDiv.style.backgroundColor = "transparent";
  }, 2000);
}

//Adding tasks and displaying them
add.addEventListener("click", function () {
  const taskInput = document.getElementById("task-input").value.toUpperCase();
  if (taskInput === task[0] && timerStarted === false) {
    setAlert("Task already added! Start Timer to begin!", "yellow");
  } else if (taskInput === task[0] && timerStarted === true) {
    setAlert("Task already added and timer is running!", "red");
  } else if (taskInput === "") {
    setAlert("Please enter a task!", "orange");
  } else if (taskInput !== task[0] && timerStarted === true) {
    setAlert("Timer is already running! Reset timer to Change task!", "red");
  } else {
    task[0] = taskInput;
    taskList.innerHTML = task;
    setAlert("Task Added!", "green");
  }
});

//Starting and Reseting Timer
function startTimer(pomodoroTime) {
  timerText.innerHTML = `${Math.floor(pomodoroTime / 60)}:00`;
  let time = pomodoroTime;
  const countDown = setInterval(function () {
    time--;
    while (time > 0) {
      if (time === 0) {
        timerText.style.color = "white";
      } else {
        setTimeout(function () {
          timerText.style.color = "red";
        }, 500);
        setTimeout(function () {
          timerText.style.color = "yellow";
        }, 1000);
      }
      break;
    }

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    timerText.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

    if (time === 0) {
      clearInterval(countDown);
      timerText.innerHTML = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
      currentTask.innerHTML = pomodoro[count];
      if (count === 7) {
        currentTask.innerHTML =
          "Pomodoro Complete!, Click Reset to Start Again!";
        currentTask.style.color = "Green";
      }
      timerStarted = false;
    }
  }, 1000);

  //resetting pomodoro timer
  reset.addEventListener("click", function () {
    timerText.style.color = "white";
    timerStarted = false;
    count = 0;
    currentTask.innerHTML = "Pomodoro Resetted!";
    timerText.innerHTML = "25:00";
    currentTaskContainer.style.backgroundColor = "black";
    currentTask.style.color = "yellow";
    timer.style.borderColor = "grey";
    task.pop();
    taskList.innerHTML = "";
    inputBox.value = "";
    clearInterval(countDown);
  });
}

//Setting Pomodoro Stages
function getPomodoroStage(focus) {
  switch (focus) {
    case "Work Time!":
      return (
        (currentTask.innerHTML = "Task Focus Time!"),
        (currentTask.style.color = "red"),
        (currentTaskContainer.style.backgroundColor = "black"),
        (timerStarted = true),
        startTimer(workTimer)
      );

    case "Short Break!":
      return (
        (currentTask.innerHTML = "Short Break!"),
        (currentTask.style.color = "yellow"),
        (currentTaskContainer.style.backgroundColor = "black"),
        (timerStarted = true),
        startTimer(shortBreak)
      );
      break;
    case "long Break":
      return (
        (currentTask.innerHTML = "Long Break!"),
        (currentTask.style.color = "green"),
        (currentTaskContainer.style.backgroundColor = "black"),
        (timerStarted = true),
        startTimer(longBreak)
      );
      break;
  }
}

//starting timer when start button is clicked
start.addEventListener("click", function () {
  alert.style.fontSize = "1.5rem";
  if (timerStarted === false && task[0] !== undefined) {
    timerStarted = true;
    getPomodoroStage(pomodoro[count]);
    setAlert("Timer Started!", "yellow");
    timer.style.borderColor = "red";
    count++;
  } else if (timerStarted === true) {
    setAlert("Timer is already running!", "orange");
  } else if (task[0] === undefined) {
    setAlert("Please add a task!", "orange");
  }
});
