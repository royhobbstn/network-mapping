// event listener to catch and dispatch (redux) socket communication
import React from 'react';
import { toast } from 'react-toastify';

export const ioEvents = (dispatch, socket) => {
  socket.on('found-records', (msg) => {
    toast.info(<div>Found {parseInt(msg.count).toLocaleString()} records ({parseInt(msg.weight).toLocaleString()} shipments).<br />Routing...</div>);
  });

  socket.on('data-ready', (msg) => {
    toast.success('Routing completed.  Drawing...');

    console.time('data_processing_time');

    const aggregator = msg[0];
    const max_weight = msg[1];

    const max_line_width = 6;

    const width_data = [];
    const color_data = [];

    const agg_keys = Object.keys(aggregator);

    agg_keys.forEach(key => {
      const numeric_key = Number(key);
      width_data.push(numeric_key);
      color_data.push(numeric_key);

      const calculated_width = (aggregator[key]/max_weight)*max_line_width;
      const actual_width = calculated_width < 0.5 ? 0.5 : calculated_width;
      const calculated_color = getCalculatedColor(calculated_width);
      width_data.push(actual_width);
      color_data.push(calculated_color);
    });

    const width_structure = [
      'match',
      ['get', 'ID'],
      ...width_data,
      0
    ];

    const color_structure = [
      'match',
      ['get', 'ID'],
      ...color_data,
      'cyan'
    ];

    const all_segments = ["in", 'ID', ...agg_keys.map(d=> Number(d)), 0];

    console.timeEnd('data_processing_time');

    console.time('paint_time');
    window.map.setFilter('network', all_segments);
    window.map.setPaintProperty('network', 'line-width', width_structure);
    window.map.setPaintProperty('network', 'line-color', color_structure);
    console.timeEnd('paint_time');
  });
};

function getCalculatedColor(calculated_width) {
  if(calculated_width >= 0.5) {
    return '#00ffff';
  } else if(calculated_width > 0.4) {
    return '#35dada';
  } else if(calculated_width > 0.3) {
    return '#43b6b6';
  } else if(calculated_width > 0.2) {
    return '#479593';
  } else if(calculated_width > 0.1) {
    return '#467472';
  } else {
    return '#405453';
  }
}
