const ipcRenderer = require('electron').ipcRenderer;

window.onload = function() {
    ipcRenderer.on("uuid", (event, data) => {
        document.getElementById("room-code").innerHTML = data;
    })
}

function startSession(){
    ipcRenderer.send("start-session", {});
    document.getElementById("start").style.display = "none";
    document.getElementById("stop").style.display = "block";
}

function stopSession(){
    ipcRenderer.send("stop-session", {});
    document.getElementById("stop").style.display = "none";
    document.getElementById("start").style.display = "block";
}