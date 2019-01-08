//

import { connect } from 'react-redux';
import { ControlBox } from './ControlBox';

// import { thunkPressButton } from '../Redux/thunks';

const mapStateToProps = state => {
  return {
    // source_geography: state.map.source_geography,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // pressButton: () => {
    //   dispatch(thunkPressButton());
    // },
  };
};

export const ControlBoxContainer = connect(mapStateToProps, mapDispatchToProps)(ControlBox);

