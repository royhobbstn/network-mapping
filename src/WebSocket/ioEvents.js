// event listener to catch and dispatch (redux) socket communication

export const ioEvents = (dispatch, socket) => {
  socket.on('data-ready', (msg) => {
    console.log(msg);
  });
};