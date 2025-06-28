let minutes = 0.1; // 0.1 = 6 Sekunden
let seconds = minutes * 60;

const timer = setInterval(() => {
  const min = String(Math.floor(seconds / 60)).padStart(2, "0");
  const sec = String(Math.floor(seconds % 60)).padStart(2, "0");

  process.stdout.write(`\r⏳ ${min}:${sec}`);

  seconds--;

  if (seconds < 0) {
    clearInterval(timer);
    console.log("\nZeit ist um! Mach eine Pause!");
  }
}, 1000);