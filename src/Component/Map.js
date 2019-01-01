//

import React, { Component } from 'react';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { key } from './mapbox_api_key.js';



class Map extends Component {

  componentDidMount() {

    mapboxgl.accessToken = key;
    window.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-96, 39.75],
      zoom: 3,
      maxZoom: 13,
      minZoom: 3
    });

    window.map.on('load', () => {
      //
    });

  }



  shouldComponentUpdate(nextProps, nextState) {

    return false;
  }

  render() {
    return <div id="map" />;
  }
}


export default Map;
