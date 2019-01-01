// this is a container component

import { connect } from 'react-redux';
import Map from './Map';

const mapStateToProps = state => {
  return {
    // source_geography: state.map.source_geography,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // updateClusters: (pole, current_zoom, current_bounds) => {
    //   dispatch(thunkUpdateClusters(pole, current_zoom, current_bounds));
    // },
  };
};

const MapContainer = connect(mapStateToProps, mapDispatchToProps)(Map);

export default MapContainer;
