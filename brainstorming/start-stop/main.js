const started = document.getElementById('started');
const stopped = document.getElementById('stopped');
const output = document.querySelector('h1');

started.addEventListener('click', () => {
    document.addEventListener('mousemove', operation);
})

stopped.addEventListener('click', () => {
    document.removeEventListener('mousemove', operation);
})

function operation (event) {
    const X = event.clientX;
    const Y = event.clientY;

    output.innerHTML = `X: ${X}, Y: ${Y}`;
}