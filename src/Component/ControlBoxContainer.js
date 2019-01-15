//

import { connect } from 'react-redux';
import { ControlBox } from './ControlBox';

import { actionUpdateSctg } from '../Redux/actions';

const mapStateToProps = state => {
  return {
    selected_sctg: state.map.selected_sctg,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSctg: (evt, data) => {
      dispatch(actionUpdateSctg(data.value));
    },
    togglePaint: (selected_layers) => {
      if(selected_layers.length) {
        window.socket.emit('map-data', selected_layers.join(','));
      } else {
        // clear map
      }
      },
  };
};

export const ControlBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ControlBox);

