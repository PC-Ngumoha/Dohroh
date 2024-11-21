const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");

// Buttons & Triggers
const startButton = document.getElementById("start-button");

// inputs
const min = 0;
const sec = 20;

const minutes = min * 60000;
const seconds = sec * 1000;

const setTime = minutes + seconds;

let futureTime;
let remainingTime = 0;
let continueTime;

let timerLoop;

// Initialize timer count
initTimerCount();

// Starts the timer.
// const timerLoop = setInterval(countDownTimer);

startButton.addEventListener("click", () => {
  if (timerLoop) {
    handleTimerCountStop();
  } else {
    handleTimerCountStart();
  }
});

/**
 * @function countDownTimer
 *
 * @description Contains the main body of logic for the countdown timer
 */
function countDownTimer() {
  const currentTime = Date.now();
  remainingTime = futureTime - currentTime;
  const angle = (remainingTime / setTime) * 360;

  // progress indicator
  if (angle > 180) {
    semicircles[2].style.display = "none";
    semicircles[0].style.transform = "rotate(180deg)";
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  } else {
    semicircles[2].style.display = "block";
    semicircles[0].style.transform = `rotate(${angle}deg)`;
    semicircles[1].style.transform = `rotate(${angle}deg)`;
  }

  // timer
  const mins = Math.floor((remainingTime / (1000 * 60)) % 60).toLocaleString(
    "en-US",
    { minimumIntegerDigits: 2, useGrouping: false }
  );
  const secs = Math.floor((remainingTime / 1000) % 60).toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  timer.innerHTML = `
    <div>${mins}</div>
    <div class="colon">:</div>
    <div>${secs}</div>
  `;

  // end
  if (remainingTime < 0) {
    handleTimerCountStop("end");

    initTimerCount();

    // TODO: Find a better way to disable the timer component.
    // NOTE: This may end up not being a necessary feature of the project.
    // timer.style.color = "lightgray";

    startButton.textContent = "start";
  }
}

/**
 * @function initTimerCount
 *
 * @description sets up the initial state of the countdown timer.
 */
function initTimerCount() {
  const minString = min.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
  const secString = sec.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });

  timer.innerHTML = `
    <div>${minString}</div>
    <div class="colon">:</div>
    <div>${secString}</div>
  `;
}

/**
 * @function handleTimerCountStart
 *
 * @description handles the state settings for when the timer starts counting
 */
function handleTimerCountStart() {
  futureTime = Date.now() + (remainingTime > 0 ? remainingTime : setTime);
  timerLoop = setInterval(countDownTimer);

  startButton.textContent = "pause";

  // Make timer hands appear
  semicircles[0].style.display = "";
  semicircles[1].style.display = "";
  semicircles[2].style.display = "";
}

/**
 * @function handleTimerCountStop
 *
 * @param {string} [state = ""] - state of the timer at stop
 *
 * @description handles state settings for timer when it stops counting
 */
function handleTimerCountStop(state = "") {
  clearInterval(timerLoop);
  timerLoop = undefined;

  startButton.textContent = "start";

  if (state === "end") {
    // make timer hands disappear
    semicircles[0].style.display = "none";
    semicircles[1].style.display = "none";
    semicircles[2].style.display = "none";
  }
}
