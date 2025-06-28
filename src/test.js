// pomodoro.js
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function countdown(minutes, label, onEnd) {
  let seconds = minutes * 60;

  const timer = setInterval(() => {
    const min = String(Math.floor(seconds / 60)).padStart(2, "0");
    const sec = String(seconds % 60).padStart(2, "0");
    process.stdout.write(`\r${label}: ${min}:${sec}`);

    seconds--;

    if (seconds < 0) {
      clearInterval(timer);
      process.stdout.write(`\n✅ ${label} beendet!\n`);
      onEnd();
    }
  }, 1000);
}


function startPomodoro(round = 1) {
  if (round > 4) {
    console.log("🎉 Du hast 4 Pomodoros abgeschlossen! Zeit für eine lange Pause!");
    countdown(15, "Lange Pause", () => rl.close());
    return;
  }

  console.log(`\n🍅 Pomodoro ${round}/4 startet...`);
  countdown(1, "Fokuszeit", () => {
    console.log(`\n🌿 Kleine Pause nach Runde ${round}`);
    countdown(5, "Pause", () => startPomodoro(round + 1));
  });
}



rl.question("Bereit für deinen Pomodoro? (j/n) > ", (answer) => {
  if (answer.toLowerCase() === "j") {
    startPomodoro();
  } else {
    console.log("Okay, dann später! Du rockst das eh 💪");
    rl.close();
  }
});
