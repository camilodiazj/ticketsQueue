const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        let siguiente = ticketControl.siguiente();
        callback(siguiente);
    });

    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4Tickets()
    });

    client.on('atenderTicker', (data, callback) => {
        if (!data.escritorio) {
            return callback({
                err: true,
                message: 'El escritorio es necesario'
            });
        };

        let atenderTicker = ticketControl.atenderTicket(data.escritorio);

        client.broadcast.emit('ultimos4', {
            ultimos4: ticketControl.getUltimos4Tickets()
        });

        callback(atenderTicker);

        //actualizar / notificar cambios en los últimos 4
        //emitir ultimos 4
    });

});