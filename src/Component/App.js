//

import React from 'react';
import { MapContainer } from './MapContainer';
import { ControlBoxContainer } from './ControlBoxContainer';

const button_css = {position: 'absolute', top: '20px', left: '20px', width: '100px', zIndex: '50'};

export const App = ({pressButton}) => {
  return <React.Fragment>
    <button style={button_css} onClick={pressButton}>Press</button>
    <ControlBoxContainer />
    <MapContainer />
  </React.Fragment>
};

