    let timer;
    let running = false;
    let time = 0;

    function formatTime(seconds) {
      const hrs = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    function updateDisplay() {
      document.getElementById('display').innerText = formatTime(time);
    }

    function startStopwatch() {
      if (!running) {
        timer = setInterval(() => {
          time++;
          updateDisplay();
        }, 1000);
        running = true;
      }
    }

    function stopStopwatch() {
      if (running) {
        clearInterval(timer);
        running = false;
      }
    }

    function resetStopwatch() {
      stopStopwatch();
      time = 0;
      updateDisplay();
    }