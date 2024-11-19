const semicircles = document.querySelectorAll(".semicircle");
const timer = document.querySelector(".timer");
// inputs
const min = 0;
const sec = 20;

const minutes = min * 60000;
const seconds = sec * 1000;

const setTime = minutes + seconds;
const startTime = Date.now();
const futureTime = startTime + setTime;

const timerLoop = setInterval(countDownTimer);
// countDownTimer();

function countDownTimer() {
  const currentTime = Date.now();
  const remainingTime = futureTime - currentTime;
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

  // 5 sec condition
  // if (remainingTime <= 6000) {
  //   semicircles[0].style.backgroundColor = "red";
  //   semicircles[1].style.backgroundColor = "red";
  //   timer.style.color = "red";
  // }

  // end
  if (remainingTime < 0) {
    clearInterval(timerLoop);
    semicircles[0].style.display = "none";
    semicircles[1].style.display = "none";
    semicircles[2].style.display = "none";

    timer.innerHTML = `
      <div>00</div>
      <div class="colon">:</div>
      <div>00</div>
    `;

    // TODO: Find a better way to disable the timer component.
    // NOTE: This may end up not being a necessary feature of the project.
    timer.style.color = "lightgray";
  }
}
