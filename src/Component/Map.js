//

import React, { Component } from 'react';
import '../../node_modules/mapbox-gl/dist/mapbox-gl.css';
import mapboxgl from 'mapbox-gl';
import { key } from './mapbox_api_key.js';



export class Map extends Component {

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
      window.map.addLayer({
        'id': 'network',
        'source-layer': 'network',
        'type': 'line',
        'source': {
          'maxzoom': 9,
          "type": "vector",
          "tiles": ["http://localhost:4002/faf/{z}/{x}/{y}.pbf"]
        },
        'layout': {
          'line-cap': 'round', // butt
          'line-join': 'round' // miter
        },
        'paint': {
          'line-color': 'cyan',
          'line-width': 1,
          'line-opacity': 1
        },
        'filter': ["in", 'ID', 0]
      });

    });

  }



  shouldComponentUpdate(nextProps, nextState) {

    return false;
  }

  render() {
    return <div id="map" />;
  }
}

