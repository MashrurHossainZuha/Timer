document.addEventListener("DOMContentLoaded", function() {
    const timerElement = document.getElementById("timer");
    let seconds = 3600; // 1 hour timer 

    function updateTimer() {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        timerElement.textContent = `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;

        if (seconds <= 0) {
            clearInterval(interval); // stops calling the function
            timerElement.textContent = "Time up!";
        }

        seconds--;
    }

    updateTimer();
    const interval = setInterval(updateTimer, 1000); // 1000ms = 1 second interval 
    // calls the function update func at every interval
});

function startQuiz() {
    window.location.href = 'quiz.html'; // loads the quiz html 
}