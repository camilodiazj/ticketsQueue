//comando para establecer la conexión

var socket = io();

var label = $('#lblNuevoTicket');

socket.on('connect', (client) => {
    console.log('Usuario conectado');
});

socket.on('disconnect', (client) => {
    console.log('Usuario desconectado');
});

//estado actual
socket.on('estadoActual', (status) => {
    label.text(status.actual);
});

$('button').on('click', () => {
    console.log('click');
    socket.emit('siguienteTicket', null, (siguienteTicket) => {
        label.text(siguienteTicket);
    });
});