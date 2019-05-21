const eventListener = event => {
    if (event.which === 192 && event.ctrlKey && event.shiftKey) {
        observe();
        window.removeEventListener('keydown', eventListener);
    }
}

window.addEventListener('keydown', eventListener);

const alarm = new Audio(chrome.runtime.getURL('alarm.mp3'));

function observe() {
    console.log('going to wait for the target to get online');

    setInterval(() => {
        const $info = document.getElementsByClassName('O90ur')[0];
        if ($info) {
            if ($info.textContent.trim() === 'online') {
                alarm.play();
                console.log("get online man");
            } else {
                alarm.pause();
            }
        }
    }, 3000);
}