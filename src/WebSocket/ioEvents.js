// event listener to catch and dispatch (redux) socket communication

export const ioEvents = (dispatch, socket) => {
  socket.on('data-ready', (msg) => {

    console.time('start_time');
    console.log('data start');

    const aggregator = msg[0];
    const max_weight = msg[1];

    const max_line_width = 8;

    const width_data = [];
    const opacity_data = [];
    // const line_join_data = [];
    // const line_cap_data = [];

    const agg_keys = Object.keys(aggregator);

    agg_keys.forEach(key => {
      const numeric_key = Number(key);
      width_data.push(numeric_key);
      opacity_data.push(numeric_key);
      // line_cap_data.push(numeric_key);
      // line_join_data.push(numeric_key);

      const calculated_width = (aggregator[key]/max_weight)*max_line_width;
      const opacity = calculated_width < 0.5 ? calculated_width : 1;
      // until line-cap implemented, set threshold max width at 4.
      const actual_width = calculated_width < 0.5 ? 0.5 : calculated_width > 4 ? 4 : calculated_width;
      width_data.push(actual_width);
      opacity_data.push(opacity);
      // const line_cap = calculated_width < 0.5 ? 'butt' : 'round';
      // const line_join = calculated_width < 0.5 ? 'miter' : 'round';
      // line_cap_data.push(line_cap);
      // line_join_data.push(line_join);
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

    // const line_join_structure = [
    //   'match',
    //   ['get', 'ID'],
    //   ...line_join_data,
    //   'round'
    // ];
    //
    // const line_cap_structure = [
    //   'match',
    //   ['get', 'ID'],
    //   ...line_cap_data,
    //   'round'
    // ];

    const all_segments = ["in", 'ID', ...agg_keys.map(d=> Number(d)), 0];

    console.timeEnd('start_time');
    console.log('start painting');
    console.time('paint_start');
    window.map.setFilter('network', all_segments);
    window.map.setPaintProperty('network', 'line-width', width_structure);
    window.map.setPaintProperty('network', 'line-opacity', opacity_structure);
    // data-driven line-cap not yet implemented by Mapbox
    // window.map.setLayoutProperty('network', 'line-cap', line_cap_structure);
    // window.map.setLayoutProperty('network', 'line-join', line_join_structure);

    console.timeEnd('paint_start');
    console.log('done painting');
  });
};