const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 4005;

const { mapData } = require('./procedures/mapData');

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('map-data', async (payload) => {
    const response = await mapData(payload);
    console.log(response);
    socket.emit('data-ready', response);
  });

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});