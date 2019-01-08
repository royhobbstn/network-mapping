//

import React from 'react';
import { Container } from 'semantic-ui-react'


const control_style = { zIndex: 10, position: 'absolute', top: '20px', left: '10px', border: '1px solid grey',
  borderRadius: '5px'};

export const ControlBox = () => {
  return <Container style={control_style}>
    <div style={{width: '300px', padding: '5px'}}>
      <p> test
      </p>
    </div>
  </Container>
};

