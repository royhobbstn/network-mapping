// socket io communication available on global window.socket

import { actionUpdateSctg } from './actions';
import { clearMap } from '../Service/style_map';

export function thunkUpdateSctg(value) {
  return (dispatch, getState) => {
    console.log('button pressed');
    clearMap();
    dispatch(actionUpdateSctg(value));
    window.socket.emit('map-data', value)
  };
}
