//

import React from 'react';
import { MapContainer } from './MapContainer';
import { ControlBoxContainer } from './ControlBoxContainer';
import GithubCorner from 'react-github-corner';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

export const App = () => {
  return <React.Fragment>
    <ToastContainer toastClassName="rounded-corners" />
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
