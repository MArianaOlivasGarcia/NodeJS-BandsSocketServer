const { io } = require('../index');

const Bands = require('../models/bands');
const Band = require('../models/band');

const bands = new Bands();
bands.addBand( new Band('Zayn Malik') );
bands.addBand( new Band('Harry Styles') );
bands.addBand( new Band('Niall Horan') );
bands.addBand( new Band('Louis Tomlinson') );
bands.addBand( new Band('Liam Payne') );

// Mensajes de Sockets
/* client es un dispositivo que se acanba de conectar a mi socket server */
/* io es todo el servidor, todos los clientes conectador */
/* client.broadcast todos menos el cliente que lo esta emitiendo */
io.on('connection', client => {

    console.log('Cliente conectado');


    client.on('message', ( payload ) => {
        io.emit('message', { admin: 'Hola desde el servidor' });
    });

/* 
    client.on('emit-message', (payload) => {
        console.log(payload);
        client.broadcast.emit('new-message', payload);
    });
 */
    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        // Notificar a todos los clientes conectados que hay un cambio 
        // Emitir la info de todas las bandas
        io.emit('active-bands', bands.getBands());
    });


    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });


    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });


    client.emit('active-bands', bands.getBands());


    // Callback que se ejecuta cuando el client se desconecta
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    })
})