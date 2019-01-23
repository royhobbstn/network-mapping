//

import { connect } from 'react-redux';
import { ControlBox } from './ControlBox';

import { thunkUpdateSctg } from '../Redux/thunks';

const mapStateToProps = state => {
  return {
    selected_sctg: state.map.selected_sctg,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    toggleSctg: (evt, data) => {
      dispatch(thunkUpdateSctg(data.value));
    },
  };
};

export const ControlBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ControlBox);

