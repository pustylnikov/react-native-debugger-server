const socket = new WebSocket('ws://localhost:' + socketPort + '?client=browser');
const statusElement = document.getElementById('status');

socket.onopen = function () {
    console.log("Connected");
    statusElement.innerText = 'OK';
};
socket.onclose = function () {
    statusElement.innerText = 'CLOSED';
};
socket.onerror = function (error) {
    console.error(error);
};
socket.onmessage = function (event) {
    if (event.data) {
        const [name, args] = JSON.parse(event.data);
        console[name] ? console[name](...args) : console.log(...args);
    }
};
