const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 4005;

const {mapData, getWeight, routePaths, createInventory} = require('./procedures/mapData');

io.on('connection', (socket) => {

  socket.on('map-data', async (sctg) => {
    try {
      const response = await mapData(sctg);
      console.log(`Found: ${response.length} records.`);
      socket.emit('found-records', {count: response.length, weight: getWeight(response)}); // TODO implement
      const [inventory, weights] = createInventory(response);
      console.log('about to route');
      const segment_weights = await routePaths(inventory);
      console.log('routed');

      // inventory, weights, segment_weights refer to same zip-zip routes in the same order
      const len = weights.length;
      console.log({len});

      // create a lookup of all road segment ids with corresponding weights
      const aggregator = {};
      for (let i = 0; i < len; i++) {
        segment_weights[i].forEach(segment => {
          if (!aggregator[segment]) {
            aggregator[segment] = weights[i];
          } else {
            aggregator[segment] += weights[i];
          }
        });
      }

      // find max value
      const agg_keys = Object.keys(aggregator);
      let max_weight = 0;
      agg_keys.forEach(key => {
        if (aggregator[key] > max_weight) {
          max_weight = aggregator[key];
        }
      });
      console.log('about to send back to client');

      socket.emit('data-ready', [aggregator, max_weight]);
    } catch (e) {
      console.log(e);
    }

  });

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});