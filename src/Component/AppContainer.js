//

import { connect } from 'react-redux';
import { App } from './App';

const mapStateToProps = state => {
  return {
    // source_geography: state.map.source_geography,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    //
  };
};

export const AppContainer = connect(mapStateToProps, mapDispatchToProps)(App);

