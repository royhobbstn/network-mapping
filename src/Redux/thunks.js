// socket io communication available on global window.socket

export function thunkPressButton() {
  return (dispatch, getState) => {
    //
    console.log('button pressed');
    window.socket.emit('map-data', 23)
  };
}
