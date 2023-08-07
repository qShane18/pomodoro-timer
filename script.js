const timer = document.getElementById('timer')
const startGiveUp_btn = document.getElementById('start-giveUp-btn');
const modal = document.querySelector('.modal');
const done_btn = document.querySelector('.ok-btn');
// progress bar
const progress = document.querySelector('.passed-progress')

let seconds = 0;
let minutes = 25;

let timerStatus = 'stopped';
let timerInterval = null;

let Pomodoro_counter = 0;

display(minutes, seconds);

startGiveUp_btn.addEventListener('click', function() {
    if(timerStatus == 'stopped') {
        timerStatus = 'running'
        timerInterval = window.setInterval(countDownPomodoro, 1000);
        document.getElementById('start-giveUp-btn').innerHTML = `
            <span style='color: red;'>Give up</span>
        `;

    }
    else {
        timerStatus = 'stopped'
        seconds = 0;
        minutes = 25;
        display(minutes, seconds);
        window.clearInterval(timerInterval);
        document.getElementById('start-giveUp-btn').innerHTML = `
            <span style='color: green;'>Start</span>
        `;
        updateProgress();
    }
})

done_btn.addEventListener('click', function() {
    closeCompleteModal();
    window.clearInterval(timerInterval);
    minutes = 25;
    seconds = 0;
    display(minutes, seconds);
    document.getElementById('start-giveUp-btn').innerHTML = `
        <span style='color: green;'>Start</span>
    `;
})
window.addEventListener('click', function(e) {
    if(e.target === modal) {
        closeCompleteModal();
    }
})

// functions
function display(minutes, seconds) {
    let displayMins = 0;
    let displaySecs = 0;
    if(seconds < 10) displaySecs = '0' + seconds.toString();
    else displaySecs = seconds.toString();
    if(minutes < 10) displayMins = '0' + minutes.toString();
    else displayMins = minutes.toString();
    timer.innerText = displayMins + ":" + displaySecs;
}
function countDownPomodoro() {
    if(seconds == 0) {
        seconds = 59;
        if(minutes == 0) {
            window.clearInterval(timerInterval);
            timerStatus = 'stopped'
            minutes = 25;
            seconds = 0;
            openCompleteModal();
            Pomodoro_counter++;
            document.querySelector('.pomodoro-count').innerText = 'Pomodoro count: ' + Pomodoro_counter.toString();
            updateProgress();
        }
        else
            minutes--;
    }
    else
        seconds--;
    // update display
    display(minutes, seconds);
    updateProgress();
}
function openCompleteModal() {
    modal.style.display = 'flex';
}
function closeCompleteModal() {
    modal.style.display = 'none';
}
function updateProgress() {
    let W = window.innerWidth;
    let remainSeconds = minutes*60 + seconds;
    progress.style.width = (((1500 - remainSeconds)/1500)*W).toString() + 'px';
}

