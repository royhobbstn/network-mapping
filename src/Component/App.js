//

import React from 'react';
import { MapContainer } from './MapContainer';

const button_css = {position: 'absolute', top: '20px', left: '20px', width: '100px', zIndex: '50'};

export const App = ({pressButton}) => {
  return <React.Fragment>
    <button style={button_css} onClick={pressButton}>Press</button>
    <MapContainer />
  </React.Fragment>
};

