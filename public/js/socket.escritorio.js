var socket = io();

var searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has('escritorio')) {
    window.location = 'index.html';
    throw new Error('El escritorio es necesario');
}

var escritorio = searchParams.get('escritorio');
var small = $('small');

console.log(escritorio);
$('h1').text(`Escritorio ${escritorio}`);

$('button').on('click', function() {
    socket.emit("atenderTicker", { escritorio: escritorio }, function(response) {
        if (response === 'No hay tickets') {
            small.text(response);
            alert(response);
            return;
        } else {
            small.text(`Ticket ${response.numero}`);
        }

    });
});