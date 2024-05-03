export const startup = (PORT) => {
  const totalTime = 25 * 1000;
  const increment = 100;
  let elapsedTime = 0;
  let progress = 0;

  const progressBarWidth = 30;

  const interval = setInterval(() => {
    elapsedTime += 1000;
    progress = (elapsedTime / totalTime) * 100;

    console.clear();

    console.log('Server is booting up...');

    const numBars = Math.floor((progress / 100) * progressBarWidth);
    const progressBar = '#'.repeat(numBars).padEnd(progressBarWidth, '-');

    console.log(`[${progressBar}] ${Math.floor(progress)}%`);

    if (elapsedTime >= totalTime) {
      clearInterval(interval);
      console.clear();
      console.log(`Server is running on port: ${PORT}`);
    }
  }, increment);
};
