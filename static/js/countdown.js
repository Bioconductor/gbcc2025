document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
        function updateCountdown() {
            const daysEl = document.getElementById("days");
            const hoursEl = document.getElementById("hours");
            const minutesEl = document.getElementById("minutes");
            const secondsEl = document.getElementById("seconds");

            if (!daysEl || !hoursEl || !minutesEl || !secondsEl) {
                console.error("Countdown elements not found in the DOM.");
                return;
            }

            const eventDate = new Date("2025-06-23T00:00:00").getTime();
            const now = new Date().getTime();
            const timeLeft = eventDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                daysEl.textContent = days;
                hoursEl.textContent = hours;
                minutesEl.textContent = minutes;
                secondsEl.textContent = seconds;
            } else {
                document.getElementById("countdown").innerHTML = "<li>Event Started!</li>";
            }
        }

        updateCountdown();
        setInterval(updateCountdown, 1000);
    }, 500); // Delay execution by 500ms
});

