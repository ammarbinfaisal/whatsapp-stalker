let paused = true;
const alarm = new Audio(chrome.runtime.getURL("alarm.mp3"));

const eventListener = event => {
  if (event.which === 192 && event.ctrlKey && !event.shiftKey) {
    observe();
    paused = false;
    window.removeEventListener("keydown", eventListener);
  }
};

window.addEventListener("keydown", eventListener);
window.addEventListener("keydown", event => {
  if (event.which === 192 && event.ctrlKey && event.shiftKey) {
    if (paused) {
      paused = false;
      alert("resumed");
    } else {
      paused = true;
      alarm.pause();
      alert("paused");
    }
  }
});

function observe() {
  console.log("going to wait for the target to get online");
  let loggedState = false;
  const monitor = () => {
    const $info = document.querySelector("#main > header");
    const d = new Date();
    if ($info) {
      if ($info.textContent.indexOf("online") > -1) {
        alarm.play();
        if (!loggedState) {
          loggedState = true;
          console.log(
            `target is online at -> ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
          );
        }
      } else {
        if (loggedState) {
          loggedState = false;
          console.log(
            `target went offline at -> ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
          );
        }

        alarm.pause();
      }
    }
  };

  setInterval(() => {
    if (!paused) monitor();
  }, 1500);
}
