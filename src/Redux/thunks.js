// socket io communication available on global window.socket

import { actionUpdateSctg } from './actions';
import { clearMap } from '../Service/style_map';
import { toast } from 'react-toastify';

export function thunkUpdateSctg(value) {
  return (dispatch, getState) => {
    clearMap();
    dispatch(actionUpdateSctg(value));
    toast.info('Querying data...');
    window.socket.emit('map-data', value)
  };
}
