const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 4005;

const { mapData, getWeight, routePaths, createInventory } = require('./procedures/mapData');

io.on('connection', (socket) => {

  socket.on('map-data', async (naics_string) => {
    try {
      const response = await mapData(naics_string);
      socket.emit('found-records', {count: response.length, weight: getWeight(response)}); // TODO implement
      const inventory = createInventory(response);
      const segment_weights = await routePaths(inventory);
      socket.emit('data-ready', segment_weights);
    } catch(e) {
      console.log(e);
    }
  });

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});