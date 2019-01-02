// socket io communication available on global window.socket

export function thunkPressButton() {
  return (dispatch, getState) => {
    //
    console.log('button pressed');

    // pretend they've chosen this naics category
    const naics_string = '212';

    window.socket.emit('map-data', naics_string)
  };
}
