// event listener to catch and dispatch (redux) socket communication

export const ioEvents = (dispatch, socket) => {
  socket.on('data-ready', (msg) => {

    // todo add data benchmarks, painting benchmarks

    console.log('start painting');
    window.map.setFilter('network', msg[0]);
    window.map.setPaintProperty('network', 'line-width', msg[1]);
    console.log('done painting');
  });
};