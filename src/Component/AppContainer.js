//

import { connect } from 'react-redux';
import { App } from './App';

import { thunkPressButton } from '../Redux/thunks';

const mapStateToProps = state => {
  return {
    // source_geography: state.map.source_geography,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    pressButton: () => {
      dispatch(thunkPressButton());
    },
  };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

