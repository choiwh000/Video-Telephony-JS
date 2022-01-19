const socket = io();

const welcome = document.querySelector("#welcome");
const form = document.querySelector("form");

function handleSubmit(event) {
    event.preventDefault();
    const input = document.querySelector('input');
    socket.emit('enter_room', {payload: input.value}, () => {
        console.log('sever is done!')
    });
    input.value ='';
}


form.addEventListener("submit", handleSubmit);