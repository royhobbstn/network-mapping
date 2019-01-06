const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = 4005;

const {mapData, getWeight, routePaths, createInventory} = require('./procedures/mapData');

io.on('connection', (socket) => {

  socket.on('map-data', async (naics_string) => {
    try {
      const response = await mapData(naics_string);
      socket.emit('found-records', {count: response.length, weight: getWeight(response)}); // TODO implement
      const [inventory, weights] = createInventory(response);
      const segment_weights = await routePaths(inventory);

      // inventory, weights, segment_weights refer to same zip-zip routes in the same order
      const len = weights.length;

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

      // TODO below should be done on client

      const max_width = 4;
      const min_width = 0.2;
      const width_data = [];

      agg_keys.forEach(key => {
        width_data.push(Number(key));
        width_data.push(((aggregator[key]/max_weight)*(max_width-min_width))+min_width);
      });

      const width_structure = [
        'match',
        ['get', 'ID'],
        ...width_data,
        0
      ];

      const all_segments = ["in", 'ID', ...agg_keys.map(d=> Number(d)), 0];

      socket.emit('data-ready', [all_segments, width_structure]);
    } catch (e) {
      console.log(e);
    }

  });

});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});