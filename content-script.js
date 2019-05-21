let paused = true;
const alarm = new Audio(chrome.runtime.getURL('alarm.mp3'));

const eventListener = event => {
    if (event.which === 192 && event.ctrlKey && !event.shiftKey) {
        observe();
        paused = false;
        window.removeEventListener('keydown', eventListener);
    }
}

window.addEventListener('keydown', eventListener);
window.addEventListener('keydown', event => {
    if (event.which === 192 && event.ctrlKey && event.shiftKey) {
        if (paused) {
            paused = false;
            alert('resumed');
        } else {
            paused = true;
            alarm.pause();
            alert('paused');
        }
    }
});


function observe() {
    console.log('going to wait for the target to get online');

    const monitor = () => {
        const $info = document.getElementsByClassName('O90ur')[0];
        if ($info) {
            if ($info.textContent.trim() === 'online') {
                alarm.play();
                console.log("get online man");
            } else {
                alarm.pause();
            }
        }
    }

    setInterval(() => {
        if (!paused)
            monitor();
    }, 1500);
}