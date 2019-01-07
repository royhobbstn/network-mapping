// event listener to catch and dispatch (redux) socket communication

export const ioEvents = (dispatch, socket) => {
  socket.on('data-ready', (msg) => {

    console.time('data_processing_time');

    const aggregator = msg[0];
    const max_weight = msg[1];

    const max_line_width = 8;

    const width_data = [];
    const opacity_data = [];

    const agg_keys = Object.keys(aggregator);

    agg_keys.forEach(key => {
      const numeric_key = Number(key);
      width_data.push(numeric_key);
      opacity_data.push(numeric_key);

      const calculated_width = (aggregator[key]/max_weight)*max_line_width;
      const opacity = calculated_width < 0.5 ? calculated_width : 1;
      // until line-cap implemented, set threshold max width at 4.
      const actual_width = calculated_width < 0.5 ? 0.5 : calculated_width > 4 ? 4 : calculated_width;
      width_data.push(actual_width);
      opacity_data.push(opacity);
    });

    const width_structure = [
      'match',
      ['get', 'ID'],
      ...width_data,
      0
    ];

    const opacity_structure = [
      'match',
      ['get', 'ID'],
      ...opacity_data,
      0
    ];

    const all_segments = ["in", 'ID', ...agg_keys.map(d=> Number(d)), 0];

    console.timeEnd('data_processing_time');

    console.time('paint_time');
    window.map.setFilter('network', all_segments);
    window.map.setPaintProperty('network', 'line-width', width_structure);
    window.map.setPaintProperty('network', 'line-opacity', opacity_structure);
    console.timeEnd('paint_time');
  });
};