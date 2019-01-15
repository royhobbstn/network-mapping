//

import React from 'react';
import { MapContainer } from './MapContainer';
import { ControlBoxContainer } from './ControlBoxContainer';
import GithubCorner from 'react-github-corner';

export const App = () => {
  return <React.Fragment>
    <GithubCorner
      style={{position: 'absolute', zIndex: '100', top: '2px', right: '2px'}}
      href="https://github.com/royhobbstn/network-mapping"
      octoColor="black"
      bannerColor="white"
    />
    <ControlBoxContainer />
    <MapContainer />
  </React.Fragment>
};

